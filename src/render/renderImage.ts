import http from "http";

import { PixelMap, PixelValue } from "../utils";

function renderImage(
  res: http.ServerResponse,
  img: PixelMap<PixelValue>,
  pixelScale: number
) {
  return img.map((y) => {
    res.write(
      /* html */
      `<div style="
          background: black;
          width: fit-content;
        ">`
    );
    y.map((cell) => {
      res.write(
        /* html */
        `<div style="
            width: 1;
            height: 1;
            background: white;
            display: inline-block;
            opacity: ${(cell || pixelScale) / pixelScale};
          "></div>`
      );
    });
    res.write(/* html */ `</div>`);
  });
}

export { renderImage };
