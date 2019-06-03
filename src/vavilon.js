import { loadJson } from './json.js';

const tag = ['%c[vavilon]', 'font-weight:bold;'];

const vavilon = {
    elements: [],
    dictionaries: [] // TODO: distinguish language codes
};

console.debug(...tag, 'Waiting for the page to load...');

window.onload = function () {
    console.debug(...tag, 'Loading dictionaries...');
    for (const script of document.scripts) {
        if (script.dataset.vavilonDict) {
            loadJson(script.src, addDictionary);
        }
    }

    console.debug(...tag, 'Loading elements...');
    vavilon.elements = document.getElementsByClassName('vavilon');

    console.debug(vavilon.elements);
    console.debug(vavilon.dictionaries);

    // TODO: determine when all dictionaries are loaded
};

function addDictionary (dictionary) {
    dictionary = JSON.parse(dictionary);
    vavilon.dictionaries.push(dictionary);
}
