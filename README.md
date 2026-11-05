# 设计系统：产品与网站层

当前版本：SPEC 1.4、COMPONENTS 1.1（2026-11-05）。Figma 已精简为 Work、Components 两页和 66 个关键主组件；全部可编辑文案为英文 Inter，37 个线性/面性图标统一白色，Dock App 图标保留彩色。规则与尺寸用途分类见 SPEC 13.1–13.2，当前节点和验收边界统一查 STATUS.md。

作品集网站、DriveScene 和以后的产品界面都按这里做。说明图和配图仍按作者本地 `design-system/` 上一级的 `figure-kit.css` 和《审美与部件-v2.md》（不在本仓库）。

## 仓库与使用方

本仓库是所有产品共用的上游，作品集、DriveScene 和以后的产品都是使用方。产品仓库以 Git 子模块把本仓库挂在 `design-system/`，锁定到某个版本标签；产品里的 `AGENTS.md` 只写相对路径 `design-system/…`，所以本地和云端的 AI 读到的是同一份。产品自己的布局差异、关键页基准（如 `keypage.json`）留在产品仓库，不放进这里。

改规范、组件、tokens 或检查脚本，一律走 PR：CI（`.github/workflows/ci.yml`）跑过，且作者批准才能合并。版本、发布和产品升级的做法见 `GOVERNANCE.md`。

## 先读什么

| 顺序 | 文件 | 作用 |
| --- | --- | --- |
| 0 | `HANDOFF.md` | AI 执行清单：开工、改界面、改规范、升级版本、交付格式 |
| 1 | `SPEC.md` | 规范正文，只写当前有效的规则 |
| 2 | `tokens/tokens.css` | 代码里唯一可以用的数值 |
| 3 | `COMPONENTS.md`、`components/`、`gallery.html` | 组件规格、参考实现、全状态展示 |
| 4 | `checks/`、`AGENTS.template.md`、`examples/` | 检查脚本、产品仓库入口模板、示例 |
| 4 | 产品自己的 guideline | 只写该产品的布局和差异 |
| 查 | `DECISIONS.md` | 为什么这么定、哪些还待定 |
| 查 | `STATUS.md` | 当前 Figma 页面与节点、有效任务、已退回方案和待验证事项 |
| 查 | `PLAN.md` | 建设计划和进度 |
| 派活 | `codex/` | 给 Codex 的命令文件（每份写明范围、标杆、验收和报告格式） |

## 给 Codex 的规则

1. 日常实现只读规范；作者明确要求维护文档时可在授权范围内同步 SPEC、DECISIONS 和 STATUS，保留决定依据。未确认的新视觉规则先记录为待定，不自行写成已定规则。
2. 颜色、圆角、字号、字重、间距、阴影只用 `var(--ds-…)`，不写数值。
3. 组件先从 `components/` 复制；没有的组件不要自己造，先问。
4. 每个界面改动交付浅深两套截图，桌面和手机各一张，并运行 `checks/` 里的检查（`check-ui` 查数值、字距、写死颜色；`audit` 查渲染和对比度）。
5. 如实区分「已实现」「已验证」「未验证」。

## 接入

```html
<link rel="stylesheet" href="design-system/tokens/tokens.css">
```

主题：`<html data-theme="light|dark">`；不写时跟随系统。改变量只改 `tokens/tokens.json`，然后运行：

```
node tokens/build-tokens.mjs
```

旧页面用到的 v1 变量名（`--ds-canvas`、`--ds-ink`、`--ds-grey` 等）在新文件里保留为别名，值已经换成 v5 中性灰。同一页面同时需要配图时，先加载配图层的 `tokens.css`，再加载本仓库的 `tokens.css`。

## 进度

| 轮次 | 内容 | 状态 |
| --- | --- | --- |
| 1 | SPEC 基础层、DECISIONS、tokens | 完成，作者 11-04 确认 |
| 2 | 组件规格、参考实现、展示页 | 完成，Claude 11-04 验收通过 |
| 3 | 检查脚本、AGENTS 模板、作品集与工具示例、DriveScene 迁移 | 完成，Claude 验收退回三处（D-24 至 D-26） |
| 4 | 退回项、内容页语汇（SPEC 7.1）、DriveScene 发版 | Claude 验收通过，等 Codex 发版 |
| 5 | 车机 v0.1（图标、组件、示例屏）、规范 1.1 整理、DriveScene 可视性修复 | Claude 完成规范与标杆；Codex 测试与修复进行中 |
| 当前 | SPEC 1.4、Figma 极简库与图标分类 | 两页、66 个主组件、英文 Inter、白色图标；当前验证边界见 STATUS |

上表早期轮次保留为历史记录，不用于推断当前发布状态。旧 Figma A–E 任务单已归为历史；后续执行以 SPEC 1.4、DECISIONS D-97 至 D-100 和 STATUS 为准。
