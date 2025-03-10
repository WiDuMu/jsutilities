const alpha =
	"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&()[]";
/** Scrambles a text to reveal it in a "hackery" effect.
 * @param {string} text Text to scramble it to
 * @param {string} charset The character set to draw the scramble from
 * @param {number} frequency How often to change the letter
 * @param {number} switches How many times to switch ltters
 */
HTMLElement.prototype.scrambleTo = function (
	text,
	charset = alpha,
	frequency = 50,
	switches = 6,
) {
	if (text.length === 0) {
		this.textContent = "";
		return;
	}
	if (charset === "") {
		charset = alpha;
	}
	let i = 0;
	let content = "";
	const interval = setInterval(
		(() => {
			if (i === switches) {
				content = text.slice(0, content.length + 1);
				i = 0;
				if (content.length === text.length) {
					clearInterval(interval);
					this.textContent = text;
					return;
				}
			}
			const pick = charset[Math.floor(Math.random() * charset.length)];
			this.textContent = content + pick;
			i++;
		}).bind(this),
		frequency,
	);
};

/**
 * Scramble to text for a given duration.
 * @param {string} text Text to scramble to
 * @param {string} time Time to scramble for
 * @param {number} switches How many times to change the characters
 * @param {string} charset Characters to use in randomization
 */
HTMLElement.prototype.scrambleFor = function (
	text,
	time,
	switches = 6,
	charset = alpha,
) {
	let frequency = time / text.length / switches;
	if (frequency >= 100 && switches === 6) {
		const scalar = Math.ceil(frequency / 100);
		switches *= scalar;
		frequency /= scalar;
	}
	this.scrambleTo(text, charset, frequency, switches);
};
