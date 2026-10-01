# Questions — Interview, Programming, and Learning

Three kinds of question in this file, marked throughout:

- **[ASKED]** — reported by a real candidate at a named company (see `12-sources.md`)
- **[CODE]** — a programming problem to actually write and run
- **[LEARN]** — a question whose job is to *build* the concept, not test it. Answer these aloud, in order. They are deliberately Socratic: each one should be answerable only if you got the previous one right.

**How to use:** never answer a [LEARN] question in your head. Say it aloud or write it. The failure mode in `06-failure-modes.md` is knowledge that collapses on the first follow-up — the only cure is rehearsing the follow-up.

**Answer shape that scores:** *option A vs option B, and here is the condition that decides it.*

---
---

# PART 1 — JavaScript Internals

## 1.1 Scope, hoisting, TDZ

**[ASKED]**
- Difference between `var`, `let` and `const` — explain with a scoping example *(Accenture, Capgemini)*
- What is hoisting and how does it work? *(Accenture, Capgemini)*
- What is the Temporal Dead Zone? *(Accenture)*
- Explain the JavaScript creation phase *(Accenture)*

**[CODE] Predict the output**

```js
// Q1
console.log(number);
var number = 5;

// Q2
console.log(letter);
let letter = "a";

// Q3
foo();
bar();
function foo() { console.log("foo"); }
var bar = function () { console.log("bar"); };

// Q4
var x = 1;
function f() {
  console.log(x);
  var x = 2;
}
f();

// Q5
let a = 1;
{
  console.log(a);
  let a = 2;
}
```

**[LEARN]**
1. What exactly moves during hoisting — the declaration, the assignment, or both?
2. If `let` is also hoisted, why does accessing it throw instead of giving `undefined`?
3. What is the difference between "not declared" and "declared but uninitialised"? Which error does each produce?
4. Does `const` make the *variable* immutable or the *value*? Write one line proving your answer.
5. Why does `var` inside a block leak out, but `let` doesn't? What is the unit of scope for each?

---

## 1.2 Closures

**[ASKED]**
- What is a closure? *(Accenture, Cognizant, Capgemini)*
- Write a closure example and call it *(Capgemini, Infosys)*
- What is a practical use case for closures? *(Capgemini — the follow-up that decides the answer)*
- What is lexical scoping? *(Cognizant)*

**[CODE]**

```js
// Q6 — classic. Output?
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// Then: change var to let. Output now? Why?

// Q7 — write it
// A counter factory: makeCounter() returns { inc, dec, value }
// where the count is genuinely private (unreachable from outside).

// Q8 — write it
// once(fn): returns a function that runs fn at most one time,
// and returns the first result on every later call.

// Q9 — output?
function outer() {
  let count = 0;
  return function inner() { return ++count; };
}
const a = outer();
const b = outer();
console.log(a(), a(), b());
```

**[LEARN]**
1. A closure keeps something alive after its function returns. What exactly — the value, or the variable binding?
2. In Q6 with `var`, why is it `3` and not `2`? What is `i` at the moment the callback finally runs?
3. `let` fixes Q6. What does the engine create per iteration that `var` doesn't?
4. Closures cause memory to be retained. Name one situation where that is a leak rather than a feature.
5. How is a closure related to a module pattern? To a React custom hook?

---

## 1.3 `this`, prototypes, objects

**[ASKED]**
- What is prototypal inheritance? *(Cognizant)*
- How can objects be copied — shallow vs deep? *(Cognizant, Capgemini)*
- Explain the `this` keyword *(recurring across reports)*

**[CODE]**

```js
// Q10 — output?
const obj = {
  name: "obj",
  regular() { return function () { return this?.name; }; },
  arrow()   { return () => this.name; }
};
console.log(obj.regular()());
console.log(obj.arrow()());

// Q11 — output?
const o = { a: 1, b: { c: 2 } };
const copy = { ...o };
copy.b.c = 99;
console.log(o.b.c);

// Q12 — output?
function A() {}
A.prototype.x = 1;
const inst = new A();
inst.x = 2;
delete inst.x;
console.log(inst.x);

// Q13 — write it
// deepClone(value): handles nested objects, arrays, Date, and cycles.
// Then: what does structuredClone() do that JSON.parse(JSON.stringify(x)) doesn't?
```

