# HALFVERSE · 一半宇宙 — 项目交接文档

> 本文档用于项目交接：说明项目是什么、代码在哪、内容怎么改、如何部署上线，以及有哪些坑。
> 最后更新：2026-11-24　｜　维护方：Sunset Studio

---

## 1. 项目概述

HALFVERSE（一半宇宙）是 Sunset Studio 的**游戏聚合门户**，一个纯静态网站，作用是：

- 把工作室的游戏集中在一个页面，玩家可点击跳转游玩
- 为每款游戏提供独立详情页：真实截图、详细介绍、玩法亮点、版本记录
- 展示两款开发中的作品

它**没有后端、没有数据库、没有构建步骤**，全部是静态文件，托管在 GitHub Pages。

### 收录的游戏

| ID | 名称 | 类型 | 状态 | 版本 |
|---|---|---|---|---|
| `cscards` | 开GO包 | CS 电竞卡牌开包组队 | 已上线 | v1.1.68 |
| `halfciv` | 半壁江山 | 回合制文明策略 | 已上线 | v1.0.0 |
| `halfstar` | 半影群星 | 星际大战略 4X | 已上线 | v3.9.1 |
| `halfcity` | halfcity | 城市模拟 | 开发中 | — |
| `halfhoi` | halfhoi | 类钢铁雄心战略模拟 | 开发中 | — |

> 四款「半」字系列 + 一款电竞卡牌，统一在「一半宇宙」品牌下。

---

## 2. 线上地址与代码仓库

**正式线上地址：** https://muyibuyiya.github.io/

**GitHub 仓库（两处，需保持同步）：**

| 用途 | 仓库 | 线上地址 | 是否启用 Pages |
|---|---|---|---|
| 正式入口 | `muyibuyiya/muyibuyiya.github.io` | https://muyibuyiya.github.io/ | ✅ 已启用 |
| 副本 | `muyibuyiya/game-portal` | https://muyibuyiya.github.io/game-portal/ | ❌ 未启用 |

本地 git remote 配置：
```
origin → https://github.com/muyibuyiya/game-portal.git
pages  → https://github.com/muyibuyiya/muyibuyiya.github.io.git
```

> **注意**：正式站点是 `muyibuyiya.github.io` 仓库。每次改动要同时推这两个 remote，保持两边一致。副本仓库的 Pages 尚未开启（本机 token 权限不足，需网页手动开启），目前仅作备份，不用作访问入口。

---

## 3. 文件结构与职责

```
.
├── index.html        主页：Hero / 游戏矩阵 / 开发中 / 关于 / 页脚
├── game.html         详情页通用模板（所有游戏共用这一种结构）
├── games-data.js     ★ 核心数据文件：5 款游戏的全部介绍/截图/版本/链接
├── styles.css        主页样式 + Y2K 设计 token（:root 变量）
├── detail.css        详情页样式
├── script.js         主页交互：时钟、数字滚动、卡片跳转、光标光晕
├── detail.js         详情页渲染器：读 URL 参数 → 注入数据 → 灯箱/时间线
├── shots/            6 张真实游戏截图（每款已上线游戏 2 张）
├── README.md         项目说明（面向使用者）
├── HANDOVER.md       本文档（面向接手者）
└── .gitignore        排除 .workbuddy/ 等非交付内容
```

**关键设计**：所有游戏内容集中在 `games-data.js`，详情页是通用模板。改任何游戏的信息，只需要改这一个数据文件，不需要碰 HTML。

---

## 4. 日常维护指南（最常见操作）

### 4.1 修改某款游戏的介绍 / 版本 / 链接

编辑 `games-data.js`，找到对应 ID 的对象，改相应字段：

