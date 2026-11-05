# 设计系统产品层：建设计划（2026-11-04）

## 目标

让以后的产品和作品集都能交给 Codex 按同一套规范实现，结果不走样。具体要满足四条：

1. 规范只有一份「现状正文」，Codex 不需要在历史记录里判断哪条有效。
2. 颜色、字号、圆角、间距都有代码变量，Codex 只能从变量里选，不能自己编数值。
3. 每个常用组件都有可以直接复制的参考实现，并附全部状态。
4. 规则能用脚本检查，Codex 交付前自己跑，Claude 和作者看证据验收。

## 分工

| 角色 | 负责 |
| --- | --- |
| 作者 | 方向、取舍、最终视觉验收 |
| Claude | 规范正文、组件规格、Codex 命令、验收 |
| Codex | 按规格写组件和展示页、截图、检查脚本、迁移现有产品；只读规范，不改规范 |

## 目录（`design-system/product/`）

| 文件 | 内容 | 轮次 | 负责 |
| --- | --- | --- | --- |
| `README.md` | 入口：读什么、按什么顺序、优先级 | 1 | Claude |
| `SPEC.md` | 规范正文，只写当前有效的规则 | 1（基础），2（组件），3（补全） | Claude |
| `DECISIONS.md` | 决策日志：已定、待定、被取代 | 每轮 | Claude |
| `tokens/tokens.json` | 变量源文件（W3C 设计变量格式，Figma 可导入） | 1 | Claude |
| `tokens/tokens.css` | 由 `build-tokens.mjs` 生成，不手改 | 1 | 脚本 |
| `COMPONENTS.md` | 每个组件的结构、尺寸、变量、状态、键盘行为 | 2 | Claude |
| `components/` | 参考实现：`components.css`、`components.js` | 2 | Codex |
| `gallery.html` | 全组件 × 全状态 × 浅深的展示页，也是视觉验收基准 | 2 | Codex |
| `renders/` | 展示页和示例的截图 | 2、3 | Codex |
| `checks/` | `check-ui.mjs`（静态检查）、`audit.mjs`（Playwright 对比度、圆角、截图） | 3 | Codex |
| `AGENTS.template.md` | 复制进每个产品仓库的 Codex 入口 | 3 | Claude |
| `examples/` | 作品集首页、工具界面示例，用来验证规则通用 | 3 | Codex |

`design-system/` 原有文件不变：`tokens.css` 里的 `--fig-*`、`--lay-*` 和 `figure-kit.css`、`stage-kit.css` 继续只用于配图；配图规则仍在《审美与部件-v2.md》。

## 三轮安排

### 第 1 轮：基础层（本轮，Claude）

- 产出：README、SPEC 基础部分、DECISIONS、tokens。
- 对比度实测后定下四项修正，见 DECISIONS D-01 至 D-04。
- 《审美与部件-v2.md》的 v5.1 节改为指向 SPEC（去重）；DriveScene guideline 的引用同步更新。
- 验收：作者看 SPEC 和 DECISIONS 的待定项，回复确认或修改。

### 第 2 轮：组件（Claude 写规格，Codex 实现）

- Claude：写 `COMPONENTS.md`，覆盖按钮（普通、强调、文字、图标）、分段、开关、下拉与菜单、文本输入、复选框、单选、滑杆、标签页、列表行、卡片、面板、提示气泡、对话框、提示条、空状态、骨架、链接；写第 2 轮 Codex 命令。
- Codex：只用 tokens 写 `components.css` / `components.js` 和 `gallery.html`；展示页用强制状态类（`.is-hover`、`.is-focus`、`.is-active`、`.is-disabled`）把全部状态同时显示出来；浅深各截一张。
- 验收：Claude 对照规格逐项量；作者看截图定稿。

### 第 3 轮：执行与验证（Codex 为主）

- Codex：写 `checks/check-ui.mjs`（禁止 tokens 以外的颜色、圆角、字号、字重，禁止界面文字里的「·」）和 `checks/audit.mjs`（Playwright：文字对比度、计算后的圆角、状态矩阵截图）；用组件重建作品集首页和一个工具界面示例；用检查脚本扫一遍 DriveScene，列出迁移清单。
- Claude：写 `AGENTS.template.md`；补 SPEC 中第 2 轮暴露的缺口；验收。
- 验收：两个示例和组件库检查零报错；作者看示例截图。

### 第 4 轮：退回项、内容页语汇、DriveScene 发版（完成）

- 分段双线、作品卡遮罩、滑杆焦点三处修复；新增胶囊、引文、小节部件（只用于新页面）。
- DriveScene be0f56d 已上线。
- 教训：作品集首页和 DriveScene 是关键页，设计系统描述它们、不改它们（D-31）。

### 收尾（进行中）

- 作品集示例对照线上个人网站逐项还原，更正关键页例外表。
- 展示页补上「图下标题卡」（新页面专用）。
- DriveScene 和作品集两个仓库各放一份 AGENTS.md。
- 以后再做：Figma 变量（P-05）、新页面上试 Inter 4 Display 或 Geist、真机验证。

## 每轮的通用验收

- 浅深两套截图，桌面和手机两种视口。
- 如实区分「已实现」「已验证」「未验证」。
- 规范改动只由 Claude 写入，并在 DECISIONS 记一条。
