// Curated from wiki/*.md and questions/questions.md — topics, practice content,
// lessons, and rewards. CODE_QUESTIONS in "predict"/"implement"/"component" mode
// are graded for real by exec-engine.js; "design" mode keeps the task+reveal flow
// (architecture/scenario prompts with no single correct output).
import { check, checkThrows, custom } from "./exec-engine.js";

// Kept only so each CODE_QUESTIONS/INTERVIEW_CHAINS entry's xp field has a
// value — the level tier system itself was removed; tokens are now paid out
// per completed day (see MODULE_TOKENS below), not per question.
const XP = { Noob: 40, Pro: 80, Hacker: 140, God: 220 };
export const MODULE_TOKENS = 800;

// Per-topic accent colour + a two-letter monogram, used by the UI for
// practice/lesson cards, the lessons sidebar, and flashcard headers — small
// colored badges rather than hand-drawn icon paths, so they render reliably
// at any size (same spirit as Notion's page-icon monograms).
export const ICONS = {
  "js-scope": { color: "oklch(0.55 0.16 255)", mono: "Sc", style: "nested" },
  "js-closures": { color: "oklch(0.52 0.17 265)", mono: "Cl", style: "rings" },
  "js-this": { color: "oklch(0.58 0.15 245)", mono: "Th", style: "chevrons" },
  "js-coercion": { color: "oklch(0.6 0.14 235)", mono: "Co", style: "chevrons" },
  "js-async": { color: "oklch(0.54 0.16 275)", mono: "As", style: "rings" },
  "js-utils": { color: "oklch(0.56 0.13 250)", mono: "Ut", style: "bars" },
  "react-core": { color: "oklch(0.56 0.14 300)", mono: "Rc", style: "nested" },
  "react-hooks": { color: "oklch(0.53 0.15 310)", mono: "Hk", style: "rings" },
  "react-perf": { color: "oklch(0.58 0.16 320)", mono: "Pf", style: "bars" },
  "react-state": { color: "oklch(0.52 0.13 290)", mono: "St", style: "chevrons" },
  "react-routing": { color: "oklch(0.55 0.14 305)", mono: "Rt", style: "chevrons" },
  "web-basics": { color: "oklch(0.55 0.1 190)", mono: "Hc", style: "nested" },
  "git": { color: "oklch(0.62 0.15 55)", mono: "Gt", style: "bars" },
  "machine-coding": { color: "oklch(0.6 0.18 350)", mono: "Mc", style: "nested" },
  "scenario": { color: "oklch(0.5 0.12 275)", mono: "Sn", style: "chevrons" },
  "managerial": { color: "oklch(0.48 0.03 255)", mono: "Hr", style: "bars" }
};

