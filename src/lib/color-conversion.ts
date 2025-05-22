import { CSSProperties } from "react"

type RGB = {r: number, g: number, b: number, a?: number}
type HSL = {h: number, s: number, l: number, a?: number}
type LCH = {l: number, c: number, h: number, a?: number}

export function cssToHSL(css: CSSProperties["color"]): HSL {
  const match = css.match(/hsl\(([\d.]+)(?:deg)?\s*([\d.]+)(?:%)?\s*([\d.]+)(?:%)?(?:\s*\/\s*([\d.]+)(?:%)?)?\)/)
  if (!match) {
    throw new Error("Invalid HSL color format")
  }

  const [, h, s, l, a] = match.map(String)
  return {
    h: parseFloat(h),
    s: parseFloat(s),
    l: parseFloat(l),
    a: a != undefined ? (a.includes("%") ? parseFloat(a) / 100 : parseFloat(a)) : undefined
  }
}
export function cssToRGB(css: CSSProperties["color"]): RGB {
  const match = css.match(/rgb\((\d+)\s*(\d+)\s*(\d+)(?:\s*\/\s*([\d.]+(?:%)?))?\)/)
  if (!match) {
    throw new Error("Invalid RGB color format")
  }
  const [, r, g, b, a] = match.map(String)
  return {
    r: parseInt(r),
    g: parseInt(g),
    b: parseInt(b),
    a: a != undefined ? (a.includes("%") ? parseFloat(a) / 100 : parseFloat(a)) : undefined
  }
}
export function cssToOklch(css: CSSProperties["color"]): LCH {
  const match = css.match(/oklch\(([\d.]+(?:%)?)\s*([\d.]+(?:%)?)\s*([\d.]+)(?:\s*\/\s*([\d.]+(?:%)?))?\)/)
  if (!match) {
    throw new Error("Invalid Oklch color format")
  }
  const [, l, c, h, a] = match.map(String)
  return {
    l: l.includes("%") ? parseFloat(l) / 100 : parseFloat(l),
    c: c.includes("%") ? parseFloat(c) / 100 : parseFloat(c),
    h: parseFloat(h),
    a: a != undefined ? (a.includes("%") ? parseFloat(a) / 100 : parseFloat(a)) : undefined
  }
}


export function hexToHSL(hex: CSSProperties["color"]): HSL {
  const rgb = hexToRGB(hex)
  return rgbToHSL(rgb)
}
export function hexToRGB(hex: CSSProperties["color"]): RGB {
  let r: number = parseInt(hex.slice(1, 3), 16)
  let g: number = parseInt(hex.slice(3, 5), 16)
  let b: number = parseInt(hex.slice(5, 7), 16)
  let a: number = parseInt(hex.slice(7, 9), 16) || 1
  return { r, g, b, a: a != undefined ? a === 1 ? undefined : a === 0 ? 0 : a / 255 : undefined }
}
export function hexToOklch(hex: CSSProperties["color"]): LCH {
  // Use hexToRGB to convert hex to RGB
  const rgb = hexToRGB(hex)
  // Use rgbToOklch to convert RGB to Oklch
  return rgbToOklch(rgb)
}

export function hslToCSS(hsl: HSL): CSSProperties["color"] {
  const { h, s, l, a } = hsl
  return `hsl(${h.toFixed(0)} ${s.toFixed(2)}% ${l.toFixed(2)}%${ a != undefined ? ` / ${a.toFixed(2)}` : ""})`
}
export function hslToHex(hsl: HSL): string {
  // Use hslToRGB to convert HSL to RGB
  const rgb = hslToRGB(hsl)
  // Use rgbToHex to convert RGB to Hex
  return rgbToHex(rgb)
}
/*export function hslToRGB(hsl: HSL): RGB {
  const { h, s, l } = hsl
  let r, g, b

  if (s === 0) {
    r = g = b = l // Achromatic
  } else {
    function hue2rgb(p: number, q: number, t: number) {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  }
}*/
export function hslToRGB(hsl: HSL): RGB {
  let { h, s, l } = hsl
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return {
    r: Math.round(255 * f(0)),
    g: Math.round(255 * f(8)),
    b: Math.round(255 * f(4)),
    a: hsl.a != undefined ? hsl.a : undefined
  };
};
export function hslToOklch(hsl: HSL): LCH {
  // Use hslToRGB to convert HSL to RGB
  const rgb = hslToRGB(hsl)
  // Use rgbToOklch to convert RGB to Oklch
  return rgbToOklch(rgb)
}