```js
cscards: {
  id: 'cscards',              // URL 里的 ID，不要随意改
  no: '01',                   // 序号
  name: '开GO包',             // 中文名
  en: 'CS CARDS',             // 英文名
  tagline: '...',             // 一句话标语
  type: '...',                // 类型
  platform: '...',            // 平台
  developer: 'Sunset Studio',
  version: 'v1.1.68',         // 版本号
  versionDate: '2026-10-22',
  url: 'https://cscards.cn',  // 游玩地址（真实 URL，勿改错）
  altUrl: 'https://cscards.xyz',
  tags: [...],                // 标签
  intro: ['段落1', '段落2'],  // 详细介绍，数组每项一段
  features: [{ t: '标题', d: '描述' }],  // 玩法亮点
  screenshots: [{ src: 'shots/xxx.png', cap: '说明', span: 'wide' }],  // 截图
  changelog: [{ v, date, current, tag, items: [...] }],  // 版本记录
  note: '...'                 // 补充说明
}
```

保存后推送即可（见第 6 节），线上自动更新。

### 4.2 新增一款游戏

1. 在 `games-data.js` 里新增一个 ID 对象，字段参照上面
2. 在 `index.html` 的游戏矩阵里复制一个 `<article class="game-card">` 区块，改文案与 `data-detail="新ID"`，并把里面「详情」链接改成 `game.html?g=新ID`
3. 如果要加截图，放进 `shots/` 目录，并在数据的 `screenshots` 里引用
4. 更新主页 Hero 的统计数字（`index.html` 里 `data-count="3"`）

> 开发中游戏用 `<article class="wip-card">` 区块，详情页会自动显示「暂无实机截图」。

### 4.3 修改品牌名 / 全局文案

- **「Sunset Studio」「一半宇宙」**：出现在 `index.html`、`game.html`、`games-data.js`、`README.md`，需要全局搜索替换
- **⚠️ 不要替换真实 URL**：`muyibuyiya.github.io/Halfstar`、`github.com/muyibuyiya` 等是真实地址，改了链接会失效。品牌名（显示文字）和 URL（功能地址）要区分对待
- **配色**：改 `styles.css` 顶部的 `:root` 变量。设计采用固定配方，不要随意加新色值，否则会破坏视觉一致性

### 4.4 更换截图

1. 用浏览器打开游戏官网，或用 Playwright 截屏（见 5.3）
2. 图片放到 `shots/`，命名如 `g-cscards-1.png`
3. 在 `games-data.js` 的 `screenshots` 里改 `src` 和 `cap`
4. 截图建议 16:10 或 16:9，宽度 1440px 左右

---

## 5. 设计与技术说明

### 5.1 视觉风格

采用 `web-design-engineer` skill 的 **Y2K / Frutiger Aero Retrofuturism** 配方，具体 token 写在 `styles.css` 的 `:root`：

- 配色：冰蓝 `#A3D5FF` / 铬银 `#E0E4EA` / 青→品红玻璃 `#5FC9F8`→`#FF66C4` / 酸绿 `#A8FF00`
- 字体：Audiowide（展示）/ Nunito（正文）/ Share Tech Mono（数字）
- 圆角：gummy 16/24/32/9999；彩色厚阴影 + 内高光；弹簧动效
- 装饰性视觉全部 CSS 绘制，**不依赖图片**；只有游戏截图是真实图片

**改动配色时请克制**：这个配方刻意限制了色板，随意加色会退化成普通 AI 页面。

### 5.2 页面机制

- **详情页路由**：`game.html?g=<游戏ID>`。`detail.js` 读取 URL 参数，从 `games-data.js` 取数据渲染。未知参数回退到 `cscards`
- **整卡点击**：主页卡片用 `data-detail` 属性 + `script.js` 实现整卡可点；卡片内的「进入游玩」链接不受影响（点到链接时交给链接自己处理）
- **灯箱**：详情页截图可点开放大，支持左右方向键和 Esc
- **入场动画**：默认内容可见，JS 加载后才加 `anim-ready` 类启用动画，并有 3 秒兜底强制显示。**不要改这个机制**——早期版本曾因 observer 不触发导致正文空白
- **光标**：非交互区统一箭头，链接/按钮手型（避免整页出现 I 形输入光标）
- **响应式**：覆盖手机/平板/桌面断点；支持 `prefers-reduced-motion` 无障碍降级

### 5.3 截图是怎么来的（可复现）

用本机 Chrome + Playwright 对真实游戏官网实拍。本机环境：
- Chrome：`C:/Program Files/Google/Chrome/Application/chrome.exe`
- Playwright 模块：`C:/Users/muyib/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright-core`
- 用法：ESM 脚本里 `import { chromium } from 'file:///.../playwright-core/index.mjs'`，`chromium.launch({ executablePath: CHROME, headless: true })`

