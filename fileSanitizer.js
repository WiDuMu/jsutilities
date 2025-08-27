import { truncateToBytesWithUnicode } from "./truncation";

/** The maximum file length. */
const MAX_NAME_LENGTH = 255;

/**
 * Filenames not allowed in Windows: https://learn.microsoft.com/en-us/windows/win32/fileio/naming-a-file
 * I removed "~", ".", and ".." from being used due to their use as a shortcut on Unix-likes
 */
// const DISALLOWED_FILENAMES = new Set([".", "..", "~", "CON", "PRN", "AUX", "NUL", "COM1", "COM2", "COM3", "COM4", "COM5", "COM6", "COM7", "COM8", "COM9", "COM¹", "COM²", "COM³", "LPT1", "LPT2", "LPT3", "LPT4", "LPT5", "LPT6", "LPT7", "LPT8", "LPT9", "LPT¹", "LPT²", "LPT³"])

const DISALLOWED_FILENAMES_REGEX = /(\.|\.\.|~)|(con|prn|aux|nul|com[0-9¹²³]|lpt[0-9¹²³])(\..*)/gmi

/**
 * Removed Window's banned ones and the unicode control sequences.
 */

// biome-ignore lint/suspicious/noControlCharactersInRegex: There should be no control characters in a string but I can't garuntee it.
const  DISALLOWED_CHARACTERS_REGEX = /[<>:"\/\\\|\?\*\u0000-\u001F\u0080-\u009f]/gm

/**
 * @typedef {Object} FilenameSanitizerOptions
 * @property {string} replacement A replacement to replace invalid characters with.
 */

/**
 * sanitizes a file name for download. This is designed to be as safe as I feel is reasonable, and isn't designed for speed.
 * @param {string} filename file name to sanitize
 * @param {FilenameSanitizerOptions} options
 */
export function sanitizeFilename(filename, options) {
   if (typeof filename !== "string") {
      throw new TypeError("Attempted to sanitize non-string filename.");
   }

   filename = filename.normalize("NFC") // Convert unicode into a standard form.
               .replace(DISALLOWED_CHARACTERS_REGEX, options.replacement);

   const fileExtIndex = filename.lastIndexOf(".");
   const fileExt = filename.slice(fileExtIndex);
   filename = filename.slice(0, fileExtIndex);

   if (filename.match(DISALLOWED_FILENAMES_REGEX)) {
      filename = "unknown";
   }

   filename = truncateToBytesWithUnicode(filename, MAX_NAME_LENGTH - fileExt.length);
   filename += fileExt; // If a string length error occurred it's right here.
   return filename;
}