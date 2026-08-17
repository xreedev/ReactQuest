# 09 — Real Public CVs, Templates, and Reuse Ethics

## Honest finding first

The "here's the actual CV that got me in, use it" genre is **abundant for FAANG / product / new-grad, and almost nonexistent for Indian IT-services lateral React roles.** Nobody blogs "the CV that got me into TCS as a 3-year React dev."

So use two different source types for two different jobs:
- **Deliberately-shared real CVs** → structure, bullet craft, one-page discipline
- **Service-company format guidance** → keywords, India-specific fields, parser survival (and treat vendor claims sceptically)

---

## A. CVs and templates published for reuse

### 1. `dphang/resume` — closest to what you want
https://github.com/dphang/resume
Single-page LaTeX SWE resume. The author states the format worked to get recruiter interviews at both small and large tech companies (Microsoft, Google, Square, Uber, Compass) and that he saw no major issues with automated screeners. Argues the single page forces you to list only what matters. Overleaf-ready.
**An actual outcome claim attached to an actual artifact. Start here.**

### 2. `sb2nov/resume` (Sourabh Bajaj)
https://github.com/sb2nov/resume
Single-page, one-column, built on base LaTeX templates and fonts. Documented sections, custom commands for consistent formatting. Three main sections: education, experience, projects. The author's stated reason for one column: two-column and multi-page templates didn't work well for career fairs or online applications — **i.e. application-channel survival**, exactly the Naukri/Taleo problem.

### 3. Jake's Resume
https://www.overleaf.com/latex/templates/jakes-resume/syzfjbzwjncs · https://github.com/jakeryang/resume
MIT-licensed, simple and straightforward. The most-used SWE template in the world. Its ubiquity is a feature: parsers have effectively been trained on it. **If you think about nothing else, use this.**

### 4. Deedy-Resume (Debarghya Das)
Widely forked; base of many public resumes (e.g. https://github.com/davidherrera83/david-herrera-resume, which describes itself as a two-column ATS-approved adaptation).
⚠️ **Caveat: Deedy is two-column.** Fine for FAANG portals and referrals; a real risk on Indian enterprise ATS and Naukri parsing. **Avoid for TCS/Infosys/Wipro applications** despite its popularity.

### 5. Anubhav Singh's template (Indian dev, MIT)
https://www.overleaf.com/latex/templates/resume-template-by-anubhav/dhmkrwtksdgy · GitHub: xprilion
Single-column, with sections for experience, projects, honours/awards and volunteer experience. Useful because that section mix matches Indian résumé conventions better than US templates.

### 6. Personal MIT-licensed resume repos
e.g. https://github.com/denismurphy/resume — LaTeX, author explicitly invites forking and offers help getting started. Dozens of these exist; the pattern is consistent enough that one is as good as another.
Also: https://github.com/oswinrodrigues/resume · https://github.com/loganleon/resume (billryan lineage) · https://github.com/Erik-Cupsa/ResumeTemplate · https://github.com/thepranaygupta/resume-latex-template

### 7. "The resume that got me a remote dev job" — Akhlas Hussain (Medium)
https://medium.com/@akhlashussain/resume-that-got-me-a-full-time-remote-dev-job-f221f2103448
A B.Tech CSE graduate walks through the resume that got him callbacks, section by section, and links the template at the end for readers to use. Concrete advice: header = name, mobile, email and clickable links (GitHub, LinkedIn, portfolio); GitHub is fine if you have no portfolio site; **never a photo** — recruiters don't care and ATS struggles with images.
Fresher-level, but the annotate-your-own-CV format is exactly the genre.

### 8. "Resume that got shortlisted with Google, Amazon, Microsoft" — Shristy Thakur (Medium)
https://medium.com/@shristythakur2003/resume-that-shortlisted-with-google-amazon-microsoft-etc-7b6e67c57ec9
Written after readers asked her to share it. Her rules: **be truthful, because your interviews will be based on your resume and you need to actually know everything on it**; polish the linked coding profiles, GitHub and LinkedIn too; spend 15–30 minutes a week improving it.
The truthfulness rule matches the TCS-selected candidate's advice almost word for word — two people, two market tiers, same conclusion.

### 9. Free tooling
- **Reactive Resume** — open-source builder, clean PDF export
- **OhMyCV** (ohmycv.app) — Markdown + CSS, no login
- **JSON Resume** (jsonresume.org) — open schema + CLI + themes
- **GitHub Resume** (resume.github.io) — auto-generates from your GitHub profile
- **Google Doc template by Gergely Orosz** (The Pragmatic Engineer) — developer-friendly, from someone who has screened at scale
- **Overleaf** — hosts most of the templates above

### 10. Blind's aggregated resume guide (crowd review, not one CV)
https://www.teamblind.com/resources/software-engineer-resume-guide-real-advice-from-tech-professionals-on-blind
Built from real resume-review and "roast my resume" threads. Recurring reviewer critiques: listing what you did instead of what it accomplished; walls of text with no white space; skills sections that list everything you've touched instead of grouping by Languages / Frameworks / Tools and leading with what matches the job.

---

## B. What all the shared CVs converge on

1. **One page, one column** — stated by multiple template authors as an application-channel constraint, not a style preference
2. Contact block: name, phone, email, GitHub, LinkedIn, portfolio — clickable, **no photo**
3. Three load-bearing sections: **Experience, Projects, Education** (+ Skills). Everything else is garnish
4. Bullets are outcome-shaped, not duty-shaped
5. No graphics, skill bars, columns or photos
6. Nothing on the page the author can't defend under questioning

---

## C. Reuse ethics — the line that matters

One public repo states it perfectly: **the résumé *format* is MIT-licensed, while its *content* is restricted to the author's use alone.**

That's the rule for all of them, spelled out or not:

| Take | Never take |
|---|---|
| Structure, section order | Their achievements |
| LaTeX / CSS / typography | Their metrics |
| Bullet grammar and phrasing patterns | Their project descriptions |
| One-page discipline | Their company work |

Copying someone's bullet with your name on it fails at the exact moment the interviewer asks a follow-up — which, per `01` and `04`, these companies always do. It's also the failure mode that sank candidates at LTIMindtree and nearly at Capgemini.

**Check the licence on each repo before reuse.** MIT/Apache on the template usually covers the format; content is the author's regardless.

---

## D. What the public-CV corpus won't give you

None of these are calibrated to Indian IT-services lateral hiring. You need fields the FAANG-oriented templates lack: **current CTC, expected CTC, notice period, preferred locations, total vs relevant experience.** See `10-naukri-linkedin-playbook.md`.

⚠️ **Vendor claims — treat as unverified.** Resume-tool sites claim specifics such as "Infosys uses internal iRecruit plus SmartRecruiters for laterals" and "Wipro uses Phenom People." These are commercially motivated and unsourced. The *underlying* claim — that resumes are parsed and keyword-scored before human review — is well supported and matches Naukri's documented Resdex behaviour.

---

## E. What to actually do

1. **Fork `dphang/resume` or Jake's Resume.** One column, one page, Overleaf. Skip Deedy for Indian service-company applications.
2. **Rewrite every bullet through XYZ**, using the `[Y: ___]` placeholder to expose unquantified claims.
3. **Maintain two variants from one master:** a clean FAANG/product version, and an India-services version carrying CTC/notice/location and heavier keyword density.
4. **Keep the truthfulness rule absolute** — both published-CV authors above make it their #1 point independently, and it's the same failure mode the interview research surfaced.