截到的关键画面：开GO包主界面（需先填战队名+12位通行码进入）、半壁江山对局地图（需关弹窗）、半影群星主界面。临时截图脚本用完已删除，仓库只保留 6 张成品图。

---

## 6. 部署与发布流程

### 6.1 本机发布（推荐流程）

```bash
cd "C:/Users/muyib/WorkBuddy/2026-11-23-00-58-27"

# 查看改动
git status --short

# 提交
git add -A
git commit -m "说明本次改动"

# 推送到正式站点 + 副本
git push pages main
git push origin main
```

推送后等 30–90 秒（Pages CDN 延迟），用带时间戳的 URL 验证：

```bash
curl -s -o /dev/null -w "%{http_code}\n" "https://muyibuyiya.github.io/?t=$(date +%s)"
curl -s -o /dev/null -w "%{http_code}\n" "https://muyibuyiya.github.io/game.html?g=cscards&t=$(date +%s)"
```

返回 200 才算发布成功。**push 成功 ≠ 线上更新**，一定要 HTTP 验证。

### 6.2 本机 GitHub 环境（重要）

- 账号：`muyibuyiya`，凭据存于 Windows Git Credential Manager（`credential.helper=manager`）
- **没有安装 `gh` CLI**，不要依赖它
- 网络自检可用 `git ls-remote`；API 调用用 `curl` + `git credential fill` 取 token（**不要在日志里打印 token**）
- **本机 token 是 fine-grained，权限限制**：可以建仓库、push 代码，但**无法用 API 开启 Pages**（返回 403）
- 因此 `muyibuyiya.github.io` 这类仓库首次 push 会自动开启 Pages，这是绕过权限限制的路径
- 本机的完整发布手册在：`C:/Users/muyib/WorkBuddy/mobile manufacturer/GITHUB-PAGES-GUIDE.md`，遇到部署卡死、凭据问题、卡住的 deployment 等，以该手册为准

### 6.3 本地预览

无需构建，直接 `python -m http.server 8777 --bind 127.0.0.1`，然后访问 `http://127.0.0.1:8777/`。

---

## 7. 数据来源与可信度

- **游戏介绍**：来自各游戏官网实查（cscards.cn、halfciv.online、muyibuyiya.github.io/Halfstar）
- **版本信息**：来自游戏内更新日志（开GO包「更新日志」、半壁江山「设置→日志」、半影群星游戏内版本号显示）
- **截图**：Playwright 对真实游戏实拍
- **开发中游戏**：仅公开已知的类型和简介，无截图无版本，页面已如实标注

> 原则：不编造内容。缺素材时用诚实占位并标注，而不是伪造。

---

## 8. 已知限制与注意事项

1. **副本仓库 `game-portal` 的 Pages 未开启**，访问其地址是 404，属正常。要启用的话需网页手动：Settings → Pages → Source `main` / `/ (root)`
2. **品牌名与 URL 是不同的东西**，替换品牌名时勿动真实链接（见 4.3）
3. **两处仓库要同步推送**，否则正式站与副本内容不一致
4. **token 权限有限**，无法用 API 改 Pages 设置；换机器时先确认凭据情形
5. **详情页依赖 JS 渲染内容**，如果禁用 JavaScript 会看不到游戏信息（页面有加载提示）
6. **截图是 2026-11 时点的画面**，游戏更新后界面可能变化，届时可重截（见 5.3）

---

## 9. 交接检查清单

接手后建议确认：

- [ ] 能访问 https://muyibuyiya.github.io/ ，首页和详情页都正常
- [ ] 本机 git 能 push 到 `pages` 和 `origin` 两个 remote
- [ ] 知道改游戏内容只需改 `games-data.js`
- [ ] 知道「品牌名 ≠ URL」，不会误改链接
- [ ] 知道 push 后要 HTTP 验证才算上线
- [ ] 了解本机 token 权限限制，遇到 Pages 问题查 `GITHUB-PAGES-GUIDE.md`
