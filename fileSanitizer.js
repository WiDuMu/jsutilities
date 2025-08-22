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
const DISALLOWED_CHARACTERS_REGEX = /[<>:"\/\\\|\?\*\u0000-\u001F\u0080-\u009f]/gm

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

   if (filename.match(DISALLOWED_FILENAMES_REGEX)) {
      filename = "unknown";
   }

   const filenameUTF8 = UTF8ENCODER.encode(filename);
   if (filenameUTF8.byteLength > MAX_NAME_LENGTH) {
      const graphemes = [...filename];
      filename = graphemes.slice(0, MAX_NAME_LENGTH).join("");
   }

   filename = filename.slice(0, MAX_NAME_LENGTH);
   return filename.length > MAX_NAME_LENGTH ? filename.slice(0, MAX_NAME_LENGTH) : filename;
}