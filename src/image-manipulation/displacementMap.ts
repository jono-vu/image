import { isPixelGrayscale } from "../utils";
import { PixelMap, PixelValue, RGBA } from "../utils/types";

/*
 *
 * Displace a grayscale map to the right
 * by an input of a grayscale map.
 *
 */

function displacementMap<TPixelValue = PixelValue | RGBA>(
  origImg: PixelMap<TPixelValue>,
  inputImg: PixelMap<TPixelValue>,
  pixelScale: number,
  wrap: boolean,
  range: [number, number],
  distortionFactor?: number
) {
  const imgLength = origImg[0].length;

  let outputImg: PixelMap<TPixelValue | null> = origImg.map((y) =>
    y.map((_) => null)
  );

  origImg.forEach((origRow, origY) => {
    origRow.forEach((origPixelValue, origX) => {
      const inputPixelValue = inputImg[origY][origX] as TPixelValue;

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
    ) as PixelMap<TPixelValue>;
  }

  return outputImg as PixelMap<TPixelValue>;
}

export { displacementMap };

function displacePosition<TPixelValue = PixelValue | RGBA>(
  originalPosition: number,
  inputPixel: TPixelValue,
  displacementScale: number,
  distortionFactor?: number
) {
  let inputValue = 0;

  if (!inputPixel) {
    inputValue = 0;
  } else if (isPixelGrayscale(inputPixel)) {
    inputValue = inputPixel as number;
  } else {
    const { r, g, b, a } = inputPixel as unknown as RGBA;
    inputValue = (r + g + b + a) / 4;
  }

  return (
    originalPosition +
    Math.ceil(displacementScale * inputValue * (distortionFactor || 1))
  );
}
