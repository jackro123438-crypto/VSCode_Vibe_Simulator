# VSCode Vibe Simulator

## 中文说明

### 项目简介
VSCode Vibe Simulator 是一个纯前端的“摸鱼神器”，专门用来模拟高强度编码现场。打开页面后，会自动展示类似 VSCode 的界面和行为，包括代码逐行输入、终端输出、AI 助手对话、标签切换、搜索面板、调试变量、鼠标移动轨迹等，让你的屏幕看起来像在认真推进一个复杂项目。

### 核心特性
- 纯前端实现，无需安装运行时依赖。
- 双击 `vibe_coding.html` 即可运行。
- 内置多语言代码场景（Rust、TypeScript、Python、Go、YAML、SQL、Prisma 等）。
- 行为随机循环，适合长时间挂屏展示。
- 适合截图、短视频、直播背景、办公室氛围屏。

### 快速开始
```bash
git clone <your-repo-url>
cd VSCode_Vibe_Simulator
start vibe_coding.html
```
也可以直接双击 `vibe_coding.html`。

### 项目结构
```text
.
├─ vibe_coding.html   # 页面结构与样式
└─ engine.js          # 场景数据与动画逻辑
```

### 使用场景
- 远程会议或直播时的“氛围编程”背景。
- 抖音/B站/Shorts 等内容整活素材。
- 无后端条件下的产品视觉 Demo。
- 团队大屏展示“技术工作流”氛围。

### 自定义说明
你可以在 `engine.js` 里修改：
- `S` 场景数组：替换为你自己的文件、日志、聊天内容。
- 打字速度与停顿节奏。
- 终端输出和 AI 对话风格。
- 场景切换随机策略。

### GitHub Pages 部署
1. 将仓库推送到 GitHub。
2. 进入 `Settings -> Pages`。
3. 选择发布分支（如 `main`）和目录（root）。
4. 打开生成的访问链接。

### 免责声明
本项目仅用于娱乐、视觉演示和界面模拟。请遵守公司或组织规范，合理使用。

---

## English Documentation

### Overview
VSCode Vibe Simulator is a lightweight frontend-only "fake coding" tool designed to simulate a high-intensity development environment. Once opened, it continuously renders a VSCode-like workflow: animated code typing, terminal logs, AI assistant messages, tab switching, search overlays, debug variables, and cursor movement, making your screen look actively productive.

### Key Features
- Frontend-only, no runtime dependency required.
- Run instantly by opening `vibe_coding.html`.
- Built-in multi-language scenarios (Rust, TypeScript, Python, Go, YAML, SQL, Prisma, and more).
- Randomized loop behavior for long-running display.
- Great for screenshots, short-form videos, livestream backgrounds, and office atmosphere screens.

### Quick Start
```bash
git clone <your-repo-url>
cd VSCode_Vibe_Simulator
start vibe_coding.html
```
Or simply double-click `vibe_coding.html`.

### Project Structure
```text
.
├─ vibe_coding.html   # UI structure and styles
└─ engine.js          # scenario data and animation engine
```

### Use Cases
- "Vibe coding" background for meetings and livestreams.
- Social content creation for TikTok, Shorts, and Bilibili.
- Visual product mock demos without backend services.
- Team dashboard screens for engineering atmosphere.

### Customization
Edit `engine.js` to customize:
- `S` scenario array: your own files, logs, and chat content.
- Typing speed and pause rhythm.
- Terminal output style and AI message tone.
- Scenario randomization strategy.

### Deploy to GitHub Pages
1. Push this repository to GitHub.
2. Open `Settings -> Pages`.
3. Select the publishing branch (for example `main`) and root directory.
4. Use the generated public URL.

### Disclaimer
This project is for entertainment, visual demo, and UI simulation purposes only. Use it responsibly and follow your workplace or organization policies.
