# 06 — Why Candidates Fail, and the 3+ Years Line

## What separates a 3+ year candidate from a junior

Observable directly in the transcripts, not theory:

| Junior signal | 3+ years signal |
|---|---|
| "useMemo caches values" | Explains that over-caching costs memory, needs maintenance, and doesn't help fast-changing data |
| "Redux stores global state" | Names normalised state shape, narrowed `useSelector` calls, memoised selectors, batching as distinct levers |
| Fetches in `useEffect` | Handles error states and retry logic; cancels stale requests; explains why fetch belongs there |
| Describes the project | Designs a new one live: routes, public vs protected, three parallel API sections, navigation |
| Knows hooks | Explains **why** a specific component re-rendered, down to referential equality |
| Uses Git | Reverts a pushed commit, moves branches with a dirty working tree, resolves conflicts |
| Answers the question | Answers exactly what was asked, without volunteering extra surface for cross-questioning |

**The compressed rule: juniors describe features, mid-levels describe decisions.** Every strong reported answer has the shape *option A vs option B, and here's the condition that decides it*.

## Most common reasons candidates fail

Ordered by how often they appear across reports:

1. **Definitional knowledge that collapses on the first follow-up.** The Capgemini interviewer was explicitly less interested in memorised definitions than in explanation with examples and use cases.
2. **A single breadth gap in a short screen.** The LTIMindtree rejection was one unanswered question out of three. In a 30–45 minute round, one blank is 20–33% of the signal.
3. **React fluency without JS internals.** Whole sections on hoisting, TDZ, scope shadowing and event-loop ordering — none of which daily React work exercises.
4. **Can't reason about re-renders.** The canonical version: a seven-year React candidate froze on referential equality of inline-created objects.
5. **Résumé–JD mismatch, discovered mid-interview.** IBM ending a round early over Next.js and unit testing; LTIMindtree grilling a self-declared backend candidate on React/Redux anyway.
6. **Bluffing.** The Capgemini candidate's own stated lesson: admitting he'd skipped `AbortController` worked better than inventing an answer.
7. **Machine coding with no plan** — over-building, nothing running at the buzzer.
8. **Managerial-round friction** — notice period, relocation, why you're leaving. Non-technical, and it kills offers late.

## Failures that are not skill failures

Be honest in your post-mortems. Reports also contain substantial *process* failure:

- Ghosting and no feedback, especially via third-party agencies
- CTC-band mismatch (Infosys respondents report outright rejection when current CTC is high for the years of experience)
- Requisitions filled internally or cancelled
- Level mismatch (strong across all rounds, rejected on levelling)
- Portal applications that never surface — referral is widely reported as the more reliable path

**Diagnostic question after a rejection:** did you fail *in* a round, or never get feedback at all? Only the first is a study problem. The second is a channel problem — see `10-naukri-linkedin-playbook.md`.

## The one-line self-test

> Can you take any topic on your CV, state a tradeoff, and name the condition under which you'd choose the other option?

If not, that topic is a liability, not an asset.
