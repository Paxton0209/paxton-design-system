# 车机颜色 token v1.1

适用范围：车机中控屏，日（Light）、夜（Dark）两个模式。Figma 文件 lib test（T6kCgDUKJIt2e2TfDSZzp8），变量集合 Primitives（原色）和 Color（语义）。网页颜色仍按 SPEC 第 2 节，网页强调色保持 #1471D6。
英文版：[color-tokens.en.md](color-tokens.en.md)。

---

## 0 怎么读这份文件

- 按规则 ID 查找对应条目。图示在 selected icon 页，可用 `Guide i18n` 切换中英文，用 `Color` 切换日夜。[Figma Color Guide](https://www.figma.com/design/T6kCgDUKJIt2e2TfDSZzp8/lib-test?node-id=932-1829)
- 必须：违反即不合格。应：默认做法，偏离时写明 ID 和理由。
- 模式名在 Figma 里是 Light 和 Dark，文档写作日（Light）、夜（Dark）。
- 这一版只有日、夜两个模式，不做高对比模式。

## 1 规则

### COLOR-01 两层结构（必须）
- 原色集合 `Primitives`：一个模式，只放色阶，不写用途。原色不直接绑到任何图层上。
- 语义集合 `Color`：两个模式 Light（日）和 Dark（夜），每个值都引用原色（alias），不写死色值。
- 组件、图标、文档只绑语义 token。唯一例外是 Figma Color Guide 画框里的原色色板，它们直接绑原色，用来展示色阶。
- 检查：audit `color-alias`（语义 token 的值全部是 alias）、`color-bind`（图层上没有直接绑原色、没有写死的颜色）

### COLOR-02 保留变量 ID（必须）
- Color 集合由原来的 HMI / v0.1 改名而来，变量 ID 不变，图标和组件的现有绑定都保留。
- 改值时只换引用的原色，不删了重建；要改名的 token 走 COLOR-10。

### COLOR-03 只有一个蓝（必须）
- `accent`、`accent/fill`、`map/route`、`map/puck-arrow` 都引用同一组蓝：日 `blue/500` #007AFF，夜 `blue/400` #0A84FF。
- 车机界面的强调色只用这一组蓝。独立的 AI 语音光效色板按 COLOR-12 使用。

### COLOR-04 强调色的用法（必须）
- 用于当前、开启、进行到哪：开关开启、选中下划线、进度、已选值、开启的图标。
- 不做正文文字色。每屏最多一个强调色填充的主按钮。
- 按钮上的字用 `on-accent`（白）。车机按钮字号 ≥ 24，属于大字，3:1 即可：日 4.02、夜 3.65，达标。

### COLOR-05 对比度门槛（必须）
| 用途 | 门槛 |
|---|---|
| 小于 24 的文字（车机最小字号 20） | ≥ 4.5:1 |
| 24 及以上的文字 | ≥ 3:1 |
| 图标、控件边界、状态图形 | ≥ 3:1 |
| 相邻两层填充 | ≥ 1.25:1；不够时加 1px 边（沿用 SPEC 3.1） |
- 对比度按实际背景计算。通用面板文字要核对 canvas、face 和 raised。叠在场景上的内容先把透明前景与背景合成，再测实际对比度，覆盖日夜模式及最亮的典型背景。
- 面板内的 20 号说明文字用 `text/2`，专用场景与导航标签按 COLOR-11 核对。`text/3` 只用于 24 及以上的字和图标。

### COLOR-06 状态色（必须）
- `danger`、`status/success`、`status/warning` 必须配图标或文字，不能只靠颜色传达。
- 填充用 `danger/fill`，上面放白字。

### COLOR-07 线和边（必须）
- 线用半透明黑或白，通过语义 token 绑定。在实际背景上检查线的分隔效果。
- `line/face`：面的边；`line/control`：控件的边；`line/selected`：选中块的边，夜间透明。

### COLOR-08 地图色板（应）
- 地图色（陆地、水、公园、五级道路、已走路线、定位点）是独立的领域色板，按日、夜两套原色写在 `map/` 组下，只给地图用，其他组件不引用。

### COLOR-09 命名（必须）
- 原色：`色名/色阶`，如 `blue/500`、`cool/925`；透明色：`white/a8`、`black/a5`（数字是不透明度百分比）。
- 语义：`用途/级别`，如 `text/1`、`bg/raised`、`status/warning`。不在语义名里写颜色名。

### COLOR-10 修改流程（必须）
- 改值：只改原色或改语义 token 引用的原色，不在图层上改。
- 改名或删除语义 token：列出受影响的组件和绑定数，作者确认后再改。
- 每次改动都重算 COLOR-05 的对比度表。

### COLOR-11 场景叠层（必须）

直接叠在 SR、地图或影像上的主要文字和关键图标用纯白。次要文字和图标默认用 `foreground/on-media-secondary`（85% 白），透明控件底用 `overlay/scene`（15% 白）。在亮路面、浅天空或影像高光上，先给信息背后加局部暗底，再按 COLOR-05 测量。固定浅色面板内部按面板灰阶组织层级。

绿色导航卡的辅助分支用 20% 白，主转向箭头保持纯白。深色 ETA 卡的次要标签用 60% 白，浅色 ETA 卡用标准次要文字色。Figma 参考稿中，音乐卡的低强调进度底轨为 8% 白，EP 的地图辅助图标和音量填充分别为 85% 白、15% 白。底轨和辅助分支的低透明度只用于辅助图形，实际承载状态或操作识别的图形按 COLOR-05 核对。

### COLOR-12 SR 材质与 AI 语音（必须）

SR 材质使用 `scene/*`，按天空与地景、道路与标线、建筑与玻璃、停车设施查找。AI 语音使用 `ai/<state>/<index>`，按聆听、思考、说话和主动建议查看状态。预览用真实渐变，每个色标绑定对应变量。聆听、说话和主动建议的两端为 0% 不透明度，思考文字渐变保留有色端点。渐变样本使用同一层圆角裁切，透明端直接露出实际背景。[Figma AI 语音色带](https://www.figma.com/design/T6kCgDUKJIt2e2TfDSZzp8/lib-test?node-id=934-1737)

---

## 2 原色（Primitives）

### 中性灰：日间（纯灰）
| token | 值 | 现在用在 |
|---|---|---|
| gray/0 | #FFFFFF | 日 bg/raised、夜 icon/1、on-accent |
| gray/25 | #FAFAFA | 日 bg/face |
| gray/50 | #F3F3F3 | 日 bg/canvas、bg/pressed |
| gray/75 | #ECECEC | 日 bg/track |
| gray/200 | #D2D2D2 | 日 bg/mass |
| gray/500 | #8C8C8C | 日 text/3、icon/3、switch/off |
| gray/600 | #6E6E6E | 日 text/2、icon/2 |
| gray/950 | #1D1D1F | 日 text/1、icon/1 |

### 中性灰：夜间（带一点冷调）
| token | 值 | 现在用在 |
|---|---|---|
| cool/50 | #EDEDEF | 夜 text/1 |
| cool/300 | #A0A0A4 | 夜 text/2、icon/2 |
| cool/400 | #7A7A7E | 夜 text/3、icon/3 |
| cool/450 | #6E6E72 | 夜 switch/off |
| cool/750 | #3A3A3C | 夜 bg/mass |
| cool/800 | #333336 | 夜 bg/selected |
| cool/850 | #262628 | 夜 bg/pressed |
| cool/900 | #1C1C1E | 夜 bg/raised、bg/track |
| cool/925 | #141416 | 夜 bg/face |
| cool/950 | #0A0A0B | 夜 bg/canvas |

### 彩色
| token | 值 | 用途 |
|---|---|---|
| blue/500 | #007AFF | 日 强调色、路线 |
| blue/400 | #0A84FF | 夜 强调色、路线 |
| red/600 | #C62828 | 日 danger、danger/fill |
| red/500 | #D9362B | 夜 danger/fill |
| red/400 | #FF6B60 | 夜 danger |
| green/600 | #1F9D3A | 日 success |
| green/400 | #32D74B | 夜 success |
| amber/600 | #B86E00 | 日 warning |
| amber/400 | #FFB340 | 夜 warning |
| green/nav | #248A3D | 导航卡底 |
| green/nav-next | #1B6B30 | 导航卡下一步 |

### 透明
| token | 值 |
|---|---|
| white/a8 | #FFFFFF 8% |
| white/a9 | #FFFFFF 9% |
| white/a15 | #FFFFFF 15% |
| white/a60 | #FFFFFF 60% |
| white/a85 | #FFFFFF 85% |
| black/a5 | #000000 5% |
| black/a7 | #000000 7% |
| transparent | #000000 0% |

### 地图（日、夜各一套）
| token | 日 | 夜 |
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

原色里地图值按 `map-day/…`、`map-night/…` 两组存放。

SR 日夜原色按 `scene-day/…`、`scene-night/…` 存放。当前道路面 `scene/road` 日间为 `#505967`，夜间为 `#303031`。完整色板按用途查阅。[Figma SR 场景色板](https://www.figma.com/design/T6kCgDUKJIt2e2TfDSZzp8/lib-test?node-id=934-1641)

---

## 3 语义 token（Color，日 / 夜）

| token | 日（Light） | 夜（Dark） | 用途 |
|---|---|---|---|
| bg/canvas | gray/50 | cool/950 | 最底层画布 |
| bg/face | gray/25 | cool/925 | 卡片和面板的面 |
| bg/raised | gray/0 | cool/900 | 浮起的块、浮层 |
| bg/track | gray/75 | cool/900 | 滑杆和分段控件的轨道 |
| bg/selected | gray/0 | cool/800 | 选中块 |
| bg/pressed | gray/50 | cool/850 | 按下态 |
| bg/mass | gray/200 | cool/750 | 大面积中性填充 |
| line/face | black/a5 | white/a8 | 面的边 |
| line/control | black/a7 | white/a9 | 控件的边 |
| line/selected | black/a7 | transparent | 选中块的边，夜间不显示 |
| text/1 | gray/950 | cool/50 | 正文、标题 |
| text/2 | gray/600 | cool/300 | 次要文字、20 号说明文字 |
| text/3 | gray/500 | cool/400 | 24 及以上的弱文字 |
| text/on-media | gray/0 | gray/0 | 场景上的主要文字 |
| foreground/on-media-secondary | white/a85 | white/a85 | 场景上的次要文字与图标 |
| overlay/scene | white/a15 | white/a15 | 场景上的半透明控件底 |
| icon/1 | gray/950 | gray/0 | 主图标，夜间纯白 |
| icon/2 | gray/600 | cool/300 | 次要图标 |
| icon/3 | gray/500 | cool/400 | 弱图标、未选 |
| accent | blue/500 | blue/400 | 开启、选中、进度 |
| accent/fill | blue/500 | blue/400 | 主按钮填充，每屏最多一个 |
| on-accent | gray/0 | gray/0 | 强调色上的字和图标 |
| switch/off | gray/500 | cool/450 | 开关关闭的轨道 |
| danger | red/600 | red/400 | 错误文字和图形 |
| danger/fill | red/600 | red/500 | 危险操作按钮填充 |
| status/success | green/600 | green/400 | 成功状态图形 |
| status/warning | amber/600 | amber/400 | 警告状态图形 |
| nav/background | green/nav | green/nav | 导航卡底 |
| nav/next | green/nav-next | green/nav-next | 导航卡下一步 |
| nav/secondary | gray/0 | gray/0 | 转向箭头的辅助分支，矢量层使用 20% 不透明度 |
| nav/eta-label | gray/600 | white/a60 | ETA 卡片上的次要标签 |
| map/land 等 9 个 | map-day/* | map-night/* | 地图底色和五级道路、已走路线 |
| map/route | blue/500 | blue/400 | 规划路线，与强调色同一个蓝 |
| map/puck | gray/0 | gray/0 | 定位点 |
| map/puck-arrow | blue/500 | blue/400 | 定位点箭头 |

集合 `Settings reference` 是参考稿校准色，按 SPEC 只用于比对，不属于 token。

---

## 4 对比度（实测）

日间：
| 前景 | canvas #F3F3F3 | face #FAFAFA | raised #FFFFFF | 结论 |
|---|---|---|---|---|
| text/1 | 15.17 | 16.12 | 16.83 | 通过 |
| text/2 | 4.60 | 4.89 | 5.10 | 通过 |
| text/3 | 3.03 | 3.22 | 3.36 | 只用于 24 及以上的字和图标（COLOR-05） |
| accent #007AFF | 3.62 | 3.85 | 4.02 | 图形和大字通过 |
| danger | 5.07 | 5.39 | 5.62 | 通过 |
| success | 3.18 | 3.39 | 3.53 | 图形通过，配文字时用 text 色 |
| warning | 3.59 | 3.82 | 3.99 | 同上 |
| 白字 on accent | 4.02 | | | 大字通过 |

夜间：
| 前景 | canvas #0A0A0B | face #141416 | raised #1C1C1E | 结论 |
|---|---|---|---|---|
| text/1 | 16.93 | 15.74 | 14.55 | 通过 |
| text/2 | 7.59 | 7.06 | 6.53 | 通过 |
| text/3 | 4.63 | 4.30 | 3.98 | 只用于 24 及以上的字和图标（COLOR-05） |
| accent #0A84FF | 5.43 | 5.04 | 4.66 | 通过 |
| danger | 7.09 | 6.59 | 6.10 | 通过 |
| 白字 on accent | 3.65 | | | 大字通过 |

---

场景叠层实测示例（按实际背景合成）：

| 前景 | 背景 | 对比度 |
|---|---|---|
| 85% 白次要文字 | 日间道路面 `#505967` | 5.67:1 |
| 85% 白次要文字 | 日间地平线 `#DCE5EE` | 1.23:1，须先加局部暗底 |
| 夜间 ETA 标签 60% 白 | ETA 卡底 `#2C2C2E` | 6.04:1 |

## 5 Figma 色彩规范排版

先按用途展示语义样本，再查原色和规则。每项以实际色样、文字、图标或渐变作为识别入口，旁边依次放用途、token 名和色值。说明只保留影响选色的条件，组间用留白拉开层级。SR 场景和 AI 语音各自成段，场景上的文字、图标和控件底放在语义色的「场景叠层」组。

色带用一个外框统一裁切两端，里面的色块贴满容器、相邻无缝。需要勾边时用 0.5 px 内描边，并关闭 Figma 自动布局的「描边参与布局」。同一轮检查整份规范的同类色带，放大核对两端圆弧和直边是否连续，并在浅深背景上检查透明端。此处的 0.5 px 用于规范色样，产品控件边按 SPEC 的材质规则执行。

## 6 迁移记录（2026-11-13）

- HMI / v0.1 改名为 Color，全部 38 个语义 token 改成引用 Primitives；强调色 #1471D6 改为苹果系统蓝。
- 夜间 icon/2、icon/3 与 text/2、text/3 统一（#A0A0A0 改 #A0A0A4，#7A7A7A 改 #7A7A7E）。
- 删除重复的 ink（2 处绑定已改到 text/1）和 3 个参考稿取色 source/sidebar/*（无绑定）。
- 删除无绑定的旧集合：DS / Primitives、DS / Theme、DS / Metrics、Cockpit / Primitives、Cockpit / Semantic、Cockpit / Metrics。
- v1.1 记录当前 Color Guide 的用途分组、SR 道路参考色、AI 语音色带、场景叠层变量和圆角验收方法。导航、音乐和 EP 的例子已在 Figma 局部验证，组件的全库改绑与产品代码迁移仍待各自验收。
