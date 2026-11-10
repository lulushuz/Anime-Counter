export function getGeneratorHTML(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Anime Counter — Soft Pastel Profile Badge Generator</title>
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  
  <style>
    :root {
      /* Soft Minimal Pastel Pink Palette */
      --bg: #0f0b12;
      --bg-panel: #18111c;
      --bg-card: #221726;
      --bg-input: #110c14;
      --border: rgba(244, 114, 182, 0.14);
      --border-focus: #f472b6;
      --text: #fdf2f8;
      --text-muted: #c99fb5;
      --primary: #f472b6;
      --primary-hover: #ec4899;
      --radius: 14px;
      --radius-sm: 10px;
    }

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      scroll-behavior: smooth;
    }

    html, body {
      max-width: 100vw;
      overflow-x: hidden;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      -webkit-font-smoothing: antialiased;
      background-color: var(--bg);
      color: var(--text);
      min-height: 100vh;
      padding: 90px 16px 64px;
      position: static;
    }

    /* Static Drifting Sakura Petals */
    .sakura-bg {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      overflow: hidden;
    }

    .petal {
      position: absolute;
      color: #f472b6;
    }

    .sakura-corner {
      position: absolute;
      top: -25px;
      right: 0;
      width: 360px;
      max-width: 50vw;
      height: auto;
      opacity: 0.35;
      pointer-events: none;
      z-index: 0;
      user-select: none;
    }

    .container {
      position: relative;
      z-index: 1;
      width: 100%;
      max-width: 1080px;
      margin: 0 auto;
      overflow: hidden;
    }

    /* Floating Header */
    .floating-nav {
      position: fixed;
      top: 14px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 100;
      width: auto;
      max-width: calc(100vw - 24px);
      background: rgba(24, 17, 28, 0.94);
      border: 1px solid rgba(244, 114, 182, 0.2);
      border-radius: 9999px;
      padding: 6px 10px 6px 16px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 14px;
      white-space: nowrap;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
    }

    .nav-brand {
      font-size: 0.9rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      background: linear-gradient(135deg, #ffffff 10%, #f472b6 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-decoration: none;
      white-space: nowrap;
    }

    .nav-links {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .nav-link {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.82rem;
      font-weight: 600;
      padding: 5px 11px;
      border-radius: 9999px;
      transition: all 0.2s ease;
    }

    .nav-link:hover {
      color: var(--text);
      background: rgba(244, 114, 182, 0.14);
    }

    .lang-switcher {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      background: rgba(19, 13, 23, 0.8);
      border: 1px solid var(--border);
      border-radius: 9999px;
      padding: 2px;
    }

    .lang-btn {
      background: transparent;
      border: none;
      color: var(--text-muted);
      font-size: 0.72rem;
      font-weight: 700;
      padding: 4px 8px;
      border-radius: 9999px;
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: inherit;
    }

    .lang-btn:hover {
      color: var(--text);
    }

    .lang-btn.active {
      background: var(--primary);
      color: #270617;
    }

    /* Mobile Responsiveness Improvements */
    @media (max-width: 640px) {
      html, body {
        padding: 76px 12px 48px;
      }
      .panel {
        padding: 16px;
      }
      .sakura-corner {
        width: 220px;
        opacity: 0.25;
        top: -15px;
      }
      header.hero h1 {
        font-size: 1.85rem;
      }
      header.hero p {
        font-size: 0.88rem;
      }
      .theme-picker {
        grid-template-columns: repeat(3, 1fr);
      }
      .showcase-grid {
        grid-template-columns: 1fr;
      }
    }

    .container {
      width: 100%;
      max-width: 1080px;
      margin: 0 auto;
      overflow: hidden;
    }

    header.hero {
      margin-bottom: 32px;
      text-align: center;
    }

    header.hero h1 {
      font-size: 2.3rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      line-height: 1.2;
      background: linear-gradient(180deg, #ffffff 15%, #fbcfe8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 8px;
    }

    header.hero p {
      color: var(--text-muted);
      font-size: 0.98rem;
      max-width: 540px;
      margin: 0 auto;
    }

    #customize, #themes {
      scroll-margin-top: 84px;
    }

    .grid {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 20px;
      margin-bottom: 36px;
      width: 100%;
    }

    @media (max-width: 860px) {
      .grid {
        grid-template-columns: 1fr;
      }
    }

    .panel {
      background: var(--bg-panel);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 24px;
      min-width: 0;
      overflow: hidden;
    }

    .panel-header {
      margin-bottom: 20px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--border);
    }

    .panel-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: #fdf2f8;
    }

    .form-group {
      margin-bottom: 16px;
    }

    .form-group:last-child {
      margin-bottom: 0;
    }

    label {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--text-muted);
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .input-control, select {
      width: 100%;
      background: var(--bg-input);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      padding: 9px 12px;
      color: var(--text);
      font-size: 0.92rem;
      outline: none;
      transition: all 0.2s ease;
    }

    .input-control:focus, select:focus {
      border-color: var(--border-focus);
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    @media (max-width: 480px) {
      .form-row {
        grid-template-columns: 1fr;
      }
    }

    .theme-picker {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
      gap: 6px;
    }

    .theme-chip {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      padding: 8px 6px;
      text-align: center;
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--text-muted);
      cursor: pointer;
      user-select: none;
      transition: all 0.2s ease;
    }

    .theme-chip:hover {
      background: rgba(244, 114, 182, 0.12);
      border-color: rgba(244, 114, 182, 0.4);
      color: var(--text);
    }

    .theme-chip.active {
      background: var(--primary);
      border-color: var(--primary);
      color: #270617;
      font-weight: 700;
    }

    .range-wrap {
      display: flex;
      align-items: center;
      gap: 12px;
      background: var(--bg-input);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      padding: 6px 12px;
    }

    .range-input {
      flex: 1;
      min-width: 0;
      accent-color: var(--primary);
      cursor: pointer;
    }

    .range-badge {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--primary);
      min-width: 36px;
      text-align: right;
    }

    .toggle-group {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      user-select: none;
      padding: 6px 0;
    }

    .toggle-group input[type="checkbox"] {
      width: 17px;
      height: 17px;
      accent-color: var(--primary);
      cursor: pointer;
    }

    .toggle-group span {
      font-size: 0.85rem;
      color: var(--text);
    }

    .conditional-section {
      display: none;
      animation: fadeIn 0.2s ease;
    }

    .conditional-section.show {
      display: block;
    }

    /* Live Preview */
    .preview-canvas {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 120px;
      background: #130d17;
      border: 1px dashed var(--border);
      border-radius: var(--radius);
      padding: 18px;
      margin-bottom: 22px;
      overflow-x: auto;
      max-width: 100%;
    }

    .preview-canvas img {
      max-width: 100%;
      height: auto;
    }

    .code-group {
      margin-bottom: 14px;
    }

    .code-header {
      margin-bottom: 6px;
    }

    .code-label {
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted);
    }

    .code-box {
      display: flex;
      align-items: center;
      background: var(--bg-input);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      overflow: hidden;
      width: 100%;
    }

    .code-content {
      flex: 1;
      min-width: 0;
      padding: 9px 12px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.8rem;
      color: #fbcfe8;
      white-space: nowrap;
      overflow-x: auto;
      scrollbar-width: thin;
    }

    .btn-copy {
      background: var(--bg-card);
      border: none;
      border-left: 1px solid var(--border);
      color: var(--text-muted);
      padding: 9px 14px;
      font-size: 0.78rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      transition: all 0.2s ease;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .btn-copy:hover {
      background: var(--primary);
      color: #270617;
    }

    .btn-copy.copied {
      background: #ec4899;
      color: #ffffff;
    }

    /* Showcase */
    .showcase-section {
      background: var(--bg-panel);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 24px;
      width: 100%;
      overflow: hidden;
    }

    .showcase-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 20px;
    }

    .showcase-header h2 {
      font-size: 1.2rem;
      font-weight: 700;
      color: #fdf2f8;
    }

    .showcase-header span {
      font-size: 0.8rem;
      color: var(--text-muted);
    }

    .showcase-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    @media (max-width: 720px) {
      .showcase-grid {
        grid-template-columns: 1fr;
      }
    }

    .showcase-card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      padding: 18px;
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      transition: all 0.2s ease;
      overflow: hidden;
    }

    .showcase-card:hover {
      border-color: var(--primary);
      background: #2a1d2f;
    }

    .showcase-title {
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--text-muted);
      margin-bottom: 14px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .showcase-img-wrap {
      height: 110px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }

    .showcase-img-wrap img {
      max-height: 100%;
      max-width: 100%;
      object-fit: contain;
    }

    footer {
      text-align: center;
      margin-top: 48px;
      color: var(--text-muted);
      font-size: 0.82rem;
    }

    footer a {
      color: var(--primary);
      text-decoration: none;
    }

    footer a:hover {
      text-decoration: underline;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }
  </style>
