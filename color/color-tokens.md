# 车机颜色 token v1.3

适用范围：车机中控屏，日（Light）、夜（Dark）两个模式。Figma 文件 lib test（T6kCgDUKJIt2e2TfDSZzp8），变量集合 Primitives（原色）和 Color（语义）。网页颜色仍按 SPEC 第 2 节，网页强调色保持 #1471D6。
英文版：[color-tokens.en.md](color-tokens.en.md)。

---

## 0 怎么读这份文件

- 每条规则有 ID（如 COLOR-05），Figma 的 Color Guide 画框（932:1829，在 selected icon 页）和检查脚本用同一 ID。
- 必须：违反即不合格。应：默认做法，偏离时写明 ID 和理由。
- 模式名在 Figma 里是 Light 和 Dark，文档写作日（Light）、夜（Dark）。
- 这一版只有日、夜两个模式，不做高对比模式。

## 0a 先看这一张表：你在画什么

| 你在画什么 | 用哪一组 | 怎么挑 |
|---|---|---|
| 文字 | `text/` | 1 主要，2 次要，3 弱（只用于 24 及以上），disabled 禁用；彩色底上用 on-accent，场景和图片上用 on-media |
| 图标 | `icon/` | 和文字同一套阶梯，跟着旁边的字走 |
| 整屏、面板、弹窗的底 | `surface/` | screen、canvas、panel、raised 从下到上；浮在地图和场景上的控件用 floating |
| 按钮、输入框、轨道、选中块 | `fill/` | 1 强，2 默认，3 弱；selected、switch-off、disabled 各有专用 |
| 按下、焦点 | `interaction/pressed`、`border/focus` | 按下叠一层，焦点描 2 px |
| 描边 | `border/` | panel、control、selected、focus |
| 开启、选中、进度 | `accent/` | default 给图形，fill 给主按钮，subtle 给选中行的浅底 |
| 成功、警告、错误、信息 | `state/` | 颜色给图标和字，-bg 给后面的底，成对用 |
| 温度功能 | `vehicle/` | cool 蓝，heat 橙 |
| 压在内容上的半透明层 | `overlay/` | scene 给 3D 场景，scrim 给弹窗后面 |
| 阴影 | 效果样式 `shadow/…` | floating 给浮在地图上的控件，voice 给语音卡片，puck 给定位点 |
| 导航卡 | `nav/` | maneuver、maneuver-next、maneuver-dim |
| 地图 | `map/` | 只给地图 |
| 3D 场景、语音光效 | `scene/`、`ai/` | 只给场景和语音组件 |

## 1 规则

### COLOR-01 两层结构（必须）
- 原色集合 `Primitives`：一个模式，只放色阶，不写用途。原色不直接绑到任何图层上。
- 语义集合 `Color`：两个模式 Light（日）和 Dark（夜），每个值都引用原色（alias），不写死色值。
- 组件、图标、文档只绑语义 token。唯一例外是 Figma Color Guide 画框里的原色色板，它们直接绑原色，用来展示色阶。
- 检查：audit `color-alias`（语义 token 的值全部是 alias）、`color-bind`（图层上没有直接绑原色、没有写死的颜色）

### COLOR-02 保留变量 ID（必须）
- 改值时只换引用的原色，不删了重建。
- 改名直接改变量名，ID 不变，现有绑定全部保留（v1.3 的 24 个改名都这样做，对照表见第 6 节）。
- 要删除的 token 先把绑定改到替代 token，再删（nav/eta-label 改到 text/2 后删除）。

### COLOR-03 只有一个蓝（必须）
- `accent/default`、`accent/fill`、`accent/subtle`、`state/info`、`vehicle/cool`、`border/focus`、`map/route`、`map/puck-arrow` 都引用同一组蓝：日 `blue/500` #007AFF，夜 `blue/400` #0A84FF。
- 其他颜色不准出现第二种蓝。

