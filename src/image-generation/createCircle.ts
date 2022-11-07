import { arrayFrom, PixelMap } from "../utils";

function createCircle<TPixelValue>(
  width: number,
  height: number,
  radius: number,
  pixelValues: [TPixelValue, TPixelValue]
) {
  let outputMap: PixelMap<TPixelValue> = arrayFrom(height).map((_) =>
    arrayFrom(width).map((_) => pixelValues[0])
  );

  const center = {
    x: width / 2,
    y: height / 2,
  };

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < height; x++) {
      const distanceFromCenter = Math.sqrt(
        Math.pow(y - center.y, 2) + Math.pow(x - center.x, 2)
      );

      if (distanceFromCenter <= radius) {
        outputMap[y][x] = pixelValues[1];
      }
    }
  }

  return outputMap;
}

export { createCircle };
