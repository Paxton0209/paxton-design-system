# In-car size and elevation tokens v1.0

Scope: the in-car center display, 1600 × 900 canvas. Figma file lib test (T6kCgDUKJIt2e2TfDSZzp8), variable collection Size, effect styles shadow/…. The illustrated version is the Size Guide frame (1008:3) on the 03 Size page.
Chinese version: [size-tokens.md](size-tokens.md).

---

## 0 How to read this file

- Rule IDs start at SIZE-01; the Size Guide frame and audit scripts use the same IDs.
- Must: a violation fails. Should: the default; when you depart from it, give the ID and the reason.
- Values are measured from the key screens (Key A and Key B on 06 Screens) and the reference components on 05 Components, the same principle as COLOR-11.

## 1 Rules

### SIZE-01 Variables only (must)
- Spacing, padding, radius and control heights in components bind Size variables, never raw numbers.
- Check: audit `size-bind` (auto layout padding, gap and radius are bound).

### SIZE-02 Multiples of 4 (must)
- Use only space/4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 48.
- The only exceptions are layout/margin 30 and layout/gutter 20, taken from the key screens.

### SIZE-03 Concentric corners (should)
- An inner radius is about the outer radius minus the padding, never larger than the outer one.

### SIZE-04 Radius by use (must)
| token | value | used by |
|---|---|---|
| radius/screen | 32 | Screen outline |
| radius/panel | 28 | Panels, dialogs, nav card, voice card |
| radius/inner | 20 | Rows, tiles, level cards and banners inside panels |
| radius/tile | 14 | Dock app tiles |
| radius/full | 999 | Buttons, chips, segmented controls, switches, sliders, toast, ETA bar, map controls |

### SIZE-05 Hit area 56 (must)
- Anything tappable is at least 56 × 56 (size/control/m). A switch is 72 × 44; its hit area is the whole row.

### SIZE-06 Fixed layout (must)
| token | value |
|---|---|
| layout/screen/width, height | 1600, 900 |
| layout/status-bar | 80 |
| layout/dock | 92 |
| layout/bar-padding | 48, ends of status bar and Dock |
| layout/margin | 30, panels to screen sides |
| layout/gutter | 20, between panels |
| layout/panel/height | 728 |
| layout/panel/narrow, wide | 520, 1000 |
- Layout A: narrow panel left, wide panel right. Layout B: wide panel left, narrow panel right.

### SIZE-07 Overlay inset 24 (must)
- Nav card, ETA bar and map controls sit 24 from the panel edge (layout/panel/inset).
- Content in an app panel (panel-blank) sits 40 from the panel edge.

### SIZE-08 Shadows are effect styles, and light (must)
| Effect style | Content | Color token | Used by |
|---|---|---|---|
| shadow/floating | y 4, blur 16, background blur 24 | shadow/floating (night black 32%, day #1C1C2E 12%) | ETA bar, map controls, toast, dialog |
| shadow/voice | y 4, blur 16, background blur 40 | shadow/floating | Voice card |
| shadow/puck | y 10, blur 20 | shadow/puck (black 12%) | Location puck |
- Only things floating over the map, scene or content cast a shadow; panels, rows and cards do not.
- Shadows stay light and clean; by day opacity is at most 12%. The author retuned the puck shadow to y 10, blur 20, black 12%; the old y 6, blur 24, black 50% was too dirty.
- Check: audit `effect-style` (every layer with a drop shadow uses a shadow/ style).

### SIZE-09 No scaling (must)
- Make a variant for another size; never scale a component (D-89).

## 2 Control sizes

| token | value | used by |
|---|---|---|
| size/control/l | 72 | Toast, map control group, voice card height |
| size/control/m | 56 | M button, icon-button, side nav item, minimum hit area |
| size/control/s | 48 | S button, chip, segmented cell; hit area counted as 56 |
| size/row | 64 | Minimum list row height |
| size/icon | 48 | Icon artboard; ink within 40 |
| size/app-tile | 54 | Dock app tile |

## 3 Reference

- From the Lexus guideline's grid and spacing, shape and layout chapters we borrowed only the organization: grid unit, the three parts of a grid, spacing grouped into small, medium and large with uses, radius grouped by component, main screen regions and secondary page layouts. Every value comes from our own key screens.