// `asked` and `learn` are {q, a} pairs — every question in a lesson now
// carries a real, substantive answer. `asked` = real company-tagged
// interview questions with a direct answer; `learn` = the wiki's Socratic
// [LEARN] sequence, answered here (Lessons should teach; Flashcards is the
// separate hide-the-answer quiz mode for self-testing the same material).
export const TOPICS = [
  { id: "js-scope", part: "JavaScript Internals", name: "Scope & Hoisting",
    asked: [
      { q: "Difference between var, let and const — explain with a scoping example (Accenture, Capgemini)", a: "var is function-scoped and hoists as undefined; let/const are block-scoped and hoist into the Temporal Dead Zone. Example: `if(true){ var a=1; let b=2; } console.log(a) // 1; console.log(b) // ReferenceError`. const additionally forbids reassigning the binding (the value can still mutate)." },
      { q: "What is hoisting and how does it work? (Accenture, Capgemini)", a: "During the creation phase, the engine scans the whole scope and registers every declaration before running any code. var declarations are registered and set to undefined immediately; let/const are registered but left uninitialised (TDZ); function declarations are registered with their full body, so they're callable from the top of the scope." },
      { q: "What is the Temporal Dead Zone? (Accenture)", a: "The span between entering a scope and the let/const declaration line actually executing. The binding exists (it's been hoisted) but has no value yet, so accessing it throws a ReferenceError instead of returning undefined." },
      { q: "Explain the JavaScript creation phase (Accenture)", a: "Before any code runs, the engine walks the scope once to register all declarations (hoisting) and set up the scope chain and `this`. Only after that does the execution phase run the code top to bottom." }
    ],
    learn: [
      { q: "What exactly moves during hoisting — the declaration, the assignment, or both?", a: "Only the declaration. The binding is created (and for var, initialised to undefined) at the top of the scope; the assignment stays exactly where it was written and runs when execution reaches that line." },
      { q: "If let is also hoisted, why does accessing it throw instead of giving undefined?", a: "Because its binding is hoisted but deliberately left uninitialised (the TDZ) rather than defaulted to undefined the way var is. Reading an uninitialised binding is treated as an error, not a valid (if unhelpful) value." },
      { q: "What is the difference between \"not declared\" and \"declared but uninitialised\"? Which error does each produce?", a: "Not declared: no binding exists anywhere in scope — ReferenceError: x is not defined. Declared but uninitialised (a let/const still in its TDZ): the binding exists but has no value yet — ReferenceError: Cannot access 'x' before initialization. Different message, different cause." },
      { q: "Does const make the variable immutable or the value? Write one line proving your answer.", a: "The variable — you can't reassign the binding. The value can still mutate: `const arr = [1]; arr.push(2);` works fine, but `arr = [3]` throws." },
      { q: "Why does var inside a block leak out, but let doesn't? What is the unit of scope for each?", a: "var's unit of scope is the nearest function (or global scope) — a bare `{}` block doesn't create a new var scope, so it leaks out. let/const are block-scoped: the nearest `{}` is their actual boundary." }
    ] },
  { id: "js-closures", part: "JavaScript Internals", name: "Closures",
    asked: [
      { q: "What is a closure? (Accenture, Cognizant, Capgemini)", a: "A function bundled with references to its surrounding lexical scope, so it keeps access to those outer variables even after the outer function has returned." },
      { q: "Write a closure example and call it (Capgemini, Infosys)", a: "`function makeCounter(){ let n=0; return () => ++n; } const next = makeCounter(); next(); next();` — each call increments the same private n via the returned function's closure over it." },
      { q: "What is a practical use case for closures? (Capgemini — the follow-up that decides the answer)", a: "Data privacy: a factory function can return methods that share access to a variable no outside code can reach directly — a counter's internal count, a memoize cache, a debounce timer." },
      { q: "What is lexical scoping? (Cognizant)", a: "A variable's scope is determined by where it's written in the source code, not by how or where the function is called — a nested function can always see its outer function's variables, fixed at definition time." }
    ],
    learn: [
      { q: "A closure keeps something alive after its function returns. What exactly — the value, or the variable binding?", a: "The variable binding itself, not a frozen snapshot of its value. That's why two separate calls to a counter factory produce two independent counters, and why the closure sees updates made after it was created." },
      { q: "In the classic var-in-a-loop bug, why is the answer 3 and not 2? What is i at the moment the callback finally runs?", a: "var creates one binding for the entire loop, shared by every iteration's callback. None of the callbacks run until after the loop has fully finished, by which point i has already reached 3 — so all three see that same final value." },
      { q: "let fixes that bug. What does the engine create per iteration that var doesn't?", a: "A fresh binding of the loop variable for each iteration — so each iteration's callback closes over its own private copy instead of one binding shared by all of them." },
      { q: "Closures cause memory to be retained. Name one situation where that is a leak rather than a feature.", a: "An event listener or timer callback that closes over a large object (a DOM node, a big array) and is never removed — the closure keeps that object reachable and un-garbage-collected for as long as the listener exists." },
      { q: "How is a closure related to a module pattern? To a React custom hook?", a: "A module pattern is a closure used deliberately for privacy — an IIFE returns an object whose methods share access to variables nothing outside can reach. A custom hook does the same thing per component instance: its local variables persist across renders via the closures React's hook state mechanism creates." }
    ] },
  { id: "js-this", part: "JavaScript Internals", name: "this, Prototypes & Objects",
    asked: [
      { q: "What is prototypal inheritance? (Cognizant)", a: "Every object has an internal link to another object (its prototype). Property lookups that miss on the object itself fall through to the prototype, then to its prototype, and so on up the chain — that's how objects 'inherit' methods without copying them." },
      { q: "How can objects be copied — shallow vs deep? (Cognizant, Capgemini)", a: "Shallow ({...obj} or Object.assign) copies top-level keys only — nested objects are still shared by reference. Deep copy recursively copies every level, so nothing is shared; structuredClone() does this natively." },
      { q: "Explain the this keyword (recurring across reports)", a: "this is determined by the call-site — how a function is actually called — not by where it was defined. Plain call → undefined/global object; obj.method() → obj; call/apply/bind → whatever's passed; new → the newly created object. Arrow functions are the one exception: they have no own this and just inherit it lexically." }
    ],
    learn: [
      { q: "What decides the value of this — where a function is defined, or where it is called? Does the answer change for arrow functions?", a: "Where it is called (the call-site), for ordinary functions. Arrow functions are the exception: they have no this of their own, so they inherit it from the scope they were defined in, unaffected by how they're later called." },
      { q: "Why does spread produce a shallow copy? At what depth does sharing begin?", a: "Spread copies each of the object's own top-level values — one level deep. Any value that is itself an object starts being shared by reference from there, so sharing begins at depth 2 (a nested object/array inside the copied object)." },
      { q: "What does new actually do, in four steps?", a: "1) Creates a new empty object. 2) Links that object's prototype to the constructor's .prototype. 3) Runs the constructor with this bound to the new object. 4) Returns the new object, unless the constructor explicitly returns some other object itself." },
      { q: "If a deleted own property's value comes back, where was it living the whole time?", a: "On the prototype. Setting an own property shadowed the prototype's property of the same name; deleting the own property removes only that shadow, so the lookup falls through to the value that was on the prototype all along." },
      { q: "Name two things JSON.parse(JSON.stringify(x)) silently destroys.", a: "Functions and undefined values (both are simply dropped), and Date objects (turned into plain ISO strings, not real Date instances). It also throws outright on circular references instead of handling them." }
    ] },
  { id: "js-coercion", part: "JavaScript Internals", name: "Coercion & Equality",
    asked: [
      { q: "== vs === and coercion pitfalls (Accenture)", a: "=== compares value and type with zero conversion. == first coerces operands toward a common type (via a defined algorithm — objects go through toPrimitive, then numeric comparison) before comparing, which is what makes `[] == false` true. null == undefined is a special case that's always true regardless of that algorithm." }
    ],
    learn: [
      { q: "What does == do that === doesn't? Describe it as an algorithm, not a vibe.", a: "When the operand types differ, == converts one or both toward a common type before comparing — objects via toPrimitive (usually valueOf then toString), strings/booleans toward numbers — then compares the converted values. === skips all of that: different types are simply never equal." },
      { q: "Which values are falsy? List all of them — there are few.", a: "false, 0, -0, 0n, \"\" (empty string), null, undefined, and NaN. That's the complete list — everything else, including [] and {}, is truthy." },
      { q: "0 || x and 0 ?? x differ. State the single rule that explains the difference.", a: "|| falls through on any falsy value (0, \"\", false, null, undefined, NaN). ?? falls through only on null or undefined specifically, so 0 and \"\" are treated as real, kept values." },
      { q: "Why is 0.1 + 0.2 !== 0.3? What would you compare instead?", a: "Floats are stored in binary, and 0.1/0.2/0.3 have no exact binary representation, so the addition accumulates a tiny rounding error (0.30000000000000004). Compare with a small tolerance instead: Math.abs(a - b) < Number.EPSILON." },
      { q: "When, if ever, is == the correct choice?", a: "When you deliberately want null and undefined treated as the same 'nothing' in one comparison — x == null is a common, intentional idiom for exactly that. Outside that specific case, === is the safer default." }
    ] },
  { id: "js-async", part: "JavaScript Internals", name: "Event Loop & Promises",
    asked: [
      { q: "Explain the event loop — microtasks vs macrotasks, execution order (Accenture)", a: "Synchronous code runs first, to completion. Once the call stack is empty, the entire microtask queue drains (including microtasks that other microtasks queue), and only then does the event loop pick up a single macrotask like a timer — then repeats." },
      { q: "Callback hell → Promises → async/await: the evolution (Accenture)", a: "Callbacks nest indefinitely for sequential async steps. Promises flatten that into a chain of .then() calls with real error propagation via .catch(). async/await is syntax sugar over the same promise chain that lets you write it top-to-bottom like synchronous code." },
      { q: "What is a Promise and how does it handle async code? (Accenture)", a: "An object representing a value that will exist later — pending, then fulfilled or rejected exactly once. It lets you attach .then/.catch callbacks guaranteed to run (as microtasks) once that settles, instead of passing callbacks directly into the async operation." },
      { q: "Difference between Promises and async/await (Accenture)", a: "Same underlying mechanism, different syntax — async/await desugars to a promise chain. await pauses the async function's execution (not the whole thread) until the awaited promise settles, then resumes as a microtask, letting you write async logic without nesting .then() calls." },
      { q: "Promise.all() vs Promise.race() (Capgemini)", a: "Promise.all waits for every promise and rejects immediately on the first rejection (all-or-nothing). Promise.race settles as soon as any single promise settles, win or lose — whichever is first." },
      { q: "Write Promise syntax (Infosys)", a: "`new Promise((resolve, reject) => { doAsyncThing((err, val) => err ? reject(err) : resolve(val)); }).then(val => ...).catch(err => ...)`." },
      { q: "Sync vs async execution (Accenture)", a: "Synchronous code blocks — each statement waits for the previous one to finish, on one thread. Asynchronous code hands off work (a timer, a request) and continues immediately; the result arrives later via a callback, promise, or await, without blocking the thread in between." }
    ],
    learn: [
      { q: "The call stack is empty. What runs next — a setTimeout callback or a .then callback? Why?", a: ".then — every queued microtask runs to completion before the event loop touches the next macrotask (a timer), no matter which was registered first or what delay was given." },
      { q: "How many microtasks run between two macrotasks?", a: "All of them — the entire microtask queue drains fully, including any new microtasks that earlier ones queue along the way, before a single macrotask is allowed to run." },
      { q: "await \"pauses\" a function. What actually happens to the rest of the function body?", a: "It doesn't block a thread — the rest of the function becomes a continuation scheduled to resume as a microtask once the awaited value settles. Control returns to the caller immediately, which is why code placed right after the async function call can run before that continuation does." },
      { q: "Promise.all rejects on the first rejection. What happens to the other promises — are they cancelled?", a: "No — promises can't be cancelled once started. They keep running to completion; Promise.all just stops waiting for them and ignores whatever they eventually resolve or reject with." },
      { q: "Is async/await a different concurrency model from promises, or different syntax over the same one? Defend it.", a: "Same model, different syntax. async/await compiles down to the exact same promise chain and microtask scheduling — it just reads top-to-bottom instead of nesting .then() calls. There's no behavioural difference to defend beyond readability." }
    ] },
  { id: "js-utils", part: "JavaScript Internals", name: "Array/Function Utilities",
    asked: [
      { q: "What is throttling? (Capgemini — answer with a real scenario, not a definition)", a: "Capping a function to run at most once per fixed time window, no matter how many times it's triggered — e.g. a scroll handler that recalculates layout: without throttling it can fire hundreds of times a second, with a 100ms throttle it runs at most 10 times a second regardless of scroll speed." },
      { q: "How do you debounce an application? (Infosys)", a: "Wrap the handler so each call clears any pending timer and schedules a new one; the wrapped function only actually runs once no new call has come in for the delay period — typical for a search box firing a fetch only after the user pauses typing." },
      { q: "Debounce vs throttle — when each? (recurring)", a: "Debounce when you only care about the final settled value (search-as-you-type, autosave). Throttle when you need a steady rate regardless of how often the event fires (scroll, resize, drag)." },
      { q: "Difference between spread and rest (TCS)", a: "Same ... syntax, opposite direction. Spread expands an iterable into individual elements/arguments ([...arr], fn(...args)); rest collects multiple arguments/elements into a single array (function f(...args){}, const [a, ...rest] = arr)." },
      { q: "Explain destructuring (Accenture, Infosys)", a: "Unpacking values from arrays or properties from objects into individual variables in one statement — const {name, age} = user; or const [first, second] = arr; — including default values and renaming (const {name: userName} = user)." }
    ],
    learn: [
      { q: "Debounce and throttle both limit calls. State the one-sentence difference in when the function runs.", a: "Debounce waits for a pause in calls and runs once after that quiet period; throttle runs at a steady maximum rate the whole time, regardless of how many calls come in." },
      { q: "For each, name the event you'd attach it to: search input, window resize, scroll-to-load, autosave.", a: "Debounce: search input and autosave — both only care about the final settled value. Throttle: window resize and scroll-to-load — both fire continuously and need a steady capped rate, not a wait-for-quiet." },
      { q: "Your debounce returns a new function. What must it close over to work?", a: "The pending timer id — a persistent reference across calls so each new call can clear the previous call's scheduled timeout before scheduling its own." },
      { q: "Why does map(parseInt) break? What does map pass to its callback?", a: "map calls its callback with (value, index, array). parseInt(value, radix) reads that second argument as a radix, so the index — 0, 1, 2… — gets used as the parsing base, producing wrong results or NaN for most entries." },
      { q: "Memoisation trades memory for time. When is that trade a loss?", a: "When inputs change too often for the cache to ever hit, or when the cost of generating/comparing the cache key rivals the cost of just recomputing — at that point you're paying overhead for close to zero reuse." }
    ] },
  { id: "react-core", part: "React", name: "React Core Model",
    asked: [
      { q: "Difference between state and props (TCS)", a: "Props are read-only data passed down from a parent; a component never modifies its own props. State is data a component owns and manages internally, and updating it triggers a re-render." },
      { q: "Class vs functional components; why functional is preferred (Accenture, Cognizant)", a: "Both can hold state and lifecycle behaviour (class via this.state/lifecycle methods, functional via hooks). Functional is preferred now because hooks let you share stateful logic between components — something HOCs/render props hacked around before — with less boilerplate and no `this` binding footguns." },
      { q: "What is the virtual DOM, and what is reconciliation? (Accenture, Capgemini)", a: "The virtual DOM is an in-memory tree React builds on every render. Reconciliation is the diffing algorithm that compares the new tree to the previous one and computes the minimal set of real DOM changes needed — only those actual differences get committed." },
      { q: "Why are keys important in lists? (Accenture)", a: "Keys tell React which element in a list is which across renders, so it can tell 'this item moved' from 'this item was replaced'. Without stable keys (or with index keys on a reorderable list), React can match the wrong DOM node to the wrong item and reuse stale state." },
      { q: "What is a Higher-Order Component, and its advantages? (Infosys, Cognizant, TCS)", a: "A function that takes a component and returns a new component with extra behaviour layered on top — auth gating, injected data, logging. It lets you reuse cross-cutting logic across many components without repeating it in each one." },
      { q: "How do you pass data from child to parent? (TCS)", a: "React data flow is one-directional (parent to child via props), so a child 'sends data up' by calling a callback function the parent passed down as a prop — the parent supplies the function, the child just invokes it with the value." },
      { q: "What is prop drilling and how do you avoid it? (Accenture, Cognizant, Capgemini)", a: "Passing a value down through several layers of components that don't use it themselves, just to reach a deeply nested consumer. Context (or a state library) avoids it by letting the consumer read the value directly, skipping the intermediate layers entirely." },
      { q: "What are React Portals? (Capgemini)", a: "A way to render a component's output into a different DOM node than its parent — ReactDOM.createPortal(children, domNode) — while it stays in the same place in the React tree, so context and event bubbling still work normally. Used for modals, tooltips, anything that needs to escape a parent's overflow/z-index." },
      { q: "Controlled vs uncontrolled components (Accenture, UST)", a: "A controlled input's value is driven by React state (value + onChange) — React is the single source of truth. An uncontrolled input manages its own value in the DOM, read via a ref when needed (defaultValue + ref). Controlled gives more control (validation per keystroke); uncontrolled is simpler and cheaper for large forms." },
      { q: "What is a pure component? (Cognizant)", a: "A component that skips re-rendering when its props/state haven't changed, determined by a shallow comparison — React.PureComponent for classes, React.memo for function components. It's an optimisation, not a different rendering model." },
      { q: "Name all lifecycle methods and when they're used (TCS)", a: "Mounting: constructor, render, componentDidMount. Updating: render, componentDidUpdate. Unmounting: componentWillUnmount. Function components map these onto useEffect: an effect with [] ≈ componentDidMount, with deps ≈ componentDidUpdate for those deps, and its cleanup ≈ componentWillUnmount." }
    ],
    learn: [
      { q: "React \"re-renders\" on state change. Does that mean it touches the DOM? Where does the virtual DOM sit in that sentence?", a: "Not necessarily. Re-rendering means React calls your component function again and builds a new virtual DOM tree in memory. Reconciliation then diffs that new tree against the previous one, and only the actual differences get committed to the real DOM — a re-render and a DOM mutation are two separate steps." },
      { q: "Reconciliation compares two trees. What does React assume when the key changes? What does it assume when the element type changes?", a: "A changed key means 'this is a different item' — React unmounts the old instance (discarding its state) and mounts a fresh one. A changed element type at the same position means 'this whole subtree is different' — React tears down the old DOM and builds new, rather than diffing incompatible types against each other." },
      { q: "With key={index}, you delete the first item in a list of inputs. What appears in the remaining inputs, and why?", a: "Their typed values shift up one row. React matches elements by key and position — deleting the first item means every remaining item's index shifts down by one, so React reuses each DOM node (and its internal state) for what is now a different item, showing the wrong value." },
      { q: "An HOC, a render prop, and a custom hook all share logic. What can a custom hook not do that an HOC can?", a: "A hook can't render markup or wrap the output — it only shares stateful logic and returns data/functions for the calling component to use. An HOC (or render prop) can inject its own JSX around or in place of what it wraps, which a hook alone can't do." },
      { q: "A portal renders outside the DOM hierarchy. Does an event fired inside it still bubble to the React parent? Why is that surprising?", a: "Yes — portals only change where the DOM node physically sits, not where the component sits in the React tree, so React's synthetic event bubbling follows the React hierarchy, not the DOM hierarchy. It's surprising because a native DOM event fired inside a portal rendered outside a parent's DOM subtree wouldn't bubble to that parent in plain HTML/JS." }
    ] },
  { id: "react-hooks", part: "React", name: "Hooks",
    asked: [
      { q: "Explain useEffect in terms of lifecycle methods (Infosys)", a: "An effect with an empty dependency array runs once, like componentDidMount; its cleanup on unmount is like componentWillUnmount; an effect with dependencies re-runs whenever any of them change (running cleanup first), covering componentDidUpdate for exactly those values." },
      { q: "What is the dependency array and how does it affect rendering? (Capgemini)", a: "It tells React when to re-run the effect: omit it and the effect runs after every render; [] runs it once; [a,b] re-runs it whenever a or b changes by reference/value between renders. It doesn't gate rendering itself, only whether the effect runs." },
      { q: "Difference between useState and useEffect (TCS)", a: "useState holds a piece of data that, when updated, triggers a re-render. useEffect runs a side effect (fetching, subscribing, logging) after a render commits — it doesn't hold data or trigger renders on its own, though it often calls a state setter that does." },
      { q: "Why are fetch calls placed inside useEffect? (Accenture)", a: "Rendering should be a pure function of props/state — fetching is a side effect, and useEffect is specifically the hook for side effects that need to happen after the DOM has committed, with a cleanup mechanism to cancel/ignore stale requests when deps change or the component unmounts." },
      { q: "What is useReducer? (Accenture)", a: "A state hook for more complex state transitions — const [state, dispatch] = useReducer(reducer, initialState) — where a pure reducer function computes the next state from the current state and a dispatched action, similar to Redux but local to one component." },
      { q: "What are refs in React? (Accenture)", a: "A mutable container ({current: value}) via useRef that persists across renders but doesn't trigger a re-render when it changes. Commonly used to hold a DOM node reference, but equally valid for any mutable value that shouldn't cause a re-render." },
      { q: "Name hooks other than useState and useEffect (Cognizant)", a: "useContext, useReducer, useRef, useMemo, useCallback, useLayoutEffect, useImperativeHandle, useId, plus any custom hook built from these." },
      { q: "How do you write a custom hook? (UST)", a: "A plain function whose name starts with use that calls other hooks internally and returns whatever data/functions the consuming component needs — e.g. function useDebounce(value, delay){ ... return debounced; }. It's just extracted, reusable stateful logic." },
      { q: "useState vs useRef — what triggers a re-render? (Accenture)", a: "Calling a useState setter schedules a re-render (once React sees the value actually changed). Mutating a useRef's .current does nothing to the render cycle at all — the component keeps whatever it currently has until something else triggers a re-render." }
    ],
    learn: [
      { q: "useEffect with [], with [x], and with no array — describe when each runs, and when its cleanup runs.", a: "[]: runs once, after the very first render. [x]: runs after the first render and again any time x changes between renders. No array: runs after every render. Cleanup always runs right before the effect's next run (or on unmount if there is no next run)." },
      { q: "Cleanup runs \"before the next effect\". Before, or after, the DOM updates?", a: "Before the new DOM updates commit for the render that triggers the new effect — React runs the previous effect's cleanup, then commits the DOM changes for the new render, then runs the new effect. That ordering is what makes cleanup safe for things tied to the old render's DOM node." },
      { q: "Why is useState asynchronous-looking? Is it actually async?", a: "Because the updated value isn't visible in the current render's variables right after you call the setter — you only see it on the next render — which reads like async behaviour. The mechanism itself is synchronous scheduling, not real asynchrony: React just defers applying the update until it re-renders." },
      { q: "setCount(count+1) three times only increments by one. Why? What value is count closed over during that handler?", a: "All three calls read the exact same count — the value captured in that render's closure when the handler was created — so each one just computes and queues 'currentValue + 1' again; the last queued update wins. setCount(c => c+1) instead receives whatever the latest pending state is, so three calls actually compound." },
      { q: "useRef holds a mutable value without re-rendering. Name two legitimate uses that have nothing to do with DOM nodes.", a: "Storing a timer/interval id so it can be cleared later without triggering renders on every tick, and storing a 'previous value' snapshot for comparison inside an effect (or a mutable flag like isMountedRef to guard a late-arriving async callback)." },
      { q: "What are the Rules of Hooks, and what would break if you called a hook conditionally?", a: "Only call hooks at the top level of a component (never inside conditions, loops, or nested functions) and only from React function components or other hooks. React identifies each hook by its call order, not by name — skipping a hook on some renders shifts every subsequent hook's slot, silently corrupting state across renders." }
    ] },
  { id: "react-perf", part: "React", name: "Re-renders & Performance",
    asked: [
      { q: "Performance optimisation techniques in React (Accenture, Infosys, UST)", a: "React.memo/useMemo/useCallback to skip unnecessary work when inputs haven't actually changed, code splitting + lazy loading to shrink initial bundle size, list virtualisation for long lists, and moving state down so a change in one part of the UI doesn't re-render unrelated siblings." },
      { q: "useMemo vs useCallback (Capgemini)", a: "useMemo caches a computed value between renders (recomputing only when its deps change); useCallback caches a function reference the same way. useCallback(fn, deps) is exactly equivalent to useMemo(() => fn, deps)." },
      { q: "\"What exactly is caching?\" → \"Is caching always beneficial?\" (Capgemini, follow-up chain)", a: "Caching is storing a previously computed result so a later request for the same input returns it instead of recomputing. It's not always beneficial — it costs memory for everything cached and maintenance to keep invalidation correct, and it costs more than it saves once inputs change too often for the cache to ever actually hit." },
      { q: "How would you reduce a five-second homepage load? (Accenture)", a: "Code-split routes so the homepage only ships what it needs, lazy-load below-the-fold content and images, prefetch the next likely route, check for unnecessarily large dependencies, and consider server-side rendering the critical above-the-fold content so first paint doesn't wait on the full JS bundle." },
      { q: "How do you avoid unnecessary re-renders? (Accenture)", a: "Wrap components in React.memo so they skip re-rendering when props haven't changed by reference, stabilise the props you pass with useMemo/useCallback so memo's check actually holds, split state so unrelated UI doesn't share a re-render trigger, and move expensive computation into useMemo." },
      { q: "Explain lazy loading and code splitting (Infosys)", a: "Code splitting breaks the JS bundle into smaller chunks loaded on demand instead of all upfront. Lazy loading (React.lazy + Suspense for components, or loading=\"lazy\" for images) defers loading a chunk/resource until it's actually needed, trading a small loading delay at that point for a smaller initial bundle." },
      { q: "This component re-renders even though its props haven't changed — walk me through why (hiring-manager report)", a: "Usually one of: the props look the same but are new object/function references created inline each render (memo's shallow check fails), the parent isn't memoised so it re-renders and re-creates children by default, or the component reads a context/store value that changed even though the specific props it received didn't." }
    ],
    learn: [
      { q: "Name every cause of a component re-rendering. There are fewer than you think.", a: "Its own state changed, its parent re-rendered and it isn't memoised (or its props changed by reference), a context it consumes changed, or a connected store's selected slice changed. That's essentially the complete list." },
      { q: "Two objects with identical contents. Why does React.memo still re-render?", a: "memo's default comparison is shallow reference equality (Object.is per prop), not a deep value comparison — a freshly created object literal is a different reference from the previous render's, even with identical contents, so the check always reports a change." },
      { q: "useMemo caches a value; useCallback caches a function. What do they both actually depend on to work?", a: "Referential stability of their dependency array — they only skip recomputing when every dependency is the same reference (or primitive value) as last time. If a dependency is itself a brand-new object/function every render, the memoisation never actually hits, and you've paid the comparison cost for nothing." },
      { q: "What does memoisation cost? Name three costs.", a: "Memory (every cached result sticks around), maintenance (a wrong or missing dependency silently produces stale results), and a real chance of net-negative benefit on fast-changing data where the cache rarely hits and the comparison overhead dominates." },
      { q: "A component re-renders 47 times a second. What is the first thing you measure, before touching code?", a: "What's actually changing on every one of those renders — use the DevTools Profiler's 'why did this render' info to find the real trigger (a parent render, a context value, a store selector) before guessing and applying memo speculatively." },
      { q: "Code splitting reduces initial bundle size. What does it cost the user, and when is that cost worse than the benefit?", a: "A visible loading state the first time that chunk is needed, while it downloads. It's worse than the benefit when nearly every user ends up visiting that route/component anyway — you've just relocated the wait to a more visible, more jarring moment instead of removing it." }
    ] },
  { id: "react-state", part: "React", name: "State Management",
    asked: [
      { q: "What is the flow of Redux? (TCS)", a: "A UI event dispatches an action (a plain object describing what happened) → the reducer, a pure function, computes new state from the current state and that action → the store updates and notifies subscribers → connected components' selectors re-run and any component whose selected slice changed re-renders." },
      { q: "Why is Redux needed? (Cognizant)", a: "For state that's shared across many unrelated components, updated frequently, or needs middleware/devtools/time-travel debugging — Context alone doesn't give you memoised derived state, structured update logic, or fine-grained subscription, which starts to matter once an app's shared state gets large or busy." },
      { q: "Redux vs Context API — when do you use which? (Accenture)", a: "Context suits small, rarely-changing global values (theme, auth user) — every consumer re-renders on any change with no built-in memoisation. Redux suits complex, frequently-updated state shared across many components, where narrowed/memoised selectors actually matter for performance." },
      { q: "How would you optimise a Redux application? (Infosys)", a: "Normalise state shape, memoise selectors with createSelector/reselect, narrow useSelector calls to only what a component needs, lean on RTK's built-in Immer instead of hand-rolled immutable updates, and code-split reducers for very large apps." },
      { q: "Explain the Context API — creation, provider, consumer (Capgemini)", a: "createContext(defaultValue) creates a Context object. A <Context.Provider value={...}> wraps a subtree and supplies the actual value. Any descendant calls useContext(Context) (or <Context.Consumer>) to read that value directly, without it being passed as a prop through every intermediate component." },
      { q: "How is the store connected to routes? (Cognizant)", a: "The store's Provider wraps the whole app (including the router), so every routed page can read from or dispatch to the same single store regardless of which route is active — routing and state management are independent, orthogonal concerns." },
      { q: "Write the createStore syntax (LTIMindtree)", a: "Legacy Redux: const store = createStore(reducer, preloadedState, applyMiddleware(thunk)). Modern RTK: const store = configureStore({ reducer: { users: usersReducer } }) — configureStore wraps createStore and wires up sensible defaults (thunk, devtools, Immer) automatically." },
      { q: "How do sibling components share data without Redux? (Infosys)", a: "Lift the shared state up to their closest common parent and pass it down as props (with a callback for siblings to update it), or use Context if the tree is deep enough that prop-drilling becomes painful." }
    ],
    learn: [
      { q: "Trace one Redux update end to end, naming every stage: click → … → re-render.", a: "Click → event handler calls dispatch(action) → the store runs every reducer with (currentState, action), each returning its next slice → the store's overall state updates and notifies subscribers → each connected component's useSelector re-runs → any component whose selected value actually changed re-renders." },
      { q: "Context is not a state manager. What does it actually solve, and what does it not solve?", a: "It solves prop drilling — reading a value directly instead of threading it through every intermediate component. It doesn't solve derived/computed state, memoised selectors, or fine-grained update batching the way a real state library does." },
      { q: "Why does putting frequently-changing values in Context cause performance problems?", a: "Every component that calls useContext on that Context re-renders on any change to the value, with no built-in way to subscribe to just part of it — so a fast-changing value re-renders every consumer on every change, unlike a store with selectors that can narrow exactly what triggers a re-render." },
      { q: "Name five distinct Redux optimisation levers.", a: "Normalised state shape, memoised selectors (createSelector/reselect), narrowed useSelector calls, RTK + Immer for safe mutation-style reducers, and code-split/lazily-registered reducers for large apps." },
      { q: "Server state and client state behave differently. Name three ways — and say what that implies about using Redux for API data.", a: "Server state can go stale and needs revalidation; it's naturally keyed/shared by URL or query key rather than by app structure; and it inherently needs loading/error states tied to the fetch itself. Forcing it into Redux usually means re-implementing a caching library's staleness/refetch/dedup logic by hand — which is why dedicated server-cache libraries (React Query, RTK Query) exist instead." }
    ] },
  { id: "react-routing", part: "React", name: "Routing, Forms, APIs",
    asked: [
      { q: "How do you implement routing in React? (Accenture)", a: "React Router: wrap the app in <BrowserRouter>, declare <Routes><Route path=\"/x\" element={<X/>}/></Routes>, and navigate with <Link>/useNavigate() instead of full page reloads — React swaps out the matched component while keeping the SPA's JS state alive." },
      { q: "React Router absolute vs relative paths (Accenture)", a: "An absolute path (starts with /) always resolves from the app's root, regardless of nesting. A relative path resolves against the current route's own path — useful for nested routes so a child doesn't need to know its full ancestor path." },
      { q: "How do you access query params or navigation state? (Accenture — useLocation)", a: "useSearchParams() (or new URLSearchParams(useLocation().search)) for query params like ?page=2; useLocation().state for state passed programmatically via navigate(path, {state}) or <Link state={...}>, which doesn't appear in the URL at all." },
      { q: "Smart form-handling strategies (Accenture)", a: "Controlled inputs for validation-heavy forms; isolate frequently-changing fields into their own components so typing in one doesn't re-render the whole form; validate per-field on blur and the whole form on submit; keep server errors separate from client validation errors." },
      { q: "Explain API methods / HTTP verbs (Infosys)", a: "GET reads (safe, idempotent). POST creates (not idempotent — repeating it can create duplicates). PUT replaces a whole resource (idempotent). PATCH partially updates (should be idempotent). DELETE removes (idempotent)." },
      { q: "Write code to handle an API request from an endpoint (Infosys)", a: "const res = await fetch(url); if (!res.ok) throw new Error(res.status); const data = await res.json(); — wrapped in try/catch with loading/error state, ideally with an AbortController for cancellation." },
      { q: "Error handling and retry logic for APIs (Accenture)", a: "Catch and classify errors (network vs 4xx vs 5xx), show a specific loading/error/empty state rather than a blank screen, and retry only for errors likely to be transient (network failures, 5xx, timeouts) with backoff — not for 4xx client errors, which will just fail again identically." },
      { q: "How do you cancel an API call? (Capgemini — AbortController)", a: "Create an AbortController, pass controller.signal to fetch, and call controller.abort() (e.g. in a cleanup function or before firing a new request) — the fetch promise rejects with an AbortError, which you typically catch and ignore rather than show as a real failure." },
      { q: "How would you implement infinite scroll / load more? (Infosys)", a: "Track a page/cursor plus the accumulated items; either a 'Load more' button or an IntersectionObserver watching a sentinel element at the list's bottom triggers fetching and appending the next page." }
    ],
    learn: [
      { q: "Why does an un-cancelled request cause bugs when the user types fast? Describe the exact interleaving.", a: "Each keystroke can fire its own request, and network timing isn't guaranteed to match request order — a slower, earlier request (for a shorter, stale query) can resolve after a faster, later one, silently overwriting the correct current result with stale data unless something cancels or ignores out-of-order responses." },
      { q: "AbortController cancels the request. Does it cancel the promise? What does the .catch see?", a: "It rejects the fetch promise with an AbortError — the underlying network request is genuinely aborted, and your .catch (or try/catch) receives that AbortError, which you typically want to swallow silently rather than surface as a real failure to the user." },
      { q: "PUT vs PATCH: what does each promise about the resource? Which is idempotent?", a: "PUT replaces the entire resource with exactly the payload given; PATCH applies a partial update. Both are meant to be idempotent — sending the same request twice has the same effect as sending it once — which is what actually distinguishes them from POST, which typically isn't idempotent." },
      { q: "Where should retry logic live — in the component, in a hook, or in the fetch wrapper? Defend it.", a: "In a shared hook or fetch wrapper, not the component. Retry policy — which errors are retryable, how many attempts, what backoff — is cross-cutting logic that should be defined once and reused consistently, not re-implemented inconsistently in every component that happens to call an API." },
      { q: "Controlled inputs re-render on every keystroke. At what form size does that matter, and what do you do then?", a: "For a handful of fields it essentially never matters. On large forms (dozens of fields), isolate each field or field-group into its own component (or use a form library with field-level subscriptions) so a keystroke in one field doesn't re-render the entire form tree." }
    ] },
  { id: "web-basics", part: "HTML, CSS & Git", name: "HTML & CSS",
    asked: [
      { q: "Explain semantic elements (Infosys)", a: "HTML tags that describe their content's meaning, not just its appearance — <header>, <nav>, <main>, <article>, <footer> instead of generic <div>s. Screen readers and search engines use them to understand page structure." },
      { q: "Name five recently introduced HTML elements (Infosys)", a: "<dialog>, <details>/<summary>, <template>, <picture>, <search> — each solving a specific pattern that used to need custom JS/CSS." },
      { q: "What are void elements? (Infosys)", a: "Elements that can't have children and are never closed with a separate closing tag — <img>, <br>, <input>, <hr>, <meta>, <link>." },
      { q: "Create a datalist (Infosys)", a: "<input list=\"opts\"><datalist id=\"opts\"><option value=\"A\"><option value=\"B\"></datalist> — gives free browser-native autocomplete suggestions tied to a regular text input." },
      { q: "What are the key features of CSS? (Infosys)", a: "The cascade and specificity (which rule wins when several match), the box model (content/padding/border/margin), selectors, the two main layout systems (Flexbox and Grid), and features like custom properties (variables), media queries, and transitions/animations." },
      { q: "Semantic HTML tags and CSS pseudo-elements (Cognizant)", a: "Semantic tags name structure/meaning (see above). Pseudo-elements (::before, ::after, ::first-line) target or create a sub-part of an element that isn't a real DOM node, styled/generated purely through CSS." },
      { q: "Difference between display and visibility (TCS)", a: "display:none removes the element from layout entirely (no space, not focusable, no events). visibility:hidden keeps its space reserved but hides it (not focusable/clickable either). Neither is the same as opacity:0, which stays visually invisible but remains in layout and stays focusable/clickable." }
    ],
    learn: [
      { q: "display: none, visibility: hidden, opacity: 0 — which reserve space, which are focusable, which fire events?", a: "display:none — no space, not focusable, no events. visibility:hidden — reserves space, not focusable, no events. opacity:0 — reserves space AND stays focusable and clickable, just invisible. All three look identical on screen; only opacity:0 stays interactive." },
      { q: "Pseudo-class vs pseudo-element: what is the difference in one sentence, and how many colons does each take?", a: "A pseudo-class (one colon — :hover, :nth-child) selects an element in a certain state or position; a pseudo-element (two colons — ::before, ::after) targets or creates a sub-part of an element that doesn't exist as a real DOM node." },
      { q: "Why does semantic markup matter to something other than a human reader? Name two consumers.", a: "Screen readers use semantic tags/landmarks to build a navigable structure for non-visual users, and search engines use them to understand content structure and relevance for indexing and ranking." },
      { q: "Explain specificity as a number. Which wins: an ID, ten classes, or an inline style?", a: "Specificity is compared as a tuple (inline, IDs, classes/attributes/pseudo-classes, elements), column by column — not summed. An inline style beats everything (short of !important); a single ID beats any number of classes, because the comparison never lets a lower column outweigh a higher one." },
      { q: "Flexbox is one-dimensional, Grid two-dimensional. Give one layout each does badly.", a: "Flexbox struggles to align items consistently across multiple wrapped rows (each row's items don't know about the row above/below it). Grid struggles with content that should just organically flow and wrap based on its own size rather than fitting predefined tracks — Flexbox's natural strength." }
    ] },
  { id: "git", part: "HTML, CSS & Git", name: "Git",
    asked: [
      { q: "How do you revert a commit that has already been pushed? (Accenture)", a: "git revert <sha> — adds a new commit that undoes the target commit's changes, preserving history, safe on a shared branch since it doesn't rewrite anything anyone else has already pulled." },
      { q: "How do you switch branches without losing uncommitted changes? (Accenture)", a: "git stash (or git stash -u to include untracked files) shelves the changes, switch branches freely, then git stash pop restores them on whichever branch you're on when you run it." },
      { q: "How do you handle merge conflicts efficiently? (Accenture)", a: "Pull/merge or rebase the target branch in early and often so conflicts stay small; when one happens, edit the file down to the correct final content between the <<<<<<< / ======= / >>>>>>> markers, remove the markers, git add the file, then continue the merge/rebase." },
      { q: "What is Git and how does it help in development? (UST L1)", a: "A distributed version control system — every clone has the full history locally. It lets multiple people work on the same codebase in parallel via branches, tracks every change with a full audit trail, and lets you safely experiment and roll back." }
    ],
    learn: [
      { q: "revert and reset both undo. What does each do to history, and which is safe on main?", a: "revert adds a new commit that undoes changes — history stays intact and additive, safe for a shared branch. reset --hard rewrites history by moving the branch pointer backward and discarding commits, which breaks anyone who already pulled the commits it removes — only safe on a branch nobody else has fetched." },
      { q: "What is actually stored in a stash, and what happens to untracked files?", a: "A stash captures your tracked working-tree and staged changes, stored separately from normal commit history (its own stash list, not a branch). Untracked (brand-new) files are excluded by default — git stash -u includes them too." },
      { q: "Merge vs rebase: what changes about the resulting history? Which does your team use, and why?", a: "Merge preserves both branches' actual commit history and adds a merge commit joining them — an honest record of what happened, but a busier graph. Rebase replays your commits on top of the target branch, producing a clean linear history with no merge commit — but it rewrites commit SHAs, so it's unsafe on commits others have already pulled." },
      { q: "A conflict marker has three sections. Which is yours, which is theirs, and what is the middle one in a diff3 conflict?", a: "<<<<<<< HEAD down to ======= is your current branch's version; ======= down to >>>>>>> branch-name is the incoming branch's version. A diff3-style conflict adds a third ||||||| section in between, showing the common ancestor so you can see what each side actually changed relative to." },
      { q: "What does git fetch do that git pull doesn't?", a: "git fetch downloads the remote's latest history into your local remote-tracking branches without touching your current working branch at all, so you can inspect what changed first. git pull is fetch immediately followed by a merge (or rebase) into your current branch." }
    ] },
  { id: "machine-coding", part: "Machine Coding", name: "Machine Coding Builds",
    asked: [
      { q: "Increment/decrement counter (Accenture)", a: "State: a single number. Two buttons calling setCount(c=>c+1)/setCount(c=>c-1). The follow-ups worth pre-empting: a configurable step size, and a min/max clamp." },
      { q: "Drag-and-drop functionality (TCS)", a: "Native HTML5 drag events (draggable, onDragStart/onDragOver/onDrop) or a small state machine tracking a draggedIndex; reorder the array in state on drop. Remember: no native keyboard equivalent, so accessibility needs a separate keyboard path." },
      { q: "Fetch from an API and display conditionally (Accenture)", a: "loading/error/data state from a single fetch effect; render a spinner while loading, an error message on failure, the data (or an empty state) on success — the three states are the actual signal being tested, not just 'can you call fetch'." },
      { q: "Pagination (Accenture)", a: "State: current page (+ pageSize). Slice the data array (client-side) or send page/pageSize as query params (server-side); reset to page 1 whenever the page size or the underlying query changes." },
      { q: "Load-more / infinite scroll (Infosys)", a: "Track a cursor/page plus the accumulated items so far; append the next page's results rather than replacing them. IntersectionObserver on a bottom sentinel is the cleaner trigger than a manual scroll-position calculation." }
    ],
    learn: [
      { q: "Todo list — the follow-up: persistence; edit-in-place; what's your key?", a: "MVP: array of {id, text, done} in state; add appends, toggle/delete find-by-id and replace/filter the array immutably, filter is a derived (not stored) view over the same array. Key by id, never index. Persist to localStorage on every change; edit-in-place needs a per-item 'editing' flag and a controlled input that commits on blur/Enter." },
      { q: "Star rating — the follow-up: half-star support; keyboard operable", a: "State: value (committed) and hoverValue (preview, null when not hovering) — render fill based on hoverValue ?? value. Half-stars: compute which half of a star the pointer is over via the star's bounding rect and mouse x. Keyboard: make each star (or the group as a radiogroup) focusable and respond to arrow keys." },
      { q: "Accordion — the follow-up: single-open mode; disabled panel; ARIA", a: "State: a Set (or single id) of open panel ids — a Set naturally supports multi-open, a single id naturally supports single-open. Disabled panels skip the toggle handler and get aria-disabled. Each header is a <button> with aria-expanded and aria-controls pointing at its panel." },
      { q: "Tabs — the follow-up: lazy-render panel content; deep-link the active tab", a: "State: activeTab id, list rendered from a tabs config array. Lazy-render: only mount the active panel's content (or mount-once-then-keep, if remounting loses local state). Deep-link: read the initial tab from a query param/URL segment and update it whenever activeTab changes." },
      { q: "Modal — the follow-up: portal, focus trap, Escape, scroll lock", a: "Portal into document.body via createPortal so it escapes the parent's overflow/z-index. Escape: a keydown listener added on mount, removed on unmount. Backdrop click: check event.target === backdrop. Focus trap: store document.activeElement before opening, restore it on close. Scroll lock: body overflow:hidden while open." },
      { q: "Dropdown — the follow-up: keyboard nav; async options", a: "Outside click: a document-level mousedown listener (added while open) that closes if the click target is outside the dropdown's ref. Keyboard: ArrowDown/Up move a highlighted index, Enter selects it. Async options: a loading state shown while fetching, fetched once on first open." },
      { q: "Debounced search — the follow-up: switch to server search + cancellation", a: "Local version: debounce the input, filter an in-memory list. Server version: on the debounced value, fire a fetch with a fresh AbortController each time (aborting the previous in-flight request), and render loading/error/empty from that request's state." },
      { q: "Autocomplete — the follow-up: debounce, keyboard nav, cache, race conditions", a: "Debounce the query. Cache fetched results per query string (a Map) so repeated queries don't refetch. Guard races by tracking the latest request's id/query and ignoring any response that isn't for the current query. Keyboard nav mirrors the dropdown build." },
      { q: "Pagination — the follow-up: server-driven; page-size change; deep link", a: "State: page number (+ pageSize). Server-driven: page/pageSize become query params, the API returns that page's rows plus a total count. Page-size change should reset to page 1. Deep-link: read/write page and pageSize to the URL's query string." },
      { q: "Infinite scroll — the follow-up: IntersectionObserver; virtualisation; prefetch next page", a: "A sentinel element at the bottom, observed with IntersectionObserver — entering the viewport fetches and appends the next page. At large item counts, virtualise (render only the visible window). Prefetch: start fetching slightly before the sentinel is reached so there's no visible gap." },
      { q: "Carousel — the follow-up: circular cycling; autoplay + pause on hover", a: "State: activeIndex. Circular cycling: next/prev wrap with modulo instead of clamping. Autoplay: a setInterval advancing activeIndex, cleared on unmount and paused (interval actually cleared, not just gated) on mouseenter, restarted on mouseleave." },
      { q: "Multi-step form — the follow-up: preserve data backwards; per-step schema", a: "One lifted form-data object across all steps (never per-step local state, which is what loses data on Back), each step validating only its own schema slice on Next; Back never re-validates." },
      { q: "Data table — the follow-up: column sort + filter + pagination combined", a: "Keep raw rows as the source of truth; derive displayed rows via a pipeline — filter, then sort, then paginate — recomputed from raw rows + {filterQuery, sortColumn, sortDir, page}, rather than mutating the array in place at each step." },
      { q: "Nested comments — the follow-up: collapse subtree; recursion vs flat map", a: "A recursive <Comment> that renders its own body then maps its children through itself handles arbitrary depth directly. A flat map with parentId + depth avoids deep call stacks and is easier to virtualise, at the cost of reconstructing the tree shape for things like collapsing a subtree." },
      { q: "File explorer — the follow-up: recursive rendering; lazy-load children", a: "Same recursive-component shape as nested comments. Lazy-load: a folder's children start null/undefined; expanding it the first time fetches, shows a loading state, then caches the result on the node so re-toggling doesn't refetch." },
      { q: "Toast notifications — the follow-up: queueing, stacking, manual dismiss", a: "A single toasts array in a top-level provider; addToast pushes {id, message, ...}, each toast schedules its own dismiss timer on mount, cleared if manually dismissed early. Queueing (show only N at once) needs a separate pending list that shifts into the visible array as visible ones dismiss." },
      { q: "Stopwatch — the follow-up: laps; drift-free timing", a: "A naive setInterval(() => setElapsed(e => e+100), 100) drifts, since each tick's actual delay isn't exactly 100ms. Drift-free: store the start timestamp once and compute elapsed = Date.now() - startTime on each tick. Laps: an array you push the current elapsed time onto." },
      { q: "Progress bar — the follow-up: multiple sequential bars", a: "A width/transform bound to a percent prop with a CSS transition handles a single bar's animation for free. Sequential bars: chain via each bar's transitionend event, or drive all of them from one state machine that advances after a fixed delay matching the transition duration." },
      { q: "Transfer list — the follow-up: multi-select; select-all", a: "Two arrays (or one array with a side field) plus a Set of selected ids per side. Moving transfers the selected ids from one side to the other and clears selection. Select-all toggles every currently-visible id into that side's selection Set in one update." },
      { q: "Drag-and-drop reorder — the follow-up: persist order; keyboard alternative", a: "Track a draggedIndex and dropTargetIndex during dragover, reordering the array (splice out, splice in) on drop. Persist the reordered array after each successful drop. Keyboard alternative: focus an item and let Alt+ArrowUp/Down move it — not optional, since native drag-and-drop has no keyboard equivalent." }
    ] },
  { id: "scenario", part: "Scenario & Architecture", name: "Scenario & Architecture",
    asked: [
      { q: "Design a loan-management system: login page, then three parallel sections (user details, loan details, next repayment) each from a different API, plus a public Loan Types page. (TCS, reproduced)", a: "Route map: /login public, /dashboard protected (guarded, redirects unauthenticated users), /loan-types public. The dashboard fires three independent parallel API calls, each owning its own loading/error state, so one failing endpoint doesn't blank the other two." },
      { q: "Do you know server-side rendering? (Cognizant)", a: "Rendering the initial HTML on the server so the browser gets real content before any JS runs — improves first paint and SEO, at the cost of server compute per request and more complex hydration (attaching React's event handlers to server-rendered markup)." },
      { q: "What is a PWA? (Cognizant)", a: "A web app that adds a manifest and a service worker to get installability, offline caching, and app-like behaviour (push notifications, home-screen icon) without needing a native app store." },
      { q: "Micro-frontend architecture and Webpack (Wipro senior JDs)", a: "Splitting a large frontend into independently deployable pieces owned by separate teams, often stitched together at runtime via Webpack Module Federation. Solves team-scaling and independent deploys; costs bundle-size duplication and cross-team consistency overhead." }
    ],
    learn: [
      { q: "Three independent API calls on one screen. Sequential or parallel? What would make you choose sequential?", a: "Parallel by default — nothing here depends on another call's result. Sequential only makes sense when a later call genuinely needs data from an earlier one, like fetching a user first and then that user's orders by id." },
      { q: "Where does auth state live, and what happens to it on a hard refresh?", a: "Commonly an access token in memory (safest against XSS) with a refresh token in an httpOnly cookie. In-memory state is gone on a hard refresh, so the app needs a silent-refresh step on load, using the httpOnly cookie, to re-establish the session before rendering protected content." },
      { q: "One of three panels fails. What does the user see? What does not happen?", a: "That one panel shows its own error state; the other two render normally with their own data. What does not happen: the whole page doesn't blank out or show one global error — failure stays isolated to the panel that actually failed." },
      { q: "Which parts of a screen would you make separate components, and what is your rule for splitting?", a: "Split along independent data/lifecycle boundaries — anything that fetches its own data, owns its own loading/error state, or re-renders on its own trigger is a natural boundary. Splitting purely by visual layout without considering data ownership tends to produce components that all need to re-render together anyway." },
      { q: "SSR vs CSR: name the metric each improves and the cost each carries.", a: "SSR improves first-contentful-paint and SEO (real HTML arrives immediately) at the cost of server compute per request and hydration complexity. CSR ships a near-empty HTML shell — cheaper to host, simpler to reason about — at the cost of a blank/loading initial paint until JS runs." },
      { q: "What problem do micro-frontends solve? What problem do they create? Would you use one on a 6-person team?", a: "They let independent teams ship and deploy separate parts of a product independently. They create duplicated dependencies/bundle size and cross-team consistency overhead. Not worth it on a 6-person team — there's no team-scaling problem to solve yet, only the integration cost." }
    ] },
  { id: "managerial", part: "Managerial / HR", name: "Managerial & HR",
    asked: [
      { q: "Tell me about yourself (all)", a: "A 60-90 second narrative: current role and what you actually build day to day, one project told as a decision-and-tradeoff (not a feature list), then why you're looking at this opportunity — forward-looking, not a resume readout." },
      { q: "Tell me about your current project and your role (TCS)", a: "Name the system, your specific ownership within it, one concrete decision you made and its tradeoff, and one measurable outcome if you have one — specificity is what makes this defensible under follow-up questions." },
      { q: "Which React version are you using? What other frameworks do you know? (TCS)", a: "Answer exactly what's true — the actual version/major features you've used (hooks vs class-only, concurrent features), and name other frameworks honestly rather than padding the list; this is a fluency check, and vague or overreaching answers invite harder follow-ups." },
      { q: "Why are you leaving your current company? Why us, if you're already at a large MNC? (TCS)", a: "Frame around what you're moving toward — growth, scope, technology — never what you're escaping, and never criticise the current employer by name. The content should survive being repeated back to them." },
      { q: "Have you worked in Agile or Waterfall? (TCS)", a: "Name the actual ceremonies you participate in (standup, sprint planning, retro, demo) and your specific part in each — 'yes, we do Scrum' with no detail reads as unfamiliar even if it's technically true." },
      { q: "Are you willing to relocate? (TCS)", a: "A direct, honest yes/no/conditions answer — hedging or a vague non-answer here is a bigger red flag than a firm 'no' with a clear reason." },
      { q: "What is your notice period? (TCS)", a: "State it accurately and don't offer to shorten it unless you actually can — this gets checked against your actual employment terms and mismatches cause real problems late in the process." },
      { q: "How do you handle time management while building projects? (reported)", a: "A concrete example beats a philosophy — one specific instance of prioritising under a deadline, what you deprioritised, and why, is a stronger answer than a general statement about time-management style." },
      { q: "How do you do unit testing in your project? (Infosys full-stack round)", a: "Name the actual tools/patterns you use (Jest, RTL, render + getByRole + userEvent + expect), one real test you'd write for a specific component, and an honest answer about coverage — 'I haven't used that much' beats bluffing." }
    ],
    learn: [
      { q: "Your 90-second project story: does it end in a decision you made and its tradeoff? If it ends in a feature list, rewrite it.", a: "It should. 'I built X using Y' is a feature list; 'I chose X over Y because Z, which cost us W but bought us V' is a decision — the second is what invites a good follow-up instead of a dead end." },
      { q: "Name a technical disagreement you had and how it resolved. What did you concede?", a: "A strong answer names something specific you actually gave up, not just 'we discussed it and reached a great compromise' — conceding something real signals you can be moved by evidence, not just that you're agreeable." },
      { q: "Name a production bug you caused. What did you change afterwards — in the code, and in the process?", a: "Two parts: the code fix that actually resolved it, and the process change (a test that would've caught it, a review step, a monitoring alert) — naming only the code fix suggests you haven't thought about preventing the next one." },
      { q: "Your \"why leaving\" answer: does it criticise anyone? Rewrite until it doesn't.", a: "Reframe around what you're moving toward, not what you're escaping — growth, scope, technology — never the team, manager, or company by name. It should survive being repeated back to that employer." },
      { q: "What do you actually do in a sprint? Name the ceremonies and your part in each.", a: "Standup (report progress/blockers daily), sprint planning (commit and estimate a slice of work), review/demo (show finished work), retro (name what to keep/change) — with your concrete part in each, not just 'the team does Agile'." }
    ] }
];

