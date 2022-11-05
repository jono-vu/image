import http from "http";

import {
  createCircle,
  createCircleStripes,
  createStripes,
} from "./image-generation";
import { blur, displacementMap } from "./image-manipulation";

import { renderCanvas } from "./render";

const MAX_PIXEL_SCALE = 100;

const requestListener = function (
  _: http.IncomingMessage,
  res: http.ServerResponse
) {
  const w = 200;

  const img1_1 = createStripes(w, w, 35, 15, [MAX_PIXEL_SCALE, 1]);
  const img1_2 = blur(img1_1, 2);

  const img2_1 = createCircleStripes(w, w, 40, 20, [MAX_PIXEL_SCALE, 1]);
  const img2_2 = blur(img2_1, 20);

  const img3_1 = displacementMap(
    img1_2,
    img2_2,
    MAX_PIXEL_SCALE,
    true,
    [0, w],
    0.5
  );
  const img3_2 = blur(img3_1, 4);

  const img4_1 = displacementMap(
    img2_2,
    img3_2,
    MAX_PIXEL_SCALE,
    true,
    [0, w],
    1
  );
  const img4_2 = blur(img4_1, 2);

  const img5_1 = createCircle(w, w, 80, [1, MAX_PIXEL_SCALE]);
  const img5_2 = blur(img5_1, 50);

  const img6_1 = displacementMap(
    img3_2,
    img5_2,
    MAX_PIXEL_SCALE,
    true,
    [0, w],
    0.6
  );
  const img6_2 = blur(img6_1, 3);

  const img7_1 = displacementMap(
    img2_1,
    img6_2,
    MAX_PIXEL_SCALE,
    true,
    [0, w],
    1
  );

  const passes = [img1_2, img2_2, img3_2, img4_2, img5_2, img6_2, img7_1];

  res.writeHead(200);

  res.write(/* html */ `<div>`);
  passes.map((pass) => renderCanvas(res, pass, MAX_PIXEL_SCALE)).join("");
  res.write(/* html */ `</div>`);

  res.end();
};

const server = http.createServer(requestListener);
server.listen(8000, "localhost", () => console.log("Running"));
