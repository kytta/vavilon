import { getCookieLocale, setCookieLocale } from './cookie';
import { decodeLocale } from './locale';

const vav = {
    vL: {
        l: null, // language
        c: null, // country
        n: null // normalized value
    }, // browser or cookie locale
    pL: decodeLocale(document.documentElement.lang), // page locale
    e: [], // elements: the elements on the page
    dU: null, // dictionary urls
    rD: null, // replace dictionary: the dictionary that will be used
    d: {} // dictionries: the actual dictionaries
};

/* ========================================================================== */

function setPreferredLocale () {
    const cookieLang = getCookieLocale();
    vav.vL = decodeLocale(cookieLang || navigator.language || navigator.userLanguage || navigator.browserLanguage);
    console.debug('Language set to', vav.vL.n);
    if (!cookieLang) {
        setCookieLocale(vav.vL.n);
    }
}

function getDictUrls () {
    let obj = {};

    for (const s of Array.from(document.scripts).filter((e) => e.dataset.vavilonDict)) {
        obj[s.dataset.vavilonDict] = s.src;
    }

    vav.dU = obj;
}

function loadDictionary (name, async = true) {
    if (vav.dU && !(name in vav.d)) {
        // eslint-disable-next-line no-undef
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === xhr.DONE && xhr.status === 200) {
                vav.d[name] = JSON.parse(xhr.responseText);
            }
        };

        xhr.open('GET', vav.dU[name], async);
        xhr.send(null);
    }
}

/* ========================================================================== */

setPreferredLocale();
getDictUrls();

if (vav.vL.n === vav.pL.n) {
    console.debug('Translation not needed');
} else {
    if (vav.vL.l === vav.pL.l) {
        if (vav.dU.hasOwnProperty(vav.vL.n)) {
            loadDictionary(vav.vL.n, false);
            vav.rD = vav.vL.n;
        }
    } else {
        if (vav.dU.hasOwnProperty(vav.vL.n)) {
            loadDictionary(vav.vL.n, false);
            vav.rD = vav.vL.n;
        } else if (vav.dU.hasOwnProperty(vav.vL.l)) {
            loadDictionary(vav.vL.l, false);
            vav.rD = vav.vL.l;
        } else {
            console.warn('No dictionary found for', vav.vL.n);
        }
    }
}

/* ========================================================================== */

function findAllElements () {
    vav.e = document.getElementsByClassName('vavilon');
}

function replaceAllElements () {
    for (const el of vav.e) {
        if (vav.d[vav.rD].hasOwnProperty(el.dataset.vavilon)) {
            el.innerText = vav.d[vav.rD][el.dataset.vavilon];
        } else {
            console.warn(`${el.dataset.vavilon} not in dictionary`);
        }
    }
}

function loadOtherDictionaries () {
    for (const dictName of Object.keys(vav.dU)) {
        if (dictName !== vav.rD) {
            loadDictionary(dictName);
        }
    }
}

/* ========================================================================== */

window.onload = function () {
    console.debug(vav);

    findAllElements();

    if (vav.rD) {
        replaceAllElements();
        console.debug('Translation finished');
    }

    loadOtherDictionaries();
    console.debug('All dictionaries loaded');
};
