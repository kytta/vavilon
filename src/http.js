/**
 * Performs a GET HTTP-request and runs callback with response data
 *
 * @param {string} url
 *        URL of the JSON resource
 *
 * @param {function} [callback]
 *        a function to call after the request is successful
 */
export function get (url, callback) {
    // eslint-disable-next-line no-undef
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.status < 300 && this.status >= 200 && callback) {
            callback(xhr.responseText);
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}
