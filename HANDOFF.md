# AI 执行清单（先读这份）

给接手的 AI（Claude、Codex 等）和设计师用。这份设计系统约束网页、产品界面和 Figma 的视觉与交互实现；规则以仓库文件为准，不依赖原来的 Claude 账号、聊天历史或电脑路径。先读这份清单，再按任务读取规则和组件。

## 换账号或换工具接手

入口：https://github.com/Paxton0209/paxton-design-system 。网页阅读可直接打开 [SPEC](SPEC.md)、[COMPONENTS](COMPONENTS.md)、[设计变量源](tokens/tokens.json) 和 [STATUS](STATUS.md)；有终端时克隆本仓库，或递归克隆已接入的产品仓库。已有产品以子模块锁定版本为准，新产品选择已发布标签并记录版本。先说明本次任务、采用版本、适用规则和待确认冲突，再执行已授权的工作。

只有聊天或文件上传能力时，请作者提供同一版本的上述文件和产品 guideline；缺少文件或无法读取 Figma 实时画布时，说明具体缺口，不声称已读取或已验收。不需要原账号登录信息，也不要把历史任务单当作最新指令。

## 0. 先认清你在哪个仓库

| 仓库 | 是什么 | 你在这里通常做什么 |
| --- | --- | --- |
| `Paxton0209/paxton-design-system`（本仓库） | 所有产品共用的上游：规范、组件、tokens、检查脚本 | 只在作者要求维护设计系统时改 |
| 产品仓库，如 `Paxton0209/DriveScene-Studio` | 使用方；本仓库以子模块挂在 `design-system/`，锁定版本标签 | 日常界面开发 |

在产品仓库里，设计系统的路径一律写 `design-system/…`，不要写任何人电脑上的绝对路径。

## 1. 开工前（每次都做）

- [ ] 以下路径和命令用于产品仓库；在设计系统仓库中直接读取根目录文件，维护流程见第 3 节
- [ ] `git submodule update --init`，确认 `design-system/` 不是空目录
- [ ] `git -C design-system describe --tags` 记下当前锁定的版本
- [ ] 读产品根目录的 `AGENTS.md`（硬规则与本产品信息）
- [ ] 按顺序读：`design-system/README.md` → `SPEC.md` → `COMPONENTS.md` → 产品 guideline
- [ ] 查 `design-system/STATUS.md`：哪些是当前有效任务，哪些方案已退回
- [ ] 新开分支；不直接改 main

优先级：作者在对话中明确确认的规则 ＞ SPEC ＞ 产品 guideline ＞ 参考来源。冲突时停下回报，不自己取舍。

## 2. 改产品界面

- [ ] 下列数值与代码检查规则用于网页；车机与 Figma 的数值来源见 2.1，不能套用网页字号
- [ ] 关键页（作品集首页、DriveScene 工作台）的任何改动都要作者逐项确认，否则停下
- [ ] 数值只用 `var(--ds-…)`；确需写死时加 `/* ds-allow: 原因 */`
- [ ] 组件从 `design-system/components/` 复制；没有的组件不要自己造，先问
- [ ] 改间距按 SPEC 6.1 的模型，一次只改一层，说清改的是哪一层
- [ ] 在原规则上改，不在文件末尾追加覆盖块
- [ ] 不改 `design-system/` 子模块里的文件，也不顺手升级它
- [ ] 本地跑检查（以下为 DriveScene 示例，在产品根目录执行；其他产品按自己的 AGENTS.md 替换启动命令、预览路径和基准路径）：

```sh
npm ci --prefix design-system/checks
node design-system/checks/check-changed.mjs --base origin/main
python3 -m http.server 8000 &          # DriveScene：npm start
node design-system/checks/keypage.mjs --spec studio/ui-draft/keypage.json --out work/keypage
node design-system/checks/audit.mjs --url http://127.0.0.1:8000/studio/ui-draft/ --out work/ui-audit
```

- [ ] 提 PR，等 CI；作者明确授权前不合并，授权后可代为执行，并在 PR 中记录授权范围

## 2.1 Figma 与设计稿怎么执行

