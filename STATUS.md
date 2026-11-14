# 当前状态（2026-11-13 更新）

当前规则为 SPEC 1.9，决定记录覆盖 DECISIONS D-01 至 D-135，车机图标规范为 1.2，车机颜色 token 为 1.3，车机字体 token 为 1.0，车机尺寸 token 为 1.0，车机组件为 1.0，代码组件文档仍为 COMPONENTS 1.1。以下 Figma 情况为当日记录，未发布 Figma 组件库；设计系统仓库的发布情况见下文。历史 A–E 任务和导入报告保留为过程记录，执行入口以本文件和 SPEC 为准。

## 当前 Figma

Library-test（J3Rk8ALa8YFNSJZzOPc2FS）为这轮组件与 Examples 的修订文件。55 条反馈、量测、源组件与扫描范围见 LESSONS L-013 至 L-067。Guideline-test 无未关闭评论。

文件：lib test，T6kCgDUKJIt2e2TfDSZzp8。只保留两页，作者手调布局和已经删除的内容按实时画布保留。

| 页面 / 分区 | 节点 | 内容 |
| --- | --- | --- |
| Work | 52:939 | Layout（235:4067）、Settings（235:4068） |
| Components | 233:4690 | 66 个主组件，0 个变体集合 |
| Controls | 307:332 | 11 个关键控件 |
| Navigation | 307:333 | 7 个导航和侧栏组件 |
| Icons | 307:334 | 43 个资产：37 个白色图标、5 个彩色 Dock App、1 个头像 |
| Surfaces | 307:335 | 状态栏、Dock、地图、道路场景、SR 面板，共 5 个 |

Icons 内按用途与容器尺寸分组：Settings / 64px、Climate & seats / 48px、Navigation & actions / 60px、Media / 48px、Vehicle & general / 48px、Status / 42px、Dock apps / 54px、Profile photo / 48px。图形在原容器中居中，保留原始轮廓与大小，不通过放大图形填满容器。

## 车机组件库（2026-11-14）

- 05 Components 页的 Library 分区：button、chip、segmented、switch、slider、icon-button、list-row、list-header、side-nav-item、banner、toast、tile、dialog、level-card、nav-maneuver、nav-eta、map-controls、status-bar、dock、stepper、panel-map、panel-sr、panel-blank、screen。全部 auto layout，绑 Color、Size、Type 变量。规则见 `components/components.md`。
- 旧的导入组件改名为 Reference (imported, 2026-11-14 前)，做比对用。方向 A、B、C 小样在 Direction samples 分区。
- 06 Screens 页的 Composed 分区：用 screen 实例重拼的 Key A，和用组件拼的设置页。
- 03 Size 页：Size Guide 画框。变量集合 Size，33 个变量。
- 待做：关键界面的文字还没套新字体样式；语音卡片、地图底图、SR 场景沿用导入组件；中文版组件文字没有单独做变体。

## Figma 页面（2026-11-14 整理）

| 页面 | 内容 |
|---|---|
| 00 Cover | 封面和页面索引 |
| 01 Color | Color Guide 932:1829 |
| 02 Type | Type Guide 1003:1665 |
| 03 Size | Size Guide 1008:3 |
| 04 Icons（622:11993） | 五个图标画布、部件 777:11162、Icon Guide 895:11141 |
| 05 Components（233:4690） | 02 Components；00 Foundations 只剩字体和尺寸板，尺寸 token 做完后删除 |
| 06 Screens | 01 Key Screens 和 5 张 Key A 副本 |
| 07 Map & Scene | 03 Map Base、SR Scene Families |
| Work（52:939） | 作者的 Layout、Settings 和 1920 参考屏 |
| Content（504:1698） | LinkedIn 和知识库配图，以及它们引用的旧图标分区 05 Icons、Icons（Work 也引用 Icons），勿删 |

删除：Work 页和 Components 页重复的 00 Foundations、01 Key Screens、02 Components、03 Map Base 旧副本；图标过程稿页的旧版本、被否决的批次、已合并的旧规范和备份，共 28 项；图标页的两张截图和空画框。删除前检查过，没有实例引用这些内容。纯文字镜像 Icon Rules 画框在整理前已经不在文件里，规范文字以 icons/icon-guideline.md 为准。

## 车机线性图标库（2026-11-13）

lib test 的 04 Icons 页（622:11993）：300 个独立图标组件，分在通用 769:11149、驾驶导航 769:11154、信息娱乐 769:11158、车辆设置 769:11160、空调 769:11163 五个画布；部件母版 777:11162。规范图示 Icon Guide 895:11141，均可用 Guide i18n 变量集合在中文和英文之间切换。

按规范 v1.2 全库检查：结构、嵌套、颜色、居中、墨迹上限、线宽、圆头、零长度段、接缝、差一点、未合并接缝全部为 0；体感比 63 个仅为提醒，待人工比对。修复前的备份画框已在 2026-11-14 整理页面时删除，需要时从 Figma 版本历史找回。待作者目视确认：EXC-08 的 6 个图标，绿点标记的 usb、seat_massage、find_car，以及 mic_off 斜线附近的切口。

