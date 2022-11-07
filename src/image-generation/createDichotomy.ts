import { arrayFrom, PixelMap } from "../utils";

enum Direction {
  HORIZONTAL = "horizontal",
  COLUMN = "column",
}

function createDichotomy<TPixelValue>(
  width: number,
  height: number,
  pixelValues: [TPixelValue, TPixelValue],
  direction?: Direction
) {
  const initialMap: PixelMap<TPixelValue> = arrayFrom(height).map((_) =>
    arrayFrom(width).map((_) => pixelValues[0])
  );

  if (direction === Direction.HORIZONTAL) {
    const outputMap = initialMap.map((row, y) => {
      if (y > height / 2) {
        return row.map((_) => pixelValues[1]);
      }

      return row;
    });

    return outputMap;
  }

  const outputMap = initialMap.map((row) => {
    return row.map((cell, x) => {
      if (x > width / 2) {
        return pixelValues[1];
      }

      return cell;
    });
  });

  return outputMap;
}

export { createDichotomy };
