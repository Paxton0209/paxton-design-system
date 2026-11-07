# 组件规格

版本 1.2 · 2026-11-07（`radius-panel` 改为 8；内容模式标签页用文字 1 下划线）· 规则依据 `SPEC.md`，数值只用 `tokens/tokens.css`。

## 0. 通用约定

**命名**：类名前缀 `ds-`，修饰用 `--`（`.ds-btn--primary`），状态用 `is-`。

**强制状态类**：展示页需要把所有状态同时显示，所以每个组件的伪类状态都要有一个等价的类，样式写在同一条规则里：

| 伪类 | 等价类 |
| --- | --- |
| `:hover`（仅 `(hover:hover) and (pointer:fine)`） | `.is-hover`（不受媒体查询限制） |
| `:active` | `.is-active` |
| `:focus-visible` | `.is-focus` |
| `:disabled` / `[aria-disabled=true]` | `.is-disabled` |

选中状态用真实属性（`aria-checked`、`aria-selected`、`aria-current`、`aria-pressed`），不另设类。

**层与圆角**：组件默认按「面板里的控件」取 `radius-control`（6）。直接放在底上时加 `.ds-on-ground`，圆角改为 `radius-panel`（8）。

**间距**：组件表没写手机值的间距，手机上以 SPEC 第 6 节为准；SPEC 也没写的，沿用桌面值。

**尺寸**：桌面尺寸为默认；`@media (max-width: 639px)` 下自动切到手机尺寸（高度 44 或表中数值）。也可以用 `.ds-touch` 在任何宽度强制手机尺寸。

**通用状态**（SPEC 第 10 节）在下面各组件里不再重复，只写差异。

**语义**：优先用原生元素（`button`、`input`、`select` 的替代品要补齐 ARIA）。只有图标的控件必须有 `aria-label` 和悬停提示。

**动效**：只动 transform 和 opacity；`prefers-reduced-motion: reduce` 时去掉位移和缩放。

---

## 1. 按钮 `.ds-btn`

| 变体 | 类 | 材质 | 文字 |
| --- | --- | --- | --- |
| 普通 | `.ds-btn` | 浮起（浅色有 `shadow-lift`） | `text-ui-strong`，文字 1 |
| 主操作 | `.ds-btn--primary` | `color-accent-fill` 填充，无边无投影 | `text-ui-strong`，`color-on-accent` |
| 文字 | `.ds-btn--text` | 无底无边 | `text-ui`，文字 1 |
| 图标 | `.ds-btn--icon` | 同普通，正方形，图标 16 | 无文字，必须 `aria-label` |

| 尺寸 | 桌面 | 手机 |
| --- | --- | --- |
| 高 | `size-button`（32） | `size-touch`（44） |
| 左右内边距 | 12（`space-5`） | 16（`space-6`） |
| 图标与文字间距 | `space-4`（8） | 同左 |
| 图标按钮 | 28 × 28（`size-control`），命中区补到 44 | 44 × 44 |

- 主操作按钮每屏只有一个（含对话框）。禁用时：轨道底 + 文字 3，不再叠加 0.45 透明度。旧类名 `.ds-btn--emphasis` 作为别名保留一轮，样式与 `--primary` 相同。
- 加载：文字换成「Loading…」，`disabled`，宽度不变（`min-width` 取加载前宽度）。
- 通栏按钮（`.ds-btn--block`，宽 100%）不加投影，只留控件边。
- 按钮内图标用 `currentColor`。

## 2. 分段控件 `.ds-seg`

结构：`div.ds-seg[role=radiogroup]` > `span.ds-seg__thumb` + `button.ds-seg__item[role=radio][aria-checked]` × n。

| 部位 | 桌面 | 手机 |
| --- | --- | --- |
| 轨道 | 高 28，内边距 2，`color-track`，不加边，`radius-control` | 高 40 |
| 滑块 | 高 24，选中块材质（浅色带 `line-selected` 边，深色无边），`radius-thumb`，无投影 | 高 36 |
| 选项文字 | 未选 `text-ui` 文字 2，选中 `text-ui-strong` 文字 1（填充差达不到 3:1，必须加文字级差） | 同左 |
| 仅图标选项的图标 | 未选文字 2，选中文字 1 | 同左 |
| 仅图标选项 | 图标 16，每项 `aria-label` + 悬停提示 | 同左 |

- 各项等宽。滑块只由脚本用 `transform: translateX()` 定位，CSS 不再给位移（DriveScene 教训：两处同时定位会错位）。滑块移动 `motion-base` + `motion-ease`。
- 键盘：左右方向键移动并选中，Home / End 到首尾；整个控件只有选中项可 Tab 到（roving tabindex）。
- 手机命中区：每项用伪元素上下各扩 2，达到 44。

