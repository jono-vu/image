import { arrayFrom } from "../utils/arrayFrom";
import { PixelMap, PixelValue } from "../utils/types";

enum Direction {
  HORIZONTAL = "horizontal",
  COLUMN = "column",
}

function createStripes(
  width: number,
  height: number,
  stripeWidth: number,
  stripeGap: number,
  pixelValues: [PixelValue, PixelValue],
  direction?: Direction
) {
  const initialMap: PixelMap<PixelValue> = arrayFrom(height).map((_) =>
    arrayFrom(width).map((_) => pixelValues[0])
  );

  let outputMap = initialMap;

  if (direction === Direction.HORIZONTAL) {
    for (
      let sectionIndex = 0;
      sectionIndex < height - 1;
      sectionIndex += stripeWidth + stripeGap
    ) {
      for (let stripedIndex = 0; stripedIndex < stripeWidth; stripedIndex + 1) {
        outputMap[stripedIndex].map((_) => pixelValues[1]);
      }
    }

    return outputMap;
  }

  outputMap.forEach((_, y) => {
    for (
      let sectionIndex = 0;
      sectionIndex < width - 1;
      sectionIndex += stripeWidth + stripeGap
    ) {
      for (
        let stripedIndex = 0;
        stripedIndex < stripeWidth;
        stripedIndex = stripedIndex + 1
      ) {
        outputMap[y][sectionIndex + stripedIndex] = pixelValues[1];
      }
    }
  });

  return outputMap;
}

export { createStripes };
