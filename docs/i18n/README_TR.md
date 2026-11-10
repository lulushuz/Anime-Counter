# Anime Counter 🌸 (Türkçe Dokümantasyon)

<p align="center">
  <img src="https://anime-counter.lulushu.workers.dev/@demo-l?theme=l&num=0123456789&length=10&render=true" alt="Anime Counter Death Note Teması" />
</p>

<p align="center">
  <strong>GitHub profilleri ve web siteleri için ultra hızlı, bakım gerektirmeyen, sunucusuz ziyaretçi sayacı rozeti.</strong>
</p>

<p align="center">
  <a href="../../README.md">English</a> •
  <a href="./README_JA.md">日本語</a> •
  <a href="./README_ZH.md">中文</a>
</p>

---

<details>
<summary><strong>🎨 Tüm Temaları Görüntüle (0-9 Galeri Önizlemesi)</strong></summary>
<br>

| Tema | Önizleme | Tema | Önizleme |
| :--- | :--- | :--- | :--- |
| **Death Note (L)** | <img src="https://anime-counter.lulushu.workers.dev/gallery/l.svg" height="28"/> | **Naruto** | <img src="https://anime-counter.lulushu.workers.dev/gallery/naruto.svg" height="40"/> |
| **One Piece** | <img src="https://anime-counter.lulushu.workers.dev/gallery/onepiece.svg" height="35"/> | **Bleach** | <img src="https://anime-counter.lulushu.workers.dev/gallery/bleach.svg" height="35"/> |
| **Dragonball** | <img src="https://anime-counter.lulushu.workers.dev/gallery/dragonball.svg" height="35"/> | **AOT** | <img src="https://anime-counter.lulushu.workers.dev/gallery/aot.svg" height="35"/> |
| **Adventure Time** | <img src="https://anime-counter.lulushu.workers.dev/gallery/adventuretime.svg" height="33"/> | **Code Geass** | <img src="https://anime-counter.lulushu.workers.dev/gallery/codegeass.svg" height="32"/> |
| **Gumball** | <img src="https://anime-counter.lulushu.workers.dev/gallery/gumball.svg" height="32"/> | **Monster** | <img src="https://anime-counter.lulushu.workers.dev/gallery/monster.svg" height="20"/> |

</details>

---

## Genel Bakış
**Anime Counter**, **TypeScript**, **Hono** ve **Cloudflare Workers** ile geliştirilmiş yüksek performanslı bir profil sayaç servisidir. Dinamik modern düz (flat) SVG rozetleri ve anime piksel sprite animasyonlu sayaçlarını milisaniyenin altında render eder. Sıfır sunucu maliyeti ile çalışır.

## Öne Çıkan Özellikler
- **Atomik ve Güvenli Sayaç:** Cloudflare D1 ve eski Cloudflare KV altyapısını tam uyumlu destekler. Yoğun trafikte sayaç sıfırlanmaz veya veri kaybolmaz.
- **Dahili (Embedded) Sprite'lar:** Tüm anime karakter sprite görselleri build aşamasında Worker içerisine gömülür (0 harici I/O ve sıfır harici ağ gecikmesi).
- **Edge Cache:** Statik ve önizleme istekleri Cloudflare'in 300'den fazla küresel edge noktasında akıllıca önbelleğe alınır.
- **XSS Korumalı:** Sıkı parametre temizleme ve renk sanitizasyonu.

## Hızlı Başlangıç
Rozeti GitHub profilinizin `README.md` dosyasına ekleyin:

```markdown
<!-- Flat Tema (Varsayılan) -->
![Ziyaretçi Sayacı](https://anime-counter.lulushu.workers.dev/@KULLANICI_ADINIZ)

<!-- Death Note (L) Teması -->
![Ziyaretçi Sayacı](https://anime-counter.lulushu.workers.dev/@KULLANICI_ADINIZ?theme=l)

<!-- Naruto Teması -->
![Ziyaretçi Sayacı](https://anime-counter.lulushu.workers.dev/@KULLANICI_ADINIZ?theme=naruto)
```

## Parametreler
| Parametre | Açıklama | Varsayılan | Örnek |
| :--- | :--- | :--- | :--- |
| `theme` | Sayaç teması (`flat`, `l`, `naruto`, `onepiece`, `bleach`, `dragonball`, `aot`, `adventuretime`, `codegeass`, `gumball`, `monster`) | `flat` | `theme=l` |
| `length` | Minimum basamak sayısı | `7` | `length=8` |
| `scale` | Boyut ölçeği (0.5x - 3.0x) | `1` | `scale=1.5` |
| `pixelated` | Retro pikselli render modu | `true` | `pixelated=true` |
| `render` | Sayacı artırmadan salt görsel render eder | `false` | `render=true` |
| `icon` | Ön ek ikon/emoji (Yalnızca `flat` tema için) | Boş | `icon=🌸` |
| `color` | Yazı rengi (hex kodu) | `fbcfe8` | `color=ffffff` |
| `bg` | Arka plan rengi (hex kodu) | `2d1b2c` | `bg=181824` |
| `border` | Çerçeve rengi (hex kodu) | `f472b6` | `border=ff79c6` |
| `animation` | Rozet animasyonu (`none`, `pulse`, `bounce`, `glow`) | `none` | `animation=pulse` |

## Yerel Geliştirme

```bash
# Bağımlılıkları yükleyin
npm install

# Temaları derleyin
npm run build:themes

# Yerel geliştirici sunucusunu başlatın
npm run dev

# Testleri çalıştırın
npm test
```

## Yayınlama (Deploy)

```bash
npm run deploy
```

---
Made with 🌸 by [Lulushu](https://github.com/lulushuz)
