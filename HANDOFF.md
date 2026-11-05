# AI 执行清单（先读这份）

给接手的 AI（Claude、Codex 等）用。读完这一页就能开工；细节再按链接去查。

## 0. 先认清你在哪个仓库

| 仓库 | 是什么 | 你在这里通常做什么 |
| --- | --- | --- |
| `Paxton0209/paxton-design-system`（本仓库） | 所有产品共用的上游：规范、组件、tokens、检查脚本 | 只在作者要求维护设计系统时改 |
| 产品仓库，如 `Paxton0209/DriveScene-Studio` | 使用方；本仓库以子模块挂在 `design-system/`，锁定版本标签 | 日常界面开发 |

在产品仓库里，设计系统的路径一律写 `design-system/…`，不要写任何人电脑上的绝对路径。

## 1. 开工前（每次都做）

- [ ] `git submodule update --init`，确认 `design-system/` 不是空目录
- [ ] `git -C design-system describe --tags` 记下当前锁定的版本
- [ ] 读产品根目录的 `AGENTS.md`（硬规则与本产品信息）
- [ ] 按顺序读：`design-system/README.md` → `SPEC.md` → `COMPONENTS.md` → 产品 guideline
- [ ] 查 `design-system/STATUS.md`：哪些是当前有效任务，哪些方案已退回
- [ ] 新开分支；不直接改 main

优先级：作者在对话中明确确认的规则 ＞ SPEC ＞ 产品 guideline ＞ 参考来源。冲突时停下回报，不自己取舍。

## 2. 改产品界面

- [ ] 关键页（作品集首页、DriveScene 工作台）的任何改动都要作者逐项确认，否则停下
- [ ] 数值只用 `var(--ds-…)`；确需写死时加 `/* ds-allow: 原因 */`
- [ ] 组件从 `design-system/components/` 复制；没有的组件不要自己造，先问
- [ ] 改间距按 SPEC 6.1 的模型，一次只改一层，说清改的是哪一层
- [ ] 在原规则上改，不在文件末尾追加覆盖块
- [ ] 不改 `design-system/` 子模块里的文件，也不顺手升级它
- [ ] 本地跑检查（在产品仓库根目录）：

```sh
npm ci --prefix design-system/checks
node design-system/checks/check-changed.mjs --base origin/main
python3 -m http.server 8000 &          # DriveScene：npm start
node design-system/checks/keypage.mjs --spec studio/ui-draft/keypage.json --out work/keypage
node design-system/checks/audit.mjs --url http://127.0.0.1:8000/studio/ui-draft/ --out work/ui-audit
```

- [ ] 提 PR，等 CI；**不要自己合并**

## 3. 改设计系统本身（只在作者要求时）

- [ ] 在本仓库开分支；规则改动先找作者原话或 DECISIONS 编号作依据
- [ ] 未经作者确认的新视觉规则只能写成「待定」
- [ ] 改变量只改 `tokens/tokens.json`，再运行 `node tokens/build-tokens.mjs`；不手改 `tokens.css`
- [ ] 新决定记进 `DECISIONS.md`（编号接着往下排），当前状态同步到 `STATUS.md`
- [ ] 本地跑：`node checks/selftest.mjs`、`node checks/check-ui.mjs components gallery.html examples`
- [ ] 按 `.github/pull_request_template.md` 写 PR：改了什么、依据、影响哪些产品、验证
- [ ] 版本号按 `GOVERNANCE.md`：措辞和误报修复升 PATCH，新增升 MINOR，删除或改名升 MAJOR
- [ ] 合并和打标签由作者来做

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

- 渲染审计在现有展示页和示例上不通过：作者 Mac 上实跑（Chrome 156）有 322 条失败记录（对比度 146、圆角 160、非文字对比度 8、字号 4、字重 4，跨视口和主题重复计数）。其中作品集示例的 9px 圆角、15px 字号、600 字重带有 D-31 / D-32 批准注释，说明审计还不认 ds-allow 例外。所以审计暂时只出报告，等作者逐项判断。**不要为了让 CI 变绿去改已确认的规则或界面。**
- 既有关键页没有追溯迁移到 tokens，所以产品 CI 用 `check-changed.mjs`，只查本次改动新增的问题。
- `renders/` 证据目录（约 47 MB）和 Sketch 英文阅读包没有进仓库，留在作者本地。
- 目前 AI 和作者用的是同一个 GitHub 账号，GitHub 分不出是谁，「只有作者能批准」只能靠约定。要真正强制，见 `GOVERNANCE.md` 关于机器账号的说明。
- 云端会话的网络可能拦 npm 下载（2026-11-05 Claude 云端环境装 Playwright 时遇到过 403）。这是云端环境的限制，不是作者电脑的问题；这种时候以 GitHub Actions 的结果为准，或请作者在本机跑。
- 配图层（`figure-kit.css`、《审美与部件-v2.md》）还在作者本地，不在本仓库。

## 8. 文件地图

| 要找 | 看 |
| --- | --- |
| 规则正文 | `SPEC.md` |
| 组件规格 / 实现 / 全状态 | `COMPONENTS.md` / `components/` / `gallery.html` |
| 唯一可用的数值 | `tokens/tokens.json`（源）→ `tokens/tokens.css`（生成） |
| 为什么这么定 | `DECISIONS.md` |
| 现在做到哪 | `STATUS.md` |
| 谁能改、怎么发版、怎么升级 | `GOVERNANCE.md` |
| 检查脚本用法 | `checks/README.md` |
| 新产品接入 | 把 `AGENTS.template.md` 复制到产品根目录并填空，再按第 4 节挂子模块 |
| 历史任务单 | `codex/`（只作记录，不是当前规则） |
