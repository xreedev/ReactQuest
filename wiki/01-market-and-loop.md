# 01 — The Market and the Loop

## Observed interview structure by company

| Company | Reported structure | Flavour |
|---|---|---|
| **TCS** | Technical (30–60 min) + Managerial + HR | Concept-level questions, project deep-dive, small JS/React snippets, one scenario design question. One candidate reported a drag-and-drop React assignment. Managerial round is a real gate. |
| **Infosys** | Resume shortlist → Technical → Managerial → HR | Mostly theory plus 1–2 output-based coding questions. Named focus areas: Redux, hooks, performance optimisation. Notably heavy on textbook HTML/CSS/HTTP. Glassdoor aggregate for React Developer: 22 interviews, ~25 days to hire, difficulty 3/5. |
| **Accenture** | Online assessment or live coding → skill round(s) → HR | The most rigorous in the set. One senior FE "skill round" ran over an hour: JS internals, scenario React, and a full Git section. Glassdoor: 11 React Developer interviews, ~53 days end-to-end vs 26 days company-wide. |
| **Cognizant** | Often walk-in: 1 technical + HR | JS and React coding, hooks, **Redux Toolkit** named explicitly (2025), semantic HTML tags, CSS pseudo-elements, lifecycle, promises, event loop, REST. |
| **Capgemini** | 1 technical + 2 managerial | Conceptual clarity with 2–3 layers of follow-ups. Typically one coding question only. |
| **LTIMindtree** | Recruiter/Naukri → L1 → L2 | Short screens, low gap tolerance. One candidate rejected after missing 1 of 3 questions. Asks legacy Redux API syntax (`createStore`). |
| **Deloitte** | OA (aptitude + coding) → Technical → Managerial/case → HR | 4-round, ~1 month. One candidate asked to reverse a string three different ways in round 1. |
| **IBM** | 4 rounds, ~1 month, sometimes a take-home assignment | One assignment included a Merge-Intervals-type problem. One interviewer ended a round early because the role specifically wanted **Next.js and unit testing**. |
| **Wipro** | Varies by account | Many "React" reqs are actually full-stack (Core Java + Spring Boot + Angular/React + SQL) at the 3–5 year band. Pure senior React roles appear at 5+ yrs and add cloud, CI/CD, micro-frontends. |
| **UST Global** (comparable) | L1 ~30 min, easy | Hooks vs class, optimisation techniques, Git, styling libraries, controlled vs uncontrolled, custom hooks. |

## The structural takeaway

**The technical filter is usually a single 45–60 minute round.** It has to cover JS + React + HTML/CSS + a coding task + your project. Consequences:

- Breadth of instantly-available answers beats depth in one area.
- One blank answer is 20–33% of the signal in a three-question screen.
- There is rarely a separate testing round, a separate system-design round, or a DSA round (unless the company runs an OA stage).

## What differs between companies — the practical version

The biggest inter-company variance is not difficulty. It's **which adjacent skill is the gate**:

| Company | The gate beyond React |
|---|---|
| Infosys | HTML / CSS / HTTP fundamentals |
| Wipro | Java / backend / full-stack |
| IBM, Deloitte | Next.js + TypeScript + unit testing |
| Accenture | JS internals + Git workflows |
| TCS | Scenario design + managerial fit |
| Capgemini | Depth-with-follow-ups on a few core concepts |
| LTIMindtree | Zero-gap breadth |

Plan applications, and per-company prep, around that column.

## Market context (use with caution — single-board data)

- One job board's analysis of 6,138 frontend postings (June 2026): **React 41.1%**, Angular 20.3%, JavaScript 48.7% — no skill crosses 50%. India = 11.2% of postings. TypeScript carried the single largest salary premium over plain JavaScript in that dataset.
- Stack Overflow 2025 developer survey put React usage around 44.7%.
- A separate analysis claims React appears in roughly three-quarters of frontend job ads — **treat as weak**, methodology unstated.

**Reading:** React is dominant but not universal; TypeScript is the highest-leverage adjacent skill for both shortlisting and pay.

## Hiring-friction realities (community-reported, not skill issues)

- Ghosting and no-feedback loops are common, especially through third-party agencies.
- Infosys respondents report outright rejection when current CTC is high relative to years of experience.
- Referral is widely reported as more reliable than portal application for getting a first call.

Do not diagnose every rejection as a skill gap. See `06-failure-modes.md`.
