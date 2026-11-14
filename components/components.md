# 车机组件 v1.0

适用范围：车机中控屏。Figma 文件 lib test 的 05 Components 页，Library 分区。视觉方向 A：从导航卡延伸，大圆角、实色层、选中用实色块；尺寸和构图参考 Work 页的蔚来界面（D-118）。组件全部用 auto layout，颜色、间距、圆角、字体都绑 token，状态和尺寸是变体，文字和图标是属性。
英文版：[components.en.md](components.en.md)。

---

## 0 怎么读这份文件

- 每个组件有 ID（CMP-BTN 这类），Figma 组件描述里写了同一个 ID。
- 结构参考 Lexus guideline 的组件章节：先分类型，每种类型固定高度和用途，再写结构、状态和字数上限。数值全部是我们自己的 token。
- 最大字数按英文和中文分别给出，超出时换短的说法，不缩字号。
- 中文界面：把文字属性改成中文后，文字图层换成同名的 zh/ 文字样式（FONT-03）。

## 1 层级关系

从下到上：整屏底 surface/screen，面板 surface/panel，面板里的行和块 fill/3，浮层（toast、弹窗、ETA 条、地图按钮）surface/floating 或 surface/raised 加阴影，最上面是弹窗后的遮罩 overlay/scrim 和弹窗。数字越靠上，层级越高，同一时间只出现一个弹窗。

## 2 组件

### CMP-SCREEN 整屏模板 `screen`
| 项 | 规格 |
|---|---|
| 变体 | layout=A（窄面板在左）、B（宽面板在左） |
| 结构 | status-bar，Body（左右 30、间隔 20、高 728），dock |
| 属性 | Left panel、Right panel：换成 panel-sr、panel-map、panel-blank 的宽或窄版本 |
- 拼新界面：放一个 screen 实例，用属性换两块面板。应用页面要往面板里放内容时，把 screen 实例分离（Detach），再把右边面板换成 panel-blank 并分离，往里面放组件。

### CMP-PANEL 面板 `panel-map`、`panel-sr`、`panel-blank`
| 组件 | 内容 |
|---|---|
| panel-map | 地图底图，左上导航卡，左下 ETA 条，右上地图按钮，浮层离边 24 |
| panel-sr | 3D 场景和车速 |
| panel-blank | surface/panel，竖向 auto layout，内边距 40（拼界面时用），行间 16 |
- 宽 1000、窄 520，高 728，圆角 28。

### CMP-BAR 状态栏和 Dock `status-bar`、`dock`、`stepper`
- status-bar 1600 × 80：左档位（当前档 text/1，其他 text/3），中时间，右车外温度和头像，字都是 en/title/semibold。
- dock 1600 × 92：两端温度步进 stepper（左右箭头 32，数字 en/number/m/semibold），中间应用图标间隔 36。

### CMP-BTN 按钮 `button`
| 类型 | 底 | 字 | 用法 |
|---|---|---|---|
| primary | accent/fill | text/on-accent | 强调最高，每屏最多一个 |
| secondary | fill/2 | text/1 | 默认按钮 |
| tertiary | fill/2 | accent/default | 低强调，比如重置 |
| danger | fill/2 | state/danger | 退出、删除这类操作：灰底红字，不用整块红底 |
| 尺寸 | 高 | 左右内边距 | 字 | 用在 |
|---|---|---|---|---|
| M | 56 | 32 | en/body/m/medium | 弹窗按钮、面板底部的主要操作 |
| S | 48 | 24 | en/body/m/regular | 页面里的普通操作，比如全部关闭、重置 |
- 页面里不放大按钮：按钮最多 M，页面内容区默认用 S（作者反馈：大按钮像弹窗里的按钮）。
- 状态：default、pressed（secondary、tertiary、danger 叠 interaction/pressed，primary 整体 0.85）、focus（2 px border/focus）、disabled。
- 属性：Label、Show icon、Icon。圆角 full，图标和字间隔 12。
- 字数：M 英文 14、中文 6；S 英文 12、中文 5。两个按钮并排时等宽，主操作在左。

### CMP-CHIP 标签 `chip`
- 48 高，左右 24，圆角 full，字 en/body/m/regular。未选 fill/3 加 text/1，选中 accent/subtle 加 accent/default，禁用 fill/disabled。
- 单选或多选。字数：英文 14、中文 6。

### CMP-SEG 分段控件 `segmented`、`segment`
- 外框 fill/3，内边距 4，格高 48，选中格 fill/selected 实色块加 en/body/m/medium，未选 text/2。
- 2 到 4 格，单选。字数：两格时英文 12、中文 5；四格时英文 8、中文 3。

### CMP-SW 开关 `switch`
- 72 × 44，开 accent/default，关 fill/switch-off，禁用 fill/disabled；圆钮 36，用 icon/on-accent。
- 开关放在列表行右边，命中区是整行。

### CMP-SLD 滑杆 `slider`
- 轨道 240 × 8，底 fill/1，进度 accent/default，右边读数 en/body/m/medium。
- 变体 value=0、25、50、75、100；属性 Show value。