### COLOR-04 强调色的用法（必须）
- 用于当前、开启、进行到哪：开关开启、选中下划线、进度、已选值、开启的图标。
- 不做正文文字色。每屏最多一个 `accent/fill` 主按钮。
- 选中的列表行、开启的功能块用 `accent/subtle` 做底，上面的图标用 `accent/default`，文字用 `text/1`。
- 按钮上的字用 `text/on-accent`（白）。车机按钮字号 ≥ 24，属于大字，3:1 即可：日 4.02、夜 3.65，达标。

### COLOR-05 对比度门槛（必须）
| 用途 | 门槛 |
|---|---|
| 小于 24 的文字（车机最小字号 20） | ≥ 4.5:1 |
| 24 及以上的文字 | ≥ 3:1 |
| 图标、控件边界、状态图形 | ≥ 3:1 |
| 相邻两层填充 | ≥ 1.25:1；不够时加 1px 边（沿用 SPEC 3.1） |
- 对比度按实际所在的面计算：screen、canvas、panel、raised 都要过，夜间加 floating。
- text/3 只用于 24 及以上的字和图标；20 号说明文字一律用 text/2。
- 禁用（text/disabled、icon/disabled）不受门槛约束，但必须同时有别的禁用信号（不可点、去掉强调色）。

### COLOR-06 状态成对（必须）
- `state/success`、`state/warning`、`state/danger`、`state/info` 必须配图标或文字，不能只靠颜色传达。
- 提示条和标签：底用对应的 `-bg`，图标用状态色。-bg 上 20 号字用 `text/1`；状态色做字只用于 24 及以上。
- 原因：日间 success 落在自己的 -bg 上只有 3.03，够图形和大字，不够 20 号字。
- 危险按钮用 `state/danger-fill`，上面放白字。

### COLOR-07 线和边（必须）
- `border/` 全部用透明度（白或黑加透明度），落在任何面上都保持同样的层次。`border/focus` 例外，用实色蓝。
- `border/panel`：面板和卡片的边；`border/control`：控件的边；`border/selected`：选中块的边，夜间透明。

### COLOR-08 地图色板（应）
- 地图色（陆地、水、公园、五级道路、已走路线、定位点）是独立的领域色板，按日、夜两套原色写在 `map/` 组下，只给地图用，其他组件不引用。
- 定位点圆盘用 `map/puck`（日夜都是白），不用 icon/1。

### COLOR-09 按你在画什么命名（必须）
- 语义名的第一段就是你在画的东西：`text`、`icon`、`surface`、`fill`、`border`、`interaction`、`accent`、`state`、`vehicle`、`overlay`、`shadow`、`nav`、`map`、`scene`、`ai`。第二段是强弱或角色，数字越大越弱。
- 不在语义名里写颜色名，不写日夜。
- 每组的变量范围（scopes）锁到对应属性：text 只能填字，icon 只能填形状和描边，border 只能描边，surface 和 fill 只能填底。
- 原色：`色名/色阶`，如 `blue/500`、`cool/925`；透明色：`white/a60`、`ink/a65`、`black/a7`（数字是不透明度百分比）；浅底：`green/600-a10`（色阶加透明度）。
- 检查：audit `color-scope`（每个 token 的 scopes 和前缀对得上）

### COLOR-10 修改流程（必须）
- 改值：只改原色或改语义 token 引用的原色，不在图层上改。
- 改名或删除语义 token：列出受影响的组件和绑定数，作者确认后再改。
- 每次改动都重算 COLOR-05 的对比度表。

### COLOR-11 以重点界面为准（必须）
- 已确认的重点界面（Components 页的 Key A、Key B，日夜各一张）是颜色基准。token 和它们不一致时改 token 的值，不改界面。
- 3D 场景和图片上的字用 `text/on-media`，日夜都是白色；场景本身的日夜由场景组件的变体切换，不由颜色 token 负责。
- 验证方法：复制夜间重点界面，切到 Light 模式，和日间设计稿并排比对，除场景图片外应一致。

