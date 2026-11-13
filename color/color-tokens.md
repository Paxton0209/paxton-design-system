# 车机颜色 token v1.2

适用范围：车机中控屏，日（Light）、夜（Dark）两个模式。Figma 文件 lib test（T6kCgDUKJIt2e2TfDSZzp8），变量集合 Primitives（原色）和 Color（语义）。网页颜色仍按 SPEC 第 2 节，网页强调色保持 #1471D6。
英文版：[color-tokens.en.md](color-tokens.en.md)。

---

## 0 怎么读这份文件

- 每条规则有 ID（如 COLOR-05），Figma 的 Color Guide 画框（932:1829，在 selected icon 页）和检查脚本用同一 ID。
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
- 其他颜色不准出现第二种蓝。

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
- 对比度按实际所在的面计算：canvas、face、raised 三个面都要过。
- text/3 只用于 24 及以上的字和图标；20 号说明文字一律用 text/2（text/3 在日间只有 3.0 到 3.4，夜间在 face、raised 上 4.0 到 4.3，不够 4.5）。
- 放在 bg/screen 上（状态栏、Dock）的 20 号字用 text/1：日间 text/2 在 #E4E7EC 上只有 4.09。

### COLOR-06 状态色（必须）
- `danger`、`status/success`、`status/warning` 必须配图标或文字，不能只靠颜色传达。
- 填充用 `danger/fill`，上面放白字。

### COLOR-07 线和边（必须）
- 线用半透明原色（白或黑加透明度），这样落在任何面上都保持同样的层次。
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

### COLOR-11 以重点界面为准（必须）
- 已确认的重点界面（Components 页的 Key A、Key B，日夜各一张）是颜色基准。token 和它们不一致时改 token 的值，不改界面。
- 3D 场景和图片上的字用 `text/on-media`，日夜都是白色；场景本身的日夜由场景组件的变体切换，不由颜色 token 负责。
- 验证方法：复制夜间重点界面，切到 Light 模式，和日间设计稿并排比对，除场景图片外应一致。

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
| gray/600 | #6E6E73 | 日 text/2、icon/2 |
| gray/950 | #1D1D1F | 日 text/1、icon/1 |
| gray/1000 | #000000 | 夜 bg/screen |
| slate/100 | #E4E7EC | 日 bg/screen |

### 中性灰：夜间（带一点冷调）
| token | 值 | 现在用在 |
|---|---|---|
| cool/50 | #EDEDEF | 备用（夜 text/1 已改为 gray/0） |
| cool/250 | #BCBEC2 | nav/secondary |
| cool/300 | #98989F | 夜 text/2、icon/2 |
| cool/400 | #7A7A7E | 夜 text/3、icon/3 |
| cool/450 | #6E6E72 | 夜 switch/off |
| cool/700 | #494951 | bg/app-tile |
| cool/750 | #3A3A3C | 夜 bg/mass |
| cool/800 | #333336 | 夜 bg/selected |
| cool/820 | #2C2C2E | 夜 control/fill |
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
| black/a5 | #000000 5% |
| black/a7 | #000000 7% |
| white/a15 | #FFFFFF 15% |
| black/a20 | #000000 20% |
| slate/a10 | #0F1729 10% |
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

---

## 3 语义 token（Color，日 / 夜）

