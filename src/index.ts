import { Hono, type Context } from 'hono';
import { cors } from 'hono/cors';
import { getCounterStore } from './services/counterStore.js';
import { generateImageSVG, getAvailableImageThemes, hasImageTheme } from './services/imageComposer.js';
import { generateFlatSVG, FlatThemeOptions } from './services/flatThemeComposer.js';
import { getGeneratorHTML } from './views/generator.js';
import { getGallerySVG } from './generated/gallery.js';
import { SAKURA_BG_DATA_URI } from './generated/decor.js';

/** Minimal shape of the Workers Rate Limiting binding (optional). */
interface RateLimiter {
  limit(options: { key: string }): Promise<{ success: boolean }>;
}

type Bindings = {
  DB?: D1Database;
  KV?: KVNamespace;
  RATE_LIMITER?: RateLimiter;
};

type AppContext = Context<{ Bindings: Bindings }>;

const MAX_USERNAME_LENGTH = 64;
const MAX_PADDING = 20;
const DEFAULT_PADDING = 7;

// Cache policies
const NO_STORE = 'max-age=0, no-cache, no-store, must-revalidate';
const RENDER_ONLY_CACHE = 'public, s-maxage=5'; // live value, short edge cache
const STATIC_CACHE = 'public, max-age=86400, s-maxage=86400'; // ?num= is deterministic

const app = new Hono<{ Bindings: Bindings }>();

// Enable CORS for all origins
app.use('*', cors({ origin: '*' }));

// Dashboard / Generator UI
app.get('/', (c) => {
  return c.html(getGeneratorHTML());
});

// Static decorative Sakura background asset
app.get('/assets/sakura-bg.png', (c) => {
  if (!SAKURA_BG_DATA_URI) {
    return c.notFound();
  }
  const base64 = SAKURA_BG_DATA_URI.split(',')[1];
  const bin = atob(base64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) {
    bytes[i] = bin.charCodeAt(i);
  }
  return new Response(bytes, {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, s-maxage=31536000, immutable'
    }
  });
});

// Supported themes metadata
app.get('/themes', (c) => {
  return c.json({
    type: 'success',
    flat_support: true,
    image_themes: getAvailableImageThemes()
  });
});

// Pre-rendered 0-9 gallery showcase SVG endpoint
app.get('/gallery/:file', (c) => {
  const file = c.req.param('file');
  if (!file.endsWith('.svg')) {
    return c.notFound();
  }
  const theme = file.slice(0, -4);
  const svg = getGallerySVG(theme);
  if (!svg) {
    return c.notFound();
  }
  return new Response(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, s-maxage=31536000, immutable'
    }
  });
});

function svgResponse(body: string, status: number, cacheControl: string): Response {
  const headers: Record<string, string> = {
    'Content-Type': 'image/svg+xml',
    'Cache-Control': cacheControl
  };
  if (cacheControl === NO_STORE) {
    // Disable browser and GitHub Camo proxy caching for real-time counters
    headers['Expires'] = '0';
    headers['Pragma'] = 'no-cache';
  }
  return new Response(body, { status, headers });
}

function errorSVG(message: string, status: number): Response {
  return svgResponse(
    `<svg width="120" height="20" xmlns="http://www.w3.org/2000/svg"><text y="15" fill="red">${message}</text></svg>`,
    status,
    NO_STORE
  );
}

/** Hono throws when there is no ExecutionContext (e.g. unit tests); ignore in that case. */
function waitUntil(c: AppContext, promise: Promise<unknown>): void {
  try {
    c.executionCtx.waitUntil(promise);
  } catch {
    // no execution context available
  }
}

// Counter Badge Route (e.g., /@username)
app.get('/:username', async (c) => {
  const username = c.req.param('username');

  // Match only handles starting with @
  if (!username.startsWith('@')) {
    return c.notFound();
  }

  // Sanitize username (alphanumeric, dash, underscore only)
  const cleanUsername = username.slice(1).replace(/[^a-zA-Z0-9-_]/g, '');
  if (!cleanUsername || cleanUsername.length > MAX_USERNAME_LENGTH) {
    return c.json({ error: 'Invalid username' }, 400);
  }

  // Parse query parameters
  const theme = c.req.query('theme');
  const isRenderOnly = c.req.query('render') === 'true';
  const pixelated = c.req.query('pixelated') !== '0';

  let scale = parseFloat(c.req.query('scale') ?? '1');
  if (isNaN(scale) || scale < 0.1 || scale > 10) {
    scale = 1;
  }

  // ?num= : static count override (bypasses database)
  const numQuery = c.req.query('num');
  let staticCount: number | undefined;
  if (numQuery !== undefined && numQuery !== '') {
    if (!/^\d{1,15}$/.test(numQuery)) {
      return errorSVG('Invalid num', 400);
    }
    staticCount = parseInt(numQuery, 10);
  }

  // Cache deterministic or read-only requests at Cloudflare Edge
  const cacheControl = staticCount !== undefined ? STATIC_CACHE : isRenderOnly ? RENDER_ONLY_CACHE : NO_STORE;
  const cache = cacheControl !== NO_STORE && typeof caches !== 'undefined' ? caches.default : null;
  const cacheKey = new Request(c.req.url);

  if (cache) {
    const cachedResponse = await cache.match(cacheKey);
    if (cachedResponse) {
      return cachedResponse;
    }
  }

  // Read and/or increment counter
  let count: number;
  if (staticCount !== undefined) {
    count = staticCount;
  } else {
    const env = c.env ?? {};
    const store = getCounterStore(env);
    try {
      let shouldIncrement = !isRenderOnly;
      // Optional rate limiting per username to protect against spamming
      if (shouldIncrement && env.RATE_LIMITER) {
        const { success } = await env.RATE_LIMITER.limit({ key: cleanUsername });
        shouldIncrement = success;
      }
      count = shouldIncrement ? await store.increment(cleanUsername) : await store.get(cleanUsername);
    } catch (error) {
      console.error(`Counter error (${cleanUsername}):`, error);
      return errorSVG('Unavailable', 503);
    }
  }

  let svgContent: string;
  try {
    if (hasImageTheme(theme)) {
      let padding = parseInt(c.req.query('length') ?? '', 10);
      if (isNaN(padding) || padding < 1) {
        padding = DEFAULT_PADDING;
      }
      if (padding > MAX_PADDING) {
        padding = MAX_PADDING;
      }
      svgContent = generateImageSVG(theme, count, padding, scale, pixelated);
    } else {
      const options: FlatThemeOptions = {
        bg: c.req.query('bg'),
        color: c.req.query('color'),
        icon: c.req.query('icon'),
        animation: c.req.query('animation'),
        stroke: c.req.query('stroke'),
        scale
      };
      svgContent = generateFlatSVG(count, options);
    }
  } catch (error) {
    console.error(`Render error (${cleanUsername}):`, error);
    return errorSVG('Error', 500);
  }

  const response = svgResponse(svgContent, 200, cacheControl);
  if (cache) {
    waitUntil(c, cache.put(cacheKey, response.clone()));
  }
  return response;
});

export default app;