### COLOR-12 场景和语音单独成组（必须）
- `scene/` 是 3D 场景环境色，`ai/` 是语音光效渐变的色标，只给 3D 场景和语音组件用，界面控件不引用。细节见第 3a 节。

### COLOR-13 透明度阶梯（必须）
- 字、图标、线和控件填充的次级颜色一律用一个基色加透明度：夜间白 #FFFFFF，日间墨 #1D1D1F。不再为次级颜色单独调灰。
- 原因：颜色种类最少；白色加透明度叠在 3D 场景和地图上会跟着底色走，显示效果比实色灰干净。这是作者在上一家车企验证过的做法。
- 阶梯：

| 级别 | 夜（白） | 日（墨） | 用在 |
|---|---|---|---|
| 1 主要 | 100% | 100% | text/1、icon/1 |
| 2 次要 | 60% | 65% | text/2、icon/2 |
| 3 弱 | 40% | 50% | text/3、icon/3、fill/switch-off |
| 禁用 | 25% | 30% | text/disabled、icon/disabled |
- 日间次要取 65% 不取 60%：60% 在 face、raised 上只有 4.11 到 4.47，不够 4.5。
- 控件填充：fill/1 夜 16%、日 15%；fill/2 夜 10%、日 8%；fill/3 两边都是 5%；fill/disabled 夜 5%、日 4%；fill/selected 夜 14%，日间是白色实色（白底上的选中块必须是实色才看得见）。
- 不要在新组件里引用旧的实色灰 cool/300、cool/400、gray/500、gray/600 做次级色。

### COLOR-14 底用实色（必须）
- `surface/` 全部是实色，不用透明度：底叠底会让下面的内容透上来。
- 浮在地图和 3D 场景上的控件（ETA 条、地图按钮）用 `surface/floating`，不用 fill 或 overlay。
- 3D 场景上需要透出画面的小块用 `overlay/scene`。

### COLOR-15 禁用（必须）
- 禁用用 `text/disabled`、`icon/disabled`、`fill/disabled`，不降低图层不透明度，不叠白色蒙层。
- 禁用的控件去掉强调色：开启的开关禁用后轨道用 `fill/disabled`，旋钮不变。

### COLOR-16 交互态（必须）
- 按下：在控件原来的填充上面再叠一层 `interaction/pressed`（夜白 10%、日墨 8%），不换成另一个填充色。
- 焦点（旋钮、方向键、语音点选）：2 px `border/focus`，描在控件外侧，和控件圆角同心。
- 主操作按钮（accent/fill）按下沿用 SPEC 13.1：整体 0.85 加 scale 0.97，不叠 pressed。
- 悬停在车机上不做。

### COLOR-17 冷和热（必须）
- `vehicle/cool`（蓝）和 `vehicle/heat`（橙）只用于温度相关的功能：空调制冷制热、座椅通风和加热、方向盘加热、除雾。
- 开启状态的功能块：底用 `accent/subtle` 或 `vehicle/heat-bg`，图标用 `vehicle/cool` 或 `vehicle/heat`，文字用 `text/1`。
- 橙色不表示警告，警告用 `state/warning`。
- 夜 orange/400 #FF9F0A，日 orange/600 #C93400（日间在 canvas、panel、raised 上 4.76 到 5.28）。

### COLOR-18 图层不透明度（必须）
- 上了颜色的图层不透明度保持 100%，透明度只来自 token。图层再降透明度会和 token 的透明度相乘，结果查不到。
- 例外：动画过程中的淡入淡出，和主操作按钮按下时的整体 0.85（COLOR-16）。
- 检查：audit `layer-opacity`（绑了颜色 token 的图层 opacity = 1）

### COLOR-19 阴影用效果样式（必须）
- 阴影不是单独的颜色。位置和模糊写在效果样式里，颜色绑 `shadow/` token，日夜跟着切换。图层上不手写阴影。
- 只有浮在地图和 3D 场景上的东西有阴影，面板和卡片没有。