// ---------------------------------------------------------------------------
// CODE_QUESTIONS — one entry per [CODE] item in questions/questions.md.
//   mode "predict"   — run the given snippet, compare captured console.log
//                      output (and any thrown error) to the verified-correct
//                      sequence. Verified against a real JS engine, not just
//                      transcribed from the wiki's answer key (it has one
//                      known ordering slip — see js-async-3 below).
//   mode "implement"/"component" — candidate fills in a stub; graded against
//                      hidden tests via exec-engine.js's check/checkThrows/custom.
//   mode "design"     — architecture/build prompts with no single correct
//                      output; task + reveal-reference-solution, same as before.
// ---------------------------------------------------------------------------
export const CODE_QUESTIONS = [

  // ===== js-scope =====
  { id: "sc-1", topic: "js-scope", level: "Noob", xp: XP.Noob, mode: "predict",
    title: "Predict: var hoisting",
    code: `console.log(number);\nvar number = 5;`,
    task: "What logs?",
    expectedLogs: ["undefined"], expectedError: null,
    answer: "undefined", explain: "var's declaration hoists to the top of its scope and is auto-initialised to undefined; the assignment stays on its own line, so the log before it sees undefined, not a ReferenceError." },
  { id: "sc-2", topic: "js-scope", level: "Noob", xp: XP.Noob, mode: "predict",
    title: "Predict: let and the Temporal Dead Zone",
    code: `console.log(letter);\nlet letter = "a";`,
    task: "What happens?",
    expectedLogs: [], expectedError: "ReferenceError",
    answer: "Throws a ReferenceError", explain: "let is hoisted too, but it stays in the Temporal Dead Zone — uninitialised — until its declaration line actually runs. Accessing it before that throws, instead of returning undefined." },
  { id: "sc-3", topic: "js-scope", level: "Noob", xp: XP.Noob, mode: "predict",
    title: "Predict: function declaration vs function expression hoisting",
    code: `foo();\nbar();\nfunction foo() { console.log("foo"); }\nvar bar = function () { console.log("bar"); };`,
    task: "What happens, in order?",
    expectedLogs: ["foo"], expectedError: "TypeError",
    answer: "\"foo\" logs, then bar() throws a TypeError", explain: "Function declarations hoist with their full body, so foo() works before its line. bar is a var assigned a function expression — the var hoists as undefined, so calling bar() before the assignment line is calling undefined(), a TypeError, not a ReferenceError." },
  { id: "sc-4", topic: "js-scope", level: "Noob", xp: XP.Noob, mode: "predict",
    title: "Predict: var shadowing inside a function",
    code: `var x = 1;\nfunction f() {\n  console.log(x);\n  var x = 2;\n}\nf();`,
    task: "What logs?",
    expectedLogs: ["undefined"], expectedError: null,
    answer: "undefined", explain: "The inner var x is hoisted to the top of f's scope, shadowing the outer x for the whole function body — so the log sees the local (still-undefined) x, never the outer 1." },
  { id: "sc-5", topic: "js-scope", level: "Pro", xp: XP.Pro, mode: "predict",
    title: "Predict: block-scoped TDZ with shadowing",
    code: `let a = 1;\n{\n  console.log(a);\n  let a = 2;\n}`,
    task: "What happens?",
    expectedLogs: [], expectedError: "ReferenceError",
    answer: "Throws a ReferenceError", explain: "The block's own let a shadows the outer a for the entire block, including before its declaration line — so the log hits that inner binding's TDZ, not the outer a = 1." },

  // ===== js-closures =====
  { id: "cl-1", topic: "js-closures", level: "Pro", xp: XP.Pro, mode: "predict",
    title: "Predict: var in a setTimeout loop",
    code: `for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}`,
    task: "What logs, in order?",
    expectedLogs: ["3", "3", "3"], expectedError: null,
    answer: "3, 3, 3", explain: "var has one binding for the whole loop. By the time any callback runs, the loop has already finished and i is 3 — all three callbacks close over the same final value." },
  { id: "cl-2", topic: "js-closures", level: "Pro", xp: XP.Pro, mode: "predict",
    title: "Predict: the same loop with let",
    code: `for (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}`,
    task: "What logs, in order?",
    expectedLogs: ["0", "1", "2"], expectedError: null,
    answer: "0, 1, 2", explain: "let creates a fresh binding per iteration, so each callback closes over its own snapshot of i instead of sharing one." },
  { id: "cl-3", topic: "js-closures", level: "Pro", xp: XP.Pro, mode: "implement",
    title: "Write it: makeCounter",
    code: `function makeCounter() {\n  // return { inc, dec, value } where the count is genuinely\n  // private — unreachable from outside except through these methods.\n}`,
    entry: "makeCounter",
    task: "Implement makeCounter() using a closure.",
    tests: [
      custom("inc/dec update a shared private count", async (makeCounter) => {
        const c = makeCounter();
        c.inc(); c.inc(); c.dec();
        const v = c.value();
        return { pass: v === 1, expected: 1, actual: v };
      }),
      custom("the count isn't a directly-readable property", async (makeCounter) => {
        const c = makeCounter();
        const exposed = "count" in c;
        return { pass: !exposed, expected: false, actual: exposed };
      }),
      custom("two counters are independent", async (makeCounter) => {
        const a = makeCounter(), b = makeCounter();
        a.inc(); a.inc();
        const pass = a.value() === 2 && b.value() === 0;
        return { pass, expected: "a=2, b=0", actual: `a=${a.value()}, b=${b.value()}` };
      })
    ],
    answer: `function makeCounter() {\n  let count = 0;\n  return {\n    inc: () => ++count,\n    dec: () => --count,\n    value: () => count\n  };\n}`,
    explain: "The returned functions close over the same count binding; nothing outside the factory can reach that variable directly, so it's genuinely private." },
  { id: "cl-4", topic: "js-closures", level: "Pro", xp: XP.Pro, mode: "implement",
    title: "Write it: once(fn)",
    code: `function once(fn) {\n  // returns a function that runs fn at most one time,\n  // and returns the first result on every later call.\n}`,
    entry: "once",
    task: "Implement once(fn).",
    tests: [
      custom("underlying fn only runs once", async (once) => {
        let calls = 0;
        const wrapped = once(() => { calls++; return calls; });
        wrapped(); wrapped(); wrapped();
        return { pass: calls === 1, expected: 1, actual: calls };
      }),
      custom("later calls return the first result", async (once) => {
        let n = 0;
        const wrapped = once(() => ++n);
        const first = wrapped();
        wrapped(); wrapped();
        const third = wrapped();
        return { pass: first === third, expected: first, actual: third };
      })
    ],
    answer: `function once(fn) {\n  let called = false, result;\n  return (...args) => {\n    if (!called) { result = fn(...args); called = true; }\n    return result;\n  };\n}`,
    explain: "The closure over called and result is what lets once remember, across calls, whether it has already run and what it returned." },
  { id: "cl-5", topic: "js-closures", level: "Hacker", xp: XP.Hacker, mode: "predict",
    title: "Predict: independent closures from a factory",
    code: `function outer() {\n  let count = 0;\n  return function inner() { return ++count; };\n}\nconst a = outer();\nconst b = outer();\nconsole.log(a(), a(), b());`,
    task: "What logs?",
    expectedLogs: ["1 2 1"], expectedError: null,
    answer: "1 2 1", explain: "a and b are separate calls to outer, so each closes over its own count. a's two calls share one binding (1, then 2); b's first call starts fresh at 1." },

  // ===== js-this =====
  { id: "th-1", topic: "js-this", level: "Pro", xp: XP.Pro, mode: "predict",
    title: "Predict: this in a regular vs an arrow function",
    code: `const obj = {\n  name: "obj",\n  regular() { return function () { return this?.name; }; },\n  arrow()   { return () => this.name; }\n};\nconsole.log(obj.regular()());\nconsole.log(obj.arrow()());`,
    task: "What do the two logs print?",
    expectedLogs: ["undefined", "obj"], expectedError: null,
    answer: "undefined, then \"obj\"", explain: "A regular function's this depends on how it's called — called plain (obj.regular()()), this is undefined. An arrow function has no own this; it captures this from where it was defined (obj.arrow), so it keeps \"obj\"." },
  { id: "th-2", topic: "js-this", level: "Pro", xp: XP.Pro, mode: "predict",
    title: "Predict: spread is a shallow copy",
    code: `const o = { a: 1, b: { c: 2 } };\nconst copy = { ...o };\ncopy.b.c = 99;\nconsole.log(o.b.c);`,
    task: "What logs?",
    expectedLogs: ["99"], expectedError: null,
    answer: "99", explain: "Spread only copies top-level keys; nested objects are copied by reference. copy.b and o.b point at the same object, so mutating one mutates both." },
  { id: "th-3", topic: "js-this", level: "Hacker", xp: XP.Hacker, mode: "predict",
    title: "Predict: delete an own property that shadows the prototype",
    code: `function A() {}\nA.prototype.x = 1;\nconst inst = new A();\ninst.x = 2;\ndelete inst.x;\nconsole.log(inst.x);`,
    task: "What logs?",
    expectedLogs: ["1"], expectedError: null,
    answer: "1", explain: "inst.x = 2 creates an own property that shadows the prototype's x. delete only removes own properties — once it's gone, the lookup falls through to A.prototype.x, which was there the whole time." },
  { id: "th-4", topic: "js-this", level: "Hacker", xp: XP.Hacker, mode: "implement",
    title: "Write it: deepClone",
    code: `function deepClone(value) {\n  // handle nested objects, arrays, Date, and cyclic references\n}`,
    entry: "deepClone",
    task: "Implement deepClone(value).",
    tests: [
      custom("nested object is independent of the original", async (deepClone) => {
        const o = { a: { b: 1 } };
        const c = deepClone(o);
        c.a.b = 2;
        return { pass: o.a.b === 1, expected: 1, actual: o.a.b };
      }),
      custom("arrays clone independently", async (deepClone) => {
        const o = [1, [2, 3]];
        const c = deepClone(o);
        c[1].push(4);
        return { pass: o[1].length === 2, expected: 2, actual: o[1].length };
      }),
      custom("Date values clone as a new Date, same time", async (deepClone) => {
        const d = new Date(2020, 0, 1);
        const c = deepClone(d);
        const pass = c instanceof Date && c !== d && +c === +d;
        return { pass, expected: "new Date, same timestamp", actual: `${c instanceof Date} ${c !== d} ${+c === +d}` };
      }),
      custom("cyclic references don't blow the stack", async (deepClone) => {
        const o = { name: "root" };
        o.self = o;
        const c = deepClone(o);
        return { pass: c.self === c, expected: true, actual: c.self === c };
      })
    ],
    answer: `function deepClone(value, seen = new WeakMap()) {\n  if (value === null || typeof value !== "object") return value;\n  if (value instanceof Date) return new Date(value.getTime());\n  if (seen.has(value)) return seen.get(value);\n  const clone = Array.isArray(value) ? [] : {};\n  seen.set(value, clone);\n  for (const key of Object.keys(value)) clone[key] = deepClone(value[key], seen);\n  return clone;\n}`,
    explain: "A WeakMap tracks objects already cloned in this call, so a cycle resolves to the already-created clone instead of recursing forever. structuredClone() does this natively and also handles Map/Set/typed arrays, which JSON.parse(JSON.stringify(x)) silently drops (along with functions, undefined, and Dates, which it turns into strings)." },

  // ===== js-coercion =====
  { id: "co-1", topic: "js-coercion", level: "Noob", xp: XP.Noob, mode: "predict",
    title: "Predict: coercion and equality, eleven lines",
    code: `console.log([] == false);\nconsole.log([] === false);\nconsole.log(null == undefined);\nconsole.log(null === undefined);\nconsole.log(NaN === NaN);\nconsole.log(typeof null);\nconsole.log(typeof NaN);\nconsole.log(0.1 + 0.2 === 0.3);\nconsole.log([1,2,3] + [4,5]);\nconsole.log(0 || "fallback");\nconsole.log(0 ?? "fallback");`,
    task: "What logs for each line, in order?",
    expectedLogs: ["true", "false", "true", "false", "false", "object", "number", "false", "1,2,34,5", "fallback", "0"], expectedError: null,
    answer: "true, false, true, false, false, \"object\", \"number\", false, \"1,2,34,5\", \"fallback\", 0",
    explain: "[] coerces to \"\" then 0 to compare loosely with false; null==undefined is a special-cased true; NaN never equals itself; typeof null is a 25-year-old engine bug; floats aren't exact so 0.1+0.2 is 0.30000000000000004; array + array concatenates their string forms; || falls through any falsy value including 0, but ?? only falls through null/undefined, so 0 ?? \"fallback\" keeps the 0." },

  // ===== js-async =====
  { id: "as-1", topic: "js-async", level: "Pro", xp: XP.Pro, mode: "predict",
    title: "Predict: sync, microtask, macrotask order",
    code: `console.log(1);\nsetTimeout(() => console.log(2), 0);\nPromise.resolve().then(() => console.log(3));\nconsole.log(4);`,
    task: "What logs, in order?",
    expectedLogs: ["1", "4", "3", "2"], expectedError: null,
    answer: "1, 4, 3, 2", explain: "Synchronous code runs first (1, 4), then the microtask queue drains (3), and only then does the event loop pick up the timer (2) — even with a 0ms delay." },
  { id: "as-2", topic: "js-async", level: "Pro", xp: XP.Pro, mode: "predict",
    title: "Predict: async/await ordering",
    code: `async function f() {\n  console.log("A");\n  await null;\n  console.log("B");\n}\nf();\nconsole.log("C");`,
    task: "What logs, in order?",
    expectedLogs: ["A", "C", "B"], expectedError: null,
    answer: "A, C, B", explain: "f() runs synchronously up to the await, logging A. await then yields control back to the caller — C logs next — and the rest of f resumes as a microtask, after the current synchronous code finishes." },
  { id: "as-3", topic: "js-async", level: "Hacker", xp: XP.Hacker, mode: "predict",
    title: "Predict: queueMicrotask vs .then vs setTimeout",
    code: `setTimeout(() => console.log("t1"), 0);\nPromise.resolve().then(() => {\n  console.log("p1");\n  setTimeout(() => console.log("t2"), 0);\n});\nqueueMicrotask(() => console.log("m1"));`,
    task: "What logs, in order?",
    expectedLogs: ["p1", "m1", "t1", "t2"], expectedError: null,
    answer: "p1, m1, t1, t2",
    explain: "Both timers run last, after every microtask. Between p1 and m1 it's about enqueue order, not which API you used: .then() on an already-resolved promise queues its callback immediately when .then() is called (line 2), and queueMicrotask's callback is queued right after that (line 3) — so p1 runs before m1. (This is the one place the wiki's own answer key has it backwards — verified here against a real engine, not copied.)" },
  { id: "as-4", topic: "js-async", level: "Hacker", xp: XP.Hacker, mode: "implement",
    title: "Write it: promiseAll",
    code: `function promiseAll(promises) {\n  // reimplement Promise.all: preserve input order, reject on the\n  // first rejection, and resolve [] for an empty array.\n}`,
    entry: "promiseAll",
    task: "Implement promiseAll(promises).",
    tests: [
      custom("preserves input order regardless of resolution order", async (promiseAll) => {
        const slow = new Promise((r) => setTimeout(() => r("slow"), 40));
        const fast = Promise.resolve("fast");
        const actual = await promiseAll([slow, fast]);
        const pass = actual[0] === "slow" && actual[1] === "fast";
        return { pass, expected: ["slow", "fast"], actual };
      }),
      custom("rejects with the first rejection's reason", async (promiseAll) => {
        try {
          await promiseAll([Promise.resolve(1), Promise.reject(new Error("boom")), Promise.resolve(3)]);
          return { pass: false, expected: "rejects", actual: "resolved" };
        } catch (e) {
          return { pass: e.message === "boom", expected: "boom", actual: e.message };
        }
      }),
      custom("resolves [] for an empty array", async (promiseAll) => {
        const actual = await promiseAll([]);
        return { pass: Array.isArray(actual) && actual.length === 0, expected: [], actual };
      })
    ],
    answer: `function promiseAll(promises) {\n  return new Promise((resolve, reject) => {\n    if (promises.length === 0) return resolve([]);\n    const results = new Array(promises.length);\n    let remaining = promises.length;\n    promises.forEach((p, i) => {\n      Promise.resolve(p).then((v) => {\n        results[i] = v;\n        if (--remaining === 0) resolve(results);\n      }, reject);\n    });\n  });\n}`,
    explain: "Order is preserved by writing into results[i] by index, not by resolution order. Any single rejection calls reject immediately; the other in-flight promises are not cancelled, their eventual results are just ignored." },
  { id: "as-5", topic: "js-async", level: "Hacker", xp: XP.Hacker, mode: "implement",
    title: "Write it: retry",
    code: `function retry(fn, times, delayMs) {\n  // retries a failing async fn with a delay between attempts,\n  // rejecting with the last error if every attempt fails.\n}`,
    entry: "retry",
    task: "Implement retry(fn, times, delayMs).",
    tests: [
      custom("succeeds once fn stops failing, within the attempt budget", async (retry) => {
        let calls = 0;
        const fn = () => { calls++; if (calls < 3) throw new Error("fail " + calls); return "ok"; };
        const actual = await retry(fn, 3, 5);
        return { pass: actual === "ok", expected: "ok", actual };
      }),
      custom("rejects with the last error after exhausting attempts", async (retry) => {
        let calls = 0;
        const fn = () => { calls++; throw new Error("fail " + calls); };
        try {
          await retry(fn, 2, 5);
          return { pass: false, expected: "rejects", actual: "resolved" };
        } catch (e) {
          return { pass: e.message === "fail 2" && calls === 2, expected: "fail 2, 2 attempts", actual: `${e.message}, ${calls} attempts` };
        }
      })
    ],
    answer: `function retry(fn, times, delayMs) {\n  return new Promise((resolve, reject) => {\n    let attempt = 0;\n    function tryOnce() {\n      attempt++;\n      Promise.resolve().then(fn).then(resolve, (err) => {\n        if (attempt >= times) reject(err);\n        else setTimeout(tryOnce, delayMs);\n      });\n    }\n    tryOnce();\n  });\n}`,
    explain: "Wrapping fn in Promise.resolve().then(fn) normalises both a thrown error and a rejected promise into the same failure path, so one retry loop handles either." },

  // ===== js-utils =====
  { id: "ut-1", topic: "js-utils", level: "Pro", xp: XP.Pro, mode: "implement",
    title: "Write it: debounce with cancel",
    code: `function debounce(fn, delay) {\n  // returns a debounced function with a .cancel() method\n}`,
    entry: "debounce",
    task: "Implement debounce(fn, delay).",
    tests: [
      custom("collapses rapid calls into one, after the quiet period", async (debounce) => {
        let calls = 0;
        const d = debounce(() => calls++, 30);
        d(); d(); d();
        await new Promise((r) => setTimeout(r, 90));
        return { pass: calls === 1, expected: 1, actual: calls };
      }),
      custom("cancel() prevents the pending call", async (debounce) => {
        let calls = 0;
        const d = debounce(() => calls++, 30);
        d();
        d.cancel();
        await new Promise((r) => setTimeout(r, 90));
        return { pass: calls === 0, expected: 0, actual: calls };
      })
    ],
    answer: `function debounce(fn, delay) {\n  let timer;\n  function debounced(...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn.apply(this, args), delay);\n  }\n  debounced.cancel = () => clearTimeout(timer);\n  return debounced;\n}`,
    explain: "Each call clears the pending timer and schedules a new one; the closure over timer is what makes cancel() and the delay logic possible." },
  { id: "ut-2", topic: "js-utils", level: "Pro", xp: XP.Pro, mode: "implement",
    title: "Write it: throttle (leading edge)",
    code: `function throttle(fn, limit) {\n  // fn runs immediately on the first call, then further calls\n  // are ignored until \`limit\` ms have passed.\n}`,
    entry: "throttle",
    task: "Implement throttle(fn, limit).",
    tests: [
      custom("runs on the first call, ignores calls within the window", async (throttle) => {
        let calls = 0;
        const t = throttle(() => calls++, 60);
        t(); t(); t();
        return { pass: calls === 1, expected: 1, actual: calls };
      }),
      custom("runs again once the window has passed", async (throttle) => {
        let calls = 0;
        const t = throttle(() => calls++, 40);
        t();
        await new Promise((r) => setTimeout(r, 70));
        t();
        return { pass: calls === 2, expected: 2, actual: calls };
      })
    ],
    answer: `function throttle(fn, limit) {\n  let waiting = false;\n  return function (...args) {\n    if (waiting) return;\n    fn.apply(this, args);\n    waiting = true;\n    setTimeout(() => { waiting = false; }, limit);\n  };\n}`,
    explain: "Throttle guarantees a steady maximum rate — good for scroll/resize handlers — versus debounce's \"wait for quiet\" behaviour, which suits search-as-you-type." },
  { id: "ut-3", topic: "js-utils", level: "Pro", xp: XP.Pro, mode: "implement",
    title: "Write it: flatten (no Array.prototype.flat)",
    code: `function flatten(arr) {\n  // flattens to any depth, without using Array.prototype.flat\n}`,
    entry: "flatten",
    task: "Implement flatten(arr).",
    tests: [
      check([[1, [2, [3, [4]], 5]]], [1, 2, 3, 4, 5], { name: "flattens arbitrary nesting" }),
      check([[]], [], { name: "empty array" }),
      check([[1, 2, 3]], [1, 2, 3], { name: "already flat" })
    ],
    answer: `function flatten(arr) {\n  return arr.reduce((acc, v) => acc.concat(Array.isArray(v) ? flatten(v) : v), []);\n}`,
    explain: "Recursion handles arbitrary depth: each array element gets flattened again before concatenating; non-array elements concatenate as-is." },
  { id: "ut-4", topic: "js-utils", level: "Hacker", xp: XP.Hacker, mode: "implement",
    title: "Write it: Array.prototype.myMap",
    code: `Array.prototype.myMap = function (callback) {\n  // implement map as a prototype method\n};\n\n// leave this line — it's just how the grader confirms you're ready\nconst ready = true;`,
    entry: "ready",
    task: "Implement Array.prototype.myMap.",
    tests: [
      custom("doubles every value", async () => {
        const out = [1, 2, 3].myMap((x) => x * 2);
        const pass = JSON.stringify(out) === JSON.stringify([2, 4, 6]);
        return { pass, expected: [2, 4, 6], actual: out };
      }),
      custom("passes (value, index, array) to the callback", async () => {
        const seen = [];
        [10, 20].myMap((v, i, arr) => seen.push([v, i, arr.length]));
        const pass = JSON.stringify(seen) === JSON.stringify([[10, 0, 2], [20, 1, 2]]);
        return { pass, expected: [[10, 0, 2], [20, 1, 2]], actual: seen };
      })
    ],
    answer: `Array.prototype.myMap = function (callback) {\n  const result = [];\n  for (let i = 0; i < this.length; i++) {\n    if (i in this) result.push(callback(this[i], i, this));\n  }\n  return result;\n};\nconst ready = true;`,
    explain: "The if (i in this) check skips holes in sparse arrays, matching how the real Array.prototype.map behaves." },
  { id: "ut-5", topic: "js-utils", level: "Hacker", xp: XP.Hacker, mode: "implement",
    title: "Write it: curry",
    code: `function curry(fn) {\n  // sum(1)(2)(3) and sum(1,2)(3) and sum(1,2,3) should all work\n  // for a 3-argument fn\n}`,
    entry: "curry",
    task: "Implement curry(fn).",
    tests: [
      custom("fully curried calls", async (curry) => {
        const sum = (a, b, c) => a + b + c;
        const csum = curry(sum);
        const actual = csum(1)(2)(3);
        return { pass: actual === 6, expected: 6, actual };
      }),
      custom("partially-grouped calls", async (curry) => {
        const sum = (a, b, c) => a + b + c;
        const csum = curry(sum);
        const actual = csum(1, 2)(3);
        return { pass: actual === 6, expected: 6, actual };
      }),
      custom("all args at once", async (curry) => {
        const sum = (a, b, c) => a + b + c;
        const csum = curry(sum);
        const actual = csum(1, 2, 3);
        return { pass: actual === 6, expected: 6, actual };
      })
    ],
    answer: `function curry(fn) {\n  return function curried(...args) {\n    if (args.length >= fn.length) return fn.apply(this, args);\n    return (...more) => curried.apply(this, args.concat(more));\n  };\n}`,
    explain: "fn.length gives the declared arity; curried keeps collecting args until it has enough, then calls the original — the closure over args is what lets the accumulation happen across separate calls." },
  { id: "ut-6", topic: "js-utils", level: "Hacker", xp: XP.Hacker, mode: "implement",
    title: "Write it: memoize",
    code: `function memoize(fn) {\n  // cache results keyed on arguments\n}`,
    entry: "memoize",
    task: "Implement memoize(fn).",
    tests: [
      custom("repeated calls with the same args hit the cache", async (memoize) => {
        let calls = 0;
        const slow = (n) => { calls++; return n * 2; };
        const m = memoize(slow);
        m(5); m(5); m(5);
        return { pass: calls === 1, expected: 1, actual: calls };
      }),
      custom("different args recompute", async (memoize) => {
        let calls = 0;
        const slow = (n) => { calls++; return n * 2; };
        const m = memoize(slow);
        m(5); m(6); m(5);
        return { pass: calls === 2, expected: 2, actual: calls };
      })
    ],
    answer: `function memoize(fn) {\n  const cache = new Map();\n  return function (...args) {\n    const key = JSON.stringify(args);\n    if (cache.has(key)) return cache.get(key);\n    const result = fn.apply(this, args);\n    cache.set(key, result);\n    return result;\n  };\n}`,
    explain: "Memoisation trades memory for time — it's a loss once the cache rarely hits (fast-changing inputs) or the comparison/serialisation cost rivals the recomputation it's avoiding." },
  { id: "ut-7", topic: "js-utils", level: "Pro", xp: XP.Pro, mode: "implement",
    title: "Write it: groupBy",
    code: `function groupBy(arr, keyFn) {\n  // groups items into an object keyed by keyFn(item)\n}`,
    entry: "groupBy",
    task: "Implement groupBy(arr, keyFn).",
    tests: [
      custom("groups by parity", async (groupBy) => {
        const actual = groupBy([1, 2, 3, 4, 5], (n) => (n % 2 === 0 ? "even" : "odd"));
        const pass = JSON.stringify(actual.odd) === JSON.stringify([1, 3, 5]) && JSON.stringify(actual.even) === JSON.stringify([2, 4]);
        return { pass, expected: "{odd:[1,3,5], even:[2,4]}", actual: JSON.stringify(actual) };
      })
    ],
    answer: `function groupBy(arr, keyFn) {\n  return arr.reduce((acc, item) => {\n    const k = keyFn(item);\n    (acc[k] = acc[k] || []).push(item);\n    return acc;\n  }, {});\n}`,
    explain: "A single reduce pass buckets each item under its computed key, creating the bucket array lazily on first use." },
  { id: "ut-8", topic: "js-utils", level: "Pro", xp: XP.Pro, mode: "implement",
    title: "Write it: deepEqual",
    code: `function deepEqual(a, b) {\n  // recursively compares plain objects and arrays\n}`,
    entry: "deepEqual",
    task: "Implement deepEqual(a, b).",
    tests: [
      check([{ a: 1, b: [1, 2] }, { a: 1, b: [1, 2] }], true, { name: "equal nested structures" }),
      check([{ a: 1 }, { a: 2 }], false, { name: "unequal values" }),
      check([[1, 2], [1, 2, 3]], false, { name: "different lengths" }),
      check([NaN, NaN], true, { name: "NaN equals NaN (unlike ===)" })
    ],
    answer: `function deepEqual(a, b) {\n  if (Object.is(a, b)) return true;\n  if (typeof a !== typeof b || a === null || b === null || typeof a !== "object") return false;\n  const ak = Object.keys(a), bk = Object.keys(b);\n  if (ak.length !== bk.length) return false;\n  return ak.every((k) => deepEqual(a[k], b[k]));\n}`,
    explain: "Object.is treats NaN as equal to itself and distinguishes +0/-0, which is usually what a general-purpose deepEqual should do — plain === would fail the NaN case." },
  { id: "ut-9", topic: "js-utils", level: "Noob", xp: XP.Noob, mode: "implement",
    title: "Merge two arrays using spread",
    code: `function mergeArrays(a, b) {\n  // merge using the spread operator\n}`,
    entry: "mergeArrays",
    task: "Implement mergeArrays(a, b). [Infosys]",
    tests: [check([[1, 2], [3, 4]], [1, 2, 3, 4])],
    answer: `function mergeArrays(a, b) {\n  return [...a, ...b];\n}`,
    explain: "Spread expands each array's elements in place, so [...a, ...b] builds one flat array." },
  { id: "ut-10", topic: "js-utils", level: "Noob", xp: XP.Noob, mode: "implement",
    title: "Remove duplicates from an array",
    code: `function removeDuplicates(arr) {\n  // return arr with duplicate values removed\n}`,
    entry: "removeDuplicates",
    task: "Implement removeDuplicates(arr). [Infosys]",
    tests: [check([[1, 2, 2, 3, 1, 4]], [1, 2, 3, 4])],
    answer: `function removeDuplicates(arr) {\n  return [...new Set(arr)];\n}`,
    explain: "A Set only keeps unique values and preserves insertion order, so spreading it back into an array removes duplicates in one line." },
  { id: "ut-11", topic: "js-utils", level: "Pro", xp: XP.Pro, mode: "implement",
    title: "Reverse a string",
    code: `function reverseString(s) {\n  // implement one way; be ready to name two more out loud\n  // (a for-loop building backwards, and recursion)\n}`,
    entry: "reverseString",
    task: "Implement reverseString(s). Interviewers may ask for it three different ways — split/reverse/join, a manual loop, and recursion. [Deloitte]",
    tests: [check(["hello"], "olleh"), check([""], "")],
    answer: `function reverseString(s) {\n  return s.split("").reverse().join("");\n}\n\n// Two more ways, worth being able to say out loud:\n// for (let i = s.length - 1, out = ""; i >= 0; i--) out += s[i];\n// const rec = (str) => str.length <= 1 ? str : rec(str.slice(1)) + str[0];`,
    explain: "split/reverse/join is the idiomatic one-liner; a manual loop and a recursive version show you understand what's happening underneath." },
  { id: "ut-12", topic: "js-utils", level: "Noob", xp: XP.Noob, mode: "implement",
    title: "Check whether a string is a palindrome",
    code: `function isPalindrome(s) {\n  // true if s reads the same forwards and backwards\n}`,
    entry: "isPalindrome",
    task: "Implement isPalindrome(s). [Accenture]",
    tests: [check(["level"], true), check(["hello"], false)],
    answer: `function isPalindrome(s) {\n  return s === s.split("").reverse().join("");\n}`,
    explain: "Comparing the string to its own reverse is the simplest correct check for exact-case, no-punctuation input." },
  { id: "ut-13", topic: "js-utils", level: "Hacker", xp: XP.Hacker, mode: "implement",
    title: "Longest substring without repeating characters",
    code: `function longestUniqueSubstring(s) {\n  // return the longest substring with no repeated characters\n}`,
    entry: "longestUniqueSubstring",
    task: "Implement longestUniqueSubstring(s). [Accenture]",
    tests: [check(["abcabcbb"], "abc"), check(["bbbbb"], "b"), check(["dvdf"], "vdf")],
    answer: `function longestUniqueSubstring(s) {\n  let start = 0, best = "";\n  const seen = new Map();\n  for (let end = 0; end < s.length; end++) {\n    const c = s[end];\n    if (seen.has(c) && seen.get(c) >= start) start = seen.get(c) + 1;\n    seen.set(c, end);\n    if (end - start + 1 > best.length) best = s.slice(start, end + 1);\n  }\n  return best;\n}`,
    explain: "A sliding window tracks the last-seen index of each character; hitting a repeat inside the current window jumps the window's start past the earlier occurrence, in one linear pass." },
  { id: "ut-14", topic: "js-utils", level: "Noob", xp: XP.Noob, mode: "implement",
    title: "Find the maximum value in an array",
    code: `function findMax(arr) {\n  // return the largest number in arr\n}`,
    entry: "findMax",
    task: "Implement findMax(arr). [Capgemini]",
    tests: [check([[3, 7, 2, 9, 4]], 9)],
    answer: `function findMax(arr) {\n  return Math.max(...arr);\n}`,
    explain: "Math.max takes any number of arguments, and spread turns the array into that argument list — fine for reasonably-sized arrays." },
  { id: "ut-15", topic: "js-utils", level: "Noob", xp: XP.Noob, mode: "implement",
    title: "Title-case a string",
    code: `function titleCase(s) {\n  // "i am developer" -> "I Am Developer"\n}`,
    entry: "titleCase",
    task: "Implement titleCase(s). [Capgemini]",
    tests: [check(["i am developer"], "I Am Developer")],
    answer: `function titleCase(s) {\n  return s.split(" ").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");\n}`,
    explain: "Split on spaces, capitalise each word's first character, rejoin." },
  { id: "ut-16", topic: "js-utils", level: "Noob", xp: XP.Noob, mode: "implement",
    title: "Check whether a number is prime",
    code: `function isPrime(n) {\n  // true if n is prime\n}`,
    entry: "isPrime",
    task: "Implement isPrime(n). [Capgemini]",
    tests: [check([7], true), check([8], false), check([1], false), check([2], true)],
    answer: `function isPrime(n) {\n  if (n < 2) return false;\n  for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;\n  return true;\n}`,
    explain: "You only need to test divisors up to √n — if n had a factor larger than its square root, it would have a matching factor smaller than it too." },
  { id: "ut-17", topic: "js-utils", level: "Noob", xp: XP.Noob, mode: "predict",
    title: "Predict: the map(parseInt) trap",
    code: `console.log(['1','2','3'].map(parseInt));`,
    task: "What does this evaluate to, and why?",
    expectedLogs: ["[1,NaN,NaN]"], expectedError: null,
    answer: "[1, NaN, NaN]", explain: "map calls its callback with (value, index, array). parseInt(value, radix) treats index as the radix: parseInt('1',0)=1 (0 means \"guess base 10\"), parseInt('2',1) is an invalid radix → NaN, parseInt('3',2) → NaN (3 isn't a valid digit in base 2)." },
  { id: "ut-18", topic: "js-utils", level: "Pro", xp: XP.Pro, mode: "design",
    title: "Pick the right Promise combinator",
    code: `// (a) load 3 dashboard widgets, none critical\n// (b) fetch from 3 mirrors, take whichever answers first successfully\n// (c) block a page until all required data loads\n// (d) add a timeout to a fetch`,
    task: "For each scenario, name the combinator you'd reach for and why.",
    answer: "(a) Promise.allSettled — every widget resolves independently, a failure shouldn't block the others. (b) Promise.any — the first success wins, individual rejections are ignored. (c) Promise.all — all-or-nothing, a single failure should block the page. (d) Promise.race — race the real fetch against a timer promise that rejects after N ms.",
    explain: "The deciding question each time is: do failures matter individually, do you need all results or just the first, and should one slow/failing source be allowed to block everything else." },

  // ===== react-core =====
  { id: "rc-1", topic: "react-core", level: "Pro", xp: XP.Pro, mode: "design",
    title: "Bug hunt: index keys",
    code: `{items.map((item, i) => <Row key={i} {...item} />)}`,
    task: "Change it to key={item.id}. Describe a concrete bug the index key causes.",
    answer: "Delete the first item from a list of text inputs — the remaining inputs keep their typed values but shift up one row, because React matches by index/position, not identity, and reuses the wrong DOM node's state.",
    explain: "Keys tell React which element is which across renders. Index keys are stable positions, not stable identities, so reordering or deleting scrambles per-item state." },
  { id: "rc-2", topic: "react-core", level: "Hacker", xp: XP.Hacker, mode: "component",
    title: "Write it: withAuth HOC",
    code: `function withAuth(Component) {\n  // return a component that:\n  // - renders <div>Please log in</div> when it has no \`token\` prop\n  // - otherwise renders <Component {...props} />\n}\n\nfunction Profile({ name }) {\n  return <div>Welcome, {name}</div>;\n}\n\nconst ProtectedProfile = withAuth(Profile);`,
    entry: "ProtectedProfile",
    task: "Implement withAuth so ProtectedProfile gates Profile behind a token prop. [Infosys, Cognizant, TCS]",
    tests: [
      custom("shows a login prompt without a token", async (Candidate, { React, mount }) => {
        const h = React.createElement;
        const { container, unmount } = mount(h(Candidate, {}));
        const text = container.textContent;
        unmount();
        return { pass: /please log in/i.test(text), expected: 'contains "Please log in"', actual: text };
      }),
      custom("passes props through once a token is present", async (Candidate, { React, mount }) => {
        const h = React.createElement;
        const { container, unmount } = mount(h(Candidate, { token: "abc", name: "Priya" }));
        const text = container.textContent;
        unmount();
        return { pass: /priya/i.test(text) && !/please log in/i.test(text), expected: 'contains "Priya", no login prompt', actual: text };
      })
    ],
    answer: `function withAuth(Component) {\n  return function Wrapped(props) {\n    if (!props.token) return <div>Please log in</div>;\n    return <Component {...props} />;\n  };\n}`,
    explain: "The HOC is just a function returning a new component; it decides once, at render time, whether to render the gate or forward every prop through to the wrapped component." },
  { id: "rc-3", topic: "react-core", level: "Pro", xp: XP.Pro, mode: "component",
    title: "Convert an uncontrolled input to controlled",
    code: `function ControlledInput({ value, onChange }) {\n  // render an <input> whose displayed value comes from the\n  // \`value\` prop, and that calls onChange when the user types\n}`,
    entry: "ControlledInput",
    task: "Turn this into a controlled input, then say which you'd choose for a 40-field form and why.",
    tests: [
      custom("reflects the value prop", async (Candidate, { React, mount }) => {
        const h = React.createElement;
        const { container, unmount } = mount(h(Candidate, { value: "hi", onChange: () => {} }));
        const input = container.querySelector("input");
        const pass = !!input && input.value === "hi";
        unmount();
        return { pass, expected: 'input.value === "hi"', actual: input ? input.value : "(no input rendered)" };
      }),
      custom("fires onChange with the typed value", async (Candidate, { React, mount }) => {
        const h = React.createElement;
        let seen = null;
        const { container, unmount } = mount(h(Candidate, { value: "hi", onChange: (e) => { seen = e.target.value; } }));
        const input = container.querySelector("input");
        if (input) {
          const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
          setter.call(input, "hip");
          input.dispatchEvent(new Event("input", { bubbles: true }));
        }
        unmount();
        return { pass: seen === "hip", expected: "hip", actual: seen };
      })
    ],
    answer: `function ControlledInput({ value, onChange }) {\n  return <input value={value} onChange={onChange} />;\n}`,
    explain: "For a 40-field form, fully controlled inputs re-render on every keystroke — usually fine, but at that scale it's worth isolating each field (or a field group) so one keystroke doesn't re-render the whole form, or using an uncontrolled form lib that only re-renders on submit/validation." },
  { id: "rc-4", topic: "react-core", level: "God", xp: XP.God, mode: "component",
    title: "Write it: portal target",
    code: `function PortalBox({ children }) {\n  // render \`children\` into document.body via a portal, not into\n  // the local DOM tree\n}`,
    entry: "PortalBox",
    task: "Implement PortalBox using ReactDOM.createPortal. (The full <Modal> also needs Escape-to-close, backdrop click, and focus restore — see the reference solution.)",
    tests: [
      custom("renders outside the local container, into document.body", async (Candidate, { React, mount }) => {
        const h = React.createElement;
        const { container, unmount } = mount(h(Candidate, { children: h("span", { className: "portal-probe" }, "Hi") }));
        const inLocal = !!container.querySelector(".portal-probe");
        const inBody = !!document.querySelector(".portal-probe");
        unmount();
        return { pass: !inLocal && inBody, expected: "not in local container, present in document.body", actual: `local:${inLocal} body:${inBody}` };
      })
    ],
    answer: `function PortalBox({ children }) {\n  return ReactDOM.createPortal(children, document.body);\n}\n\n// A full Modal adds: a keydown listener for Escape (added on mount,\n// removed on unmount), a backdrop click handler that checks\n// event.target === backdrop, and storing document.activeElement\n// before opening so it can be refocused in the cleanup.`,
    explain: "A portal changes where the DOM node lives, not where it sits in the React tree — events fired inside it still bubble to the React parent, which is why the close handlers can live in the component that renders the portal." },

  // ===== react-hooks =====
  { id: "rh-1", topic: "react-hooks", level: "Hacker", xp: XP.Hacker, mode: "design",
    title: "Bug hunt: stale closure in an interval",
    code: `useEffect(() => {\n  const id = setInterval(() => console.log(count), 1000);\n  return () => clearInterval(id);\n}, []);`,
    task: "Why does count always log the same (first) value? Give two different correct fixes and say which you'd ship.",
    answer: "The effect runs once (empty deps), so the interval callback closes over the count from that first render forever — it never sees later renders' count. Fix 1: add count to the dependency array (the interval gets torn down and recreated every time count changes — simple, but resets the timer each time). Fix 2: use a ref that's kept up to date (updated in a separate effect with no cleanup cost) and read ref.current inside the interval, or use the functional form via useReducer/useState's updater to avoid depending on the stale variable at all. I'd ship the ref version when the interval itself shouldn't restart on every state change.",
    explain: "This is the single most common hook bug in the wiki's dataset — a value read inside a callback registered once, that never gets refreshed because nothing tells React to recreate it." },
  { id: "rh-2", topic: "react-hooks", level: "Hacker", xp: XP.Hacker, mode: "component",
    title: "Fix it: setState batching",
    code: `function Counter() {\n  const [count, setCount] = React.useState(0);\n  function handleClick() {\n    setCount(count + 1);\n    setCount(count + 1);\n    setCount(count + 1);\n  }\n  return <button onClick={handleClick}>{count}</button>;\n}`,
    entry: "Counter",
    task: "One click only advances the count by one instead of three. Fix handleClick so a single click adds three, without changing the button's onClick wiring.",
    tests: [
      custom("one click advances the count by three", async (Candidate, { React, mount }) => {
        const h = React.createElement;
        const { container, unmount } = mount(h(Candidate));
        const btn = container.querySelector("button");
        btn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        await new Promise((r) => setTimeout(r, 30));
        const text = container.textContent;
        unmount();
        return { pass: text === "3", expected: "3", actual: text };
      })
    ],
    answer: `function Counter() {\n  const [count, setCount] = React.useState(0);\n  function handleClick() {\n    setCount((c) => c + 1);\n    setCount((c) => c + 1);\n    setCount((c) => c + 1);\n  }\n  return <button onClick={handleClick}>{count}</button>;\n}`,
    explain: "All three calls in the original read the same stale count captured by this render's closure, so each just resets to count+1. The updater form receives the latest pending state, so the three queued updates compound instead of overwriting each other." },
  { id: "rh-3", topic: "react-hooks", level: "Hacker", xp: XP.Hacker, mode: "component",
    title: "Write it: useDebounce",
    code: `function useDebounce(value, delay) {\n  // return \`value\`, but only update after \`delay\` ms of no changes\n}`,
    entry: "useDebounce",
    task: "Implement the custom hook useDebounce(value, delay). (useFetch({data,loading,error}) follows the same shape — see the reference.)",
    tests: [
      custom("settles to the latest value after the delay, staying behind before it", async (Candidate, { React, mount }) => {
        const h = React.createElement;
        let latest;
        function Harness({ v }) { latest = Candidate(v, 40); return null; }
        const { root, unmount } = mount(h(Harness, { v: "a" }));
        await new Promise((r) => setTimeout(r, 10));
        root.render(h(Harness, { v: "ab" }));
        await new Promise((r) => setTimeout(r, 10));
        root.render(h(Harness, { v: "abc" }));
        const beforeDelay = latest;
        await new Promise((r) => setTimeout(r, 90));
        root.render(h(Harness, { v: "abc" }));
        await new Promise((r) => setTimeout(r, 10));
        const settled = latest;
        unmount();
        return { pass: settled === "abc" && beforeDelay !== "abc", expected: 'stays behind, then settles to "abc"', actual: `before:${beforeDelay} after:${settled}` };
      })
    ],
    answer: `function useDebounce(value, delay) {\n  const [debounced, setDebounced] = React.useState(value);\n  React.useEffect(() => {\n    const t = setTimeout(() => setDebounced(value), delay);\n    return () => clearTimeout(t);\n  }, [value, delay]);\n  return debounced;\n}\n\n// useFetch(url) follows the same cleanup shape:\nfunction useFetch(url) {\n  const [state, setState] = React.useState({ data: null, loading: true, error: null });\n  React.useEffect(() => {\n    const controller = new AbortController();\n    setState({ data: null, loading: true, error: null });\n    fetch(url, { signal: controller.signal })\n      .then((r) => r.json())\n      .then((data) => setState({ data, loading: false, error: null }))\n      .catch((error) => { if (error.name !== "AbortError") setState({ data: null, loading: false, error }); });\n    return () => controller.abort();\n  }, [url]);\n  return state;\n}`,
    explain: "Every keystroke reschedules the timeout via cleanup-then-reschedule; only the last keystroke's timer survives long enough to fire, which is what makes the returned value \"settle\"." },
  { id: "rh-4", topic: "react-hooks", level: "Pro", xp: XP.Pro, mode: "design",
    title: "Rewrite six useState calls as one useReducer",
    code: `// A form with 6 useState calls: name, email, phone, address, city, pincode.`,
    task: "Rewrite it as a single useReducer. When is that the better choice?",
    answer: "One reducer with a single state object and a dispatch({field, value}) action collapses six setters into one update path, makes batched multi-field updates (e.g. resetting the whole form) trivial, and centralises validation/transition logic in the reducer instead of scattering it across handlers. useReducer earns its complexity once fields are related and updated together, or when the next state depends on more than one previous field — for a handful of independent primitives, separate useState calls are simpler and fine.",
    explain: "The tell is coupling: if setting one field often means also touching another (validation, derived fields, resets), a reducer keeps that logic in one place instead of spread across six onChange handlers." },

  // ===== react-perf =====
  { id: "rp-1", topic: "react-perf", level: "Hacker", xp: XP.Hacker, mode: "component",
    title: "Fix it: unnecessary re-render",
    code: `let childRenderCount = 0;\nfunction Child({ style, onClick }) {\n  childRenderCount++;\n  return <button style={style} onClick={onClick}>clicks</button>;\n}\nChild = React.memo(Child);\n\nfunction Parent() {\n  const [n, setN] = React.useState(0);\n  // fix Child's props below so React.memo actually stops the re-renders\n  return <Child style={{ margin: 8 }} onClick={() => setN(n + 1)} />;\n}\n\n// leave this harness line as-is\nconst __harness = { Parent, getCount: () => childRenderCount };`,
    entry: "__harness",
    task: "Why does Child re-render every time despite React.memo? Fix it.",
    tests: [
      custom("Child stops re-rendering once props are stabilised", async (Candidate, { React, mount }) => {
        const h = React.createElement;
        const { container, unmount } = mount(h(Candidate.Parent));
        const before = Candidate.getCount();
        const btn = container.querySelector("button");
        btn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        await new Promise((r) => setTimeout(r, 20));
        btn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        await new Promise((r) => setTimeout(r, 20));
        const after = Candidate.getCount();
        unmount();
        return { pass: after === before, expected: `${before} (no new renders)`, actual: after };
      })
    ],
    answer: `const stableStyle = { margin: 8 };\nfunction Parent() {\n  const [n, setN] = React.useState(0);\n  const handleClick = React.useCallback(() => setN((v) => v + 1), []);\n  return <Child style={stableStyle} onClick={handleClick} />;\n}`,
    explain: "style={{margin:8}} and onClick={() => ...} are new object/function references on every Parent render, so React.memo's shallow prop comparison always sees a change. Hoisting the style object to a constant and wrapping the handler in useCallback makes the props referentially stable, which is what memo actually needs." },
  { id: "rp-2", topic: "react-perf", level: "Pro", xp: XP.Pro, mode: "design",
    title: "Is this useMemo worth it?",
    code: `const total = useMemo(() => items.length, [items]);`,
    task: "Justify either answer.",
    answer: "Almost never worth it. items.length is an O(1) property read; useMemo's own bookkeeping (storing the previous deps, comparing them, storing the cached value) costs more than just reading .length again on every render. useMemo pays off when the computation itself is expensive relative to a render — filtering/sorting a large array, not reading one property off it.",
    explain: "The Capgemini follow-up this maps to (\"is caching always beneficial?\") is really asking whether you understand memoisation has a cost, not just that it exists." },
  { id: "rp-3", topic: "react-perf", level: "God", xp: XP.God, mode: "design",
    title: "Keep a 5,000-row table responsive while typing in a filter box",
    code: `// State your approach before coding: memoisation, virtualisation,\n// debounce, or moving the filter state down. Defend the ordering.`,
    task: "Sketch the approach.",
    answer: "Order: (1) debounce the filter input so you're not re-filtering on every keystroke, (2) memoise the filtered/sorted result with useMemo keyed on the debounced query so unrelated re-renders don't redo the work, (3) virtualise the rendered rows (render only what's in the viewport) since 5,000 real DOM rows is the actual bottleneck no amount of memoisation fixes, (4) keep the input's own state local/uncontrolled-ish so typing itself doesn't re-render the table until the debounce fires.",
    explain: "Debounce and memoisation reduce how often you compute the filtered set; virtualisation is the one that actually caps DOM node count — skipping it is the most common reason this kind of table still lags." },
  { id: "rp-4", topic: "react-perf", level: "Hacker", xp: XP.Hacker, mode: "design",
    title: "Route-level code splitting",
    code: `// React.lazy + Suspense, with a loading fallback and an error boundary.`,
    task: "Sketch the wiring.",
    answer: "const Page = React.lazy(() => import('./Page')); then <ErrorBoundary fallback={<ErrorScreen/>}><Suspense fallback={<Spinner/>}><Page/></Suspense></ErrorBoundary> around each route. The ErrorBoundary catches a failed chunk load (bad deploy, offline); Suspense's fallback covers the network wait for the chunk itself.",
    explain: "Code splitting reduces initial bundle size, but costs the user a visible loading state on first visit to that route — worth it once the split-out chunk is large enough that shipping it eagerly would slow down everyone, including users who never visit that route." },
  { id: "rp-5", topic: "react-perf", level: "Pro", xp: XP.Pro, mode: "design",
    title: "Profiling drill",
    code: `// Open React DevTools Profiler on any app you have. Find the\n// component with the highest render count on one interaction.`,
    task: "Explain the likely cause in one sentence before changing any code.",
    answer: "This is a practical exercise, not a code kata — the point is the habit: profile first, name the specific cause (a parent re-render, an unstable prop reference, a context value that changed, a broad selector) in one sentence, and only then touch code. \"A component re-renders 47 times a second\" — the first thing to check is what's actually changing on every one of those renders, via the Profiler's \"why did this render\" flame graph, not to start adding memo everywhere speculatively.",
    explain: "Guessing at optimisations before profiling is how you end up memoising things that were never the bottleneck." },

  // ===== react-state =====
  { id: "rs-1", topic: "react-state", level: "Hacker", xp: XP.Hacker, mode: "design",
    title: "Write a full RTK slice",
    code: `// state, reducers, one createAsyncThunk, plus the selector and\n// the component wiring.`,
    task: "Write it.",
    answer: `const fetchUsers = createAsyncThunk("users/fetch", async () => (await fetch("/api/users")).json());\n\nconst usersSlice = createSlice({\n  name: "users",\n  initialState: { items: [], status: "idle", error: null },\n  reducers: {\n    cleared(state) { state.items = []; }\n  },\n  extraReducers: (builder) => {\n    builder\n      .addCase(fetchUsers.pending, (state) => { state.status = "loading"; })\n      .addCase(fetchUsers.fulfilled, (state, action) => { state.status = "succeeded"; state.items = action.payload; })\n      .addCase(fetchUsers.rejected, (state, action) => { state.status = "failed"; state.error = action.error.message; });\n  }\n});\n\nconst selectUsers = (state) => state.users.items;\n\n// component: const users = useSelector(selectUsers); const dispatch = useDispatch();\n// useEffect(() => { dispatch(fetchUsers()); }, [dispatch]);`,
    explain: "createSlice + Immer lets the reducers \"mutate\" state directly under the hood while staying immutable; createAsyncThunk generates the pending/fulfilled/rejected action types so the loading/error states don't need to be hand-rolled." },
  { id: "rs-2", topic: "react-state", level: "Hacker", xp: XP.Hacker, mode: "design",
    title: "Fix the selector",
    code: `const state = useSelector(s => s.users);\n// this component re-renders on every unrelated store change`,
    task: "Diagnose and fix.",
    answer: "The selector returns a new object reference (or a broader slice than needed) so Redux's default reference-equality check sees a change on every store update, even unrelated ones. Narrow the selector to primitives (useSelector(s => s.users.status)), or memoise it with createSelector/reselect so it only recomputes — and returns a new reference — when its own inputs actually change.",
    explain: "createSelector adds memoisation: it recomputes only when its own inputs change, and returns the same reference otherwise, which lets useSelector skip the re-render entirely." },
  { id: "rs-3", topic: "react-state", level: "Hacker", xp: XP.Hacker, mode: "design",
    title: "Normalise this shape",
    code: `posts: [{ id, title, author: { id, name }, comments: [ {...} ] }]`,
    task: "Show the normalised shape and say which read/write got cheaper.",
    answer: `{\n  posts: { byId: { 1: { id:1, title:"...", authorId: 5, commentIds:[10,11] } }, allIds: [1] },\n  authors: { byId: { 5: { id:5, name:"..." } } },\n  comments: { byId: { 10: {...}, 11: {...} }, allIds: [10,11] }\n}`,
    explain: "Updating one author's name, or one comment, becomes a single-key write instead of finding and replacing it inside every nested post that references it — the tradeoff is that reading \"this post with its author and comments\" now needs a join at read time instead of being pre-assembled." },
  { id: "rs-4", topic: "react-state", level: "God", xp: XP.God, mode: "design",
    title: "Where should each piece of state live?",
    code: `// (a) theme toggle  (b) auth session  (c) a 6-step wizard's form data\n// (d) server data used on 4 screens  (e) whether a dropdown is open`,
    task: "For each: local state, lifted state, Context, Redux, or a server-cache library?",
    answer: "(a) Context — small, rarely changes, needed broadly. (b) Context or a small dedicated store — read broadly, changes rarely, but often needs to trigger route guards. (c) Lifted state (or useReducer) scoped to the wizard, not global — it's local to one flow. (d) A server-cache library (React Query/RTK Query) — it's server state with its own caching/staleness semantics, not client state Redux models well. (e) Local state — it's private to that one component and nothing else needs to know.",
    explain: "Server state and client state behave differently: server data can go stale, gets refetched, and is shared across screens by URL/key, not by app structure — which is why forcing it into Redux usually means re-inventing a cache library badly." },

  // ===== react-routing =====
  { id: "rr-1", topic: "react-routing", level: "God", xp: XP.God, mode: "design",
    title: "THE canonical build: search box to paginate",
    code: `// Search box -> debounce -> fetch -> cancel stale request -> render\n// loading / error / empty -> paginate. No libraries.`,
    task: "Outline your approach before coding.",
    answer: "Debounce the input (~300ms). On each fetch, create a new AbortController, abort the previous one, and fetch with its signal. Track a request id/loading flag to ignore out-of-order responses. Render loading/error/empty states from that flag plus the result length. Page via limit/offset params, resetting to page 1 on a new query.",
    explain: "This is the build the wiki calls out repeatedly — it covers debouncing, request cancellation, and race-condition-safe async state in one exercise, hitting five of the eight must-know nodes at once." },
  { id: "rr-2", topic: "react-routing", level: "Hacker", xp: XP.Hacker, mode: "design",
    title: "Protected routes",
    code: `// redirect unauthenticated users to /login, preserve the intended\n// destination, and allow one public route.`,
    task: "Sketch it.",
    answer: "A <RequireAuth> wrapper reads auth state and either renders its children or <Navigate to=\"/login\" state={{ from: location }} replace /> — stashing the attempted location in navigation state. /login reads location.state?.from on success and navigates back there instead of a hardcoded home route. The public route (e.g. Loan Types) sits outside RequireAuth entirely.",
    explain: "Preserving \"from\" in navigation state (not a query param) is what lets login redirect back to exactly where the user was headed, without polluting the URL." },
  { id: "rr-3", topic: "react-routing", level: "God", xp: XP.God, mode: "design",
    title: "Three panels, three endpoints, one screen",
    code: `// Load them in parallel, render each as it arrives, and handle\n// one failing without blanking the page.`,
    task: "Sketch the approach.",
    answer: "Each panel owns its own fetch (its own loading/error/data state), fired in parallel on mount — not one parent awaiting all three before rendering anything. Each panel renders its own loading skeleton, its own error message, or its own data independently, so one endpoint failing shows an error in just that panel while the other two render normally.",
    explain: "This is the same isolation principle as the dashboard-widgets design prompt: independent fetch lifecycles mean independent failure domains." },
  { id: "rr-4", topic: "react-routing", level: "Hacker", xp: XP.Hacker, mode: "design",
    title: "A 4-step wizard with backwards-safe validation",
    code: `// per-step validation, back/next, and no data loss when\n// navigating backwards.`,
    task: "Sketch the state shape and validation flow.",
    answer: "One form-data object lifted above all four steps (or a useReducer), not per-step local state — so going back and forward never drops what was typed. Each step validates its own slice on \"Next\" (and optionally on blur), storing per-step errors; \"Back\" never re-validates, since re-showing unsaved-but-invalid data shouldn't block navigation backwards, only forwards past it.",
    explain: "The bug this prevents: per-step local state that gets thrown away on unmount when you click Back, which is the single most common wizard complaint in usability reports." },

  // ===== web-basics =====
  { id: "wb-1", topic: "web-basics", level: "Noob", xp: XP.Noob, mode: "design",
    title: "Three-column layout, stacking on mobile",
    code: `/* Once with Flexbox, once with Grid. */`,
    task: "Sketch both.",
    answer: "Flexbox: .row{display:flex;flex-wrap:wrap} .col{flex:1 1 300px}. Grid: .row{display:grid;grid-template-columns:repeat(3,1fr);gap:16px} then a media query switching to grid-template-columns:1fr under a breakpoint. Grid is the more direct fit here since it's a genuinely two-dimensional layout problem (columns AND the wrap breakpoint); Flexbox's wrap does the job too but is really a one-dimensional tool being asked to fake a grid.",
    explain: "Flexbox is one-dimensional and does wrapping well but alignment across rows badly; Grid is two-dimensional and is the more precise tool once you're thinking in rows and columns together." },
  { id: "wb-2", topic: "web-basics", level: "Noob", xp: XP.Noob, mode: "design",
    title: "Centre a box on both axes, three ways",
    code: `/* Say which you'd ship and why. */`,
    task: "Name three ways.",
    answer: "1) Flexbox: .parent{display:flex;align-items:center;justify-content:center}. 2) Grid: .parent{display:grid;place-items:center}. 3) Absolute positioning: .child{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}. I'd ship the Grid one-liner (place-items:center) for a single centered child — it's the shortest and most readable; Flexbox when the parent also needs to lay out other children; absolute positioning only when the child must be centered independent of document flow (e.g. over a background image).",
    explain: "All three are correct; the choice is about what else that parent/child needs to do, not raw correctness." },
  { id: "wb-3", topic: "web-basics", level: "Pro", xp: XP.Pro, mode: "design",
    title: "A datalist-backed autocomplete, wired to React state",
    code: `<input list="fruits" value={value} onChange={...} />\n<datalist id="fruits">...</datalist>`,
    task: "Sketch it.",
    answer: `function FruitPicker() {\n  const [value, setValue] = useState("");\n  const options = ["Apple", "Banana", "Cherry"];\n  return (\n    <>\n      <input list="fruits" value={value} onChange={(e) => setValue(e.target.value)} />\n      <datalist id="fruits">{options.map((o) => <option key={o} value={o} />)}</datalist>\n    </>\n  );\n}`,
    explain: "<datalist> gives free browser-native suggestion UI with zero JS for the dropdown itself — the tradeoff is much less control over filtering/styling than a hand-built autocomplete." },
  { id: "wb-4", topic: "web-basics", level: "Pro", xp: XP.Pro, mode: "design",
    title: "Custom checkbox via ::before/::after",
    code: `/* keyboard accessible */`,
    task: "Sketch the CSS + markup approach.",
    answer: "Keep a real <input type=\"checkbox\"> for behaviour and accessibility (focusable, spacebar-toggleable, screen-reader-announced), visually hide it (not display:none — that removes it from the tab order too; use a sr-only/clip pattern), and style an adjacent <label> or <span> whose ::before draws the box and ::after draws the checkmark, switching on the :checked sibling selector (input:checked + label::after).",
    explain: "The accessibility trap here is display:none on the real input — it looks clean but removes keyboard/focus support entirely; the fix is to hide it visually while keeping it in the accessibility tree and tab order." },
  { id: "wb-5", topic: "web-basics", level: "Pro", xp: XP.Pro, mode: "design",
    title: "A sticky header that shrinks on scroll",
    code: `/* CSS-only where possible */`,
    task: "Sketch the approach.",
    answer: "position:sticky;top:0 keeps the header pinned with zero JS. The shrink-on-scroll size change itself needs a scroll listener (or a ScrollTimeline/animation-timeline in browsers that support it) toggling a class that changes padding/font-size with a transition — sticky positioning alone can't react to scroll distance, only to \"has this element hit its sticky boundary yet\".",
    explain: "Sticky solves the pinning; the resize effect is a separate, JS-driven (or newer scroll-driven-animation) concern layered on top." },

  // ===== git =====
  { id: "gi-1", topic: "git", level: "Noob", xp: XP.Noob, mode: "design",
    title: "Undo a pushed bad commit, two ways",
    code: `/* git revert vs git reset --hard + force-push */`,
    task: "State which is safe on a shared branch like main, and why.",
    answer: "git revert <sha> adds a new commit that undoes the change — history stays intact, so everyone who already pulled the bad commit is unaffected and can just pull again. git reset --hard <sha> + a force-push rewrites history, which breaks anyone who already pulled the old commits (their branch now diverges from the rewritten remote). revert is the safe one on a shared branch; reset+force-push is only reasonable on a branch nobody else has pulled yet.",
    explain: "The deciding question is always \"has anyone else already pulled this history?\" — if yes, only additive undoing (revert) is safe." },
  { id: "gi-2", topic: "git", level: "Noob", xp: XP.Noob, mode: "design",
    title: "Move in-progress work aside for an urgent fix",
    code: `/* with stash, and separately with a WIP commit */`,
    task: "Sketch both.",
    answer: "git stash (optionally git stash -u to include untracked files) shelves the working-tree changes so the branch is clean, then git checkout -b hotfix to do the urgent work, then back on the original branch git stash pop restores it. Alternative: git commit -am \"WIP\" to save the half-done work as a real commit, switch branches, do the fix, switch back, and git reset --soft HEAD~1 to uncommit and keep the changes staged.",
    explain: "A stash isn't a commit — it lives outside normal history in its own stash list, and by default it doesn't include untracked (new, never-added) files, which is why -u exists." },
  { id: "gi-3", topic: "git", level: "Pro", xp: XP.Pro, mode: "design",
    title: "Create and resolve a real merge conflict",
    code: `/* two branches, same lines, incompatible edits */`,
    task: "Walk through the resolution.",
    answer: "Git marks the conflicting section with <<<<<<< HEAD (your version) / ======= / >>>>>>> branch-name (their version). Edit the file down to the correct final content, delete the markers, git add the resolved file, then git commit (for a merge) or git rebase --continue (for a rebase). Test before committing the resolution.",
    explain: "A three-way (diff3) conflict marker adds a third ||||||| section showing the common ancestor, which makes it clear what each side actually changed relative to, not just what they each want." },
  { id: "gi-4", topic: "git", level: "Pro", xp: XP.Pro, mode: "design",
    title: "Squash three messy commits before a PR",
    code: `/* interactive rebase */`,
    task: "Sketch the command sequence.",
    answer: "git rebase -i HEAD~3, mark the first commit \"pick\" and the other two \"squash\" (or \"fixup\" to also discard their messages), save, then write one clean combined commit message. If it's already pushed to your own PR branch, git push --force-with-lease afterwards (never plain --force, and never on a shared branch).",
    explain: "--force-with-lease refuses to overwrite the remote if someone else pushed to that branch since you last fetched — a safety net plain --force doesn't have." },
  { id: "gi-5", topic: "git", level: "Hacker", xp: XP.Hacker, mode: "design",
    title: "Recover a commit lost after a bad reset",
    code: `/* git reflog */`,
    task: "Sketch the recovery.",
    answer: "git reflog lists every place HEAD has pointed, including the commit that existed before the reset — find its SHA, then git reset --hard <that-sha> (or git cherry-pick it onto your current branch if you don't want to lose other work since then).",
    explain: "reflog is a local safety net, not part of shared history — it's why a \"lost\" commit almost always isn't actually gone, just unreferenced, until git's garbage collector eventually cleans it up." },

  // ===== machine-coding =====
  { id: "mc-1", topic: "machine-coding", level: "Noob", xp: XP.Noob, mode: "design",
    title: "Build: todo list",
    code: `// add, render, toggle, delete, then filter`,
    task: "The follow-up that separates candidates: persistence; edit-in-place; what's your key?",
    answer: "MVP: array of {id, text, done} in state; add appends, toggle/delete find-by-id and replace/filter the array immutably, filter is a derived (not stored) view over the same array. Key by id, never index. Follow-ups: persist to localStorage on every change (and hydrate from it on mount); edit-in-place needs a per-item \"editing\" flag and a controlled input that commits on blur/Enter.",
    explain: "Build add/render/toggle/delete first and say the filter/persistence/edit-in-place out loud as next steps if time is short — narrating what you deferred scores; silently running out of time doesn't." },
  { id: "mc-2", topic: "machine-coding", level: "Noob", xp: XP.Noob, mode: "design",
    title: "Build: star rating",
    code: `// hover preview, click to set, reset`,
    task: "Follow-up: half-star support; keyboard operable.",
    answer: "State: value (committed) and hoverValue (preview, null when not hovering) — render fill based on hoverValue ?? value. Half-stars: compute which half of a star the pointer is over via the star's bounding rect and mouse x. Keyboard: make each star (or the whole group as a radiogroup) focusable and respond to arrow keys to adjust value, with aria-label announcing the current rating.",
    explain: "Separating the committed value from a hover preview is the key state-shape decision — conflating them makes reset and keyboard support much harder to bolt on later." },
  { id: "mc-3", topic: "machine-coding", level: "Noob", xp: XP.Noob, mode: "design",
    title: "Build: accordion",
    code: `// expand/collapse`,
    task: "Follow-up: single-open mode; disabled panel; ARIA.",
    answer: "State: a Set (or single id) of open panel ids — a Set naturally supports multi-open, a single id naturally supports single-open, so the state shape itself decides the mode. Disabled panels just skip the toggle handler and get aria-disabled. Each header is a <button> with aria-expanded and aria-controls pointing at its panel's id; each panel has role=\"region\" and aria-labelledby back to the header.",
    explain: "Choosing Set-of-ids vs single-id up front is what makes \"add single-open mode\" a one-line change instead of a rewrite." },
  { id: "mc-4", topic: "machine-coding", level: "Pro", xp: XP.Pro, mode: "design",
    title: "Build: tabs",
    code: `// switch panels`,
    task: "Follow-up: lazy-render panel content; deep-link the active tab.",
    answer: "State: activeTab id, list rendered from a tabs config array (label + panel). Lazy-render: only mount the active panel's content (or mount-once-then-keep, if remounting on every switch is too expensive/loses local state). Deep-link: read the initial tab from a query param or URL segment, and update it (via history.replaceState or the router) whenever activeTab changes.",
    explain: "\"Lazy-render\" has two different meanings worth distinguishing out loud: mount-on-first-visit-only vs mount-on-every-visit — they trade initial load time against per-switch state loss." },
  { id: "mc-5", topic: "machine-coding", level: "Pro", xp: XP.Pro, mode: "design",
    title: "Build: modal",
    code: `// open/close, backdrop`,
    task: "Follow-up: portal, focus trap, Escape, scroll lock.",
    answer: "Portal into document.body via createPortal so it escapes the parent's overflow/z-index. Escape: a keydown listener added on mount, removed on unmount. Backdrop click: check event.target === backdrop (not the modal content) before closing. Focus trap: store document.activeElement before opening, move focus into the modal, cycle Tab within it, and restore the stored element on close. Scroll lock: set document.body.style.overflow = 'hidden' while open, restore on close.",
    explain: "This is the single most-reused build in the whole set — see react-core's live-graded portal problem for the exact createPortal wiring." },
  { id: "mc-6", topic: "machine-coding", level: "Pro", xp: XP.Pro, mode: "design",
    title: "Build: dropdown",
    code: `// select, close on outside click`,
    task: "Follow-up: keyboard nav; async options.",
    answer: "Outside click: a document-level mousedown listener (added while open, removed on close) that closes if the click target is outside the dropdown's ref. Keyboard: ArrowDown/Up move a highlighted index, Enter selects it, Escape closes, and the trigger button owns aria-expanded/aria-haspopup. Async options: a loading state shown while fetching, fetched once on first open (or debounced-refetched per keystroke for a searchable dropdown).",
    explain: "The outside-click listener is the detail most candidates fumble — it has to ignore the click that originally opened the dropdown, usually by attaching it in a useEffect that only runs while open." },
  { id: "mc-7", topic: "machine-coding", level: "Hacker", xp: XP.Hacker, mode: "design",
    title: "Build: debounced search",
    code: `// input -> filtered list`,
    task: "Follow-up: switch to server search + cancellation.",
    answer: "Local version: debounce the input value, filter an in-memory list against it. Server version: on the debounced value, fire a fetch with a fresh AbortController each time (aborting the previous in-flight request), and render loading/error/empty from that request's state — exactly the canonical async build in react-routing.",
    explain: "The local-to-server transition is a good thing to narrate explicitly: it's the same debounce, but the filter step becomes a network call that now needs cancellation and loading/error states it didn't need before." },
  { id: "mc-8", topic: "machine-coding", level: "Hacker", xp: XP.Hacker, mode: "design",
    title: "Build: autocomplete",
    code: `// fetch suggestions, select`,
    task: "Follow-up: debounce, keyboard nav, cache, race conditions.",
    answer: "Debounce the query. Cache fetched results per query string (a Map) so repeated queries — including retyping after backspacing — don't refetch. Guard races by tracking the latest request's id/query and ignoring any response that isn't for the current query. Keyboard nav mirrors the dropdown build: Arrow keys move a highlighted suggestion, Enter selects it.",
    explain: "The race-condition guard is the part interviewers actually watch for — without it, a fast typist can see a stale response for an earlier, shorter query overwrite the correct one for what they've typed since." },
  { id: "mc-9", topic: "machine-coding", level: "Pro", xp: XP.Pro, mode: "design",
    title: "Build: pagination",
    code: `// page buttons, prev/next`,
    task: "Follow-up: server-driven; page-size change; deep link.",
    answer: "State: page number (and pageSize). Server-driven: page/pageSize become query params sent to the API, which returns just that page's rows plus a total count for computing page-button count. Page-size change should reset to page 1 (the old page number may no longer exist at the new size). Deep-link: read/write page and pageSize to the URL's query string so a shared link reopens the same page.",
    explain: "Resetting to page 1 on a page-size change is the detail most implementations miss, and it's exactly the kind of edge case interviewers probe for after the happy path works." },
  { id: "mc-10", topic: "machine-coding", level: "Hacker", xp: XP.Hacker, mode: "design",
    title: "Build: infinite scroll",
    code: `// append on scroll`,
    task: "Follow-up: IntersectionObserver; virtualisation; prefetch next page.",
    answer: "A sentinel element at the bottom of the list, observed with IntersectionObserver — when it enters the viewport, fetch and append the next page. At large item counts, add virtualisation (render only the visible window of items) so the DOM node count doesn't grow unbounded. Prefetch: start fetching the next page slightly before the sentinel is reached (a second, earlier sentinel, or a distance threshold) so there's no visible loading gap.",
    explain: "IntersectionObserver is the answer interviewers want over a scroll-position calculation — it's event-driven, doesn't run on every scroll tick, and handles variable-height content correctly." },
  { id: "mc-11", topic: "machine-coding", level: "Pro", xp: XP.Pro, mode: "design",
    title: "Build: carousel",
    code: `// next/prev, dots`,
    task: "Follow-up: circular cycling; autoplay + pause on hover.",
    answer: "State: activeIndex. Circular cycling: next/prev wrap with modulo ((i + 1) % length, or (i - 1 + length) % length) instead of clamping. Autoplay: a setInterval advancing activeIndex, cleared on unmount and paused (interval cleared, not just ignored) on mouseenter, restarted on mouseleave.",
    explain: "Pausing on hover needs the interval actually cleared and recreated, not just gated by a flag inside the callback — otherwise the already-scheduled tick still fires once more after hover starts." },
  { id: "mc-12", topic: "machine-coding", level: "Hacker", xp: XP.Hacker, mode: "design",
    title: "Build: multi-step form",
    code: `// steps, validation, back/next`,
    task: "Follow-up: preserve data backwards; per-step schema.",
    answer: "See react-routing's wizard design entry for the full state-shape answer — one lifted form-data object across all steps (never per-step local state, which is what loses data on Back), each step validating only its own schema slice on Next.",
    explain: "This is the same build as the react-routing wizard prompt; it shows up in both the machine-coding and routing/forms parts of the wiki because it's a convergent, high-value exercise." },
  { id: "mc-13", topic: "machine-coding", level: "Hacker", xp: XP.Hacker, mode: "design",
    title: "Build: data table",
    code: `// render rows, sort`,
    task: "Follow-up: column sort + filter + pagination combined.",
    answer: "Keep raw rows as the source of truth; derive the displayed rows via a pipeline — filter, then sort, then paginate the result — recomputed (ideally memoised) from raw rows + {filterQuery, sortColumn, sortDir, page}, rather than mutating the row array in place at each step. Sorting toggles asc/desc on repeated clicks of the same column header, resets to asc on a new column.",
    explain: "Treating filter/sort/paginate as a derived pipeline over one source array — instead of three separate stateful transformations — is what keeps this combination from turning into a tangle of stale intermediate arrays." },
  { id: "mc-14", topic: "machine-coding", level: "Hacker", xp: XP.Hacker, mode: "design",
    title: "Build: nested comments",
    code: `// render a tree, reply`,
    task: "Follow-up: collapse subtree; recursion vs flat map.",
    answer: "A recursive <Comment> component that renders its own body then maps its children through itself is the direct approach and handles arbitrary depth for free; a flat map with a parentId + depth (rendered via indentation) avoids deep call stacks and is easier to virtualise, at the cost of manually reconstructing the tree shape for things like \"collapse this subtree\". Collapsing a subtree is a Set of collapsed ids checked before recursing into (or rendering) children.",
    explain: "The tradeoff to name out loud: recursion is simpler code and matches the data's natural shape; flat-map trades that simplicity for easier virtualisation and shallower stacks on very deep threads." },
  { id: "mc-15", topic: "machine-coding", level: "Hacker", xp: XP.Hacker, mode: "design",
    title: "Build: file explorer",
    code: `// expand folders`,
    task: "Follow-up: recursive rendering; lazy-load children.",
    answer: "Same recursive-component shape as nested comments: a <Node> renders itself, and if expanded and it's a folder, maps its children through <Node> again. Lazy-load: a folder's children start as null/undefined; expanding it for the first time triggers a fetch, shows a loading state in place of the children, then caches the result on the node so re-collapsing/re-expanding doesn't refetch.",
    explain: "Caching fetched children on the node (not refetching on every expand) is the detail that turns a naive implementation into one that doesn't hammer the API on repeated toggling." },
  { id: "mc-16", topic: "machine-coding", level: "Pro", xp: XP.Pro, mode: "design",
    title: "Build: toast notifications",
    code: `// show, auto-dismiss`,
    task: "Follow-up: queueing, stacking, manual dismiss.",
    answer: "A single toasts array in a top-level provider/store; addToast pushes {id, message, ...}, each toast schedules its own setTimeout(() => removeToast(id), duration) on mount, cleared if manually dismissed early. Stacking is just rendering the array; queueing (show only N at once, hold the rest) needs a separate \"pending\" list that shifts into the visible array as visible ones dismiss.",
    explain: "Each toast owning its own dismiss timer (rather than one shared timer for \"the newest toast\") is what makes stacking multiple toasts with different durations behave correctly." },
  { id: "mc-17", topic: "machine-coding", level: "Noob", xp: XP.Noob, mode: "design",
    title: "Build: stopwatch",
    code: `// start/stop/reset`,
    task: "Follow-up: laps; drift-free timing.",
    answer: "Naive setInterval(() => setElapsed(e => e + 100), 100) drifts because each tick's actual wall-clock delay is never exactly 100ms. Drift-free: store the start timestamp (Date.now()) once, and on each tick compute elapsed = Date.now() - startTime (adjusted for accumulated paused time), so error doesn't compound. Laps: an array you push the current elapsed time onto, unaffected by later ticks.",
    explain: "This is a good one to actually build and time-compare — running a naive-interval version next to a Date.now()-based version for a minute makes the drift visible, not just theoretical." },
  { id: "mc-18", topic: "machine-coding", level: "Noob", xp: XP.Noob, mode: "design",
    title: "Build: progress bar",
    code: `// animate to N%`,
    task: "Follow-up: multiple sequential bars.",
    answer: "A width/transform bound to a percent prop with a CSS transition handles the animation for free — no JS tweening needed for a single bar. Sequential bars (bar 2 starts only once bar 1 finishes): either chain via each bar's transitionend event, or drive all of them from one state machine that advances to the next bar's target percent after a fixed delay matching the transition duration.",
    explain: "Reaching for CSS transitions instead of a requestAnimationFrame loop for a straightforward fill animation is the simpler, more correct default here." },
  { id: "mc-19", topic: "machine-coding", level: "Pro", xp: XP.Pro, mode: "design",
    title: "Build: transfer list",
    code: `// move items between lists`,
    task: "Follow-up: multi-select; select-all.",
    answer: "Two arrays (or one array with a side field) plus a Set of selected ids per side. Moving transfers the selected ids from one array/side to the other and clears selection. Select-all toggles every currently-visible id into (or out of) that side's selection Set in one update.",
    explain: "Keeping selection as a Set (not an array) makes \"is this item selected\" an O(1) check per row instead of an array .includes() scan on every render." },
  { id: "mc-20", topic: "machine-coding", level: "Hacker", xp: XP.Hacker, mode: "design",
    title: "Build: drag-and-drop reorder",
    code: `// reorder a list`,
    task: "Follow-up: persist order; keyboard alternative.",
    answer: "Track a draggedIndex and dropTargetIndex during dragover, reordering the array (splice out, splice in at the new index) on drop. Persist by saving the reordered array (localStorage or an API PATCH of the new order) after each successful drop. Keyboard alternative: focus an item and let Alt+ArrowUp/Down move it one position, since native drag-and-drop has no built-in keyboard equivalent — this is also the accessible fallback, not just a nice-to-have.",
    explain: "The keyboard alternative isn't optional polish — native HTML drag-and-drop is mouse/touch-only, so without it the reorder feature is entirely unusable without a pointer." },

  // ===== scenario =====
  { id: "sn-0", topic: "scenario", level: "God", xp: XP.God, mode: "design",
    title: "Design: loan-management system",
    code: `// Login page, then a page with three adjacent vertical sections\n// each fetching from a different API (user details, loan details,\n// next repayment). A bottom button opens a public Loan Types page.`,
    task: "Cover: route map · protected vs public routes · where state lives · parallel vs sequential API calls · loading skeletons · error boundaries · what happens when one of the three calls fails. [TCS, reproduced]",
    answer: "Routes: /login (public), /dashboard (protected — the three-section page), /loan-types (public). A RequireAuth wrapper around /dashboard redirects to /login, preserving the intended destination. Auth state lives in memory or a secure cookie, not localStorage. On /dashboard, the three sections fire their API calls in parallel on mount, each owning its own loading skeleton and error state — one failing shows an error in just that section, the other two still render normally, nothing blanks the whole page. Loan Types needs no auth and is a fully separate route outside the authenticated shell.",
    explain: "This is the wiki's flagship scenario question — it forces routing, auth boundaries, API parallelism, loading strategy, and public-vs-protected pages into one answer, which is exactly why it recurs across companies." },
  { id: "sn-1", topic: "scenario", level: "God", xp: XP.God, mode: "design",
    title: "Design: 6-widget dashboard",
    code: `// A dashboard with 6 widgets, each with its own endpoint and\n// refresh interval.`,
    task: "Sketch the architecture: data fetching, isolation of failures, and re-render scope.",
    answer: "Each widget owns its own fetch/interval (a shared useFetch/useInterval hook), not one parent fetching all six — so one endpoint's failure or refresh doesn't affect the others and re-renders stay scoped to that widget. A shared error boundary per widget (not one boundary around the whole dashboard) keeps a failing widget from blanking the page.",
    explain: "Isolation is the theme: independent fetch lifecycles, independent error boundaries, independent refresh timers." },
  { id: "sn-2", topic: "scenario", level: "God", xp: XP.God, mode: "design",
    title: "Design: auth across tabs",
    code: `// An auth flow: login, refresh token, silent renewal, logout\n// across tabs.`,
    task: "Where does the token live, and how does logout in one tab affect the others?",
    answer: "Access token in memory (safest against XSS), refresh token in an httpOnly cookie. Silent renewal via a background timer or a 401-triggered refresh-and-retry. Cross-tab logout via the storage event (write a logout flag to localStorage — every other tab's listener fires and clears its own state).",
    explain: "localStorage is the only client-side primitive that broadcasts across tabs; that's why it's used as a signal even when the token itself isn't stored there." },
  { id: "sn-3", topic: "scenario", level: "God", xp: XP.God, mode: "design",
    title: "Design: 40-field form autosaved every 30 seconds",
    code: `// A 40-field application form saved as a draft every 30 seconds.`,
    task: "Sketch the approach: what triggers a save, and what does a failed save do to the user's typing?",
    answer: "A timer-based autosave (setInterval every 30s, or a debounced save on change with a 30s cap) that diffs current form state against the last-saved snapshot and skips the request entirely if nothing changed. A failed save should never block or clear the user's typed input — show a small \"draft not saved\" indicator and retry on the next interval, keeping the in-progress data purely in local component/form state until the save actually succeeds.",
    explain: "The failure mode to design around is a failed autosave silently discarding or overwriting what the user typed — the save is best-effort background behaviour, never a gate on continuing to type." },

];

