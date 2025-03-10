/**
 * Downloads, in parallel the urls provided
 * @param {string[]} urls 
 * @returns {Promise<any[]>}
 */
export default async function parallelDownload(urls) {
	const requests = urls.map(url => fetch(url));
	const responses = await Promise.all(requests);
	const data = responses.map((response) => response.text());
	return Promise.all(data);
}