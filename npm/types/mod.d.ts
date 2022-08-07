/**
 * @file Styling functions for `console.log`.
 * Usage: See testing area at bottom of file.
 * References:
 * - https://developer.mozilla.org/en-US/docs/Web/API/console#styling_console_output
 */
export interface sttyl {
    (strings: TemplateStringsArray, ...args: unknown[]): string[];
    with: typeof styledWith;
}
declare function styledWith(styles: Record<string, string>): (strings: TemplateStringsArray, ...args: unknown[]) => string[];
export declare const sttyl: sttyl;
export default sttyl;
