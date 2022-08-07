/**
 * @file Styling functions for `console.log`.
 * Usage: See testing area at bottom of file.
 * References:
 * - https://developer.mozilla.org/en-US/docs/Web/API/console#styling_console_output
 */
const defaultStyles = {
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
function styledWith(styles) {
    if (styles !== defaultStyles) {
        styles = Object.assign(Object.assign({}, defaultStyles), styles);
    }
    function styledTag(strings, ...args) {
        /** Message parts to be joined for 1st string argument of `console.log`. */
        const msg = [];
        /** CSS style arguments for `console.log`. */
        const css = [];
        const { length: stringsLen } = strings;
        for (let strIdx = 0; strIdx < stringsLen; strIdx++) {
            const str = parseStyleCodes(strings[strIdx]);
            let arg = args[strIdx];
            if (typeof arg === "string") {
                arg = parseStyleCodes(arg);
            }
            else {
                arg = arg !== null && arg !== void 0 ? arg : "";
            }
            msg.push(str);
            msg.push(arg);
        }
        /** Return array for spreading into a call to `console.log(...)`. */
        const rv = [msg.join(""), ...css];
        // console.log("STYLED", rv);
        return rv;
        function parseStyleCodes(str) {
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
export const sttyl = styledWith(defaultStyles);
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
