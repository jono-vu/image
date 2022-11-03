import { arrayFrom, PixelMap, PixelValue } from "../utils";

function createCircleStripes(
  width: number,
  height: number,
  stripeWidth: number,
  stripeGap: number,
  pixelValues: [PixelValue, PixelValue]
) {
  let outputMap: PixelMap<PixelValue> = arrayFrom(height).map((_) =>
    arrayFrom(width).map((_) => pixelValues[0])
  );

  const center = {
    x: width / 2,
    y: height / 2,
  };

  const validStripes = getValidStripes(width, stripeWidth, stripeGap);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < height; x++) {
      const distanceFromCenter = Math.sqrt(
        Math.pow(y - center.y, 2) + Math.pow(x - center.x, 2)
      );

      if (validStripes.includes(Math.ceil(distanceFromCenter))) {
        outputMap[y][x] = pixelValues[1];
      }
    }
  }

  return outputMap;
}

export { createCircleStripes };

function getValidStripes(
  length: number,
  stripeWidth: number,
  stripeGap: number
) {
  let validStripes: number[] = [];

  for (
    let sectionIndex = 0;
    sectionIndex < length - 1;
    sectionIndex += stripeWidth + stripeGap
  ) {
    for (let stripedIndex = 0; stripedIndex < stripeWidth; stripedIndex++) {
      validStripes.push(sectionIndex + stripedIndex);
    }
  }

  return validStripes;
}
