/**
 * Tagged template literal for styling `console.log` statements.
 * @see [Styling console output on MDN](https://developer.mozilla.org/en-US/docs/Web/API/console#styling_console_output)
 * @example
 * // Basic
 * console.log(
 *   ...sttyl`Print ${"bold"}.b/ and ${"italic red"}.i.red/.`,
 * );
 * // Dynamic Styles
 * const style1 = ".b.cyan.u/";
 * console.log(
 *  ...sttyl`Some ${"dynamically styled text"}${style1}.`,
 * );
 * // Custom Styles
 * const styles = {
 *   s1: `color: magenta; font-weight: bold`,
 *   s2: `color: orange; font-style: italic`,
 * };
 * const myStyle = sttyl.with(styles);
 * console.log(
 *   ...myStyle`${"And"}.s1/ ${"custom styles"}.s2.u/.`,
 * );
 * // Default Styles
 * {
 *   // Colors
 *   black: "color: black",
 *   blue: "color: blue",
 *   cyan: "color: cyan",
 *   gray: "color: gray",
 *   green: "color: green",
 *   grey: "color: grey",
 *   magenta: "color: magenta",
 *   red: "color: red",
 *   white: "color: white",
 *   yellow: "color: yellow",
 *   // Formatting
 *   b: "font-weight: bold",
 *   bold: "font-weight: bold",
 *   i: "font-style: italic",
 *   italic: "font-style: italic",
 *   s: "text-decoration: line-through",
 *   strike: "text-decoration: line-through",
 *   u: "text-decoration: underline",
 *   underline: "text-decoration: underline",
 * }
 */
export interface sttyl {
  (strings: TemplateStringsArray, ...args: unknown[]): string[];
  /**
   * Creates a sttyl function that mixes your custom styles in with the default
   * styles. See main `sttyl` docs for a list of default styles.
   * @example
   * const styles = {
   *   s1: `color: magenta; font-weight: bold`,
   *   s2: `color: orange; font-style: italic`,
   * };
   * const myStyle = sttyl.with(styles);
   * console.log(
   *   ...myStyle`Log ${"some"}.s1/ ${"custom styles"}.s2.u/.`,
   * );
   */
  with: typeof styledWith;
}

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

function styledWith(styles: Record<string, string>) {
  if (styles !== defaultStyles) {
    styles = {
      ...defaultStyles,
      ...styles,
    };
  }
  function styledTag(strings: TemplateStringsArray, ...args: unknown[]) {
    /** Message parts to be joined for 1st string argument of `console.log`. */
    const msg: string[] = [];
    /** CSS style arguments for `console.log`. */
    const css: string[] = [];
    const { length: stringsLen } = strings;
    for (let strIdx = 0; strIdx < stringsLen; strIdx++) {
      const str = parseStyleCodes(strings[strIdx]);
      let arg = args[strIdx];
      if (typeof arg === "string") {
        arg = parseStyleCodes(arg);
      } else {
        arg = arg ?? "";
      }
      msg.push(str);
      msg.push(arg as string);
    }
    /** Return array for spreading into a call to `console.log(...)`. */
    const rv = [msg.join(""), ...css];
    // console.log("STYLED", rv);
    return rv;

    function parseStyleCodes(str: string) {
      if (str.startsWith(".")) {
        //
        // Match a period, followed by non-whitespace up to the first "/".
        //
        const match = str.match(/^.[^\s/]+\/{1}/);
        if (!match) {
          return str;
        }
        const frame = match[0].toString();
        const code = frame.substring(1, frame.length - 1);
        // console.log("MATCH: frame", frame, "code", code);
        // If it's more than just the period...
        if (code) {
          // Split the code into keys (keyof styles), skipping the first dot.
          const keys = code.split(".");
          const { length: keysLen } = keys;
          let style = "";
          for (let keyIdx = 0; keyIdx < keysLen; keyIdx++) {
            const key = keys[keyIdx];
            // Join all keys found in styles into one style string.
            if (key in styles) {
              style += styles[key] + ";";
            }
          }
          if (style) {
            // We only apply the `code` found above if it produced a style.
            // Otherwise, it's displayed as part of `msg` (below).
            const prev = msg.length - 1;
            msg[prev] = "%c" + msg[prev] + "%c";
            str = str.substring(frame.length);
            css.push(style);
            css.push("");
          }
        }
      }
      return str;
    }
  }
  return styledTag;
}

export const sttyl = styledWith(defaultStyles) as sttyl;
sttyl.with = styledWith;
export default sttyl;

// #region Testing

// console.log("");
// console.log(
//   "Testing %csttyl%c...",
//   `${defaultStyles.b};${defaultStyles.u};${defaultStyles.cyan}`,
//   "",
// );
// console.log("");
// //
// // Basic
// //
// console.log(
//   ...sttyl`Hello, here is some ${"RED"}.b.i.red.u//&${"YELLOW"}.yellow/ text.`,
//   {
//     and: "some args",
//     more: "and some more args",
//   },
// );
// console.log("");
// //
// // Dynamic Styles
// //
// const style1 = ".b.i.cyan.u/";
// const style2 = ".b.green/";
// console.log(
//   ...sttyl`...and some ${"dynamically"}${style1} ${"styled"}${style2} text.`,
// );
// console.log("");
// //
// // Custom Styles
// //
// const styles = {
//   s1: `color: magenta; font-weight: bold`,
//   s2: `color: orange; font-style: italic`,
// };
// const myStyle = sttyl.with(styles);
// console.log(
//   ...myStyle`...and ${"text"}.s1/ ${"with custom style names"}.s2.u/.`,
// );
// console.log("");
// //
// // Done
// //
// console.log(
//   ...sttyl`Testing ${"sttyl"}.cyan.b.u/ completed.`,
// );
// console.log("");

// #endregion
