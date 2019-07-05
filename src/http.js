/**
 * Performs a GET HTTP-request and returns the JSON-parsed response data
 *
 * @param url {string}
 *        URL of the JSON resource
 *
 * @returns {Promise<object>}
 *          response object
 */
export function getJson (url) {
    return new Promise(function (resolve, reject) {
        // eslint-disable-next-line no-undef
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function () {
            if (this.status < 300 && this.status >= 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(new Error(this.statusText));
            }
        };
        xhr.onerror = function () {
            reject(new Error(this.statusText));
        };
        xhr.send();
    });
}
