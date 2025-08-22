/** 
 * Downloads, in parallel, the urls provided as blobs
 * @param {string[]} urls
 * @returns {Promise<Blob[]>}
 */
export async function parallelDownloadBlob(urls) {
	const requests = urls.map(url => fetch(url));
	const responses = await Promise.all(requests);
	const data = responses.map((response) => response.blob());
	return Promise.all(data);
}

/**
 * Downloads, in parallel, the urls provided
 * @param {string[]} urls
 * @returns {Promise<string[]>}
 */
export default async function parallelDownloadText(urls) {
	const requests = urls.map(url => fetch(url));
	const responses = await Promise.all(requests);
	const data = responses.map((response) => response.text());
	return Promise.all(data);
}

/** 
 * Downloads, in parallel, the urls provided as json
 * @param {string[]} urls
 * @returns {Promise<any[]>}
 */
export async function parallelDownloadJson(urls) {
	const requests = urls.map(url => fetch(url));
	const responses = await Promise.all(requests);
	const data = responses.map((response) => response.json());
	return Promise.all(data);
}