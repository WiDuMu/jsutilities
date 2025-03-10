const parser = new DOMParser();

/**
 * Turns an HTML string into an HTML Document.
 * @param {string} html Text representation of HTML
 * @returns {Document} An html document
 */
export default function parseHTMLFromString(html) {
    return parser.parseFromString(html, "text/html");
}