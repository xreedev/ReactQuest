# 03 — Skill Classification & the JD/Interview Gap

**Read this before anything else.** Its value is telling you what to skip.

## Master table

| Skill | Class | JD says | Interview does | Study weight |
|---|---|---|---|---|
| JS internals + output prediction | **Must** | Barely mentions | Tests hardest | **25%** |
| React hooks + render model | **Must** | Yes | Yes | **20%** |
| Re-render control / perf tradeoffs | **Must** | Yes | Yes, with follow-ups | **12%** |
| Redux / RTK / Context | **Must** | Yes | Yes | **10%** |
| API integration + async UI | **Must** | "REST API integration" | Yes, incl. cancel/retry | **10%** |
| Small UI live build | **Must** | Not mentioned | Yes | **8%** |
| HTML/CSS fundamentals | **Must** | "responsive design" | Trivia-level, often | **5%** |
| Project narrative + scenario | **Must** | Implied | Yes, decisive | **5%** |
| Git production workflows | High | Rarely | Sometimes, whole section | **3%** |
| TypeScript | High | **Very often** | Occasionally | **2%** (résumé-first) |
| Testing (Jest/RTL) | High (JD) / Low (interview) | Often, as "preferred" | Rarely | ~0 |
| Architecture / micro-frontends / SSR | Nice to have | At 5+ yrs | At 5+ yrs | ~0 |
| Accessibility | Nice to have | Sometimes | Almost never | ~0 |
| CI/CD, cloud, GraphQL | Low ROI | Occasionally | ~Never | 0 |
| DSA beyond easy | Low ROI (lateral) | No | Only where an OA exists | 0 |

## The four gaps that matter

**Gap 1 — JS internals.** Understated in JDs, dominant in interviews. This inversion is the single most exploitable fact in the dataset.

**Gap 2 — TypeScript.** Overstated in JDs relative to interviews. It is a *shortlisting* asset, not an *interview* asset. Put it on the CV (honestly), study it lightly.

**Gap 3 — Testing.** Same shape as TypeScript but weaker on both sides. JD-visible, interview-invisible, except at IBM/Deloitte-tier.

**Gap 4 — Cloud / CI/CD / micro-frontends.** Appear in senior JDs (5+ yrs, specific accounts) and essentially never in a 3-year technical round. Résumé line only.

## Condensed topic list (for revision)

**Must know**
- JS internals: closures, hoisting/TDZ, scope, `this`, coercion, event loop, promises/async-await, spread/rest, destructuring, deep vs shallow copy, prototypes
- Hooks: useState, useEffect (+deps, cleanup, lifecycle map), useRef, useReducer, useContext, custom hooks
- React core: props vs state, JSX, keys, virtual DOM/reconciliation, HOC, portals, error boundaries, controlled vs uncontrolled, class vs functional
- Re-renders & perf: memo, useMemo, useCallback, referential equality, when memo hurts, code splitting, lazy loading, virtualisation, debounce
- State mgmt: Redux flow, RTK (createSlice/thunk), Context API, prop drilling, Context vs Redux, selector/normalisation optimisations
- API: REST verbs, fetch/axios, loading-error-empty states, AbortController, retry, pagination/infinite scroll, auth tokens
- Live coding: counter, form + validation, debounced search, fetch-and-render, pagination, todo, tabs/accordion, star rating, modal
- HTML/CSS: semantic tags, void elements, HTML5 elements, display vs visibility, pseudo-class vs pseudo-element, Flexbox, Grid, media queries, CSS variables
- Project narrative + live app design (routes, protected/public, state placement, parallel APIs)
- Polyfills: debounce, throttle, flatten, deep clone

**High value**
- Git: revert pushed commit, stash/branch switch, merge conflicts
- TypeScript: basic types, interface vs type, generics, unknown vs any, typing props/hooks
- Jest/RTL: one component test, unit vs integration vs e2e
- Managerial: agile, code review, estimation, why leaving, notice, relocation

**Nice to have**
- Next.js / SSR vs CSR, PWA
- Design systems, component architecture, design patterns
- Micro-frontends, Webpack / module federation
- Accessibility basics

**Low ROI**
- GraphQL, CI/CD tooling, cloud/containers
- Medium/hard DSA (easy arrays/strings/hashmaps/recursion only)
- React 19 / RSC / compiler, React Native
