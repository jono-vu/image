import { PixelValue, RGBA } from "./types";

function isPixelGrayscale<TPixelValue = PixelValue | RGBA>(pixel: TPixelValue) {
  return typeof pixel === `number`;
}

export { isPixelGrayscale };
