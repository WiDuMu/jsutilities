/**
 * Truncates a string to a given number of codepoints
 * @param {string} string String to truncate
 * @param {number} length Number of **codepoints** to truncate the string to
 */
export function truncateCodepoints(string, length) {
	if (typeof string !== "string" || length <= 0) return "";
	return string.slice(0, length);
}

/**
 * Gives a string's length in graphemes
 * @param {string} string
 * @returns {number} length
 */
export function graphemesLength(string) {
	return [...string].length;
}

/**
 * Truncates a string to a given number of graphemes, this roughly maps to characters
 * @param {string} string String to truncate
 * @param {number} length Number of **graphemes** to truncate the string to
 */
export function truncateGraphemesWithUnicode(string, length) {
	if (typeof string !== "string" || length <= 0) return "";
	const graphemes = [...string];
	return graphemes.slice(0, length).join("");
}

const UTF8ENCODER = new TextEncoder();
const UTF8DECODER = new TextDecoder();

/** Two bits in front are a leading byte for a multi-line character */
const LEADING_BYTE_MASK = 0b11000000;

/** 
 * @param {string} string string you want the length of.
 */
export function utf8BytesLength(string) {
	const stringInUTF8 = UTF8ENCODER.encode(string);
	return stringInUTF8.byteLength;
}

/**
 * Truncates a string to a given number of **bytes**
 * @param {string} string String to truncate
 * @param {number} length Number of **bytes** to truncate the string to
 */
export function truncateToBytesWithUnicode(string, length) {
	if (typeof string !== "string" || length <= 0) return "";

	const stringInUTF8 = UTF8ENCODER.encode(string);

	if (stringInUTF8.byteLength <= length) {
		return string;
	}

	let truncateIndex = 0;
	for (let i = 0; i < length; i++) {
		// #TODO maybe replace with > 192 check?
		if ((stringInUTF8 & LEADING_BYTE_MASK) !== 0b10000000) {
			truncateIndex = i + 1;
		}
	}

	const truncatedString = UTF8DECODER.decode(
		stringInUTF8.slice(0, truncateIndex),
	);
	return truncatedString;
}
