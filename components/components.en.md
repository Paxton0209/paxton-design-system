# In-car components v1.0

Scope: the in-car center display. Figma file lib test, page 05 Components, Library section. Visual direction A: extends the navigation card, large radius, solid layers, solid selected blocks; sizes and composition follow the NIO screens on the Work page (D-118). Every component uses auto layout and binds color, spacing, radius and type tokens; states and sizes are variants; text and icons are properties.
Chinese version: [components.md](components.md).

---

## 0 How to read this file

- Every component has an ID (such as CMP-BTN); the Figma component description carries the same ID.
- The structure follows the Lexus guideline's component chapters: types first, each with a fixed height and use, then anatomy, states and character limits. All values are our own tokens.
- Character limits are given for English and Chinese. If text runs over, use a shorter wording; never shrink the type.
- Chinese UI: after changing a text property to Chinese, switch the text layer to the zh/ style of the same name (FONT-03).

## 1 Layer order

Bottom to top: screen back surface/screen, panels surface/panel, rows and blocks in panels fill/3, floating layers (toast, dialog, ETA bar, map controls) surface/floating or surface/raised with a shadow, and on top the scrim overlay/scrim behind a dialog. Only one dialog at a time.

## 2 Components

### CMP-SCREEN Screen template `screen`
| Item | Spec |
|---|---|
| Variants | layout=A (narrow panel left), B (wide panel left) |
| Structure | status-bar, Body (30 sides, 20 gap, 728 high), dock |
| Properties | Left panel, Right panel: swap to wide or narrow panel-sr, panel-map, panel-blank |
- To compose a screen, place a screen instance and swap the two panels. For an app page that needs content in a panel, detach the screen instance, swap the right panel to panel-blank and detach it, then place components inside.

### CMP-PANEL Panels `panel-map`, `panel-sr`, `panel-blank`
| Component | Content |
|---|---|
| panel-map | Map base, nav card top left, ETA bar bottom left, map controls top right, overlays 24 from the edge |
| panel-sr | 3D scene and speed |
| panel-blank | surface/panel, vertical auto layout, padding 40 (32 when split into nav and content), gap 16 |
- Wide 1000, narrow 520, height 728, radius 28.

### CMP-BAR Status bar and Dock `status-bar`, `dock`, `stepper`
- status-bar 1600 × 80: gear on the left (current gear text/1, others text/3), time in the middle, outside temperature and avatar on the right, all en/title/semibold.
- dock 1600 × 92: temperature steppers at both ends (chevrons 32, number en/number/m/semibold), app tiles in the middle with a 36 gap.

### CMP-BTN Button `button`
| Type | Back | Text | Use |
|---|---|---|---|
| primary | accent/fill | text/on-accent | Highest emphasis, at most one per screen |
| secondary | fill/2 | text/1 | Default button |
| tertiary | fill/2 | accent/default | Low emphasis, such as reset |
| danger | fill/2 | state/danger | Exit, delete and similar: red text on gray, never a solid red block |
| Size | Height | Side padding | Text | Used for |
|---|---|---|---|---|
| M | 56 | 32 | en/body/m/medium | Dialog buttons, main actions at the bottom of a panel |
| S | 48 | 24 | en/body/m/regular | Ordinary actions on a page, such as turn all off or reset |
- No large buttons on pages: at most M, and content areas default to S (author feedback: large buttons look like dialog buttons).
- States: default, pressed (secondary, tertiary and danger add interaction/pressed; primary drops to 0.85), focus (2 px border/focus), disabled.
- Properties: Label, Show icon, Icon. Radius full, 12 between icon and text.
- Characters: M English 14, Chinese 6; S English 12, Chinese 5. Paired buttons are equal width, primary on the left.

### CMP-CHIP Chip `chip`
- 48 high, 24 side padding, radius full, text en/body/m/regular. Unselected fill/3 with text/1, selected accent/subtle with accent/default, disabled fill/disabled.
- Single or multiple selection. Characters: English 14, Chinese 6.

### CMP-SEG Segmented control `segmented`, `segment`
- Track fill/3 with 4 padding, cells 48 high; the selected cell is a solid fill/selected block with en/body/m/medium, unselected text/2.
- 2 to 4 cells, single selection. Characters: two cells English 12, Chinese 5; four cells English 8, Chinese 3.

### CMP-SW Switch `switch`
- 72 × 44; on accent/default, off fill/switch-off, disabled fill/disabled; knob 36 in icon/on-accent.
- Switches sit on the right of a list row; the hit area is the whole row.

### CMP-SLD Slider `slider`
- Track 240 × 8 in fill/1, progress accent/default, readout on the right in en/body/m/medium.
- Variants value=0, 25, 50, 75, 100; property Show value.

