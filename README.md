# Paxton 设计系统

作品集、DriveScene 和以后的产品界面共用的一套设计依据。目标只有一个：让 Claude、Codex 或任何设计师拿到这个仓库，就能在网页或 Figma 里做出**同一种审美和排版**，不依赖聊天记录或某个 AI 账号。

当前版本：规范 2.0（2026-11-07），组件文档 1.2。决定记录到 D-113。

## 先读什么

| 顺序 | 文件 | 回答什么 |
| --- | --- | --- |
| 1 | [STYLE.md](STYLE.md) | 这是什么风格、排一个新画面按什么顺序做决定、交付前怎么自查、怎么调用 AI |
| 2 | [SPEC.md](SPEC.md) | 全部现行规则：模式、颜色、材质、圆角、字体、间距、布局、动效、图标、状态、文案、可访问性、车机 |
| 3 | [tokens/tokens.json](tokens/tokens.json) | 唯一的数值源：网页 `--ds-*`、车机 `--ds-hmi-*`，Figma 同名变量 |
| 4 | [COMPONENTS.md](COMPONENTS.md)、`components/`、`gallery.html` | 组件规格、参考实现、全状态展示 |
| 5 | [HANDOFF.md](HANDOFF.md) | 执行清单：开工、改界面、做 Figma、改规范、升级版本、交付格式 |
| 查 | [MIGRATION.md](MIGRATION.md) | 两个关键页还差哪些地方没对齐规范 |
| 查 | [DECISIONS.md](DECISIONS.md)、[STATUS.md](STATUS.md)、[GOVERNANCE.md](GOVERNANCE.md) | 为什么这么定；Figma 节点和当前进度；谁能改、怎么发版 |
| 配图 | [illustrations/README.md](illustrations/README.md)、[CATALOG.md](illustrations/CATALOG.md) | 说明图积木、16 张参考图、组合方法 |
| 历史 | `codex/` | 建设过程的任务单，不是当前规则 |

## 体系结构

```
原则（STYLE.md）           风格是什么、怎么判断对错
   ↓
数值（tokens.json）        灰阶、一个蓝、间距阶梯、圆角阶梯、字号、动效；网页与车机同一个文件
   ↓
模式（SPEC 第 1 节）       内容 · 工具 · 车机：同一套颜色和材质，只换"谁是底"和尺度
   ↓
组件（COMPONENTS.md）      网页 19 个组件 + 内容页部件；车机组件见 SPEC 13.1
   ↓
产品（产品仓库）           只写布局差异和关键页基准；关键页是参考实现，同样受规范约束
```

两条贯穿全系统的规则：**阅读和操作所在的面最亮，作品所在的舞台是灰**；**层级靠颜色和间距，不靠线、框和字号**。

## 参考实现

| 模式 | 页面 | 仓库内对应 |
| --- | --- | --- |
| 内容 | 作品集首页与案例页 | `examples/portfolio.html` |
| 工具 | [DriveScene 工作台](https://paxton0209.github.io/DriveScene-Studio/studio/ui-draft/) | `examples/workbench.html` |
| 车机 | Figma lib test（位置见 STATUS） | SPEC 13.1 |

## 接入

产品仓库以 Git 子模块把本仓库挂在 `design-system/`，锁定版本标签，再把 `AGENTS.template.md` 复制到产品根目录填空。网页引入：

```html
<link rel="stylesheet" href="design-system/tokens/tokens.css">
```

主题：`<html data-theme="light|dark">`；不写时跟随系统。改数值只改 `tokens/tokens.json`，然后运行 `node tokens/build-tokens.mjs`。旧页面的 v1 变量名（`--ds-canvas`、`--ds-ink` 等）保留为别名。同一页面需要配图时，先加载配图层的 `tokens.css`，再加载本仓库的。

## 改规范

一律走 PR：CI 通过、作者批准才合并。新视觉规则未经作者确认只能写成待定；决定记进 DECISIONS，进度记进 STATUS。详见 GOVERNANCE。
