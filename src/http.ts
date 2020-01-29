/**
 * Performs a GET HTTP request and optionally executes a callback
 *
 * @param url - URL of the JSON resource
 *
 * @param callback - an optional callback to execute after the request is successful. The response
 *                   text is given as a parameter
 */
export default function get(url: string, callback?: Function): void {
  const xhr = new XMLHttpRequest();
  xhr.onload = function then(): void {
    if (this.status < 300 && this.status >= 200 && callback) {
      callback(xhr.responseText);
    }
  };
  xhr.open('GET', url, true);
  xhr.send();
}
