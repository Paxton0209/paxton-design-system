# In-car color tokens v1.3

Scope: the in-car center display, in two modes, day (Light) and night (Dark). Figma file lib test (T6kCgDUKJIt2e2TfDSZzp8), variable collections Primitives and Color (semantic). Web colors still follow SPEC section 2; the web accent stays #1471D6.
Chinese version: [color-tokens.md](color-tokens.md).

---

## 0 How to read this file

- Every rule has an ID (such as COLOR-05). The Figma Color Guide frame (932:1829, on the selected icon page) and the audit scripts use the same IDs.
- Must: a violation fails. Should: the default; when you depart from it, give the ID and the reason.
- Modes are called Light and Dark in Figma; this file says day (Light) and night (Dark).
- This version has day and night only. No high-contrast mode.

## 0a Start here: what are you drawing?

| You are drawing | Group | How to pick |
|---|---|---|
| Text | `text/` | 1 primary, 2 secondary, 3 weak (24 px and up only), disabled; on-accent on colored fills, on-media on scenes and images |
| Icons | `icon/` | Same ladder as text; follow the text next to it |
| Backs for screens, panels, dialogs | `surface/` | screen, canvas, panel, raised from bottom to top; floating for controls over the map and scene |
| Buttons, inputs, tracks, selected blocks | `fill/` | 1 strong, 2 default, 3 weak; selected, switch-off and disabled have their own |
| Pressed and focus | `interaction/pressed`, `border/focus` | Pressed adds a layer, focus is a 2 px stroke |
| Strokes | `border/` | panel, control, selected, focus |
| On, selected, progress | `accent/` | default for graphics, fill for the primary button, subtle for the back of a selected row |
| Success, warning, error, info | `state/` | The color goes on icons and text, -bg goes behind; use as a pair |
| Temperature features | `vehicle/` | cool is blue, heat is orange |
| Translucent layers over content | `overlay/` | scene for the 3D scene, scrim behind dialogs |
| Shadows | effect styles `shadow/…` | floating for controls over the map, voice for the voice card, puck for the puck |
| Navigation card | `nav/` | maneuver, maneuver-next, maneuver-dim |
| Map | `map/` | Maps only |
| 3D scene, voice glow | `scene/`, `ai/` | Scene and voice components only |

## 1 Rules

### COLOR-01 Two layers (must)
- `Primitives`: one mode, color ramps only, no purpose in the name. Primitives are never bound to a layer.
- `Color`: two modes, Light (day) and Dark (night). Every value is an alias to a primitive, never a raw value.
- Components, icons and docs bind only semantic tokens. The single exception is the primitive swatches in the Figma Color Guide, which bind primitives to show the ramps.
- Check: audit `color-alias` (every semantic value is an alias) and `color-bind` (no layer binds a primitive or holds a raw color).

### COLOR-02 Keep variable IDs (must)
- To change a value, point to another primitive. Never delete and recreate.
- To rename, rename the variable; the ID and every binding stay (all 24 renames in v1.3 were done this way, see section 6).
- To delete a token, rebind its uses to the replacement first, then delete (nav/eta-label was rebound to text/2, then deleted).

### COLOR-03 One blue (must)
- `accent/default`, `accent/fill`, `accent/subtle`, `state/info`, `vehicle/cool`, `border/focus`, `map/route` and `map/puck-arrow` all alias one blue pair: day `blue/500` #007AFF, night `blue/400` #0A84FF.
- No second blue anywhere.

### COLOR-04 Accent use (must)
- For current, on and progress: switch on, selected underline, progress, chosen value, an icon that is on.
- Never body text. At most one `accent/fill` primary button per screen.
- A selected row or an active tile uses `accent/subtle` as its back, `accent/default` for the icon and `text/1` for the text.
- Text on the button is `text/on-accent` (white). In-car buttons use 24 px and up, so 3:1 applies: day 4.02, night 3.65, both pass.