**[LEARN]**
1. What decides the value of `this` — where a function is *defined*, or where it is *called*? Does the answer change for arrow functions?
2. Why does spread produce a shallow copy? At what depth does sharing begin?
3. What does `new` actually do, in four steps?
4. If `inst.x` is deleted and the value comes back, where was it living the whole time?
5. Name two things `JSON.parse(JSON.stringify(x))` silently destroys.

---

## 1.4 Coercion and equality

**[ASKED]**
- `==` vs `===` and coercion pitfalls *(Accenture)*

**[CODE] Predict, then explain the rule**

```js
// Q14
console.log([] == false);
console.log([] === false);
console.log(null == undefined);
console.log(null === undefined);
console.log(NaN === NaN);
console.log(typeof null);
console.log(typeof NaN);
console.log(0.1 + 0.2 === 0.3);
console.log([1,2,3] + [4,5]);
console.log(0 || "fallback");
console.log(0 ?? "fallback");
```

**[LEARN]**
1. What does `==` do that `===` doesn't? Describe it as an algorithm, not a vibe.
2. Which values are falsy? List all of them — there are few.
3. `0 || x` and `0 ?? x` differ. State the single rule that explains the difference.
4. Why is `0.1 + 0.2 !== 0.3`? What would you compare instead?
5. When, if ever, is `==` the correct choice?

---

## 1.5 Async: event loop, promises

**[ASKED]**
- Explain the event loop — microtasks vs macrotasks, execution order *(Accenture)*
- Callback hell → Promises → async/await: the evolution *(Accenture)*
- What is a Promise and how does it handle async code? *(Accenture)*
- Difference between Promises and async/await *(Accenture)*
- `Promise.all()` vs `Promise.race()` *(Capgemini)*
- Write Promise syntax *(Infosys)*
- Sync vs async execution *(Accenture)*

**[CODE]**

```js
// Q15 — output order?
console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));
console.log(4);

// Q16 — output order?
async function f() {
  console.log("A");
  await null;
  console.log("B");
}
f();
console.log("C");

// Q17 — output order?
setTimeout(() => console.log("t1"), 0);
Promise.resolve().then(() => {
  console.log("p1");
  setTimeout(() => console.log("t2"), 0);
});
queueMicrotask(() => console.log("m1"));

// Q18 — write it
// promiseAll(promises): reimplement Promise.all.
// Must preserve input order, reject on first rejection, handle an empty array.

// Q19 — write it
// retry(fn, times, delayMs): retries a failing async fn with a delay,
// rejecting with the last error if all attempts fail.

// Q20
// Given Promise.all, Promise.allSettled, Promise.race, Promise.any —
// pick the right one for each: (a) load 3 dashboard widgets, none critical;
// (b) fetch from 3 mirrors, take whichever answers first successfully;
// (c) block a page until all required data loads; (d) add a timeout to a fetch.
```

**[LEARN]**
1. The call stack is empty. What runs next — a `setTimeout` callback or a `.then` callback? Why?
2. How many microtasks run between two macrotasks?
3. `await` "pauses" a function. What actually happens to the rest of the function body?
4. `Promise.all` rejects on the first rejection. What happens to the other promises — are they cancelled?
5. Is `async/await` a different concurrency model from promises, or different syntax over the same one? Defend it.

---

## 1.6 Array/function utilities and polyfills

**[ASKED]**
- What is throttling? *(Capgemini — answer with a real scenario, not a definition)*
- How do you debounce an application? *(Infosys)*
- Debounce vs throttle — when each? *(recurring)*
- Difference between spread and rest *(TCS)*
- Explain destructuring *(Accenture, Infosys)*

**[CODE] Write from memory — no lookups**

```js
// Q21  debounce(fn, delay)                 — with a cancel() method
// Q22  throttle(fn, limit)                 — leading edge; then trailing edge
// Q23  flatten(arr)                        — any depth, without Array.prototype.flat
// Q24  Array.prototype.myMap               — as a prototype method
// Q25  curry(fn)                           — sum(1)(2)(3) and sum(1,2)(3) both work
// Q26  memoize(fn)                         — cache keyed on arguments
// Q27  groupBy(arr, keyFn)
// Q28  deepEqual(a, b)
```

