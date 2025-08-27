/**
 * Downloads, in parallel, the urls provided as blobs
 * @param {(string | RequestInfo)[]} urls
 * @param {RequestInit[] | undefined} requestInits a list of objects containing custom settings for a request.
 * @returns {Promise<Blob[]>}
 */
export async function parallelDownloadBlob(urls, requestInits) {
	const requests = urls.map((url, index) => {
		return fetch(
			url,
			requestInits && requestInits.length > index ? requestInits[index] : {},
		);
	});
	const responses = await Promise.all(requests);
	const data = responses.map((response) => response.blob());
	return Promise.all(data);
}

/**
 * Downloads, in parallel, the urls provided
 * @param {(string | RequestInfo)[]} urls
 * @param {RequestInit[] | undefined} requestInits a list of objects containing custom settings for a request.
 * @returns {Promise<string[]>}
 */
export default async function parallelDownloadText(urls, requestInits) {
	const requests = urls.map((url, index) => {
		return fetch(
			url,
			requestInits && requestInits.length > index ? requestInits[index] : {},
		);
	});
	const responses = await Promise.all(requests);
	const data = responses.map((response) => response.text());
	return Promise.all(data);
}

/**
 * Downloads, in parallel, the urls provided as json
 * @param {(string | RequestInfo)[]} urls
 * @param {RequestInit[] | undefined} requestInits a list of objects containing custom settings for a request.
 * @returns {Promise<any[]>}
 */
export async function parallelDownloadJson(urls, requestInits) {
	const requests = urls.map((url, index) => {
		return fetch(
			url,
			requestInits && requestInits.length > index ? requestInits[index] : {},
		);
	});
	const responses = await Promise.all(requests);
	const data = responses.map((response) => response.json());
	return Promise.all(data);
}