### CMP-ROW List row `list-row`, `list-header`
| Item | Spec |
|---|---|
| Anatomy | Icon 32 on the left (optional), title en/body/m/regular, subtitle en/caption/regular (optional); action or information on the right |
| Right side | none, chevron, value (text with chevron), switch, slider, button (S) |
| Size | Minimum height 64 (size/row), padding 12 top and bottom, 24 sides, 16 between elements, radius 20 |
| States | default fill/3, pressed adds interaction/pressed, selected fill/selected, disabled fill/disabled |
- Rows are 8 apart, each a rounded block, no dividers. A group title (en/caption/regular, text/2) can sit above a group.
- Characters: title English 28, Chinese 14; right text English 12, Chinese 7; numbers 3 digits.

### CMP-NAVITEM Side nav item `side-nav-item`
- Left column of settings-type pages. Width 240, height 56, icon 28, text en/body/m. Unselected has no back and text/2; selected is a fill/2 rounded block with text/1 in medium.
- A border/panel vertical line separates the column from the content, 32 apart.

### CMP-TILE Function card `tile`
- 200 × 104, padding 16 top and bottom and 20 sides, radius 20. Icon 32 top left, status (Level 2, Off) top right, name bottom left (en/body/m/regular).
- States: cool (accent/subtle with vehicle/cool, cooling on), heat (vehicle/heat-bg with vehicle/heat, heating on), on (fill/selected, other functions on), off (fill/3 with icon/2).
- Three per row, 16 apart. Cool and warm colors are for temperature features only (COLOR-17).

### CMP-LEVEL Level card `level-card`
- Width 240, padding 20 top and bottom and 24 sides, radius 20, back fill/3; label en/body/m/regular text/2, readout en/number/l/medium, progress bar 8 high.
- For 0 to 100 quantities such as windows and seat position.

