# Anime Counter 🌸

<p align="center">
  <img src="https://anime-counter.lulushu.workers.dev/@luluwux?theme=flat&animation=pulse&icon=%F0%9F%8C%B8&render=true" alt="Anime Counter Badge" />
</p>

<p align="center">
  <strong>Ultra-fast, zero-maintenance, and serverless visitor counter badge for GitHub profiles and websites.</strong>
</p>

<p align="center">
  <a href="#english">English</a> •
  <a href="#türkçe">Türkçe</a> •
  <a href="#日本語">日本語</a> •
  <a href="#中文">中文</a>
</p>

---

## 🎨 Theme Gallery

| Theme | Preview | Theme | Preview |
| :--- | :--- | :--- | :--- |
| **Naruto** | <img src="https://anime-counter.lulushu.workers.dev/gallery/naruto.svg" height="40"/> | **One Piece** | <img src="https://anime-counter.lulushu.workers.dev/gallery/onepiece.svg" height="35"/> |
| **Bleach** | <img src="https://anime-counter.lulushu.workers.dev/gallery/bleach.svg" height="35"/> | **Dragonball** | <img src="https://anime-counter.lulushu.workers.dev/gallery/dragonball.svg" height="35"/> |
| **AOT** | <img src="https://anime-counter.lulushu.workers.dev/gallery/aot.svg" height="35"/> | **Adventure Time** | <img src="https://anime-counter.lulushu.workers.dev/gallery/adventuretime.svg" height="33"/> |
| **Code Geass** | <img src="https://anime-counter.lulushu.workers.dev/gallery/codegeass.svg" height="32"/> | **Gumball** | <img src="https://anime-counter.lulushu.workers.dev/gallery/gumball.svg" height="32"/> |
| **Death Note (L)** | <img src="https://anime-counter.lulushu.workers.dev/gallery/l.svg" height="25"/> | **Monster** | <img src="https://anime-counter.lulushu.workers.dev/gallery/monster.svg" height="20"/> |

---

<div id="english"></div>

## 🇬🇧 English

### Overview
**Anime Counter** is a high-performance profile view counter built with **TypeScript**, **Hono**, **Cloudflare Workers**, and **Cloudflare D1**. It generates dynamic flat SVG badges and retro anime sprite counters with sub-millisecond render times and zero operational cost.

### Key Highlights
- **Atomic Counting:** Powered by SQLite-based Cloudflare D1 (`INSERT ... ON CONFLICT DO UPDATE RETURNING`). Never loses count under concurrent traffic.
- **Embedded Sprites:** All character sprites are bundled into the Worker at build time (`0` storage I/O, no R2 or external network latency).
- **Edge Caching:** Static and deterministic preview requests are cached across Cloudflare's 300+ edge locations.
- **XSS-Safe:** Strict parameter sanitization and hex/CSS color validation.

### Quick Start
Add the badge to your GitHub profile `README.md`:

```markdown
<!-- Flat Theme (Default) -->
![Visitor Counter](https://anime-counter.lulushu.workers.dev/@YOUR_USERNAME)

<!-- Anime Sprite Theme -->
![Visitor Counter](https://anime-counter.lulushu.workers.dev/@YOUR_USERNAME?theme=naruto)
```