**[CODE] Reported as actual tasks**

```js
// Q29  Merge two arrays using the spread operator            [Infosys]
// Q30  Remove duplicates from an array                       [Infosys]
// Q31  Flatten a nested array; then again without flat()     [Capgemini]
// Q32  Reverse a string three different ways                 [Deloitte]
// Q33  Check whether a string is a palindrome                [Accenture]
// Q34  Longest substring without repeating characters        [Accenture]
// Q35  Find the maximum value in an array                    [Capgemini]
// Q36  Title-case "i am developer" -> "I Am Developer"       [Capgemini]
// Q37  Check whether a number is prime                       [Capgemini]
// Q38  ['1','2','3'].map(parseInt) — what is the output, and why?
```

**[LEARN]**
1. Debounce and throttle both limit calls. State the one-sentence difference in *when* the function runs.
2. For each, name the event you'd attach it to: search input, window resize, scroll-to-load, autosave.
3. Your debounce returns a new function. What must it close over to work?
4. Why does `map(parseInt)` break? What does `map` pass to its callback?
5. Memoisation trades memory for time. When is that trade a loss? *(This is the Capgemini follow-up.)*

---
---

# PART 2 — React

## 2.1 Core model

**[ASKED]**
- Difference between state and props *(TCS)*
- Class vs functional components; why functional is preferred *(Accenture, Cognizant)*
- What is the virtual DOM, and what is reconciliation? *(Accenture, Capgemini)*
- Why are keys important in lists? *(Accenture)*
- What is a Higher-Order Component, and its advantages? *(Infosys, Cognizant, TCS)*
- How do you pass data from child to parent? *(TCS)*
- What is prop drilling and how do you avoid it? *(Accenture, Cognizant, Capgemini)*
- What are React Portals? *(Capgemini)*
- Controlled vs uncontrolled components *(Accenture, UST)*
- What is a pure component? *(Cognizant)*
- Name all lifecycle methods and when they're used *(TCS)*

**[CODE]**

```jsx
// Q39 — what renders, and what breaks on reorder?
{items.map((item, i) => <Row key={i} {...item} />)}
// Change to key={item.id}. Describe a concrete bug the index key causes.

// Q40 — write it
// withAuth(Component): an HOC that renders <Login /> when there is no token,
// and passes all props through otherwise.

// Q41 — write it
// A <Modal> rendered through a portal into document.body,
// closing on Escape and on backdrop click, restoring focus on close.

// Q42 — convert
// Turn an uncontrolled <input defaultValue> form into a controlled one,
// then say which you'd choose for a 40-field form and why.
```

**[LEARN]**
1. React "re-renders" on state change. Does that mean it touches the DOM? Where does the virtual DOM sit in that sentence?
2. Reconciliation compares two trees. What does React assume when the `key` changes? What does it assume when the element *type* changes?
3. With `key={index}`, you delete the first item in a list of inputs. What appears in the remaining inputs, and why?
4. An HOC, a render prop, and a custom hook all share logic. What can a custom hook not do that an HOC can?
5. A portal renders outside the DOM hierarchy. Does an event fired inside it still bubble to the React parent? Why is that surprising?

---

## 2.2 Hooks

**[ASKED]**
- Explain `useEffect` in terms of lifecycle methods *(Infosys)*
- What is the dependency array and how does it affect rendering? *(Capgemini)*
- Difference between `useState` and `useEffect` *(TCS)*
- Why are `fetch` calls placed inside `useEffect`? *(Accenture)*
- What is `useReducer`? *(Accenture)*
- What are refs in React? *(Accenture)*
- Name hooks other than `useState` and `useEffect` *(Cognizant)*
- How do you write a custom hook? *(UST)*
- `useState` vs `useRef` — what triggers a re-render? *(Accenture)*

**[CODE]**

