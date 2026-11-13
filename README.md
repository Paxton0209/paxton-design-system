# 设计系统：产品、网站与配图参考

这是跨产品共用的设计依据，供 Claude、Codex、其他 AI 和设计师制作网页、产品界面与 Figma 设计。换账号或换工具后，从 [HANDOFF.md](HANDOFF.md) 开始；规则、设计变量和组件直接保存在仓库中，使用它们不依赖旧聊天记录或特定 AI 账号。仓库版本使用 Git 标签，SPEC 和 COMPONENTS 的版本分别表示规则正文与组件文档的版本。

当前规则版本：SPEC 1.6、COMPONENTS 1.1、车机图标规范 1.2、车机颜色 token 1.2（2026-11-13）。网页设计变量以 tokens 为源；车机（HMI）专用值与字号见 SPEC 13.1，两套规则不互用。当前任务、待定项与 Figma 定位见 [STATUS.md](STATUS.md)，执行前须读取实时画布。

作品集网站、DriveScene 和以后的产品界面按 SPEC 与 COMPONENTS 执行。说明图与配图从 [配图积木与组合参考](illustrations/README.md) 和 [图片目录](illustrations/CATALOG.md) 进入：参考材质、留白、层级和关系，根据内容选择、组合并扩展。这批样例提供基础参考，不限制未来配图的数量或布局；已经确认的成品按原样使用，局部修正遵循作者明确反馈。完整历史配图文档仍在作者本地，本仓库已提供可独立调用的当前参考包。

## 仓库与使用方

本仓库是所有产品共用的上游，作品集、DriveScene 和以后的产品都是使用方。产品仓库以 Git 子模块把本仓库挂在 `design-system/`，锁定到某个版本标签；产品里的 `AGENTS.md` 只写相对路径 `design-system/…`，所以本地和云端的 AI 读到的是同一份。产品自己的布局差异、关键页基准（如 `keypage.json`）留在产品仓库，不放进这里。

改规范、组件、tokens 或检查脚本，一律走 PR：CI（`.github/workflows/ci.yml`）跑过，且作者批准才能合并。版本、发布和产品升级的做法见 `GOVERNANCE.md`。

## 先读什么

| 顺序 | 文件 | 作用 |
| --- | --- | --- |
| 0 | `HANDOFF.md` | AI 执行清单：开工、改界面、改规范、升级版本、交付格式 |
| 1 | `SPEC.md` | 规范正文，只写当前有效的规则 |
| 2 | `tokens/tokens.css` | 网页代码的设计变量；车机专用值见 SPEC 13.1 |
| 3 | `COMPONENTS.md`、`components/`、`gallery.html` | 组件规格、参考实现、全状态展示 |
| 4 | `checks/`、`AGENTS.template.md`、`examples/` | 检查脚本、产品仓库入口模板、示例 |
| 5 | 产品自己的 guideline | 只写该产品的布局和差异 |
| 车机图标 | `icons/icon-guideline.md`、`.en.md` | 车机线性图标规则源：每条规则带 ID、阈值和检查方式 |
| 车机颜色 | `color/color-tokens.md`、`.en.md` | 车机颜色 token：原色、语义、对比度和规则 |
| 配图 | `illustrations/README.md`、`CATALOG.md`、`catalog.json` | 组合规则、16 张参考图、来源与可编辑性边界 |
| 查 | `DECISIONS.md` | 为什么这么定、哪些还待定 |
| 查 | `STATUS.md` | 当前 Figma 页面与节点、有效任务、已退回方案和待验证事项 |
| 查 | `PLAN.md` | 建设计划和进度 |

## 给所有 AI 和设计执行者的规则

1. 日常实现只读规范；作者明确要求维护文档时可在授权范围内同步 SPEC、DECISIONS 和 STATUS，保留决定依据。未确认的新视觉规则先记录为待定，不自行写成已定规则。
2. 网页代码中的颜色、圆角、字号、字重、间距、阴影只用 `var(--ds-…)`，不写数值；Figma 按 HANDOFF 的设计执行方式映射同源变量。
3. 产品控件先从 `components/` 复制；没有的控件不要自己造，先问。配图按 `illustrations/README.md` 选择、组合和扩展积木，不将这条控件限制套用于新配图。
4. 网页界面改动交付桌面和手机、浅深两套截图，并运行 `checks/` 中适用的检查；Figma 按 HANDOFF 2.1 核对目标尺寸、主题与状态。
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

## 当前状态

当前状态与验收边界统一见 [STATUS.md](STATUS.md)。历史决定见 DECISIONS；旧的任务单已删除，需要时从 git 历史查。