| 效果样式 | 内容 | 颜色 token | 用在 |
|---|---|---|---|
| shadow/floating | y 4，模糊 16，背景模糊 24 | shadow/floating（夜 黑 32%，日 #1C1C2E 12%） | ETA 条、地图按钮，21 处 |
| shadow/voice | y 4，模糊 16，背景模糊 40 | shadow/floating | 语音卡片 6 个变体 |
| shadow/puck | y 6，模糊 24 | shadow/puck（日夜 黑 50%） | 定位点，17 处 |
- 数值取自关键界面里实际用到的阴影；v1.2 的 shadow/elevated（黑 20%）没有对应任何界面，改名为 shadow/floating 并改值。
- 检查：audit `effect-style`（有投影的图层都套了 shadow/ 样式）

---

## 2 原色（Primitives，151 个）

### 白色阶梯（夜间次级色）
| token | 值 | 用在 |
|---|---|---|
| white/a5 | #FFFFFF 5% | 夜 fill/3、fill/disabled |
| white/a8 | #FFFFFF 8% | 夜 border/panel |
| white/a9 | #FFFFFF 9% | 夜 border/control |
| white/a10 | #FFFFFF 10% | 夜 fill/2、interaction/pressed |
| white/a14 | #FFFFFF 14% | 夜 fill/selected |
| white/a15 | #FFFFFF 15% | overlay/scene |
| white/a16 | #FFFFFF 16% | 夜 fill/1 |
| white/a20 | #FFFFFF 20% | nav/maneuver-dim |
| white/a25 | #FFFFFF 25% | 夜 禁用 |
| white/a40 | #FFFFFF 40% | 夜 text/3、icon/3、fill/switch-off |
| white/a60 | #FFFFFF 60% | 夜 text/2、icon/2 |
| white/a85 | #FFFFFF 85% | text/on-media-2 |

### 墨色阶梯（日间次级色，基色 #1D1D1F）
| token | 值 | 用在 |
|---|---|---|
| ink/a4 | 4% | 日 fill/disabled |
| ink/a5 | 5% | 日 fill/3 |
| ink/a8 | 8% | 日 fill/2、interaction/pressed |
| ink/a15 | 15% | 日 fill/1 |
| ink/a30 | 30% | 日 禁用 |
| ink/a50 | 50% | 日 text/3、icon/3、fill/switch-off |
| ink/a65 | 65% | 日 text/2、icon/2 |

### 其他透明
| token | 值 | 用在 |
|---|---|---|
| black/a5 | #000000 5% | 备用 |
| black/a7 | #000000 7% | 日 border/control、border/selected |
| black/a20 | #000000 20% | 备用 |
| black/a32 | #000000 32% | 夜 shadow/floating |
| navy/a12 | #1C1C2E 12% | 日 shadow/floating |
| black/a30 | #000000 30% | 日 overlay/scrim |
| black/a50 | #000000 50% | 夜 overlay/scrim、shadow/puck |
| slate/a10 | #0F1729 10% | 日 border/panel |
| transparent | #000000 0% | 夜 border/selected |

### 中性灰（实色，只给底和主色）
| token | 值 | 用在 |
|---|---|---|
| gray/0 | #FFFFFF | 日 surface/raised、surface/floating、fill/selected；夜 text/1、icon/1；on-accent、on-media、map/puck |
| gray/25 | #FAFAFA | 日 surface/panel |
| gray/50 | #F3F3F3 | 日 surface/canvas |
| gray/950 | #1D1D1F | 日 text/1、icon/1，也是墨色阶梯的基色 |
| gray/1000 | #000000 | 夜 surface/screen |
| slate/100 | #E4E7EC | 日 surface/screen |
| cool/700 | #494951 | surface/app-tile |
| cool/820 | #2C2C2E | 夜 surface/floating |
| cool/900 | #1C1C1E | 夜 surface/raised |
| cool/925 | #141416 | 夜 surface/panel |
| cool/950 | #0A0A0B | 夜 surface/canvas |

