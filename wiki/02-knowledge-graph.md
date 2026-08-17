# 02 — The Knowledge Graph

Format for each node: **subtopics → reported questions → practical task → depth required → JD vs interview gap.**
Classification (Must / High / Nice / Low) is summarised in `03-skill-classification.md`.

---

## 1. JavaScript language internals — MUST KNOW
*The highest-ROI node in the entire graph.*

**Subtopics:** `var`/`let`/`const` scoping · hoisting · Temporal Dead Zone · closures · lexical scope · `this` · prototypal inheritance · shallow vs deep copy · `==` vs `===` coercion · spread vs rest · destructuring · event loop (microtask vs macrotask ordering) · callbacks → Promises → async/await · `Promise.all` vs `race` · event bubbling & delegation

**Reported questions:**
- var/let/const with a scoping example, hoisting, TDZ, promises vs async/await, destructuring *(Accenture, React 3+ yrs)*
- Output-based puzzles on closures, hoisting, scope shadowing, TDZ; `==` vs `===`; event-loop execution order *(Accenture senior FE)*
- Deep vs shallow copy; closures + "practical use case?"; `Promise.all` vs `Promise.race`; hoisting; throttling *(Capgemini)*
- Shallow/deep copy, closure, lexical scoping, prototypal inheritance *(Cognizant)*
- Event loop *(TCS)*; arrow functions, spread vs rest *(TCS)*

**Practical tasks:** predict output of 6–8 snippets under time pressure · write a closure and invoke it · merge arrays with spread · write destructuring syntax · remove duplicates *(Infosys)* · flatten a nested array, then again without `flat()` using recursion *(Capgemini)* · implement `debounce` and `throttle` polyfills from scratch

**Depth required:** narrate the execution model, not define terms. Follow-ups are guaranteed ("practical use case?", "what if X isn't available?").

**JD vs interview:** JDs barely mention this ("strong proficiency in JavaScript"). Interviews spend 30–50% of the round here. **Biggest gap in the dataset.**

---

## 2. React core + hooks + render model — MUST KNOW

**Subtopics:** functional vs class · JSX · props vs state · state immutability · `useState` · `useEffect` + deps + cleanup · `useEffect` ↔ lifecycle mapping · `useRef` · `useReducer` · `useContext` · custom hooks · controlled vs uncontrolled · keys in lists · virtual DOM + reconciliation · HOCs · portals · error boundaries · lazy/Suspense

**Reported questions:**
- Explain `useEffect` mapped to lifecycle methods; HOCs and their advantages *(Infosys)*
- State, state mutation, `useEffect` *(TCS)*; child-to-parent data passing, HOC implementation, all lifecycle methods, state vs props, `useState` vs `useEffect` *(TCS)*
- Class vs functional, prop drilling + solution, `useReducer`, refs, routing *(Accenture)*
- Why fetch calls belong inside `useEffect`; controlled components; local vs global state; virtual DOM and reconciliation; importance of keys *(Accenture)*
- `useEffect` dependency array and its effect on rendering; React Portals and z-index *(Capgemini)*
- Pure components; hooks other than useState/useEffect; why functional over class *(Cognizant)*
- Controlled vs uncontrolled; how to write custom hooks *(UST Global L1)*

**Practical tasks:** counter with increment/decrement *(Accenture)* · write code to handle an API request from an endpoint *(Infosys)* · controlled form with validation · custom `useFetch` / `useDebounce`

**Depth required:** you must be able to explain **why a specific component re-rendered**. A recruiting firm reports the disqualifying moment in a screen was a candidate with 7 years of React who could not explain a re-render when props hadn't changed, and couldn't reason about referential equality of objects created inline during render.

**JD vs interview:** aligned.

---

## 3. Re-render control & React performance — MUST KNOW
*The 3+ years discriminator.*

**Subtopics:** `React.memo` · `useMemo` · `useCallback` · referential equality · **when memoisation hurts** · code splitting / `React.lazy` · lazy loading · list virtualisation · debouncing input · avoiding inline object/function props · React DevTools Profiler

