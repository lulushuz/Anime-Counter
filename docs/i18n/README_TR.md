# Anime Counter 🌸 (Türkçe Dokümantasyon)

<p align="center">
  <img src="../../assets/gallery/l.svg" height="28" alt="Anime Counter Death Note Teması" />
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

### Death Note (L)
<img src="../../assets/gallery/l.svg" height="20" alt="Death Note Teması" />

### Naruto
<img src="../../assets/gallery/naruto.svg" height="20" alt="Naruto Teması" />

### One Piece
<img src="../../assets/gallery/onepiece.svg" height="18" alt="One Piece Teması" />

### Bleach
<img src="../../assets/gallery/bleach.svg" height="18" alt="Bleach Teması" />

### Dragonball
<img src="../../assets/gallery/dragonball.svg" height="18" alt="Dragonball Teması" />

### Attack on Titan (AOT)
<img src="../../assets/gallery/aot.svg" height="18" alt="AOT Teması" />

### Adventure Time
<img src="../../assets/gallery/adventuretime.svg" height="16" alt="Adventure Time Teması" />

### Code Geass
<img src="../../assets/gallery/codegeass.svg" height="16" alt="Code Geass Teması" />

### Gumball
<img src="../../assets/gallery/gumball.svg" height="16" alt="Gumball Teması" />

### Monster
<img src="../../assets/gallery/monster.svg" height="12" alt="Monster Teması" />

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
