import { getLangCookie, setLangCookie } from './cookie';
import { decodeLang, normalizeLang } from './langString';

const vavilon = {
    locale: {
        lang: null,
        country: null,
        normalized: null
    },
    els: [],
    dictCount: 0,
    dicts: {}
};

function determineLanguage () {
    const cookieLang = getLangCookie();
    vavilon.locale = decodeLang(cookieLang || navigator.language || navigator.userLanguage);
    console.debug('Language set to', vavilon.locale.normalized);
    if (!cookieLang) {
        setLangCookie(vavilon.locale.normalized);
    }
}

function loadOneDictionary (url, language) {
    language = normalizeLang(language);
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
    const docLocale = decodeLang(document.documentElement.lang);

    if (vavilon.locale.normalized !== docLocale.normalized) {
        if (vavilon.locale.lang !== docLocale.lang) {
            const dict = vavilon.dicts[vavilon.locale.normalized] || vavilon.dicts[vavilon.locale.lang] || null;

            if (dict != null) {
                console.debug('Translation necessary and possible.');
                console.debug('Loading elements...');
                vavilon.els = document.getElementsByClassName('vavilon');
                for (const el of vavilon.els) {
                    if (el.dataset.vavilon in dict) {
                        el.innerText = dict[el.dataset.vavilon];
                    } else {
                        console.warn(`${el.dataset.vavilon} not in dictionary`);
                    }
                }
            } else {
                console.error('No dictionary found for', docLocale.normalized);
            }
        } else {
            console.debug('Country codes are different, but the languages are the same');
        }
    } else {
        console.debug('Translation not needed');
    }

    console.debug('Translation finished');
}

console.debug('Waiting for the page to load...');
window.onload = () => {
    determineLanguage();
    loadDictionaries();
};
