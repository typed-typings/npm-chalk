
declare namespace chalk {

  export interface Styles <T> {
    // General
    reset: T;
    dim: T;
    bold: T;
    /** (not widely supported) */
    italic: T;
    underline: T;
    inverse: T;
    /** (not widely supported) */
    strikethrough: T;

    // Text colors
    black: T;
    red: T;
    green: T;
    yellow: T;
    /** (on Windows the bright version is used since normal blue is illegible) */
    blue: T;
    magenta: T;
    cyan: T;
    white: T;
    gray: T;
    grey: T;

    // Background colors
    bgBlack: T;
    bgRed: T;
    bgGreen: T;
    bgYellow: T;
    bgBlue: T;
    bgMagenta: T;
    bgCyan: T;
    bgWhite: T;
  }

  /**
   * Chain styles and call the last one as a method with a string argument.
   * Order doesn't matter, and later styles take precedent in case of a
   * conflict. This simply means that Chalk.red.yellow.green is equivalent to
   * Chalk.green. Multiple arguments will be separated by space.
   */
  export interface Style extends Chalk {
    (...values: string[]): string;
  }

  export interface AnsiEscapeCodes {
    open: string;
    close: string;
    closeRe: RegExp;
  }

  export interface Chalk extends Styles<Style> {

    /**
     * Create a reusable instance
     *
     * ```ts
     * const ctx = new chalk.constructor({enabled: false});
     * ```
     */
    constructor: new (options?: { enabled: boolean }) => Chalk;

    /**
     * Color support is automatically detected, but you can override it by setting the enabled
     * property. You should however only do this in your own code as it applies globally to all
     * chalk consumers.
     */
    enabled: boolean;

    /**
     *
     * Exposes the styles as [ANSI escape codes](https://github.com/chalk/ansi-styles).
     *
     * Generally not useful, but you might need just the `.open` or `.close` escape code if you're
     * mixing externally styled strings with your own.
     */
    styles: Styles<AnsiEscapeCodes>;

    /**
     * Detect whether the terminal [supports color](https://github.com/chalk/supports-color). Used
     * internally and handled for you, but exposed for convenience.
     *
     * Can be overridden by the user with the flags `--color` and `--no-color`. For situations where
     * using `--color` is not possible, add an environment variable `FORCE_COLOR` with any value to
     * force color. Trumps `--no-color`.
     */
    supportsColor: boolean;

    hasColor (value: string): boolean;
    stripColor (value: string): string;
  }
}

declare const chalk: chalk.Chalk;

export = chalk;