### COLOR-05 Contrast thresholds (must)
| Use | Threshold |
|---|---|
| Text under 24 px (the in-car minimum is 20) | ≥ 4.5:1 |
| Text 24 px and up | ≥ 3:1 |
| Icons, control boundaries, status graphics | ≥ 3:1 |
| Two adjacent fills | ≥ 1.25:1; add a 1 px edge when short (SPEC 3.1) |
- Measure on the surface the element actually sits on: screen, canvas, panel and raised, plus floating at night.
- text/3 is for 24 px and up and icons only; 20 px captions always use text/2.
- Disabled (text/disabled, icon/disabled) has no threshold, but it must come with another disabled signal (not tappable, no accent).

### COLOR-06 Status pairs (must)
- `state/success`, `state/warning`, `state/danger` and `state/info` always come with an icon or text; color alone never carries meaning.
- Banners and tags: the back is the matching `-bg`, the icon is the state color. 20 px text on a -bg uses `text/1`; the state color is used for text only at 24 px and up.
- Why: by day, success on its own -bg is only 3.03, enough for graphics and large text, not for 20 px text.
- A destructive button uses `state/danger-fill` with white text.

### COLOR-07 Borders (must)
- Every `border/` token uses alpha (white or black with alpha), so the hierarchy holds on any surface. `border/focus` is the exception: solid blue.
- `border/panel`: panel and card edge; `border/control`: control edge; `border/selected`: selected block edge, transparent at night.

### COLOR-08 Map palette (should)
- Map colors (land, water, parks, five road classes, traveled route, puck) are a separate domain palette with day and night primitives under `map/`. Only maps use them.
- The puck disc uses `map/puck` (white in both modes), not icon/1.

