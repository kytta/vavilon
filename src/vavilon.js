const vavilon = {
    curLang: null,
    els: [],
    dictCount: 0,
    dicts: {}
};

function getLangCookie () {
    console.debug('Getting language from cookie...');
    const parts = ('; ' + document.cookie).split('; vavilon-lang=');
    if (parts.length === 2) {
        console.debug('Cookie found.');
        return parts[1].split(';')[0];
    } else {
        console.debug('Cookie not found.');
        return null;
    }
}

function setLangCookie (lang) {
    const date = new Date();
    date.setTime(date.getTime() + (315360000000));
    const expires = `; expires=${date.toUTCString()}`;
    document.cookie = `vavilon-lang=${lang || ''}${expires}; path=/`;
}

function determineLanguage () {
    const cookieLang = getLangCookie();
    vavilon.curLang = cookieLang || navigator.language || navigator.userLanguage;
    console.debug('Language set to ' + vavilon.curLang);
    if (!cookieLang) {
        setLangCookie(vavilon.curLang);
    }
}

function loadOneDictionary (url, language) {
    console.debug('Loading dictionary for ' + language);
    // eslint-disable-next-line no-undef
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            vavilon.dicts[language] = JSON.parse(xhr.responseText);

            if (Object.keys(vavilon.dicts).length === vavilon.dictCount) {
                console.debug('All dictionaries have been loaded.');
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
    // TODO: ensure normal work with locales
    if (vavilon.curLang !== null && vavilon.curLang !== document.documentElement.lang && (vavilon.curLang in vavilon.dicts)) {
        console.debug('Translation necessary and possible.');
        console.debug('Loading elements...');
        vavilon.els = document.getElementsByClassName('vavilon');
        for (const el of vavilon.els) {
            el.innerText = vavilon.dicts[vavilon.curLang][el.dataset.vavilon];
        }
    }
}

console.debug('Waiting for the page to load...');
window.onload = () => {
    determineLanguage();
    loadDictionaries();
};
