# Car Display Icon Guidelines v1.2

Scope: outline icons for the design system's HMI layer (center display). Figma file lib test (T6kCgDUKJIt2e2TfDSZzp8), page 04 Icons (622:11993). Filled category icons in the settings sidebar still follow SPEC 9.1 and D-86 and are out of scope here.
Chinese version: [icon-guideline.md](icon-guideline.md). The Icon Guide frame in Figma illustrates these rules and matches this file by rule ID.
Current size: 300 standalone components and 24 part masters.

---

## 0 How to read this file

- Every rule has a unique ID, for example `SEAM-02`. The same ID is used as the layer name of its card in the Figma Icon Guide and in audit script errors.
- **Must**: a violation fails the icon, and it cannot ship. **Should**: the default; any deviation is stated in the delivery note with the rule ID and the reason.
- When rules conflict, this order wins: regulatory standards (ISO 2575 / GB 4094), then this file, then reference images, then personal judgment.
- Coordinates start at the top left of the 48 × 48 artboard. Units are px.

## 1 Terms

| Term | Definition |
|---|---|
| Ink | The rendered extent of all visible strokes and fills (absoluteRenderBounds) |
| Endpoint | The start or end of an open path |
| Center distance | The shortest distance between two stroke center lines |
| Clear gap | The shortest distance between the outer edges of two strokes. With a 2 px stroke, clear gap = center distance − 2 |
| Shared vertex | Two segments in the same vector network connected to the same vertex |
| Size ratio | (hull area + hull perimeter + π) ÷ (π × 14²): the ink grown by 1 px, compared with a 28 px circle |
| Part | A drawing master on the Parts canvas, named `part/<name>`. Its vectors are copied; it is never instanced |
| Family | Icons that share one main shape and differ only in modifiers, such as the three volume levels |

---

## 2 Foundations BASE

### BASE-01 Component structure (must)
- Each component is 48 × 48, with fill and clip settings copied from template 784:11208.
- It contains a locked rectangle named `keyline` (a copy of 784:11209) and a group named `glyph`. All vectors live in `glyph`.
- Names follow `<category>/<name>` in lowercase with underscores, for example `vehicle/door_open`.
- Check: audit `structure`

### BASE-02 No nested instances (must)
- No INSTANCE node may appear inside a component. To use a part, copy its vectors; never place an instance.
- Check: audit `nested`

### BASE-03 Safe area (must)
- No ink outside the 40 × 40 area from 4 to 44.
- Wide icons have ink width ≤ 38; tall icons have ink height ≤ 36.
- Exception: side-view car icons may reach an ink width of 40 (EXC-05).
- Check: audit `extent`

### BASE-04 Centering (must)
- The center of the ink bounding box is within 0.6 of (24, 24) on each axis. The `glyph` position snaps to 0.5.
- Exceptions: optical centering, see FAM-02; family members are not centered one by one, see FAM-01.
- Check: audit `center`

### BASE-05 Optical size (should)
- The size ratio should be between 0.75 and 1.05. The library median is about 0.89.
- Falling outside the range is not an automatic fail: compare the icon side by side with its neighbors in the same category, and resize only if it clearly looks too big or too small. Resize the whole family together.
- Family members align by FAM-01 instead of being sized one by one.
- Exemption: single-stroke and directional icons skip the size ratio and instead match the line length and spacing of their own kind. List: general/plus, minus, close, more, chevron_up, chevron_down, chevron_left, chevron_right, arrow_back, arrow_forward.
- Check: audit `size`

### BASE-06 Stroke (must)
- Stroke weight is 2. Every vertex has strokeCap and strokeJoin set to ROUND.
- After any scaling, reset the stroke weight to 2.
- Exceptions: EXC-01.
- Check: audit `stroke`, `cap`

### BASE-07 Zero-length segments (must)
- No segment may be shorter than 0.05, and coincident vertices must be merged. Zero-length segments break round caps at line ends.
- Check: audit `zero_seg`

### BASE-08 Color (must)
- Every stroke and fill is bound to the variable `icon/1` (VariableID:117:2823). No hard-coded colors.
- Exceptions: EXC-02.
- Check: audit `color`

### BASE-09 Outline and filled (must)
- Everything is outline by default. Filled shapes appear only in parts listed as filled: `part/car_top` and `part/fan`, plus the small bolts in EXC-06.
- Check: manual

### BASE-10 Style (should)
- Prefer straight lines. Corners only finish the structure; icons must never look rounded or cute. No chamfered corners.
- Check: manual, side by side with neighboring icons in the same category

