type Rgb = [number, number, number];

export function decToHex(dec: number) {
  return (dec < 16 ? "0" : "") + dec.toString(16);
}

export function hexToDec(hex: string) {
  return parseInt(hex, 16);
}

export function rgbToHexString(rgb: Rgb) {
  return decToHex(rgb[0]) + decToHex(rgb[1]) + decToHex(rgb[2]);
}

export function hexStringToRGB(hexString: string): Rgb {
  const s = hexString.replace("#", "");
  return [
    hexToDec(s.substr(0, 2)),
    hexToDec(s.substr(2, 2)),
    hexToDec(s.substr(4, 2)),
  ];
}

// sRGB: starting RGB color, like [255, 0, 0]
// eRGB: ending RGB color, like [122, 122, 122]
// numSteps: number of steps in the gradient
export function createSpectrum(sRGB: Rgb, eRGB: Rgb, numSteps: number) {
  const colors = [];
  for (let i = 0; i < numSteps; i++) {
    const r = Math.round(((eRGB[0] - sRGB[0]) * i) / numSteps) + sRGB[0];
    const g = Math.round(((eRGB[1] - sRGB[1]) * i) / numSteps) + sRGB[1];
    const b = Math.round(((eRGB[2] - sRGB[2]) * i) / numSteps) + sRGB[2];
    colors.push(rgbToHexString([r, g, b]));
  }
  return colors;
}
