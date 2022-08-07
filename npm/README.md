# _s**tty**l_

[![Tags](https://img.shields.io/github/release/waynebloss/sttyl)](https://github.com/waynebloss/sttyl/releases)
[![Doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/sttyl@1.0.0/mod.ts)

Style templates for console.log in Deno.

## Usage

```ts
import { sttyl } from "https://deno.land/x/sttyl@1.0.0/mod.ts";
//
// Basic
//
console.log(
  ...sttyl`Hello, here is some ${"RED"}.b.i.red.u//&${"YELLOW"}.yellow/ text.`,
  {
    and: "some args",
    more: "and some more args",
  },
);
console.log("");
//
// Dynamic Styles
//
const style1 = ".b.i.cyan.u/";
const style2 = ".b.green/";
console.log(
  ...sttyl`...and some ${"dynamically"}${style1} ${"styled"}${style2} text.`,
);
console.log("");
//
// Custom Styles
//
const styles = {
  s1: `color: magenta; font-weight: bold`,
  s2: `color: orange; font-style: italic`,
};
const myStyle = sttyl.with(styles);
console.log(
  ...myStyle`...and ${"text"}.s1/ ${"with custom style names"}.s2.u/.`,
);
```

### Preview

_The code above should output something like this:_

![Image of console text output styled with sttyl](https://raw.githubusercontent.com/waynebloss/sttyl/master/preview.png "sttyl output")

## Browser Usage

The code in `mod.ts` should work perfectly well in a browser once compiled to
JavaScript. Look for an NPM module soon.

## Default Styles

When you pass your custom styles into `sttyl.with()`, they are combined with and
can override all of the `defaultStyles` shown below.

```ts
const defaultStyles: Record<string, string> = {
  // #region Colors
  black: "color: black",
  blue: "color: blue",
  cyan: "color: cyan",
  gray: "color: gray",
  green: "color: green",
  grey: "color: grey",
  magenta: "color: magenta",
  red: "color: red",
  white: "color: white",
  yellow: "color: yellow",
  // #endregion
  // #region Text formats
  b: "font-weight: bold",
  bold: "font-weight: bold",
  i: "font-style: italic",
  italic: "font-style: italic",
  s: "text-decoration: line-through",
  strike: "text-decoration: line-through",
  u: "text-decoration: underline",
  underline: "text-decoration: underline",
  // #endregion
};
```