## 3. 开关 `.ds-switch`

结构：`button.ds-switch[role=switch][aria-checked]`；带文字时用 `.ds-switch-row`（整行可点，文字在左，开关在右）。

| 部位 | 值 |
| --- | --- |
| 轨道 | 28 × 16，`radius-pill`；关 `color-switch-off`，开 `color-accent` |
| 圆点 | 12，`color-on-accent`，左右留 2；开启时 `translateX(12px)`，`motion-base` |
| 行 | 高 32（手机 44），文字 `text-ui`，文字 2 |

- 禁用：整体 0.45。
- 键盘：空格和回车切换。

## 4. 下拉与菜单 `.ds-select` + `.ds-menu`

触发器：`button.ds-select[aria-haspopup=listbox][aria-expanded]`，左侧当前值，右侧 16 的下箭头（文字 2）。

| 部位 | 桌面 | 手机 |
| --- | --- | --- |
| 触发器 | 高 28，左内边距 8、右 28，轨道材质，`text-ui` 文字 1 | 高 40 |
| 菜单 | 浮层材质，`radius-panel`，内边距 4，宽度与触发器相同（最小 160） | 同左 |
| 条目 | 高 28（手机 44），`radius-control`，左右 8；当前选中项用 `color-selected-row`、`text-ui-strong` 文字 1，浮层内无边、无勾号；未选项用 `text-ui` 文字 2 | |

- 打开：`motion-menu`，`scale .98 → 1` 加淡入，原点在触发器一侧；关闭不做动画。
- 条目悬停按通用规则（0.7），保持原底色。
- 键盘：回车 / 空格 / 下方向键打开；上下移动；回车选中并关闭；Esc 关闭，焦点回到触发器；点外部关闭。
- 层级 `z-menu`。
- **展开方向按所在区域定，不按单个菜单的高度临时判断**：贴在面板底部的区域（例如导出区）里的下拉，一律向上展开；其他位置一律向下展开。同一组相邻的下拉方向必须一致。只有当前方向的空间放不下整个菜单时才翻转，而且整组一起翻转。
- 菜单不能盖住同一区域的主操作按钮（例如 Export）。
- 菜单与触发器间距 4，左缘与触发器对齐；动效原点在靠近触发器的一边（向上展开时原点在底边）。

## 5. 文本输入 `.ds-field`

结构：`label.ds-field` > `span.ds-field__label` + `input.ds-input` + 可选 `span.ds-field__hint`。

| 部位 | 值 |
| --- | --- |
| 标签 | `text-ui`，文字 2，在输入框上方 4 |
| 输入框 | 高 28（手机 40），左右 8，轨道材质，`radius-control`，`text-ui` 文字 1；手机字号 16 防止 iOS 缩放 |
| 占位提示 | 文字 3 |
| 说明 | `text-meta`，文字 2，下方 4 |
| 错误 | 说明换成错误文字（`color-danger`）+ 16 警示图标；输入框边改为 1px `color-danger`；`aria-invalid=true`，`aria-describedby` 指向错误文字 |

- 焦点：通用焦点环，输入框边不另变色。
- 多行输入 `.ds-input--area`：最小高 72，内边距 8。

## 6. 复选框 `.ds-check`

结构：`label.ds-check` > `input[type=checkbox]`（视觉隐藏，保留焦点）+ `span.ds-check__box` + 文字。

| 状态 | 外观 |
| --- | --- |
| 未选 | 16 × 16，`radius-thumb`，轨道材质 |
| 选中 | 底 `color-accent`，勾号 `color-on-accent` |
| 部分选中 | 同选中，图形换成横线 |

- 行高 32（手机 44），框与文字间距 8，文字 `text-ui` 文字 1。

## 7. 单选 `.ds-radio`

与复选框相同结构，圆形 16。选中：底 `color-accent`，中心 6 的 `color-on-accent` 圆点（高亮用填充，不用描边）。同组用 `fieldset` + `legend`（legend 用 `text-ui-title` 文字 2）；方向键在组内移动。

## 8. 滑杆 `.ds-slider`

基于 `input[type=range]`，统一重绘：

