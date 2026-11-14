# 车机尺寸和层级 token v1.0

适用范围：车机中控屏，1600 × 900 画布。Figma 文件 lib test（T6kCgDUKJIt2e2TfDSZzp8），变量集合 Size，效果样式 shadow/…。图示版是 03 Size 页的 Size Guide 画框（1008:3）。
英文版：[size-tokens.en.md](size-tokens.en.md)。

---

## 0 怎么读这份文件

- 规则 ID 为 SIZE-01 起，Size Guide 画框和检查脚本用同一 ID。
- 必须：违反即不合格。应：默认做法，偏离时写明 ID 和理由。
- 数值来自关键界面（06 Screens 的 Key A、Key B）和 05 Components 页的参考组件实测，原则同 COLOR-11。

## 1 规则

### SIZE-01 只绑变量（必须）
- 组件里的间距、内边距、圆角、控件高度都绑 Size 集合的变量，不写死数字。
- 检查：audit `size-bind`（auto layout 的 padding、gap 和圆角都绑了变量）

### SIZE-02 间距是 4 的倍数（必须）
- 只用 space/4、8、12、16、20、24、28、32、36、40、48。
- 唯一例外是版位的 layout/margin 30 和 layout/gutter 20，它们来自关键界面。

### SIZE-03 同心圆角（应）
- 里面的圆角约等于外面的圆角减内边距，不能比外面大。

### SIZE-04 圆角按用途（必须）
| token | 值 | 用在 |
|---|---|---|
| radius/screen | 32 | 整屏外框 |
| radius/panel | 28 | 面板、弹窗、导航卡、语音卡片 |
| radius/inner | 20 | 面板里的行、功能块、读数卡、提示条 |
| radius/tile | 14 | Dock 应用图标 |
| radius/full | 999 | 按钮、chip、分段控件、开关、滑杆、toast、ETA 条、地图按钮 |

### SIZE-05 命中区最小 56（必须）
- 能点的东西最小 56 × 56（size/control/m）。开关本身 72 × 44，命中区按整行算。

### SIZE-06 版位固定（必须）
| token | 值 |
|---|---|
| layout/screen/width、height | 1600、900 |
| layout/status-bar | 80 |
| layout/dock | 92 |
| layout/bar-padding | 48，状态栏和 Dock 两端 |
| layout/margin | 30，面板到屏幕左右边 |
| layout/gutter | 20，两块面板之间 |
| layout/panel/height | 728 |
| layout/panel/narrow、wide | 520、1000 |
- 布局 A：窄面板在左、宽面板在右。布局 B：宽面板在左、窄面板在右。

### SIZE-07 浮层离面板边 24（必须）
- 浮在面板里的导航卡、ETA 条、地图按钮离面板边 24（layout/panel/inset）。
- 应用面板（panel-blank）里的内容离面板边 40。

### SIZE-08 阴影用效果样式，要淡（必须）
| 效果样式 | 内容 | 颜色 token | 用在 |
|---|---|---|---|
| shadow/floating | y 4，模糊 16，背景模糊 24 | shadow/floating（夜 黑 32%，日 #1C1C2E 12%） | ETA 条、地图按钮、toast、弹窗 |
| shadow/voice | y 4，模糊 16，背景模糊 40 | shadow/floating | 语音卡片 |
| shadow/puck | y 10，模糊 20 | shadow/puck（黑 12%） | 定位点 |
- 只有浮在地图、场景或内容上的东西有阴影，面板、行、卡片没有。
- 阴影要淡要干净，日间不透明度不超过 12%。定位点阴影由作者调整为 y 10、模糊 20、黑 12%，原来的 y 6、模糊 24、黑 50% 太脏。
- 检查：audit `effect-style`（有投影的图层都套了 shadow/ 样式）

### SIZE-09 不缩放实例（必须）
- 要别的尺寸做变体，不整体缩放组件（D-89）。

## 2 控件尺寸

| token | 值 | 用在 |
|---|---|---|
| size/control/l | 72 | toast、地图按钮组、语音卡片的高 |
| size/control/m | 56 | M 按钮、icon-button、侧边导航项、最小命中区 |
| size/control/s | 48 | S 按钮、chip、分段控件的格；命中区按 56 算 |
| size/row | 64 | 列表行最小高 |
| size/icon | 48 | 图标画板，墨迹 40 以内 |
| size/app-tile | 54 | Dock 应用图标 |

## 3 参考

- Lexus guideline 的栅格和间距、形状、内容布局三章只借了组织方式：网格基数、栅格三部分、间距分小中大三档并配用途、圆角按组件归类、主屏区域和次级页面布局。数值全部来自我们自己的关键界面。