// ---------------------------------------------------------------------------
// INTERVIEW_CHAINS — every topic has at least one opening question drawn
// from its [ASKED] list; follow-ups reuse that topic's `learn` array (the
// Socratic sequence), so richer topics naturally get deeper interview-mode
// drilling without duplicating content here.
// ---------------------------------------------------------------------------
export const INTERVIEW_CHAINS = [
  { id: "i1", topic: "js-scope", level: "Noob", main: "What is hoisting and how does it work?",
    answer: "var declarations are hoisted to the top of their scope and initialized to undefined; let/const are hoisted but stay in the Temporal Dead Zone until their declaration line executes, so accessing them earlier throws a ReferenceError instead of returning undefined. Function declarations are hoisted with their full body, so they can be called before they appear in the code." },
  { id: "i1b", topic: "js-scope", level: "Pro", main: "Difference between var, let and const — explain with a scoping example.",
    answer: "var is function-scoped (or global), so it leaks out of any block it's declared in; let and const are block-scoped, confined to the nearest {}. const additionally forbids reassigning the binding (not mutating the value — const arr=[] then arr.push(1) is fine). Example: for(var i=0;i<3;i++){} leaves i=3 accessible after the loop; for(let i=0;i<3;i++){} does not — i doesn't exist outside the loop at all." },
  { id: "i2", topic: "js-closures", level: "Pro", main: "What is a closure? What is a practical use case for closures?",
    answer: "A closure is a function bundled with references to its surrounding lexical scope, so it keeps access to variables from an outer function even after that function has returned. A practical use is data privacy: a factory function can return methods that share access to a variable no outside code can reach directly, like a counter's internal count." },
  { id: "i2b", topic: "js-closures", level: "Hacker", main: "Write a closure example and call it.",
    answer: "function makeCounter(){ let count=0; return ()=>++count; } const next = makeCounter(); next(); next(); — each call increments the same private count via the returned function's closure over it. Calling makeCounter() again would create an entirely independent count, proving the binding is per-call, not shared globally." },
  { id: "i3", topic: "js-this", level: "Pro", main: "Explain the this keyword.",
    answer: "this is determined by how a function is called (its call-site), not where it's defined — a plain call gets this undefined (strict mode) or the global object; a method call obj.fn() gets this=obj; call/apply/bind set it explicitly; new sets it to the newly created object. Arrow functions are the exception: they have no own this and inherit it lexically from their enclosing scope at definition time." },
  { id: "i3b", topic: "js-this", level: "Hacker", main: "How can objects be copied — shallow vs deep?",
    answer: "Shallow copy ({...obj} or Object.assign) copies top-level keys only — nested objects are still shared by reference, so mutating a nested value through the copy mutates the original too. Deep copy recursively copies every level, so nothing is shared; structuredClone() does this natively (and handles Dates, Maps, cycles), while JSON.parse(JSON.stringify(x)) is a common but lossy substitute that drops functions, undefined, and turns Dates into strings." },
  { id: "i4c", topic: "js-coercion", level: "Noob", main: "== vs === and coercion pitfalls.",
    answer: "=== compares value and type with no conversion; == first coerces operands toward a common type using a specific algorithm (objects toString/valueOf, then numeric comparison), which produces surprising results like [] == false being true. The practical rule: default to ===, and only reach for == when you deliberately want null == undefined's special-cased true (checking for \"either null or undefined\" in one comparison)." },
  { id: "i3c", topic: "js-async", level: "Hacker", main: "Explain the event loop — microtasks vs macrotasks, execution order.",
    answer: "The call stack runs synchronous code first. Once it's empty, the microtask queue (promise .then callbacks, queueMicrotask) drains completely — including microtasks queued by other microtasks — before the event loop picks up a single macrotask (setTimeout, setInterval, I/O). That's why a queued promise callback always logs before a 0ms setTimeout, even though the timer was registered first." },
  { id: "i3d", topic: "js-async", level: "Pro", main: "Promise.all() vs Promise.race() — and Promise.allSettled/Promise.any.",
    answer: "Promise.all waits for every promise and rejects immediately on the first rejection (all-or-nothing). Promise.race settles as soon as any promise settles, win or lose. Promise.allSettled always waits for every promise and never rejects — it reports each one's outcome. Promise.any resolves with the first fulfillment and only rejects if every promise rejects." },
  { id: "i4u", topic: "js-utils", level: "Pro", main: "What is throttling, and how do you debounce an application?",
    answer: "Throttling caps a function to running at most once per fixed window, no matter how many times it's triggered — good for scroll/resize handlers that fire continuously. Debouncing waits for a pause in calls and runs once after that quiet period — good for search-as-you-type, where you only want the final value the user settled on. A debounced function has to close over a timer reference so each new call can clear and reschedule it." },
  { id: "i4", topic: "react-core", level: "Pro", main: "What is the virtual DOM, and what is reconciliation? Why are keys important in lists?",
    answer: "The virtual DOM is an in-memory tree React builds on every render; reconciliation is the diff between the new tree and the previous one, and only the actual differences get committed to the real DOM. Keys tell React which element in a list is which across renders — with a stable key, React can tell \"this item moved\" from \"this item was replaced\"; with key={index}, reordering or deleting scrambles per-item state because React matches by position instead of identity." },
  { id: "i4b", topic: "react-core", level: "Hacker", main: "What is a Higher-Order Component, and its advantages? What is prop drilling and how do you avoid it?",
    answer: "An HOC is a function that takes a component and returns a new component with extra behaviour layered on (e.g. auth gating, injected data) — it lets you reuse cross-cutting logic without repeating it in every component. Prop drilling is passing a value down through many layers of components that don't use it themselves, just to reach a deeply nested consumer; Context (or a state library) avoids it by letting the consumer read the value directly, skipping the intermediate layers." },
  { id: "i5", topic: "react-hooks", level: "Pro", main: "What is the dependency array and how does it affect rendering?",
    answer: "The dependency array tells React when to re-run an effect: with no array, the effect runs after every render; with an empty array, it runs once after the first render; with values in it, it re-runs whenever any of those values changes between renders (compared by reference for objects/functions). Missing a dependency that the effect actually reads is the most common source of stale-closure bugs." },
  { id: "i5b", topic: "react-hooks", level: "Hacker", main: "useState vs useRef — what triggers a re-render? How do you write a custom hook?",
    answer: "Updating useState schedules a re-render; updating a useRef's .current does not — the component keeps its current render until something else triggers one. A custom hook is just a function whose name starts with use that calls other hooks internally, letting you extract and reuse stateful logic (like a shared fetch-and-loading pattern) across components without repeating the wiring." },
  { id: "i6", topic: "react-perf", level: "Hacker", main: "How do you avoid unnecessary re-renders?",
    answer: "Wrap components in React.memo so they skip re-rendering when their props haven't changed by reference; keep the objects/functions passed as props stable with useMemo/useCallback so memo's comparison actually holds; split state so a change in one piece of UI doesn't force a re-render of unrelated siblings; and move expensive computation into useMemo so it isn't redone every render." },
  { id: "i6b", topic: "react-perf", level: "Hacker", main: "\"What exactly is caching?\" → \"Is caching always beneficial?\"",
    answer: "Caching is storing a previously computed result so a later request for the same input can return it instead of recomputing. It is not always beneficial: it costs memory for everything cached, maintenance burden to keep cache-invalidation logic correct, and can actively cost more than it saves when the inputs change too often for the cache to ever hit — at that point you're paying for the comparison/lookup with almost no reuse to show for it." },
  { id: "i7", topic: "react-state", level: "Hacker", main: "Redux vs Context API — when do you use which?",
    answer: "Context is built into React and solves prop drilling, but every consumer re-renders on any change to the value and there's no built-in mechanism for derived or memoized state. Redux (or another dedicated store) adds structured updates, middleware, devtools, and selectors that can memoize and prevent unnecessary re-renders, which matters once state is large or updates are frequent. Context suits small, rarely-changing global values like theme or auth user; Redux suits complex, frequently-updated app state shared across many components." },
  { id: "i7b", topic: "react-state", level: "Pro", main: "What is the flow of Redux, and how would you optimise a Redux application?",
    answer: "A UI event dispatches an action, the reducer computes new state from the current state and that action (a pure function, no mutation), the store updates and notifies subscribers, and connected components re-render off their selectors. Optimisation levers: normalised state shape, memoised selectors (createSelector/reselect), narrowed useSelector calls that read only what a component needs, RTK's built-in Immer for safe mutation-style updates, and code-splitting reducers for large apps." },
  { id: "i8r", topic: "react-routing", level: "Hacker", main: "How do you cancel an API call, and how do you handle error/retry logic?",
    answer: "AbortController: create one per request, pass its signal to fetch, and call controller.abort() to cancel — the fetch promise rejects with an AbortError, which you typically swallow rather than surface as a real error. Retry logic belongs in a hook or a shared fetch wrapper, not scattered in components, so the backoff/attempt-count policy is defined once and reused." },
  { id: "i8", topic: "scenario", level: "God", main: "Design a loan-management system: login page, then three parallel sections (user details, loan details, next repayment) each from a different API, plus a public Loan Types page.",
    answer: "Login gates the app, then the dashboard fires three independent API calls in parallel (not sequential) for user details, loan details, and next repayment, so one slow or failing endpoint doesn't block the others — each section gets its own loading and error state. The public Loan Types page needs no auth and can be a separate route outside the authenticated shell. Auth state is typically kept in memory or a secure cookie, with routes guarded by a wrapper that redirects unauthenticated users to login." },
  { id: "i8b", topic: "scenario", level: "Pro", main: "Do you know server-side rendering? What is a PWA?",
    answer: "SSR renders the initial HTML on the server so the first paint doesn't wait for the JS bundle to download and run — it improves first-contentful-paint and SEO at the cost of server compute and more complex hydration. A PWA is a web app that adds a manifest and a service worker to get installability, offline caching, and app-like behaviour, without needing a native app store.", },
  { id: "i9", topic: "managerial", level: "Noob", main: "Tell me about yourself, and about your current project and role.",
    answer: "A strong answer is a short narrative, not a resume readout: current role and what you actually build day to day, one project told as a decision you made and its tradeoff, then why you're looking at this opportunity. It should run under 90 seconds and end forward-looking, not as a list of technologies." },
  { id: "i9b", topic: "managerial", level: "Pro", main: "Why are you leaving your current company? Have you worked in Agile or Waterfall?",
    answer: "\"Why leaving\" should read as moving toward something (growth, scope, technology) and never as criticism of a team, manager, or company by name — the content should survive being repeated back to that employer. For agile, answer in specifics: name the ceremonies you actually participate in (standup, sprint planning, retro) and your concrete part in each, not just \"yes, we use Scrum.\"" },
  { id: "i10", topic: "web-basics", level: "Noob", main: "Difference between display and visibility, and between pseudo-classes and pseudo-elements.",
    answer: "display:none removes the element from layout entirely — no space reserved, not focusable, no events. visibility:hidden reserves its space but the element isn't visible, focusable, or clickable. A pseudo-class (:hover, :nth-child) targets an element in a certain state and is written with one colon; a pseudo-element (::before, ::after) creates or targets a sub-part of an element that doesn't exist in the DOM and is written with two colons." },
  { id: "i11", topic: "git", level: "Noob", main: "How do you handle merge conflicts efficiently?",
    answer: "Pull the latest target branch, then merge or rebase it into your branch so conflicts surface locally. Git marks each conflicting section with <<<<<<<, =======, and >>>>>>> markers; resolve by editing the file to the correct final content, remove the markers, then git add the file and continue the merge/rebase. Test before committing the resolution, and keep changes small and frequent to minimize how often conflicts happen." },
  { id: "i12", topic: "machine-coding", level: "Pro", main: "Increment/decrement counter — walk through how you'd build and narrate it.",
    answer: "State the MVP out loud first: a single count in state, an increment and decrement button each calling a setter. Build that working version first, then narrate follow-ups if time remains — a step size, a min/max clamp, persistence — rather than building them unprompted. The bar here is finishing cleanly and narrating, not impressing with scope." }
];