export function rgbToCSS(rgb: RGB): CSSProperties["color"] {
  const { r, g, b, a } = rgb
  return `rgb(${r} ${g} ${b}${ a != undefined ? ` / ${a}` : ""})`
}
export function rgbToHex(rgb: RGB): string {
  const { r, g, b, a } = rgb
  function toHex(c: number): string {
    return c.toString(16).padStart(2, '0')
  }
  return `#${toHex(r)}${toHex(g)}${toHex(b)}${ a != undefined ? toHex(Math.round(a * 255)) : ""}`
}
export function rgbToHSL(rgb: RGB): HSL {
  let { r, g, b, a } = rgb
  ;(r /= 255), (g /= 255), (b /= 255)

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  let l = (max + min) / 2

  if (max === min) {
    h = s = 0 // achromatic
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  return { h: h * 360, s: s * 100, l: l * 100, a: a != undefined ? a : undefined }
}
export function rgbToOklch(rgb: RGB): LCH {
  const r = rgb.r / 255
  const g = rgb.g / 255
  const b = rgb.b / 255

  // Apply sRGB to Linear RGB conversion
  let linearR: number, linearG: number, linearB: number
  ;[linearR, linearG, linearB] = [r, g, b].map((c: number) =>
    c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  )

  // Convert Linear RGB to CIE XYZ
  let x: number = linearR * 0.4124564 + linearG * 0.3575761 + linearB * 0.1804375
  let y: number = linearR * 0.2126729 + linearG * 0.7151522 + linearB * 0.072175
  let z: number = linearR * 0.0193339 + linearG * 0.119192 + linearB * 0.9503041

  // Convert CIE XYZ to CIELAB
  ;[x, y, z] = [x, y, z].map((c: number) => (c > 0.008856 ? c ** (1 / 3) : (903.3 * c + 16) / 116))
  let l: number = 116 * y - 16
  let a: number = 500 * (x - y)
  let bStar: number = 200 * (y - z)

  // Convert CIELAB to Oklch
  //let c: number = Math.sqrt(a * a + bStar * bStar);
  let h: number = Math.atan2(bStar, a) * (180 / Math.PI)
  if (h < 0) h += 360

  // Assume c_max is the maximum chroma value observed or expected in your conversions
  const c_max = 100 /* your determined or observed maximum chroma value */
  // Adjusted part of the rgbToOklch function for calculating 'c'
  let c: number = Math.sqrt(a * a + bStar * bStar)
  c = (c / c_max) * 0.37 // Scale c to be within 0 and 0.37

  // Scale and round values to match the specified ranges
  l = Math.round(((l + 16) / 116) * 1000) / 1000 // Scale l to be between 0 and 1
  c = Number(c.toFixed(2)) // Ensure c is correctly scaled, adjust if necessary based on your color space calculations
  h = Number(h.toFixed(1)) // h is already within 0 to 360

  return {
    l,
    c,
    h,
    a: rgb.a != undefined ? rgb.a : undefined
  }
}

export function oklchToCSS(oklch: LCH): CSSProperties["color"] {
  const { l, c, h, a } = oklch
  return `oklch(${l} ${c} ${h}${a != undefined ? ` / ${a}` : ""})`
}
export function oklchToHex(oklch: LCH): string {
  const rgb = oklchToRGB(oklch)
  return rgbToHex(rgb)
}
export function oklchToHSL(oklch: LCH): HSL {
  const rgb = oklchToRGB(oklch)
  return rgbToHSL(rgb)
}
export function oklchToRGB(lch: LCH): RGB {
  // Convert Oklch to CIELAB
  const { l, c, h, a } = lch
  const aLab = c * Math.cos((h * Math.PI) / 180)
  const bLab = c * Math.sin((h * Math.PI) / 180)

  // Convert CIELAB to CIE XYZ
  let y = (l + 16) / 116
  let x = aLab / 500 + y
  let z = y - bLab / 200
  x = 0.95047 * (x ** 3 > 0.008856 ? x ** 3 : (x - 16 / 116) / 7.787)
  y = 1.0 * (y ** 3 > 0.008856 ? y ** 3 : (y - 16 / 116) / 7.787)
  z = 1.08883 * (z ** 3 > 0.008856 ? z ** 3 : (z - 16 / 116) / 7.787)

  // Convert CIE XYZ to Linear RGB
  let r = x * 3.2406 + y * -1.5372 + z * -0.4986
  let g = x * -0.9689 + y * 1.8758 + z * 0.0415
  let b = x * 0.0557 + y * -0.204 + z * 1.057

  // Convert Linear RGB to RGB
  r = r > 0.0031308 ? 1.055 * r ** (1 / 2.4) - 0.055 : 12.92 * r
  g = g > 0.0031308 ? 1.055 * g ** (1 / 2.4) - 0.055 : 12.92 * g
  b = b > 0.0031308 ? 1.055 * b ** (1 / 2.4) - 0.055 : 12.92 * b

  // Clamp and round the values to get valid RGB
  r = Math.min(Math.max(0, r), 1)
  g = Math.min(Math.max(0, g), 1)
  b = Math.min(Math.max(0, b), 1)

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
    a: a != undefined ? a : undefined
  }
}