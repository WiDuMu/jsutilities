/** returns a random string of specified length from the provided character set */
export const randomString = (length, alphabet) =>
	Array.from(
		{ length: length },
		(_) => alphabet[Math.floor(Math.random() * alphabet.length)],
	).join("");
