# HALFVERSE · 一半宇宙

一个纯静态的游戏聚合门户，收录 Sunset Studio 的游戏作品。采用 `web-design-engineer` skill 的 **Y2K / Frutiger Aero Retrofuturism** 配方设计——虹彩玻璃、铬金属字、果冻按钮、镜头光晕，全部由 CSS 绘制，页面零图片依赖。

> **现已上线：** https://muyibuyiya.github.io/ （个人主页仓库 `muyibuyiya/muyibuyiya.github.io`，Pages 状态 `built`，源 `main:/`）。
> 另有一份独立仓库副本 `muyibuyiya/game-portal`（地址为 `https://muyibuyiya.github.io/game-portal/`），其 Pages 因凭据权限所限尚未手动开启。以主页仓库为正式入口。

## 文件结构

```
.
├── index.html   # 页面结构 + 文案
├── styles.css   # Y2K 设计系统（配色/字体/圆角/阴影/动效）
├── script.js    # 时钟、数字滚动、入场动画、光标光晕
└── README.md    # 本说明
```

无需构建、无需依赖，直接用浏览器打开 `index.html` 即可预览。

## 部署到 GitHub Pages（逐条命令）

> 你的 GitHub 用户名是 `muyibuyiya`。下面给两种方案，**二选一**。

### 方案 A：独立仓库（推荐，地址为 `https://muyibuyiya.github.io/仓库名/`）

适合把它作为一个单独的项目站点。

```bash
# 1. 进入项目目录（改成你实际放文件的位置）
cd /path/to/你的目录

# 2. 初始化 git（若该目录还不是 git 仓库）
git init

# 3. 把所有文件加入暂存区
git add index.html styles.css script.js README.md

# 4. 提交
git commit -m "Add HALFVERSE game portal"

# 5. 关联远程仓库（先在 GitHub 网页上新建一个空仓库，例如命名为 game-portal）
git remote add origin https://github.com/muyibuyiya/game-portal.git

# 6. 推送到 main 分支
git branch -M main
git push -u origin main
```

然后在 GitHub 网页上开启 Pages：
1. 打开仓库页面 → **Settings** → 左侧 **Pages**
2. **Build and deployment** → Source 选择 **Deploy from a branch**
3. Branch 选 `main`，目录选 `/ (root)` → **Save**
4. 等待几十秒，访问 `https://muyibuyiya.github.io/game-portal/`

> 如果推送时要求登录：GitHub 已不再支持账号密码推送，需要使用 **Personal Access Token** 代替密码（GitHub → Settings → Developer settings → Personal access tokens → 生成勾选 `repo` 权限的 token），或安装 GitHub CLI 后执行 `gh auth login`。

### 方案 B：个人主页仓库（地址为 `https://muyibuyiya.github.io/`）

如果你已有一个 `muyibuyiya.github.io` 仓库作为个人主页，把这三个文件放进该仓库根目录，然后正常 `git add / commit / push` 即可，站点会自动更新在 `https://muyibuyiya.github.io/`。

```bash
git add index.html styles.css script.js
git commit -m "Update HALFVERSE game portal"
git push
```

## 自定义域名（可选）

如果你拥有域名（例如 `halfverse.cn`），想用它替代默认的 `.github.io` 地址：

1. 在仓库根目录新建一个纯文本文件，文件名就叫 `CNAME`（无扩展名），内容为你的域名，例如：
   ```
   halfverse.cn
   ```
2. 在你的域名解析商处添加一条 **CNAME** 记录，指向 `muyibuyiya.github.io`
3. 在 GitHub 仓库 Settings → Pages 里填入该域名并保存

> 注：你已有的 `cscards.cn`、`halfciv.online` 已用于各游戏本身；门户站可以用一个新域名。绑自定义域名后，GitHub Pages 自动提供 HTTPS 证书。

## 修改内容指引

- **改游戏介绍/链接**：编辑 `index.html` 中对应的 `<article class="game-card">` 或 `<article class="wip-card">` 区块。
- **改配色**：编辑 `styles.css` 顶部的 `:root` 变量（严格遵循 skill 的配方色值，改动前请留意注释）。
- **加新游戏**：复制一个 `<article class="game-card">` 区块，改文案与 `--card-a/--card-b` 渐变色即可；卡片封面是纯 CSS 画的，无需图片。
- **开发中游戏转上线**：把 `wip-card` 区块替换为 `game-card` 区块，并在首页 hero 的统计数字（`data-count`）里相应 +1。

## 设计说明

本页遵循 `web-design-engineer` skill 的关键约束：
- 使用具名配方（y2k-retrofuturism）的明确 palette / typography / spacing / radius / shadow / motion，而非临时发明配色
- 拒绝 AI 俗套：无紫粉默认渐变堆叠、无 emoji 图标、无 Inter 默认字体
- 字体：Audiowide（展示）/ Nunito（正文）/ Share Tech Mono（数字）
- 完整覆盖响应式断点与 `prefers-reduced-motion` 无障碍降级
