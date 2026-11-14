# Car Display Color Tokens v1.0

Scope: the center display of the car HMI, in two modes, Light (day) and Dark (night). Figma file lib test (T6kCgDUKJIt2e2TfDSZzp8), variable collections Primitives (raw colors) and Color (semantic). Web colors still follow SPEC section 2, and the web accent stays #1471D6.
Chinese version: [color-tokens.md](color-tokens.md).

---

## 0 How to read this file

- Every rule has an ID, for example COLOR-05. The Color Guide frame in Figma (922:11226, on the selected icon page) and the audit script use the same ID.
- Must: a violation fails. Should: the default; any deviation states the rule ID and the reason.
- Figma names the modes Light and Dark; the docs write Light (day) and Dark (night).
- This version has only the day and night modes, with no high-contrast mode.

## 1 Rules

### COLOR-01 Two layers (must)
- The `Primitives` collection has one mode and holds only color ramps, with no usage. Primitives are never bound directly to a layer.
- The `Color` collection has two modes, Light (day) and Dark (night). Every value is an alias of a primitive, never a hard-coded color.
- Components, icons and docs bind only to semantic tokens. The one exception is the primitive swatches in the Figma Color Guide frame, which bind to primitives to show the ramps.
- Check: audit `color-alias` (every semantic value is an alias) and `color-bind` (no layer is bound to a primitive or carries a hard-coded color)

### COLOR-02 Keep variable IDs (must)
- The Color collection is the former HMI / v0.1 renamed, with the same variable IDs, so every existing binding in icons and components is kept.
- Change a value by pointing it at a different primitive, never by deleting and recreating it. Renaming a token follows COLOR-10.

### COLOR-03 One blue (must)
- `accent`, `accent/fill`, `map/route` and `map/puck-arrow` all reference the same blues: `blue/500` #007AFF in Light and `blue/400` #0A84FF in Dark.
- No other token may introduce a second blue.

### COLOR-04 Using the accent (must)
- For what is current, on, or in progress: switches that are on, the selected underline, progress, selected values, icons that are on.
- Never for body text. At most one accent-filled primary button per screen.
- Text on the accent uses `on-accent` (white). Car buttons use type of 24 or larger, which counts as large text and needs 3:1: 4.02 in Light and 3.65 in Dark, both pass.

### COLOR-05 Contrast thresholds (must)
| Use | Threshold |
|---|---|
| Text under 24 (the smallest car type is 20) | ≥ 4.5:1 |
| Text of 24 or larger | ≥ 3:1 |
| Icons, control boundaries, status graphics | ≥ 3:1 |
| Two adjacent fills | ≥ 1.25:1; add a 1px border when it falls short (as in SPEC 3.1) |
- Measure on the surface the element actually sits on: canvas, face and raised must all pass.
- text/3 is only for type of 24 or larger and for icons; 20 px captions always use text/2 (text/3 reaches only 3.0 to 3.4 in Light and 4.0 to 4.3 on face and raised in Dark, short of 4.5).

### COLOR-06 Status colors (must)
- `danger`, `status/success` and `status/warning` always come with an icon or text; color alone never carries the meaning.
- Filled danger actions use `danger/fill` with white text.

### COLOR-07 Lines and borders (must)
- Lines use semi-transparent primitives (white or black with opacity), so they keep the same contrast on any surface.
- `line/face` borders a surface, `line/control` borders a control, and `line/selected` borders a selected block and is transparent in Dark.

### COLOR-08 Map palette (should)
- Map colors (land, water, parks, five road classes, traveled route, location puck) are a separate domain palette, stored as day and night primitives and exposed under the `map/` group. Only maps use them.

### COLOR-09 Naming (must)
- Primitives: `hue/step`, for example `blue/500` or `cool/925`; transparent colors: `white/a8`, `black/a5` (the number is the opacity in percent).
- Semantic: `role/level`, for example `text/1`, `bg/raised`, `status/warning`. Never put a color name in a semantic name.

### COLOR-10 Changing tokens (must)
- To change a value, change the primitive or the primitive a semantic token points to, never the layer.
- To rename or delete a semantic token, list the affected components and binding counts, and get the author's approval first.
- Recompute the COLOR-05 contrast tables after every change.

---

## 2 Primitives