// ---------------------------------------------------------------------------
// FLASHCARDS — front/back pairs drawn from every topic's [LEARN] questions
// (the Socratic sequence in questions.md) plus key facts from the [ASKED]
// lists and the wiki's answer key. No invented content.
// ---------------------------------------------------------------------------
export const FLASHCARDS = [
  // js-scope
  { id: "f1", topic: "js-scope", level: "Noob", front: "What exactly moves during hoisting — the declaration, the assignment, or both?", back: "Only the declaration. var's binding is created and initialised to undefined at the top of its scope; the assignment stays exactly where it was written and runs in place. let/const declarations also hoist, but stay uninitialised (TDZ) instead of becoming undefined." },
  { id: "f2", topic: "js-scope", level: "Noob", front: "If let is also hoisted, why does accessing it throw instead of giving undefined?", back: "Because its binding is created but deliberately left uninitialised — the Temporal Dead Zone — until the declaration line actually executes. Reading an uninitialised binding throws a ReferenceError; reading a never-declared name also throws a ReferenceError, but with a different message (\"is not defined\" vs \"cannot access before initialization\")." },
  { id: "f3", topic: "js-scope", level: "Noob", front: "What is the difference between \"not declared\" and \"declared but uninitialised\"? Which error does each produce?", back: "Not declared: ReferenceError \"x is not defined\" — no binding exists anywhere. Declared but uninitialised (a let/const in its TDZ): ReferenceError \"Cannot access x before initialization\" — the binding exists but has not been assigned yet." },
  { id: "f4", topic: "js-scope", level: "Noob", front: "Does const make the variable immutable or the value?", back: "The variable (the binding) — you can't reassign it. The value itself can still mutate: const arr=[1]; arr.push(2) works fine." },
  { id: "f5", topic: "js-scope", level: "Pro", front: "Why does var inside a block leak out, but let doesn't? What is the unit of scope for each?", back: "var's unit of scope is the enclosing function (or global, if not inside one) — blocks ({}) don't create a new var scope, so it's visible outside the block. let/const are block-scoped — the nearest {} is their boundary, so they don't exist outside it at all." },
  // js-closures
  { id: "f6", topic: "js-closures", level: "Pro", front: "A closure keeps something alive after its function returns. What exactly — the value, or the variable binding?", back: "The variable binding itself, not a snapshot of the value. That's why two calls to a counter factory produce independent counters, and why later reads see updates made after the closure was created." },
  { id: "f7", topic: "js-closures", level: "Pro", front: "In the classic var-in-a-loop bug, why is the answer 3 and not 2? What is i at the moment the callback finally runs?", back: "var creates one binding for the whole loop, shared by every iteration's callback. By the time any setTimeout callback actually runs (after the loop has already finished), i has already reached 3 — every callback sees that same final value." },
  { id: "f8", topic: "js-closures", level: "Pro", front: "let fixes the loop bug. What does the engine create per iteration that var doesn't?", back: "A fresh binding of the loop variable for each iteration — so each iteration's callback closes over its own private copy of i instead of one binding shared across all of them." },
  { id: "f9", topic: "js-closures", level: "Pro", front: "Closures cause memory to be retained. Name one situation where that is a leak rather than a feature.", back: "An event listener or timer that closes over a large object (e.g. a DOM node or a big array) and is never removed — the closure keeps that object reachable and un-garbage-collected for the life of the listener." },
  { id: "f10", topic: "js-closures", level: "Hacker", front: "How is a closure related to a module pattern? To a React custom hook?", back: "A module pattern is a closure used deliberately for privacy — an IIFE returns an object whose methods share access to variables nothing outside can reach. A custom hook is the same idea applied per-component-instance: the hook function's local variables persist across renders of that component via the closures React's hook state creates." },
  // js-this
  { id: "f11", topic: "js-this", level: "Noob", front: "What decides the value of this — where a function is defined, or where it is called?", back: "Where it is called (its call-site), for regular functions. Arrow functions are the exception — they have no own this and inherit it lexically from where they were defined." },
  { id: "f12", topic: "js-this", level: "Pro", front: "Why does spread produce a shallow copy? At what depth does sharing begin?", back: "Spread only copies the object's own top-level keys — it copies each value one level deep. Any value that is itself an object (nested one level or more) is copied by reference, so sharing begins at depth 2." },
  { id: "f13", topic: "js-this", level: "Pro", front: "What does new actually do, in four steps?", back: "1) Creates a new empty object. 2) Sets that object's prototype to the constructor's .prototype. 3) Runs the constructor with this bound to the new object. 4) Returns the new object (unless the constructor explicitly returns another object)." },
  { id: "f14", topic: "js-this", level: "Hacker", front: "If a deleted own property's value comes back, where was it living the whole time?", back: "On the prototype. Setting inst.x created an own property that shadowed A.prototype.x; deleting only removes own properties, so the lookup falls through to the value that was sitting on the prototype the entire time." },
  { id: "f15", topic: "js-this", level: "Hacker", front: "Name two things JSON.parse(JSON.stringify(x)) silently destroys.", back: "Functions and undefined values (both are simply dropped from the output), and Date objects (turned into ISO strings, not real Date instances). It also breaks on circular references entirely, throwing instead of cloning." },
  // js-coercion
  { id: "f16", topic: "js-coercion", level: "Noob", front: "What does == do that === doesn't? Describe it as an algorithm, not a vibe.", back: "=== compares type and value with zero conversion. == first applies the Abstract Equality algorithm: if the types differ, it converts one or both operands (objects via toPrimitive, then string/boolean toward number) until they're comparable, then compares. null == undefined is a special case that's always true, independent of that conversion chain." },
  { id: "f17", topic: "js-coercion", level: "Noob", front: "Which values are falsy in JavaScript? List all of them.", back: "false, 0, -0, 0n, \"\", null, undefined, NaN. That's the whole list — everything else, including [] and {}, is truthy." },
  { id: "f18", topic: "js-coercion", level: "Noob", front: "0 || x and 0 ?? x differ. State the single rule.", back: "|| falls through on any falsy value (0, \"\", false, null, undefined, NaN). ?? falls through only on null or undefined, so 0 and \"\" are kept." },
  { id: "f19", topic: "js-coercion", level: "Pro", front: "Why is 0.1 + 0.2 !== 0.3? What would you compare instead?", back: "Floating-point numbers are stored in binary, and 0.1/0.2/0.3 don't have exact binary representations, so the addition accumulates a tiny rounding error (0.30000000000000004). Compare with a small epsilon instead: Math.abs(a - b) < Number.EPSILON (or a domain-appropriate tolerance)." },
  { id: "f20", topic: "js-coercion", level: "Pro", front: "When, if ever, is == the correct choice?", back: "When you deliberately want to treat null and undefined as the same \"nothing\" value in one comparison — x == null is a common, intentional idiom for \"x is null or undefined\". Outside that specific case, === is the safer default." },
  // js-async
  { id: "f21", topic: "js-async", level: "Hacker", front: "The call stack is empty. What runs next — a setTimeout callback or a .then callback?", back: ".then — all queued microtasks run to completion before the event loop picks up the next macrotask (like a timer), no matter which was scheduled first." },
  { id: "f22", topic: "js-async", level: "Hacker", front: "How many microtasks run between two macrotasks?", back: "All of them — the entire microtask queue drains completely, including any new microtasks that earlier microtasks themselves queue, before the event loop touches the next macrotask. A macrotask never gets to interleave partway through the microtask queue." },
  { id: "f23", topic: "js-async", level: "Pro", front: "await \"pauses\" a function. What actually happens to the rest of the function body?", back: "It doesn't literally pause a thread — the rest of the function becomes a continuation that's scheduled to run as a microtask once the awaited value settles. Control returns immediately to whoever called the async function, which is why synchronous code after the call can run before the awaited continuation does." },
  { id: "f24", topic: "js-async", level: "Hacker", front: "Promise.all rejects on the first rejection. Are the other promises cancelled?", back: "No. Promises can't be cancelled once started — they keep running to completion, their results are just ignored by that particular Promise.all call." },
  { id: "f25", topic: "js-async", level: "Pro", front: "Is async/await a different concurrency model from promises, or different syntax over the same one?", back: "Same model, different syntax. async/await desugars to promise chains under the hood — the microtask semantics are identical, it just reads top-to-bottom instead of nesting .then calls." },
  // js-utils
  { id: "f26", topic: "js-utils", level: "Noob", front: "Debounce vs throttle — the one-sentence difference in when the function runs.", back: "Debounce waits for a pause in calls and runs once after the quiet period (good for search-as-you-type). Throttle runs at a steady maximum rate regardless of how many calls come in (good for scroll/resize handlers)." },
  { id: "f27", topic: "js-utils", level: "Noob", front: "For debounce vs throttle, name the event you'd attach each to: search input, window resize, scroll-to-load, autosave.", back: "Debounce: search input, autosave (both want the final settled value, not every intermediate keystroke). Throttle: window resize, scroll-to-load (both fire continuously and need a steady capped rate, not a wait-for-quiet)." },
  { id: "f28", topic: "js-utils", level: "Pro", front: "Your debounce returns a new function. What must it close over to work?", back: "The pending timer id (so a new call can clear the previous one) — that's the whole mechanism. Without a closure over a persistent timer reference, each call would have no way to cancel the previous call's scheduled invocation." },
  { id: "f29", topic: "js-utils", level: "Noob", front: "Why does map(parseInt) break? What does map pass to its callback?", back: "map calls its callback with (value, index, array). parseInt(value, radix) interprets the second argument as a radix, so the index — 0, 1, 2… — gets used as parseInt's radix, producing wrong results or NaN for most entries." },
  { id: "f30", topic: "js-utils", level: "Hacker", front: "Memoisation trades memory for time. When is that trade a loss?", back: "When inputs change too often for the cache to ever hit (fast-changing data), or when the comparison/key-generation cost rivals the cost of just recomputing — at that point you're paying memory and lookup overhead for close to zero reuse. (This is the Capgemini follow-up that scored: name the cost, not just the technique.)" },
  // react-core
  { id: "f31", topic: "react-core", level: "Noob", front: "React re-renders on state change. Does that mean it touches the DOM?", back: "Not necessarily. Re-rendering builds a new virtual DOM tree in memory; reconciliation diffs it against the previous tree, and only the actual differences get committed to the real DOM." },
  { id: "f32", topic: "react-core", level: "Pro", front: "Reconciliation compares two trees. What does React assume when the key changes vs when the element type changes?", back: "A changed key means \"this is a different item\" — React unmounts the old instance and mounts a new one, discarding its state. A changed element type at the same position means \"this subtree is entirely different\" — React tears down the old DOM subtree and builds a new one, rather than trying to diff incompatible types." },
  { id: "f33", topic: "react-core", level: "Pro", front: "With key={index}, you delete the first item in a list of text inputs. What happens to the remaining inputs?", back: "Their typed values shift up one row — React matches elements by key+position, so the second input's DOM node (and its state) gets reused for what is now the first item, showing the wrong text." },
  { id: "f34", topic: "react-core", level: "Hacker", front: "An HOC, a render prop, and a custom hook all share logic. What can a custom hook not do that an HOC can?", back: "A custom hook can't render markup or inject additional JSX into the tree — it only shares stateful logic and returns data/functions. An HOC (or render prop) can wrap the rendered output itself, e.g. rendering a fallback UI or adding a wrapping element, which a hook alone cannot do." },
  { id: "f35", topic: "react-core", level: "Pro", front: "Does an event fired inside a React portal still bubble to the React parent?", back: "Yes — portals only change where the DOM node is placed, not where it sits in the React tree, so React's synthetic event bubbling follows the React hierarchy, not the DOM hierarchy." },
  // react-hooks
  { id: "f36", topic: "react-hooks", level: "Pro", front: "useEffect with [], with [x], and with no array — when does each run?", back: "[]: once after the first render only. [x]: after the first render and again whenever x changes. No array: after every single render. Cleanup runs before the next run of the effect (or on unmount)." },
  { id: "f37", topic: "react-hooks", level: "Pro", front: "Cleanup runs \"before the next effect\". Before, or after, the DOM updates?", back: "Before the DOM updates for the new render — React runs the previous effect's cleanup, then commits the new DOM changes, then runs the new effect. This ordering is what makes cleanup safe for things like removing a listener tied to the old render's DOM node." },
  { id: "f38", topic: "react-hooks", level: "Pro", front: "Why is useState asynchronous-looking? Is it actually async?", back: "The state update isn't reflected in the current render's variable immediately after calling the setter — you have to wait for the next render to see it — which looks async. But the mechanism itself is synchronous scheduling, not actual asynchrony; React just batches the update and applies it before the next render rather than mutating the variable in place." },
  { id: "f39", topic: "react-hooks", level: "Hacker", front: "setCount(count+1) three times in one handler only increments by one. Why? What value is count closed over during that handler?", back: "All three calls read the same count from that render's closure — the value it had when the handler function was created — so each call just computes and queues \"current+1\" again, and the last one wins. The functional updater form, setCount(c => c+1), instead receives the latest pending state each time, so three calls compound." },
  { id: "f40", topic: "react-hooks", level: "Pro", front: "useRef holds a mutable value without re-rendering. Name two legitimate uses that have nothing to do with DOM nodes.", back: "Storing a mutable value that needs to persist across renders but shouldn't trigger one when it changes — e.g. a timer/interval id for later cleanup, or a \"previous value\" snapshot for comparison inside an effect. Also useful for holding a mutable flag like isMountedRef to guard a late-arriving async callback." },
  { id: "f41", topic: "react-hooks", level: "Hacker", front: "What are the Rules of Hooks, and what breaks if you call one conditionally?", back: "Only call hooks at the top level (never in conditions/loops/nested functions), and only from React functions. React tracks hooks by call order, not name — a conditional hook shifts every later hook's slot, corrupting state across renders." },
  // react-perf
  { id: "f42", topic: "react-perf", level: "Hacker", front: "Name every cause of a component re-rendering. There are fewer than you think.", back: "Its own state changed, its parent re-rendered (and it isn't memoised, or its props changed by reference), a context it consumes changed, or a connected store's selected slice changed. That's essentially the full list." },
  { id: "f43", topic: "react-perf", level: "Hacker", front: "Two objects with identical contents. Why does React.memo still re-render?", back: "memo's default comparison is shallow reference equality (Object.is per prop), not deep equality — a new object literal is a different reference even with the same keys/values, so it always fails the check." },
  { id: "f44", topic: "react-perf", level: "Hacker", front: "useMemo caches a value; useCallback caches a function. What do they both actually depend on to work?", back: "Referential stability of their dependency array — they only skip recomputing when every dependency is the same reference (or primitive value) as last time. If a dependency is itself a new object/function every render, the memoisation never actually hits." },
  { id: "f45", topic: "react-perf", level: "Hacker", front: "What does memoisation cost? Name three costs.", back: "Memory (cached results stick around), maintenance (dependency arrays must stay correct or you get stale results), and low or negative benefit on fast-changing data where the cache almost never hits and the comparison overhead dominates." },
  { id: "f46", topic: "react-perf", level: "Hacker", front: "A component re-renders 47 times a second. What is the first thing you measure, before touching code?", back: "What is actually changing on every one of those renders — use the DevTools Profiler's \"why did this render\" flame graph to find the real trigger (a parent, a context, a store selector) rather than guessing and applying memo speculatively." },
  { id: "f47", topic: "react-perf", level: "Pro", front: "Code splitting reduces initial bundle size. What does it cost the user, and when is that cost worse than the benefit?", back: "It costs a visible loading state on the first visit to whatever chunk was split out, while that chunk downloads. It's worse than the benefit when the split-out route/component is visited by nearly everyone anyway — you've just moved the wait to a slightly later, more jarring moment instead of removing it." },
  // react-state
  { id: "f48", topic: "react-state", level: "Hacker", front: "Trace one Redux update end to end, naming every stage.", back: "Click → an event handler dispatches an action → the reducer computes new state from current state + action (pure, no mutation) → the store updates and notifies subscribers → connected components' selectors re-run → any component whose selected slice changed re-renders." },
  { id: "f49", topic: "react-state", level: "Hacker", front: "Context is not a state manager. What does it actually solve?", back: "It solves prop drilling — passing a value down many layers without threading it through every intermediate component. It does not solve derived state, memoized selectors, or update batching the way a real state library does." },
  { id: "f50", topic: "react-state", level: "Hacker", front: "Why does putting frequently-changing values in Context cause performance problems?", back: "Every component that consumes a Context re-renders on any change to its value, with no built-in way to subscribe to just part of it — so a fast-changing value in Context re-renders every consumer on every change, unlike a store with selectors that can narrow what triggers a re-render." },
  { id: "f51", topic: "react-state", level: "Hacker", front: "Name five distinct Redux optimisation levers.", back: "Normalised state shape, memoised selectors (createSelector/reselect), narrowed useSelector calls that read only what's needed, RTK's built-in Immer for safe mutation-style reducer code, and code-splitting reducers for large apps." },
  { id: "f52", topic: "react-state", level: "Pro", front: "Server state and client state behave differently. Name three ways.", back: "Server state can go stale and needs revalidation; it's shared across components by a key/URL rather than by where it lives in the tree; and it needs loading/error states inherent to the fetch itself. This is why forcing server data into Redux usually means re-implementing a caching library (staleness, refetch, dedup) badly instead of just using one (React Query/RTK Query)." },
  // react-routing
  { id: "f53", topic: "react-routing", level: "Pro", front: "Why does an un-cancelled request cause bugs when the user types fast?", back: "Each keystroke can fire its own request, and slower/earlier requests can resolve after faster/later ones — an earlier, now-stale response can arrive last and overwrite the correct result for what the user has since typed, without cancellation or a request-id guard." },
  { id: "f54", topic: "react-routing", level: "Pro", front: "AbortController cancels the request. Does it cancel the promise?", back: "It rejects the fetch promise with an AbortError — the underlying network request is aborted, and your .catch (or try/catch) sees that AbortError, which you typically want to swallow rather than show as a real failure." },
  { id: "f55", topic: "react-routing", level: "Pro", front: "PUT vs PATCH: what does each promise about the resource? Which is idempotent?", back: "PUT replaces the entire resource with the payload given; PATCH applies a partial update. Both are meant to be idempotent (repeating the same request has the same effect as doing it once) — POST is the one that typically isn't, since it usually creates a new resource each time." },
  { id: "f56", topic: "react-routing", level: "Hacker", front: "Where should retry logic live — in the component, in a hook, or in the fetch wrapper?", back: "In a shared hook or fetch wrapper, not the component — retry policy (backoff, attempt count, which errors are retryable) is cross-cutting logic that should be defined once and reused, not duplicated per component that happens to call an API." },
  { id: "f57", topic: "react-routing", level: "Pro", front: "Controlled inputs re-render on every keystroke. At what form size does that matter, and what do you do then?", back: "It rarely matters for a handful of fields. On large forms (dozens of fields), isolate each field or field-group into its own component (or a form library with field-level subscriptions) so one keystroke doesn't re-render the whole form tree." },
  // web-basics
  { id: "f58", topic: "web-basics", level: "Noob", front: "display:none, visibility:hidden, opacity:0 — which reserve space, which are focusable?", back: "display:none removes it from layout entirely (no space, not focusable, no events). visibility:hidden reserves its space but isn't focusable or clickable. opacity:0 reserves its space AND stays focusable/clickable — it's just invisible." },
  { id: "f59", topic: "web-basics", level: "Noob", front: "Pseudo-class vs pseudo-element: the difference in one sentence, and how many colons does each take?", back: "A pseudo-class (one colon, e.g. :hover, :nth-child) targets an element in a certain state or position; a pseudo-element (two colons, e.g. ::before, ::after) targets or creates a sub-part of an element that doesn't exist as a real DOM node." },
  { id: "f60", topic: "web-basics", level: "Noob", front: "Why does semantic markup matter to something other than a human reader? Name two consumers.", back: "Screen readers use semantic tags to build a navigable structure (landmarks, headings) for non-visual users, and search engines use them to understand page structure and content importance for indexing/ranking." },
  { id: "f61", topic: "web-basics", level: "Pro", front: "Explain specificity as a number. Which wins: an ID, ten classes, or an inline style?", back: "Roughly counted as (inline, IDs, classes/attributes/pseudo-classes, elements). An inline style outranks everything (short of !important); an ID outranks any number of classes, since specificity compares column by column, not by summing — ten classes never out-rank one ID." },
  { id: "f62", topic: "web-basics", level: "Pro", front: "Flexbox is one-dimensional, Grid two-dimensional. Give one layout each does badly.", back: "Flexbox does badly at aligning items across multiple rows into a consistent grid (each row's flex items don't know about the row above/below). Grid does badly at content that should just flow and wrap based on its own size without predefined tracks — that's Flexbox's natural strength." },
  // git
  { id: "f63", topic: "git", level: "Noob", front: "revert vs reset — which is safe on a shared branch like main?", back: "git revert is safe — it adds a new commit that undoes changes, preserving history, so it works cleanly with everyone else's pulled copies. git reset --hard + force-push rewrites history and breaks anyone who already pulled the old commits." },
  { id: "f64", topic: "git", level: "Noob", front: "What is actually stored in a stash, and what happens to untracked files?", back: "A stash captures your tracked working-tree and staged changes and stores them separately from normal commit history. Untracked (brand-new, never-added) files are excluded by default — use git stash -u to include them too." },
  { id: "f65", topic: "git", level: "Pro", front: "Merge vs rebase: what changes about the resulting history?", back: "Merge preserves both branches' real commit history and adds a merge commit joining them, showing exactly how development actually happened. Rebase rewrites your branch's commits to sit on top of the target branch, producing a linear history with no merge commit — cleaner to read, but it changes commit SHAs and shouldn't be done on commits others have already pulled." },
  { id: "f66", topic: "git", level: "Pro", front: "A conflict marker has three sections. Which is yours, which is theirs, and what is the middle one in a diff3 conflict?", back: "<<<<<<< HEAD down to ======= is your current branch's version; ======= down to >>>>>>> branch-name is the incoming branch's version. A diff3-style conflict adds a third ||||||| section in between showing the common ancestor, so you can see what each side actually changed relative to." },
  { id: "f67", topic: "git", level: "Noob", front: "What does git fetch do that git pull doesn't?", back: "git fetch downloads the remote's latest history into your local remote-tracking branches without touching your working branch at all — you can inspect what changed before deciding to merge. git pull is fetch immediately followed by a merge (or rebase) into your current branch." },
  // machine-coding
  { id: "f68", topic: "machine-coding", level: "Noob", front: "Todo list: what's the follow-up that separates candidates, beyond add/render/toggle/delete?", back: "Persistence (save to localStorage and hydrate on load), edit-in-place (a per-item editing flag with a controlled input), and being able to justify your choice of key (the item's id, never its array index)." },
  { id: "f69", topic: "machine-coding", level: "Pro", front: "Modal: name the four behaviours you need, in the order you'd wire them.", back: "1) A portal into document.body so it escapes the parent's overflow/z-index. 2) An Escape keydown listener, added on mount and removed on unmount. 3) A backdrop click handler that checks event.target === backdrop, not the modal content, before closing. 4) Storing document.activeElement before opening and restoring focus to it on close." },
  { id: "f70", topic: "machine-coding", level: "Hacker", front: "Autocomplete: what's the race-condition bug, and how do you guard against it?", back: "A fast typist can trigger several requests where an earlier (shorter-query) request resolves after a later one, overwriting the correct suggestions with stale ones. Guard by tracking the current query/request id and ignoring any response that doesn't match the latest one — or, more simply, by cancelling the previous request outright." },
  { id: "f71", topic: "machine-coding", level: "Hacker", front: "Infinite scroll: why IntersectionObserver over a scroll-position calculation?", back: "IntersectionObserver is event-driven — it only fires when the sentinel element actually enters the viewport, instead of running expensive layout calculations on every scroll tick. It also handles variable-height content correctly without manual math." },
  { id: "f72", topic: "machine-coding", level: "Hacker", front: "Drag-and-drop reorder: why is a keyboard alternative not optional polish?", back: "Native HTML drag-and-drop is mouse/touch-only with no built-in keyboard equivalent, so without an explicit keyboard alternative (e.g. Alt+Arrow to move the focused item), the reorder feature is entirely unusable for keyboard-only and many assistive-tech users." },
  // scenario
  { id: "f73", topic: "scenario", level: "God", front: "Three independent API calls on one screen: sequential or parallel? What would make you choose sequential?", back: "Parallel by default — nothing here depends on another call's result, so there's no reason to make the user wait for them one after another. Sequential only makes sense when a later call genuinely needs data from an earlier one (e.g. fetching a user, then fetching that user's orders by id)." },
  { id: "f74", topic: "scenario", level: "God", front: "Where does auth state live, and what happens to it on a hard refresh?", back: "Commonly an access token in memory (safest against XSS) with a refresh token in an httpOnly cookie. On a hard refresh, in-memory state is gone — the app needs a silent-refresh step on load (using the httpOnly cookie) to re-establish the session before rendering protected content." },
  { id: "f75", topic: "scenario", level: "God", front: "One of three panels fails. What does the user see? What does not happen?", back: "That one panel shows its own error state; the other two panels render normally with their own data. What does not happen: the whole page does not blank out or show one global error — failure is isolated to the panel whose call actually failed." },
  { id: "f76", topic: "scenario", level: "Hacker", front: "Which parts of a screen would you make separate components, and what is your rule for splitting?", back: "Split along independent data/lifecycle boundaries — each piece that fetches its own data, manages its own loading/error state, or re-renders on its own trigger is a natural component boundary. Splitting purely on visual layout without considering data ownership tends to produce components that all need to re-render together anyway." },
  { id: "f77", topic: "scenario", level: "Pro", front: "SSR vs CSR: name the metric each improves and the cost each carries.", back: "SSR improves first-contentful-paint and SEO (real HTML arrives immediately) at the cost of server compute per request and more complex hydration. CSR ships a mostly-empty HTML shell and renders everything client-side — cheaper to host and simpler to reason about, at the cost of a blank/loading initial paint until JS runs." },
  { id: "f78", topic: "scenario", level: "Pro", front: "What problem do micro-frontends solve? What problem do they create?", back: "They let independent teams ship and deploy separate parts of one product independently, avoiding one giant coupled codebase and release train. They create real costs: duplicated dependencies/bundle size, cross-team consistency effort, and integration complexity — usually not worth it below a certain team size (the wiki's rule of thumb: not on a 6-person team)." },
  // managerial
  { id: "f79", topic: "managerial", level: "Noob", front: "Your 90-second project story: does it end in a decision you made and its tradeoff?", back: "It should. \"I built X using Y\" is a feature list; \"I chose X over Y because Z, which cost us W but bought us V\" is a decision — the second is what interviewers are actually listening for, and what invites a good follow-up instead of a dead end." },
  { id: "f80", topic: "managerial", level: "Pro", front: "Name a technical disagreement you had and how it resolved. What did you concede?", back: "A strong answer names a real position you gave up, not just \"we discussed it and found a great compromise\" — conceding something specific signals you can be persuaded by evidence, not just that you're agreeable." },
  { id: "f81", topic: "managerial", level: "Pro", front: "Name a production bug you caused. What did you change afterwards — in the code, and in the process?", back: "Two-part answer: the code fix (what actually resolved the bug) and the process change (a test that would have caught it, a review step, a monitoring alert) — naming only the code fix suggests you haven't thought about preventing the next one." },
  { id: "f82", topic: "managerial", level: "Noob", front: "Your \"why leaving\" answer criticises your current employer. What's the fix?", back: "Reframe around what you're moving toward, not what you're escaping — growth, scope, technology — never the team, manager, or company by name. The content should survive being repeated back to that employer." },
  { id: "f83", topic: "managerial", level: "Pro", front: "What do you actually do in a sprint? Name the ceremonies and your part in each.", back: "Standup (report progress/blockers daily), sprint planning (commit to and estimate a slice of work), sprint review/demo (show finished work to stakeholders), and retro (name what to keep/change about the process) — a strong answer names your concrete part in each, not just that the team \"does Agile\"." }
];