### CMP-ROW 一行列表 `list-row`、`list-header`
| 项 | 规格 |
|---|---|
| 结构 | 左边图标 32（可关）、标题 en/body/m/regular、副标题 en/caption/regular（可关）；右边操作或信息 |
| 右边 | none、chevron、value（文字加箭头）、switch、slider、button（S） |
| 尺寸 | 最小高 64（size/row），内边距上下 12、左右 24，元素间隔 16，圆角 20 |
| 状态 | default fill/3，pressed 叠 interaction/pressed，selected fill/selected，disabled fill/disabled |
- 行间隔 8，每行是一个圆角块，不用分隔线。一组行上面放分组标题（en/caption/regular，text/2）。
- 字数：标题英文 28、中文 14；右边文字英文 12、中文 7；数字 3 位。

### CMP-NAVITEM 侧边导航项 `side-nav-item`
- 设置这类页面的左栏。宽 240，高 56，图标 28，字 en/body/m。未选无底、text/2；选中 fill/2 圆角块、text/1 加 medium。
- 左栏和内容区之间一条 border/panel 竖线，间隔 32。

### CMP-TILE 功能卡 `tile`
- 200 × 104，内边距 16、左右 20，圆角 20。图标 32 在左上，状态（Level 2、Off）在右上，名字在左下（en/body/m/regular）。
- 状态：cool（accent/subtle 加 vehicle/cool，制冷开）、heat（vehicle/heat-bg 加 vehicle/heat，加热开）、on（fill/selected，其他功能开）、off（fill/3 加 icon/2）。
- 一行三张，间隔 16。冷暖色只给温度功能（COLOR-17）。

### CMP-LEVEL 读数卡 `level-card`
- 宽 240，内边距 20、左右 24，圆角 20，底 fill/3；标签 en/body/m/regular text/2，读数 en/number/l/medium，进度条 8 高。
- 车窗、座椅位置这类 0 到 100 的量。

### CMP-BANNER 提示条 `banner`
- 停在页面里，不自动消失。宽跟容器，内边距 20、左 28，圆角 20。
- 类型 info、success、warning、danger：底 state/*-bg，图标状态色 40，标题 en/body/l/medium text/1，细节 en/caption/regular text/2，右边可放一个 M secondary 按钮。
- 字数：标题英文 32、中文 16。

### CMP-TOAST Toast `toast`
- 浮在内容上，几秒后自动消失，不能点。屏幕或面板下方居中，离 Dock 至少 24。
- 类型 success、info、warning、danger、plain（纯文字）。surface/floating，圆角 full，最小高 72，内边距 20、左右 32（有图标时左 24），图标 40，字 en/body/l/medium，阴影 shadow/floating。
- 字数：英文 32、中文 14，只写一句。

### CMP-DLG 弹窗 `dialog`
| 尺寸 | 宽 | 按钮 |
|---|---|---|
| S | 560 | 两个 |
| M | 760 | 三个，或长标题 |
- surface/raised，圆角 28，内边距 32，标题 en/body/l/medium、正文 en/body/m/regular text/2，都居中；标题和正文间隔 12，正文和按钮间隔 36。按钮 M、等宽、间隔 16，主操作在左。
- 弹窗后面整屏压 overlay/scrim。退出、删除用 danger（灰底红字）。
- 字数：标题英文 40、中文 18；正文最多三行。

### CMP-NAV 导航 `nav-maneuver`、`nav-eta`、`map-controls`、`icon-button`
- 来自已确认的关键界面，保持原样：导航卡 360 宽、圆角 28、nav/maneuver 底；ETA 条胶囊、surface/floating；地图按钮组 icon-button 56 一格，竖向放右上。
- nav-maneuver 变体 turn=straight、right、left；属性 Distance、Road、Next distance、Arrival、Next maneuver、Show next。

## 3 用法规则

- **CMP-01 先用组件**（必须）：界面里能用组件的地方一律用实例，不画新的。缺组件时先补进 Library，再用。
- **CMP-02 不改样子**（必须）：实例只改属性和文字，不在实例上改颜色、圆角、间距；要别的样子做变体。
- **CMP-03 一屏一个主按钮**（必须）：primary 按钮每屏最多一个。
- **CMP-04 地图和场景用真组件**（必须）：地图、导航卡、SR 场景用 panel-map、panel-sr 和 nav 组件，不自己画。
- **CMP-05 浮层层级**（必须）：同一时间最多一个弹窗；toast 不挡主操作按钮。
- **CMP-06 比例看蔚来**（应）：新组件的尺寸和构图先对照 Work 页的蔚来界面（换算到 1600 宽约乘 0.83），不对时先改组件，不在页面上放大。
- **CMP-07 页面里用小按钮**（必须）：页面内容区的按钮用 S，M 只给弹窗和面板底部的主要操作。

## 4 验证（2026-11-14）

- 用 screen 实例重拼 Key A：状态栏、SR 面板、地图面板（导航卡、ETA 条、地图按钮）、Dock 和原稿一致，头像是占位圆。
- 用组件拼设置页，构图参考蔚来的设置页：左边 SR 面板；右边面板分侧边导航和内容区，内容区有功能卡、列表行（开关、数值、滑杆）和两个 S 按钮。全部是实例。放在 06 Screens 页的 Composed 分区。
- 方向 A、B、C 的对比小样留在 05 Components 页的 Direction samples 分区，作为 D-118 的记录。
