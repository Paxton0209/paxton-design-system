# Codex 命令：lib test 车机图标与关键组件（标准 v0.1）

发令：Claude · 2026-11-04 13:30 · 取代同名旧版（旧版要求平头尖角、照搬参考 Dock 布局，均已作废）

## 原则（先读）

1. **参考稿只看组成部分和气质。** Index 右侧的 NIO 界面只用来了解车机界面有哪些部分（Dock、地图控件、空调排、设置侧栏、媒体卡、弹窗）。组件结构、布局、配色、执行一律用我们的系统（SPEC 第 0 节、DECISIONS D-35）。**不 1:1 复刻参考组件。**
2. **以 Claude 的标杆为准。** 图标看 `Standard · HMI icon v0`（107:3044），组件看 `Standard · HMI components v0.1`（118:2809）。结构、命名、比对方式照做。
3. **只改 Index 页**，其他页面是旧稿不动。文件：https://www.figma.com/design/T6kCgDUKJIt2e2TfDSZzp8/lib-test

## 一、图标（SPEC 9.1）

| 用途 | 容器 | 图形区 | 线宽 |
| --- | --- | --- | --- |
| Dock、功能、地图控件 | 48 | 四周留 8 → 32；横向宽的图形可到约 40 | 2.5 |
| 状态栏 | 42 | 约 26 | 2 |
| 大号功能（空调排） | 52 | 同 48 | 3 |

- 线头和拐角**统一小圆头**（Round cap + Round join），填充小块圆角 1；同一图标不混用尖头和圆头。
- 颜色纯白 #FFFFFF；描边能保留就保留，不全部转填充。
- 每个图标内有定位框 `keyline`：无填充、无描边、锁定。视觉居中以光学平衡为准。
- 1600 宽画布按 40 使用（`rescale(40/48)`）。

已有标杆组件（照这个做）：

| 组件 | 节点 |
| --- | --- |
| icon/dock/home、car、seat-heat、volume | 107:3058、107:3071、107:3083、107:3091 |
| icon/nav/chevron-left、chevron-right、close | 112:3497、112:3504、116:2839 |
| icon/map/search、charging、overview | 116:2820、116:2826、116:2832 |
| icon/climate/power | 116:2844 |

**任务 1：补齐图标。** 按同一标准画参考稿里出现的其余图标：方向盘加热、前除雾（A）、后除雾、车内循环、制冷、MAX 制冷、MAX 制热、风量、香氛、通知、蓝牙、信号、录制、电量、设置、机动箭头（左转、右转、直行、掉头）。命名 `icon/<类别>/<名称>`。

**任务 2：替换。** 把 Index 上 HMI 组件（Dock、地图控件、状态栏、ETA 关闭、机动卡箭头、空调排）里的旧图标换成新组件实例。**组件结构和布局不变，只换图标。**

**任务 3：应用入口。** Dock 中间的应用图标不模仿他人品牌（苹果「音乐」「电话」等）。先用中性占位：同尺寸圆角方块（bg/raised + 1px line/control）+ 我们的线性图标。

## 二、关键组件（SPEC 13.1）

> 13:35 更新：本节任务 4、5 由 `codex/Figma-车机v0.1-测试.md` 取代；状态栏和 Dock 保持原样（D-52）。

Claude 已建 9 个组件集（变量集合 `HMI / v0.1`，Dark / Light 两个模式）：

| 组件集 | 节点 | 对应 Codex 旧组件 |
| --- | --- | --- |
| HMI v0.1 / button | 118:2835 | HMI / control/button |
| HMI v0.1 / icon-button | 118:2858 | HMI / control/icon-button |
| HMI v0.1 / stepper | 118:2891 | HMI / climate/fan-stepper、Dock 温度 |
| HMI v0.1 / segmented | 118:2915 | HMI / control/segmented |
| HMI v0.1 / tabs | 118:2970 | HMI / navigation/tabs |
| HMI v0.1 / switch | 118:2981 | HMI / settings/switch |
| HMI v0.1 / settings-row | 118:3003 | HMI / settings/row |
| HMI v0.1 / sidebar-item | 118:3039 | HMI / navigation/sidebar-item |
| HMI v0.1 / slider | 118:3058 | HMI / control/slider |

**任务 4：按同一规则补齐其余组件**（参考稿里出现、标杆里还没有的）：function-tile、seat/level、status-badge、media/transport、media/progress、media/track-row、媒体迷你卡、dialog、Dock 整条、状态栏、导航机动卡、ETA 条。规则：

- 颜色、圆角、尺寸全部绑 `HMI / v0.1` 变量或取 SPEC 13.1 的值，不写死色值；不再引用 `Cockpit / *` 的颜色（偏蓝灰、违反 r = g = b）。
- 字重只用 Regular / Medium（不要 Semibold）。
- 强调色只表示「当前、开启、进行到哪」（SPEC 13.1 强调色表）：标签下划线、开关开启、功能开启图标、滑杆已选段、媒体进度。主操作用强调材质（浮起 + 2px 墨色描边），不用蓝色实底；分段和侧栏选中用中性选中块。
- 深色灰阶用 `HMI / v0.1` 的冷调中性灰（#141416、#1C1C1E…），不要自己调色。
- 每个组件做全状态：默认、按下、选中、禁用（车里没有悬停）；浅色和深色都检查。
- 行与行之间不画分隔线，用间距分组。

**任务 5：替换到关键屏。** 用新组件重排 `01 Key Screens` 里的屏（复制一份做 After，原屏保留做 Before）。只换组件，不改信息架构。

## 三、批量时必须避开的坑（Claude 已踩过）

1. **`swapComponent` 会保留旧实例尺寸**：旧图标 32、新组件 48 时，换完再 `rescale` 会把内部几何放大错（keyline 变 60）。正确做法：删除旧实例，`createInstance()` 新建后 `rescale(40/48)`。
2. **嵌套实例不能改尺寸**（报错 `cannot be overridden: size`）。要改大小，在主组件里改，或做对应尺寸的组件；不要为了校验去解除正式组件的实例。
3. **先数槽位再放东西**：地图控件竖排只有 3 个槽位（搜索、充电、全览），Claude 曾把音量叠在外面「漏出来」。替换前先读真实组件的子节点。
4. 参考图标自带「白色填充 + 16 描边 + 透明度 0」的脏定位框，复制时删掉换干净 keyline。
5. 带旋转的形状按实际边界对齐，不按 x/y。
6. 从组里移出全部子图层后，空组会被自动删除，不要再删。
7. 改文字前按当前字体 `loadFontAsync`。

## 验收（交付前自查，结果写进报告）

- 脚本逐个读取图标：容器、四边留白、线宽、strokeCap / strokeJoin（必须 ROUND）、颜色，列出不一致项（应为空）。
- 脚本检查组件：所有颜色都绑定 `HMI / v0.1` 变量；字重只有 Regular / Medium；圆角只有 24 / 16 / 12 / 胶囊。
- 每个组件 Before / After 并排截图（同深色、默认状态），格式照 118:2809 里的 `Before (Codex) / After (标准 v0.1)`。
- 关键屏 Before / After 整屏并排截图。

## 报告

Index 页旁放 `Report · HMI v0.1` 画框，放比对表和截图；对话里回复「车机 v0.1 完成」，列出：图标数量、组件数量、替换了哪些屏、不一致项、未完成项、遇到的新问题（Claude 会写回设计系统）。
