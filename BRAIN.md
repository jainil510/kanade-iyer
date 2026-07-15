# Brand Decode: Kanade & Iyer, Chartered Accountants

## Idea
- "Measured advice, in order" — calm, precise, unhurried; not a startup, not flashy.

## Coverage Ratios
- Paper (Ledger Cream) ~80% . Ink (Slate Ink) ~15% . Accent (Audit Navy) ~5% (headings' rule-lines, button, links) . Confirm Green — form success only.

## Type Roles
- --step-display: hero/display headline (clamp 2rem–4rem)
- --step-title: section titles (1.4rem)
- --step-body: body copy (1rem / 1.6–1.65 line-height)
- --step-label: labels & small text (0.85rem, letterspaced)

## Voice Rules
- Verbs describe, never command ("Book a consultation" not "Book NOW!").
- Claims are specific with numbers, not superlatives ("15 years, 400+ clients" not "world-class").
- No exclamation marks anywhere in UI copy.

## Laws (this engagement)
- Advisory voice throughout — never salesy or urgent.
- Fees never appear in the hero section.
- No stock photography (handshakes/skylines) — type and space are the design.

## Fees Placement Decision
- Placement: dedicated "Fees" section, after "Why this firm" (credentials) and before Contact.
- Reasoning: visitor trust builds first through credentials (15 years, ICAI, 400+ clients), so fee transparency lands as confidence not a sales pitch. Placing it right before Contact keeps pricing close to the action without it appearing in the hero, honoring the client's law.

## Decision Log

### Decision 1 — Footer background inversion
- What: Footer uses --ink background with --paper text, breaking the standard 80/15/5 paper-dominant ratio.
- Reasoning: A footer is small, factual, and functional (firm name, ICAI registration, location) — not decorative. At full-page scale it's a tiny fraction of total area, so it doesn't meaningfully violate the ratio. It also closes a semantic gap (footer landmark was missing per checklist A4).

### Decision 2 — Critique catch: accent color overuse
- What I found: Early build had --accent (navy) applied directly to every heading (h1, h2, h3, partner names) — same color, same weight, everywhere.
- Why it was wrong: Brand sheet specifies accent at only ~5% coverage, reserved for rule-lines, buttons, and link states — not as default heading-text color. Using it everywhere flattened hierarchy and quietly broke the stated color ratio (checklist B4).
- Fix: Moved heading text to --ink, added a consistent thin --accent rule-line beneath each section heading instead. This keeps accent usage close to its intended ~5% role and restores visual hierarchy — headings now read as confident dark type, not all-navy.
- Lesson: AI-generated pages tend to over-apply the "brand color" wherever a heading exists, because it looks technically on-brand at a glance. The actual brand system computes color by ratio/role across the whole page, not by "use accent for anything that seems important." Always check accumulated color coverage across the entire page, not just individual elements in isolation.