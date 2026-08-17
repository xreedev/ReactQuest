# 08 — CV Anatomy

## The four gates (optimise in this order)

1. **Naukri Resdex search** — recruiters find you via database searches even if you never applied. Resdex uses separate Any/All/Exclude keyword boxes capped at roughly 500 characters, so recruiters use **few, short, exact keywords**.
2. **Ranking within that search** — Naukri ranks on profile completeness, keyword match, profile views and recency; the searched term in your headline lifts you into the featured section.
3. **Human scan — 6 to 7 seconds.** Headline, current title, current company, skills line, top two bullets. Nothing else is read.
4. **Panel read** — the interviewer skims your CV 60 seconds before the call and pulls questions from it.

Most candidates polish gate 3 and neglect gates 1–2, which is where the volume actually comes from.

## Format constraints (parser-driven, non-negotiable)

- **Single column.** The two-column template with a sidebar skills bar is the most common self-inflicted wound — it parses into garbage.
- Standard fonts, standard section headings (Experience, Skills, Education)
- **No tables, no columns, no graphics, no skill bars, no photo**
- One page for 0–5 years; two only past ~10
- Save as text-based PDF (keep a .docx variant; note that some engineers advise against submitting DOCX where the portal accepts PDF, and some older ATS dislike embedded links — printing the PDF to PDF strips active content if needed)
- 6–10 skills highlighted; every bullet opens with an action verb

## Section order

1. Name + one-line contact (phone, email, city, LinkedIn, GitHub/portfolio — clickable, no photo)
2. **Profile title** — literally "React Developer" or "Frontend Developer — React"
3. Summary (3 lines max)
4. **Technical skills** — before experience; this is what gets scanned and parsed
5. Experience, reverse-chronological
6. Projects — only if they add something experience doesn't
7. Education, certifications

At 3+ years you write a **summary**, not an objective — and you write it last, after everything else, so you can pick your actual highlights.

## The summary — 3 lines, keyword-dense, claim-light

> Frontend Developer with 3.5 years building production React applications in [domain]. Hands-on with React 18, TypeScript, Redux Toolkit, REST integration and performance optimisation. Experience across the full delivery cycle in Agile teams — requirement analysis, component design, code review and production support.

Why this shape: front-loads the exact tokens a Resdex query contains; states years explicitly (an experience-range filter field); signals the service-company vocabulary the managerial round will probe.

## The skills block — versions and specificity, not adjectives

Naukri's IT Skills section lets you list technologies with experience levels and version numbers, and it is a primary search target. Mirror it:

```
Languages:      JavaScript (ES6+), TypeScript, HTML5, CSS3
Frameworks:     React 18, Next.js, React Router, Redux Toolkit, Context API
Styling:        Tailwind CSS, SCSS, Material UI, responsive/cross-browser
API & Data:     REST, Axios, React Query, JWT auth
Testing:        Jest, React Testing Library
Tooling:        Git, GitHub Actions, Webpack, Vite, ESLint, Chrome DevTools
Practices:      Agile/Scrum, code review, unit testing, performance optimisation
```

Two rules that pull against each other and both matter:

- **Mirror the JD.** ATS filters on the named technologies; reorder so the most relevant appear first.
- **Never list what you can't defend.** The TCS-selected candidate's first résumé tip was: do not put any technology on your résumé that you do not know. This is tactical, not moral — a bluffed keyword becomes one of the three questions that decide the round.

**Include synonyms deliberately.** Indian job titles vary widely (backend developer / software engineer / SDE often mean the same thing) and searches miss on synonyms (Bangalore vs Bengaluru). Write "React.js / ReactJS", "Frontend / UI Developer", and both city spellings. Cheap, invisible, effective.

## Experience bullets — the real differentiator

Use **Google's XYZ formula**: *Accomplished [X] as measured by [Y], by doing [Z]*. (Variant heard in the wild: "Did [Z] and accomplished [X] as measured by [Y]" — ordering is debated, structure is not.) A close cousin is Accomplishment-Measurement-Action.

| Weak (duty) | Strong (decision + result) |
|---|---|
| Developed UI components using React | Built a 20-component shared library used across 3 modules, cutting duplicate UI code and standardising form validation |
| Used Redux for state management | Migrated legacy Redux to Redux Toolkit; normalised store shape and added memoised selectors, removing redundant re-renders on the dashboard |
| Integrated REST APIs | Rebuilt the search flow with debounced input and request cancellation, eliminating stale-response race conditions on fast typing |
| Optimised application performance | Cut initial bundle via route-level code splitting and lazy loading; reduced first-load time on the reports screen from ~5s to under 2s |
| Worked in Agile team | Owned end-to-end delivery of the onboarding module across 6 sprints; reviewed peers' PRs and wrote the unit test plan |
| Fixed bugs | Debugged and resolved a production memo-invalidation issue causing repeated API calls, using React DevTools Profiler |

**Two properties of the strong column:**
1. Every bullet is *bait* — it invites exactly the questions these companies ask (re-render control, Redux optimisation, `AbortController`, code splitting, code review). A CV that seeds the questions you've prepared is doing strategic work.
2. Where you lack instrumented numbers, use honest relative ones (bundle size before/after, component count, sprint count, defect count). **Never invent a percentage** — "how did you measure that?" ends the interview.

**Conversion trick:** rewrite each bullet as XYZ and insert a literal `[Y: ___]` placeholder wherever you can't supply a number. Then either find the number or delete the claim.

## Projects

At 3+ years, projects are **optional** — cut them if your work experience is strong. Keep one only if it shows something your job doesn't (TypeScript, Next.js, testing). One line of description, one line of stack, live link + repo.

Drop projects that are 2–3 years old and unmaintained; they signal junior. Keep the important information at the top.

## Red flags that kill an otherwise fine CV

1. Two-column / graphical template — parser mangles it
2. Skills you can't defend
3. Duty lists with no outcomes — indistinguishable from every other 3-year CV in the stack
4. No years-of-experience number in the headline/summary — experience-range filters are set first
5. Missing notice period / CTC on Naukri — invisible to filtered searches
6. Stale portfolio projects
7. Generic summary paragraph — spends the 6-second budget on adjectives
8. Two pages at 3 years — reads as padding
9. Keyword stuffing — repeated keywords instead of examples and proof reads as spam to the human
10. Wall of text with no white space
