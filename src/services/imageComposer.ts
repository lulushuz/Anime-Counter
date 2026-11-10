/**
 * Image (sprite) theme composer.
 *
 * All sprites are embedded into the Worker bundle at build time
 * (see scripts/build-themes.mjs), so rendering is fully synchronous and does no I/O.
 *
 * Each distinct digit is embedded only once inside <defs> and re-used via <use>,
 * so e.g. "0000123" embeds 4 images instead of 7.
 */
import { THEMES } from '../generated/themes.js';

const THEME_NAMES = Object.keys(THEMES);

export function getAvailableImageThemes(): string[] {
  return THEME_NAMES;
}

export function hasImageTheme(theme: string | undefined): theme is string {
  return theme !== undefined && Object.prototype.hasOwnProperty.call(THEMES, theme);
}

export function generateImageSVG(
  theme: string,
  count: number,
  padding: number = 7,
  scale: number = 1,
  pixelated: boolean = true
): string {
  const asset = THEMES[theme];
  if (!asset) {
    throw new Error(`Unknown image theme: ${theme}`);
  }

  const digits = count.toString().padStart(padding, '0');
  const style = pixelated ? ' style="image-rendering:pixelated"' : '';

  let defs = '';
  let uses = '';
  let x = 0;
  const embedded = new Set<string>();

  for (const char of digits) {
    const digit = asset.digits[char.charCodeAt(0) - 48];
    if (!digit) {
      throw new Error(`Invalid digit "${char}" in count ${count}`);
    }
    if (!embedded.has(char)) {
      embedded.add(char);
      defs += `<image id="d${char}" width="${digit.width}" height="${digit.height}" href="${digit.href}"${style}/>`;
    }
    uses += `<use href="#d${char}" x="${x}"/>`;
    x += digit.width;
  }

  const width = x;
  const height = asset.height;
  const scaledWidth = +(width * scale).toFixed(2);
  const scaledHeight = +(height * scale).toFixed(2);

  return `<svg width="${scaledWidth}" height="${scaledHeight}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg"><defs>${defs}</defs><g>${uses}</g></svg>`;
}
