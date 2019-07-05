/**
 * Performs a GET HTTP-request and runs callback with response data
 *
 * @param {string} url
 *        URL of the JSON resource
 *
 * @param {boolean} async
 *        should the request be asynchronous
 *
 * @param {function} callback
 *        a function to call after the request is successful
 */
export function getJson (url, async, callback) {
    // eslint-disable-next-line no-undef
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.status < 300 && this.status >= 200) {
            if (callback) {
                callback(xhr.response);
            }
        } else {
            throw new Error(this.statusText);
        }
    };
    xhr.open('GET', url, async);
    xhr.send();
}
