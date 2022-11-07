import { isPixelGrayscale, PixelMap, PixelValue, RGBA } from "../utils";

function blur<TPixelValue = PixelValue | RGBA>(
  img: PixelMap<TPixelValue>,
  blurSize: number
) {
  let outputImg = img;

  img.forEach((row, y) => {
    row.forEach((pixel, x) => {
      let totalGrayscalePixelValue = 0;
      let totalRGBAPixelValues = { r: 0, g: 0, b: 0, a: 0 };

      let mapCount = 0;

      for (
        let surroundingY = -blurSize;
        surroundingY < blurSize * 2;
        surroundingY++
      ) {
        for (
          let surroundingX = -blurSize;
          surroundingX < blurSize * 2;
          surroundingX++
        ) {
          const mirroredY = Math.ceil(y + surroundingY - blurSize);
          const mirroredX = Math.ceil(x + surroundingX - blurSize);

          const isValidPosition =
            mirroredY > 0 &&
            mirroredY < img.length &&
            mirroredX > 0 &&
            mirroredX < img[0].length;

          if (isValidPosition) {
            const distanceFromCenter = Math.sqrt(
              Math.pow(blurSize - surroundingY, 2) +
                Math.pow(blurSize - surroundingX, 2)
            );

            if (distanceFromCenter <= blurSize) {
              const blurWeight = distanceFromCenter / blurSize;

              const mirroredPixelValue = img[mirroredY][mirroredX];

              if (!pixel) {
                return;
              }

              if (isPixelGrayscale(pixel)) {
                totalGrayscalePixelValue +=
                  (mirroredPixelValue as PixelValue) * blurWeight;

                mapCount += blurWeight;
              } else {
                totalRGBAPixelValues.r +=
                  (mirroredPixelValue as RGBA).r * blurWeight;
                totalRGBAPixelValues.g +=
                  (mirroredPixelValue as RGBA).g * blurWeight;
                totalRGBAPixelValues.b +=
                  (mirroredPixelValue as RGBA).b * blurWeight;
                totalRGBAPixelValues.a +=
                  (mirroredPixelValue as RGBA).a * blurWeight;

                mapCount += blurWeight;
              }
            }
          }
        }
      }

      if (isPixelGrayscale(pixel)) {
        const averageGrayscaleValue = totalGrayscalePixelValue / mapCount;
        outputImg[y][x] = averageGrayscaleValue as TPixelValue;
      } else {
        const averageRGBAValue = {
          r: totalRGBAPixelValues.r / mapCount,
          g: totalRGBAPixelValues.r / mapCount,
          b: totalRGBAPixelValues.r / mapCount,
          a: totalRGBAPixelValues.r / mapCount,
        };

        outputImg[y][x] = averageRGBAValue as TPixelValue;
      }
    });
  });

  return outputImg;
}

export { blur };
