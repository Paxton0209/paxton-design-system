# 车机字体 token v1.0

适用范围：车机中控屏。Figma 文件 lib test（T6kCgDUKJIt2e2TfDSZzp8），变量集合 Type，文字样式 en/… 和 zh/…。图示版是 02 Type 页的 Type Guide 画框（1003:1665）。网页字体仍按 SPEC 第 5 节。
英文版：[type-tokens.en.md](type-tokens.en.md)。

---

## 0 怎么读这份文件

- 每条规则有 ID（FONT-01 起），Type Guide 画框和检查脚本用同一 ID。图标里的字另见图标规范的 TYPE-xx，两者不混用。
- 必须：违反即不合格。应：默认做法，偏离时写明 ID 和理由。
- 一个文字样式 = 字号 + 行高 + 字重 + 字体。颜色不在样式里，从颜色 token 的 `text/` 里选。

## 0a 先看这一张表：你在写什么

| 你在写什么 | 样式 | 规格 | 字重 |
|---|---|---|---|
| 车速 | number/xl/medium | 88/96 | 500 |
| 导航距离、读数百分比 | number/l/medium | 40/48 | 500 |
| 温度 | number/m/semibold | 36/48 | 600 |
| 页标题、弹窗标题、大按钮 | title/medium | 28/36，中文 28/40 | 500 |
| 档位等高强调短字 | title/semibold | 28/36，中文 28/40 | 600 |
| 主要内容、语音文字 | body/l/regular | 24/32，中文 24/34 | 400 |
| ETA 数值、选中项 | body/l/medium | 24/32，中文 24/34 | 500 |
| 行标签、路名 | body/m/regular | 22/30，中文 22/32 | 400 |
| 中按钮、强调标签 | body/m/medium | 22/30，中文 22/32 | 500 |
| 说明、单位、副标题 | caption/regular | 20/26，中文 20/28 | 400 |

样式名前加 `en/` 或 `zh/`：纯西文和数字用 `en/`，出现中文的行用 `zh/`。大数字只有 `en/`。

## 1 规则

### FONT-01 只用这些样式（必须）
- 文字一律套 `en/` 或 `zh/` 文字样式，不手写字号、行高、字重。
- 不出现阶梯外的字号。不整体缩放带文字的组件实例（会产生 23.28 这类字号，D-89）；要别的尺寸，做尺寸变体。
- 检查：audit `text-style`（每个文字图层都套了 en/ 或 zh/ 样式）、`font-scale`（字号都在阶梯里）

### FONT-02 字体是变量（必须）
- 文字样式的字体、字重、字号、行高都绑定 Type 集合里的变量：`font/latin`、`font/cjk`、`weight/latin/*`、`weight/cjk/*`、`size/*`、`line/*`、`line-cjk/*`。
- 换字体只改 `font/latin` 或 `font/cjk`，以及对应的 `weight/*` 字重名。以后换成自己设计的字体也走这条路。

### FONT-03 中文用 zh 样式（必须）
- 只要一行里有中文，整行用 `zh/` 样式（Noto Sans SC，它自带西文和数字）。不在同一行里混用两种字体。
- 纯西文和数字用 `en/` 样式（Inter）。
- 中文行高比西文大，约为字号的 1.4 倍，取偶数：28/40、24/34、22/32、20/28。

### FONT-04 三档字重（必须）
| 层级 | 西文 | 中文 | 用在 |
|---|---|---|---|
| 高强调 | Inter Semibold 600 | Noto Sans SC Bold | 大数字、档位，其他地方一般不用 |
| 一般强调 | Inter Medium 500 | Noto Sans SC Medium | 标题、按钮、选中项、ETA 数值 |
| 不强调 | Inter Regular 400 | Noto Sans SC Regular | 正文、标签、说明 |
- Noto Sans SC 没有 600，高强调对应 Bold。
- 相邻两个层级至少差一档字重或一级颜色。

### FONT-05 层级先靠颜色（必须）
- 先用 `text/1`、`text/2`、`text/3` 分层（颜色 COLOR-13 的透明度阶梯），再用字重，不靠缩小字号分层。

### FONT-06 最小 20（必须）
- `caption` 20/26 是最小字号，不得更小。
- `text/3` 只用于 24 及以上（COLOR-05），所以 caption 上只能用 text/1 或 text/2。

### FONT-07 数字等宽（必须）
- 大数字和会跳动的数字（车速、距离、时间、温度、百分比）用等宽数字（OpenType `tnum`）。Figma 里在文字的 Details 面板打开 Tabular figures；代码里写 `font-variant-numeric: tabular-nums`。
- 单位跟在数字后面，用 `caption` 或 `body/m`，和数字按基线对齐。

### FONT-08 大数字最多两种（应）
- 一屏最多用两种大数字字号。

### FONT-09 字距为 0（必须）
- 所有样式字距 0。档位 P R N D 的间隔用空格，不改字距。

---

## 2 变量（Type 集合，一个模式）

| 变量 | 值 | 说明 |
|---|---|---|
| font/latin | Inter | 西文和数字 |
| font/cjk | Noto Sans SC | 中文和中英混排 |
| weight/latin/regular、medium、semibold | Regular、Medium、Semi Bold | Inter 的字重名 |
| weight/cjk/regular、medium、semibold | Regular、Medium、Bold | Noto Sans SC 的字重名 |
| size/number/xl、line/number/xl | 88、96 | |
| size/number/l、line/number/l | 40、48 | |
| size/number/m、line/number/m | 36、48 | |
| size/title、line/title、line-cjk/title | 28、36、40 | |
| size/body/l、line/body/l、line-cjk/body/l | 24、32、34 | |
| size/body/m、line/body/m、line-cjk/body/m | 22、30、32 | |
| size/caption、line/caption、line-cjk/caption | 20、26、28 | |

## 3 字号的来源

字号以已确认的关键界面为准（和颜色 COLOR-11 同一原则）。2026-11-14 统计 04 Components 页的 02 Components 和 05 Screens 页的 01 Key Screens：

| 界面里的规格 | 出现次数 | 例子 | 对应样式 |
|---|---|---|---|
| 88 Medium | 7 | 车速 80 | number/xl |
| 40/48 Medium | 12 | 300 m、0% 到 100% | number/l |
| 36/48 Semibold | 14 | 温度 22.0 | number/m |
| 28/36 Semibold | 42 | 档位 P R N D | title/semibold |
| 28/36 Medium | 9 | km/h、大按钮 Confirm | title/medium |
| 24/32 Medium | 20 | 10:48、18 min、语音卡片文字 | body/l/medium |
| 22/30 Medium | 20 | Then、150 m、中按钮 Confirm | body/m/medium |
| 22/30 Regular | 14 | Main Street、Windows、Temperature | body/m/regular |
| 20/26 Regular | 12 | Arrival、Time left | caption |

界面里用的是 SF Pro，token 换成 Inter，字号、行高、字重保持一致。界面里的文字图层还没有套新样式，套用时按上表一对一替换。

## 4 迁移记录（2026-11-14）

- 删除旧的 HMI/display、distance、value、title、body、body-strong、caption 七个文字样式。全文件没有任何图层引用它们。
- 新建 Type 变量集合（26 个变量）和 17 个文字样式（en/ 10 个，zh/ 7 个），全部绑定变量。
- SPEC 13.1 的车机字号表改为指向本文件；字重从 400、500 两档改为三档；车机界面从只用英文改为配中文。
- Doc/* 文字样式是规范画框用的，不属于车机 token，保留不动。
