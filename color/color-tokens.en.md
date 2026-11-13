# Car Display Color Tokens v1.2

Scope: the center display of the car HMI, in two modes, Light (day) and Dark (night). Figma file lib test (T6kCgDUKJIt2e2TfDSZzp8), variable collections Primitives (raw colors) and Color (semantic). Web colors still follow SPEC section 2, and the web accent stays #1471D6.
Chinese version: [color-tokens.md](color-tokens.md).

---

## 0 How to read this file

- Every rule has an ID, for example COLOR-05. The Color Guide frame in Figma (932:1829, on the selected icon page) and the audit script use the same ID.
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
- 20 px type on bg/screen (status bar, Dock) uses text/1: Light text/2 reaches only 4.09 on #E4E7EC.

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

### COLOR-11 Key screens win (must)
- The approved key screens (Key A and Key B on the Components page, one per mode) are the color baseline. When tokens and those screens differ, change the token values, not the screens.
- Text on 3D scenes and images uses `text/on-media`, white in both modes; the scene itself switches between day and night through its component variants, not through color tokens.
- To verify, copy a Dark key screen, switch it to Light and compare it with the Light design; apart from scene images they should match.

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
| gray/600 | #6E6E73 | Light text/2, icon/2 |
| gray/950 | #1D1D1F | Light text/1, icon/1 |
| gray/1000 | #000000 | Dark bg/screen |
| slate/100 | #E4E7EC | Light bg/screen |