---

## 3 Corners CORNER

All angles refer to the **interior angle** at the corner.

### CORNER-01 Never mix sharp and rounded corners (must)
- Apart from letters, numerals and ISO symbols, one icon cannot combine R0 sharp corners with rounded corners.
- R2, R1.5 and R1 may appear together in one icon, each where CORNER-02 to CORNER-04 call for it.

### CORNER-02 R2 (must)
- For non-directional corners with an interior angle of 75° or more, such as checks, hands and envelope folds. Exactly 75° uses R2.

### CORNER-03 R1.5 (must)
- For non-directional acute corners under 75°.

### CORNER-04 R1 (must)
- For directional tips, such as chevrons and arrowheads.
- Pull the shaft endpoint back so the shaft's round cap never passes the outer edge of the tip.

### CORNER-05 R0 (must)
- For letters, numerals and ISO regulatory symbols.

### CORNER-06 Radius cap (must)
- A radius never exceeds half of the shorter adjacent edge. When the rule's value does not fit, use that cap and note it in the delivery note.

---

## 4 Seams and spacing SEAM

### SEAM-01 Join (must)
- Lines that meet share a vertex in one vector network and read as one stroke.
- Two separate paths placed against each other do not count as a join.
- Good example: `vehicle/cruise_control` (the arc and arrow share one network)
- Check: audit `seam`

### SEAM-02 Gap (must)
- Lines that do not join keep a clear gap of at least 2 (a center distance of at least 4).
- Measure the center distance from each endpoint to every other stroke:
  - Under 0.5: meant to join; make it a shared vertex per SEAM-01.
  - 0.5 to 2: poking end (overlap). Fails.
  - 2 to 4: near miss (clear gap under 2). Fails.
- Fix by snapping (move the endpoint onto the nearest point and join) or trimming (split the bezier with de Casteljau until the gap clears). Never pull the whole line back.
- Good example: `media/hq`
- Check: audit `seam`, `gap`

### SEAM-03 Spacing inside a frame (must)
- A symbol inside a frame keeps a clear gap of at least 3 from the frame.
- Text or content inside a container keeps a clear gap of at least 4 from the container.

### SEAM-04 Line meeting a solid dot (must)
- When a line meets a solid dot, the line end aligns with the dot's outer edge. It neither enters the dot nor leaves a gap.

### SEAM-05 Crossing (must)
- Where one line crosses another, cut a break with a clear gap of 2 using a boolean.
- Remove any leftover piece shorter than 2 on either side of the break.
- Good example: `ac/steering_heat`

### SEAM-06 Merging filled shapes (must)
- Filled shapes never overlap; merge them into one shape with booleans.
- Split even-odd shapes into subpaths first (outer contour minus holes), then run the boolean.

### SEAM-07 Moving parts (must)
- For an open door or lid, cut that segment from the main body and rotate it open around the hinge, a corner both pieces share.
- Never draw a separate door.
- Good example: `vehicle/door_open` (hinge rotation −40°)

---

## 5 States and badges STATE

### STATE-01 Off slash (must)
- The slash is always `M13 13L35 35`, from top left to bottom right.
- Split the original paths along the slash, keeping exact sub-beziers and round caps. Every cut endpoint stays at least 4 from the slash center line (a clear gap of 2).
- Keep the edge pieces created by the split.
- Good examples: `general/wifi_off`, `general/bell_off`

### STATE-02 Preferred badge (must)
- Add `part/badge_check` to the base icon: radius 5.3, centered at (32.7, 30.9). The check's bend uses a 0.75 radius (EXC-03).
- Keep a clear gap of 2 around the badge: base strokes stay at least 4 from the badge circle line, which is at least 9.3 from its center.
- Good example: `drive/highway_preferred`

### STATE-03 Avoid badge (must)
- Add `part/badge_ban` to the base icon, with the same position and gap as STATE-02.
- The ban stroke ends on the circle's center line.
- Good example: `nav/avoid_highway`

---

## 6 Type in icons TYPE

### TYPE-01 Typeface (must)
- Letters and numerals are always set in Inter, then flattened to outlines. No live text in components.

### TYPE-02 Weight (must)
Pick the weight by cap height so stems stay close to 1.8:

| Cap height | Weight | Stem as share of font size |
|---|---|---|
| ≥ 15 | Medium | 0.098 em |
| 12 to 15 | Semi Bold | 0.112 em |
| 10 to 12 | Bold (Extra Bold if Bold looks thin) | 0.126 / 0.142 em |
| < 10 | Black | 0.158 em |

