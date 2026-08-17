# 05 — Coding Tasks & the Machine-Coding Round

## What was actually asked at these companies

| Company | Task |
|---|---|
| TCS | Drag-and-drop functionality in React (assignment) |
| Accenture | Increment/decrement counter; a JS problem (palindrome / longest substring); a React problem — fetch from an API and display conditionally, or pagination |
| Infosys | Merge two arrays with spread; write a closure and call it; destructuring syntax; remove duplicates; handle an API request from an endpoint |
| Capgemini | Flatten a nested array, then re-implement without `flat()` |
| Deloitte | Reverse a string in three different ways |
| IBM | Take-home with LeetCode-style problems (Merge Intervals) |
| Cognizant | JS and React coding in the same technical round |

**Calibration: the tasks at these companies are easy.** The bar is *finishes cleanly and narrates*, not *builds something impressive*.

## The standard problem set (converged across independent sources)

**Tier 1 — state and events:** counter · accordion · tabs · todo list · star rating (incl. half-stars) · modal · dropdown with click-outside-to-close · theme toggle
**Tier 2 — lists and derived state:** search filter · pagination · transfer list · data table · selectable cells · drag-and-drop reorder · multi-select dropdown
**Tier 3 — async UI:** debounced search · autocomplete/typeahead · infinite scroll (Intersection Observer) · job board / news feed with virtualisation · file upload with preview
**Tier 4 — timers and queues:** progress bar · stopwatch · countdown · traffic light · toast notifications
**Tier 5 — composite:** multi-step form wizard · nested comment system · file explorer · image carousel with circular cycling · resizable split view

## Polyfills to write from memory

`debounce` · `throttle` · deep clone · array flatten (recursive) · custom `map`/`filter`/`reduce` · `Promise.all`

## How to run the round (60–90 min)

**Minutes 0–3 — restate and scope.** Say the MVP out loud:
> "I'll first build a working autocomplete with query input, loading state, fetched suggestions and click selection. If time permits I'll add debouncing, keyboard navigation and caching."

This confirms core behaviour, limits overbuilding, and hands the interviewer your follow-up path.

**Minutes 3–5 — plan in comments.** State shape, component split, event handlers, edge cases.

**Minutes 5–45 — build in behaviour order, not polish order.**
- Todo → add, render, toggle, delete, *then* filters
- Autocomplete → input, fetch/filter, render, select, *then* debounce and keyboard nav

**Minutes 45–60 — narrate what you'd add next.** Accessibility, caching, virtualisation, tests. Naming what you deliberately deferred scores; silence reads as not knowing.

## Common failure modes in this round

- No plan → drifting, nothing runs at the buzzer
- Over-building (styling before behaviour)
- Approaching it like a backend system-design interview (load balancers, sharding) — wrong register entirely
- Not handling loading/error/empty states, which is the mid-level signal
- Silent coding

## The one build that carries the most weight

> **Search box → debounce → fetch → cancel stale request (`AbortController`) → loading / error / empty states → pagination**

Build it from scratch, no libraries, and be able to explain each decision. It simultaneously exercises: JS async internals, hooks and cleanup, re-render control, API integration, and live-build fluency — five of the eight Must-Know nodes.

## Frontend DSA scope (only where an OA exists)

Arrays · strings · hash maps · recursion · easy tier. Practical shapes: traversing nested JSON (folder structures), grouping/deduplication, two-sum variants, sliding window. You will not be asked to invert a red-black tree.
