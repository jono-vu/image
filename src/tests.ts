import {
  createCircle,
  createCircleStripes,
  createDichotomy,
  createRectangle,
  createStripes,
} from "./image-generation";
import { Direction } from "./utils";

enum TerminalColors {
  Reset = "\x1b[0m",
  Bright = "\x1b[1m",
  Dim = "\x1b[2m",
  Underscore = "\x1b[4m",
  Blink = "\x1b[5m",
  Reverse = "\x1b[7m",
  Hidden = "\x1b[8m",

  FgBlack = "\x1b[30m",
  FgRed = "\x1b[31m",
  FgGreen = "\x1b[32m",
  FgYellow = "\x1b[33m",
  FgBlue = "\x1b[34m",
  FgMagenta = "\x1b[35m",
  FgCyan = "\x1b[36m",
  FgWhite = "\x1b[37m",

  BgBlack = "\x1b[40m",
  BgRed = "\x1b[41m",
  BgGreen = "\x1b[42m",
  BgYellow = "\x1b[43m",
  BgBlue = "\x1b[44m",
  BgMagenta = "\x1b[45m",
  BgCyan = "\x1b[46m",
  BgWhite = "\x1b[47m",
}

let totalTests = 0;
let passedTests = 0;

/* Grayscale */

expect("createCircle grayscale", createCircle(2, 2, 1, [0, 1])).toBe([
  [0, 1],
  [1, 1],
]);

expect(
  "createCircleStripes grayscale",
  createCircleStripes(2, 2, 1, 1, [0, 1])
).toBe([
  [0, 0],
  [0, 1],
]);

expect("createDichotomy grayscale", createDichotomy(2, 2, [0, 1])).toBe([
  [0, 0],
  [0, 0],
]);

expect(
  "createDichotomy(horizontal) grayscale",
  createDichotomy(2, 2, [0, 1], Direction.HORIZONTAL)
).toBe([
  [0, 1],
  [0, 0],
]);

expect("createStripes grayscale", createStripes(2, 2, 1, 1, [0, 1])).toBe([
  [1, 0],
  [1, 0],
]);

expect(
  "createStripes(horizontal) grayscale",
  createStripes(2, 2, 1, 1, [0, 1], Direction.HORIZONTAL)
).toBe([
  [0, 0],
  [0, 0],
]);

expect("createRectangle grayscale", createRectangle(2, 2, 0)).toBe([
  [0, 0],
  [1, 0],
]);

console.log("--");
console.log(`${passedTests} of ${totalTests} Tests passed.`);

function expect(name: string, fn: any) {
  return { toBe: (value: any) => toBe(name, fn, value) };
}

function toBe(name: string, fn: any, value: any) {
  totalTests += 1;

  if (str(fn) === str(value)) {
    passedTests += 1;
    console.log(
      `${TerminalColors.FgGreen}%s${TerminalColors.Reset} ${name}`,
      `✓`
    );
    return;
  } else {
    console.log(
      `${TerminalColors.FgRed}%s${TerminalColors.Reset} ${name}`,
      `❌`
    );
    console.log(`expected ${str(fn)}, got ${str(value)}`);
  }
}

function str(value: any) {
  return JSON.stringify(value);
}