// ---------------------------------------------------------------------------
// TOPIC_ARTICLES — wiki-grounded prose for each topic's lesson.
// ---------------------------------------------------------------------------
export const TOPIC_ARTICLES = {
  "js-scope": {
    summary: "One of the highest-ROI interview areas in the whole wiki. The job description barely names it, but real rounds keep returning to hoisting, TDZ, and scope shadowing.",
    bullets: [
      "Narrate execution, not definitions: what is created first, when bindings exist, and when values are assigned.",
      "Use output prediction as the training format because the real rounds lean on short snippets under time pressure.",
      "Be precise about TDZ language: the binding exists, but it is uninitialised until the declaration runs."
    ],
    articleSections: [
      {
        heading: "How hoisting and TDZ actually work",
        body: [
          "JavaScript runs each scope in two passes. First, the creation phase scans every declaration in that scope and registers it before a single line executes: `var` declarations become `undefined` immediately, function declarations become fully callable, and `let`/`const` declarations are registered but left uninitialised. Then the execution phase runs your code top to bottom.",
          "That's the whole mechanism behind `console.log(x); var x = 5;` logging `undefined` instead of throwing — `x` already exists (as `undefined`) by the time that log runs — and behind `console.log(y); let y = 5;` throwing instead — `y` exists too, but it's in its Temporal Dead Zone until the `let y = 5` line actually executes.",
          "Scope shadowing follows the same registration rule: `function f(){ console.log(x); var x = 2; }` logs `undefined`, not a ReferenceError, because the inner `var x` was already hoisted into f's scope before the log ran, shadowing any outer `x` for the whole function body."
        ]
      },
      {
        heading: "Why this gets asked",
        body: [
          "The knowledge graph marks JavaScript internals as the single biggest JD-versus-interview gap. Service-company React interviews routinely spend a large share of the technical round here even when the JD only says 'strong JavaScript fundamentals'.",
          "That means answers about hoisting and scope need to sound like an execution trace, not a memorised slogan."
        ]
      },
      {
        heading: "What to sound like in the round",
        body: [
          "Explain that declarations and assignments do not move in the same way. `var` becomes available as `undefined`, while `let` and `const` are hoisted into a temporal dead zone until the declaration line runs.",
          "Good answers compare alternatives directly: not declared versus declared-but-uninitialised, function declaration versus function expression, block scope versus function scope."
        ]
      },
      {
        heading: "Practice shape from the repo",
        body: [
          "Use the output questions in `questions/questions.md` first, then rehearse the [LEARN] sequence aloud. The wiki explicitly warns that knowledge collapses on follow-ups when you only answer silently in your head.",
          "If this topic feels shaky, week 1 of the study plan says to drill 12 output snippets a day before moving on."
        ]
      }
    ],
    sources: ["wiki/02-knowledge-graph.md", "wiki/07-study-plan.md", "questions/questions.md"]
  },
  "js-closures": {
    summary: "Closures are tested as both definition and reasoning. The follow-up that matters is usually the practical use case, not the textbook line.",
    bullets: [
      "Treat a closure as a live variable binding, not a frozen snapshot.",
      "Always be ready to contrast `var` and `let` in loops because that example shows whether you truly understand the mechanism.",
      "Mention one legitimate use case and one memory-retention risk."
    ],
    articleSections: [
      {
        heading: "How closures actually work",
        body: [
          "Every function keeps a live reference to the scope it was defined in — not a copy of the variables, the actual binding. When the outer function returns, that scope doesn't get garbage-collected as long as something (the inner function) still references it. That's a closure: not a special syntax, just what functions always do, made visible once the outer function has already returned.",
          "The classic proof is a counter: `function makeCounter(){ let n=0; return {inc:()=>++n, value:()=>n}; }`. Every call to `inc` and `value` reads and writes the *same* `n`, because they were created in the same call to `makeCounter` and share that one binding. A second call to `makeCounter` creates an entirely new `n` — completely unreachable from the first counter.",
          "The var-vs-let loop bug is the same mechanism from a different angle: `var` has exactly one binding for the whole loop, so every callback that closes over it is closing over the *same* `i` — by the time any of them run, the loop is done and `i` is at its final value. `let` creates a new binding each pass through the loop, so each callback gets its own."
        ]
      },
      {
        heading: "Why interviewers stay on this topic",
        body: [
          "The question bank shows closures recurring across Accenture, Cognizant, Capgemini, and Infosys. Capgemini's reported follow-up was specifically 'what is a practical use case?'",
          "That makes closure answers a depth test: if you cannot move from definition to behaviour, the round usually turns against you."
        ]
      },
      {
        heading: "What a strong answer includes",
        body: [
          "State that the inner function keeps access to variables from its lexical scope even after the outer function returns. Then make it concrete with a counter, `once(fn)`, debounce, or module-style private state.",
          "When asked about the loop bug, explain that `var` creates one shared binding while `let` creates a fresh binding per iteration."
        ]
      },
      {
        heading: "How to study it here",
        body: [
          "The repo's code prompts already cover the classic loop problem, a private counter, `once`, and separate closure instances. Use those before inventing extra questions.",
          "The study plan's 'depth beats quantity' rule applies strongly here: master a few closure patterns deeply instead of collecting dozens of variations."
        ]
      }
    ],
    sources: ["wiki/02-knowledge-graph.md", "wiki/04-question-bank.md", "questions/questions.md"]
  },
  "js-this": {
    summary: "This cluster combines call-site reasoning with object/prototype fundamentals, which shows up often in Cognizant and Capgemini-style questioning.",
    bullets: [
      "Anchor `this` to how a function is called, not where it was written.",
      "Use shallow-versus-deep copy examples because they often appear as a paired follow-up.",
      "Prototype questions are usually easier if you narrate where the property lookup falls through."
    ],
    articleSections: [
      {
        heading: "How `this`, prototypes, and copying actually work",
        body: [
          "`this` isn't fixed to a function when it's written — it's re-evaluated every time the function is *called*, based on the call-site. `obj.method()` sets `this` to `obj`. A bare reference pulled off an object and called plain, like `const fn = obj.method; fn();`, loses that binding entirely — `this` is `undefined` (strict mode) because there's no object before the dot at the call-site anymore. Arrow functions sidestep this: they capture `this` lexically from their surrounding code at the moment they're defined, and nothing about how they're later called changes that.",
          "Prototypal inheritance is a chain of object links, not a copy. `A.prototype.x = 1` doesn't give every instance its own `x` — it puts `x` on one shared object every instance can reach through its prototype link when its own lookup misses. `new A()` sets that link up automatically; `instance.x = 2` then creates a real own property that shadows the prototype's `x` until it's deleted.",
          "Copying an object with `{...obj}` only copies what's directly on `obj` — one level. If a value at that level is itself an object, the copy holds the *same* reference to it as the original, so mutating that nested value through either one is visible through both."
        ]
      },
      {
        heading: "Three ideas usually bundled together",
        body: [
          "The knowledge base groups `this`, prototypes, shallow/deep copy, and object behaviour because interviewers commonly move between them in one conversation.",
          "The repo's sample outputs already model the right kinds of transitions: regular versus arrow functions, spread copying nested references, and deleted instance properties surfacing from the prototype."
        ]
      },
      {
        heading: "Answer shape that scores",
        body: [
          "For `this`, answer with the deciding condition: regular functions get `this` from the call-site, arrow functions inherit it lexically.",
          "For copying, say exactly where sharing begins. For `new`, list the object creation, prototype link, constructor call, and returned object steps in order."
        ]
      }
    ],
    sources: ["wiki/02-knowledge-graph.md", "questions/questions.md"]
  },
  "js-coercion": {
    summary: "Coercion questions are quick filters. The round usually wants a crisp rule, not a philosophical opinion about loose equality.",
    bullets: [
      "Explain `==` as type coercion plus comparison, not as 'less strict'.",
      "Memorise the falsy set completely.",
      "Use `||` versus `??` as the practical rule check."
    ],
    articleSections: [
      {
        heading: "How coercion and equality actually work",
        body: [
          "`==` and `===` both start by checking whether the two operands are the same type. If they are, they behave identically. They only diverge when the types differ: `===` immediately returns false, while `==` runs a conversion algorithm first — turning booleans and strings into numbers, and objects into a primitive via `toPrimitive` — and only then compares. `[] == false` is true because `[]` converts to `\"\"` then to `0`, and `false` converts to `0` too — two conversions landing on the same value, not any real equivalence between arrays and booleans.",
          "The falsy list is short and worth memorising outright rather than reasoning about case by case: `false, 0, -0, 0n, \"\", null, undefined, NaN`. Everything else is truthy, including an empty array or object — a common trip-up since `if ([])` is true.",
          "`0.1 + 0.2 !== 0.3` isn't a JavaScript quirk, it's how IEEE-754 floating point works in every language that uses it — most decimal fractions can't be represented exactly in binary, so arithmetic on them accumulates tiny errors. The fix is never to compare floats for exact equality; compare the difference against a small epsilon instead."
        ]
      },
      {
        heading: "What interviewers test here",
        body: [
          "The repo frames coercion as rule-based reasoning: `==` versus `===`, falsy values, `typeof null`, floating-point precision, and nullish coalescing.",
          "This topic tends to appear as rapid-fire prediction because it reveals whether you can apply the language rules under pressure."
        ]
      },
      {
        heading: "How to respond cleanly",
        body: [
          "State the algorithmic idea: `===` compares without coercion, while `==` may convert operands before comparing.",
          "When asked if `==` is ever correct, tie it to a specific condition rather than claiming it is always bad or always fine."
        ]
      }
    ],
    sources: ["wiki/02-knowledge-graph.md", "questions/questions.md"]
  },
  "js-async": {
    summary: "Async is a production-level discriminator in this repo: event loop reasoning, promise behaviour, and cancellation all separate strong 3+ year candidates from memorised answers.",
    bullets: [
      "Microtasks before macrotasks is non-negotiable.",
      "Explain `await` as scheduling the remainder of the function, not freezing the thread.",
      "Cancellation and retry are where experience level becomes visible."
    ],
    articleSections: [
      {
        heading: "How the event loop actually works",
        body: [
          "JavaScript has one call stack. Synchronous code runs on it directly, start to finish, with nothing else able to interleave. Async work — a timer, a fetch, a promise resolving — doesn't run on the stack; it gets scheduled onto one of two queues, and the event loop only looks at those queues once the stack is completely empty.",
          "There are two queues with different priority. The microtask queue holds promise `.then`/`.catch`/`.finally` callbacks and `queueMicrotask` calls; the macrotask queue holds timers, I/O, and UI events. Every time the stack empties, the event loop drains the *entire* microtask queue — including new microtasks queued by ones that just ran — before it lets even one macrotask through. That ordering, not the 0ms delay, is why `Promise.resolve().then(...)` always logs before `setTimeout(fn, 0)`.",
          "`await` doesn't block anything. `async function f(){ console.log('A'); await x; console.log('B'); }` runs synchronously up to the `await`, then the rest of `f` becomes a microtask that resumes once `x` settles — control returns to whoever called `f()` immediately, so code right after `f()` in the caller runs before the 'B' log, even though `f()` was called first."
        ]
      },
      {
        heading: "Why this matters more than syntax",
        body: [
          "The knowledge graph treats event loop, promises, and async UI as a must-know node because many rounds move from a simple output puzzle into production behaviour questions.",
          "A candidate may know `async/await` syntax but still fail if they cannot explain execution order or what happens to other promises after `Promise.all` rejects."
        ]
      },
      {
        heading: "The canonical mental model",
        body: [
          "Synchronous code runs first. When the call stack is clear, queued microtasks drain fully before the event loop runs the next macrotask such as a timer.",
          "That is why the repo keeps using promise callbacks, `queueMicrotask`, and `setTimeout` together in one drill."
        ]
      },
      {
        heading: "Production follow-ups to expect",
        body: [
          "The broader wiki links async knowledge to real UI work: debounce, fetch, cancellation, loading states, retry logic, and race conditions when users type quickly.",
          "If you can explain the search-box flow from `questions/questions.md`, you cover multiple must-know nodes at once."
        ]
      }
    ],
    sources: ["wiki/02-knowledge-graph.md", "wiki/05-coding-tasks.md", "questions/questions.md"]
  },
  "js-utils": {
    summary: "Polyfills and utility questions are less about obscure tricks and more about whether you can rebuild common behaviour from first principles.",
    bullets: [
      "Debounce and throttle should be answerable from memory.",
      "Interviewers often want a real scenario for each, not just a definition.",
      "Utility problems stay near practical frontend data work: flattening, dedupe, grouping, and string handling."
    ],
    articleSections: [
      {
        heading: "How debounce, throttle, and destructuring actually work",
        body: [
          "Debounce and throttle both exist to stop a fast-firing event (typing, scrolling, resizing) from running expensive work on every trigger — they just make different tradeoffs about *when* the work runs. A debounced function tracks one pending timer: every call cancels the previous timer and schedules a fresh one, so the wrapped function only actually fires once calls stop coming for the full delay. A throttled function tracks whether it's 'cooling down': the first call runs immediately and starts a timer; calls during that window are dropped, and the next call after the timer clears runs and restarts the cycle.",
          "Spread (`...`) and rest (`...`) use identical syntax for opposite jobs. Spread appears where a value is *expected* — inside `[]`, `{}`, or a function call — and expands an iterable into that context: `[...a, ...b]` merges two arrays, `fn(...args)` spreads an array into positional arguments. Rest appears in a *binding* position — a parameter list or destructuring pattern — and does the reverse, collecting the remaining items into one array: `function f(first, ...rest){}`.",
          "Destructuring is just a shorthand for repeated property/index access: `const {name, age} = user` is exactly equivalent to `const name = user.name, age = user.age`, just with less repetition, and it supports default values (`{name = 'Guest'}`) and renaming (`{name: userName}`) directly in the pattern."
        ]
      },
      {
        heading: "What the knowledge base emphasises",
        body: [
          "The study plan explicitly calls out polyfills as a separate practice track: debounce, throttle, deep clone, and flatten from memory.",
          "The machine-coding and question-bank docs both reinforce that these are common because they sit close to day-to-day frontend work."
        ]
      },
      {
        heading: "Best way to prepare",
        body: [
          "Write the function first, then explain what state it closes over and what tradeoff it makes. Debounce, for example, is really about retaining timer state across calls.",
          "Also rehearse the scenario mapping: search input, resize, autosave, scroll-to-load."
        ]
      }
    ],
    sources: ["wiki/05-coding-tasks.md", "wiki/07-study-plan.md", "questions/questions.md"]
  },
  "react-core": {
    summary: "Core React questions still dominate the round: props versus state, reconciliation, keys, HOCs, portals, and controlled inputs.",
    bullets: [
      "Talk about render and DOM work as separate things.",
      "Keys are not an optimisation detail; they decide identity.",
      "Portals are a favourite follow-up because DOM hierarchy and React hierarchy diverge."
    ],
    articleSections: [
      {
        heading: "How the virtual DOM, keys, and portals actually work",
        body: [
          "Every time a component re-renders, React calls it again and gets back a description of what the UI should look like — the virtual DOM, plain JS objects, cheap to create. React then diffs that new tree against the tree from the last render — reconciliation — and computes the smallest set of real DOM operations that would turn the old tree into the new one. Only those operations touch the actual DOM; everything else is left untouched even though the whole component function ran again.",
          "Keys are how reconciliation tells items apart across renders. Without a key, or with an unstable one like the array index, React can only match by position — so deleting the first row of a list shifts every *later* node up one slot and deletes the *last* one, which is why typed input values appear to jump to the wrong row. A stable key (the item's real id) fixes this because React tracks identity, not position.",
          "A portal (`ReactDOM.createPortal(children, domNode)`) splits 'where does this render in the DOM' from 'where does this live in the React tree' — the JSX still appears wherever you put it in your component tree (so context and React's synthetic event bubbling work exactly as if it hadn't moved), but its actual DOM nodes get attached wherever you point it. That's the standard escape hatch for modals and tooltips that need to sit outside a parent's `overflow:hidden` or stacking context."
        ]
      },
      {
        heading: "What the repo says interviewers expect",
        body: [
          "The knowledge graph marks React core plus hooks as a must-know node aligned with both JDs and interviews. The reported questions span props, state, HOCs, portals, keys, virtual DOM, reconciliation, and child-to-parent communication.",
          "These are not edge questions. They are the main body of many rounds."
        ]
      },
      {
        heading: "The explanation style to aim for",
        body: [
          "When asked about re-rendering, separate the virtual tree update from real DOM commits. When asked about keys, describe what React believes has stayed the same and what it decides to recreate.",
          "For controlled versus uncontrolled forms, answer with a tradeoff rather than declaring one universally better."
        ]
      }
    ],
    sources: ["wiki/02-knowledge-graph.md", "wiki/04-question-bank.md", "questions/questions.md"]
  },
  "react-hooks": {
    summary: "Hooks are everywhere in the dataset, but `useEffect` behaviour is the recurring pressure point.",
    bullets: [
      "Dependency arrays and cleanup timing should feel mechanical by now.",
      "Be able to contrast stale closures, updater functions, refs, and reducers.",
      "Custom hooks matter because they turn repeated reasoning into reusable code."
    ],
    articleSections: [
      {
        heading: "How useEffect and stale closures actually work",
        body: [
          "Every render of a function component creates a fresh closure — its own copies of every variable and function defined in that render. useEffect's callback is created fresh each render too, but React only *runs* the version from the render where the dependency array actually changed, comparing entries by reference/value against the previous render's array. That's why an effect with `[]` only ever sees the props/state from the very first render — its closure was captured once and never replaced.",
          "That's the mechanism behind the classic stale-closure bug: `useEffect(() => { setInterval(() => console.log(count), 1000); }, [])`. The interval callback closes over `count` from the *first* render, forever — since the effect never re-runs (empty deps), that closure never gets refreshed, so it logs the same value every time regardless of later state updates. Fixing it means either adding `count` to the deps (tearing down and recreating the interval each time it changes) or reading a ref that's kept up to date separately, so the interval doesn't need to be recreated at all.",
          "The same closure mechanism explains `setCount(count+1)` called three times in one handler only advancing by one: all three calls are reading `count` from that single render's closure, so all three compute the same 'current + 1'. `setCount(c => c+1)` sidesteps the stale closure entirely by receiving React's own up-to-date pending value instead of the one captured in the handler's closure."
        ]
      },
      {
        heading: "Why hooks remain central",
        body: [
          "The question bank ranks hooks and `useEffect` behaviour as the most convergent topic across companies. That means you should expect them almost regardless of employer.",
          "Interviewers often combine lifecycle mapping, dependency arrays, fetch-in-effect reasoning, and state update semantics in a single sequence."
        ]
      },
      {
        heading: "What to drill from this repo",
        body: [
          "Use the stale closure interval bug, triple `setCount`, `useDebounce`, `useFetch`, and conditional-hook rule questions as your core set.",
          "If you can explain why each one works or breaks, you have the practical depth the wiki is pushing for."
        ]
      }
    ],
    sources: ["wiki/02-knowledge-graph.md", "wiki/04-question-bank.md", "questions/questions.md"]
  },
  "react-perf": {
    summary: "Performance is the 3+ years discriminator in this knowledge base. The point is not to name `useMemo`; it is to know when memoisation helps and when it costs more than it saves.",
    bullets: [
      "Referential equality explains many 'why did this re-render?' moments.",
      "Memoisation has costs: memory, maintenance, and low benefit on fast-changing data.",
      "Measure before optimising."
    ],
    articleSections: [
      {
        heading: "How re-renders and memoisation actually work",
        body: [
          "A component re-renders when React decides its output might have changed — its own state updated, its parent re-rendered (React re-renders children by default, regardless of whether their props actually changed), a context value it reads changed, or a store selector it uses returned something new. `React.memo` skips a re-render triggered by 'my parent re-rendered' specifically, but only if every prop is `Object.is`-equal to last time — a *shallow* check, not a deep one.",
          "That shallow check is exactly why `<Child style={{margin:8}} onClick={()=>...} />` breaks memo even when nothing meaningful changed: `{margin:8}` and the arrow function are brand-new objects on *every* render of the parent, so from memo's perspective the props are always different, even though their contents are identical every time. Fixing it means making those references actually stable — hoist the style object to a constant outside the component, wrap the handler in `useCallback`.",
          "`useMemo` and `useCallback` work the same way in reverse: they skip recomputing/recreating something as long as their own dependency array is reference-stable. If one of those dependencies is itself a fresh object/function every render, the memoisation never actually saves anything — you're paying the cost of the dependency comparison on every render with none of the benefit, which is exactly the 'is caching always beneficial?' trap interviewers probe for."
        ]
      },
      {
        heading: "Why this topic matters disproportionately",
        body: [
          "The wiki calls re-render control and performance a must-know node and explicitly labels it the 3+ years discriminator. Several reported rounds ask about performance techniques, code splitting, or unnecessary re-renders.",
          "One recruiting anecdote in the graph says a candidate with seven years of React could not explain a re-render when props looked unchanged."
        ]
      },
      {
        heading: "The tradeoff framing interviewers like",
        body: [
          "A good answer names the exact cause first: parent render, local state change, context update, store selector change, or changed prop reference.",
          "Then justify the fix: move state, stabilise props, split components, memoise only when the measured cost is real, or virtualise long lists."
        ]
      }
    ],
    sources: ["wiki/02-knowledge-graph.md", "wiki/03-skill-classification.md", "questions/questions.md"]
  },
  "react-state": {
    summary: "State management questions are common and surprisingly operational: Redux flow, Context limits, and optimisation levers are all expected.",
    bullets: [
      "Trace one update end-to-end from action to selector-driven render.",
      "Context solves prop drilling, not every global-state problem.",
      "Keep a one-sentence Context-versus-Redux rule ready."
    ],
    articleSections: [
      {
        heading: "How Redux and Context actually differ",
        body: [
          "Redux is a single store holding your app's client state, updated only through dispatched actions and pure reducer functions — never mutated directly. That constraint is what makes the flow traceable: every state change has a named action behind it, visible in devtools, and every reducer is a pure function you can test in isolation without rendering anything.",
          "Context solves exactly one problem: reading a value without threading it through every intermediate component as a prop. It has no concept of a reducer, an action, or a selector — every component that calls `useContext` on a given Context re-renders whenever that Context's value changes, full stop, with no way to subscribe to only part of it. That's fine for a value that rarely changes (theme, current user); it becomes a real performance problem for something that updates often, because there's no way to opt individual consumers out.",
          "Redux's selectors are the piece Context can't replicate: `useSelector(state => state.users.list)` only triggers a re-render when *that specific slice* changes, and `createSelector` can memoise a derived computation so it doesn't even recompute unless its own inputs changed. That's the real dividing line for choosing between them — not 'is it global state', but 'does update frequency and selective subscription actually matter here'."
        ]
      },
      {
        heading: "What the wiki keeps repeating",
        body: [
          "Redux, RTK, and Context appear throughout the question bank and the condensed skill list. The repo also calls out five optimisation levers you should be able to list without hesitation.",
          "This is one of the most aligned skills between JD wording and interview behaviour."
        ]
      },
      {
        heading: "What strong answers look like",
        body: [
          "Describe the Redux flow in order, then narrow into why selectors and state shape affect render behaviour.",
          "For Context versus Redux, use the deciding condition: small, rarely changing shared values fit Context; complex or frequently changing app state usually needs a dedicated store."
        ]
      }
    ],
    sources: ["wiki/02-knowledge-graph.md", "wiki/03-skill-classification.md", "wiki/07-study-plan.md"]
  },
  "react-routing": {
    summary: "Routing, forms, and API integration are where 'frontend interview' turns into 'real UI engineering'.",
    bullets: [
      "Protected routes, query state, and request cancellation are the most reusable mental models here.",
      "The canonical async component in the study plan covers multiple interview nodes at once.",
      "Error, loading, and empty states are part of the answer, not polish."
    ],
    articleSections: [
      {
        heading: "How request cancellation and the race condition actually work",
        body: [
          "Fetch requests don't resolve in the order they were sent — they resolve in the order the network happens to return them. If a user types 'r', 'e', 'a', 'react' fast enough, four requests go out, and there's no guarantee the response for 'react' (the last, most correct query) arrives last. If a response for 'r' arrives after the response for 'react', and nothing checks which query a response belongs to, the UI ends up displaying results for 'r' as if the user had only typed one letter — the classic race condition in a search box.",
          "AbortController fixes this at the source: a fresh controller per request, its `.signal` passed into `fetch`, and calling `.abort()` on the *previous* controller before firing a new request. The aborted request's promise rejects with an `AbortError`, which you catch and ignore — the point isn't graceful error handling, it's that the stale request's response, if it ever does arrive, gets discarded instead of overwriting the current one.",
          "The debounce that usually sits in front of all this reduces *how many* requests go out, but doesn't fix the ordering problem by itself — a debounce still lets the second-to-last keystroke's request through if it's slow enough, which is why cancellation and debouncing are typically used together, not as substitutes for each other."
        ]
      },
      {
        heading: "The canonical build to master",
        body: [
          "The study plan and knowledge graph both keep pointing to the same exercise: search box to debounce to fetch to cancellation to loading/error/empty to pagination.",
          "That one flow tests hooks, async reasoning, API integration, render decisions, and practical UX under changing input."
        ]
      },
      {
        heading: "Scenario questions connect here too",
        body: [
          "Protected routes, public routes, navigation state, and parallel API loading all show up again in the loan-management system design prompt.",
          "If you can explain route boundaries and where retry or cancellation logic should live, you are already answering the higher-level architecture follow-ups."
        ]
      }
    ],
    sources: ["wiki/02-knowledge-graph.md", "wiki/05-coding-tasks.md", "questions/questions.md"]
  },
  "web-basics": {
    summary: "HTML and CSS questions are shallow but frequent, and the wiki treats them as cheap points many React candidates throw away.",
    bullets: [
      "Recover semantic tags, void elements, datalist, specificity, and display-versus-visibility instantly.",
      "Keep one responsive layout in Flexbox and one in Grid ready from memory.",
      "Answer quickly; these are usually speed checks, not discussion prompts."
    ],
    articleSections: [
      {
        heading: "How specificity and the box model actually work",
        body: [
          "CSS specificity isn't a sum, it's a comparison of four counted categories in strict priority order: inline styles, then ID selectors, then classes/attributes/pseudo-classes, then element selectors. The comparison happens column by column, most significant first — ten class selectors never beats a single ID selector, because the ID column is compared before the class column even matters. Only when two selectors tie in every higher column does the next column decide.",
          "The box model is why layout math trips people up: an element's rendered width is its content width *plus* padding *plus* border by default (`box-sizing: content-box`), so setting `width:200px` on something with 20px of padding renders 240px wide. `box-sizing: border-box` (which most CSS resets apply globally) changes width/height to include padding and border, so the number you set is the number you actually get on screen.",
          "display:none, visibility:hidden, and opacity:0 all make something invisible, but differ in layout and interactivity: display:none removes the element from the layout flow completely (siblings shift to fill the gap); visibility:hidden reserves the space but hides the content; opacity:0 reserves the space, hides the content visually, and — unlike the other two — leaves the element focusable and clickable, since opacity is purely a paint-time property."
        ]
      },
      {
        heading: "Why this matters despite the small depth",
        body: [
          "The skill graph labels HTML and CSS fundamentals as must-know because several companies, especially Infosys, still ask textbook questions directly.",
          "The wiki warns that component-library-heavy candidates often underprepare here and lose easy signal."
        ]
      },
      {
        heading: "Best prep pattern",
        body: [
          "Use one evening for the full trivia sweep exactly as the study plan suggests, then keep the questions warm with flashcards and quick oral revision.",
          "This topic is more about fast recall than long-form explanation."
        ]
      }
    ],
    sources: ["wiki/02-knowledge-graph.md", "wiki/07-study-plan.md", "questions/questions.md"]
  },
  "git": {
    summary: "Git is not always asked, but when it appears it can take over a whole section of the round, especially at Accenture.",
    bullets: [
      "Know revert versus reset in terms of history impact.",
      "Be able to switch branches safely with in-progress work.",
      "Conflict-resolution answers should sound like you have done it, not only read it."
    ],
    articleSections: [
      {
        heading: "How revert/reset and merge/rebase actually differ",
        body: [
          "revert and reset both 'undo' a commit, but through opposite mechanisms. revert creates a brand-new commit whose changes are the inverse of the target commit — history only ever grows, nothing is deleted or rewritten, which is exactly why it's safe to run on a branch other people have already pulled from. reset moves your branch pointer backward (optionally discarding working-tree changes too, with --hard) — the commits it moves past still exist briefly in git's reflog, but the branch itself no longer contains them, which is why doing this on a shared branch strands everyone who already pulled those commits.",
          "Merge and rebase both combine two branches' work, but produce different history shapes. Merge takes both branches exactly as they happened and adds one new commit joining them — the graph shows a true record of when each branch diverged and rejoined, at the cost of extra merge commits cluttering the log. Rebase takes your branch's commits and replays them one by one on top of the target branch's latest commit, as if you'd started from there — the result reads as a straight line with no merge commits, but every replayed commit gets a new SHA, which is exactly why rebasing commits someone else has already pulled breaks their copy of history."
        ]
      },
      {
        heading: "Why this topic is asymmetric",
        body: [
          "The classification doc marks Git as high value rather than universal, but some rounds devote an entire section to it. That makes it a strong low-effort investment.",
          "The study plan assigns it about an hour because the command set is small and the payoff can be high."
        ]
      },
      {
        heading: "What to practise",
        body: [
          "Run the scratch-repo exercises from the questions file: revert a bad commit, stash and switch, create a real conflict, and recover with reflog.",
          "Then answer every Git question in terms of tradeoffs and collaboration safety."
        ]
      }
    ],
    sources: ["wiki/01-market-and-loop.md", "wiki/03-skill-classification.md", "questions/questions.md"]
  },
  "machine-coding": {
    summary: "Machine coding is judged on finished behaviour and clear narration, not on polished visuals.",
    bullets: [
      "Restate the MVP before writing code.",
      "Build working behaviour first, then mention follow-ups if time runs low.",
      "Choose familiar patterns: state shape, event handlers, and accessibility basics."
    ],
    articleSections: [
      {
        heading: "How to actually run a machine-coding round",
        body: [
          "Restate the MVP out loud before writing any code — 'I'll build add/render/toggle/delete first, then filters if time allows' — this confirms the core behaviour with the interviewer, stops you from over-building, and hands them your natural follow-up path instead of them having to invent one.",
          "Build in behaviour order, not polish order: working logic with ugly styling beats a beautiful UI that doesn't actually toggle. Loading/error/empty states are themselves part of what's being evaluated, not something to skip if time is short — leaving them out is one of the most common mid-level signals interviewers watch for.",
          "If time runs out, narrate what you'd add next instead of scrambling silently — naming the follow-up (focus trap, keyboard nav, virtualisation) shows you know it's needed even if you don't have time to build it, which reads very differently from just not mentioning it at all."
        ]
      },
      {
        heading: "How the wiki frames these rounds",
        body: [
          "The machine-coding guide says the widgets are usually easy. The real bar is finishing a clean MVP and narrating sound decisions under time pressure.",
          "The standard set in this repo includes tabs, modal, dropdown, pagination, autocomplete, nested comments, and more, each paired with the follow-up that separates candidates."
        ]
      },
      {
        heading: "Highest-leverage exercise",
        body: [
          "The docs keep circling back to debounced search with cancellation because it hits async data, render state, and interaction design in one build.",
          "If you can build one canonical async component well, several interview formats become much easier."
        ]
      }
    ],
    sources: ["wiki/05-coding-tasks.md", "wiki/07-study-plan.md", "questions/questions.md"]
  },
  "scenario": {
    summary: "Scenario design turns your knowledge into architecture decisions: routes, auth boundaries, data loading, isolation of failures, and rendering strategy.",
    bullets: [
      "Parallel versus sequential loading should always be a deliberate choice.",
      "One failing panel should not blank the whole screen.",
      "Explain where state lives and why."
    ],
    articleSections: [
      {
        heading: "How to structure a scenario-design answer",
        body: [
          "The strongest scenario answers move through the same order every time: route map and auth boundaries first (what's public, what's protected, where does the redirect happen), then where state lives and why, then data loading strategy (parallel vs sequential, and why), then what the user sees when something fails. Skipping straight to 'I'd use Redux' without establishing the route/auth layer first is the single most common way these answers lose points.",
          "Parallel loading isn't just faster — it's also what makes failure isolation possible. If three panels each own an independent fetch, one failing genuinely doesn't affect the others; if one parent fetch loads all three and distributes the data, a single failure can take the whole screen down unless you deliberately build in per-panel error boundaries anyway. Answering 'parallel, with isolated failure states' in one breath signals you've thought about both.",
          "SSR/CSR and micro-frontends tend to come up as 'do you have an opinion' follow-ups rather than deep-dives at the 3-year level — the expected answer is a clear tradeoff (what metric improves, what it costs), not a lecture. Naming the condition under which you'd choose the other option is what separates a strong answer from a memorised definition."
        ]
      },
      {
        heading: "The flagship scenario in this repo",
        body: [
          "TCS's reported loan-management question appears throughout the wiki because it forces a candidate to combine routing, auth, API parallelism, loading strategy, and public-versus-protected pages in one answer.",
          "That makes it a great rehearsal target for both technical and managerial rounds."
        ]
      },
      {
        heading: "How to structure your answer",
        body: [
          "Start with route map and auth rules, then describe state placement and API layering. After that, cover parallel fetches, skeletons, panel-level errors, and what the user still sees if one call fails.",
          "The strongest answers feel like a small system design, not a list of React features."
        ]
      }
    ],
    sources: ["wiki/01-market-and-loop.md", "wiki/02-knowledge-graph.md", "questions/questions.md"]
  },
  "managerial": {
    summary: "Managerial questions in this repo are not fluff. They are delivery, judgement, and fit checks wrapped in conversational form.",
    bullets: [
      "Your 90-second project story should end in a decision and tradeoff.",
      "Keep 'why leaving' forward-looking and non-negative.",
      "Agile answers should mention real ceremonies and your role in them."
    ],
    articleSections: [
      {
        heading: "How to actually answer managerial questions",
        body: [
          "Every strong answer in this section has the same underlying shape: a specific situation, a decision you made, and the tradeoff or consequence of that decision. Generic answers ('I'm a hard worker', 'we use Agile') give the interviewer nothing to follow up on except more generic questions — specific answers invite specific follow-ups, which is exactly where a well-prepared candidate pulls ahead.",
          "'Why are you leaving' and 'why us' are risk questions, not curiosity questions — the interviewer is checking whether you'll say something that reflects badly on a future employer if repeated back to them. The safe, honest framing is always forward ('I want more ownership over X', 'I want to work with Y at scale') rather than backward ('my current manager doesn't...') — the content itself should be true, just framed toward what you're moving to.",
          "'I haven't used that' is a legitimate, often *better* answer than bluffing — several of the wiki's sourced anecdotes describe candidates who admitted a gap and had the round continue normally, versus candidates who tried to fake depth and had the round unravel on the very next follow-up. The failure mode isn't having gaps, it's pretending not to."
        ]
      },
      {
        heading: "Why this section is decisive",
        body: [
          "The market-loop doc points out that managerial rounds are real gates at companies like TCS, not ceremonial wrap-ups. The question bank shows project narrative, notice period, relocation, and agile working coming up repeatedly.",
          "The wiki treats this as operational communication: can you describe what you built, why you chose it, and how you work with others."
        ]
      },
      {
        heading: "How to prepare with the wiki",
        body: [
          "Use the [LEARN] questions in the repo to stress-test your project story, disagreement example, production bug story, and sprint participation.",
          "Rehearse both a 90-second and a 10-minute version, exactly as the study plan recommends."
        ]
      }
    ],
    sources: ["wiki/01-market-and-loop.md", "wiki/07-study-plan.md", "questions/questions.md"]
  }
};