| token | 日（Light） | 夜（Dark） | 用途 |
|---|---|---|---|
| bg/screen | slate/100 | gray/1000 | 整屏底，状态栏和 Dock 的底 |
| bg/canvas | gray/50 | cool/950 | 最底层画布 |
| bg/face | gray/25 | cool/925 | 卡片和面板的面 |
| bg/raised | gray/0 | cool/900 | 浮起的块、面板 |
| control/fill | gray/0 | cool/820 | 浮在地图上的控件（ETA 条、地图按钮） |
| bg/track | gray/75 | cool/900 | 滑杆和分段控件的轨道 |
| bg/selected | gray/0 | cool/800 | 选中块 |
| bg/pressed | gray/50 | cool/850 | 按下态 |
| bg/mass | gray/200 | cool/750 | 大面积中性填充 |
| bg/app-tile | cool/700 | cool/700 | Dock 应用图标底，日夜不变 |
| line/face | slate/a10 | white/a8 | 面的边 |
| line/control | black/a7 | white/a9 | 控件的边 |
| line/selected | black/a7 | transparent | 选中块的边，夜间不显示 |
| text/1 | gray/950 | gray/0 | 正文、标题 |
| text/2 | gray/600 | cool/300 | 次要文字、20 号说明文字 |
| text/3 | gray/500 | cool/400 | 24 及以上的弱文字 |
| icon/1 | gray/950 | gray/0 | 主图标，夜间纯白 |
| icon/2 | gray/600 | cool/300 | 次要图标 |
| icon/3 | gray/500 | cool/400 | 弱图标、未选 |
| accent | blue/500 | blue/400 | 开启、选中、进度 |
| accent/fill | blue/500 | blue/400 | 主按钮填充，每屏最多一个 |
| on-accent | gray/0 | gray/0 | 强调色和导航卡上的字和图标 |
| text/on-media | gray/0 | gray/0 | 3D 场景和图片上的字，日夜不变 |
| overlay/scene | white/a15 | white/a15 | 3D 场景上的半透明底 |
| shadow/elevated | black/a20 | black/a20 | 浮层和定位点的阴影 |
| switch/off | gray/500 | cool/450 | 开关关闭的轨道 |
| danger | red/600 | red/400 | 错误文字和图形 |
| danger/fill | red/600 | red/500 | 危险操作按钮填充 |
| status/success | green/600 | green/400 | 成功状态图形 |
| status/warning | amber/600 | amber/400 | 警告状态图形 |
| nav/background | green/nav | green/nav | 导航卡底 |
| nav/next | green/nav-next | green/nav-next | 导航卡下一步 |
| nav/secondary | cool/250 | cool/250 | 导航卡上的次要转向箭头 |
| map/land 等 9 个 | map-day/* | map-night/* | 地图底色和五级道路、已走路线 |
| map/route | blue/500 | blue/400 | 规划路线，与强调色同一个蓝 |
| map/puck | gray/0 | gray/0 | 定位点 |
| map/puck-arrow | blue/500 | blue/400 | 定位点箭头 |

集合 `Settings reference` 是参考稿校准色，按 SPEC 只用于比对，不属于 token。

## 3a 场景与语音光效

### COLOR-12 场景和语音单独成组（必须）
- `scene/…` 是 3D 场景环境色，`ai/…` 是语音光效渐变的色标，只给 3D 场景和语音组件用，界面控件不引用。
- 原色在 Primitives 里按 `scene-day/…`、`scene-night/…`、`ai-glow/…` 存放；语义 token 按日、夜引用。
- 渐变的每个色标绑定对应的 `ai/状态/序号`，位置按下表；Figma 的渐变色标可以直接绑定变量。

### 场景 scene/
| token | 日（Light） | 夜（Dark） | 用途 |
|---|---|---|---|
| scene/sky-top | #96BDE0 | #202225 | 天空顶部 |
| scene/horizon | #DCE5EE | #373A3E | 地平线 |
| scene/ground | #B4C3D6 | #373A3E | 地面 |
| scene/grass | #809C68 | #3E4D3D | 草地 |
| scene/foliage | #6F914F | #4A593E | 树冠 |
| scene/water | #7695AE | #304146 | 水面 |
| scene/road | #545E6D | #303031 | 路面 |
| scene/pavement | #D1DBEE | #3C4045 | 人行道 |
| scene/curb | #D6E1EF | #5A6068 | 路缘 |
| scene/lane-white | #D6E0E9 | #A7ADB2 | 白色车道线 |
| scene/lane-yellow | #BBAA6F | #99864E | 黄色中线 |
| scene/cone | #FF5109 | #FF590C | 锥桶等危险物 |
| scene/building | #D3D7DD | #817D7D | 建筑 |
| scene/glass | #A6BED0 | #606A72 | 玻璃 |
| scene/parking-floor | #7C8B9E | #17181B | 停车场地面 |
| scene/parking-bay | #AEBDCE | #393C41 | 车位 |
| scene/parking-edge | #98A9BC | #34383E | 车位线 |

### 语音光效 ai/
| token | 用途 | 色标（1 至 5） | 位置 % | 模式 |
|---|---|---|---|---|
| ai/listening/1 至 5 | 聆听 | #A1B5BD 0%、#AAB2B5 90%、#8B8E90、#6F6F71 90%、#D3D3D6 0% | 0、25、60、85、100 | 日夜相同 |
| ai/thinking/1 至 5 | 思考，用于文字渐变 | 日 #2E9BEA、#1F8FE8 90%、#007AFF、#5856D6 90%、#AF52DE；夜 #C2EDFF、#64D2FF 90%、#50A7FF、#6B69FF 90%、#C35CE6 | 0、25、60、78、100 | 日夜不同 |
| ai/speaking/1 至 5 | 播报 | #64D2FF 0%、#64D2FF 90%、#0A84FF、#5E5CE6 90%、#5E5CE6 0% | 0、25、60、85、100 | 日夜相同 |
| ai/proactive/1 至 5 | 主动建议 | #7B64FF 0%、#649DFF 90%、#8147EE、#5E5CE6 90%、#5E5CE6 0% | 0、25、60、85、100 | 日夜相同 |

---

## 4 对比度（实测）

日间：
| 前景 | canvas #F3F3F3 | face #FAFAFA | raised #FFFFFF | 结论 |
|---|---|---|---|---|
| text/1 | 15.17 | 16.12 | 16.83 | 通过 |
| text/2 | 4.57 | 4.86 | 5.07 | 通过；在 bg/screen #E4E7EC 上 4.09，见 COLOR-05 |
| text/3 | 3.03 | 3.22 | 3.36 | 只用于 24 及以上的字和图标（COLOR-05） |
| accent #007AFF | 3.62 | 3.85 | 4.02 | 图形和大字通过 |
| danger | 5.07 | 5.39 | 5.62 | 通过 |
| success | 3.18 | 3.39 | 3.53 | 图形通过，配文字时用 text 色 |
| warning | 3.59 | 3.82 | 3.99 | 同上 |
| 白字 on accent | 4.02 | | | 大字通过 |

夜间：
| 前景 | canvas #0A0A0B | face #141416 | raised #1C1C1E | 结论 |
|---|---|---|---|---|
| text/1 | 19.79 | 18.40 | 17.01 | 通过 |
| text/2 | 6.90 | 6.42 | 5.94 | 通过；在 control/fill #2C2C2E 上 4.86 |
| text/3 | 4.63 | 4.30 | 3.98 | 只用于 24 及以上的字和图标（COLOR-05） |
| accent #0A84FF | 5.43 | 5.04 | 4.66 | 通过 |
| danger | 7.09 | 6.59 | 6.10 | 通过 |
| 白字 on accent | 3.65 | | | 大字通过 |

---

## 5 用重点界面验证（2026-11-13）

- 材料：Components 页导入的 Key A、Key B 日夜四张界面，和 DriveScene Studio 的 00 Foundations 色板。
- 第一轮：夜间 60 处颜色里 47 处和 token 一致，日间 35 处里 30 处一致。不一致的是屏幕底、夜间次要文字、日间面板边、控件底、应用图标底、场景上的半透明底和阴影。
- 按 COLOR-11 处理：夜 text/1 改为 #FFFFFF，text/2 改为日 #6E6E73、夜 #98989F，日 line/face 改为 #0F1729 10%；新增 bg/screen、control/fill、bg/app-tile、overlay/scene、text/on-media、shadow/elevated、nav/secondary。成功色和警告色保持现在的值，不换成苹果的 #30D158、#FF9F0A（后者在白底上只有 2.1:1）。
- 第二轮：把夜间 Key A 复制一份切到 Light，状态栏、Dock、地图、ETA 条、地图按钮、定位点、导航卡都和日间设计稿一致；只有左侧 3D 场景是图片，要靠场景组件的日夜变体切换。
- 00 Foundations 里的颜色板全部并入 token 后删除：Color、Color · Map、Color · AI、Color · SR 各日夜一块；AI 和 SR 色板并为 ai/ 与 scene/ 两组（COLOR-12）。字体和尺寸板保留。

## 6 迁移记录（2026-11-13）

- HMI / v0.1 改名为 Color，当时的 38 个语义 token 改成引用 Primitives；强调色 #1471D6 改为苹果系统蓝。
- 夜间 icon/2、icon/3 与 text/2、text/3 统一（#A0A0A0 改 #A0A0A4，#7A7A7A 改 #7A7A7E）。
- 删除重复的 ink（2 处绑定已改到 text/1）和 3 个参考稿取色 source/sidebar/*（无绑定）。
- 删除无绑定的旧集合：DS / Primitives、DS / Theme、DS / Metrics、Cockpit / Primitives、Cockpit / Semantic、Cockpit / Metrics。
- 改绑：Components 和 Work 两页里，颜色和某个 token 在当前模式下一致（每个通道差 4 以内）的，改绑到 Color，共 5100 多处；外观不变。白字白图标在彩色底上用 on-accent，其余用 text/1、icon/1。名字带 Light、Dark 的画框加上对应模式。
- 剩余：Components 主节点 1183 处写死、232 处外部颜色；Work 3317 处写死、475 处外部颜色。主要是 Sketch 来源色（如 #979797、#F2F2F5、#99999E）、半透明白、品牌彩色，以及地图、3D 场景、Dock 应用图标，按规则不改。圆角、间距、字号等非颜色的外部绑定约 2900 处，等对应 token 建好后处理。
- Color Guide 画框跟着 Color 集合的模式切换日夜，卡片下方的原色名用 Color 集合里隐藏发布的 guide/* 文字变量显示。
