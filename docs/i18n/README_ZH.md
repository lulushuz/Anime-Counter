# Anime Counter 🌸 (中文文档)

<p align="center">
  <img src="https://anime-counter.lulushu.workers.dev/@demo-l?theme=l&num=0123456789&length=10&render=true" alt="Anime Counter Death Note 主题" />
</p>

<p align="center">
  <strong>专为 GitHub 个人主页与网站打造的超高速、免维护、无服务器访客计数器徽章。</strong>
</p>

<p align="center">
  <a href="../../README.md">English</a> •
  <a href="./README_TR.md">Türkçe</a> •
  <a href="./README_JA.md">日本語</a>
</p>

---

<details>
<summary><strong>🎨 点击查看所有主题（0-9 图库预览）</strong></summary>
<br>

| 主题 | 预览 | 主题 | 预览 |
| :--- | :--- | :--- | :--- |
| **Death Note (L)** | <img src="https://anime-counter.lulushu.workers.dev/gallery/l.svg" height="28"/> | **Naruto** | <img src="https://anime-counter.lulushu.workers.dev/gallery/naruto.svg" height="40"/> |
| **One Piece** | <img src="https://anime-counter.lulushu.workers.dev/gallery/onepiece.svg" height="35"/> | **Bleach** | <img src="https://anime-counter.lulushu.workers.dev/gallery/bleach.svg" height="35"/> |
| **Dragonball** | <img src="https://anime-counter.lulushu.workers.dev/gallery/dragonball.svg" height="35"/> | **AOT** | <img src="https://anime-counter.lulushu.workers.dev/gallery/aot.svg" height="35"/> |
| **Adventure Time** | <img src="https://anime-counter.lulushu.workers.dev/gallery/adventuretime.svg" height="33"/> | **Code Geass** | <img src="https://anime-counter.lulushu.workers.dev/gallery/codegeass.svg" height="32"/> |
| **Gumball** | <img src="https://anime-counter.lulushu.workers.dev/gallery/gumball.svg" height="32"/> | **Monster** | <img src="https://anime-counter.lulushu.workers.dev/gallery/monster.svg" height="20"/> |

</details>

---

## 概述
**Anime Counter** 是一个基于 **TypeScript**、**Hono** 与 **Cloudflare Workers** 构建的高性能主页访客计数服务。它能在亚毫秒级时间内生成精美的扁平化 SVG 徽章与复古像素动漫精灵图计数器，零维护且完全免费运行。

## 核心特性
- **原子性与高可靠计数:** 支持 Cloudflare D1 以及对既有 Cloudflare KV 数据的无缝向后兼容。高并发访问下计数永不归零或丢失。
- **内嵌精灵图资源:** 所有动漫角色精灵图在构建时直接打包进 Worker（0 外部存储 I/O，无额外网络延迟）。
- **边缘智能缓存:** 静态与确定性预览请求在 Cloudflare 全球 300+ 边缘节点极速缓存。
- **安全防范:** 具备严格的 URL 参数净化与 XSS / 十六进制色彩校验。

## 快速上手
将计数器徽章添加到你的 GitHub 主页 `README.md` 中：

```markdown
<!-- Flat 扁平主题 (默认) -->
![Visitor Counter](https://anime-counter.lulushu.workers.dev/@你的用户名)

<!-- Death Note (L) 像素主题 -->
![Visitor Counter](https://anime-counter.lulushu.workers.dev/@你的用户名?theme=l)

<!-- 火影忍者 (Naruto) 像素主题 -->
![Visitor Counter](https://anime-counter.lulushu.workers.dev/@你的用户名?theme=naruto)
```

## 参数说明
| 参数 | 说明 | 默认值 | 示例 |
| :--- | :--- | :--- | :--- |
| `theme` | 计数器主题 (`flat`, `l`, `naruto`, `onepiece`, `bleach`, `dragonball`, `aot`, `adventuretime`, `codegeass`, `gumball`, `monster`) | `flat` | `theme=l` |
| `length` | 最小显示位数 | `7` | `length=8` |
| `scale` | 缩放比例 (0.5x - 3.0x) | `1` | `scale=1.5` |
| `pixelated` | 像素化清晰模式 | `true` | `pixelated=true` |
| `render` | 仅渲染图像不递增计数 | `false` | `render=true` |
| `icon` | 前缀图标/表情符号（仅适用于 `flat` 主题） | 无 | `icon=🌸` |
| `color` | 文本颜色 (十六进制) | `fbcfe8` | `color=ffffff` |
| `bg` | 背景颜色 (十六进制) | `2d1b2c` | `bg=181824` |
| `border` | 边框颜色 (十六进制) | `f472b6` | `border=ff79c6` |
| `animation` | 徽章微动画 (`none`, `pulse`, `bounce`, `glow`) | `none` | `animation=pulse` |

## 本地开发

```bash
# 安装依赖
npm install

# 构建主题资源
npm run build:themes

# 启动本地开发服务
npm run dev

# 运行单元测试
npm test
```

## 部署到 Cloudflare

```bash
npm run deploy
```

---
Made with 🌸 by [Lulushu](https://github.com/lulushuz)