### Neutral gray, day (pure gray)
| Token | Value | Used by |
|---|---|---|
| gray/0 | #FFFFFF | Light bg/raised, Dark icon/1, on-accent |
| gray/25 | #FAFAFA | Light bg/face |
| gray/50 | #F3F3F3 | Light bg/canvas, bg/pressed |
| gray/75 | #ECECEC | Light bg/track |
| gray/200 | #D2D2D2 | Light bg/mass |
| gray/500 | #8C8C8C | Light text/3, icon/3, switch/off |
| gray/600 | #6E6E6E | Light text/2, icon/2 |
| gray/950 | #1D1D1F | Light text/1, icon/1 |

### Neutral gray, night (slightly cool)
| Token | Value | Used by |
|---|---|---|
| cool/50 | #EDEDEF | Dark text/1 |
| cool/300 | #A0A0A4 | Dark text/2, icon/2 |
| cool/400 | #7A7A7E | Dark text/3, icon/3 |
| cool/450 | #6E6E72 | Dark switch/off |
| cool/750 | #3A3A3C | Dark bg/mass |
| cool/800 | #333336 | Dark bg/selected |
| cool/850 | #262628 | Dark bg/pressed |
| cool/900 | #1C1C1E | Dark bg/raised, bg/track |
| cool/925 | #141416 | Dark bg/face |
| cool/950 | #0A0A0B | Dark bg/canvas |

### Color
| Token | Value | Use |
|---|---|---|
| blue/500 | #007AFF | Light accent and route |
| blue/400 | #0A84FF | Dark accent and route |
| red/600 | #C62828 | Light danger and danger/fill |
| red/500 | #D9362B | Dark danger/fill |
| red/400 | #FF6B60 | Dark danger |
| green/600 | #1F9D3A | Light success |
| green/400 | #32D74B | Dark success |
| amber/600 | #B86E00 | Light warning |
| amber/400 | #FFB340 | Dark warning |
| green/nav | #248A3D | Navigation card |
| green/nav-next | #1B6B30 | Navigation card, next step |

### Transparent
| Token | Value |
|---|---|
| white/a8 | #FFFFFF 8% |
| white/a9 | #FFFFFF 9% |
| black/a5 | #000000 5% |
| black/a7 | #000000 7% |
| transparent | #000000 0% |

### Map (one set per mode)
| Token | Light | Dark |
|---|---|---|
| map/land | #FFFFFF | #1B1C20 |
| map/park | #DFF0E3 | #1A2220 |
| map/water | #CDE1F5 | #18283A |
| map/road-local | #E3E6EB | #25272C |
| map/road-tertiary | #D8DCE2 | #2C2F35 |
| map/road-secondary | #CDD2D9 | #33363D |
| map/road-primary | #C2C8D1 | #3A3E46 |
| map/road-motorway | #B4BCC7 | #43474F |
| map/route-traveled | #868C96 | #8E9299 |

In Primitives the map values live in two groups, `map-day/…` and `map-night/…`.

---

## 3 Semantic tokens (Color, Light / Dark)

