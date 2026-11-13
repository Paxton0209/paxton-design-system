# 设计系统执行入口

本仓库是 Paxton 跨产品共用的设计系统，用于网页、产品界面和 Figma 设计。任何 AI 或账号接手时，先读 [HANDOFF.md](HANDOFF.md)，再读 [README.md](README.md)、[SPEC.md](SPEC.md)、[COMPONENTS.md](COMPONENTS.md) 与 [STATUS.md](STATUS.md)；这些文件是当前执行依据。

制作配图时另读 [配图指南](illustrations/README.md) 和 [参考目录](illustrations/CATALOG.md)。现有配图提供可组合、可扩展的视觉基础，按内容关系重组；已确认成品只按作者明确反馈修正。

日常产品开发在产品仓库中进行，本仓库只在作者授权维护设计系统时修改。网页变量以 `tokens/tokens.json` 为源，`tokens/tokens.css` 为生成文件；车机专用值和字号见 SPEC 13.1，Figma 变量与样式按 HANDOFF 对应执行。维护、发布与升级遵循 [GOVERNANCE.md](GOVERNANCE.md)，不得自行改已确认的视觉规则、产品关键页或版本。

遇到缺组件、缺文件或规则冲突，向作者或当前指定的监察者说明具体缺口。执行不依赖特定 Claude 账号；作者明确指定监察者时，实施与监察按当前授权分工。交付时区分已实现、已验证和未验证，并附实际检查证据。
