import { createCanvas, createImageData } from "canvas";
import http from "http";

import { PixelMap, PixelValue } from "../utils";

function renderCanvas(
  res: http.ServerResponse,
  img: PixelMap<PixelValue>,
  pixelScale: number
) {
  const width = img[0].length;
  const height = img.length;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  const imageData = createImageData(
    convertGrayscaleMapToUint8(img, pixelScale),
    width
  );
  ctx.putImageData(imageData, 0, 0);

  return res.write(
    /* html */ `<img style="image-rendering: pixelated;" src="${canvas.toDataURL()}" />`
  );
}

function convertGrayscaleMapToUint8(
  imgMap: PixelMap<PixelValue>,
  pixelScale: number
) {
  let pixelArray: number[] = [];

  imgMap.flat().forEach((v) => {
    const a = 255 - (255 * v) / pixelScale;

    pixelArray.push(0); /* R */
    pixelArray.push(0); /* G */
    pixelArray.push(0); /* B */
    pixelArray.push(a); /* A */
  });

  return new Uint8ClampedArray(pixelArray);
}

export { renderCanvas };