**Reported questions:**
- Performance optimisation is one of three named focus areas *(Infosys)*
- "Performance optimization techniques in React?" *(Accenture)*
- Memoization, code splitting, techniques to reduce a five-second homepage load, avoiding unnecessary re-renders *(Accenture)*
- `useMemo` vs `useCallback` → "what exactly is caching?" → "is caching always beneficial?" *(Capgemini — the memory-cost answer is what impressed)*
- Lazy loading, code splitting, how to debounce the application *(Infosys)*
- Optimisation using `memo` and `useCallback` *(Accenture, candidate forum)*

**Practical task:** take a component that re-renders on every parent update, fix it, narrate each step.

**Depth required:** **tradeoff-level.** Not "I use useMemo" but "here is when useMemo costs more than it saves."

**JD vs interview:** aligned and rising. Infosys and Deloitte JDs both name performance optimisation explicitly.

---

## 4. State management (Redux / RTK / Context) — MUST KNOW

**Subtopics:** Redux flow (action → dispatch → reducer → store → selector) · `react-redux` hooks · Redux Toolkit (`createSlice`, `createAsyncThunk`) · middleware/thunk · Context API mechanics · prop drilling · Context vs Redux decision rule · selector memoisation (`createSelector`/reselect) · state normalisation · RTK Query / React Query awareness · `batch`

**Reported questions:**
- "Have you worked on Redux" / "what is the flow of Redux" *(TCS)*
- "How would you optimise a Redux application?" *(Infosys)*
- Redux vs Context API — when to use which *(Accenture)*
- Why Redux is needed; how the store connects to routes; Context API; prop drilling *(Cognizant)*
- Redux Toolkit named explicitly in a 2025 walk-in *(Cognizant)*
- Write the `createStore` syntax *(LTIMindtree — legacy API recall; a risk if you only know RTK)*

**Practical tasks:** wire a slice end to end · convert a prop-drilled tree to Context · lift state to a common parent to sync siblings

**Five optimisation levers to have ready:** normalised state shape · RTK + Immer · memoised selectors · narrowed `useSelector` calls · code-split reducers / batching

**JD vs interview:** heavily aligned. Wipro's senior FE listing names React primary, Redux secondary.

---

## 5. HTML & CSS fundamentals — MUST KNOW
*Badly under-prepared by React specialists.*

**Subtopics:** semantic elements · void elements · HTML5 additions (`<datalist>`, `<figure>`, `<video>`) · forms/inputs · a11y basics · Flexbox · Grid · `display` vs `visibility` · position · specificity · pseudo-classes vs pseudo-elements · media queries · CSS variables · transitions

**Reported questions:**
- Explain semantic elements; name five recently introduced HTML elements; create a `datalist`; what are void elements; key features of CSS *(Infosys — all in one round)*
- Semantic HTML tags and CSS pseudo-elements *(Cognizant)*
- Difference between `display` and `visibility` *(TCS)*

**Practical task:** responsive three-column layout that stacks on mobile, no UI library.

**Depth required:** shallow but **instant**. Cheap points lost because candidates live inside component libraries.

**JD vs interview:** JDs say "responsive design and cross-browser compatibility"; interviews ask trivia.

---

## 6. API integration & async data — MUST KNOW

**Subtopics:** REST verbs and semantics · fetch/axios · loading / error / empty states · retry · request cancellation (`AbortController`) · race conditions on fast typing · pagination / infinite scroll · auth headers & tokens · caching

