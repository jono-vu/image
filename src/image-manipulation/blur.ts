import { PixelMap, PixelValue } from "../utils";

function blur(img: PixelMap<PixelValue>, blurSize: number) {
  let outputImg = img;

  img.forEach((row, y) => {
    row.forEach((_, x) => {
      let totalPixelValue = 0;
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

              totalPixelValue += img[mirroredY][mirroredX] * blurWeight;
              mapCount += blurWeight;
            }
          }
        }
      }

      const averageValue = totalPixelValue / mapCount;
      outputImg[y][x] = averageValue;
    });
  });

  return outputImg;
}

export { blur };