## 车机颜色变量（2026-11-13）

变量集合：Primitives（151 个原色，一个模式）和 Color（101 个语义 token，另有 3 个阴影效果样式，Light / Dark，全部引用原色，按你在画什么分组；由 HMI / v0.1 改名，变量 ID 不变）。另有 Settings reference（参考稿校准色）、Guide i18n 和 Doc / Language（文档文字）。DS / * 与 Cockpit / * 旧集合已删除。规则见 `color/color-tokens.md`，图示版为 selected icon 页的 Color Guide（932:1829），色块绑真实变量，日夜和中英文跟着变量模式切换；Icon Guide（895:11141）已按同样的节奏重排。字体：变量集合 Type（26 个变量）和 17 个文字样式 en/…、zh/…，规则见 `type/type-tokens.md`，图示版为 Type Guide（1003:1665），关键界面的文字图层还没有套新样式。

未处理：Components 和 Work 两页约 1 万处绑定指向外部库的变量，约 1.4 万处写死的颜色，留到组件改绑阶段。

## 核对结果与边界

当前实时文件共 590 个后代节点、83 个可编辑文字节点，全部英文 Inter；56 个实例的主组件引用均有效。66 个保留主组件的默认可见状态已逐项检查字体、对齐、图形中心、边界、阴影与裁切；图标填充、描边无残留非白色和半透明。原始彩色 App 图标、头像与道路图片不作单色化。检查记录与截图保存在本地，不增加 Figma 校对页。

设置屏 206:4788 保持 1600×1000；SR 206:4804 为 580×828，右侧空白应用区 206:4865 为 940×828。SR 600 / 应用区 920 仍为试行，正式设置侧栏目标 264 未改变。当前校准侧栏 223:5109 为 358×752、单行 218:5062 为 358×80、字号 32，最长英文完整显示；尚未将其整体放入右侧应用区，不以空白设置内容视为场景验收。自建深灰 TBT 和已拒绝的侧栏方案不恢复。

## 仓库发布与检查

D-106 确认方案 A2，取代 D-105。选中行与菜单项使用 `color-selected-row`，浅色 #E6E6E6，深色 #333336。浅色面上的选中行加 1px `color-line-selected`，浮层菜单无边。轨道滑块沿用现有材质。v1.5.0 经 CI 和作者批准后发布，DriveScene 另提升级 PR。

设计系统已独立公开发布，当前版本以 GitHub Release 和使用方子模块为准；仓库发布不代表 Figma 组件库或视觉验收完成。D-103 的仓库整理已随作者授权的 PR #1 合入：关键页基准只放产品仓库，历史证据与 Sketch 阅读包留在作者本地；基准数值和视觉规则未改。

2026-11-05 的 Linux main 检查 41949709487 完成：展示页 4 组共 124 条、示例 8 组共 200 条审计记录，仍只出报告；坏样本实际报告 8 条问题，检查器自测 8/8。旧 Mac 记录为 322 条，渲染配置不同，不直接比较。历史 npm 403 发生在 Claude 云端环境，本机下载正常；无法下载依赖时如实说明环境与未验证项，不能假装检查通过。

## 当前配图参考包

作者授权将这批喜欢的配图同步到 GitHub，并明确将它们视为可以组合和扩展的基础积木，后续按内容灵活制作。入口为 `illustrations/README.md`，目录为 `illustrations/CATALOG.md`：16 张当前浅色 PNG、14 份历史 AI Voice / Space HTML、基础与 v5 CSS，以及构建、导出和完整性检查脚本。场景验证按钮组按 2026-11-05 明确反馈整体居中；整图去掉左上角整体标题，保留必要对象标签。

配图参考层标记为 1.0。配图同步当时的产品 SPEC 1.4、COMPONENTS 1.1 与 tokens 未因配图同步而改变。本次同步不升级使用方子模块或发布网站。部分现有 PNG 为 1280×722，ADAS 暂无可编辑场景源文件，历史 HTML 与部分当前 PNG 不保证像素一致；具体边界见 `catalog.json` 与配图指南。

## 本地交付

目录：/Users/peixin/Documents/Codex/2026-11-04/ban/outputs/。清理前完整副本为 lib-test-精简前完整备份-2026-11-05.fig；当前副本为 lib-test-精简版-2026-11-05.fig；校对记录为 Figma-精简版-逐组件核对.json，说明为 Figma-精简版-整理报告.md。三个原始 Sketch 文件和此前导入备份继续留在本地，日常 Figma 文件删除整套导入页和重复状态。

以上本地路径中的备份、原始素材和完整历史配图资料保留在作者本机；当前可独立读取的配图参考包已收录到 `illustrations/`。未收录的历史资料需要时向作者索取，无法访问时不得声称已读取。