### Neutral gray, night (slightly cool)
| Token | Value | Used by |
|---|---|---|
| cool/50 | #EDEDEF | Spare (Dark text/1 now uses gray/0) |
| cool/250 | #BCBEC2 | nav/secondary |
| cool/300 | #98989F | Dark text/2, icon/2 |
| cool/400 | #7A7A7E | Dark text/3, icon/3 |
| cool/450 | #6E6E72 | Dark switch/off |
| cool/700 | #494951 | bg/app-tile |
| cool/750 | #3A3A3C | Dark bg/mass |
| cool/800 | #333336 | Dark bg/selected |
| cool/820 | #2C2C2E | Dark control/fill |
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
| white/a15 | #FFFFFF 15% |
| black/a20 | #000000 20% |
| slate/a10 | #0F1729 10% |
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
| bg/screen | slate/100 | gray/1000 | Full screen, under the status bar and Dock |
| bg/canvas | gray/50 | cool/950 | Bottom canvas |
| bg/face | gray/25 | cool/925 | Cards and panels |
| bg/raised | gray/0 | cool/900 | Raised blocks and panels |
| control/fill | gray/0 | cool/820 | Controls over the map (ETA bar, map buttons) |
| bg/track | gray/75 | cool/900 | Slider and segmented-control tracks |
| bg/selected | gray/0 | cool/800 | Selected block |
| bg/pressed | gray/50 | cool/850 | Pressed state |
| bg/mass | gray/200 | cool/750 | Large neutral fills |
| bg/app-tile | cool/700 | cool/700 | Dock app tile, same in both modes |
| line/face | slate/a10 | white/a8 | Surface border |
| line/control | black/a7 | white/a9 | Control border |
| line/selected | black/a7 | transparent | Selected-block border, hidden in Dark |
| text/1 | gray/950 | gray/0 | Body text and titles |
| text/2 | gray/600 | cool/300 | Secondary text, 20 px captions |
| text/3 | gray/500 | cool/400 | Weak text of 24 or larger |
| icon/1 | gray/950 | gray/0 | Primary icons, pure white in Dark |
| icon/2 | gray/600 | cool/300 | Secondary icons |
| icon/3 | gray/500 | cool/400 | Weak or unselected icons |
| accent | blue/500 | blue/400 | On, selected, progress |
| accent/fill | blue/500 | blue/400 | Primary button fill, at most one per screen |
| on-accent | gray/0 | gray/0 | Text and icons on the accent and the nav card |
| text/on-media | gray/0 | gray/0 | Text on 3D scenes and images, fixed |
| overlay/scene | white/a15 | white/a15 | Translucent layer on 3D scenes |
| shadow/elevated | black/a20 | black/a20 | Shadow for overlays and the puck |
| switch/off | gray/500 | cool/450 | Track of a switch that is off |
| danger | red/600 | red/400 | Error text and graphics |
| danger/fill | red/600 | red/500 | Destructive button fill |
| status/success | green/600 | green/400 | Success graphics |
| status/warning | amber/600 | amber/400 | Warning graphics |
| nav/background | green/nav | green/nav | Navigation card |
| nav/next | green/nav-next | green/nav-next | Navigation card, next step |
| nav/secondary | cool/250 | cool/250 | Secondary arrow on the nav card |
| map/land and 8 more | map-day/* | map-night/* | Map base, five road classes, traveled route |
| map/route | blue/500 | blue/400 | Planned route, the same blue as the accent |
| map/puck | gray/0 | gray/0 | Location puck |
| map/puck-arrow | blue/500 | blue/400 | Location puck arrow |

The `Settings reference` collection holds calibration colors from the reference files. Per SPEC it is only for comparison and is not part of the tokens.

## 3a Scene and voice glow

### COLOR-12 Scene and voice colors stay in their own groups (must)
- `scene/…` holds 3D scene environment colors and `ai/…` holds the stops of the voice glow gradients. Only 3D scenes and voice components use them; UI controls never do.
- Their primitives live in Primitives as `scene-day/…`, `scene-night/…` and `ai-glow/…`; the semantic tokens point to them per mode.
- Bind each gradient stop to its `ai/state/index` at the positions below; Figma lets gradient stops bind to variables.

### Scene scene/
| Token | Light | Dark | Use |
|---|---|---|---|
| scene/sky-top | #96BDE0 | #202225 | Sky top |
| scene/horizon | #DCE5EE | #373A3E | Horizon |
| scene/ground | #B4C3D6 | #373A3E | Ground |
| scene/grass | #809C68 | #3E4D3D | Grass |
| scene/foliage | #6F914F | #4A593E | Foliage |
| scene/water | #7695AE | #304146 | Water |
| scene/road | #545E6D | #303031 | Road surface |
| scene/pavement | #D1DBEE | #3C4045 | Pavement |
| scene/curb | #D6E1EF | #5A6068 | Curb |
| scene/lane-white | #D6E0E9 | #A7ADB2 | White lane line |
| scene/lane-yellow | #BBAA6F | #99864E | Yellow center line |
| scene/cone | #FF5109 | #FF590C | Cones and hazards |
| scene/building | #D3D7DD | #817D7D | Buildings |
| scene/glass | #A6BED0 | #606A72 | Glass |
| scene/parking-floor | #7C8B9E | #17181B | Parking floor |
| scene/parking-bay | #AEBDCE | #393C41 | Parking bay |
| scene/parking-edge | #98A9BC | #34383E | Bay line |

### Voice glow ai/
| Token | Use | Stops (1 to 5) | Positions % | Modes |
|---|---|---|---|---|
| ai/listening/1 to 5 | Listening | #A1B5BD 0%, #AAB2B5 90%, #8B8E90, #6F6F71 90%, #D3D3D6 0% | 0, 25, 60, 85, 100 | same in both modes |
| ai/thinking/1 to 5 | Thinking, for text gradients | Light #2E9BEA, #1F8FE8 90%, #007AFF, #5856D6 90%, #AF52DE; Dark #C2EDFF, #64D2FF 90%, #50A7FF, #6B69FF 90%, #C35CE6 | 0, 25, 60, 78, 100 | differs by mode |
| ai/speaking/1 to 5 | Speaking | #64D2FF 0%, #64D2FF 90%, #0A84FF, #5E5CE6 90%, #5E5CE6 0% | 0, 25, 60, 85, 100 | same in both modes |
| ai/proactive/1 to 5 | Proactive | #7B64FF 0%, #649DFF 90%, #8147EE, #5E5CE6 90%, #5E5CE6 0% | 0, 25, 60, 85, 100 | same in both modes |

---

## 4 Measured contrast

Light:
| Foreground | canvas #F3F3F3 | face #FAFAFA | raised #FFFFFF | Result |
|---|---|---|---|---|
| text/1 | 15.17 | 16.12 | 16.83 | Pass |
| text/2 | 4.57 | 4.86 | 5.07 | Pass; 4.09 on bg/screen #E4E7EC, see COLOR-05 |
| text/3 | 3.03 | 3.22 | 3.36 | Only for type of 24 or larger and icons (COLOR-05) |
| accent #007AFF | 3.62 | 3.85 | 4.02 | Pass for graphics and large text |
| danger | 5.07 | 5.39 | 5.62 | Pass |
| success | 3.18 | 3.39 | 3.53 | Pass for graphics; pair with text colors for words |
| warning | 3.59 | 3.82 | 3.99 | Same as success |
| White on accent | 4.02 | | | Pass for large text |

Dark:
| Foreground | canvas #0A0A0B | face #141416 | raised #1C1C1E | Result |
|---|---|---|---|---|
| text/1 | 19.79 | 18.40 | 17.01 | Pass |
| text/2 | 6.90 | 6.42 | 5.94 | Pass; 4.86 on control/fill #2C2C2E |
| text/3 | 4.63 | 4.30 | 3.98 | Only for type of 24 or larger and icons (COLOR-05) |
| accent #0A84FF | 5.43 | 5.04 | 4.66 | Pass |
| danger | 7.09 | 6.59 | 6.10 | Pass |
| White on accent | 3.65 | | | Pass for large text |

---

## 5 Verification against the key screens (2026-11-13)

- Material: the four imported Key A and Key B screens on the Components page (day and night), and the 00 Foundations boards from DriveScene Studio.
- First pass: 47 of 60 colors matched a token in Dark and 30 of 35 in Light. The gaps were the screen background, Dark secondary text, the Light panel border, control and app-tile fills, the translucent layer on scenes, and the shadow.
- Fixed under COLOR-11: Dark text/1 is now #FFFFFF; text/2 is #6E6E73 in Light and #98989F in Dark; Light line/face is #0F1729 at 10%; added bg/screen, control/fill, bg/app-tile, overlay/scene, text/on-media, shadow/elevated and nav/secondary. Success and warning keep their values instead of Apple #30D158 and #FF9F0A (the latter is only 2.1:1 on white).
- Second pass: a copy of Dark Key A switched to Light matches the Light design in the status bar, Dock, map, ETA bar, map buttons, puck and nav card; only the 3D scene on the left is an image and switches through its scene variants.
- Every color board in 00 Foundations was merged into tokens and then deleted: Color, Color · Map, Color · AI and Color · SR, day and night each. The AI and SR palettes became the ai/ and scene/ groups (COLOR-12). The type and size boards remain.

## 6 Migration record (2026-11-13)

- HMI / v0.1 was renamed Color, and the 38 semantic tokens of that time now alias Primitives. The accent moved from #1471D6 to Apple system blue.
- Dark icon/2 and icon/3 now match text/2 and text/3 (#A0A0A0 to #A0A0A4, #7A7A7A to #7A7A7E).
- Removed the duplicate ink (its 2 bindings moved to text/1) and the 3 unbound source/sidebar/* calibration colors.
- Removed the unbound old collections: DS / Primitives, DS / Theme, DS / Metrics, Cockpit / Primitives, Cockpit / Semantic, Cockpit / Metrics.
- Rebinding: on the Components and Work pages, every color that matches a token in its current mode (within 4 per channel) now binds to Color, more than 5,100 paints in all, with no visual change. White text and icons on colored fills use on-accent; the rest use text/1 and icon/1. Frames named Light or Dark now carry that mode.
- Remaining: on the Components page, 1,183 hard-coded and 232 external colors on main nodes; on the Work page, 3,317 hard-coded and 475 external. Most are Sketch source colors (such as #979797, #F2F2F5, #99999E), translucent whites, brand colors, and the map, 3D scene and Dock app icons, which the rules leave alone. About 2,900 non-color external bindings (radius, spacing, type) wait for their own tokens.
- The Color Guide frame follows the Color collection mode for day and night; the primitive names under each card come from hidden guide/* string variables in the Color collection.