When the cap height lands exactly on a boundary, use the lighter weight.

### TYPE-03 Fixed glyphs (must)
- The sleep Z always uses `part/z`. The moon always uses `part/moon`.

---

## 7 Parts PART

### PART-01 When to make a part (must)
- Any shape used in 2 or more icons becomes a part on the Parts canvas (777:11162), named `part/<name>`.

### PART-02 How to use a part (must)
- Copy its vectors and scale uniformly only. After scaling, reset the stroke weight to 2 (BASE-06).
- Never change a part's structure inside an icon.

### PART-03 When a part has a problem (must)
- Fix the part itself first, then apply the change to every icon that uses it.

### PART-04 Current parts

| Part | Type | | Part | Type |
|---|---|---|---|---|
| car_front | outline | | fan | filled |
| seat | outline | | steering_wheel | outline, final |
| bolt | outline, closed | | mirror | outline |
| car_side | outline | | car_top | filled, cabin cut out with a 1.5 line |
| pin | outline | | phone | outline |
| speaker | outline | | bluetooth | outline |
| clock | outline | | wifi | outline |
| calendar | outline | | moon | outline |
| heart | outline | | snowflake | outline |
| thermometer | outline | | badge_check | outline |
| lock | outline | | badge_ban | outline |
| heat | outline | | z | type outline |

---

## 8 Cars CAR

### CAR-01 Front view (must)
- Use only the final front-view car in `sidebar/driving_line`. Never change its structure.

### CAR-02 Side view (must)
- Use only the hood and trunk master car: 38 long, with its base at y = 31.
- Modifiers appear only at breaks in the body.

### CAR-03 Top view (must)
- Use only `part/car_top`: filled, with the cabin cut out.

### CAR-04 Steering wheel (must)
- Use only `part/steering_wheel`. It is final; never change its structure.

### CAR-05 No shifting within a family (must)
- Within a family, the car keeps exactly the same position and size.

---

## 9 Families and optical size FAM

### FAM-01 Family alignment (must)
- Family members keep the main shape at exactly the same position and size; only modifiers change.
- Family members skip the centering check (BASE-04): the widest member is centered, and the others align their main shape to it.
- Good examples: `media/volume`, `media/volume_low`, `media/volume_off`

### FAM-02 Optical centering (should)
- When geometric centering looks off, an optical offset of up to 1 is allowed, and it must be listed here:
  - `media/play`: about 1 to the right

### FAM-03 Compare ink, not boxes (must)
- Judge size by the size ratio (BASE-05), never by the bounding box.

---

## 10 References REF

### REF-01 Find a reference before drawing (must)
- Before drawing a new icon, look for a reference structure on iconmcp.com (MIT) and in ISO 2575.
- Borrow composition and proportion only; details and style follow this file.

### REF-02 Copy the reference when it reads better (must)
- When the user supplies a reference and the redraw reads worse, copy the reference's structure and adjust only corners and proportions.

### REF-03 Regulatory icons (must)
- ISO 2575 / GB 4094 icons keep the standard's structure and only get detail refinements.

### REF-04 Refining existing icons (must)
- Keep the existing structure and element positions; change only contour and proportion details. Never invent a new icon.

---

## 11 Process PROC

### PROC-01 Before drawing (must)
- Read this file in full.
- List the batch for the user to confirm. For each icon, state the reference structure, the parts to reuse, whether it is regulatory, and whether it duplicates an existing icon.

### PROC-02 Delivery marks (must)
- Put a blue dot beside new icons and a green dot beside icons whose structure changed.
- Place each icon in its category canvas (General, Driving and navigation, Infotainment, Vehicle settings, Climate) and compare it with its neighbors.
- Canvas layout: 16 per row, x = 80 + i × 80, rows 80 apart, groups 40 apart.

### PROC-03 Checks (must)
- Before delivery, run every check in section 13. All must pass, or the exceptions are stated in the delivery note.
- Inspect at 8x zoom.

### PROC-04 Bulk fixes (must)
- Back up before fixing (for example the "pre-seam-fix backup" frame) and compare before and after.
- If an automatic fix makes things worse, roll it back and fix by hand.

### PROC-05 Feedback (must)
- Turn every piece of user feedback into a new rule or a revision of an existing rule, with an ID.
- After fixing a Figma comment, resolve it.

---

## 12 Exceptions EXC

