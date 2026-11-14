# Reference analysis: settings screen

Source: the "设置" reference (1151 × 1003) the author placed on the Examples page in Library-test. We learn ratios, relationships and component structure only, not font sizes or absolute sizes (author's decision, D-123). Converting to our 1000-wide app area is about × 0.87.

## 1 Zones

| Item | Reference | Ratio / relationship | Ours |
| --- | --- | --- | --- |
| Side nav width | 248 | 21.5% of the app area | 240 |
| Left/right split | nav #0E1011, content #141416, one step darker; no vertical line | tone separates | nav surface/canvas, content surface/panel, no line |
| Content side margins | 60 / 60 | about 5% | space/48 |
| Content top | 72 to the first section title | | space/40 |
| Scrolling | 4-wide scrollbar on the right, white 25% | content never fades | scrollbar, fill/scrollbar |

## 2 Side nav

| Item | Reference | Ours |
| --- | --- | --- |
| Pitch | 80 per item, no gaps | 64 pill + 8 gap |
| Selected | 224 × 70 pill, 12 inset each side, white 10% | fill/2, 12 inset |
| Icon | 36 frame, 26 ink, mostly filled | 48 frame, filled family |
| Icon to label | 12 | 12 |
| Unselected | only the icon drops to 50%; the label stays 100% white | label text/1, icon secondary |
| Groups | 1 px white 10%, 32 inset each side | border/panel, 20 inset |
| First item from top | 45 | space/32 |
| Title | none | no app name |

## 3 Content rhythm

| Item | Reference | Ratio | Ours |
| --- | --- | --- | --- |
| Section title | 20, white 100%, left-aligned with cards | | list-header: 20, text/1, no padding |
| Title to content | 43 | 1 | space/32 |
| Content to divider | 63 | about 1.5 | space/48 |
| Divider to next title | 34 | about 0.8 | space/32 |
| Divider | full content width, 1 px white 10% | | border/panel |
| Card gap | 23–24 both ways | | space/20 |

## 4 Cards

| Item | Reference | Ours |
| --- | --- | --- |
| Fill | solid #1C1C1E, one step lighter than the content | surface/raised |
| Three columns | 246 × 124; three plus gaps equal the content width | 208 × 112; 3 × 208 + 2 × 20 = 664 |
| Two columns | 380 × 124 | 322 × 112 |
| Structure | icon top left in a 44 frame (60%), title bottom left 24, status top right 18 bold, info icon 29 (50%) next to the title | icon top left 40, title bottom left 24, status top right 20 |
| Selected | blue gradient with two blurred light blobs | accent/subtle for now; gradient approach to be decided |

## 5 Icons

- Mostly filled, with cut-outs made by boolean union and subtract.
- Outline parts use 2.5–3 in 28–44 frames, about 3.3–4.3 at 48. So our icon stroke moves from 2 to 3 (BASE-06) and we add a filled family (icon guideline section 12).

## 6 Type

18 (status, bold), 20 (section title), 21 (menu), 24 (card title), all regular weight; hierarchy comes mostly from size and opacity. We keep two sizes, 24 and 20 (CMP-16); status uses 20.
