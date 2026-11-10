/**
 * HTML/XML escape helper to prevent SVG/XSS injection.
 */
export function escapeHtml(str: string): string {
  return str.replace(/[&<>'"]/g, (tag) => {
    const chars: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    };
    return chars[tag] || tag;
  });
}

/**
 * Validates hex codes (3, 4, 6, 8 hex digits) or safe CSS color names.
 * Falls back to defaultColor on invalid input.
 */
export function validateColor(color: string | undefined, defaultColor: string): string {
  if (!color) return defaultColor;
  
  const cleanColor = color.trim().replace('#', '');
  const isHex = /^[0-9A-Fa-f]{3,4}$|^[0-9A-Fa-f]{6}$|^[0-9A-Fa-f]{8}$/.test(cleanColor);
  const isSafeName = /^[a-zA-Z]+$/.test(cleanColor);
  
  if (isHex) {
    return `#${cleanColor}`;
  }
  
  if (isSafeName) {
    return cleanColor;
  }
  
  return defaultColor;
}
