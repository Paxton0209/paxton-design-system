# Codex 命令：DriveScene 关键页 v2 发版

发令：Claude · 2026-11-04 18:20 · 作者 17:54 要求「手机和网页都优化间距比例，做个 keypage，然后发版本；主色统一」。Claude 已在 e8b9a26 上做好并验证，因为没有仓库推送权限，交给你应用补丁并发版。

## 1. 应用补丁

```sh
cd <DriveScene 仓库>
git fetch origin && git checkout main && git pull --ff-only
git log --oneline -1          # 应为 e8b9a26；如果更新了，先停下回报
git am /Users/peixin/Documents/Codex/2026-11-01/bang/outputs/design-system/product/codex/patches/drivescene-keypage-v2.patch
```

如果你本地还有未提交的改动（例如「Sketch 图标」那一轮），先 `git stash`，补丁应用后再看是否还需要；**补丁里的主色已统一为 #1471D6，图标那轮如果另写了蓝色，以补丁为准。**

## 2. 补丁改了什么（不要再动这些值）

- **桌面**：下拉高 28，和分段同高，所有控件的可见间距统一为 8；去掉 Format 和 Size 之间额外的 8 外边距。
- **手机（标签在上）**：组标题→标签 8，标签→控件 6，控件→下一个标签 16，开关行之间 4，组与组 28，预览→Export 12；字段标签用文字 1，组标题用文字 2。
- **主色**：只用一个蓝 #1471D6（浅深相同），tokens 已改。
- **新增** `studio/ui-draft/keypage.json`（关键页基准），并更新 AGENTS.md 和 `design guideline.MD` 第 25 节。

## 3. 构建、检查、发版

```sh
npm run build --prefix studio/ui-draft     # 会重新内联 shell-v5.css，结果应与补丁一致
npm test --prefix studio/ui-draft
npm start   # 另开终端
node /Users/peixin/Documents/Codex/2026-11-01/bang/outputs/design-system/product/checks/keypage.mjs --spec studio/ui-draft/keypage.json --out work/keypage
node /Users/peixin/Documents/Codex/2026-11-01/bang/outputs/design-system/product/checks/check-ui.mjs studio/ui-draft/shell-v5.css
```

- keypage 必须 **26/26 通过**；Claude 在云端无头 Chrome 上已跑过，26/26 通过。
- 构建后 `git diff` 应只有补丁里的文件。如果构建改动了 index.html 里内联的 CSS，以构建结果为准，但 keypage 必须仍然通过。
- 通过后按以往的发版流程推送 main。

## 4. 回报

回复「关键页 v2 已发版」，附：发版提交号、keypage 输出（work/keypage/keypage.json 的通过数）、桌面和手机浅深 4 张截图。任何一项不通过，先停下，不要自己调间距，把失败的那一行发给 Claude。

## 以后改间距（AGENTS 第 7–9 条）

间距按 SPEC 6.1 的模型改，一次只改一层，说清改的是哪一层；改已有规则，不在文件末尾追加覆盖块；交付前 keypage 零失败。基准要改，先经作者同意，再在同一次提交里改 `keypage.json`。
