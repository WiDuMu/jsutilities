/** returns a random string of specified length from the provided character set */
export const randomString = (
	length,
	alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&()[]",
) => Array.from({ length: length },(_) => alphabet[Math.floor(Math.random() * alphabet.length)],
	).join("");