| ID | Exception | Rules it departs from |
|---|---|---|
| EXC-01 | Turn-by-turn arrows (nav/*) keep their original assets: 3 px stroke, aligned to the road | BASE-04, BASE-06 |
| EXC-02 | Colored status icons (status/battery, warning, favorite) use status color variables | BASE-08 |
| EXC-03 | The check bend in `part/badge_check` uses a 0.75 radius | CORNER-02 |
| EXC-04 | `media/play` has a 1 px optical offset | BASE-04 |
| EXC-05 | Side-view car icons (the CAR-02 master) may reach an ink width of 40; the car stays 38 long | BASE-03 |
| EXC-06 | Bolts 10 or less tall inside charging icons keep their original drawing: a filled shape with a 0.75 to 1.25 stroke that rounds its corners, both bound to icon/1 (charging_station, wireless_charging, schedule_charge, battery_mid_charging) | BASE-06, BASE-09 |
| EXC-07 | Arrows that sit close to what they point at: the airflow arrows of the four vent icons (ac/left_face, left_foot, right_face, right_foot) near the seat, and the arrows of seek_forward_15 and cruise_control near their arcs; center distance may be 3 to 4 | SEAM-02 |
| EXC-08 | Structural spacing: the stacked layers of media/album, the battery terminals of vehicle/charge_limit and vehicle/range, the top rays of sidebar/lights_line, the lane end of drive/highway_preferred, and the F and power symbol of vehicle/screen_clean may sit 3 to 4 apart (center distance); confirm with the user before changing their structure | SEAM-02 |

---

## 13 Checklist (audit script map)

| Check | Rule | Fails when |
|---|---|---|
| structure | BASE-01 | Not 48 × 48, or missing keyline or glyph |
| nested | BASE-02 | Contains an INSTANCE node |
| extent | BASE-03 | Ink outside 4 to 44, width over 38, or height over 36 (EXC-05 aside) |
| center | BASE-04 | Center offset over 0.6 (FAM-01 family members and EXC-04 aside) |
| size | BASE-05 | Warning, not a fail: size ratio under 0.75 or over 1.05 (exempt list aside); send to visual review |
| stroke | BASE-06 | Stroke weight other than 2 (EXC-01 aside) |
| cap | BASE-06 | Any vertex cap or join is not ROUND |
| zero_seg | BASE-07 | Any segment shorter than 0.05 |
| color | BASE-08 | Any stroke or fill not bound to a variable |
| seam | SEAM-01, SEAM-02 | An endpoint is 0.5 to 2 from another stroke and is not a shared vertex |
| gap | SEAM-02 | An endpoint is 2 to 3.9 from another stroke (3.9 to 4 counts as measurement tolerance). Only unconnected strokes count: points on the same stroke whose path distance is under 3 times the straight distance are ignored, and so are strokes that share a vertex with or cross the endpoint's stroke (an arrowhead's wings and shaft, the arms of a cross) |
| join | SEAM-01 | An endpoint is under 0.5 from another stroke but not a shared vertex |

---

## Changelog

v1.2 (2026-11-13)
- BASE-05 moves from must to should: out-of-range size ratios go to visual review instead of failing outright.
- Added EXC-06: small bolts in charging icons keep their original drawing (fill plus a thin stroke).
- The gap check now compares only unconnected strokes, ignoring structural closeness such as arrowhead wings and crossing arms.
- Added EXC-07: airflow arrows and the arrows of seek_forward_15 and cruise_control may sit close to what they point at.
- Added EXC-08: structural spacing in 6 icons is listed as an exception pending visual review.

v1.1 (2026-11-13)
- BASE-05 gains an exemption: single-stroke and directional icons skip the size ratio.
- Added EXC-05: side-view car icons may reach an ink width of 40.
- FAM-01 now states that family members are not centered one by one; the widest member sets the center.
- Checklist: the gap check now stops at 3.9 (3.9 to 4 counts as measurement tolerance); added the join check.

v1.0 (2026-11-13)
- Gap unified as a clear gap of at least 2 (center distance at least 4). The audit `gap` check now flags center distances from 2 to 4.
- Ink limits unified at width ≤ 38 and height ≤ 36, enforced by the audit.
- CORNER-01 now forbids only mixing sharp and rounded corners; R2, R1.5 and R1 may share an icon by corner type.
- Filled parts are car_top and fan.
- Leftover pieces shorter than 2 beside a crossing break are removed.
- Added CORNER-06, the radius cap.
- Badge clearance is measured as base strokes at least 9.3 from the badge center.
