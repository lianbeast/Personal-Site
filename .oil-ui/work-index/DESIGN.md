# Work Index — design brief

## Scope

New sub-page `/work` on lianbeast.github.io/Personal-Site: a full, self-contained
index of every project — public originals, private client work, tools. It is a
**content page**: the catalogue itself is the hero; no landing-page slogan.

The home page's `src/config.ts` is being updated in the same pass to cover the
repo list as of 2026-10-12 (adds GitHub-Repos 200, marks the 4 private repos
204). That feed shows 12 recent non-fork repos incl. forks; the Work Index is
the curated, complete, filterable counterpart.

## Facts (verified against GitHub API + live probes, 2026-10-12)

| Repo | State | Live | Preview clip (public/deploy) |
|---|---|---|---|
| resume-website (career-site) | public | rahid.persipico.com | — (not recorded yet; will appear on next deploy cycle) |
| GitHub-Repos | public | lianbeast.github.io/GitHub-Repos/ (200) | none recorded yet |
| The-Sleep-Etiquette | public | 200 /coming-soon.html live | .jpg/.mp4 exists |
| Lian-Arch-Linux-Site | public | 200 | .jpg/.mp4 exists |
| Personal-Site | public | 200 | .jpg/.mp4 exists |
| hamna-Henna-Site | public | 200 | .jpg/.mp4 exists |
| EliteHuman | public | 200 | .jpg/.mp4 exists |
| debian-linux-site | public | 200 | .jpg/.mp4 exists |
| MrCaseandfix-website | private | no live | asset jpg exists (28k) |
| Tahas-Portfolio | private | no live | asset jpg exists (145k) |
| claude-brain | private | — | none |
| git-sync-manager | private | — | none |
| Spider-Man | private (local dir, no remote seen) | — | none |

Language / pushed-date / stars for public ones come from the GitHub API
(`src/lib/github.ts` already fetches non-forks, 3×100 pages; the index will
ship its own curated snapshot in `src/data/work.ts`, enriched live, with the
snapshot as fallback).

## Users & tasks

- Visitors (recruiters, collaborators, curious browsers): scan what exists,
  filter/see by medium, open a site or repo.
- Primary action: click through to a live site. Secondary: repo, read blurb.
- Devices: desktop first (the home page is pointer-driven with a custom
  cursor); mobile must reflow to one column.

## Content model (work.ts entries)

`{ name, blurb, category, kind: 'live'|'private'|'tool'|'self', url, repo?,
   live?, year, lang, status, note? }` — categories: Web experiences · Client
work · Tools & skills · Native · This site. Sensitive: privacy rule — do not
show the real private client's name in the live UI copy beyond what the repos
already publicly display on lianbeast.github.io — actually resume-website IS
public (career site, own brand). Private repos carry no client names anyway
(portfolio/repo names only). Keep entries by repo name as in config.

## Round 01 — directions

All candidates share: the dark #0A0A0A + gold #D4AF37 world (page contract —
they live under the same site), the catalogue content above, real filters, and
the hover→video preview idiom where a clip exists.

### C0 baseline — "current site" (live URL candidate)
The home page as it ships, for comparison. `kind: url`, dev server.

### C1 — Atlas (generation engine: the map room)
The home page's one interactive object is a live GIS map. Atlas is the Work
Index that site deserves: a geographic index of work.
- First screen is the interface itself (骨架: 画面即界面). A three-column
  full-height console: left rail = category "layers" with counts; centre =
  the cards grid (16:10 clips as map imagery); right = a details pane that
  loads the selected card's dossier (clip, links, stack, blurb). Top bar:
  search + result count + sort. State via ?focus=&q=.
- Tone: quiet, precise, high density, low glow. Mono-forward.
- Fonts: JetBrains Mono (UI, data) + existing Inter for prose in the dossier;
  display serif for names only when no clip present.
- Structure break: the card is never clicked to leave — selecting it loads
  the pane; leaving happens from the pane. Grid + detail as one surface.

### C2 — Dossier (engine: material × environment = archival paper × the
same night room; a physical dossier of a space program)
A printed review file rendered on screen. Editorial content-page version.
- First screen: a masthead band ("WORK INDEX · N files · 2022—2026 ·
  lianbeast") + the first two files already as full-width dossier rows:
  clip left or right (asymmetric), file number stamp, stamped field labels
  (CATEGORY · LIVE · STACK · YEAR), serif pull-quote blurb.
- Gold = stamp ink & hairline rules only, ≤5% coverage; paper texture over
  #0A0A0A; 2px rules; generous measure.
- Fonts: Playfair Display 600/700 (self-hosted woff2) + JetBrains Mono
  labels (self-hosted). Same families as the home page — continuity by
  reference, but organized as a paper file, which nothing on the site is.
- Memory moment: rows carry a "dossier stamp" (rotate -8°, double outline,
  faint) on the clip corner; hover lifts the clip + swaps to its mp4.
- Structure break: no cards — a stacked file layout whose grid is ruled like
  a record drawer, with field labels at 3:1 hierarchy.

### C3 — Broadsheet (engine: media form = the newspaper, taken literally;
the extreme/prototype-breaker)
The whole page is one sheet of newsprint set in the night palette; the
catalogue is typeset copy.
- Masthead: condensed-black WORK INDEX, dateline rules, colophon line.
  Body = 3-col newspaper (CSS columns) flowing the entries as short items:
  kicker (category), 1-line headline (name), 2-line standfirst (blurb),
  stats tail. One "above the fold" lead clip with caption. Section heads
  as inverted rules. A running ticker of live sites at the bottom.
- Fonts: Archivo 800/900 (self-hosted) for headlines; Space Grotesk/500 (or
  Inter as fallback) body; ui-monospace colophon.
- Risk: density vs legibility at mobile (collapses to 1 col, no ticker).

## Selection & acceptance

- User picks on the comparison page (or delegates with stated reasons).
- Acceptance: 390×844 reflow, 1280×900 + 200% zoom of key regions; reduced
  motion honored (hover-clip, stamps, ticker off); console errors clean; no
  horizontal overflow; keyboard focus visible.
- Deliverables live in this directory; shipped code under `src/` of the repo.