| Token | Light | Dark | Use |
|---|---|---|---|
| bg/canvas | gray/50 | cool/950 | Bottom canvas |
| bg/face | gray/25 | cool/925 | Cards and panels |
| bg/raised | gray/0 | cool/900 | Raised blocks, overlays |
| bg/track | gray/75 | cool/900 | Slider and segmented-control tracks |
| bg/selected | gray/0 | cool/800 | Selected block |
| bg/pressed | gray/50 | cool/850 | Pressed state |
| bg/mass | gray/200 | cool/750 | Large neutral fills |
| line/face | black/a5 | white/a8 | Surface border |
| line/control | black/a7 | white/a9 | Control border |
| line/selected | black/a7 | transparent | Selected-block border, hidden in Dark |
| text/1 | gray/950 | cool/50 | Body text and titles |
| text/2 | gray/600 | cool/300 | Secondary text, 20 px captions |
| text/3 | gray/500 | cool/400 | Weak text of 24 or larger |
| icon/1 | gray/950 | gray/0 | Primary icons, pure white in Dark |
| icon/2 | gray/600 | cool/300 | Secondary icons |
| icon/3 | gray/500 | cool/400 | Weak or unselected icons |
| accent | blue/500 | blue/400 | On, selected, progress |
| accent/fill | blue/500 | blue/400 | Primary button fill, at most one per screen |
| on-accent | gray/0 | gray/0 | Text and icons on the accent |
| switch/off | gray/500 | cool/450 | Track of a switch that is off |
| danger | red/600 | red/400 | Error text and graphics |
| danger/fill | red/600 | red/500 | Destructive button fill |
| status/success | green/600 | green/400 | Success graphics |
| status/warning | amber/600 | amber/400 | Warning graphics |
| nav/background | green/nav | green/nav | Navigation card |
| nav/next | green/nav-next | green/nav-next | Navigation card, next step |
| map/land and 8 more | map-day/* | map-night/* | Map base, five road classes, traveled route |
| map/route | blue/500 | blue/400 | Planned route, the same blue as the accent |
| map/puck | gray/0 | gray/0 | Location puck |
| map/puck-arrow | blue/500 | blue/400 | Location puck arrow |

The `Settings reference` collection holds calibration colors from the reference files. Per SPEC it is only for comparison and is not part of the tokens.

### Variables migrated to Library-test

These are the six variables added to Figma's `Color` collection and their current mode values. Colors are shown in hex with separate opacity values. The visibility variables are booleans.

| Token | Light | Dark | Use |
|---|---|---|---|
| `bg/base` | `slate/100` (#E4E7EC) | `gray/950` (#1D1D1F) | Base background beneath the map |
| `sr/scrim` | #F5F6F8 at 90% | #1C1C1E at 75% | First stop of the SR information scrim |
| `sr/scrim-mid` | #F5F6F8 at 85% | #1C1C1E at 70% | Middle stop of the SR information scrim |
| `sr/scrim-fade` | #F5F6F8 at 0% | #1C1C1E at 0% | Transparent stop of the SR information scrim, preserving its hue |
| `theme/is-dark` | `false` | `true` | Controls visibility of the dark SR layer |
| `theme/is-light` | `true` | `false` | Controls visibility of the light SR layer |


---

## 4 Measured contrast

Light:
| Foreground | canvas #F3F3F3 | face #FAFAFA | raised #FFFFFF | Result |
|---|---|---|---|---|
| text/1 | 15.17 | 16.12 | 16.83 | Pass |
| text/2 | 4.60 | 4.89 | 5.10 | Pass |
| text/3 | 3.03 | 3.22 | 3.36 | Only for type of 24 or larger and icons (COLOR-05) |
| accent #007AFF | 3.62 | 3.85 | 4.02 | Pass for graphics and large text |
| danger | 5.07 | 5.39 | 5.62 | Pass |
| success | 3.18 | 3.39 | 3.53 | Pass for graphics; pair with text colors for words |
| warning | 3.59 | 3.82 | 3.99 | Same as success |
| White on accent | 4.02 | | | Pass for large text |

Dark:
| Foreground | canvas #0A0A0B | face #141416 | raised #1C1C1E | Result |
|---|---|---|---|---|
| text/1 | 16.93 | 15.74 | 14.55 | Pass |
| text/2 | 7.59 | 7.06 | 6.53 | Pass |
| text/3 | 4.63 | 4.30 | 3.98 | Only for type of 24 or larger and icons (COLOR-05) |
| accent #0A84FF | 5.43 | 5.04 | 4.66 | Pass |
| danger | 7.09 | 6.59 | 6.10 | Pass |
| White on accent | 3.65 | | | Pass for large text |

---

## 5 Migration record (2026-11-13)

- HMI / v0.1 was renamed Color, and all 38 semantic tokens now alias Primitives. The accent moved from #1471D6 to Apple system blue.
- Dark icon/2 and icon/3 now match text/2 and text/3 (#A0A0A0 to #A0A0A4, #7A7A7A to #7A7A7E).
- Removed the duplicate ink (its 2 bindings moved to text/1) and the 3 unbound source/sidebar/* calibration colors.
- Removed the unbound old collections: DS / Primitives, DS / Theme, DS / Metrics, Cockpit / Primitives, Cockpit / Semantic, Cockpit / Metrics.
- Not handled yet: about 10,000 bindings on the Components and Work pages that point to variables from external libraries, and about 14,000 hard-coded colors. These wait for the component rebinding stage.
