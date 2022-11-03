import http from "http";

import { createCircle, createCircleStripes } from "./image-generation";
import { blur, displacementMap } from "./image-manipulation";

import { renderCanvas } from "./render";

const MAX_PIXEL_SCALE = 100;

const requestListener = function (
  _: http.IncomingMessage,
  res: http.ServerResponse
) {
  const w = 200;

  const img1_1 = createCircleStripes(w, w, 3, 10, [MAX_PIXEL_SCALE, 1]);
  const img1_2 = blur(img1_1, 30);

  const img2_1 = createCircleStripes(w, w, 10, 10, [MAX_PIXEL_SCALE, 1]);
  const img2_2 = blur(img2_1, 2);

  const img3_1 = displacementMap(
    img2_2,
    img1_2,
    MAX_PIXEL_SCALE,
    true,
    [0, w],
    1
  );
  const img3_2 = blur(img3_1, 2);

  const img4_1 = displacementMap(
    img3_2,
    img3_2,
    MAX_PIXEL_SCALE,
    true,
    [0, w],
    0.1
  );
  const img4_2 = blur(img4_1, 2);

  const img5_1 = createCircle(w, w, 98, [1, MAX_PIXEL_SCALE]);
  const img5_2 = blur(img5_1, 40);

  const img6_1 = displacementMap(
    img4_2,
    img5_2,
    MAX_PIXEL_SCALE,
    true,
    [0, w],
    0.1
  );

  const passes = [img1_2, img2_2, img3_2, img4_2, img5_2, img6_1];

  res.writeHead(200);

  res.write(/* html */ `<div>`);
  passes.map((pass) => renderCanvas(res, pass)).join("");
  res.write(/* html */ `</div>`);

  res.end();
};

const server = http.createServer(requestListener);
server.listen(8000, "localhost", () => console.log("Running"));