### CMP-BANNER Banner `banner`
- Stays on the page and does not dismiss itself. Width follows the container, padding 20 with 28 on the left, radius 20.
- Types info, success, warning, danger: back state/*-bg, icon 40 in the state color, title en/body/l/medium text/1, detail en/caption/regular text/2, optional M secondary button on the right.
- Characters: title English 32, Chinese 16.

### CMP-TOAST Toast `toast`
- Floats over content, dismisses itself after a few seconds, not tappable. Centered at the bottom of the screen or panel, at least 24 above the Dock.
- Types success, info, warning, danger, plain (text only). surface/floating, radius full, minimum height 72, padding 20 and 32 sides (24 on the left with an icon), icon 40, text en/body/l/medium, shadow/floating.
- Characters: English 32, Chinese 14, one sentence.

### CMP-DLG Dialog `dialog`
| Size | Width | Buttons |
|---|---|---|
| S | 560 | Two |
| M | 760 | Three, or a long title |
- surface/raised, radius 28, padding 32, title en/body/l/medium and body en/body/m/regular text/2, both centered; 12 between title and body, 36 between body and buttons. Buttons M, equal width, 16 apart, primary on the left.
- A full-screen overlay/scrim sits behind the dialog. Exit and delete use danger (red text on gray).
- Characters: title English 40, Chinese 18; body at most three lines.

### CMP-NAV Navigation `nav-maneuver`, `nav-eta`, `map-controls`, `icon-button`
- Taken from the approved key screens and kept as they are: nav card 360 wide, radius 28, nav/maneuver back; ETA bar as a pill on surface/floating; map controls as 56 icon-button cells, vertical at the top right.
- nav-maneuver variants turn=straight, right, left; properties Distance, Road, Next distance, Arrival, Next maneuver, Show next.

### CMP-POI Search result row poi-row
- Use: search results, history, favorites, along-route search and places during navigation all use this one component.
- Structure: a 48 slot on the left (leading=index for a number, leading=icon for home, work and similar), the title (24) and Meta (distance 20 text/1, address 20 text/2) in the middle, and two 56 round buttons, Pin and Go, on the right.
- Toggles: Show meta, Show tags (tag S, 32 tall), Show detail (charging or parking availability and price, with a swappable 40 icon), Show sub-POIs (parking, gates, as chips), Show pin, Show go.
- Recipes: regular turns on only Meta and Go; charging adds Tags and Detail; parking adds Detail and Sub-POIs; food adds Detail; along-route adds Tags; in navigation adds Pin. See poi-row recipes on the Search page.

## 3 Usage rules

- **CMP-01 Components first** (must): wherever a component fits, use an instance; never draw a new one. If a component is missing, add it to the Library first.
- **CMP-02 Don't restyle** (must): on instances change only properties and text, never color, radius or spacing; make a variant for another look.
- **CMP-03 One primary per screen** (must): at most one primary button per screen.
- **CMP-04 Real map and scene** (must): maps, nav cards and SR scenes use panel-map, panel-sr and the nav components; never draw them by hand.
- **CMP-05 Overlay order** (must): at most one dialog at a time; a toast never covers a main action button.
- **CMP-06 Check proportions against NIO** (should): check new component sizes and composition against the NIO screens on the Work page (about 0.83 when converting to 1600 wide). If they disagree, fix the component rather than enlarging it on the page.
- **CMP-07 Small buttons on pages** (must): buttons in page content use S; M is for dialogs and main actions at the bottom of a panel.
- **CMP-08 Screen zones** (must): the narrow left panel (520 × 728) always holds the SR via panel-sr and never app content. Apps go only in the wide right panel (1000 × 728, screen position x 570, y 80). Check: the left panel is a panel-sr instance; every app frame sits inside the right panel.
- **CMP-09 Dialogs cover the app area only** (must): dim with the background scrim (1000 × 728, radius/panel) over the right app area only; never dim the SR. Center the dialog in the app area: x = 570 + (1000 − dialog width) / 2, y = 80 + (728 − dialog height) / 2. Check: the scrim sits at (570, 80); the dialog center is within 1 of the app area center.
- **CMP-10 Toast aligns to the app area** (must): center the toast horizontally in the app area, 24 from its top or bottom edge. Never at the same time as a dialog. Check: toast center x is 1070; top or bottom gap is 24.
- **CMP-11 Structure inside the app area** (must): apps with categories (settings, phone) put a side nav or list on the left (side nav 240 wide, about a quarter of the app area, 8 side padding, menu items with 16 side padding; lists 400 to 440 wide), then a 1 px border/panel vertical line, then content. Tabs stay fixed at the top of the content; below them is a scroll area, and only it scrolls when content is taller than 728. Check: the content column is 728 tall and overflow sits in a frame named Scroll area.
- **CMP-12 Icon size follows the text** (must): in the reference the icon frame is about 1.7 times the font size. 24 text pairs with a 40 icon; 20 and 22 text and button icons use 32; chevrons 32; standalone large icons (empty state) 48. Scale with resize, stroke stays 2. Check: side nav, list row, poi-row, banner, toast and tile icons are 40; button icons are 32. (On 2026-11-14 an ink-based estimate pushed this to 48 and icons came out too big; reverted.)
- **CMP-13 Icon color follows the text** (must): never recolor layers inside an icon; switch the Icon mode on the icon instance. The mode matches the neighboring text: text/1 to primary, text/2 to secondary, text/3 to tertiary, disabled to disabled, white text on accent or the nav card to on-accent, accent text to accent; banner and toast status icons use danger, warning, success; heating uses heat. Check: no color overrides inside icon instances; an unselected side nav item has text/2 text and a secondary icon.
- **CMP-14 Row alignment** (must): list rows (list-row, poi-row, side nav) have three columns: a fixed slot on the left for the icon or index, the text in the middle, buttons on the right. All three center on the title line, not on the whole row; the title line is as tall as the left slot (48). Text left edges line up across every row of a list. Check: the y centers of the left slot, the title line and the trailing buttons differ by at most 1.
- **CMP-15 Fade what does not fit** (must): when a list or menu does not fit its panel, use a fade mask: the last 96 px go from opaque to transparent. Never cut a row in half and never add a scrollbar. The mask uses only alpha, never color, so it works in both modes. Check: an overflowing list has a mask named Fade mask.
- **CMP-16 Unify sizes first** (must): inside the app area use only 24 (main text, labels, buttons, tabs, menu) and 20 (secondary notes, units, addresses). Build hierarchy with color (text/1, text/2), not size. Large numbers (speed, temperature, call avatar) and the nav card are exempt. Fine-tune only after the screens are done. Check: at most two font sizes in one app area, large numbers excluded.
- **CMP-17 Content matches the menu** (must): the right side shows the content of the selected side nav item. Example menus follow the order of the settings menu on the Work page (My car, AI assistant, Seats, Cabin, Doors & locks, Battery, Driver assist, divider, Connections, Display, Sound, System). Check: the selected item and the content title belong to the same category.
- **CMP-18 One gray per panel** (must): inside one panel or card, rows, inputs, search fields and segmented controls share one fill, fill/3; buttons inside rows (go, pin, chevron) have no fill, only a 56 hit area. App cards floating on the map use surface/panel like app panels, not surface/floating. Check: a card contains only one neutral fill, fill/3.
- **CMP-19 Pick the right icon** (must): use only library icons (icon guideline USE-01), with sidebar/* first in menus; when nothing fits, use the placeholder, never an ad hoc drawing. The icon must match the label's level: battery never uses the sharp navigation bolt, cabin never the A/C icon, and parts never go into screens. The first settings menu item is Shortcuts.
- **CMP-20 No title in the side nav** (must): settings-style side navs start with the first item, with no app name above it; icon-to-label gap is 12. Check: the first child of Side nav is a menu item.
- **CMP-21 Adjustable means a handle** (must): bars the user drags (brightness, volume) use slider and must show a 28 white thumb; display-only progress uses progress, without a thumb. Check: every slider instance has a Thumb.
- **CMP-22 Caret hugs the text** (must): in inputs and search fields the caret sits 2 from the text, independent of the layout gap. Check: Caret and its text share a Query group or Value group with gap 2.
- **CMP-23 Never truncate buttons** (must): a button row must fit the column's available width. Buttons hug their label (M at least 160, S at least 120), never a fixed width; dialog footer buttons are set to fill on the instance. If a row does not fit, switch to S, then drop icons from secondary buttons, then wrap; never cut text or buttons. Menu labels that do not fit get a shorter word (Locks, Assist, Network), never truncation. Check: each label is narrower than its button minus side padding, and the group fits its parent.
- **CMP-24 Toast never covers content** (must): when the app area has tabs or a title at the top, the toast sits at the bottom edge (24 from the bottom), not the top.
- **CMP-25 Side nav per the reference** (must): the nav uses surface/sidebar, one step darker than the content but clearly not black, and the app panel gets a 1 px border/panel outline, with no vertical line (surface/canvas is close to the black screen and merges into it); 12 side inset and 32 top; each item is a 64 pill with 8 gaps, selected fill/2; labels always text/1, an unselected item only drops its icon to secondary; group dividers inset 20. Check: no vertical line next to Side nav; unselected labels bind text/1.
- **CMP-26 Content rhythm** (must): content padding 48 on the sides and 40 on top; section title (list-header, 20, text/1, no padding) to content 32, content to divider 48, divider to next title 32; sections are split by a full-width 1 px border/panel. Every element in the area shares one left edge. Check: the children of all sections have a single left x.
- **CMP-27 Cards and rows are different** (must): research real cars before choosing what goes on cards (the shortcuts panel follows Tesla Quick Controls: lights, mirrors, window lock, child lock, steering wheel, display brightness), and keep functions that belong to other categories (driving mode, seat heating) out. things that need a fill are cards (tile), solid surface/raised, three-corner layout; list rows (list-row, poi-row) have no fill. Cards fill the content width: three columns of 208 × 112 or two of 322 × 112, gap 20. Check: a card row is exactly as wide as the content area.
- **CMP-28 Scrolling** (must): when content does not fit, use scrollbar (4 wide, fill/scrollbar, inset 8 from the right); when a side menu does not fit, fade it (CMP-15).
- **CMP-29 Nothing extra** (must): top-level pages have no back button; in-app search fields have no voice button (voice has its own global entry); where tone or spacing already separates, add no divider. Check: no back button pointing up a level on a top-level page.
- **CMP-30 Stretch fixed-width components** (must): components with a default width, such as segmented controls and search fields, fill a wider container instead of leaving space on the right; parts that should follow their content (such as poi-row Trailing) hug, never a fixed width, so nothing gets clipped. Check: no child passes its parent's right edge and no meaningless gap wider than 40.
- **CMP-31 One visual size per set** (must): within one menu, button row or card group, perceived ratios differ by at most 0.1 and the longest ink side is within 4 of the set median (if most are 24 to 28, a 34-tall bolt does not belong). The formula misreads thin, sparse shapes, so the longest-side check backs it up. Check: compute both, then look at the whole column once. When one fails, fix the source icon component (icon guideline USE-01); never swap the icon or resize only the instance.

## 4 Verification (2026-11-14)

- Key A rebuilt with one screen instance: status bar, SR panel, map panel (nav card, ETA bar, map controls) and Dock match the original; the avatar is a placeholder circle.
- A settings page composed from components, following NIO's settings layout: SR panel on the left; the right panel split into side nav and content with function cards, list rows (switch, value, slider) and two S buttons. All instances. In the Composed section of the 06 Screens page.
- The A, B and C comparison samples stay in the Direction samples section of 05 Components as the record of D-118.

## 5 Library canvas LIB

- **LIB-01 No empty right side** (must): a board's width follows its content. When content has a fixed width (icons on an 80 grid are 1408 wide), shrink the board to content plus 120 on each side; never stretch content or leave space on the right. Check: board width = widest child + 240.
- **LIB-02 No stacked backgrounds** (must): group frames inside a board have no fill; components sit directly on the board, whose only background is surface/canvas. Check: no filled group frames inside boards (components and example screens excepted).
- **LIB-03 Only components in the Library** (must): guideline documents live in the repo (icons/, components/, color/ and so on), never in the Library file. The Library holds components, building blocks and one line of description per page; examples live only on the Examples page. Delete components a new one replaces; never keep two ways. Check: no board named Guide or Guideline; no search-suggestion on the Search page.