v1.2 留下、现在没有语义 token 引用的实色灰：gray/75、gray/200、gray/500、gray/600、cool/50、cool/250、cool/300、cool/400、cool/450、cool/750、cool/800、cool/850。保留一个版本给 Work 页的旧稿比对，v1.4 时仍无引用就删除。

### 彩色
| token | 值 | 用途 |
|---|---|---|
| blue/500 | #007AFF | 日 强调、信息、制冷、焦点、路线 |
| blue/400 | #0A84FF | 夜 同上 |
| red/600 | #C62828 | 日 danger、danger-fill |
| red/500 | #D9362B | 夜 danger-fill |
| red/400 | #FF6B60 | 夜 danger |
| green/600 | #1F9D3A | 日 success |
| green/400 | #32D74B | 夜 success |
| amber/600 | #B86E00 | 日 warning |
| amber/400 | #FFB340 | 夜 warning |
| orange/600 | #C93400 | 日 vehicle/heat |
| orange/400 | #FF9F0A | 夜 vehicle/heat |
| green/nav | #248A3D | 导航卡底 |
| green/nav-next | #1B6B30 | 导航卡下一步 |

### 浅底（日 10%，夜 16%）
| token | 用在 |
|---|---|
| blue/500-a10、blue/400-a16 | accent/subtle、state/info-bg |
| green/600-a10、green/400-a16 | state/success-bg |
| amber/600-a10、amber/400-a16 | state/warning-bg |
| red/600-a10、red/400-a16 | state/danger-bg |
| orange/600-a10、orange/400-a16 | vehicle/heat-bg |

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

原色里地图值按 `map-day/…`、`map-night/…` 两组存放；场景和语音的原色见第 3a 节。

---

## 3 语义 token（Color，101 个，日 / 夜）

### 文字 text/（scopes：TEXT_FILL）
| token | 日 | 夜 | 用途 |
|---|---|---|---|
| text/1 | gray/950 | gray/0 | 正文、标题 |
| text/2 | ink/a65 | white/a60 | 次要文字、20 号说明 |
| text/3 | ink/a50 | white/a40 | 弱文字，只用于 24 及以上 |
| text/disabled | ink/a30 | white/a25 | 禁用文字 |
| text/on-accent | gray/0 | gray/0 | 蓝色、导航卡、危险按钮上的字 |
| text/on-media | gray/0 | gray/0 | 3D 场景和图片上的主文字 |
| text/on-media-2 | white/a85 | white/a85 | 场景和图片上的次要文字 |

### 图标 icon/（scopes：SHAPE_FILL、STROKE_COLOR）
| token | 日 | 夜 | 用途 |
|---|---|---|---|
| icon/1 | gray/950 | gray/0 | 主图标 |
| icon/2 | ink/a65 | white/a60 | 次要图标 |
| icon/3 | ink/a50 | white/a40 | 未选和弱图标 |
| icon/disabled | ink/a30 | white/a25 | 禁用图标 |
| icon/on-accent | gray/0 | gray/0 | 蓝色和导航卡上的图标 |
| icon/on-media | gray/0 | gray/0 | 场景和图片上的图标 |

### 底 surface/（实色，scopes：FRAME_FILL、SHAPE_FILL）
| token | 日 | 夜 | 用途 |
|---|---|---|---|
| surface/screen | slate/100 | gray/1000 | 整屏底，状态栏和 Dock 下面 |
| surface/canvas | gray/50 | cool/950 | 应用最底层 |
| surface/panel | gray/25 | cool/925 | 卡片和面板 |
| surface/raised | gray/0 | cool/900 | 浮起的块和弹窗 |
| surface/floating | gray/0 | cool/820 | 浮在地图和场景上的控件底 |
| surface/app-tile | cool/700 | cool/700 | Dock 应用图标底，日夜不变 |

