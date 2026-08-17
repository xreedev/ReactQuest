// Grading engine for Coding Practice. Compiles candidate code from the editor
// (via `new Function`, no eval) and runs it against author-written test
// descriptors. Two families of problem:
//   - "predict" — run a fixed snippet, compare captured console.log output
//     (and any thrown error) against the known-correct sequence.
//   - "implement" / "component" — candidate defines a function/component;
//     each test descriptor is `{ name, run: async (candidate, helpers) => ({pass, expected, actual, error?}) }`.
// "design" problems aren't executed at all — the UI keeps its task+reveal flow.

const TEST_TIMEOUT_MS = 4000;

function fmtLogArg(v) {
  if (v === undefined) return "undefined";
  if (v === null) return "null";
  if (typeof v === "string") return v;
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  if (typeof v === "function") return v.name ? `[Function: ${v.name}]` : "[Function (anonymous)]";
  if (Array.isArray(v)) return `[${v.map(fmtLogArg).join(",")}]`;
  try { return JSON.stringify(v); } catch { return String(v); }
}

function makeSandboxConsole(bucket) {
  const push = (level) => (...args) => bucket.push({ level, text: args.map(fmtLogArg).join(" ") });
  return { log: push("log"), info: push("log"), warn: push("warn"), error: push("error") };
}

export function deepEqual(a, b) {
  if (Object.is(a, b)) return true;
  if (typeof a !== typeof b) return false;
  if (a === null || b === null || typeof a !== "object") return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  if (a instanceof Date || b instanceof Date) return +a === +b;
  const ak = Object.keys(a), bk = Object.keys(b);
  if (ak.length !== bk.length) return false;
  return ak.every((k) => deepEqual(a[k], b[k]));
}

function withTimeout(promise, ms, label) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(`${label || "Test"} timed out after ${ms}ms — check for an infinite loop or a promise that never resolves.`)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

/** A simple args-in/value-out test case. `expected` is compared with deepEqual. */
export function check(args, expected, opts = {}) {
  return {
    name: opts.name || `${JSON.stringify(args)} -> ${JSON.stringify(expected)}`,
    run: async (candidate) => {
      const actual = await candidate(...args);
      return { pass: deepEqual(actual, expected), expected, actual };
    }
  };
}

/** A test case asserting the candidate throws (any error, or one matching `nameContains`). */
export function checkThrows(args, opts = {}) {
  return {
    name: opts.name || `throws on ${JSON.stringify(args)}`,
    run: async (candidate) => {
      try {
        const actual = await candidate(...args);
        return { pass: false, expected: "(throws)", actual, error: "did not throw" };
      } catch (e) {
        const ok = !opts.nameContains || String(e && e.constructor && e.constructor.name).includes(opts.nameContains);
        return { pass: ok, expected: opts.nameContains ? `throws ${opts.nameContains}` : "(throws)", actual: `threw ${e && e.message}` };
      }
    }
  };
}

/** Escape hatch for bespoke assertions (timers, call counts, ordering, React harnesses). */
export function custom(name, run) {
  return { name, run };
}

function compile(code, entryName, extraParamNames, extraParamValues) {
  const logs = [];
  const sandboxConsole = makeSandboxConsole(logs);
  const paramNames = ["console", ...extraParamNames];
  const paramValues = [sandboxConsole, ...extraParamValues];
  try {
    // eslint-disable-next-line no-new-func
    const factory = new Function(...paramNames, `${code}\n;return (typeof ${entryName} !== "undefined") ? ${entryName} : undefined;`);
    const entry = factory(...paramValues);
    if (typeof entry === "undefined") {
      return { error: { message: `No \`${entryName}\` was found. Make sure your code defines it with that exact name.` }, logs };
    }
    return { entry, logs };
  } catch (e) {
    return { error: { message: e.message, raw: String(e) }, logs };
  }
}

