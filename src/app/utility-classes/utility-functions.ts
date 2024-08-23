export class UtilityFunctions {
  public getContrastColor(backgroundColor: string, threshold: number = 128): string {
    const hexToRgb = (hex: string) => {
      const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, (m, r, g, b) => {
        return r + r + g + g + b + b;
      });
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
        : null;
    };

    const color = hexToRgb(backgroundColor);
    if (!color) return ''; // Invalid background color format

    const brightness = (color.r * 299 + color.g * 587 + color.b * 114) / 1000;
    return brightness > threshold ? '#000000' : '#ffffff';
  }
}
