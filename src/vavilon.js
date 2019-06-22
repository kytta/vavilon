import { getCookieLocale, setCookieLocale } from './cookie';
import { decodeLocale } from './locale';

const vavilon = {
    loc: {
        lang: null,
        country: null,
        normalized: null
    },
    pageLoc: decodeLocale(document.documentElement.lang),
    els: [],
    dictUrls: null,
    replaceDict: null,
    dicts: {}
};

/* ========================================================================== */

function setPreferredLocale () {
    const cookieLang = getCookieLocale();
    vavilon.loc = decodeLocale(cookieLang || navigator.language || navigator.userLanguage || navigator.browserLanguage);
    console.debug('Language set to', vavilon.loc.normalized);
    if (!cookieLang) {
        setCookieLocale(vavilon.loc.normalized);
    }
}

function getDictUrls () {
    let obj = {};

    for (const s of Array.from(document.scripts).filter((e) => e.dataset.vavilonDict)) {
        obj[s.dataset.vavilonDict] = s.src;
    }

    vavilon.dictUrls = obj;
}

function loadDictionary (name, async = true) {
    if (vavilon.dictUrls && !(name in vavilon.dicts)) {
        // eslint-disable-next-line no-undef
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === xhr.DONE && xhr.status === 200) {
                vavilon.dicts[name] = JSON.parse(xhr.responseText);
            }
        };

        xhr.open('GET', vavilon.dictUrls[name], async);
        xhr.send(null);
    }
}

/* ========================================================================== */

setPreferredLocale();
getDictUrls();

if (vavilon.loc.normalized === vavilon.pageLoc.normalized) {
    console.debug('Translation not needed');
} else {
    if (vavilon.loc.lang === vavilon.pageLoc.lang) {
        if (vavilon.dictUrls.hasOwnProperty(vavilon.loc.normalized)) {
            loadDictionary(vavilon.loc.normalized, false);
            vavilon.replaceDict = vavilon.loc.normalized;
        }
    } else {
        if (vavilon.dictUrls.hasOwnProperty(vavilon.loc.normalized)) {
            loadDictionary(vavilon.loc.normalized, false);
            vavilon.replaceDict = vavilon.loc.normalized;
        } else if (vavilon.dictUrls.hasOwnProperty(vavilon.loc.lang)) {
            loadDictionary(vavilon.loc.lang, false);
            vavilon.replaceDict = vavilon.loc.lang;
        } else {
            console.warn('No dictionary found for', vavilon.loc.normalized);
        }
    }
}

/* ========================================================================== */

function findAllElements () {
    vavilon.els = document.getElementsByClassName('vavilon');
}

function replaceAllElements () {
    for (const el of vavilon.els) {
        if (vavilon.dicts[vavilon.replaceDict].hasOwnProperty(el.dataset.vavilon)) {
            el.innerText = vavilon.dicts[vavilon.replaceDict][el.dataset.vavilon];
        } else {
            console.warn(`${el.dataset.vavilon} not in dictionary`);
        }
    }
}

function loadOtherDictionaries () {
    for (const dictName of Object.keys(vavilon.dictUrls)) {
        if (dictName !== vavilon.replaceDict) {
            loadDictionary(dictName);
        }
    }
}

/* ========================================================================== */

window.onload = function () {
    console.debug(vavilon);

    findAllElements();

    if (vavilon.replaceDict) {
        replaceAllElements();
        console.debug('Translation finished');
    }

    loadOtherDictionaries();
    console.debug('All dictionaries loaded');
};
