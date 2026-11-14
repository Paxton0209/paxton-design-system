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
- The status bar is 1600 × 80 and the Dock is 1600 × 92. Place a temperature stepper at either end of the Dock.
- Five Dock app tiles use a 54 × 54 neutral tile, a centered 40 × 40 monochrome library icon, 7 px inset, and 36 px between tiles. App tile press feedback is an interaction layer.


### CMP-BTN Button `button`
- Buttons come in primary, secondary, tertiary and danger; M is 56 high and S is 48 high. Both use Medium labels. Layout and label widths follow CMP-23.
- Expose default (nor), selected (sel) and disabled (disable) on button and icon-button. Press feedback and focus indication belong to the interaction layer. Label, Show icon and Icon remain configurable.


### CMP-CHIP Chip `chip`
- Height 48, horizontal padding 24, radius full. Center the Medium label in its hit area; center tolerance 1 px. Use for single or multiple choices.


### CMP-SEG Segmented control `segmented`, `segment`
- Track fill/3 with 4 padding, cells 48 high; the selected cell is a solid fill/selected block with en/body/m/medium, unselected text/2.
- 2 to 4 cells, single selection. Characters: two cells English 12, Chinese 5; four cells English 8, Chinese 3.

### CMP-SW Switch `switch`
- 72 × 44; on accent/default, off fill/switch-off, disabled fill/disabled; knob 36 in icon/on-accent.
- Switches sit on the right of a list row; the hit area is the whole row.

### CMP-SLD Slider `slider`
- The brightness slider track is 184 × 8, with a centered 6 × 32 thumb. Track fill/1, progress accent/default and a Medium value.
- Values 0, 25, 50, 75, 100; use Show value to display a reading.


### CMP-ROW List row `list-row`, `list-header`
- List row has an optional starting icon, title and subtitle, followed by one trailing slot. Trailing options are none, chevron, value, switch, slider or a small button. Expose default, selected and disabled as its three states.
- List-header uses 20 Medium in text/2. Its group starts 16 below in settings.


### CMP-NAVITEM Side nav item `side-nav-item`
- Use a 240 × 64 row, centered 40 icon, and 8 from icon to label. Use CMP-25 for semantic colors and spacing.

### CMP-TILE Function card `tile`
- Tile height 112, inset 16 on all sides. Center the status line with the 40 icon; title and status are 20 Medium. One neutral surface/raised is shared across Auto, On, Off, Cool and Heat. Heat is signaled locally using the existing red mode and state/danger text in the test. Use CMP-27 for grid and feedback.


### CMP-LEVEL Level card `level-card`
- Width 240, padding 20 top and bottom and 24 sides, radius 20, back fill/3; label en/body/m/regular text/2, readout en/number/l/medium, progress bar 8 high.
- For 0 to 100 quantities such as windows and seat position.

### CMP-BANNER Banner `banner`
- Four persistent severity variants. Group the 48 status icon and its copy with an 8 gap; keep 20 to the optional action. Distinguish severity with the existing state palette.


### CMP-TOAST Toast `toast`
- Toasts have a height of 80, 16 vertical inset and a 48 status icon at 8 from its 24 Medium message. Plain text uses the same message style. Use surface/floating and the floating shadow. Center in the app with a 24 gap from the appropriate vertical edge.


### CMP-DLG Dialog `dialog`
- S width 560, M width 760. Use R28 surface/raised and 32 padding. Center Medium title and body, place 12 between them and 36 before the actions. Footer buttons use size M. The application-only overlay follows CMP-09.

### CMP-NAV Navigation `nav-maneuver`, `nav-eta`, `map-controls`, `icon-button`
- Taken from the approved key screens and kept as they are: nav card 360 wide, radius 28, nav/maneuver back; ETA bar as a pill on surface/floating; map controls as 56 icon-button cells, vertical at the top right.
- nav-maneuver variants turn=straight, right, left; properties Distance, Road, Next distance, Arrival, Next maneuver, Show next.

### CMP-TAB Tabs

- Underline width follows the selected label width. Place it 8 below the label and use a height of 4. Only the selected item shows an underline.

### CMP-POI Search result row poi-row
- Use one leading type in each result stream. Index uses a 40 × 40 fill/2 circle, centered label, and one ordinal per row. Neutral location and detail icons use secondary; related metadata and detail use an 8 gap. Keep the 56 action target and its 40 icon.
- Floating is a Boolean enabled on floating map results. This supplies an independent R20 surface/panel to each row. Keep the outer list transparent and space cards 8 apart. Use Show meta, Show tags, Show detail, Show sub-POIs, Show pin and Show go for optional content.


### CMP-TAG Tag

- Size S is 32 high and M 40. Center the 20 Medium label; use 12 px on each side with an 80 minimum width.

