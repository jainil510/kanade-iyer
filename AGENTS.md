# AGENTS.md — Kanade & Iyer Landing Page

## Stack
- Plain HTML5, CSS3, vanilla JS (optional main.js). No frameworks, no libraries, no photography.
- Fonts: Inter (Google Fonts import).

## Conventions
- Mobile-first CSS: base styles for 360px, then @media (min-width:700px) and (min-width:1024px).
- Design tokens only — all colors, spacing, type sizes via :root custom properties in style.css. No raw hex/px scattered in rules.
- Semantic HTML — proper h1/h2 hierarchy, no div-soup, real <label for> on form fields.
- Advisory voice in all copy — no exclamation marks, no imperative/shouting CTAs.
- Fees/pricing never appear in the hero section.
- Filenames lowercase, matched exactly in links (case-sensitive Linux deploy target).
- Clean URLs — no .html extensions in internal links where avoidable.

## Environment (Windows-native — read before proposing any command)
- Shell is Windows PowerShell 5.1, even if launched from PowerShell 7. All proposed commands must be PS 5.1-legal.
- No `&&` or `||` — chain commands with `;` or issue one per line.
- Repo paths, git arguments, and URLs use `/` (forward slash) — this is correct on Windows, do not convert to `\`.
- Local filesystem navigation only (New-Item, Set-Location, Remove-Item) uses `\`.
- Do not propose Unix commands: no `rm -rf`, `touch`, `ls -la`, `chmod`, `mv` with Unix-style paths. Use PowerShell-native equivalents (Remove-Item, New-Item, Get-ChildItem).
- `chmod` has no effect locally — permissions are a Linux server concern (Day 1 §2.6), not Windows.
- Deployment target is a case-sensitive Linux host — filename case and link case must match exactly.

## Boundaries
- Agent may draft/edit code files inside kanade-iyer/ only, unless explicitly told otherwise.
- Agent must not modify BRAIN.md — that file is human-owned only.
- Every proposed command must be reviewed by the human before execution — treat it as a diff to the filesystem.
- If agent proposes bash syntax: correct it in the moment — "That's bash syntax; this machine is Windows PowerShell 5.1; re-issue PowerShell-native per AGENTS.md."

## Model
- Confirm designated model at session start.
- Track token usage via `opencode stats` per session.