# AGENTS.md — Kanade & Iyer Landing Page

## Stack
- Plain HTML5 + CSS3, no frameworks, no libraries, no photography. No JS yet — add `main.js` only if interactive features require it.
- Fonts: Inter via Google Fonts `@import` in `style.css:1`.

## Conventions
- Mobile-first CSS: base styles for 360px, then `@media (min-width:700px)` and `(min-width:1024px)`.
- Design tokens only — all colors, spacing, type sizes via `:root` custom properties in `style.css`. No raw hex/px in rules.
- Semantic HTML — proper h1/h2 hierarchy, no div-soup, real `<label for>` on form fields.
- Advisory voice in all copy — no exclamation marks, no imperative/shouting CTAs. See `BRAIN.md` for full brand voice.
- Fees/pricing never appear in the hero section.
- Filenames lowercase, matched exactly in links (case-sensitive Linux deploy target).
- Clean URLs — no `.html` extensions in internal links where avoidable.

## Environment (Windows-native — read before proposing any command)
- Shell is Windows PowerShell 5.1 (even if launched from PowerShell 7). All proposed commands must be PS 5.1-legal.
- No `&&` or `||` — chain commands with `;` or issue one per line.
- Repo paths, git arguments, and URLs use `/` (forward slash) — do not convert to `\`.
- Local filesystem navigation (New-Item, Set-Location, Remove-Item) uses `\`.
- No Unix commands: use PowerShell equivalents (`Remove-Item`, `New-Item`, `Get-ChildItem` instead of `rm`, `touch`, `ls`). `chmod` has no effect locally.
- Deployment target is a case-sensitive Linux host — filename case and link case must match exactly.

## Boundaries
- Agent edits code files inside `kanade-iyer/` only. Never modify `BRAIN.md` (human-owned).
- Every proposed command must be reviewed by the human before execution — treat it as a diff to the filesystem.
- If agent proposes bash syntax: correct it in the moment — "That's bash syntax; this machine is Windows PowerShell 5.1; re-issue PowerShell-native per AGENTS.md."

## Model
- Confirm designated model at session start.
- Track token usage via `opencode stats` per session.

## Quick reference
- **No build, test, lint, or typecheck commands exist** — this is a static site. Preview by opening `index.html` in a browser.
- Source: `index.html`, `style.css`. All other files are documentation.
- `BRAIN.md` contains brand decisions (coverage ratios, token roles, voice rules, fees placement). Consult it for copy/style guidance.
- `CRITIQUE-LOG.md` tracks known minor issues — check before introducing new work.