### COLOR-09 Name by what you draw (must)
- The first segment of a semantic name is the thing you are drawing: `text`, `icon`, `surface`, `fill`, `border`, `interaction`, `accent`, `state`, `vehicle`, `overlay`, `shadow`, `nav`, `map`, `scene`, `ai`. The second segment is strength or role; higher numbers are weaker.
- No color names and no day or night in semantic names.
- Each group's scopes are locked to its property: text fills text only, icon fills shapes and strokes, border strokes only, surface and fill fill backs only.
- Primitives: `color/step` such as `blue/500`, `cool/925`; alpha: `white/a60`, `ink/a65`, `black/a7` (the number is opacity in percent); tints: `green/600-a10` (step plus alpha).
- Check: audit `color-scope` (every token's scopes match its prefix).

### COLOR-10 Change process (must)
- To change a value, change the primitive or the alias, never the layer.
- To rename or delete a semantic token, list the affected components and binding counts and get the author's approval first.
- Recompute the COLOR-05 contrast tables after every change.

### COLOR-11 Key screens rule (must)
- The approved key screens (Key A and Key B on the Components page, day and night) are the color reference. When a token disagrees with them, change the token, not the screen.
- Text on the 3D scene and on images uses `text/on-media`, white in both modes. The scene itself switches through scene component variants, not color tokens.
- Verify by duplicating the night key screen, switching it to Light and comparing it with the day design side by side. Everything except the scene image should match.

### COLOR-12 Scene and voice are separate groups (must)
- `scene/` holds the 3D scene environment colors and `ai/` the voice glow gradient stops. Only 3D scene and voice components use them; UI controls never do. Details in section 3a.

### COLOR-13 Alpha ladder (must)
- Secondary colors for text, icons, lines and control fills always use one base with alpha: white #FFFFFF at night, ink #1D1D1F by day. No separately tuned grays for secondary colors.
- Why: it keeps the palette small, and white with alpha follows whatever is underneath on 3D scenes and maps, which reads cleaner than a solid gray. The author proved this approach at a previous carmaker.
- The ladder:

| Level | Night (white) | Day (ink) | Used by |
|---|---|---|---|
| 1 primary | 100% | 100% | text/1, icon/1 |
| 2 secondary | 60% | 65% | text/2, icon/2 |
| 3 weak | 40% | 50% | text/3, icon/3, fill/switch-off |
| Disabled | 25% | 30% | text/disabled, icon/disabled |
- Day secondary is 65%, not 60%: 60% gives only 4.11 to 4.47 on panel and raised, short of 4.5.
- Control fills: fill/1 night 16%, day 15%; fill/2 night 10%, day 8%; fill/3 5% in both; fill/disabled night 5%, day 4%; fill/selected night 14%, solid white by day (a selected block on a white surface must be solid to be seen).
- New components must not use the old solid grays cool/300, cool/400, gray/500 or gray/600 as secondary colors.

### COLOR-14 Solid surfaces (must)
- Every `surface/` token is solid, never alpha: stacked translucent surfaces let the content below show through.
- Controls floating over the map and 3D scene (ETA bar, map buttons) use `surface/floating`, not fill or overlay.
- Small blocks on the 3D scene that should let the picture through use `overlay/scene`.

### COLOR-15 Disabled (must)
- Disabled uses `text/disabled`, `icon/disabled` and `fill/disabled`. Never lower layer opacity and never add a white veil.
- A disabled control drops the accent: a switch that is on but disabled uses `fill/disabled` for its track; the knob stays.

### COLOR-16 Interaction (must)
- Pressed: add `interaction/pressed` (night white 10%, day ink 8%) on top of the control's own fill. Do not swap to another fill.
- Focus (knob, D-pad, voice pick): a 2 px `border/focus` outside the control, concentric with its radius.
- The primary button (accent/fill) keeps SPEC 13.1 when pressed: whole button at 0.85 plus scale 0.97, no pressed layer.
- No hover in the car.

### COLOR-17 Cool and heat (must)
- `vehicle/cool` (blue) and `vehicle/heat` (orange) are only for temperature features: climate cooling and heating, seat ventilation and heating, steering wheel heating, defog.
- An active tile: back `accent/subtle` or `vehicle/heat-bg`, icon `vehicle/cool` or `vehicle/heat`, text `text/1`.
- Orange never means warning; warnings use `state/warning`.
- Night orange/400 #FF9F0A, day orange/600 #C93400 (by day 4.76 to 5.28 on canvas, panel and raised).

### COLOR-18 Layer opacity (must)
- A colored layer stays at 100% opacity; alpha comes only from tokens. Layer opacity multiplies the token alpha and the result cannot be traced.
- Exceptions: fades during animation, and the primary button at 0.85 while pressed (COLOR-16).
- Check: audit `layer-opacity` (layers bound to a color token have opacity 1).

### COLOR-19 Shadows are effect styles (must)
- A shadow is not a color alone. Offset and blur live in an effect style; its color binds a `shadow/` token and switches with the mode. Never hand-set a shadow on a layer.
- Only things floating over the map and 3D scene cast a shadow; panels and cards do not.

| Effect style | Content | Color token | Used by |
|---|---|---|---|
| shadow/floating | y 4, blur 16, background blur 24 | shadow/floating (night black 32%, day #1C1C2E 12%) | ETA bar, map buttons, 21 layers |
| shadow/voice | y 4, blur 16, background blur 40 | shadow/floating | Voice card, 6 variants |
| shadow/puck | y 6, blur 24 | shadow/puck (black 50% in both) | Puck, 17 layers |
- Values come from the shadows actually used on the key screens. The v1.2 shadow/elevated (black 20%) matched no screen; it was renamed shadow/floating and revalued.
- Check: audit `effect-style` (every layer with a drop shadow uses a shadow/ style).

---

## 2 Primitives (151)

### White ladder (night secondary colors)
| token | value | used by |
|---|---|---|
| white/a5 | #FFFFFF 5% | night fill/3, fill/disabled |
| white/a8 | #FFFFFF 8% | night border/panel |
| white/a9 | #FFFFFF 9% | night border/control |
| white/a10 | #FFFFFF 10% | night fill/2, interaction/pressed |
| white/a14 | #FFFFFF 14% | night fill/selected |
| white/a15 | #FFFFFF 15% | overlay/scene |
| white/a16 | #FFFFFF 16% | night fill/1 |
| white/a20 | #FFFFFF 20% | nav/maneuver-dim |
| white/a25 | #FFFFFF 25% | night disabled |
| white/a40 | #FFFFFF 40% | night text/3, icon/3, fill/switch-off |
| white/a60 | #FFFFFF 60% | night text/2, icon/2 |
| white/a85 | #FFFFFF 85% | text/on-media-2 |

### Ink ladder (day secondary colors, base #1D1D1F)
| token | value | used by |
|---|---|---|
| ink/a4 | 4% | day fill/disabled |
| ink/a5 | 5% | day fill/3 |
| ink/a8 | 8% | day fill/2, interaction/pressed |
| ink/a15 | 15% | day fill/1 |
| ink/a30 | 30% | day disabled |
| ink/a50 | 50% | day text/3, icon/3, fill/switch-off |
| ink/a65 | 65% | day text/2, icon/2 |

### Other alpha
| token | value | used by |
|---|---|---|
| black/a5 | #000000 5% | spare |
| black/a7 | #000000 7% | day border/control, border/selected |
| black/a20 | #000000 20% | spare |
| black/a32 | #000000 32% | night shadow/floating |
| navy/a12 | #1C1C2E 12% | day shadow/floating |
| black/a30 | #000000 30% | day overlay/scrim |
| black/a50 | #000000 50% | night overlay/scrim, shadow/puck |
| slate/a10 | #0F1729 10% | day border/panel |
| transparent | #000000 0% | night border/selected |

### Neutrals (solid, for surfaces and primary colors only)
| token | value | used by |
|---|---|---|
| gray/0 | #FFFFFF | day surface/raised, surface/floating, fill/selected; night text/1, icon/1; on-accent, on-media, map/puck |
| gray/25 | #FAFAFA | day surface/panel |
| gray/50 | #F3F3F3 | day surface/canvas |
| gray/950 | #1D1D1F | day text/1, icon/1, and the base of the ink ladder |
| gray/1000 | #000000 | night surface/screen |
| slate/100 | #E4E7EC | day surface/screen |
| cool/700 | #494951 | surface/app-tile |
| cool/820 | #2C2C2E | night surface/floating |
| cool/900 | #1C1C1E | night surface/raised |
| cool/925 | #141416 | night surface/panel |
| cool/950 | #0A0A0B | night surface/canvas |

Solid grays left over from v1.2 with no semantic token pointing to them: gray/75, gray/200, gray/500, gray/600, cool/50, cool/250, cool/300, cool/400, cool/450, cool/750, cool/800, cool/850. They stay for one version for comparison with old work on the Work page; if still unused in v1.4 they are deleted.

### Colors
| token | value | use |
|---|---|---|
| blue/500 | #007AFF | day accent, info, cooling, focus, route |
| blue/400 | #0A84FF | night, same uses |
| red/600 | #C62828 | day danger, danger-fill |
| red/500 | #D9362B | night danger-fill |
| red/400 | #FF6B60 | night danger |
| green/600 | #1F9D3A | day success |
| green/400 | #32D74B | night success |
| amber/600 | #B86E00 | day warning |
| amber/400 | #FFB340 | night warning |
| orange/600 | #C93400 | day vehicle/heat |
| orange/400 | #FF9F0A | night vehicle/heat |
| green/nav | #248A3D | navigation card |
| green/nav-next | #1B6B30 | navigation card next step |

### Tints (day 10%, night 16%)
| token | used by |
|---|---|
| blue/500-a10, blue/400-a16 | accent/subtle, state/info-bg |
| green/600-a10, green/400-a16 | state/success-bg |
| amber/600-a10, amber/400-a16 | state/warning-bg |
| red/600-a10, red/400-a16 | state/danger-bg |
| orange/600-a10, orange/400-a16 | vehicle/heat-bg |

### Map (one set each for day and night)
| token | day | night |
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

Map primitives live under `map-day/…` and `map-night/…`; scene and voice primitives are listed in section 3a.

---

## 3 Semantic tokens (Color, 101, day / night)

### Text text/ (scopes: TEXT_FILL)
| token | day | night | use |
|---|---|---|---|
| text/1 | gray/950 | gray/0 | Body and titles |
| text/2 | ink/a65 | white/a60 | Secondary text, 20 px captions |
| text/3 | ink/a50 | white/a40 | Weak text, 24 px and up only |
| text/disabled | ink/a30 | white/a25 | Disabled text |
| text/on-accent | gray/0 | gray/0 | Text on blue, nav cards and danger buttons |
| text/on-media | gray/0 | gray/0 | Primary text on 3D scenes and images |
| text/on-media-2 | white/a85 | white/a85 | Secondary text on scenes and images |

### Icons icon/ (scopes: SHAPE_FILL, STROKE_COLOR)
| token | day | night | use |
|---|---|---|---|
| icon/1 | gray/950 | gray/0 | Primary icons |
| icon/2 | ink/a65 | white/a60 | Secondary icons |
| icon/3 | ink/a50 | white/a40 | Unselected and weak icons |
| icon/disabled | ink/a30 | white/a25 | Disabled icons |
| icon/on-accent | gray/0 | gray/0 | Icons on blue and nav cards |
| icon/on-media | gray/0 | gray/0 | Icons on scenes and images |

### Surfaces surface/ (solid, scopes: FRAME_FILL, SHAPE_FILL)
| token | day | night | use |
|---|---|---|---|
| surface/screen | slate/100 | gray/1000 | Full screen, under the status bar and Dock |
| surface/canvas | gray/50 | cool/950 | App bottom layer |
| surface/panel | gray/25 | cool/925 | Cards and panels |
| surface/raised | gray/0 | cool/900 | Raised blocks and dialogs |
| surface/floating | gray/0 | cool/820 | Controls floating over map and scene |
| surface/app-tile | cool/700 | cool/700 | Dock app tile, same in both modes |

### Control fills fill/ and interaction/
| token | day | night | use |
|---|---|---|---|
| fill/1 | ink/a15 | white/a16 | Strong fill, large neutral blocks |
| fill/2 | ink/a8 | white/a10 | Default control fill, buttons and inputs |
| fill/3 | ink/a5 | white/a5 | Weak fill, tracks and group backs |
| fill/selected | gray/0 | white/a14 | Selected segment |
| fill/switch-off | ink/a50 | white/a40 | Switch track when off |
| fill/disabled | ink/a4 | white/a5 | Disabled control fill |
| interaction/pressed | ink/a8 | white/a10 | Pressed, layered on the control |

### Borders border/ (scopes: STROKE_COLOR)
| token | day | night | use |
|---|---|---|---|
| border/panel | slate/a10 | white/a8 | Panel and card edge |
| border/control | black/a7 | white/a9 | Control edge |
| border/selected | black/a7 | transparent | Selected edge, hidden at night |
| border/focus | blue/500 | blue/400 | Focus ring, 2 px |

### Accent accent/
| token | day | night | use |
|---|---|---|---|
| accent/default | blue/500 | blue/400 | On, selected, progress |
| accent/fill | blue/500 | blue/400 | Primary button, one per screen |
| accent/subtle | blue/500-a10 | blue/400-a16 | Selected rows and active tiles |

### Status state/
| token | day | night | use |
|---|---|---|---|
| state/info | blue/500 | blue/400 | Info |
| state/success | green/600 | green/400 | Success |
| state/warning | amber/600 | amber/400 | Warning |
| state/danger | red/600 | red/400 | Error and danger |
| state/info-bg | blue/500-a10 | blue/400-a16 | Info banner and tag back |
| state/success-bg | green/600-a10 | green/400-a16 | Success banner and tag back |
| state/warning-bg | amber/600-a10 | amber/400-a16 | Warning banner and tag back |
| state/danger-bg | red/600-a10 | red/400-a16 | Error banner and tag back |
| state/danger-fill | red/600 | red/500 | Destructive button |

### Vehicle vehicle/
| token | day | night | use |
|---|---|---|---|
| vehicle/cool | blue/500 | blue/400 | Cooling and ventilation on |
| vehicle/heat | orange/600 | orange/400 | Heating on: climate, seats, wheel |
| vehicle/heat-bg | orange/600-a10 | orange/400-a16 | Active heating tile back |

### Overlays and shadow (offset and blur in COLOR-19)
| token | day | night | use |
|---|---|---|---|
| overlay/scene | white/a15 | white/a15 | Translucent back on the 3D scene |
| overlay/scrim | black/a30 | black/a50 | Dims the screen behind dialogs |
| shadow/floating | navy/a12 | black/a32 | Shadow color for controls over map and scene, and the voice card |
| shadow/puck | black/a50 | black/a50 | Shadow color for the puck |

### Navigation nav/
| token | day | night | use |
|---|---|---|---|
| nav/maneuver | green/nav | green/nav | Navigation card |
| nav/maneuver-next | green/nav-next | green/nav-next | Next step |
| nav/maneuver-dim | white/a20 | white/a20 | Secondary branches on the nav card |

### Map map/
| token | day | night | use |
|---|---|---|---|
| map/land and 8 more | map-day/* | map-night/* | Map base, five road classes, traveled route |
| map/route | blue/500 | blue/400 | Planned route |
| map/puck | gray/0 | gray/0 | Location puck disc |
| map/puck-arrow | blue/500 | blue/400 | Puck arrow |

The `Settings reference` collection holds calibration colors from the reference design. Per SPEC it is for comparison only and is not a token set.

## 3a Scene and voice glow

- Primitives live under `scene-day/…`, `scene-night/…` and `ai-glow/…`; semantic tokens alias them per mode.
- Each gradient stop binds its `ai/state/n` token at the positions below; Figma gradient stops can bind variables directly.

### Scene scene/
| token | day (Light) | night (Dark) | use |
|---|---|---|---|
| scene/sky-top | #96BDE0 | #202225 | Top of the sky |
| scene/horizon | #DCE5EE | #373A3E | Horizon |
| scene/ground | #B4C3D6 | #373A3E | Ground |
| scene/grass | #809C68 | #3E4D3D | Grass |
| scene/foliage | #6F914F | #4A593E | Tree canopy |
| scene/water | #7695AE | #304146 | Water |
| scene/road | #505967 | #303031 | Road surface |
| scene/pavement | #D1DBEE | #3C4045 | Sidewalk |
| scene/curb | #D6E1EF | #5A6068 | Curb |
| scene/lane-white | #D6E0E9 | #A7ADB2 | White lane line |
| scene/lane-yellow | #BBAA6F | #99864E | Yellow center line |
| scene/cone | #FF5109 | #FF590C | Cones and other hazards |
| scene/building | #D3D7DD | #817D7D | Buildings |
| scene/glass | #A6BED0 | #606A72 | Glass |
| scene/parking-floor | #7C8B9E | #17181B | Parking floor |
| scene/parking-bay | #AEBDCE | #393C41 | Parking bay |
| scene/parking-edge | #98A9BC | #34383E | Bay lines |

### Voice glow ai/
| token | use | stops (1 to 5) | positions % | modes |
|---|---|---|---|---|
| ai/listening/1 to 5 | Listening | #A1B5BD 0%, #AAB2B5 90%, #8B8E90, #6F6F71 90%, #D3D3D6 0% | 0, 25, 60, 85, 100 | Same in both |
| ai/thinking/1 to 5 | Thinking, used as a text gradient | day #2E9BEA, #1F8FE8 90%, #007AFF, #5856D6 90%, #AF52DE; night #C2EDFF, #64D2FF 90%, #50A7FF, #6B69FF 90%, #C35CE6 | 0, 25, 60, 78, 100 | Differs |
| ai/speaking/1 to 5 | Speaking | #64D2FF 0%, #64D2FF 90%, #0A84FF, #5E5CE6 90%, #5E5CE6 0% | 0, 25, 60, 85, 100 | Same in both |
| ai/proactive/1 to 5 | Proactive suggestion | #7B64FF 0%, #649DFF 90%, #8147EE, #5E5CE6 90%, #5E5CE6 0% | 0, 25, 60, 85, 100 | Same in both |

---

## 4 Contrast (measured; alpha colors are measured as composited on that surface)

Day:
| foreground | screen #E4E7EC | canvas #F3F3F3 | panel #FAFAFA | raised #FFFFFF | result |
|---|---|---|---|---|---|
| text/1 | 13.58 | 15.17 | 16.12 | 16.83 | Pass |
| text/2 ink 65% | 4.80 | 5.02 | 5.15 | 5.24 | Pass |
| text/3 ink 50% | 3.10 | 3.19 | 3.24 | 3.27 | 24 px and up only |
| disabled ink 30% | 1.87 | 1.89 | 1.91 | 1.91 | Disabled, no threshold |
| accent #007AFF | 3.24 | 3.62 | 3.85 | 4.02 | Graphics and large text pass |
| success | 2.85 | 3.18 | 3.39 | 3.53 | Not on screen; graphics pass |
| warning | 3.22 | 3.59 | 3.82 | 3.99 | Graphics pass |
| danger | 4.54 | 5.07 | 5.39 | 5.62 | Pass |
| heat #C93400 | 4.26 | 4.76 | 5.06 | 5.28 | Pass |

Night:
| foreground | screen #000000 | canvas #0A0A0B | panel #141416 | raised #1C1C1E | floating #2C2C2E | result |
|---|---|---|---|---|---|---|
| text/1 | 21.00 | 19.79 | 18.40 | 17.01 | 13.94 | Pass |
| text/2 white 60% | 7.37 | 7.30 | 7.13 | 6.85 | 6.04 | Pass |
| text/3 white 40% | 3.66 | 3.77 | 3.83 | 3.79 | 3.55 | 24 px and up only |
| disabled white 25% | 2.02 | 2.14 | 2.24 | 2.28 | 2.25 | Disabled, no threshold |
| accent #0A84FF | 5.76 | 5.43 | 5.04 | 4.66 | 3.82 | Pass |
| success | 10.96 | 10.33 | 9.60 | 8.88 | 7.27 | Pass |
| warning | 11.77 | 11.10 | 10.32 | 9.54 | 7.81 | Pass |
| danger | 7.52 | 7.09 | 6.59 | 6.10 | 4.99 | Pass |
| heat #FF9F0A | 10.22 | 9.63 | 8.95 | 8.28 | 6.78 | Pass |

State color on its own -bg (the -bg composited on panel):
| | info | success | warning | danger | heat |
|---|---|---|---|---|---|
| day 10% | 3.39 | 3.03 | 3.40 | 4.61 | 4.36 |
| night 16% | 4.21 | 7.13 | 7.47 | 5.27 | 6.71 |
- All pass 3:1, so on a -bg the state color can be used for icons and text at 24 px and up; 20 px text uses text/1 (COLOR-06).
- White text on heat: day 5.28, night 2.06. Heating therefore uses a tint with an orange icon, never a solid orange button.

---

## 5 Verification against the key screens

### 2026-11-13
- Material: Key A and Key B, day and night, imported to the Components page, and the 00 Foundations swatches from DriveScene Studio.
- Round one: 47 of 60 night colors and 30 of 35 day colors matched tokens. The mismatches were the screen back, night secondary text, day panel edge, control fill, app tile, translucent scene back and shadow; tokens were changed per COLOR-11.
- Round two: a copy of the night Key A switched to Light matched the day design except the 3D scene image on the left.

### 2026-11-14 (v1.3)
- After moving to the alpha ladder, Key A was captured again in both modes. Night secondary text went from #98989F to white 60% (about #999999 on black) and weak text from #7A7A7E to white 40%; the difference is barely visible.
- The secondary turn branches on the nav card were white with 20% layer opacity. They now use the token `nav/maneuver-dim` (white 20%) with layer opacity back at 100% (COLOR-18), 22 layers.
- The puck disc was bound to icon/1 and turned black by day. It is now bound to `map/puck`, 17 layers, white in both modes.

## 6 Migration record

### v1.3 (2026-11-14): regrouped by what you draw
Renames (variable IDs unchanged, every binding kept):
| old | new |
|---|---|
| bg/screen | surface/screen |
| bg/canvas | surface/canvas |
| bg/face | surface/panel |
| bg/raised | surface/raised |
| control/fill | surface/floating |
| bg/app-tile | surface/app-tile |
| bg/mass | fill/1 |
| bg/track | fill/3 |
| bg/selected | fill/selected |
| switch/off | fill/switch-off |
| bg/pressed | interaction/pressed |
| line/face | border/panel |
| line/control | border/control |
| line/selected | border/selected |
| on-accent | text/on-accent |
| foreground/on-media-secondary | text/on-media-2 |
| accent | accent/default |
| danger | state/danger |
| danger/fill | state/danger-fill |
| status/success | state/success |
| status/warning | state/warning |
| nav/background | nav/maneuver |
| nav/next | nav/maneuver-next |
| nav/secondary | nav/maneuver-dim |
- Merged: the 27 bindings of nav/eta-label were moved to text/2, then the token was deleted.
- Revalued: text/2, text/3, icon/2, icon/3, fill/1, fill/3, fill/selected (night), fill/switch-off and interaction/pressed now follow the alpha ladder (COLOR-13).
- 17 new tokens: text/disabled, icon/disabled, icon/on-accent, icon/on-media, fill/2, fill/disabled, border/focus, accent/subtle, state/info, state/info-bg, state/success-bg, state/warning-bg, state/danger-bg, vehicle/cool, vehicle/heat, vehicle/heat-bg, overlay/scrim.
- 30 new primitives: the white and ink ladders, black/a30, black/a50, orange/400, orange/600 and 10 tints.
- Every semantic token's scopes are locked to its property per COLOR-09.
- Shadows: shadow/elevated renamed shadow/floating and revalued from the key screens; shadow/puck and three effect styles added (COLOR-19); new primitives black/a32 and navy/a12.
- Color Guide section 01 is now six chapters (content, layers, controls, status, vehicle, navigation and map), each a real UI specimen with its tokens and uses beside it; primitive values are no longer shown there.
- Earlier in v1.3: section 01 regrouped. Each card's swatch draws the real use (text, icon, control, tag) and lists the primitive each mode points to; the rules table now runs to COLOR-18.

### v1.2 (2026-11-13)
- HMI / v0.1 was renamed Color and its 38 semantic tokens were changed to alias Primitives; the accent changed from #1471D6 to Apple system blue.
- Unbound legacy collections deleted: DS / Primitives, DS / Theme, DS / Metrics, Cockpit / Primitives, Cockpit / Semantic, Cockpit / Metrics.
- Rebinding: on the Components and Work pages, colors that matched a token in the current mode (within 4 per channel) were bound to Color, more than 5,100 in total.
- Remaining: about 1,180 raw and 230 external colors on Components main nodes; about 3,300 raw and 475 external on Work. Mostly Sketch source colors, brand colors, map, 3D scene and Dock app icons, left as they are by rule. About 2,900 non-color external bindings (radius, spacing, type) wait for their tokens.
