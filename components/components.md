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

### CMP-POI 搜索结果行 poi-row
- 用途：搜索结果、历史、收藏、沿途搜、导航中的地点列表，全部用这一个组件。
- 结构：左边 48 的槽（leading=index 放序号，leading=icon 放家、公司等图标）；中间标题（24）和 Meta（距离 20 text/1，地址 20 text/2）；右边 Pin 和 Go 两个 56 圆按钮。
- 开关：Show meta、Show tags（tag S，高 32）、Show detail（充电或停车余量和价格，前面 40 的图标可换）、Show sub-POIs（停车场、出入口，用 chip）、Show pin、Show go。
- 配方：常规只开 Meta 和 Go；充电加 Tags 和 Detail；停车场加 Detail 和 Sub-POIs；美食加 Detail；沿途搜加 Tags；导航中加 Pin。Search 页有 poi-row recipes 示例。

## 3 用法规则

- **CMP-01 先用组件**（必须）：界面里能用组件的地方一律用实例，不画新的。缺组件时先补进 Library，再用。
- **CMP-02 不改样子**（必须）：实例只改属性和文字，不在实例上改颜色、圆角、间距；要别的样子做变体。
- **CMP-03 一屏一个主按钮**（必须）：primary 按钮每屏最多一个。
- **CMP-04 地图和场景用真组件**（必须）：地图、导航卡、SR 场景用 panel-map、panel-sr 和 nav 组件，不自己画。
- **CMP-05 浮层层级**（必须）：同一时间最多一个弹窗；toast 不挡主操作按钮。
- **CMP-06 比例看蔚来**（应）：新组件的尺寸和构图先对照 Work 页的蔚来界面（换算到 1600 宽约乘 0.83），不对时先改组件，不在页面上放大。
- **CMP-07 页面里用小按钮**（必须）：页面内容区的按钮用 S，M 只给弹窗和面板底部的主要操作。
- **CMP-08 屏幕分区**（必须）：左边窄面板（520 × 728）固定放 SR，用 panel-sr，不放应用内容。应用只放右边宽面板（1000 × 728，屏幕坐标 x 570、y 80）。检查：左面板是 panel-sr 实例；应用内容的外框都在右面板里。
- **CMP-09 弹窗只盖应用区**（必须）：压暗用 background 的 scrim（1000 × 728，圆角 radius/panel），只盖右边应用区，SR 不压暗。弹窗在应用区里水平、垂直都居中：x = 570 + (1000 − 弹窗宽) / 2，y = 80 + (728 − 弹窗高) / 2。检查：scrim 的位置是 (570, 80)；弹窗中心和应用区中心的偏差不超过 1。
- **CMP-10 toast 对齐应用区**（必须）：toast 在应用区里水平居中，贴上边或下边，离应用区边缘 24。不和弹窗同时出现。检查：toast 的中心 x 是 1070；上边距或下边距是 24。
- **CMP-11 应用区内的结构**（必须）：有分类的应用（设置、电话）左边放侧边导航或列表（侧边导航宽 240，约占应用区的 1/4，左右内边距 8，菜单项左右内边距 16；列表宽 400 到 440），中间 1 像素 border/panel 竖线，右边是内容。标签页固定在内容区顶部，标签页下面是滚动区；内容超过 728 时只让滚动区滚动。检查：内容区高 728，超出部分在名为 Scroll area 的滚动框里。
- **CMP-12 图标跟文字的比例**（必须）：参考稿的图标框约为字号的 1.7 倍。24 号字配 40 的图标，20、22 号字和按钮里配 32，chevron 32；单独出现的大图标（空状态）48。缩放用 resize，线宽保持 2。检查：侧边导航、列表行、poi-row、提示条、toast、功能卡的图标是 40，按钮里是 32。（2026-11-14 曾按墨迹推成 48，结果图标太大，已改回。）
- **CMP-13 图标颜色跟文字的颜色**（必须）：组件里的图标不在图层上改颜色，只在图标实例上切 Icon 模式。模式跟旁边文字的颜色一致：text/1 配 primary，text/2 配 secondary，text/3 配 tertiary，禁用配 disabled，强调色或导航卡上的白字配 on-accent，强调色文字配 accent；提示条和 toast 的状态图标用 danger、warning、success；加热用 heat。检查：图标实例里没有颜色覆盖；未选中的侧边导航文字是 text/2，图标是 secondary。
- **CMP-14 行内对齐**（必须）：列表类的行（list-row、poi-row、侧边导航）分三列：左边固定宽的槽放图标或序号，中间是文字，右边是按钮。三者的中心对在标题那一行上，不对在整行的中心上；标题行高等于左边槽的高（48）。同一列表里所有行的文字左边缘对齐。检查：左槽中心、标题行中心、右侧按钮中心的 y 偏差不超过 1。
- **CMP-15 放不下就渐隐**（必须）：列表、菜单在面板里放不下时，用渐隐遮罩：最后 96 像素从不透明渐变到透明，不截断半行，不加滚动条。遮罩只用透明度，不用颜色，所以深浅模式都成立。检查：超出容器的列表有名为 Fade mask 的遮罩。
- **CMP-16 字号先统一**（必须）：应用区里先只用 24（主要文字、标签、按钮、标签页、菜单）和 20（次要说明、单位、地址）两种字号，用颜色（text/1、text/2）分层级，不用字号分。大数字（车速、温度、通话头像）和导航卡不在此列。定稿后再按需要微调。检查：一屏应用区里的字号种类不超过 2 种（大数字除外）。
- **CMP-17 内容跟菜单对上**（必须）：侧边导航选中哪一项，右边就显示那一项的内容；示例里的菜单顺序按 Work 页设置菜单的顺序（我的车、AI 助手、座椅、座舱、门窗锁、电池、驾驶辅助，分隔线，连接、显示、声音、系统）。检查：选中项的名字和内容区的标题属于同一个类别。
- **CMP-18 一个面板一种灰**（必须）：同一块面板或卡片里，行、输入框、搜索框、分段控件用同一档填充 fill/3；行里面的按钮（去这里、定位、chevron）不加底，只留 56 的命中区。浮在地图上的应用卡片和应用面板同色，用 surface/panel，不另用 surface/floating。检查：一块卡片里出现的中性填充只有 fill/3 一种。
- **CMP-19 图标选得准**（必须）：只用库里的图标（icon-guideline USE-01），菜单优先 sidebar/*；没有就放占位图标，不临时画。意思要和文字在同一层级：电池不用尖角的导航闪电，座舱不用空调图标，部件不进界面。设置菜单第一项是快捷。
- **CMP-20 侧边导航不放标题**（必须）：设置类应用的侧边导航从第一项开始，不在上面放应用名；图标和文字的间距 12。检查：Side nav 的第一个子节点是菜单项。
- **CMP-21 可调就要有手柄**（必须）：能拖动调节的条（亮度、音量）用 slider，必须有 28 的白色拖动点；只显示进度、不能调的用 progress，没有拖动点。检查：slider 实例里有 Thumb。
- **CMP-22 光标贴着文字**（必须）：输入框和搜索框里光标和文字的间距是 2，不跟随布局间距。检查：Caret 和前面的文字在同一个 Query group 或 Value group 里，间距 2。
- **CMP-23 按钮不能被截断**（必须）：一行按钮的总宽不能超过所在列的可用宽；按钮宽度跟文字走（M 最小 160，S 最小 120），不写死宽度；弹窗底部的按钮在实例上设为填满。放不下时先改用 S，再去掉次要按钮的图标，仍放不下就换行，不允许截断文字或按钮。菜单项文字放不下时换更短的词（Locks、Assist、Network），不截断。检查：每个按钮的文字宽小于按钮宽减左右内边距，按钮组宽不超过父级可用宽。
- **CMP-24 toast 不压内容**（必须）：应用区顶部有标签页或标题时，toast 放在应用区底边（离下边 24），不放顶边。
- **CMP-25 侧边导航按参考稿**（必须）：导航底用 surface/sidebar，比内容区暗一档、但明显不是黑色，应用面板外圈 1 像素 border/panel 描边，不加竖线（surface/canvas 接近屏幕底的黑，会和背景融在一起）；左右内缩 12、顶部 32；每项是 64 高的胶囊，间距 8，选中 fill/2；文字一律 text/1，未选中只把图标降到 secondary；分组线左右内缩 20。检查：Side nav 没有相邻的竖线，未选中项的文字绑 text/1。
- **CMP-26 内容区节奏**（必须）：内容区左右 48、顶部 40；分区标题（list-header，20 号 text/1，无内边距）到内容 32，内容到分隔线 48，分隔线到下一个标题 32；分区之间用贯穿全宽的 1 像素 border/panel。区内所有元素左边缘对齐在同一条线上。检查：内容区里各分区子元素的左边缘 x 只有一个值。
- **CMP-27 卡片和列表行分开**（必须）：卡片里放的功能要先调研真实车型（快捷面板参考特斯拉 Quick Controls：灯光、后视镜、车窗锁、儿童锁、方向盘、屏幕亮度），不放属于其他分类的功能（驾驶模式、座椅加热）。需要底色的是卡片（tile），用 surface/raised 实色，三角布局；列表行（list-row、poi-row）没有底色。卡片铺满内容宽：三列 208 × 112，两列 322 × 112，间距 20。检查：卡片行总宽等于内容区宽。
- **CMP-28 滚动方式**（必须）：内容区放不下时用 scrollbar（宽 4，fill/scrollbar，贴右边内缩 8）；侧边菜单放不下时用渐隐（CMP-15）。
- **CMP-29 不放多余的东西**（必须）：一级页面不放返回按钮；应用内的搜索框不放语音按钮（语音由全局入口负责）；能用底色差或间距分开的地方不加分隔线。检查：没有指向上一级的返回按钮出现在一级页面。
- **CMP-30 固定宽组件放进可伸缩的位置要拉伸**（必须）：分段控件、搜索框这类有默认宽的组件，放进比它宽的容器时设为填满，不留右边空白；容器里随内容变宽的部分（如 poi-row 的 Trailing）设为跟内容走，不写死宽度，避免被截。检查：没有子元素超出父级的右边缘，也没有超过 40 的无意义空白。
- **CMP-31 一组图标看起来一样大**（必须）：同一个菜单、同一排按钮、同一组卡片里，体感比差值 ≤0.1，并且墨迹最长边和这一组的中位数相差 ≤4（例如菜单里多数是 24–28，就不能放一个 34 高的闪电）。细长、稀疏的形状公式算不准，最长边这一条兜底。检查：两项都算一遍，再整列目视比一次。

## 4 验证（2026-11-14）

- 用 screen 实例重拼 Key A：状态栏、SR 面板、地图面板（导航卡、ETA 条、地图按钮）、Dock 和原稿一致，头像是占位圆。
- 用组件拼设置页，构图参考蔚来的设置页：左边 SR 面板；右边面板分侧边导航和内容区，内容区有功能卡、列表行（开关、数值、滑杆）和两个 S 按钮。全部是实例。放在 06 Screens 页的 Composed 分区。
- 方向 A、B、C 的对比小样留在 05 Components 页的 Direction samples 分区，作为 D-118 的记录。

## 5 Library 画布 LIB

- **LIB-01 不留右边空**（必须）：画板宽度跟内容走。内容本身有固定宽（如图标按 80 网格排成的 1408）时，画板收到内容宽加左右 120，不拉宽内容，也不在右边留空。检查：画板宽 = 最宽子节点 + 240。
- **LIB-02 不叠底**（必须）：画板里的分组框不设填充，组件直接放在画板底色上；画板底色只有 surface/canvas 一层。检查：画板里没有带填充的分组框（组件和示例屏除外）。
- **LIB-03 Library 只放组件**（必须）：规范文档放在仓库（icons/、components/、color/ 等），不放进 Library 文件；Library 里只有组件、构建块和每页一句说明，示例只放 Examples 页。被新组件取代的旧组件直接删掉，不留两种做法。检查：没有名为 Guide、Guideline 的画板；Search 页没有 search-suggestion。
