const tag = ['%c[vavilon]', 'font-weight:bold;'];

console.debug(...tag, 'Waiting for the page to load...');

window.onload = function () {
    console.debug(...tag, 'Initiating...');

    let elements = document.getElementsByClassName('vavilon');
    console.debug(...tag, `${elements.length} vavilon-enabled elements`);
    console.debug(elements);
};
