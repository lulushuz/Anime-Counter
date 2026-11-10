import { describe, it, expect } from 'vitest';
import { escapeHtml, validateColor } from '../src/utils/sanitize.js';
import app from '../src/index.js';

describe('Sanitize Utilities', () => {
  it('should escape HTML/XML characters', () => {
    const payload = '<div>hello & "world"\'</div>';
    const escaped = escapeHtml(payload);
    expect(escaped).toBe('&lt;div&gt;hello &amp; &quot;world&quot;&#39;&lt;/div&gt;');
  });

  it('should validate valid hex colors', () => {
    expect(validateColor('fff', '#000')).toBe('#fff');
    expect(validateColor('#ff0000', '#000')).toBe('#ff0000');
    expect(validateColor('12345678', '#000')).toBe('#12345678');
  });

  it('should validate valid CSS color names', () => {
    expect(validateColor('red', '#000')).toBe('red');
    expect(validateColor('blue', '#000')).toBe('blue');
    expect(validateColor('DarkGray', '#000')).toBe('DarkGray');
  });

  it('should reject invalid and malicious color injections', () => {
    const maliciousColor = 'red" onclick="alert(1)';
    const fallback = '#21262d';
    expect(validateColor(maliciousColor, fallback)).toBe(fallback);
    expect(validateColor('rgb(255,0,0)', fallback)).toBe(fallback);
  });
});

describe('Hono Server Routes', () => {
  it('GET / should return HTML generator UI with multilingual support', async () => {
    const res = await app.request('/');
    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toContain('text/html');
    const html = await res.text();
    expect(html).toContain('Anime Counter');
    expect(html).toContain('Username');
    expect(html).toContain('Embed Codes');
    expect(html).toContain('data-lang="ja"');
    expect(html).toContain('data-lang="zh"');
    expect(html).toContain('data-lang="tr"');
  });

  it('GET /themes should list all supported themes', async () => {
    const res = await app.request('/themes');
    expect(res.status).toBe(200);
    const json = await res.json() as any;
    expect(json.type).toBe('success');
    expect(json.flat_support).toBe(true);
    expect(json.image_themes).toContain('naruto');
  });

  it('GET /@username should return a valid flat SVG', async () => {
    const res = await app.request('/@testuser');
    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toBe('image/svg+xml');
    const svg = await res.text();
    expect(svg).toContain('<svg');
    expect(svg).toContain('<rect');
    expect(svg).toContain('1');
  });

  it('should sanitize query parameters against XSS injection', async () => {
    const maliciousPayload = '</text><script>alert(1)</script>';
    const encodedPayload = encodeURIComponent(maliciousPayload);
    const res = await app.request(`/@testxss?icon=${encodedPayload}`);
    expect(res.status).toBe(200);
    
    const svg = await res.text();
    expect(svg).not.toContain('<script>');
    expect(svg).toContain('&lt;/text&gt;&lt;script&gt;alert(1)&lt;/script&gt;');
  });

  it('GET /@username?num=1337 should bypass database and display static count', async () => {
    const res = await app.request('/@testnum?num=1337');
    expect(res.status).toBe(200);
    const svg = await res.text();
    expect(svg).toContain('1.3K'); // 1337 formatted in compact mode (1.3K)
  });

  it('GET /@username?scale=2 should double SVG dimensions', async () => {
    const resNormal = await app.request('/@testscale?scale=1');
    const svgNormal = await resNormal.text();
    
    const resScaled = await app.request('/@testscale?scale=2');
    const svgScaled = await resScaled.text();
    
    expect(svgScaled).toContain('width="160"');
    expect(svgScaled).toContain('height="56"');
  });

  it('render=true should not increment the counter', async () => {
    await app.request('/@testrender'); // 1
    await app.request('/@testrender'); // 2
    const res = await app.request('/@testrender?render=true');
    const svg = await res.text();
    expect(svg).toContain('>\n          2\n');
    expect(res.headers.get('Cache-Control')).toBe('public, s-maxage=5');
  });

  it('increment requests should not be cached', async () => {
    const res = await app.request('/@testnocache');
    expect(res.headers.get('Cache-Control')).toContain('no-store');
  });

  it('?num= requests should be cached at edge', async () => {
    const res = await app.request('/@testnumcache?num=42');
    expect(res.headers.get('Cache-Control')).toBe('public, max-age=86400, s-maxage=86400');
  });

  it('should reject invalid num parameter values', async () => {
    for (const bad of ['-5', '1e3', 'abc', '9999999999999999']) {
      const res = await app.request(`/@testbadnum?num=${bad}`);
      expect(res.status).toBe(400);
    }
  });

  it('should reject usernames that exceed maximum length', async () => {
    const res = await app.request(`/@${'a'.repeat(65)}`);
    expect(res.status).toBe(400);
  });
});

describe('Image Sprite Themes', () => {
  it('/themes should include all bundled image themes', async () => {
    const res = await app.request('/themes');
    const json = await res.json() as any;
    expect(json.image_themes).toEqual(expect.arrayContaining([
      'adventuretime', 'aot', 'bleach', 'codegeass', 'dragonball',
      'gumball', 'l', 'monster', 'naruto', 'onepiece'
    ]));
  });

  it('repeated digits should be embedded only once in SVG defs', async () => {
    const res = await app.request('/@sprite?theme=monster&num=1001&length=4');
    expect(res.status).toBe(200);
    const svg = await res.text();
    expect(svg.match(/<image /g)?.length).toBe(2); // "0" and "1"
    expect(svg.match(/<use /g)?.length).toBe(4);
    expect(svg.match(/data:image\/png;base64,/g)?.length).toBe(2);
  });

  it('digits should be positioned according to intrinsic width', async () => {
    const res = await app.request('/@sprite?theme=monster&num=7&length=3&scale=2');
    const svg = await res.text();
    expect(svg).toContain('viewBox="0 0 288 96"');
    expect(svg).toContain('width="576"');
    expect(svg).toContain('height="192"');
    expect(svg).toContain('<use href="#d0" x="96"/>');
    expect(svg).toContain('<use href="#d7" x="192"/>');
  });

  it('pixelated=0 should omit image-rendering style', async () => {
    const on = await (await app.request('/@sprite?theme=naruto&num=1')).text();
    const off = await (await app.request('/@sprite?theme=naruto&num=1&pixelated=0')).text();
    expect(on).toContain('image-rendering:pixelated');
    expect(off).not.toContain('image-rendering');
  });

  it('GIF-based themes should use image/gif MIME type', async () => {
    const svg = await (await app.request('/@sprite?theme=bleach&num=5&length=1')).text();
    expect(svg).toContain('data:image/gif;base64,');
  });

  it('unknown themes should fallback to flat theme', async () => {
    const svg = await (await app.request('/@sprite?theme=doesnotexist&num=5')).text();
    expect(svg).toContain('<rect');
    expect(svg).not.toContain('<image');
  });

  it('GET /gallery/:theme.svg should serve pre-rendered static showcase SVG', async () => {
    const res = await app.request('/gallery/naruto.svg');
    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toBe('image/svg+xml');
    expect(res.headers.get('Cache-Control')).toContain('immutable');
    const svg = await res.text();
    expect(svg.match(/<use /g)?.length).toBe(10);
  });
});
