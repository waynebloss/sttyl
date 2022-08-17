# sttyl

[![Tags](https://img.shields.io/github/release/waynebloss/sttyl)](https://github.com/waynebloss/sttyl/releases)
[![Doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/sttyl@1.0.3/mod.ts)

Style templates for `console.log`.

## Usage

This module is primarily intended for [Deno](https://deno.land/) and browsers.

```ts
import { sttyl } from "https://deno.land/x/sttyl@1.0.3/mod.ts";
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

The usage above works in modern browsers.

Install with `npm install sttyl` or `yarn add sttyl` and modify import to:

```ts
import sttyl from "sttyl";
```

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
  // #region Formatting
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