### CMP-PICK Picker

- Keep the unit adjacent to its value. In the time wheel, the selected row uses one colon; column widths are 56 / 24 / 56 / 76. In the value wheel use 96 for the value and 80 for the unit. Use Medium and keep aligned 64 px rows.

## 3 Usage rules

- **CMP-01 Components first** (must): wherever a component fits, use an instance; never draw a new one. If a component is missing, add it to the Library first.
- **CMP-02 Don't restyle** (must): on instances change only properties and text, never color, radius or spacing; make a variant for another look.
- **CMP-03 One primary per screen** (must): at most one primary button per screen.
- **CMP-04 Real map and scene** (must). Use the existing panel-map, panel-sr and navigation assets. Panel SR offers a Road events scene that exposes Cut-in, Lane change and Merge traffic using existing static DriveScene renders.
- **CMP-05 Overlay order** (must): at most one dialog at a time; a toast never covers a main action button.
- **CMP-06 Check proportions against NIO** (should): check new component sizes and composition against the NIO screens on the Work page (about 0.83 when converting to 1600 wide). If they disagree, fix the component rather than enlarging it on the page.
- **CMP-07 Small buttons on pages** (must): buttons in page content use S; M is for dialogs and main actions at the bottom of a panel.
- **CMP-08 Screen zones** (must). Keep the 520 × 728 SR panel on the left and the 1000 × 728 application at (570, 80). Both use a 2 px inside border/panel stroke and panel radius 28 with smoothing 1. Exclude the stroke from Auto Layout sizing.
- **CMP-09 Dialogs cover the app area only** (must). Scrim covers only the 1000 × 728 application from (570, 80). Use black 50% in Dark, white 40% in Light, and the same R28 superellipse as the panel. Center the dialog within 1 px of the app center.
- **CMP-10 Toast aligns to the app area** (must): center the toast horizontally in the app area, 24 from its top or bottom edge. Never at the same time as a dialog. Check: toast center x is 1070; top or bottom gap is 24.
- **CMP-11 Structure inside the app area** (must). Settings uses a 240-wide sidebar; Phone uses 400-wide Recents. Bind both sidebars to surface/sidebar and separate the columns with their surfaces. Tabs remain above the scroll content. Check that no vertical divider is visible.
- **CMP-12 Icon size follows the text** (must). Pair 24 text with a 40 icon and 20 or 22 text with 32 where applicable. Banner and toast status icons use 48 and sit 8 from their copy. POI leading and action icons use a 40 frame within their 56 action target. Resize source icons according to BASE-06.
- **CMP-13 Icon color follows the text** (must). Set the Icon mode on instances. Pair text/1 with primary and text/2 with secondary. State banners and toasts use their status mode. In the test tile only, heat uses existing red ink and state/danger status text on a neutral surface. Check the icon mode and its neighboring text in both themes.
- **CMP-14 Row alignment** (must). Align the leading slot, title line and trailing control at the start of a list row. The poi-row title is 32 high, the 40 leading slots and 56 trailing action areas share a center, and titles share one x. The trailing icon is 40 within its action area.
- **CMP-15 Fade what does not fit** (must): when a list or menu does not fit its panel, use a fade mask: the last 96 px go from opaque to transparent. Never cut a row in half and never add a scrollbar. The mask uses only alpha, never color, so it works in both modes. Check: an overflowing list has a mask named Fade mask.
- **CMP-16 Unify sizes first** (must). During the Library-test review, use Medium for editable UI copy. Keep approved sizes for each component, including 22 for the segment label and 20 as the minimum. Type tokens keep their published range.
- **CMP-17 Content matches the menu** (must): the right side shows the content of the selected side nav item. Example menus follow the order of the settings menu on the Work page (My car, AI assistant, Seats, Cabin, Doors & locks, Battery, Driver assist, divider, Connections, Display, Sound, System). Check: the selected item and the content title belong to the same category.
- **CMP-18 One gray per panel** (must): inside one panel or card, rows, inputs, search fields and segmented controls share one fill, fill/3; buttons inside rows (go, pin, chevron) have no fill, only a 56 hit area. App cards floating on the map use surface/panel like app panels, not surface/floating. Check: a card contains only one neutral fill, fill/3.
- **CMP-19 Pick the right icon** (must): use only library icons (icon guideline USE-01), with sidebar/* first in menus; when nothing fits, use the placeholder, never an ad hoc drawing. The icon must match the label's level: battery never uses the sharp navigation bolt, cabin never the A/C icon, and parts never go into screens. The first settings menu item is Shortcuts.
- **CMP-20 No title in the side nav** (must). Begin the side nav with its first item. Keep an 8 px icon-to-label gap in all four variants.
- **CMP-21 Adjustable means a handle** (must). An adjustable slider shows a handle. The test brightness slider uses an 184 × 8 track and a centered 6 × 32 handle. A display-only progress indicator has no handle.
- **CMP-22 Caret hugs the text** (must): in inputs and search fields the caret sits 2 from the text, independent of the layout gap. Check: Caret and its text share a Query group or Value group with gap 2.
- **CMP-23 Never truncate buttons** (must): a button row must fit the column's available width. Buttons hug their label (M at least 160, S at least 120), never a fixed width; dialog footer buttons are set to fill on the instance. If a row does not fit, switch to S, then drop icons from secondary buttons, then wrap; never cut text or buttons. Menu labels that do not fit get a shorter word (Locks, Assist, Network), never truncation. Check: each label is narrower than its button minus side padding, and the group fits its parent.
- **CMP-24 Toast never covers content** (must): when the app area has tabs or a title at the top, the toast sits at the bottom edge (24 from the bottom), not the top.
- **CMP-25 Side nav per the reference** (must). Use surface/sidebar with a 224-wide menu inside the 240-wide sidebar, with 8 side insets and 40 top inset. Items are 64 high with 8 between items and between icon and label. Selected uses fill/2, text/1 and primary; unselected uses text/2 and secondary. Verify the sidebar and selected row are distinguishable in both themes.
- **CMP-26 Content rhythm** (must). Content has 48 horizontal and 40 top padding. Keep 16 from a text/2 section heading to its group, 48 from the group to the divider and 32 after the divider. Section content shares a left edge.
- **CMP-27 Cards and rows are different** (must). Use a neutral surface/raised card for each frequent, researched action. Put the exact active state in the upper-right text, such as Auto, On, Off or Both. Multi-option controls open a choice, and one-shot actions omit persistent state. Use three cards per row, gaps 16 across and 20 down. Compute integer widths against the measured content width and assign the remainder to the middle column; 664 yields 210/212/210. Keep the grid and list text aligned with their heading.
- **CMP-28 Scrolling** (must): when content does not fit, use scrollbar (4 wide, fill/scrollbar, inset 8 from the right); when a side menu does not fit, fade it (CMP-15).
- **CMP-29 Nothing extra** (must). Top-level pages have no back button. All source search-bar variants omit the app-level voice button; voice uses the global entry. Use spacing and surface contrast for grouping where sufficient.
- **CMP-30 Stretch fixed-width components** (must): components with a default width, such as segmented controls and search fields, fill a wider container instead of leaving space on the right; parts that should follow their content (such as poi-row Trailing) hug, never a fixed width, so nothing gets clipped. Check: no child passes its parent's right edge and no meaningless gap wider than 40.
- **CMP-31 One visual size per set** (must): compare equivalent size, the square root of ink width × height. The library median is about 25 to 28 (median longest side 28). Within one menu, button row or card group, each icon's equivalent size is within 3 of the set median. Wide shapes (mirror, window) exceed on their longest side but not in area, so equivalent size avoids false alarms. When one fails, fix the source component (icon guideline USE-01); never swap the icon or resize only the instance. Check: compute equivalent size per set, then look at the whole column once.

- **CMP-32 One piece of feedback fixes every screen** (must): after a piece of feedback, find the cause, then run the same check across every example screen (menus, cards, lists, buttons, map buttons), not only the screen that was pointed at. Check: delivery includes that round's check results for every screen.

## 4 Verification (2026-11-14)

- Key A rebuilt with one screen instance: status bar, SR panel, map panel (nav card, ETA bar, map controls) and Dock match the original; the avatar is a placeholder circle.
- A settings page composed from components, following NIO's settings layout: SR panel on the left; the right panel split into side nav and content with function cards, list rows (switch, value, slider) and two S buttons. All instances. In the Composed section of the 06 Screens page.
- The A, B and C comparison samples stay in the Direction samples section of 05 Components as the record of D-118.

## 5 Library canvas LIB

- **LIB-01 No empty right side** (must): a board's width follows its content. When content has a fixed width (icons on an 80 grid are 1408 wide), shrink the board to content plus 120 on each side; never stretch content or leave space on the right. Check: board width = widest child + 240.
- **LIB-02 No stacked backgrounds** (must): group frames inside a board have no fill; components sit directly on the board, whose only background is surface/canvas. Check: no filled group frames inside boards (components and example screens excepted).
- **LIB-03 Only components in the Library** (must): guideline documents live in the repo (icons/, components/, color/ and so on), never in the Library file. The Library holds components, building blocks and one line of description per page; examples live only on the Examples page. Delete components a new one replaces; never keep two ways. Check: no board named Guide or Guideline; no search-suggestion on the Search page.
