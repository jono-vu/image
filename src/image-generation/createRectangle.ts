import { arrayFrom, PixelMap } from "../utils";

function createRectangle<TPixelValue>(
  width: number,
  height: number,
  pixelValue: TPixelValue
) {
  const map: PixelMap<TPixelValue> = arrayFrom(height).map((_) =>
    arrayFrom(width).map((_) => pixelValue)
  );

  return map;
}

export { createRectangle };
