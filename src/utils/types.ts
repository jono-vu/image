/* Maps are of format image[y][x] from top left position. */

type PixelMap<TPixelValue> = Row<TPixelValue>[];
type Row<TPixelValue> = Cell<TPixelValue>[];

type Cell<TPixelValue> = TPixelValue;
type PixelValue = number;
type RGBA = {
  r: number;
  g: number;
  b: number;
  a: number;
};

enum Direction {
  HORIZONTAL = "horizontal",
  COLUMN = "column",
}

export { Direction };
export type { PixelMap, Row, Cell, PixelValue, RGBA };
