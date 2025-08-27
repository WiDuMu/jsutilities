/** returns a random string of specified length from the provided character set */
export const randomString = (
	length,
	alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&()[]",
) => Array.from({ length: length },(_) => alphabet[Math.floor(Math.random() * alphabet.length)],
	).join("");

// notably slower than the older version
export const cryptoRandomString = (
	length,
	alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&()[]",
) => {
	const arr = new Uint8Array(length);
	crypto.getRandomValues(arr);
	arr.map((num) => alphabet[num % alphabet.length]).join("");
};