### 控件填充 fill/ 和交互 interaction/
| token | 日 | 夜 | 用途 |
|---|---|---|---|
| fill/1 | ink/a15 | white/a16 | 强填充，大面积中性块 |
| fill/2 | ink/a8 | white/a10 | 控件默认填充，按钮和输入框 |
| fill/3 | ink/a5 | white/a5 | 弱填充，轨道和分组底 |
| fill/selected | gray/0 | white/a14 | 分段控件的选中块 |
| fill/switch-off | ink/a50 | white/a40 | 开关关闭的轨道 |
| fill/disabled | ink/a4 | white/a5 | 禁用控件的填充 |
| interaction/pressed | ink/a8 | white/a10 | 按下态，叠在控件上 |

### 线 border/（scopes：STROKE_COLOR）
| token | 日 | 夜 | 用途 |
|---|---|---|---|
| border/panel | slate/a10 | white/a8 | 面板和卡片的边 |
| border/control | black/a7 | white/a9 | 控件的边 |
| border/selected | black/a7 | transparent | 选中块的边，夜间不显示 |
| border/focus | blue/500 | blue/400 | 焦点框，2 px |

### 强调 accent/
| token | 日 | 夜 | 用途 |
|---|---|---|---|
| accent/default | blue/500 | blue/400 | 开启、选中、进度 |
| accent/fill | blue/500 | blue/400 | 主按钮，每屏最多一个 |
| accent/subtle | blue/500-a10 | blue/400-a16 | 选中的列表行、开启的功能块 |

### 状态 state/
| token | 日 | 夜 | 用途 |
|---|---|---|---|
| state/info | blue/500 | blue/400 | 信息 |
| state/success | green/600 | green/400 | 成功 |
| state/warning | amber/600 | amber/400 | 警告 |
| state/danger | red/600 | red/400 | 错误和危险 |
| state/info-bg | blue/500-a10 | blue/400-a16 | 信息提示条和标签的底 |
| state/success-bg | green/600-a10 | green/400-a16 | 成功提示条和标签的底 |
| state/warning-bg | amber/600-a10 | amber/400-a16 | 警告提示条和标签的底 |
| state/danger-bg | red/600-a10 | red/400-a16 | 错误提示条和标签的底 |
| state/danger-fill | red/600 | red/500 | 危险操作按钮 |

### 车控 vehicle/
| token | 日 | 夜 | 用途 |
|---|---|---|---|
| vehicle/cool | blue/500 | blue/400 | 制冷和通风开启 |
| vehicle/heat | orange/600 | orange/400 | 加热开启：空调、座椅、方向盘 |
| vehicle/heat-bg | orange/600-a10 | orange/400-a16 | 加热开启的功能块底 |

### 叠加和阴影（阴影的位置和模糊见 COLOR-19）
| token | 日 | 夜 | 用途 |
|---|---|---|---|
| overlay/scene | white/a15 | white/a15 | 3D 场景上的半透明底 |
| overlay/scrim | black/a30 | black/a50 | 弹窗后面压暗整屏 |
| shadow/floating | navy/a12 | black/a32 | 浮在地图和场景上的控件、语音卡片的阴影颜色 |
| shadow/puck | black/a50 | black/a50 | 定位点的阴影颜色 |

### 导航 nav/
| token | 日 | 夜 | 用途 |
|---|---|---|---|
| nav/maneuver | green/nav | green/nav | 导航卡底 |
| nav/maneuver-next | green/nav-next | green/nav-next | 导航卡下一步 |
| nav/maneuver-dim | white/a20 | white/a20 | 导航卡上的次要转向分支 |

