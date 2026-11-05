# 治理：谁能改、怎么发布、产品怎么升级

## 角色

| 谁 | 能做什么 | 不能做什么 |
| --- | --- | --- |
| 作者（@Paxton0209） | 批准并合并 PR，打版本标签，决定产品何时升级 | — |
| AI（Claude、Codex 等） | 开分支、改文件、提 PR、在 PR 里回复审核意见 | 合并 PR、直接推 main、打标签、把未确认的视觉规则写成已定 |

`.github/CODEOWNERS` 把整个仓库指给作者，main 的分支规则要求 PR、CI 通过和代码负责人批准。

注意：如果 AI 用的是作者本人的 GitHub 账号（目前就是这样），GitHub 分不出是谁在操作，「必须作者批准」在技术上拦不住它，只能靠上表的约定。要真正强制，给 AI 单独开一个机器账号（或 GitHub App），只给它写权限；这样它提的 PR 必须由作者批准才能合并。

## 每个 PR 自动跑的检查

`.github/workflows/ci.yml`：

1. **静态检查**：`checks/selftest.mjs`，`check-ui` 扫 `components/`、`gallery.html`、`examples/`，并确认 `tokens.css` 由 `tokens.json` 生成、没有手改。
2. **渲染审计**：Playwright 打开展示页和两个示例，1440 / 390、浅 / 深，查对比度、圆角、字号、字重、横向溢出；再用 `fixtures/audit-bad.html` 确认审计器自身能报错。截图、报告和运行日志作为 Actions 附件保留 30 天。审计**发现问题**只出报告；审计**没跑完**（崩溃、超时、没生成 audit.md）会让 job 失败并打印日志尾部。

静态检查和审计器自测不过，PR 不能合并。展示页和示例的审计**暂时只出报告**：2026-11-05 在作者 Mac 上实跑（Chrome 156）有 322 条失败记录（跨视口、主题重复计数：对比度 146、圆角 160、非文字对比度 8、字号 4、字重 4），其中作品集示例的 9px 圆角、15px 字号、600 字重有 D-31 / D-32 批准注释，说明审计规则还不认产品例外。作者逐项判断（改审计规则让它识别 ds-allow，或修界面）之后，删掉 `ci.yml` 里两处 `continue-on-error`，审计就变成门禁。不为了让 CI 变绿改已确认的规则或界面。

## 版本

- 标签用 `vMAJOR.MINOR.PATCH`，MAJOR.MINOR 跟 SPEC 版本走（SPEC 1.4 → `v1.4.x`）。
- 只改文档措辞、修检查脚本的误报：PATCH。
- 新增组件、新增 token、新增规则：MINOR，并在 DECISIONS 记一条。
- 删除或改名 token、改变已有组件结构：MAJOR，PR 里列出受影响产品和迁移办法。
- 发布：作者合并后在 main 上打标签（`git tag v1.4.1 && git push origin v1.4.1`）。

## 产品怎么用、怎么升级

产品仓库以子模块挂本仓库：

```sh
git submodule add https://github.com/Paxton0209/paxton-design-system design-system
git -C design-system checkout v1.4.0
git add .gitmodules design-system && git commit -m "Pin design system v1.4.0"
```

升级是产品仓库里的一个普通 PR，同时做三件事：

1. `git -C design-system fetch --tags && git -C design-system checkout vX.Y.Z`
2. 把 `design-system/tokens/tokens.css` 复制到产品的 tokens 位置（产品 CI 会核对两者一致）
3. 跑产品的关键页检查；关键页受影响时，由作者逐项确认后再改基准

产品仓库的 CI 不跟着本仓库 main 自动变，只认子模块锁定的版本，所以本仓库的改动不会悄悄改掉任何产品的界面。

## 产品专属内容放哪

产品的布局差异、关键页基准（如 DriveScene 的 `studio/ui-draft/keypage.json`）、迁移记录都放在产品仓库。本仓库只放所有产品共用的规范、组件、tokens 和检查工具。`codex/` 里的任务单是建设过程的历史记录，保留备查，不作为当前规则。
