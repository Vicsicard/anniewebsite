import React from 'react';
import Head from 'next/head';

interface BrandStylesProps {
  primaryColor: string;
}

/**
 * Injects dynamic CSS variables based on branding settings
 */
const BrandStyles: React.FC<BrandStylesProps> = ({ primaryColor }) => {
  // Ensure we have a valid color
  const brandColor = primaryColor?.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/) 
    ? primaryColor 
    : '#0047AB';

  // Calculate complementary accent color (20% brighter with hue shift)
  const accentColor = shiftColor(brandColor, 30, 20);
  
  // Calculate secondary color (30% darker with opposite hue shift)
  const secondaryColor = shiftColor(brandColor, -45, -30);

  return (
    <Head>
      <style jsx global>{`
        :root {
          --primary: ${brandColor};
          --secondary: ${secondaryColor};
          --accent: ${accentColor};
        }
      `}</style>
    </Head>
  );
};

/**
 * Utility to shift a color's hue and brightness
 */
function shiftColor(hex: string, hueShift: number, brightnessShift: number): string {
  // Default fallback
  if (!hex?.startsWith('#')) return '#FF8C00';
  
  // Remove hash and convert to RGB
  let r = 0, g = 0, b = 0;
  
  // 3 digits
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } 
  // 6 digits
  else if (hex.length === 7) {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);
  }
  
  // Convert RGB to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    
    h /= 6;
  }
  
  // Apply hue shift and make sure it's in 0-1 range
  h = (h + hueShift / 360) % 1;
  if (h < 0) h += 1;
  
  // Apply brightness shift and clamp to 0-1
  l = Math.max(0, Math.min(1, l + brightnessShift / 100));
  
  // Convert back to RGB
  let r1, g1, b1;
  
  if (s === 0) {
    r1 = g1 = b1 = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    
    r1 = hue2rgb(p, q, h + 1/3);
    g1 = hue2rgb(p, q, h);
    b1 = hue2rgb(p, q, h - 1/3);
  }
  
  // Convert to hex
  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  
  return `#${toHex(r1)}${toHex(g1)}${toHex(b1)}`;
}

export default BrandStyles;
