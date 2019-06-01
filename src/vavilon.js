const tag = ['%c[vavilon]', 'font-weight:bold;'];

console.debug(...tag, 'Waiting for the page to load');

window.onload = function () {
    console.debug(...tag, 'Initiating...');

    let dictionaryFile;

    const vavilonDictionaries = document.querySelector('meta[property~="vavilon-dict"][content]');
    if (vavilonDictionaries) {
        dictionaryFile = vavilonDictionaries.content;
    } else {
        dictionaryFile = 'vavilon.json';
    }
    console.debug(...tag, 'Dictionary file:', dictionaryFile);

    let elements = document.querySelectorAll('[data-vavilon]');
    console.debug(elements);
};
