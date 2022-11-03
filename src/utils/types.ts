/* Maps are of format image[y][x] from top left position. */

type PixelMap<TPixelValue> = Row<TPixelValue>[];
type Row<TPixelValue> = Cell<TPixelValue>[];

type Cell<TPixelValue> = TPixelValue;
type PixelValue = number;

export type { PixelMap, Row, Cell, PixelValue };
