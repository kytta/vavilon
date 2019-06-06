const vavilon = {
    curLang: null, // TODO: determine language
    els: [],
    dictCount: 0,
    dicts: {}
};

function loadOneDictionary (url, language) {
    // eslint-disable-next-line no-undef
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            vavilon.dicts[language] = JSON.parse(xhr.responseText);

            if (Object.keys(vavilon.dicts).length === vavilon.dictCount) {
                replaceData();
            }
        }
    };

    xhr.open('GET', url, true);
    xhr.send(null);
}

function loadDictionaries () {
    console.debug('Loading dictionaries...');
    const dictionaryScripts = Array.from(document.scripts).filter((e) => e.dataset.vavilonDict);
    vavilon.dictCount = dictionaryScripts.length;
    dictionaryScripts.forEach((s) => loadOneDictionary(s.src, s.dataset.vavilonDict));
    // TODO: load only the dictionary for the current language if present
}

function replaceData () {
    if (vavilon.curLang !== null && (vavilon.curLang in vavilon.dicts)) {
        console.debug('Loading elements...');
        vavilon.els = document.getElementsByClassName('vavilon');
        for (const el of vavilon.els) {
            el.innerText = vavilon.dicts[vavilon.curLang][el.dataset.vavilon];
        }
    }
}

console.debug('Waiting for the page to load...');
window.onload = loadDictionaries;
