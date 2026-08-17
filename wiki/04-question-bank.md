# 04 — Question Bank (reported by real candidates)

Grouped by company first (for targeted prep), then by topic (for revision).
Every question below appears in a candidate writeup or Glassdoor free-text entry. Nothing here is invented or scraped from "top 30 questions" SEO pages.

---

## By company

### TCS (3–6 yrs React role, plus a frontend role via Naukri)
**General:** Tell me about yourself · relevant React experience · other frameworks you know · current project and your role · React version you use
**Technical:** State and state mutation · `useEffect` · have you worked on Redux · flow of Redux · arrow functions · spread vs rest · child-to-parent data passing · HOC and how to implement · name all lifecycle methods and when used · state vs props · `useState` vs `useEffect` · `display` vs `visibility` in CSS · event loop
**Scenario:** Design a loan-management system — login page; on success a page with three adjacent vertical sections each fetching from a different API (user details, loan details, next repayment); a bottom button to a Loan Types page that is public/unauthenticated
**Managerial:** Why leaving · why TCS if already at a large MNC · agile or waterfall · relocation · notice period
**Assignment (reported separately):** drag-and-drop functionality in React

### Infosys
**React/JS:** Explain `useEffect` with lifecycle methods · HOCs and advantages · how to optimise a Redux application · lazy loading and code splitting · how to debounce the application · how data flows between components · write code to handle an API request from an endpoint
**HTML/CSS/HTTP:** Key features of CSS · semantic elements · explain API methods (HTTP verbs) · write Promise syntax · five recently introduced HTML elements · create a `datalist` · void elements
**Coding:** Declare two arrays and merge with spread · write a closure and call it · write destructuring syntax · remove duplicates from an array
**Candidate prep note:** read up on event bubbling, reconciliation and closures; prepare coding and theory equally

### Accenture (React 3+ yrs, and senior FE)
**JavaScript:** var vs let vs const with scoping example · hoisting · Temporal Dead Zone · promises · promises vs async/await · destructuring · `==` vs `===` and coercion · closures and lexical scope · callback hell → promises → async/await · event loop (microtasks/macrotasks) · sync vs async execution · output-based questions on closures, hoisting, scope shadowing, TDZ
**React:** Class vs functional · prop drilling and its solution · Redux vs Context API — when to use which · performance optimisation techniques · `useReducer` · refs · routing · smart form handling · controlled components · local vs global state · why `fetch` calls go inside `useEffect` · useState/useEffect/useCallback/useMemo · React Router absolute vs relative paths · virtual DOM and reconciliation · memoization · code splitting · how to reduce a five-second homepage load · importance of keys in lists · avoiding unnecessary re-renders · error handling and retry logic for APIs
**TypeScript:** `null` vs `unknown`; why `unknown` is safer than `any`
**Git:** Revert a pushed commit · switch branches without losing uncommitted changes · handle merge conflicts efficiently
**Coding:** Increment/decrement counter · a JS problem (palindrome, longest substring) · a React problem (fetch from an API and display conditionally, or pagination)

### Cognizant
**React/Redux:** HOCs · why Redux is needed · pure components · how the store connects to React routes · what are hooks · hooks other than useState/useEffect · Context API · why functional components over class · prop drilling · Redux Toolkit · lifecycle methods
**JavaScript:** How objects are copied (shallow vs deep) · closures · lexical scoping · prototypal inheritance · promises · event loop · events
**HTML/CSS:** Semantic tags · pseudo-elements
**Extras:** Server-side rendering · PWA · REST API
**Coding:** JS and React coding questions in the same round

### Capgemini (senior FE)
**JavaScript:** Deep vs shallow copy · closures (+ write an example, + practical use case) · `Promise.all()` vs `Promise.race()` · how to cancel an API call (`AbortController`) · hoisting (var/let/const, TDZ) · throttling (with real-world scenario)
**React:** `useMemo` vs `useCallback` → what is caching → is caching always beneficial · Context API (creation, provider, consumer) · `useEffect` dependency array and rendering · React Portals and z-index
**Coding:** Flatten a nested array; then "what if `flat()` is not available?" → recursion
**Also reported:** ES6 features, find max value in an array, title-case a string, check prime, virtual vs real DOM, prop drilling, output prediction on a JS snippet

### LTIMindtree
React and Redux focus even when the candidate names backend as their strength · write the Redux `createStore` syntax · 2 coding questions + theory, medium difficulty

### Deloitte
Two separate interviews (one Java/Spring, one React/JS) for full-stack roles · microservices use-cases · var vs const vs let · async/await · reverse a string in three ways · managerial/case round

### IBM
Next.js and unit testing expectations stated explicitly · take-home assignment with LeetCode-style problems (Merge Intervals) · project showcase with follow-ups on design rationale · behavioural round

### UST Global (L1, 30 min)
What are hooks and how do they improve on class components · optimisation techniques in React · what is Git and how does it help · styling library used in React and drawbacks vs styled-components · controlled vs uncontrolled components · how to write custom hooks

---

## By topic — the convergent core

Ranked by how many independent candidate reports mention them:

1. **Hooks + `useEffect` behaviour** — every company in the dataset
2. **Redux flow / Redux vs Context** — TCS, Infosys, Cognizant, Accenture, Capgemini, LTIMindtree
3. **Closures, hoisting, scoping** — Accenture, Capgemini, Cognizant, Infosys
4. **Performance optimisation techniques** — Infosys, Accenture, Capgemini, UST
5. **Promises / async / event loop** — Accenture, Capgemini, Cognizant, TCS
6. **HOCs, prop drilling, virtual DOM** — TCS, Infosys, Cognizant, Accenture, Capgemini
7. **One small coding task** — universal, usually easy
8. **Project + role + why-leaving + notice period** — universal

## Answer-shape rules that get credit

- **Tradeoffs, not definitions.** "A vs B, and here's the condition that decides it."
- **Answer exactly what was asked.** One candidate's explicit lesson: extra volunteered theory only creates more surface for cross-questioning.
- **Say "I don't know" cleanly.** The Capgemini candidate admitted he'd skipped `AbortController`; the round continued. Bluffing is where rounds end.
