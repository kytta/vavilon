export function loadJson (url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            callback(xhr.responseText);
        }
    };

    xhr.open('GET', url, true);
    xhr.send(null);
}
