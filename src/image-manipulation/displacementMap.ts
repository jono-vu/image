import { PixelMap, PixelValue } from "../utils/types";

/*
 *
 * Displace a grayscale map to the right
 * by an input of a grayscale map.
 *
 */

function displacementMap(
  origImg: PixelMap<PixelValue>,
  inputImg: PixelMap<PixelValue>,
  pixelScale: number,
  wrap: boolean,
  range: [number, number],
  distortionFactor?: number
) {
  const imgLength = origImg[0].length;

  let outputImg: PixelMap<PixelValue | null> = origImg.map((y) =>
    y.map((_) => null)
  );

  origImg.forEach((origRow, origY) => {
    origRow.forEach((origPixelValue, origX) => {
      const inputPixelValue = inputImg[origY][origX] as number;

      const displacedX = displacePosition(
        origX,
        inputPixelValue,
        imgLength / pixelScale,
        distortionFactor || 1
      );

      if (wrap) {
        if (displacedX > imgLength - 1) {
          outputImg[origY][displacedX % (imgLength - 1)] = origPixelValue;
          return;
        }

        outputImg[origY][displacedX] = origPixelValue;
        return;
      }

      outputImg[origY][displacedX] = origPixelValue;
    });
  });

  if (!wrap) {
    outputImg = outputImg.map((row) =>
      row
        .map((cell, x) => {
          if (x > range[0] && x < range[1]) {
            return cell;
          }

          return undefined;
        })
        .filter((cell) => cell !== undefined)
    ) as PixelMap<PixelValue>;
  }

  return outputImg as PixelMap<PixelValue>;
}

export { displacementMap };

function displacePosition(
  originalPosition: number,
  inputPixelValue: PixelValue,
  displacementScale: number,
  distortionFactor?: number
) {
  return (
    originalPosition +
    Math.ceil(displacementScale * inputPixelValue * (distortionFactor || 1))
  );
}
