# Anime Counter 🌸 (日本語ドキュメント)

<p align="center">
  <img src="../../assets/gallery/l.svg" height="28" alt="Anime Counter Death Note テーマ" />
</p>

<p align="center">
  <strong>GitHubプロフィールやウェブサイト向けの超高速・メンテナンスフリーなサーバーレス訪問者カウンターバッジ。</strong>
</p>

<p align="center">
  <a href="../../README.md">English</a> •
  <a href="./README_TR.md">Türkçe</a> •
  <a href="./README_ZH.md">中文</a>
</p>

---

<details>
<summary><strong>🎨 すべてのテーマを表示（0-9ギャラリープレビュー）</strong></summary>
<br>

### Death Note (L)
<img src="../../assets/gallery/l.svg" height="20" alt="Death Note テーマ" />

### Naruto
<img src="../../assets/gallery/naruto.svg" height="20" alt="Naruto テーマ" />

### One Piece
<img src="../../assets/gallery/onepiece.svg" height="18" alt="One Piece テーマ" />

### Bleach
<img src="../../assets/gallery/bleach.svg" height="18" alt="Bleach テーマ" />

### Dragonball
<img src="../../assets/gallery/dragonball.svg" height="18" alt="Dragonball テーマ" />

### Attack on Titan (AOT)
<img src="../../assets/gallery/aot.svg" height="18" alt="AOT テーマ" />

### Adventure Time
<img src="../../assets/gallery/adventuretime.svg" height="16" alt="Adventure Time テーマ" />

### Code Geass
<img src="../../assets/gallery/codegeass.svg" height="16" alt="Code Geass テーマ" />

### Gumball
<img src="../../assets/gallery/gumball.svg" height="16" alt="Gumball テーマ" />

### Monster
<img src="../../assets/gallery/monster.svg" height="12" alt="Monster テーマ" />

</details>

---

## 概要
**Anime Counter** は、**TypeScript**、**Hono**、および **Cloudflare Workers** で構築された高性能プロフィールアクセスカウンターです。モダンなフラットSVGバッジやアニメドット絵スプライトカウンターをサブミリ秒で生成し、サーバー運用コストゼロで稼働します。

## 主な特徴
- **安全で原子的（Atomic）なカウント:** Cloudflare D1 および従来の Cloudflare KV の両方に完全互換。高トラフィック時でもカウントデータの欠損やリセットを防ぎます。
- **スプライト埋め込み:** すべてのキャラクタースプライトはビルド時に Worker に直接バンドルされます（外部 I/O や追加ネットワーク遅延ゼロ）。
- **エッジキャッシュ:** 静的プレビューや確定的なリクエストは、世界300以上の Cloudflare エッジロケーションで高速キャッシュされます。
- **XSS保護:** パラメータの厳格なサニタイズとカラーコードの検証。

## クイックスタート
GitHub プロフィールの `README.md` に追加してください:

```markdown
<!-- Flat テーマ (デフォルト) -->
![Visitor Counter](https://anime-counter.lulushu.workers.dev/@YOUR_USERNAME)

<!-- Death Note (L) スプライトテーマ -->
![Visitor Counter](https://anime-counter.lulushu.workers.dev/@YOUR_USERNAME?theme=l)

<!-- Naruto スプライトテーマ -->
![Visitor Counter](https://anime-counter.lulushu.workers.dev/@YOUR_USERNAME?theme=naruto)
```

## パラメータ一覧
| パラメータ | 説明 | デフォルト | 例 |
| :--- | :--- | :--- | :--- |
| `theme` | カウンターテーマ (`flat`, `l`, `naruto`, `onepiece`, `bleach`, `dragonball`, `aot`, `adventuretime`, `codegeass`, `gumball`, `monster`) | `flat` | `theme=l` |
| `length` | 最小桁数 | `7` | `length=8` |
| `scale` | 表示倍率 (0.5x - 3.0x) | `1` | `scale=1.5` |
| `pixelated` | レトロドット絵のくっきり表示 | `true` | `pixelated=true` |
| `render` | カウントを増やさず画像のみ描画 | `false` | `render=true` |
| `icon` | プレフィックスアイコン/絵文字 (`flat` テーマのみ) | なし | `icon=🌸` |
| `color` | テキスト色 (HEX) | `fbcfe8` | `color=ffffff` |
| `bg` | 背景色 (HEX) | `2d1b2c` | `bg=181824` |
| `border` | 枠線色 (HEX) | `f472b6` | `border=ff79c6` |
| `animation` | バッジアニメーション (`none`, `pulse`, `bounce`, `glow`) | `none` | `animation=pulse` |

## ローカル開発環境

```bash
# 依存関係のインストール
npm install

# テーマのビルド
npm run build:themes

# 開発サーバーの起動
npm run dev

# テスト実行
npm test
```

## デプロイ

```bash
npm run deploy
```

---
Made with 🌸 by [Lulushu](https://github.com/lulushuz)