### 地图 map/
| token | 日 | 夜 | 用途 |
|---|---|---|---|
| map/land 等 9 个 | map-day/* | map-night/* | 地图底色、五级道路、已走路线 |
| map/route | blue/500 | blue/400 | 规划路线 |
| map/puck | gray/0 | gray/0 | 定位点圆盘 |
| map/puck-arrow | blue/500 | blue/400 | 定位点箭头 |

集合 `Settings reference` 是参考稿校准色，按 SPEC 只用于比对，不属于 token。

## 3a 场景与语音光效

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
| scene/road | #505967 | #303031 | 路面 |
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

## 4 对比度（实测，透明色按叠在该面上的结果计算）

日间：
| 前景 | screen #E4E7EC | canvas #F3F3F3 | panel #FAFAFA | raised #FFFFFF | 结论 |
|---|---|---|---|---|---|
| text/1 | 13.58 | 15.17 | 16.12 | 16.83 | 通过 |
| text/2 墨 65% | 4.80 | 5.02 | 5.15 | 5.24 | 通过 |
| text/3 墨 50% | 3.10 | 3.19 | 3.24 | 3.27 | 只用于 24 及以上 |
| 禁用 墨 30% | 1.87 | 1.89 | 1.91 | 1.91 | 禁用，不设门槛 |
| accent #007AFF | 3.24 | 3.62 | 3.85 | 4.02 | 图形和大字通过 |
| success | 2.85 | 3.18 | 3.39 | 3.53 | 不放在 screen 上；图形通过 |
| warning | 3.22 | 3.59 | 3.82 | 3.99 | 图形通过 |
| danger | 4.54 | 5.07 | 5.39 | 5.62 | 通过 |
| heat #C93400 | 4.26 | 4.76 | 5.06 | 5.28 | 通过 |

夜间：
| 前景 | screen #000000 | canvas #0A0A0B | panel #141416 | raised #1C1C1E | floating #2C2C2E | 结论 |
|---|---|---|---|---|---|---|
| text/1 | 21.00 | 19.79 | 18.40 | 17.01 | 13.94 | 通过 |
| text/2 白 60% | 7.37 | 7.30 | 7.13 | 6.85 | 6.04 | 通过 |
| text/3 白 40% | 3.66 | 3.77 | 3.83 | 3.79 | 3.55 | 只用于 24 及以上 |
| 禁用 白 25% | 2.02 | 2.14 | 2.24 | 2.28 | 2.25 | 禁用，不设门槛 |
| accent #0A84FF | 5.76 | 5.43 | 5.04 | 4.66 | 3.82 | 通过 |
| success | 10.96 | 10.33 | 9.60 | 8.88 | 7.27 | 通过 |
| warning | 11.77 | 11.10 | 10.32 | 9.54 | 7.81 | 通过 |
| danger | 7.52 | 7.09 | 6.59 | 6.10 | 4.99 | 通过 |
| heat #FF9F0A | 10.22 | 9.63 | 8.95 | 8.28 | 6.78 | 通过 |

状态色落在自己的 -bg 上（-bg 叠在 panel 上）：
| | info | success | warning | danger | heat |
|---|---|---|---|---|---|
| 日 10% | 3.39 | 3.03 | 3.40 | 4.61 | 4.36 |
| 夜 16% | 4.21 | 7.13 | 7.47 | 5.27 | 6.71 |
- 都过 3:1，所以 -bg 上的状态色可以做图标和 24 及以上的字；20 号字用 text/1（COLOR-06）。
- 白字在 heat 上：日 5.28，夜 2.06。所以加热用浅底加橙色图标，不做橙色实底按钮。

---

## 5 用重点界面验证

### 2026-11-13
- 材料：Components 页导入的 Key A、Key B 日夜四张界面，和 DriveScene Studio 的 00 Foundations 色板。
- 第一轮：夜间 60 处颜色里 47 处和 token 一致，日间 35 处里 30 处一致。不一致的是屏幕底、夜间次要文字、日间面板边、控件底、应用图标底、场景上的半透明底和阴影，按 COLOR-11 改 token。
- 第二轮：把夜间 Key A 复制一份切到 Light，除左侧 3D 场景图片外都和日间设计稿一致。

### 2026-11-14（v1.3）
- 换成透明度阶梯后重截 Key A 日夜：夜间次要文字从 #98989F 变为白 60%（叠在黑底上约 #999999），弱文字从 #7A7A7E 变为白 40%，肉眼差别很小。
- 导航卡上的次要转向分支原来是白色加 20% 图层不透明度，现在改成 token `nav/maneuver-dim`（白 20%），图层不透明度恢复 100%（COLOR-18），22 处。
- 定位点圆盘原来绑 icon/1，日间变成黑色；改绑 `map/puck`，17 处，日夜都是白。

## 6 迁移记录

### v1.3（2026-11-14）：按你在画什么重新分组
改名（变量 ID 不变，绑定全部保留）：
| 旧名 | 新名 |
|---|---|
| bg/screen | surface/screen |
| bg/canvas | surface/canvas |
| bg/face | surface/panel |
| bg/raised | surface/raised |
| control/fill | surface/floating |
| bg/app-tile | surface/app-tile |
| bg/mass | fill/1 |
| bg/track | fill/3 |
| bg/selected | fill/selected |
| switch/off | fill/switch-off |
| bg/pressed | interaction/pressed |
| line/face | border/panel |
| line/control | border/control |
| line/selected | border/selected |
| on-accent | text/on-accent |
| foreground/on-media-secondary | text/on-media-2 |
| accent | accent/default |
| danger | state/danger |
| danger/fill | state/danger-fill |
| status/success | state/success |
| status/warning | state/warning |
| nav/background | nav/maneuver |
| nav/next | nav/maneuver-next |
| nav/secondary | nav/maneuver-dim |
- 合并：nav/eta-label 的 27 处绑定改到 text/2 后删除。
- 改值：text/2、text/3、icon/2、icon/3、fill/1、fill/3、fill/selected（夜）、fill/switch-off、interaction/pressed 改为透明度阶梯（COLOR-13）。
- 新增 17 个：text/disabled、icon/disabled、icon/on-accent、icon/on-media、fill/2、fill/disabled、border/focus、accent/subtle、state/info、state/info-bg、state/success-bg、state/warning-bg、state/danger-bg、vehicle/cool、vehicle/heat、vehicle/heat-bg、overlay/scrim。
- 新增原色 30 个：白色和墨色阶梯、black/a30、black/a50、orange/400、orange/600 和 10 个浅底。
- 每个语义 token 的 scopes 按 COLOR-09 锁到对应属性。
- 阴影：shadow/elevated 改名为 shadow/floating 并按关键界面改值，新增 shadow/puck 和三个效果样式（COLOR-19），新增原色 black/a32、navy/a12。
- Color Guide 第 01 节改成六章：内容、层级、控件、状态、车控、导航和地图，每章左边是真实界面小样，右边是 token 和用途，不再写原色值，每张卡的色块画的是真实用法（字、图标、控件、标签），卡片下方写日夜分别引用的原色；规则表更新到 COLOR-18。

### v1.2（2026-11-13）
- HMI / v0.1 改名为 Color，当时的 38 个语义 token 改成引用 Primitives；强调色 #1471D6 改为苹果系统蓝。
- 删除无绑定的旧集合：DS / Primitives、DS / Theme、DS / Metrics、Cockpit / Primitives、Cockpit / Semantic、Cockpit / Metrics。
- 改绑：Components 和 Work 两页里，颜色和某个 token 在当前模式下一致（每个通道差 4 以内）的，改绑到 Color，共 5100 多处。
- 剩余：Components 主节点约 1180 处写死、230 处外部颜色；Work 约 3300 处写死、475 处外部颜色。主要是 Sketch 来源色、品牌彩色，以及地图、3D 场景、Dock 应用图标，按规则不改。圆角、间距、字号等非颜色的外部绑定约 2900 处，等对应 token 建好后处理。