```jsx
// Q43 — bug hunt. Why does count always log 0?
useEffect(() => {
  const id = setInterval(() => console.log(count), 1000);
  return () => clearInterval(id);
}, []);
// Give two different correct fixes and say which you'd ship.

// Q44 — output?
const [count, setCount] = useState(0);
function handle() {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
}
// Now with setCount(c => c + 1) three times. Output?

// Q45 — write it
// useDebounce(value, delay) and useFetch(url) with { data, loading, error },
// cancelling in-flight requests on unmount and on url change.

// Q46 — bug hunt
useEffect(() => {
  setData(transform(items));
}, [items, setData, transform]);
// transform is defined inline in the parent. What happens? Fix it.

// Q47
// Rewrite a form with 6 useState calls as a single useReducer.
// When is that the better choice?
```

**[LEARN]**
1. `useEffect` with `[]`, with `[x]`, and with no array — describe when each runs, and when its cleanup runs.
2. Cleanup runs "before the next effect". Before, or after, the DOM updates?
3. Why is `useState` asynchronous-looking? Is it actually async?
4. In Q44, why does the first version increment by one? What value is `count` closed over during that handler?
5. `useRef` holds a mutable value without re-rendering. Name two legitimate uses that have nothing to do with DOM nodes.
6. What are the Rules of Hooks, and what would break if you called a hook conditionally?

---

## 2.3 Re-renders and performance — the 3+ years discriminator

**[ASKED]**
- Performance optimisation techniques in React *(Accenture, Infosys, UST)*
- `useMemo` vs `useCallback` *(Capgemini)*
- "What exactly is caching?" → "Is caching always beneficial?" *(Capgemini, follow-up chain)*
- How would you reduce a five-second homepage load? *(Accenture)*
- How do you avoid unnecessary re-renders? *(Accenture)*
- Explain lazy loading and code splitting *(Infosys)*
- This component re-renders even though its props haven't changed — walk me through why *(hiring-manager report)*

**[CODE]**

```jsx
// Q48 — why does <Child /> re-render on every parent render?
function Parent() {
  const [n, setN] = useState(0);
  return <Child style={{ margin: 8 }} onClick={() => setN(n + 1)} />;
}
const Child = React.memo(function Child({ style, onClick }) { /* ... */ });
// Fix it three ways. Rank the fixes.

// Q49 — is this useMemo worth it? Justify either answer.
const total = useMemo(() => items.length, [items]);

// Q50 — write it
// A 5,000-row table that stays responsive while typing in a filter box.
// State your approach before coding: memoisation, virtualisation, debounce,
// or moving the filter state down. Defend the ordering.

// Q51 — route-level code splitting with React.lazy + Suspense,
// including a loading fallback and an error boundary.

// Q52 — profiling drill
// Open React DevTools Profiler on any app you have.
// Find the component with the highest render count on one interaction.
// Explain the cause in one sentence before changing any code.
```

**[LEARN]**
1. Name every cause of a component re-rendering. There are fewer than you think.
2. Two objects with identical contents. Why does `React.memo` still re-render?
3. `useMemo` caches a value; `useCallback` caches a function. What do they *both* actually depend on to work?
4. What does memoisation cost? Name three costs. *(Memory, maintenance, and low benefit on fast-changing data — this is the Capgemini answer that scored.)*
5. A component re-renders 47 times a second. What is the *first* thing you measure, before touching code?
6. Code splitting reduces initial bundle size. What does it cost the user, and when is that cost worse than the benefit?

---

## 2.4 State management

**[ASKED]**
- What is the flow of Redux? *(TCS)*
- Why is Redux needed? *(Cognizant)*
- Redux vs Context API — when do you use which? *(Accenture)*
- How would you optimise a Redux application? *(Infosys)*
- Explain the Context API — creation, provider, consumer *(Capgemini)*
- How is the store connected to routes? *(Cognizant)*
- Write the `createStore` syntax *(LTIMindtree)*
- How do sibling components share data without Redux? *(Infosys)*

**[CODE]**

```jsx
// Q53 — write a full RTK slice: state, reducers, one createAsyncThunk,
// plus the selector and the component wiring.

// Q54 — this re-renders on every unrelated store change. Fix it.
const state = useSelector(s => s.users);
// Then: what does createSelector add that a narrowed selector doesn't?

// Q55 — normalise this
// posts: [{ id, title, author: { id, name }, comments: [ {...} ] }]
// Show the normalised shape and say which read/write got cheaper.

// Q56 — decide, with reasons
// (a) theme toggle  (b) auth session  (c) a 6-step wizard's form data
// (d) server data used on 4 screens  (e) whether a dropdown is open
// For each: local state, lifted state, Context, Redux, or a server-cache library?
```

