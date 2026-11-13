# 车机颜色 token v1.0

适用范围：车机中控屏，日（Light）、夜（Dark）两个模式。Figma 文件 lib test（T6kCgDUKJIt2e2TfDSZzp8），变量集合 Primitives（原色）和 Color（语义）。网页颜色仍按 SPEC 第 2 节，网页强调色保持 #1471D6。
英文版：[color-tokens.en.md](color-tokens.en.md)。

---

## 0 怎么读这份文件

- 每条规则有 ID（如 COLOR-05），Figma 的 Color Guide 画框和检查脚本用同一 ID。
- 必须：违反即不合格。应：默认做法，偏离时写明 ID 和理由。
- 模式名在 Figma 里是 Light 和 Dark，文档写作日（Light）、夜（Dark）。
- 这一版只有日、夜两个模式，不做高对比模式。

## 1 规则

### COLOR-01 两层结构（必须）
- 原色集合 `Primitives`：一个模式，只放色阶，不写用途。原色不直接绑到任何图层上。
- 语义集合 `Color`：两个模式 Light（日）和 Dark（夜），每个值都引用原色（alias），不写死色值。
- 组件、图标、文档只绑语义 token。
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

## 5 迁移记录（2026-11-13）

- HMI / v0.1 改名为 Color，全部 38 个语义 token 改成引用 Primitives；强调色 #1471D6 改为苹果系统蓝。
- 夜间 icon/2、icon/3 与 text/2、text/3 统一（#A0A0A0 改 #A0A0A4，#7A7A7A 改 #7A7A7E）。
- 删除重复的 ink（2 处绑定已改到 text/1）和 3 个参考稿取色 source/sidebar/*（无绑定）。
- 删除无绑定的旧集合：DS / Primitives、DS / Theme、DS / Metrics、Cockpit / Primitives、Cockpit / Semantic、Cockpit / Metrics。
- 未处理：Components 和 Work 两页约 1 万处绑定指向外部库的变量，约 1.4 万处写死的颜色，留到组件改绑阶段。