export const KNOWLEDGE_GUIDES = [
  {
    id: "market-loop",
    section: "Strategy",
    title: "Market & interview loop",
    badge: "Wiki 01",
    summary: "A practical map of how TCS, Infosys, Accenture, Cognizant, Capgemini, LTIMindtree, Deloitte, IBM, Wipro, and UST tend to run React hiring loops.",
    bullets: [
      "Most companies compress the technical signal into a single 45–60 minute round.",
      "The adjacent gate changes by company: Infosys leans HTML/CSS/HTTP, Accenture leans JS internals plus Git, TCS leans scenario plus managerial fit.",
      "Do not treat every rejection as a study problem; compensation band, notice period, and ghosting also shape outcomes."
    ],
    playbook: [
      {
        heading: "What to optimise for",
        body: [
          "Breadth of instantly-available answers matters more than going very deep in one narrow topic, because one short screen has to cover JavaScript, React, HTML/CSS, a coding task, and your project.",
          "That also means one blank answer can cost a large chunk of the signal."
        ]
      },
      {
        heading: "How to use this in prep",
        body: [
          "Before an interview, check the company-specific gate and revise that company block from the question bank instead of doing generic revision.",
          "Use this guide as targeting logic: what you revise the night before should depend on who is interviewing you."
        ]
      }
    ],
    checklist: [
      "Know the adjacent gate for each target company.",
      "Plan per-company revision instead of one generic prep stack.",
      "Separate skill gaps from hiring-friction realities."
    ],
    relatedTopics: ["scenario", "managerial", "web-basics", "git"],
    sources: ["wiki/01-market-and-loop.md", "wiki/04-question-bank.md"]
  },
  {
    id: "skill-gap",
    section: "Strategy",
    title: "JD vs interview reality",
    badge: "Wiki 03",
    summary: "The repo's central message: the interview is a JavaScript-fundamentals exam wearing a React costume.",
    bullets: [
      "JS internals are underrepresented in JDs and overrepresented in interviews.",
      "TypeScript and testing help more with shortlisting than with live technical rounds.",
      "Cloud, CI/CD, GraphQL, and heavier architecture topics are low ROI for this company set at the 3+ year band."
    ],
    playbook: [
      {
        heading: "The four gaps that matter",
        body: [
          "Gap 1 is JavaScript internals: barely named in JDs, dominant in interviews. Gap 2 is TypeScript: JD-heavy, interview-light. Gap 3 is testing with a similar but weaker pattern. Gap 4 is cloud and CI/CD, which show up in senior JDs but almost never in these frontend rounds.",
          "That inversion is what should drive your study allocation."
        ]
      },
      {
        heading: "How to use the master table",
        body: [
          "Use the classification document as a filter. It is valuable because it tells you what not to study right now.",
          "If a topic is below the line here, it should not displace your output drills, re-render model, or async UI practice."
        ]
      }
    ],
    checklist: [
      "Prioritise JS internals and React render reasoning.",
      "Treat TypeScript as a resume-first investment.",
      "Do not let low-ROI topics crowd out must-know drills."
    ],
    relatedTopics: ["js-scope", "js-closures", "react-perf", "react-state"],
    sources: ["wiki/03-skill-classification.md", "wiki/02-knowledge-graph.md"]
  },
  {
    id: "study-plan",
    section: "Execution",
    title: "4-week study plan",
    badge: "Wiki 07",
    summary: "A staged prep sequence that unlocks the next layer instead of spreading effort thinly across too many topics.",
    bullets: [
      "Week 1 is JS fundamentals and polyfills.",
      "Week 2 is re-render control, Redux/RTK, and the canonical async component.",
      "Week 3 is timed machine coding and scenario practice.",
      "Week 4 is CV, channel optimisation, TypeScript basics, and mocks."
    ],
    playbook: [
      {
        heading: "Highest-ROI order",
        body: [
          "Start with JS output drills, then learn the re-render model, then build one canonical async component from scratch, then lock Redux flow and optimisation rules, then rehearse your project story.",
          "The order matters because each layer makes the next one easier to reason about."
        ]
      },
      {
        heading: "Minimum competitive profile",
        body: [
          "To pass the round, the wiki wants fast output reasoning, render diagnosis, one live async build, Redux flow recall, three-screen scenario design, HTML/CSS instant recall, Git incidents, and a project story with tradeoffs.",
          "To get calls, it also wants React, TypeScript, Redux Toolkit, REST, and honest channel optimisation on Naukri and LinkedIn."
        ]
      }
    ],
    checklist: [
      "Do not reorder the prep stack.",
      "Practice the canonical async component until you can rebuild it from memory.",
      "Keep applying while studying instead of waiting to feel finished."
    ],
    relatedTopics: ["js-async", "react-perf", "react-routing", "machine-coding", "managerial"],
    sources: ["wiki/07-study-plan.md"]
  },
  {
    id: "question-bank",
    section: "Execution",
    title: "Question bank by company",
    badge: "Wiki 04",
    summary: "A company-indexed revision guide built from candidate-reported questions rather than SEO interview lists.",
    bullets: [
      "Use the company blocks the day before interviews.",
      "Use the topic blocks to see the convergent core across companies.",
      "Answer in tradeoffs: option A versus option B, and the condition that decides."
    ],
    playbook: [
      {
        heading: "Why this bank is useful",
        body: [
          "It groups questions by company first, which makes last-mile revision much more practical than generic interview dumps.",
          "It also makes the convergence visible: hooks, Redux, closures, performance, async reasoning, and one small coding task show up again and again."
        ]
      },
      {
        heading: "How to use it with the app",
        body: [
          "The app's interview mode, flashcards, and code practice all come from the same core material. Use this guide when you want company targeting instead of topic targeting.",
          "After real interviews, the wiki recommends adding the exact questions you were asked so the bank becomes more personalised over time."
        ]
      }
    ],
    checklist: [
      "Revise the company block before each interview.",
      "Keep the convergent core warm across all companies.",
      "Update the bank after real rounds."
    ],
    relatedTopics: ["react-hooks", "react-state", "js-scope", "js-async", "managerial"],
    sources: ["wiki/04-question-bank.md", "questions/questions.md"]
  },
  {
    id: "coding-rounds",
    section: "Execution",
    title: "Machine coding playbook",
    badge: "Wiki 05",
    summary: "The repo's standard problem set plus the round strategy that turns a half-finished widget into a passable interview performance.",
    bullets: [
      "The MVP matters more than polish.",
      "Narration is part of the evaluation.",
      "The standard set includes modal, tabs, dropdown, pagination, autocomplete, data table, file explorer, and more."
    ],
    playbook: [
      {
        heading: "How to run the round",
        body: [
          "Restate the MVP aloud before touching the keyboard. Build the behaviour first. If time runs out, narrate the next improvements instead of silently scrambling.",
          "The wiki treats this as a delivery check, not a design contest."
        ]
      },
      {
        heading: "The one build with outsized value",
        body: [
          "Debounced search with cancellation keeps coming back because it touches async data, input handling, rendering states, and production realism in one exercise.",
          "If you only master one build deeply, make it that one."
        ]
      }
    ],
    checklist: [
      "Rehearse your MVP explanation before coding.",
      "Build one canonical async component from memory.",
      "Practice timed 45-minute sessions."
    ],
    relatedTopics: ["machine-coding", "react-routing", "js-utils", "js-async"],
    sources: ["wiki/05-coding-tasks.md", "wiki/07-study-plan.md"]
  },
  {
    id: "failure-modes",
    section: "Execution",
    title: "Why candidates fail",
    badge: "Wiki 06",
    summary: "A post-mortem lens for deciding whether a miss was about breadth, depth, narrative, or non-skill constraints.",
    bullets: [
      "The common technical failure is collapsing on the first follow-up.",
      "Resume-to-interview mismatch can sink otherwise capable candidates.",
      "Some failures are not skill failures at all."
    ],
    playbook: [
      {
        heading: "The core distinction",
        body: [
          "The repo separates breadth gaps from depth gaps. A breadth gap is one blank answer. A depth gap is giving an initial answer and then collapsing when the interviewer probes.",
          "That distinction matters because it tells you whether to widen revision or deepen explanation."
        ]
      },
      {
        heading: "How to respond after a miss",
        body: [
          "Use the post-rejection triage checklist, then update the question bank with what you were actually asked.",
          "This keeps the study loop grounded in evidence instead of emotion."
        ]
      }
    ],
    checklist: [
      "Identify whether the miss was breadth or depth.",
      "Check if the issue was resume mismatch or hiring friction.",
      "Update the repo with what the round actually asked."
    ],
    relatedTopics: ["managerial", "scenario", "js-scope", "react-perf"],
    sources: ["wiki/06-failure-modes.md", "wiki/11-checklists.md"]
  },
  {
    id: "cv-anatomy",
    section: "Career",
    title: "CV anatomy",
    badge: "Wiki 08",
    summary: "A parser-aware CV guide focused on section order, bullet quality, bait questions, and avoiding ATS-hostile layouts.",
    bullets: [
      "Single-column, text-first formatting is non-negotiable.",
      "The summary should surface years, React, TypeScript, Redux, and domain quickly.",
      "Experience bullets should create good follow-up questions you are prepared to answer."
    ],
    playbook: [
      {
        heading: "What the CV has to do",
        body: [
          "The wiki treats the CV as a four-gate document: parser, recruiter skim, hiring manager scan, and interview defence. A resume can fail at any of those layers.",
          "That is why formatting, keyword coverage, and bullet honesty matter as much as content quality."
        ]
      },
      {
        heading: "Best bullet standard",
        body: [
          "Each bullet should sound like verb plus decision plus concrete outcome. The checklists also recommend deliberately including a few bullets that bait questions you are ready to answer, like re-render fixes or API cancellation.",
          "If you cannot defend a line for ten minutes, it should not be on the page."
        ]
      }
    ],
    checklist: [
      "Keep it single-column and ATS-friendly.",
      "Lead with role, years, and stack.",
      "Use bullets you can defend deeply."
    ],
    relatedTopics: ["managerial", "react-perf", "react-routing"],
    sources: ["wiki/08-cv-anatomy.md", "wiki/11-checklists.md"]
  },
  {
    id: "cv-templates",
    section: "Career",
    title: "Templates & reuse ethics",
    badge: "Wiki 09",
    summary: "A practical survey of public resume templates plus a clear line on what reuse is fine and what becomes dishonest.",
    bullets: [
      "Reuse structure and styling, not other people's achievements.",
      "Template quality converges on clean typography, conventional section order, and text readability.",
      "The hard part is still your own bullet rewriting."
    ],
    playbook: [
      {
        heading: "What reusable templates help with",
        body: [
          "The public-CV survey gives you proven structure and formatting shortcuts so you do not waste energy reinventing layout.",
          "It does not solve the harder problem of honest, concrete, interview-defensible content."
        ]
      },
      {
        heading: "Ethics line",
        body: [
          "Borrowing design and section order is fine. Reusing achievements, metrics, or experience you did not personally have is not.",
          "This guide exists to keep the distinction explicit."
        ]
      }
    ],
    checklist: [
      "Reuse layout, not claims.",
      "Prefer templates with plain text readability.",
      "Rewrite every bullet into your own evidence."
    ],
    relatedTopics: ["managerial"],
    sources: ["wiki/09-cv-templates-and-ethics.md"]
  },
  {
    id: "naukri-linkedin",
    section: "Career",
    title: "Naukri & LinkedIn playbook",
    badge: "Wiki 10",
    summary: "A channel-optimisation guide for getting more calls through profile completeness, keywording, role naming, and referral discipline.",
    bullets: [
      "Fill the fields recruiters actually filter on: CTC, notice period, location, and status.",
      "Use headline and skill synonyms intentionally.",
      "Profile hygiene influences interview volume more than most extra study does."
    ],
    playbook: [
      {
        heading: "Why this belongs in the app",
        body: [
          "The README and study plan both point out that getting interviews is often the real bottleneck. This guide is how the repo addresses that problem directly.",
          "The point is not just writing a better resume, but also making the candidate discoverable through the channels recruiters actually search."
        ]
      },
      {
        heading: "What to keep current",
        body: [
          "Keep Naukri and LinkedIn aligned on role naming, stack keywords, city, and job-seeking status. Touch the profile regularly during active search.",
          "The guide also stresses designation ladders so your profile speaks the market's language."
        ]
      }
    ],
    checklist: [
      "Complete the recruiter-filtered fields.",
      "Align headline and keyword synonyms across platforms.",
      "Maintain an active-search rhythm and referral list."
    ],
    relatedTopics: ["managerial"],
    sources: ["wiki/10-naukri-linkedin-playbook.md", "wiki/11-checklists.md"]
  },
  {
    id: "checklists",
    section: "Career",
    title: "Ready-to-use checklists",
    badge: "Wiki 11",
    summary: "A compact operating system for CV quality, profile hygiene, interview readiness, in-round behaviour, and post-rejection triage.",
    bullets: [
      "Use the interview-readiness checklist as a gap audit, not as a motivational poster.",
      "The day-before list is company-specific and actionable.",
      "The in-round rules are about reducing self-inflicted damage."
    ],
    playbook: [
      {
        heading: "How to use the checklist layer",
        body: [
          "This guide turns the larger wiki into decision-ready lists. It is useful when you need a final audit more than another explanation.",
          "Use it before applications, before interviews, and after rejections."
        ]
      },
      {
        heading: "Highest-value reminders",
        body: [
          "Answer exactly what was asked, frame tradeoffs clearly, say 'I haven't used that' cleanly instead of bluffing, and build behaviour before polish in machine coding.",
          "Those rules recur because they address the most common self-inflicted losses in interviews."
        ]
      }
    ],
    checklist: [
      "Run the readiness checklist before scheduling interviews.",
      "Use the day-before company checklist every time.",
      "Do the post-rejection triage while the round is still fresh."
    ],
    relatedTopics: ["managerial", "machine-coding", "git", "scenario"],
    sources: ["wiki/11-checklists.md", "wiki/04-question-bank.md"]
  },
  {
    id: "sources-confidence",
    section: "Reference",
    title: "Sources & confidence",
    badge: "Wiki 12",
    summary: "A reliability layer explaining what in this repo is strongly supported, what is moderate, and what should be treated cautiously.",
    bullets: [
      "Reported interview questions are relatively strong when many sources converge.",
      "Timelines and process details are more variable.",
      "Percentages and ATS claims should be treated carefully unless the source is named clearly."
    ],
    playbook: [
      {
        heading: "Why this guide matters",
        body: [
          "The wiki is evidence-based, but not every claim in a research repo has the same strength. This guide makes that explicit so the prep strategy does not overfit weak signals.",
          "It is especially useful when deciding how literally to treat market percentages or vendor-style ATS claims."
        ]
      },
      {
        heading: "How to apply it",
        body: [
          "Use strong signals to drive study order and weak signals only as rough market context.",
          "In practice, what gets asked in interviews is the strongest part of the repo, while exact market-frequency claims are much softer."
        ]
      }
    ],
    checklist: [
      "Use question convergence as the strongest planning input.",
      "Treat market percentages and vendor claims cautiously.",
      "Return to primary sources when a claim changes your strategy."
    ],
    relatedTopics: ["managerial"],
    sources: ["wiki/12-sources.md", "wiki/README.md"]
  }
];

export const REWARDS = [
  { id: "r1", category: "food", name: "Snickers bar", cost: 150, icon: "candybar" },
  { id: "r2", category: "food", name: "Loaded fries", cost: 350, icon: "fries" },
  { id: "r3", category: "food", name: "Bubble tea", cost: 250, icon: "bubbletea" },
  { id: "r4", category: "food", name: "Pizza night", cost: 600, icon: "pizza" },
  { id: "r5", category: "food", name: "Fancy dinner out", cost: 1200, icon: "dinner" },
  { id: "r6", category: "travel", name: "Coffee-shop day pass (new place, work from there)", cost: 400, icon: "coffee" },
  { id: "r7", category: "travel", name: "Day-trip fund", cost: 1500, icon: "roadtrip" },
  { id: "r8", category: "travel", name: "Weekend getaway fund", cost: 4000, icon: "tent" },
  { id: "r9", category: "travel", name: "Flight miles jar top-up", cost: 2500, icon: "plane" },
  { id: "r10", category: "travel", name: "Dream trip fund contribution", cost: 8000, icon: "globe" }
];