- [ ] 先读 SPEC 对应任务的章节与 COMPONENTS；车机屏幕遵循 SPEC 的车机分类及产品约束，不把网页字号和布局直接套到车机。
- [ ] 读取目标 Figma 实时画布：[当前参考文件](https://www.figma.com/design/T6kCgDUKJIt2e2TfDSZzp8/lib-test)，节点定位见 STATUS。访问依赖作者的 Figma 共享权限，与 Claude 账号无关。保留现有组件引用与作者已删除内容，历史截图和数量不证明当前状态。
- [ ] 已有明确作者确认依据的手调布局按该确认保留。仅观察到画布内容不能视为作者确认；与 SPEC 冲突或确认依据不明时，保留现状并报告，不自行修改画布或规范。
- [ ] 网页从 `tokens/tokens.json` 读取语义、值和深色值，映射到 Figma 变量或样式。车机专用值与字号以 SPEC 13.1 的表格为依据，对照 Figma 的 `Color` 变量（规则见 `color/color-tokens.md`）和 `Type` 变量与 `en/…`、`zh/…` 文字样式（规则见 `type/type-tokens.md`）；这些专用值暂未收进网页 tokens.json，不自行生成新值或当作网页变量使用。优先复用现有主组件与实例，缺少对应变量或样式时报告具体缺口，不声称已完成绑定。
- [ ] 交付文件链接、实际修改节点、采用版本，以及适用的浅深主题、尺寸和状态截图；未做的状态写明未验证。网页审计脚本不能直接验收 Figma，必须按规范核对画布中的数值、布局、文字、图标和状态。

## 2.2 配图怎么执行

先读 `illustrations/README.md` 和 `illustrations/CATALOG.md`，明确图要表达的关系，再选择必要的容器、步骤、能力、连接、分支或网格。现有样例可以组合和扩展，新图使用新 ID，保留已确认成品；不把现有数量、布局或产品控件的缺组件审批套用于配图。源文件与当前 PNG 的对应边界见 `catalog.json`，可编辑 HTML 有 14 份，ADAS 当前只提供 PNG。使用 `.vfig` 作用域隔离配图样式，导出后核对整体留白、必要标签、对齐和实际尺寸；浅深主题分别核对，未验证的状态如实记录。

## 3. 改设计系统本身（只在作者要求时）

- [ ] 在本仓库开分支；规则改动先找作者原话或 DECISIONS 编号作依据
- [ ] 未经作者确认的新视觉规则只能写成「待定」
- [ ] 改变量只改 `tokens/tokens.json`，再运行 `node tokens/build-tokens.mjs`；不手改 `tokens.css`
- [ ] 新决定记进 `DECISIONS.md`（编号接着往下排），当前状态同步到 `STATUS.md`
- [ ] 本地跑：`node checks/selftest.mjs`、`node checks/check-ui.mjs components gallery.html examples`
- [ ] 按 `.github/pull_request_template.md` 写 PR：改了什么、依据、影响哪些产品、验证
- [ ] 版本号按 `GOVERNANCE.md`：措辞和误报修复升 PATCH，新增升 MINOR，删除或改名升 MAJOR
- [ ] 合并和打标签由作者决定；作者明确授权前不执行，授权后可代为执行，并在 PR 中记录授权范围

## 4. 产品升级设计系统版本（单独一个 PR）

```sh
git -C design-system fetch --tags
git -C design-system checkout vX.Y.Z
cp design-system/tokens/tokens.css studio/ui-draft/design-system/tokens.css   # 按产品的 tokens 位置
git add design-system studio/ui-draft/design-system/tokens.css
```

- [ ] 同步产品 `AGENTS.md` 里写的版本号
- [ ] 跑 keypage；关键页受影响时停下，等作者逐项确认，再在同一次提交里改基准 `keypage.json`

## 5. CI 会拦什么

| 仓库 | 不过就不能合并 | 只出报告 |
| --- | --- | --- |
| 设计系统 | 检查器自测、check-ui、tokens 由 json 生成、审计器能识别坏样本 | 展示页和示例的渲染审计 |
| DriveScene | tokens 与锁定版本一致、check-ui（只查新增问题）、keypage ±1px | 工作台渲染审计 |

CI 的截图、报告和日志在 Actions 运行页的 Artifacts 里，保留 30 天。「只出报告」指审计发现的问题不拦合并；审计没跑完、没生成报告时 job 照样会失败。

## 6. 交付报告格式

```
## 改动
## 已实现
## 已验证（命令 + 结果；截图：1440 / 390 × 浅 / 深，改动前后同视口同状态）
## 未验证
## 问题（规范需要改的地方写这里，不要直接改规范）
```

构建或测试通过不等于视觉验收；CI 通过也不等于作者验收。

## 7. 当前已知情况（2026-11-05）

- 展示页与示例的渲染审计暂只出报告，含既有问题与已批准例外的冲突；具体计数与验证边界见 STATUS。不要为了让 CI 变绿去改已确认的规则或界面。
- 既有关键页没有追溯迁移到 tokens，所以产品 CI 用 `check-changed.mjs`，只查本次改动新增的问题。
- `renders/` 证据目录（约 47 MB）和 Sketch 英文阅读包没有进仓库，留在作者本地。
- 目前 AI 和作者用的是同一个 GitHub 账号，GitHub 分不出是谁，「只有作者能批准」只能靠约定。要真正强制，见 `GOVERNANCE.md` 关于机器账号的说明。
- 当前配图参考包已在 `illustrations/`：16 张浅色 PNG、14 份历史 HTML、CSS 与生成脚本。完整历史配图层仍在作者本地；历史 HTML 与部分后续修正版 PNG 不保证逐像素一致。

## 8. 文件地图

| 要找 | 看 |
| --- | --- |
| 规则正文 | `SPEC.md` |
| 配图组合 / 图片目录 / 源文件 | `illustrations/README.md` / `illustrations/CATALOG.md` / `illustrations/source/` |
| 组件规格 / 实现 / 全状态 | `COMPONENTS.md` / `components/` / `gallery.html` |
| 设计数值来源 | 网页：`tokens/tokens.json`（源）→ `tokens/tokens.css`（生成）；车机：SPEC 13.1 与对应 Figma 变量、文字样式 |
| 为什么这么定 | `DECISIONS.md` |
| 现在做到哪 | `STATUS.md` |
| 谁能改、怎么发版、怎么升级 | `GOVERNANCE.md` |
| 检查脚本用法 | `checks/README.md` |
| 新产品接入 | 把 `AGENTS.template.md` 复制到产品根目录并填空，再按第 4 节挂子模块 |
