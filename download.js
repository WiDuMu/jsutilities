/* Downloads a file on a webpage */

/** The download button. We only need one :) */
const a = document.createElement("a");

/**
 * Accepts a file, and attempts to download it to the system.
 * @param {File} file
 */
export default function download(file) {
	const link = URL.createObjectURL(file);
	a.href = link;
	a.download = file.name;
	document.body.appendChild(a);
	a.click();
	URL.revokeObjectURL(link);
	a.remove();
	a.href = "";
}
