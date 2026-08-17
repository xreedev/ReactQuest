# 07 — Study Plan & Minimum Competitive Profile

## Highest-ROI order

Each item unlocks the next. Do not reorder.

1. **JS output-prediction drills** — closures, hoisting/TDZ, scope shadowing, `this`, coercion, event-loop ordering. 40–50 snippets.
2. **The re-render model** — memo / useMemo / useCallback, referential equality, and *when memoising is wrong*.
3. **One canonical async component** — debounced search → fetch → cancel → loading/error/empty → paginate. From scratch, no libraries.
4. **Redux/RTK flow + Context-vs-Redux decision rule + five optimisation levers.**
5. **Your project story, rehearsed** — plus the ability to design a fresh three-screen app live.
6. **HTML/CSS trivia sweep** — semantic tags, void elements, HTML5 additions, display vs visibility, pseudo-class vs pseudo-element, Flexbox/Grid. One evening.
7. **Polyfills** — debounce, throttle, deep clone, flatten. From memory.
8. **Git** — revert pushed commit, stash, merge conflicts. One hour.
9. **TypeScript basics** — enough to type props/hooks/events and put it on the CV honestly.
10. **Jest/RTL** — one meaningful test + unit vs integration vs e2e. One evening.

Everything else — micro-frontends, RSC, GraphQL, CI/CD, medium/hard DSA — is below the line for this company set.

## A four-week schedule

**Week 1 — Fundamentals (the exploitable gap)**
- Days 1–4: JS output drills, ~12 snippets/day, written explanations
- Days 5–6: polyfills from memory (debounce, throttle, deep clone, flatten)
- Day 7: HTML/CSS trivia sweep + Git commands

**Week 2 — React depth**
- Days 1–3: re-render model; take three components and explain/fix their render behaviour
- Days 4–5: Redux/RTK end to end; write the five optimisation levers as a one-pager
- Days 6–7: build the canonical async component; then rebuild it without looking

**Week 3 — Delivery**
- Days 1–4: one machine-coding problem per day, timed 45 min, narrated aloud (counter → tabs → pagination → autocomplete)
- Day 5: scenario design practice — sketch three apps (dashboard with parallel APIs, auth flow, multi-step form)
- Days 6–7: project narrative — write and rehearse the 90-second version and the 10-minute version

**Week 4 — Surface and channel**
- Days 1–2: CV rewrite (`08`, `09`)
- Day 3: Naukri + LinkedIn profile overhaul (`10`)
- Days 4–5: TypeScript basics; one Jest/RTL test
- Days 6–7: two mock interviews; re-drill weakest topics from `04`

**Ongoing:** apply throughout. Do not wait until you feel "ready" — response cycles run 25–53 days at these companies.

## Minimum competitive profile

### To get interviews (CV / screening layer)
- React + **TypeScript** + Redux Toolkit + REST named explicitly
- **Next.js** and **Jest/RTL** if honestly usable (the named gates at IBM/Deloitte-tier)
- Java/Spring or Node exposure if genuine — many "React" reqs at Wipro-type firms are full-stack, and a frontend-only CV materially narrows your funnel
- Two projects you can defend end to end, with decisions and numbers
- Naukri profile: complete, keyworded, CTC/notice/location filled, status "Actively looking"

### To pass the technical round
- Any JS output question answered in under 60 seconds, with reasoning
- Explain why any given component re-rendered — and fix it
- Build a fetch-and-render component with loading/error/empty and a debounced input, live, in 20 minutes, narrating
- Draw the Redux flow from memory; give a one-sentence Context-vs-Redux rule; list five Redux optimisations
- Design a three-screen app live: routes, auth boundaries, state placement, parallel API calls, error handling
- Recover HTML/CSS trivia instantly
- Answer three Git incident questions
- 90-second project story ending in a decision you made and its tradeoff

### To pass managerial / HR
- Agile experience in specifics (ceremonies, estimation, code review)
- A non-negative reason for leaving
- Clean answers on notice period and relocation

## Depth beats quantity

A candidate who cleared a senior Capgemini round put it directly: many candidates try to prepare 500–1000 questions; mastering **30–40 concepts deeply** is far more effective, because interviewers layer follow-ups on whatever you raise.

Use `04-question-bank.md` as your 30–40. Not more.