| 部位 | 值 |
| --- | --- |
| 轨道 | 高 4，`radius-pill`，`color-mass`；已选部分 `color-accent` |
| 滑块 | 圆角矩形 12 × 16，`radius-thumb`；底 `color-ink`，外加 1.5px `color-canvas` 分隔边（浅深都能与已填充和未填充轨道区分） |
| 焦点 | 焦点环画在滑块上，2px 文字 1，偏移 2，跟随滑块圆角；不框整条滑杆 |
| 数值 | 右侧 `text-ui`，文字 1，`tabular-nums`，宽度固定 |
| 命中区 | 行高 32（手机 44） |

## 9. 标签页 `.ds-tabs`

结构：`div[role=tablist]` > `button[role=tab][aria-selected]`；面板 `div[role=tabpanel]`。

- 字号：工具里用 `text-ui`，内容页用 `text-body`（作品集筛选）。未选文字 2；选中文字 1 + 500，下方 2px 下划线，距文字基线 6，与文字等宽：工具里用 `color-accent`，内容页用 `color-text-1`（内容模式不用强调色，SPEC 3.2）。
- 标签之间 24；不加底色和外框。
- 键盘：左右方向键切换，Home / End。

## 10. 列表行 `.ds-row`

结构：`a` 或 `button.ds-row`（选中用 `aria-current` / `aria-selected`）> 可选前置（16 图标或 32 × 24 缩略图）+ 文字 + 可选后置（`text-meta` 文字 2 或 16 图标）。

| 部位 | 桌面 | 手机 |
| --- | --- | --- |
| 高 | 32 | 44 |
| 内边距 | 左右 8 | 左右 12 |
| 文字 | `text-ui` 文字 2；选中 `text-ui-strong` 文字 1 | 同左 |
| 选中 | `color-selected-row`、`radius-control`。浅色面上加 1px `color-line-selected`，深色边透明 | 同左 |

- 悬停按通用规则（0.7），保持原底色。
- 列表组：组标题（`.ds-group-title`）在上，标题到首行 4（手机 2），行距 0，组间 24（手机 28）。

## 11. 卡片 `.ds-card`

| 变体 | 类 | 规格 |
| --- | --- | --- |
| 普通卡 | `.ds-card` | 浮起材质，内边距 16，面板里 `radius-control`，放在底上 `radius-panel` |
| 媒体卡 | `.ds-card--media` | 作品集关键页的作品卡（以关键页现状为准）：图片比例 468:262，标题叠在封面上：底部 45% 加 0 → .4 的黑色遮罩，标题 400 16/22 白色，年份 13/18 不透明 .75、`tabular-nums`，左右 16、底 14；无图时底 `color-placeholder`、文字用文字 1 |
| 图下标题卡 | `.ds-card--caption` | 只用于新页面：图片上不压文字，标题和年份在图片下方 12 |
| 工具卡 | `.ds-card--tile` | 高 124，`radius-panel`，底 `color-placeholder`，标题 `text-title`（作品集原为 15/500，统一为 16/22），左 16、底 12 |

- 整卡可点时，用一个 `a` 包住整卡，焦点环跟随卡片圆角。

## 12. 面板 `.ds-panel`

- 面材质，`radius-panel`，内边距上 16、左右 16、下 12。
- 组标题 `.ds-group-title`：`text-ui-title`，文字 2，高 16，到首行 4（手机 2）。
- 属性行 `.ds-prop`：高 32（手机 44），标签列 64（手机 72）+ 控件填满，标签 `text-ui` 文字 2。
- 叠放属性 `.ds-prop--stacked`（手机，标签在上）：标签 `text-ui-name` 400 文字 1，标签到控件 6，控件 44，下一项距离 16；间距全部按 SPEC 6.1。
- 组间 24（手机 28）。
- 底部固定区 `.ds-panel__footer`：上方 1px `color-line`（左右缩进 16），内边距上 16。

## 13. 提示气泡 `.ds-tooltip`

- 高 24，左右 8，`radius-control`，底 `color-text-1`，文字 `color-face`（小元素允许反色），`text-ui-caption`。
- 悬停 `motion-delay`（400ms）后出现，淡入 `motion-fast`（120ms）；离开立即消失；键盘焦点同样显示。
- `role=tooltip`，触发元素 `aria-describedby`；层级 `z-tooltip`。

## 14. 对话框 `.ds-dialog`

- 原生 `dialog` 元素，`showModal()`。遮罩 `color-scrim`。
- 浮起材质 + `shadow-dialog`，`radius-stage`（16），宽 `min(480px, 100vw − 32px)`，内边距 24。
- 标题 `text-heading`，正文 `text-body` 文字 2，按钮区右对齐、间距 8：主操作按钮在最右（桌面系统惯例），左边是普通或文字按钮。车机相反，主操作在左（SPEC 13.1）。
- 危险操作的主按钮用 `danger` 填充 + 白字时，先确认对比度 ≥ 4.5；达不到就用普通按钮 + `danger` 文字。
- Esc 关闭；打开时焦点到第一个可操作元素，关闭后回到触发器；层级 `z-dialog`。
- 打开：淡入 + `scale .98 → 1`，`motion-menu`。

