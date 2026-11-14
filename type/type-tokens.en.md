# In-car type tokens v1.0

Scope: the in-car center display. Figma file lib test (T6kCgDUKJIt2e2TfDSZzp8), variable collection Type, text styles en/… and zh/…. The illustrated version is the Type Guide frame (1003:1665) on the 02 Type page. Web type still follows SPEC section 5.
Chinese version: [type-tokens.md](type-tokens.md).

---

## 0 How to read this file

- Every rule has an ID (FONT-01 and up). The Type Guide frame and the audit scripts use the same IDs. Type inside icons is covered by the icon guideline's TYPE-xx; the two never mix.
- Must: a violation fails. Should: the default; when you depart from it, give the ID and the reason.
- A text style = size + line height + weight + family. Color is not part of the style; pick it from the `text/` color tokens.

## 0a Start here: what are you writing?

| You are writing | Style | Spec | Weight |
|---|---|---|---|
| Speed | number/xl/medium | 88/96 | 500 |
| Nav distance, percentage readouts | number/l/medium | 40/48 | 500 |
| Temperature | number/m/semibold | 36/48 | 600 |
| Page and dialog titles, large buttons | title/medium | 28/36, CJK 28/40 | 500 |
| Gear and other short high-emphasis words | title/semibold | 28/36, CJK 28/40 | 600 |
| Main content, voice text | body/l/regular | 24/32, CJK 24/34 | 400 |
| ETA values, selected items | body/l/medium | 24/32, CJK 24/34 | 500 |
| Row labels, street names | body/m/regular | 22/30, CJK 22/32 | 400 |
| Medium buttons, emphasized labels | body/m/medium | 22/30, CJK 22/32 | 500 |
| Captions, units, subtitles | caption/regular | 20/26, CJK 20/28 | 400 |

Prefix the style with `en/` or `zh/`: Latin and numbers only use `en/`; any line with Chinese uses `zh/`. Large numbers exist only as `en/`.

## 1 Rules

### FONT-01 Styles only (must)
- Every text uses an `en/` or `zh/` text style. Never hand-set size, line height or weight.
- No sizes outside the scale. Never scale a component instance that contains text (it produces sizes such as 23.28, D-89); make a size variant instead.
- Check: audit `text-style` (every text layer uses an en/ or zh/ style) and `font-scale` (every size is on the scale).

### FONT-02 Fonts are variables (must)
- Each style binds its family, weight, size and line height to Type variables: `font/latin`, `font/cjk`, `weight/latin/*`, `weight/cjk/*`, `size/*`, `line/*`, `line-cjk/*`.
- To change a face, change only `font/latin` or `font/cjk` and the matching `weight/*` style names. Our own typeface will arrive the same way.

### FONT-03 Chinese uses zh styles (must)
- A line with any Chinese uses a `zh/` style for the whole line (Noto Sans SC, which carries its own Latin and numbers). Never mix two faces in one line.
- Latin and numbers only use `en/` styles (Inter).
- Chinese leading is taller, about 1.4 times the size, rounded to an even number: 28/40, 24/34, 22/32, 20/28.

### FONT-04 Three weights (must)
| Level | Latin | Chinese | Used for |
|---|---|---|---|
| High | Inter Semibold 600 | Noto Sans SC Bold | Large numbers and gear; rarely elsewhere |
| Normal | Inter Medium 500 | Noto Sans SC Medium | Titles, buttons, selected items, ETA values |
| Low | Inter Regular 400 | Noto Sans SC Regular | Body, labels, captions |
- Noto Sans SC has no 600, so high emphasis maps to Bold.
- Adjacent levels differ by at least one weight or one color step.

### FONT-05 Color before size (must)
- Build hierarchy with `text/1`, `text/2`, `text/3` first (the COLOR-13 alpha ladder), then weight. Never shrink the size to show hierarchy.

### FONT-06 Minimum 20 (must)
- `caption` 20/26 is the minimum size.
- `text/3` is for 24 px and up only (COLOR-05), so caption uses text/1 or text/2.

### FONT-07 Tabular numbers (must)
- Large and changing numbers (speed, distance, time, temperature, percentages) use tabular figures (OpenType `tnum`). In Figma, turn on Tabular figures in the text Details panel; in code, `font-variant-numeric: tabular-nums`.
- Units follow the number in `caption` or `body/m`, aligned on the baseline.

### FONT-08 Two large sizes at most (should)
- At most two large number sizes per screen.

### FONT-09 Zero tracking (must)
- Every style uses zero letter spacing. The gaps in P R N D are spaces, not tracking.

---

## 2 Variables (Type collection, one mode)

| Variable | Value | Note |
|---|---|---|
| font/latin | Inter | Latin and numbers |
| font/cjk | Noto Sans SC | Chinese and mixed lines |
| weight/latin/regular, medium, semibold | Regular, Medium, Semi Bold | Inter style names |
| weight/cjk/regular, medium, semibold | Regular, Medium, Bold | Noto Sans SC style names |
| size/number/xl, line/number/xl | 88, 96 | |
| size/number/l, line/number/l | 40, 48 | |
| size/number/m, line/number/m | 36, 48 | |
| size/title, line/title, line-cjk/title | 28, 36, 40 | |
| size/body/l, line/body/l, line-cjk/body/l | 24, 32, 34 | |
| size/body/m, line/body/m, line-cjk/body/m | 22, 30, 32 | |
| size/caption, line/caption, line-cjk/caption | 20, 26, 28 | |

## 3 Where the sizes come from

Sizes follow the approved key screens (the same principle as color COLOR-11). Counted on 2026-11-14 across 02 Components on the 05 Components page and 01 Key Screens on the 06 Screens page:

| Spec on screen | Count | Example | Style |
|---|---|---|---|
| 88 Medium | 7 | Speed 80 | number/xl |
| 40/48 Medium | 12 | 300 m, 0% to 100% | number/l |
| 36/48 Semibold | 14 | Temperature 22.0 | number/m |
| 28/36 Semibold | 42 | Gear P R N D | title/semibold |
| 28/36 Medium | 9 | km/h, large Confirm | title/medium |
| 24/32 Medium | 20 | 10:48, 18 min, voice card text | body/l/medium |
| 22/30 Medium | 20 | Then, 150 m, medium Confirm | body/m/medium |
| 22/30 Regular | 14 | Main Street, Windows, Temperature | body/m/regular |
| 20/26 Regular | 12 | Arrival, Time left | caption |

The screens use SF Pro; the tokens switch to Inter with the same size, leading and weight. Screen text layers do not use the new styles yet; when applying them, map one to one with the table above.

## 4 Migration record (2026-11-14)

- Deleted the seven old styles HMI/display, distance, value, title, body, body-strong and caption. No layer in the file used them.
- New Type variable collection (26 variables) and 17 text styles (10 en/, 7 zh/), all bound to variables.
- SPEC 13.1's in-car type table now points to this file; weights go from two (400, 500) to three; in-car UI moves from English only to Chinese as well.
- Doc/* text styles serve the guideline frames, are not in-car tokens and stay as they are.