**Reported questions:**
- Explain API methods / HTTP verbs; write Promise syntax *(Infosys)*
- Error handling and retry logic for APIs *(Accenture)*
- "How do you cancel an API call?" *(Capgemini — candidate reached `AbortController` late and admitted he'd skipped the topic)*
- Coding task: fetch from a given API and render conditionally, or paginate *(Accenture)*

**Practical task — build this once, it covers nodes 1, 2, 3, 6 and 7 at the same time:**
> search box → debounce → fetch → cancel stale request → render loading/error/empty → paginate

**Depth required:** production-level. **Cancellation and retry are where the 3+ years line is drawn.**

---

## 7. Small-scope UI build (machine coding) — MUST KNOW

See `05-coding-tasks.md` for the full problem set and round strategy.

**Reported tasks:** drag-and-drop in React *(TCS)* · counter *(Accenture)* · fetch-and-render with conditions or pagination *(Accenture)* · reverse a string three ways *(Deloitte)*

**Depth required:** working MVP first, polish second. At these companies the widget is usually **easy**; the bar is *finishes cleanly and narrates*, not *builds Figma*.

---

## 8. Project narrative + scenario design — MUST KNOW
*This is what the managerial round actually is.*

**Reported questions:**
- Tell me about your current project and your role; which React version; which other frameworks *(TCS)*
- **Scenario:** design a loan-management app — login page, then a page with three adjacent sections each fetching from a different API, plus a button to a public unauthenticated Loan Types page *(TCS)*
- How data flows between components *(Infosys)*
- Smart form-handling strategies; local vs global state decisions *(Accenture)*

**Depth required:** whiteboard on demand — route map, protected vs public routes, where state lives, API call layering and parallelism, loading skeletons, error boundaries.

---

## 9. Git in production — HIGH VALUE

**Reported questions (Accenture devoted a whole section):**
- How to revert a pushed commit
- How to switch branches safely without losing uncommitted changes
- How to handle merge conflicts efficiently
- "What is Git and how does it help in development" *(even in an L1 screen — UST Global)*

**Depth:** command-level for revert / stash / rebase-vs-merge / conflict resolution. One hour of study. Occasionally decisive.

---

## 10. TypeScript — HIGH VALUE (asymmetric)

**Subtopics:** basic types · `interface` vs `type` · generics in components · `unknown` vs `any` · typing props/hooks/events · utility types

**Evidence:** Deloitte's FE JD requires React with TypeScript. An Infosys React/Next.js listing asks 2+ years each of React, Next.js, TypeScript, Material UI, GitHub CI/CD, component-driven development, responsive design, accessibility and web performance. A representative 3–5 yr JD lists React + TypeScript + Redux Toolkit as the core. One Accenture candidate was asked `null` vs `unknown` and why `unknown` is safer than `any`.

**Verdict:** TypeScript measurably increases **shortlisting**; it is asked in interviews far less than it appears in JDs. → **High-ROI résumé investment, low-ROI deep-study investment.**

---

## 11. Testing (Jest / RTL) — HIGH for JDs, LOW for interviews

Deloitte's JD asks for Jest/RTL familiarity; typical 3–5 yr JDs list testing as *preferred*, not required. One IBM interviewer named unit testing as the specific gap. **But across all TCS/Infosys/Cognizant/Capgemini/Accenture candidate reports read, testing questions are essentially absent from the technical rounds.**

**Verdict:** learn enough to write `render` + `getByRole` + `userEvent.click` + `expect`, and to explain unit vs integration vs e2e. Do not specialise.

---

## 12. Frontend architecture at scale — NICE TO HAVE at 3 yrs, MUST at 6+

Component/folder structure · design systems · reusable component APIs · micro-frontends · module federation · SSR vs CSR · design patterns.

Wipro's senior React listing (5+ yrs) asks for design patterns, modern auth libraries, shared-component integration, and says micro-frontend architecture and Webpack 5 knowledge is beneficial. SSR and PWA appear as "extra questions" at Cognizant. Infosys lists mobile platforms, PWAs and SSR as desirable.

**At 3 yrs:** one coherent paragraph of opinion each on micro-frontends, SSR vs CSR, and design systems. Nothing deeper.

---

## 13. CI/CD, cloud, GraphQL — LOW ROI for this segment

Wipro's senior JD asks for containerised cloud experience and CI/CD (Jenkins, Spinnaker), but at 5+ yrs and on specific accounts. **No candidate report in this dataset shows a frontend interview probing cloud or CI/CD depth.** GraphQL appears in almost no Indian service-company React JD found.

**Verdict:** one résumé line if true. Zero study time.

---

## 14. DSA — LOW ROI at lateral 3+ yrs, MUST at fresher entry

**Evidence split:**
- Fresher/campus tracks are DSA-heavy (Cognizant campus: gamified AON round + 120-min test with coding, SQL, web dev).
- Lateral React roles are not: the TCS 3–6 yr React round contained **no algorithm question at all**; the Capgemini senior round had exactly one (flatten an array).
- Exceptions: Deloitte/IBM-style processes with an OA stage.

**Scope:** arrays, strings, hash maps, recursion, easy tier. Frontend algorithm questions skew practical — traversing nested JSON folder structures, grouping/deduplicating, sliding window.