### URL Parameters
| Parameter | Description | Default | Example |
| :--- | :--- | :--- | :--- |
| `theme` | Badge theme name (`flat` or anime theme) | `flat` | `theme=onepiece` |
| `scale` | Size multiplier (`0.1` to `10`) | `1.0` | `scale=1.2` |
| `length` | Minimum number of digits for image themes | `7` | `length=8` |
| `pixelated` | Pixelated retro rendering (`1` or `0`) | `1` | `pixelated=0` |
| `num` | Static number override (bypasses database) | None | `num=1337` |
| `icon` | Flat badge prefix icon or emoji | None | `icon=🌸` |
| `color` | Flat badge text color (hex without #) | `c9d1d9` | `color=fbcfe8` |
| `bg` | Flat badge background color (hex) | `21262d` | `bg=2d1b2c` |
| `stroke` | Flat badge border color (hex) | `30363d` | `stroke=f472b6` |
| `animation` | Animation style (`pulse`, `fade`, `slide`, `none`) | `none` | `animation=pulse` |

### Self-Hosting (Deploy to Cloudflare)
1. **Clone & install:**
   ```bash
   git clone https://github.com/lulushuz/Anime-Counter.git
   cd Anime-Counter
   npm install
   ```
2. **Create your D1 database:**
   ```bash
   npx wrangler d1 create anime-counter
   ```
   Paste the returned `database_id` into `wrangler.toml` under `[[d1_databases]]`.
3. **Apply database migration:**
   ```bash
   npm run db:migrate:prod
   ```
4. **Deploy:**
   ```bash
   npm run deploy
   ```

---

<div id="türkçe"></div>

## 🇹🇷 Türkçe

### Genel Bakış
**Anime Counter**, **TypeScript**, **Hono**, **Cloudflare Workers** ve **Cloudflare D1** ile geliştirilmiş yüksek performanslı bir profil ziyaretçi sayacıdır. GitHub profilleri ve web siteleri için modern vektörel flat rozetler ve klasik anime piksel sprite sayaçları üretir.

### Öne Çıkan Özellikler
- **Atomik Sayım:** SQLite tabanlı Cloudflare D1 üzerinde `INSERT ... ON CONFLICT DO UPDATE RETURNING` ile eşzamanlı isteklerde sayaç asla atlamaz.
- **Gömülü Sprite Mimarisi:** Tüm tema görselleri build anında Worker paketine gömülür (sıfır I/O, R2/KV gecikmesi yok).
- **Edge Önbellekleme:** Deterministik ve önizleme istekleri Cloudflare uç noktalarında (edge) önbelleğe alınır.
- **Güvenli:** SVG özellik enjeksiyonu ve XSS saldırılarına karşı tam filtreleme.

### Kullanım
GitHub profil `README.md` dosyanıza ekleyin:

```markdown
<!-- Flat Rozet (Varsayılan) -->
![Ziyaretçi Sayacı](https://anime-counter.lulushu.workers.dev/@KULLANICI_ADINIZ)

<!-- Anime Temalı Rozet -->
![Ziyaretçi Sayacı](https://anime-counter.lulushu.workers.dev/@KULLANICI_ADINIZ?theme=naruto)
```

### Kendi Cloudflare Hesabınıza Kurulum
```bash
git clone https://github.com/lulushuz/Anime-Counter.git
cd Anime-Counter
npm install
npx wrangler d1 create anime-counter
# wrangler.toml içerisine database_id ekleyin
npm run db:migrate:prod
npm run deploy
```

---

<div id="日本語"></div>

## 🇯🇵 日本語

### 概要
**Anime Counter** は、**TypeScript**、**Hono**、**Cloudflare Workers**、および **Cloudflare D1** で構築された高性能で安全なサーバーレス訪問者カウンターです。GitHubプロフィールやWebサイト向けに、フラットベクターSVGおよびレトロなアニメスプライトバッジを瞬時に生成します。

### 特徴
- **原子的カウント:** Cloudflare D1 (SQLite) を利用し、同時アクセス時でもカウントが消失しません。
- **バンドル内蔵スプライト:** すべての画像アセットはビルド時にWorkerバンドルに組み込まれるため、ストレージI/Oのレイテンシがゼロです。
- **エッジキャッシュ:** Cloudflareのエッジネットワークを活用した超高速レスポンス。
- **XSS完全対策:** 入力パラメータとカラーコードの厳格な検証。

### 使い方
GitHubプロフィールの `README.md` に追加してください:

```markdown
<!-- フラットテーマ -->
![Visitor Counter](https://anime-counter.lulushu.workers.dev/@ユーザー名)

<!-- アニメスプライトテーマ -->
![Visitor Counter](https://anime-counter.lulushu.workers.dev/@ユーザー名?theme=naruto)
```

### デプロイ方法
```bash
git clone https://github.com/lulushuz/Anime-Counter.git
cd Anime-Counter
npm install
npx wrangler d1 create anime-counter
# wrangler.toml の database_id を更新
npm run db:migrate:prod
npm run deploy
```

---

<div id="中文"></div>

## 🇨🇳 中文

### 概览
**Anime Counter** 是一款基于 **TypeScript**、**Hono**、**Cloudflare Workers** 和 **Cloudflare D1** 构建的高性能无服务器访客计数器。支持动态矢量 Flat 徽章以及复古动漫像素数字主题。

### 核心特性
- **原子计数:** 基于 SQLite 的 Cloudflare D1 驱动，高并发访问下不丢数。
- **打包内嵌精灵图:** 所有动漫图片素材在构建阶段直接打入 Worker 包内，零存储 I/O 延迟。
- **边缘缓存加速:** 充分利用 Cloudflare 全球 300+ 边缘节点缓存加速。
- **XSS 安全防护:** 针对 SVG 参数及颜色值进行了全方位的安全过滤。

### 使用方法
在你的 GitHub 主页 `README.md` 中嵌入如下代码：

```markdown
<!-- Flat 扁平化主题 -->
![访客计数器](https://anime-counter.lulushu.workers.dev/@你的用户名)

<!-- 动漫像素主题 -->
![访客计数器](https://anime-counter.lulushu.workers.dev/@你的用户名?theme=naruto)
```

### 私有化部署
```bash
git clone https://github.com/lulushuz/Anime-Counter.git
cd Anime-Counter
npm install
npx wrangler d1 create anime-counter
# 将生成的 database_id 填入 wrangler.toml
npm run db:migrate:prod
npm run deploy
```

---

## 📜 License
Licensed under the [MIT License](LICENSE). Made with 🌸 by [Lulushu](https://github.com/lulushuz).