</head>
<body>

  <!-- Static Scattered Sakura Petals + Fixed Corner SakuraBG.png -->
  <img class="sakura-corner" src="/assets/sakura-bg.png" alt="" decoding="async" aria-hidden="true">
  <div class="sakura-bg" aria-hidden="true">
    <svg width="0" height="0" style="position:absolute">
      <defs>
        <path id="sp" d="M12 2 C17 6, 22 14, 17 22 C15 25, 13 24, 12 21 C11 24, 9 25, 7 22 C2 14, 7 6, 12 2 Z" fill="currentColor"/>
      </defs>
    </svg>
    <svg class="petal" viewBox="0 0 24 26" style="top:6%; left:7%; width:22px; opacity:0.22; transform:rotate(28deg)"><use href="#sp"/></svg>
    <svg class="petal" viewBox="0 0 24 26" style="top:14%; left:18%; width:15px; opacity:0.15; transform:rotate(-42deg)"><use href="#sp"/></svg>
    <svg class="petal" viewBox="0 0 24 26" style="top:9%; right:11%; width:26px; opacity:0.20; transform:rotate(-25deg)"><use href="#sp"/></svg>
    <svg class="petal" viewBox="0 0 24 26" style="top:22%; right:6%; width:18px; opacity:0.14; transform:rotate(64deg)"><use href="#sp"/></svg>
    <svg class="petal" viewBox="0 0 24 26" style="top:28%; left:4%; width:16px; opacity:0.18; transform:rotate(110deg)"><use href="#sp"/></svg>
    <svg class="petal" viewBox="0 0 24 26" style="top:36%; right:20%; width:14px; opacity:0.12; transform:rotate(-78deg)"><use href="#sp"/></svg>
    <svg class="petal" viewBox="0 0 24 26" style="top:47%; left:9%; width:20px; opacity:0.16; transform:rotate(45deg)"><use href="#sp"/></svg>
    <svg class="petal" viewBox="0 0 24 26" style="top:53%; right:8%; width:24px; opacity:0.19; transform:rotate(-115deg)"><use href="#sp"/></svg>
    <svg class="petal" viewBox="0 0 24 26" style="top:64%; left:15%; width:14px; opacity:0.13; transform:rotate(-15deg)"><use href="#sp"/></svg>
    <svg class="petal" viewBox="0 0 24 26" style="top:72%; right:14%; width:19px; opacity:0.17; transform:rotate(82deg)"><use href="#sp"/></svg>
    <svg class="petal" viewBox="0 0 24 26" style="top:81%; left:6%; width:25px; opacity:0.20; transform:rotate(-52deg)"><use href="#sp"/></svg>
    <svg class="petal" viewBox="0 0 24 26" style="top:86%; left:26%; width:15px; opacity:0.14; transform:rotate(140deg)"><use href="#sp"/></svg>
    <svg class="petal" viewBox="0 0 24 26" style="top:89%; right:9%; width:22px; opacity:0.18; transform:rotate(33deg)"><use href="#sp"/></svg>
    <svg class="petal" viewBox="0 0 24 26" style="top:77%; right:28%; width:14px; opacity:0.11; transform:rotate(-95deg)"><use href="#sp"/></svg>
    <svg class="petal" viewBox="0 0 24 26" style="top:18%; left:46%; width:13px; opacity:0.11; transform:rotate(50deg)"><use href="#sp"/></svg>
    <svg class="petal" viewBox="0 0 24 26" style="top:42%; right:4%; width:16px; opacity:0.15; transform:rotate(165deg)"><use href="#sp"/></svg>
  </div>

  <!-- Floating Header -->
  <nav class="floating-nav">
    <a href="#" class="nav-brand">Anime Counter</a>
    <div class="nav-links">
      <a href="#customize" class="nav-link" data-i18n="navCustomize">Customize</a>
      <a href="#themes" class="nav-link" data-i18n="navThemes">Themes</a>
    </div>
    <div class="lang-switcher" role="group" aria-label="Language selector">
      <button type="button" class="lang-btn active" data-lang="en">EN</button>
      <button type="button" class="lang-btn" data-lang="tr">TR</button>
      <button type="button" class="lang-btn" data-lang="ja">日本語</button>
      <button type="button" class="lang-btn" data-lang="zh">中文</button>
    </div>
  </nav>

  <div class="container">
    <header class="hero">
      <h1>Anime Counter</h1>
      <p data-i18n="heroSub">A soft, high-performance profile badge counter for GitHub and websites.</p>
    </header>
    
    <div class="grid" id="customize">
      <!-- Left: Configuration -->
      <div class="panel">
        <div class="panel-header">
          <h2 class="panel-title" data-i18n="configTitle">Configuration</h2>
        </div>

        <div class="form-group">
          <label for="username" data-i18n="lblUsername">Username</label>
          <input type="text" id="username" class="input-control" value="luluwux" placeholder="Username">
        </div>

        <div class="form-group">
          <label data-i18n="lblThemeStyle">Theme</label>
          <div class="theme-picker" id="themePicker">
            <div class="theme-chip active" data-theme="flat">Flat</div>
            <div class="theme-chip" data-theme="naruto">Naruto</div>
            <div class="theme-chip" data-theme="onepiece">One Piece</div>
            <div class="theme-chip" data-theme="bleach">Bleach</div>
            <div class="theme-chip" data-theme="dragonball">Dragonball</div>
            <div class="theme-chip" data-theme="aot">AOT</div>
            <div class="theme-chip" data-theme="adventuretime">Adventure</div>
            <div class="theme-chip" data-theme="codegeass">Code Geass</div>
            <div class="theme-chip" data-theme="gumball">Gumball</div>
            <div class="theme-chip" data-theme="l">Death Note</div>
            <div class="theme-chip" data-theme="monster">Monster</div>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="scale" data-i18n="lblScale">Scale</label>
            <div class="range-wrap">
              <input type="range" id="scale" min="0.5" max="2.0" step="0.1" value="1.0" class="range-input">
              <span class="range-badge" id="scaleVal">1.0x</span>
            </div>
          </div>
          <div class="form-group">
            <label for="num" data-i18n="lblPreviewNum">Count</label>
            <input type="number" id="num" class="input-control" placeholder="Automatic" min="0">
          </div>
        </div>

        <div class="form-group">
          <label class="toggle-group" for="pixelated">
            <input type="checkbox" id="pixelated" checked>
            <span data-i18n="lblPixelated">Pixelated</span>
          </label>
        </div>

        <!-- Flat Options -->
        <div id="flatOptions" class="conditional-section show">
          <div class="form-group">
            <label for="icon" data-i18n="lblIcon">Icon</label>
            <input type="text" id="icon" class="input-control" value="🌸" placeholder="Emoji">
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="color" data-i18n="lblTextColor">Text</label>
              <input type="text" id="color" class="input-control" value="fbcfe8" placeholder="Hex">
            </div>
            <div class="form-group">
              <label for="bg" data-i18n="lblBgColor">Background</label>
              <input type="text" id="bg" class="input-control" value="2d1b2c" placeholder="Hex">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="stroke" data-i18n="lblBorderColor">Border</label>
              <input type="text" id="stroke" class="input-control" value="f472b6" placeholder="Hex">
            </div>
            <div class="form-group">
              <label for="animation" data-i18n="lblAnimation">Animation</label>
              <select id="animation">
                <option value="none" data-i18n="animNone">None</option>
                <option value="pulse" selected data-i18n="animPulse">Pulse</option>
                <option value="fade" data-i18n="animFade">Fade</option>
                <option value="slide" data-i18n="animSlide">Slide</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Image Options -->
        <div id="imageOptions" class="conditional-section">
          <div class="form-group">
            <label for="length" data-i18n="lblPadding">Digits</label>
            <div class="range-wrap">
              <input type="range" id="length" min="1" max="16" value="7" class="range-input">
              <span class="range-badge" id="lengthVal">7</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Preview & Code -->
      <div class="panel">
        <div class="panel-header">
          <h2 class="panel-title" data-i18n="previewTitle">Live Preview</h2>
        </div>

        <div class="preview-canvas">
          <img id="previewImg" src="" alt="Badge Preview">
        </div>

        <h3 style="font-size: 0.9rem; font-weight: 700; margin-bottom: 12px; color: var(--text);" data-i18n="embedTitle">Embed Codes</h3>

        <div class="code-group">
          <div class="code-header">
            <span class="code-label" data-i18n="lblMarkdown">Markdown (GitHub Readme)</span>
          </div>
          <div class="code-box">
            <div class="code-content" id="mdCode">...</div>
            <button class="btn-copy" onclick="copyText('mdCode')" data-i18n="btnCopy">Copy</button>
          </div>
        </div>

        <div class="code-group">
          <div class="code-header">
            <span class="code-label" data-i18n="lblHtml">HTML Tag</span>
          </div>
          <div class="code-box">
            <div class="code-content" id="htmlCode">...</div>
            <button class="btn-copy" onclick="copyText('htmlCode')" data-i18n="btnCopy">Copy</button>
          </div>
        </div>

        <div class="code-group">
          <div class="code-header">
            <span class="code-label" data-i18n="lblDirectUrl">Direct Image URL</span>
          </div>
          <div class="code-box">
            <div class="code-content" id="urlCode">...</div>
            <button class="btn-copy" onclick="copyText('urlCode')" data-i18n="btnCopy">Copy</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Gallery -->
    <div class="showcase-section" id="themes">
      <div class="showcase-header">
        <h2 data-i18n="galleryTitle">Anime Themes Gallery</h2>
        <span data-i18n="galleryHint">Click any theme to select</span>
      </div>
      <div class="showcase-grid" id="showcaseGrid"></div>
    </div>

    <footer>
      <p>Made by <a href="https://github.com/lulushuz" target="_blank" rel="noopener">Lulushu</a></p>
    </footer>
  </div>

  <script>
    const I18N = {
      en: {
        navCustomize: 'Customize',
        navThemes: 'Themes',
        heroSub: 'A soft, high-performance profile badge counter for GitHub and websites.',
        configTitle: 'Configuration',
        lblUsername: 'Username',
        lblThemeStyle: 'Theme',
        lblScale: 'Scale',
        lblPreviewNum: 'Count',
        lblPixelated: 'Pixelated',
        lblIcon: 'Icon',
        lblTextColor: 'Text',
        lblBgColor: 'Background',
        lblBorderColor: 'Border',
        lblAnimation: 'Animation',
        animNone: 'None',
        animPulse: 'Pulse',
        animFade: 'Fade',
        animSlide: 'Slide',
        lblPadding: 'Digits',
        previewTitle: 'Live Preview',
        embedTitle: 'Embed Codes',
        lblMarkdown: 'Markdown',
        lblHtml: 'HTML',
        lblDirectUrl: 'URL',
        btnCopy: 'Copy',
        btnCopied: 'Copied!',
        galleryTitle: 'Themes',
        galleryHint: 'Click to select',
        phNum: 'Automatic'
      },
      tr: {
        navCustomize: 'Özelleştir',
        navThemes: 'Temalar',
        heroSub: 'GitHub profilleri ve web siteleri için hızlı ziyaretçi sayacı.',
        configTitle: 'Yapılandırma',
        lblUsername: 'Kullanıcı',
        lblThemeStyle: 'Tema',
        lblScale: 'Ölçek',
        lblPreviewNum: 'Sayı',
        lblPixelated: 'Piksel',
        lblIcon: 'İkon',
        lblTextColor: 'Yazı',
        lblBgColor: 'Arka Plan',
        lblBorderColor: 'Çerçeve',
        lblAnimation: 'Animasyon',
        animNone: 'Yok',
        animPulse: 'Nabız',
        animFade: 'Solma',
        animSlide: 'Kayma',
        lblPadding: 'Basamak',
        previewTitle: 'Önizleme',
        embedTitle: 'Kodlar',
        lblMarkdown: 'Markdown',
        lblHtml: 'HTML',
        lblDirectUrl: 'URL',
        btnCopy: 'Kopyala',
        btnCopied: 'Kopyalandı!',
        galleryTitle: 'Temalar',
        galleryHint: 'Seçmek için tıkla',
        phNum: 'Otomatik'
      },
      ja: {
        navCustomize: '設定',
        navThemes: 'テーマ',
        heroSub: 'GitHubプロフィールやWebサイト向けの訪問者カウンター。',
        configTitle: '設定',
        lblUsername: 'ユーザー名',
        lblThemeStyle: 'テーマ',
        lblScale: '倍率',
        lblPreviewNum: '数値',
        lblPixelated: 'ドット絵',
        lblIcon: 'アイコン',
        lblTextColor: '文字色',
        lblBgColor: '背景色',
        lblBorderColor: '枠線色',
        lblAnimation: '効果',
        animNone: 'なし',
        animPulse: '脈動',
        animFade: 'フェード',
        animSlide: 'スライド',
        lblPadding: '桁数',
        previewTitle: 'プレビュー',
        embedTitle: 'コード',
        lblMarkdown: 'Markdown',
        lblHtml: 'HTML',
        lblDirectUrl: 'URL',
        btnCopy: 'コピー',
        btnCopied: '完了!',
        galleryTitle: 'テーマ一覧',
        galleryHint: 'クリックして選択',
        phNum: '自動'
      },
      zh: {
        navCustomize: '配置',
        navThemes: '主题',
        heroSub: '适用于 GitHub 主页的高性能访客计数器。',
        configTitle: '配置',
        lblUsername: '用户名',
        lblThemeStyle: '主题',
        lblScale: '缩放',
        lblPreviewNum: '数字',
        lblPixelated: '像素化',
        lblIcon: '图标',
        lblTextColor: '文字',
        lblBgColor: '背景',
        lblBorderColor: '边框',
        lblAnimation: '动画',
        animNone: '无',
        animPulse: '脉冲',
        animFade: '渐变',
        animSlide: '滑动',
        lblPadding: '位数',
        previewTitle: '预览',
        embedTitle: '代码',
        lblMarkdown: 'Markdown',
        lblHtml: 'HTML',
        lblDirectUrl: '直链',
        btnCopy: '复制',
        btnCopied: '已复制!',
        galleryTitle: '主题画廊',
        galleryHint: '点击选择',
        phNum: '自动'
      }
    };

    let currentLang = 'en';
    let activeTheme = 'flat';
    let debounceTimer = null;

    function setLanguage(lang) {
      if (!I18N[lang]) return;
      currentLang = lang;
      const dict = I18N[lang];
      document.documentElement.lang = lang;

      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
          el.textContent = dict[key];
        }
      });

      document.getElementById('num').placeholder = dict.phNum;

      document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
      });

      try { localStorage.setItem('ac_lang', lang); } catch {}
    }

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });

    const usernameInput = document.getElementById('username');
    const scaleInput = document.getElementById('scale');
    const scaleVal = document.getElementById('scaleVal');
    const numInput = document.getElementById('num');
    const pixelatedInput = document.getElementById('pixelated');
    const iconInput = document.getElementById('icon');
    const colorInput = document.getElementById('color');
    const bgInput = document.getElementById('bg');
    const strokeInput = document.getElementById('stroke');
    const animationInput = document.getElementById('animation');
    const lengthInput = document.getElementById('length');
    const lengthVal = document.getElementById('lengthVal');
    const previewImg = document.getElementById('previewImg');
    const flatOptions = document.getElementById('flatOptions');
    const imageOptions = document.getElementById('imageOptions');

    document.querySelectorAll('.theme-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.theme-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        setTheme(chip.dataset.theme);
      });
    });

    function setTheme(theme) {
      activeTheme = theme;
      if (activeTheme === 'flat') {
        flatOptions.classList.add('show');
        imageOptions.classList.remove('show');
      } else {
        flatOptions.classList.remove('show');
        imageOptions.classList.add('show');
      }
      updatePreview();
    }

    scaleInput.addEventListener('input', (e) => {
      scaleVal.innerText = parseFloat(e.target.value).toFixed(1) + 'x';
      triggerUpdate();
    });

    lengthInput.addEventListener('input', (e) => {
      lengthVal.innerText = e.target.value;
      triggerUpdate();
    });

    [usernameInput, numInput, iconInput, colorInput, bgInput, strokeInput, animationInput, pixelatedInput].forEach(el => {
      el.addEventListener('input', triggerUpdate);
      el.addEventListener('change', triggerUpdate);
    });

    function triggerUpdate() {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(updatePreview, 150);
    }

    function updatePreview() {
      const username = usernameInput.value.replace(/[^a-zA-Z0-9-_]/g, '') || 'luluwux';
      const baseUrl = window.location.origin + '/@' + username;
      const params = new URLSearchParams();

      if (scaleInput.value !== '1.0' && scaleInput.value !== '1') {
        params.append('scale', scaleInput.value);
      }
      if (numInput.value !== '') {
        params.append('num', numInput.value);
      }
      if (!pixelatedInput.checked) {
        params.append('pixelated', '0');
      }

      if (activeTheme === 'flat') {
        params.append('theme', 'flat');
        if (iconInput.value) params.append('icon', iconInput.value);
        if (colorInput.value) params.append('color', colorInput.value.replace('#', ''));
        if (bgInput.value) params.append('bg', bgInput.value.replace('#', ''));
        if (strokeInput.value) params.append('stroke', strokeInput.value.replace('#', ''));
        if (animationInput.value !== 'none') params.append('animation', animationInput.value);
      } else {
        params.append('theme', activeTheme);
        params.append('length', lengthInput.value);
      }

      const previewParams = new URLSearchParams(params);
      previewParams.append('render', 'true');

      const targetUrl = baseUrl + (params.toString() ? '?' + params.toString() : '');
      const previewUrl = baseUrl + '?' + previewParams.toString();

      previewImg.src = previewUrl;
      document.getElementById('mdCode').innerText = '![Visitor Counter](' + targetUrl + ')';
      document.getElementById('htmlCode').innerText = '<img src="' + targetUrl + '" alt="Counter" />';
      document.getElementById('urlCode').innerText = targetUrl;
    }

    function copyText(id) {
      const text = document.getElementById(id).innerText;
      navigator.clipboard.writeText(text).then(() => {
        const btn = document.querySelector('#' + id).nextElementSibling;
        btn.classList.add('copied');
        btn.innerText = I18N[currentLang].btnCopied;
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerText = I18N[currentLang].btnCopy;
        }, 1500);
      });
    }

    function loadGallery() {
      const gallery = document.getElementById('showcaseGrid');
      const themes = [
        { id: 'naruto', name: 'Naruto' },
        { id: 'onepiece', name: 'One Piece' },
        { id: 'bleach', name: 'Bleach' },
        { id: 'dragonball', name: 'Dragonball' },
        { id: 'aot', name: 'AOT' },
        { id: 'adventuretime', name: 'Adventure Time' },
        { id: 'codegeass', name: 'Code Geass' },
        { id: 'gumball', name: 'Gumball' },
        { id: 'l', name: 'Death Note' },
        { id: 'monster', name: 'Monster' }
      ];

      gallery.innerHTML = themes.map(t => {
        const url = window.location.origin + '/gallery/' + t.id + '.svg';
        return '<div class="showcase-card" onclick="selectThemeFromGallery(\\'' + t.id + '\\')">' +
          '<span class="showcase-title">' + t.name + '</span>' +
          '<div class="showcase-img-wrap"><img src="' + url + '" alt="' + t.name + '" loading="lazy" decoding="async"></div>' +
          '</div>';
      }).join('');
    }

    window.selectThemeFromGallery = function(themeId) {
      const chip = document.querySelector('.theme-chip[data-theme="' + themeId + '"]');
      if (chip) {
        chip.click();
        document.getElementById('customize').scrollIntoView({ behavior: 'smooth' });
      }
    };

    try {
      const savedLang = localStorage.getItem('ac_lang');
      if (savedLang && I18N[savedLang]) {
        setLanguage(savedLang);
      }
    } catch {}

    updatePreview();
    window.addEventListener('load', loadGallery);
  </script>
</body>
</html>`;
}
