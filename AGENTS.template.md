# AGENTS.md（模板：复制到产品仓库根目录，填写「本产品」一节）

## 设计系统

本仓库的界面按 Paxton 设计系统实现。设计系统是独立仓库 `Paxton0209/paxton-design-system`，以 Git 子模块挂在本仓库的 `design-system/`，锁定到 {{DS_VERSION}}。克隆后先执行 `git submodule update --init`；下文路径都相对本仓库根目录。

改动任何界面前，先过一遍 `design-system/HANDOFF.md`（执行清单），再按顺序读：

1. `design-system/README.md`：入口和优先级
2. `design-system/SPEC.md`：规则正文（颜色、材质、圆角、字体、间距、布局、动效、图标、状态、文案、可访问性）
3. `design-system/COMPONENTS.md`：组件规格；参考实现在 `design-system/components/`，全状态展示在 `design-system/gallery.html`
4. 本仓库的产品 guideline（见下）

优先级：作者在对话中明确确认的规则 ＞ SPEC ＞ 产品 guideline ＞ 参考来源。冲突时停下回报，不自行取舍。

## 硬规则

0. **关键页不改。** 作品集首页和 DriveScene 工作台是作者确认过的关键页。设计系统更新不是改它们的理由；关键页的任何改动必须有作者逐项确认，否则停下。

1. **只用变量。** 颜色、圆角、字号、字重、间距、阴影、时长只写 `var(--ds-…)`。tokens 复制到本仓库的 `{{TOKENS_PATH}}`，不手改；升级设计系统版本时从 `design-system/tokens/tokens.css` 重新复制，CI 会核对两者一致。确需写数值时加 `/* ds-allow: 原因 */`。
2. **组件先复制。** 需要的组件先从 `design-system/components/` 复制，保持类名和状态写法。设计系统里没有的组件不要自己造，停下来提给 Claude。
3. **不改 `design-system/` 子模块**里的任何文件，也不随手升级子模块版本。规范需要修改时，写进交付报告的「问题」一节，或到 `paxton-design-system` 仓库单独提 PR，由作者批准。
4. **不加**规范和作者都没要求的元素、说明文字、装饰、第二个强调色。
5. **动效**用 SPEC 第 8 节的变量；本产品已确认的动效不改。
6. **文案**：句首大写，不用「·」分隔，不用他人商标做功能名。
7. **高亮用填充**：选中 = 中性选中块 + 文字 1 + 500（未选文字 2）；开启、进度 = 强调色；主操作 = `accent-fill`，每屏一个。描边只用于 SPEC 3.1 列的 5 种情况。
8. **字距 0**，字重只用 400 / 500，界面文字不小于 12px；文字与图标同行按大写字高居中。
9. **不写死颜色**，包括 data-URI SVG 和提示气泡；图标用 `currentColor`。
10. **下拉展开方向按区域定**：面板底部区域一律向上，同组一致，不盖住主操作。
11. **间距按模型改**（SPEC 6.1），一次只改一层，说清是哪一层；同一面板控件同高。
12. **不追加覆盖块**：改已有规则就在原规则上改，不在文件末尾追加 follow-up 覆盖。
13. **取值合法不等于通过**：交付前跑 `design-system/checks/keypage.mjs`，关键页可见间距与基准相差 ≤ 1px。

## 交付前必须做

```
npm ci --prefix design-system/checks
node design-system/checks/check-changed.mjs --base origin/main {{要检查的目录}}
node design-system/checks/audit.mjs --url {{本地预览地址}} --out {{证据目录}}
node design-system/checks/keypage.mjs --spec {{关键页基准 json}} --url {{本地预览地址}} --out {{证据目录}}/keypage
```

同样的检查在每个 PR 上由 GitHub Actions 自动运行，不通过不能合并；本地先跑是为了少走一轮。

- `check-changed` 零新增报错（或每条都有 ds-allow 原因）。它只报本次改动新增的问题，既有关键页的历史数值不算。
- `audit` 的截图：桌面 1440 和手机 390，浅深两套；对比度报告里默认、选中、焦点、错误状态没有低于 4.5:1 的文字。
- 交付报告写清「已实现」「已验证」「未验证」；构建或测试通过不等于视觉验收。
- 改动前后同视口、同状态的对照截图。

## 本产品

- 产品名：{{PRODUCT}}
- 产品 guideline：{{GUIDELINE_PATH}}（只写本产品的布局和差异）
- tokens 位置：{{TOKENS_PATH}}
- 本地预览：{{PREVIEW_COMMAND}}
- 构建与测试：{{BUILD_TEST_COMMAND}}
- 设计系统版本：{{DS_VERSION}}（升级见 `design-system/GOVERNANCE.md`）
- 已确认、不得改动的部分：{{FROZEN}}