## 15. 提示条 `.ds-toast`

- 浮层材质，`radius-panel`，高 40（手机 44），左右 12，`text-ui` 文字 1；可带一个文字按钮。
- 位置：底部居中，距底 24；多条叠放间距 8，最多 3 条。
- 4 秒后自动消失（脚本计时，常量写在 components.js 顶部）；悬停或焦点在内时暂停。`role=status`（错误用 `role=alert`，并配错误图标）。层级 `z-toast`。

## 16. 空状态 `.ds-empty`

- 1px 虚线框（`color-line-strong`，3 / 3），`radius-panel`，内边距 32，内容居中。
- 标题 `text-title` 文字 1；一句说明 `text-meta` 文字 2，间距 4；可选一个普通按钮，上方 16。
- 不放插图和大图标。

## 17. 骨架 `.ds-skel`

- 条：高 8，`radius-thumb`，`color-placeholder`；块：任意尺寸，圆角按所在层。
- 加载中透明度在 .6 和 1 之间缓慢往返，一个周期 `motion-pulse`（1200ms）；减少动态效果时静止。不用渐变扫光。骨架是结构占位，不受 SPEC 第 8 节「低清预览 ≤ 0.34」的限制。
- 骨架尺寸接近真实内容，加载完成后原位替换，不跳动。

## 18. 链接 `.ds-link`

- 文字 1，下划线 1px `color-line-strong`，偏移 4；内容页正文里的链接用这个。
- 悬停 0.7；外链不加额外图标。
- 导航类链接（不在正文里）可以不加下划线，用文字 2 → 当前项文字 1 区分。

## 19. 标签 `.ds-tag`

- 高 22，左右 8，`radius-control`，`text-ui-caption`。
- 两种：中性（轨道材质，文字 2）、浮起（浮起材质，文字 1，用来点名一个时刻或状态）。
- 标签之间 6（`space-3`）。不可点；可点的用按钮。

---

## 交付要求（参考实现与展示页）

- `components/components.css`：只引用 `tokens/tokens.css` 的变量；每个组件一个区块，顺序同本文。
- `components/components.js`：只做行为（分段滑块定位与键盘、下拉菜单、标签页键盘、提示气泡、提示条、对话框焦点），不依赖任何库，ES 模块，每个组件一个 `init` 函数并自动初始化 `[data-ds]` 元素。
- `gallery.html`：
  - 页面左右两列，左列 `data-theme=light`、右列 `data-theme=dark`，同一组件同一行对齐。
  - 每个组件一节，横向排开全部状态：默认、悬停、按下、选中、选中后悬停、键盘焦点、禁用（不适用的状态省略并注明）。
  - 第二部分：桌面和手机尺寸（`.ds-touch`）各一套。
  - 最后：一个小型「工具面板」组合示例（面板 + 分段 + 开关 + 下拉 + 主操作按钮）和一个「作品卡网格」组合示例。

---

## 20. 胶囊 `.ds-chip`（仅内容页）

- 高 36（手机 44），左右 16，`radius-pill`，`color-track` 底，无边无投影，`text-meta` 文字 1。
- 用作导航、标签、联系方式、次要按钮；可点时是 `a` 或 `button`，不可点时是 `span`。
- 当前项（导航）：`aria-current`，底 `color-raised` + 1px `color-line-control`。
- 主行动 `.ds-chip--primary`：底 `color-ink`，文字 `color-face`；每页最多一个。
- 胶囊之间 8；只有图标的胶囊为 36 × 36 圆形，必须 `aria-label`。

## 21. 引文 `.ds-quote`（仅内容页）

- `color-track` 底，`radius-panel`，内边距 16，最大宽 640。
- 引文 `text-body` 文字 1；出处 `text-meta` 文字 2，在下方 4。语义用 `figure` > `blockquote` + `figcaption`。

## 22. 小节 `.ds-section`（仅内容页）

- 小节标签 `text-body` 文字 2，到正文 12；正文段落之间 12。
- 小节之间 32；需要分隔时在小节之间加 1px `color-line`，上下各 32。
- 左栏目录 `.ds-index`：`text-body` 文字 1 的链接列表，行距 4，当前小节文字 1、其余文字 2。
