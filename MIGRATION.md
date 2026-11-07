# 关键页迁移清单

版本 2.0 · 2026-11-07

规范 2.0 起，作品集首页和 DriveScene 工作台是参考实现，同样受 SPEC 约束（D-107）。这里列出两页与 SPEC 仍不一致的地方，每一项都有目标值和状态；清空后关键页就能直接用 `checks/` 衡量。迁移在产品仓库提 PR，每项附改动前后同视口、浅深截图，作者确认后合并。动效参数不在迁移范围内（D-21）。

进度用例外计数衡量：

```sh
node design-system/checks/exceptions.mjs studio/ui-draft   # 在产品仓库根目录
```

## 作品集（内容模式）

线上站点：peixin-portfolio-prototype.peixinyao0209.chatgpt.site。源码目前不在 GitHub，仓库内的 `examples/portfolio.html` 是按线上还原、已按目标值迁移的参考实现。

| 编号 | 项 | 线上现状 | 目标 | 依据 | 状态 |
| --- | --- | --- | --- | --- | --- |
| P-1 | 页面底 | #FFFFFF | `color-page`（同值） | D-108 | 已符合 |
| P-2 | 作品卡圆角 | 8 | `radius-panel` 8 | D-109 | 已符合 |
| P-3 | 公司标识块圆角 | 9 | `radius-panel` 8 | D-109 | 待迁移 |
| P-4 | Tools 标题 | 600 19/26 | `text-heading`（500） | D-112 | 待迁移 |
| P-5 | 工具卡标题、位置 | 500 15/20，距底 14 | `text-title` 16/22，距底 12 | D-112 | 待迁移 |
| P-6 | 断点 | 680 | `breakpoint-phone` 640 | SPEC 7 | 待迁移 |
| P-7 | 介绍后半句、"Where I've worked"等标签 | 浅灰（还原稿记为文字 3） | 文字 2（文字 3 对比度 3.22，不能承载要读的信息） | SPEC 12 | 待作者看截图确认 |
| P-8 | 案例页左栏组标题（WHY AI、THE CARD） | 全大写 | 句首大写，`text-ui-title`，文字 2 | SPEC 5 | 待作者看截图确认 |
| P-9 | 筛选标签选中 | 文字 1 下划线 | 同左（已成为内容模式规则） | D-111 | 已符合 |
| P-10 | 源码与检查 | 源码不在 GitHub，无法跑 `checks/` | 迁入 GitHub 仓库，以子模块接入设计系统，套用 `AGENTS.template.md`，建立 `keypage.json` | D-107 | 待执行 |

## DriveScene 工作台（工具模式）

2026-11-07 在 `studio/ui-draft` 实测：控件高 28、行高 32、面板宽 248、产品名 500 14/20、组标题 500 12/16，与 SPEC 一致；颜色已全部经由 `--ds-*` 别名。剩余差异如下。

| 编号 | 项 | 现状 | 目标 | 依据 | 状态 |
| --- | --- | --- | --- | --- | --- |
| D-1 | 面板、画布、放在底上的按钮和车型槽圆角 | 10 | `radius-panel` 8；改后更新 `keypage.json` | D-109 | 待迁移（随 v2.0.0 升级 PR） |
| D-2 | 样式分层 | 8 个 CSS 文件逐层覆盖（draft → inspector → shell-v5 → guizang-trial）；ds-allow 350 处，写死 px 845 处，阶梯外字重 10 处（部分已被后层覆盖） | 合并为一份工作台样式，在原规则上改；每个写死值换成变量或在本表登记。目标：ds-allow ≤ 50，最终 0 | SPEC 0、HANDOFF 2 | 待迁移，分多个 PR |
| D-3 | 产品 guideline | `studio/ui-draft/design guideline.MD` v0.1（10-31 草案，仍写 6/8/12/16 圆角等已被取代的数值） | 退役；改写为只含本产品布局和差异的短文件，按 `AGENTS.template.md` 的"本产品"一节 | D-107、DECISIONS「被取代」 | 待执行 |
| D-4 | 本地别名变量 | `--panel`、`--muted`、`--raised`、`--e1` 等，均已指向 `--ds-*` | 逐步直接写 `var(--ds-…)`；别名不再新增 | SPEC 0 | 低优先 |
| D-5 | README 截图 | `docs/studio-workbench.png` 中 Export 仍为墨色 | 按线上（蓝色主操作）重拍浅深两张 | D-62 | 待执行 |
| D-6 | 设计系统版本 | 子模块锁定 v1.5.x | 单独 PR 升级到 v2.0.0，同步 tokens 副本与 AGENTS.md | GOVERNANCE | 待执行 |

## 完成标准

- 两页的 ds-allow 只剩断点、字体文件等无法变量化的少数项，每项写明原因。
- `keypage.mjs` 通过，`audit.mjs` 无新增对比度问题。
- 完成后把渲染审计的 `continue-on-error` 去掉，审计变成门禁（GOVERNANCE）。