**[LEARN]**
1. Trace one Redux update end to end, naming every stage: click → … → re-render.
2. Context is not a state manager. What does it actually solve, and what does it *not* solve?
3. Why does putting frequently-changing values in Context cause performance problems?
4. Name five distinct Redux optimisation levers. *(If you can't reach five, re-read `02` node 4.)*
5. Server state and client state behave differently. Name three ways — and say what that implies about using Redux for API data.

---

## 2.5 Routing, forms, APIs

**[ASKED]**
- How do you implement routing in React? *(Accenture)*
- React Router absolute vs relative paths *(Accenture)*
- How do you access query params or navigation state? *(Accenture — `useLocation`)*
- Smart form-handling strategies *(Accenture)*
- Explain API methods / HTTP verbs *(Infosys)*
- Write code to handle an API request from an endpoint *(Infosys)*
- Error handling and retry logic for APIs *(Accenture)*
- How do you cancel an API call? *(Capgemini — `AbortController`)*
- How would you implement infinite scroll / load more? *(Infosys)*

**[CODE]**

```jsx
// Q57 — THE ONE TO BUILD (covers 5 of the 8 Must-Know nodes)
// Search box -> debounce -> fetch -> cancel stale request -> render
// loading / error / empty -> paginate.
// No libraries. Then explain each decision aloud.

// Q58 — protected routes: redirect unauthenticated users to /login,
// preserve the intended destination, and allow one public route.

// Q59 — parallel data. Three panels, three endpoints, one screen.
// Load them in parallel, render each as it arrives, and handle one failing
// without blanking the page.

// Q60 — a 4-step wizard with per-step validation, back/next,
// and no data loss when navigating backwards.
```

**[LEARN]**
1. Why does an un-cancelled request cause bugs when the user types fast? Describe the exact interleaving.
2. `AbortController` cancels the request. Does it cancel the promise? What does the `.catch` see?
3. PUT vs PATCH: what does each promise about the resource? Which is idempotent?
4. Where should retry logic live — in the component, in a hook, or in the fetch wrapper? Defend it.
5. Controlled inputs re-render on every keystroke. At what form size does that matter, and what do you do then?

---
---

# PART 3 — HTML, CSS, Git

## 3.1 HTML & CSS

**[ASKED]**
- Explain semantic elements *(Infosys)*
- Name five recently introduced HTML elements *(Infosys)*
- What are void elements? *(Infosys)*
- Create a `datalist` *(Infosys)*
- What are the key features of CSS? *(Infosys)*
- Semantic HTML tags and CSS pseudo-elements *(Cognizant)*
- Difference between `display` and `visibility` *(TCS)*

**[CODE]**

```
// Q61  Three-column layout, stacking on mobile — once with Flexbox, once with Grid.
// Q62  Centre a box both axes — three ways; say which you'd ship and why.
// Q63  A <datalist>-backed autocomplete input, wired to React state.
// Q64  Custom checkbox styled with ::before/::after, keyboard accessible.
// Q65  Sticky header that shrinks on scroll, CSS-only where possible.
```

**[LEARN]**
1. `display: none`, `visibility: hidden`, `opacity: 0` — which reserve space, which are focusable, which fire events?
2. Pseudo-class vs pseudo-element: what is the difference in one sentence, and how many colons does each take?
3. Why does semantic markup matter to something other than a human reader? Name two consumers.
4. Explain specificity as a number. Which wins: an ID, ten classes, or an inline style?
5. Flexbox is one-dimensional, Grid two-dimensional. Give one layout each does badly.

---

## 3.2 Git

**[ASKED]** *(Accenture devoted a whole section to this)*
- How do you revert a commit that has already been pushed?
- How do you switch branches without losing uncommitted changes?
- How do you handle merge conflicts efficiently?
- What is Git and how does it help in development? *(UST L1)*

**[CODE] Do these in a scratch repo, don't just read them**

```
// Q66  Push a bad commit, then undo it two ways: git revert and git reset --hard
//      + force-push. State which is safe on a shared branch and why.
// Q67  Start editing, get pulled onto an urgent fix. Move your work
//      to another branch with stash. Then do the same with a WIP commit.
// Q68  Create a real conflict in two branches and resolve it by hand.
// Q69  Squash three messy commits into one before raising a PR.
// Q70  Recover a commit you "lost" after a bad reset (reflog).
```

**[LEARN]**
1. `revert` and `reset` both undo. What does each do to history, and which is safe on `main`?
2. What is actually stored in a stash, and what happens to untracked files?
3. Merge vs rebase: what changes about the resulting history? Which does your team use, and why?
4. A conflict marker has three sections. Which is yours, which is theirs, and what is the middle one in a diff3 conflict?
5. What does `git fetch` do that `git pull` doesn't?

---
---

# PART 4 — Machine Coding Prompts

Run each timed at 45 minutes. Restate the MVP aloud before writing code (see `05-coding-tasks.md`).

**[ASKED] — real tasks at these companies**
1. Increment/decrement counter *(Accenture)*
2. Drag-and-drop functionality *(TCS)*
3. Fetch from an API and display conditionally *(Accenture)*
4. Pagination *(Accenture)*
5. Load-more / infinite scroll *(Infosys)*

**[CODE] — the standard set, with the requirements interviewers actually check**

| # | Build | Functional requirements | The follow-up that separates candidates |
|---|---|---|---|
| Q71 | Todo list | add, render, toggle, delete, then filter | persistence; edit-in-place; what's your key? |
| Q72 | Star rating | hover preview, click to set, reset | half-star support; keyboard operable |
| Q73 | Accordion | expand/collapse | single-open mode; disabled panel; ARIA |
| Q74 | Tabs | switch panels | lazy-render panel content; deep-link the active tab |
| Q75 | Modal | open/close, backdrop | portal, focus trap, Escape, scroll lock |
| Q76 | Dropdown | select, close on outside click | keyboard nav; async options |
| Q77 | Debounced search | input → filtered list | switch to server search + cancellation |
| Q78 | Autocomplete | fetch suggestions, select | debounce, keyboard nav, cache, race conditions |
| Q79 | Pagination | page buttons, prev/next | server-driven; page-size change; deep link |
| Q80 | Infinite scroll | append on scroll | IntersectionObserver; virtualisation; prefetch next page |
| Q81 | Carousel | next/prev, dots | circular cycling; autoplay + pause on hover |
| Q82 | Multi-step form | steps, validation, back/next | preserve data backwards; per-step schema |
| Q83 | Data table | render rows, sort | column sort + filter + pagination combined |
| Q84 | Nested comments | render a tree, reply | collapse subtree; recursion vs flat map |
| Q85 | File explorer | expand folders | recursive rendering; lazy-load children |
| Q86 | Toast notifications | show, auto-dismiss | queueing, stacking, manual dismiss |
| Q87 | Stopwatch | start/stop/reset | laps; drift-free timing |
| Q88 | Progress bar | animate to N% | multiple sequential bars |
| Q89 | Transfer list | move items between lists | multi-select; select-all |
| Q90 | Drag-and-drop reorder | reorder a list | persist order; keyboard alternative |

---
---

# PART 5 — Scenario, Architecture, and Managerial

## 5.1 Scenario design

**[ASKED] — the actual TCS question, reproduced**
> Design a loan-management system. The first screen is a login page. On successful login, the next page shows three vertical sections side by side, each fetching from a different API: user details, loan details, and next repayment information. At the bottom there is a button that navigates to a Loan Types page listing all loan schemes — that page is public and accessible by anyone.

Answer it covering: route map · protected vs public routes · where state lives · parallel vs sequential API calls · loading skeletons · error boundaries · what happens when one of the three calls fails.

**[CODE] — practise these three the same way**
- Q91 — A dashboard with 6 widgets, each with its own endpoint and refresh interval
- Q92 — An auth flow: login, refresh token, silent renewal, logout across tabs
- Q93 — A 40-field application form saved as a draft every 30 seconds

**[LEARN]**
1. Three independent API calls on one screen. Sequential or parallel? What would make you choose sequential?
2. Where does auth state live, and what happens to it on a hard refresh?
3. One of three panels fails. What does the user see? What does *not* happen?
4. Which parts of this screen would you make separate components, and what is your rule for splitting?
5. What would you change if this had to render in under one second on a 3G connection?

## 5.2 Architecture (know an opinion, not a lecture)

**[ASKED]** — Do you know server-side rendering? *(Cognizant)* · What is a PWA? *(Cognizant)* · Micro-frontend architecture and Webpack *(Wipro senior JDs)*

**[LEARN]**
1. SSR vs CSR: name the metric each improves and the cost each carries.
2. What problem do micro-frontends solve? What problem do they create? Would you use one on a 6-person team?
3. What makes a component library a design system rather than a folder of components?
4. How do you decide when a shared component is worth extracting?

## 5.3 Managerial / HR

**[ASKED]**
- Tell me about yourself *(all)*
- Tell me about your current project and your role *(TCS)*
- Which React version are you using? What other frameworks do you know? *(TCS)*
- Why are you leaving your current company? Why us, if you're already at a large MNC? *(TCS)*
- Have you worked in Agile or Waterfall? *(TCS)*
- Are you willing to relocate? *(TCS)*
- What is your notice period? *(TCS)*
- How do you handle time management while building projects? *(reported)*
- How do you do unit testing in your project? *(Infosys full-stack round)*

**[LEARN]** — prepare answers, then stress-test them
1. Your 90-second project story: does it end in a *decision you made* and its tradeoff? If it ends in a feature list, rewrite it.
2. Name a technical disagreement you had and how it resolved. What did you concede?
3. Name a production bug you caused. What did you change afterwards — in the code, and in the process?
4. Your "why leaving" answer: does it criticise anyone? Rewrite until it doesn't.
5. What do you actually do in a sprint? Name the ceremonies and your part in each.

---
---

# PART 6 — Answer Key (output questions only)

Use only after attempting. The *explanation* matters more than the value.

| Q | Answer | One-line reason |
|---|---|---|
| Q1 | `undefined` | `var` declaration hoisted, assignment isn't |
| Q2 | `ReferenceError` | `let` is hoisted but in the TDZ |
| Q3 | `foo` prints; `bar` throws `TypeError` | function declarations hoist fully; function expressions don't |
| Q4 | `undefined` | inner `var x` shadows and is hoisted |
| Q5 | `ReferenceError` | block-scoped `a` in TDZ |
| Q6 | `3 3 3`; with `let`: `0 1 2` | `var` has one binding; `let` creates one per iteration |
| Q9 | `1 2 1` | `a` and `b` close over separate `count` bindings |
| Q10 | `undefined`, `"obj"` | regular function loses `this`; arrow inherits it lexically |
| Q11 | `99` | spread is shallow; `b` is shared by reference |
| Q12 | `1` | own property deleted, prototype property surfaces |
| Q14 | `true, false, true, false, false, "object", "number", false, "1,2,34,5", "fallback", 0` | coercion; `typeof null` is a historic bug; float precision; `??` only guards null/undefined |
| Q15 | `1 4 3 2` | sync → microtask → macrotask |
| Q16 | `A C B` | `await` yields; the rest resumes as a microtask |
| Q17 | `m1 p1 t1 t2` | all microtasks drain before any timer |
| Q38 | `[1, NaN, NaN]` | `map` passes `(value, index)`; index becomes `parseInt`'s radix |
| Q39 | reordering/deletion mismatches state to rows | index keys make React reuse the wrong instances |
| Q43 | logs `0` forever | the effect closes over the first `count`; empty deps never refresh it |
| Q44 | `+1`; with updater form `+3` | three reads of the same stale `count` vs three queued updates |
| Q48 | new `style` object and new `onClick` each render | `React.memo` compares by reference |
| Q49 | almost never worth it | `items.length` is O(1); the memo costs more than it saves |

---

# How to work this file

- **Week 1:** Part 1 only. Twelve [CODE] questions a day, written out and run.
- **Week 2:** Part 2, plus every [LEARN] question in 2.2 and 2.3 spoken aloud.
- **Week 3:** Part 4 — one build a day, timed, narrated.
- **Week 4:** Parts 3 and 5, plus re-drill anything you got wrong.
- **Ongoing:** after every real interview, add the questions you were actually asked to the [ASKED] lists here, tagged with the company. This file should grow from your own experience, not stay as I wrote it.
