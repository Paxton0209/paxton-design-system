# 设计系统检查工具

在本仓库根目录执行下列命令。静态检查只使用 Node.js 内置模块；浏览器审计只增加 Playwright 依赖，字体、tokens 和组件均来自本目录。交付包不包含 node_modules，先用锁文件安装依赖。

```sh
npm ci --prefix checks
node checks/selftest.mjs
node checks/check-ui.mjs components gallery.html examples
python3 -m http.server 8767 --bind 127.0.0.1
```

另一个终端运行渲染检查；服务器的根目录需要为本仓库根目录。

```sh
node checks/audit.mjs --url http://127.0.0.1:8767/gallery.html --out renders/component-audit
node checks/audit.mjs --url http://127.0.0.1:8767/examples/portfolio.html --url http://127.0.0.1:8767/examples/workbench.html --out renders/examples --viewports 1440,390 --themes light,dark
```

macOS 优先使用已安装的 Google Chrome。Linux（含 GitHub Actions）没有 GPU，`audit` 默认用 SwiftShader 渲染 WebGL（`--use-angle=swiftshader --enable-unsafe-swiftshader --ignore-gpu-blocklist`），macOS 使用浏览器原生渲染；`keypage` 采用相同平台配置。可用 `DS_BROWSER_ARGS` 覆盖启动参数。页面加载和每次截图的超时默认 120000 ms，可用 `DS_SCREENSHOT_TIMEOUT` 调整。实际使用的参数写在 audit.json 的 `launchArgs`、`stepTimeout`。其他系统用 `npx --prefix checks playwright install chromium` 安装浏览器，或设置 `DS_BROWSER_EXECUTABLE` 为 Chromium/Chrome 的绝对路径。截图等待字体及图片加载，关闭动画和过渡，审计结果记录浏览器版本。

## 静态检查

`node checks/check-ui.mjs <文件或目录…> [--config checks/ds-check.json]` 支持 color-literal、raw-length、radius、font、duration、banned、middle-dot、tokens-only 八项规则。输出位置为文件:行:列，违规退出 1；同一行或上一行的 `/* ds-allow: 原因 */` 跳过该行检查并汇总理由。默认允许 0，及作为线宽使用的 1px、1.5px、2px；额外长度使用配置中的 allowPx。ignore 支持目录名或相对配置文件的具体路径，tokens 相对配置文件定位。

`selftest.mjs` 使用故意违规的 CSS/HTML、允许注释、合法 tokens、额外长度配置、含网址的 JS 字符串、文字实体、定位和 CLI 退出码进行自测。fixtures/bad.css 与 bad.html 是失败样本，不能作为业务目录的通过标准。工具使用轻量词法和正则扫描，并非完整 CSS/JS AST；JS 只查文字中的间隔点，不解析动态生成的样式，复杂模板需人工复核。

## 只查本次改动

`node checks/check-changed.mjs --base origin/main [--config FILE] [路径…]` 在产品仓库根目录运行。它把每个改动文件在基准版本和当前版本各检查一遍，只报当前版本新增的问题（按规则、说明和该行文字计数），所以没迁移的关键页里原有的数值不会让 PR 失败，新写的写死数值、颜色和间隔点会。`*.bundle.js`、`*.min.js` 和 `design-system/` 子模块不查。新增的 ds-allow 会单独列出，供作者核对理由。产品 CI 用的就是这个命令。

## 渲染检查

结果包含 audit.json、audit.md 和截图。文字按项目 SPEC 的 4.5:1 阈值检查；悬停、禁用、加载及 placeholder 的例外单列，项目对悬停的豁免不能解释为普遍满足 WCAG。圆角、字号和字重检查可见元素；超出视口的横向溢出与页面脚本异常列为失败。新增滑杆非文字对比度检查，以 3:1 为阈值，比较滑块与表面、未填充轨道，以及分隔边与已填充轨道，禁用状态单列。

文字背景每个文本矩形采样 15 个位置，计入祖先透明度；图片背景采样不能证明所有像素都达标。滑杆检查按设计系统 color-canvas 作为周围表面，使用其他背景的产品需要另外核对。自动审计不遍历所有交互状态，只有当前可见状态进入检查；其他图形的非文字对比度、屏幕阅读器与实体触屏操作仍需人工验证。

`fixtures/audit-bad.html` 用于验证审计器能发现低文字对比度、7px 圆角、17px 字号、700 字重，并以黑白 21:1 校准。对该页面运行 audit 应退出 1；第 3 轮的实际结果保存在作者本地的 renders/evidence-3/audit-selftest/（renders/ 不进仓库）。

## 关键页检查

在产品仓库根目录执行（设计系统以子模块挂在 `design-system/`）：

`node design-system/checks/keypage.mjs --spec studio/ui-draft/keypage.json --url http://127.0.0.1:8000/studio/ui-draft/ --out work/keypage`

基准文件放在产品仓库，不放在本仓库。

基准文件列出每个视口（桌面 1440、手机 390）下要量的可见间距，按浅色和深色各跑一遍：`from` 和 `to` 是选择器，`选择器|开头文字` 用文字定位，`A >> B` 表示在 A 里面找 B；量的是 `to` 的上边缘减 `from` 的下边缘。与 `expect` 相差超过 `tolerance`（默认 1px）就失败，退出码 1。`--out` 会保存截图和 keypage.json。依赖与 audit 相同（Playwright + Chrome）。基准要改，先经作者同意，再和界面改动放在同一次提交里。