async function transformJsx(code) {
  if (typeof window === "undefined" || !window.Babel) {
    return { error: { message: "The JSX compiler isn't available (offline, or it failed to load). You can still read the task and reveal the reference solution." } };
  }
  try {
    const out = window.Babel.transform(code, { presets: ["react"] });
    return { code: out.code };
  } catch (e) {
    return { error: { message: e.message, raw: String(e) } };
  }
}

async function runTests(entry, tests, helpers) {
  const results = [];
  for (const t of tests) {
    try {
      const r = await withTimeout(Promise.resolve().then(() => t.run(entry, helpers)), TEST_TIMEOUT_MS, t.name);
      results.push({ name: t.name, pass: !!r.pass, expected: r.expected, actual: r.actual, error: r.error || null });
    } catch (e) {
      results.push({ name: t.name, pass: false, expected: undefined, actual: undefined, error: e.message });
    }
  }
  return results;
}

/** React test-mount helpers, passed to `component`-mode test `run(Candidate, helpers)`. */
function makeReactHelpers() {
  const React = window.React, ReactDOM = window.ReactDOM;
  const mounted = [];
  return {
    React,
    ReactDOM,
    mount(element) {
      const container = document.createElement("div");
      container.style.position = "fixed";
      container.style.left = "-9999px";
      document.body.appendChild(container);
      const root = ReactDOM.createRoot(container);
      root.render(element);
      mounted.push({ container, root });
      return { container, root, unmount: () => { root.unmount(); container.remove(); } };
    },
    cleanupAll() {
      mounted.splice(0).forEach(({ root, container }) => { try { root.unmount(); } catch {} container.remove(); });
    }
  };
}

/**
 * Run one problem's candidate code from the editor.
 * Returns { ok, compileError, results, consoleOutput, predicted } — `ok` is
 * true only when every test passed (or, for "predict", the captured
 * behaviour matched exactly).
 */
export async function runProblem(problem, code) {
  if (problem.mode === "predict") {
    const logs = [];
    const sandboxConsole = makeSandboxConsole(logs);
    let thrown = null;
    try {
      // eslint-disable-next-line no-new-func
      new Function("console", code)(sandboxConsole);
    } catch (e) {
      thrown = e;
    }
    // Let any zero-delay timers / promise chains the snippet scheduled
    // (setTimeout, .then, queueMicrotask) actually run before we read the
    // captured output back — the sandboxed call above returns immediately,
    // it doesn't wait for the real event loop to drain.
    if (problem.settleMs !== 0) await new Promise((r) => setTimeout(r, problem.settleMs || 80));
    const actualLogs = logs.map((l) => l.text);
    const actualError = thrown ? (thrown.constructor ? thrown.constructor.name : "Error") : null;
    const logsMatch = actualLogs.length === problem.expectedLogs.length && actualLogs.every((v, i) => v === problem.expectedLogs[i]);
    const errorMatch = actualError === (problem.expectedError || null);
    return {
      ok: logsMatch && errorMatch,
      compileError: null,
      consoleOutput: logs,
      predicted: { actualLogs, actualError, expectedLogs: problem.expectedLogs, expectedError: problem.expectedError || null },
      results: []
    };
  }

  if (problem.mode === "component") {
    const transformed = await transformJsx(code);
    if (transformed.error) return { ok: false, compileError: transformed.error, results: [], consoleOutput: [] };
    const { entry, error, logs } = compile(transformed.code, problem.entry, ["React", "ReactDOM"], [window.React, window.ReactDOM]);
    if (error) return { ok: false, compileError: error, results: [], consoleOutput: logs || [] };
    const helpers = makeReactHelpers();
    const results = await runTests(entry, problem.tests, helpers);
    helpers.cleanupAll();
    return { ok: results.every((r) => r.pass), compileError: null, results, consoleOutput: logs };
  }

  // "implement"
  const { entry, error, logs } = compile(code, problem.entry, [], []);
  if (error) return { ok: false, compileError: error, results: [], consoleOutput: logs || [] };
  const results = await runTests(entry, problem.tests, {});
  return { ok: results.every((r) => r.pass), compileError: null, results, consoleOutput: logs };
}
