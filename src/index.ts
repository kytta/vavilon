import { getLocaleCookie, setLocaleCookie } from './cookie';
import { get } from './http';

/* ================================= LOCALE ================================= */

/**
 * Changes the locale on the page
 *
 * This results in complete translation of all vavilon-enabled elements
 *
 * @param {Locale} localeString
 *        the locale to change to
 */
window.changeLocale = function (localeString) {
    localeString = localeString.toLowerCase();

    if (vavilon.dictionaries[localeString]) {
        vavilon.useDict = localeString;
    } else {
        const lang = localeString.slice(0, 2);

        if (vavilon.dictionaries[lang]) {
            vavilon.useDict = lang;
        } else {
            console.error('No dictionary for', localeString);
            return;
        }
    }

    replaceAllElements();
    setLocaleCookie(vavilon.useDict);
};

/* ============================== DICTIONARIES ============================== */

/**
 * Returns the dictionaries with urls but with no data loaded
 *
 * @returns {Object<string, Dictionary>}
 *          object, where the keys are dictionary locales and the values are
 *          {@link Dictionary}s with no strings
 */
function getDictionaries () {
    const dictionaries = {};
    const vavilonDictScripts = Array.from(document.scripts).filter((e) => e.dataset.vavilonDict);

    for (const s of vavilonDictScripts) {
        const dictLocale = s.dataset.vavilonDict.toLowerCase();

        /**
         * @type {Dictionary}
         */
        const dictionary = {
            url: s.src,
            strings: {}
        };

        if (dictLocale === vavilon.userLocale || (dictLocale.slice(0, 2) === vavilon.userLocale.slice(0, 2) && !vavilon.useDict)) {
            vavilon.useDict = dictLocale;
            get(s.src, r => {
                dictionary.strings = JSON.parse(r);
                useDictLoaded = true;

                if (pageLoaded) {
                    replaceAllElements();
                }
            });
        } else {
            get(s.src, r => { dictionary.strings = JSON.parse(r); });
        }

        dictionaries[dictLocale] = dictionary;
    }

    return dictionaries;
}

/* ============================= ELEMENTS =================================== */

/**
 * Finds all vavilon-enabled elements on the page and stores them inside
 * {@link Vavilon} object
 */
function findAllElements () {
    vavilon.elements = document.getElementsByClassName('vavilon');
}

/**
 * Replaces all elements' texts with strings provided in the dictionary
 */
function replaceAllElements () {
    if (vavilon.elements && vavilon.useDict) {
        if (!vavilon.dictionaries[vavilon.pageLocale]) {
            vavilon.dictionaries[vavilon.pageLocale] = {
                url: null,
                strings: {}
            };
        }
        for (const el of vavilon.elements) {
            if (vavilon.dictionaries[vavilon.useDict].strings[el.dataset.vavilon]) {
                if (!vavilon.dictionaries[vavilon.pageLocale].strings[el.dataset.vavilon]) {
                    vavilon.dictionaries[vavilon.pageLocale].strings[el.dataset.vavilon] = el.innerText;
                }
                el.innerText = vavilon.dictionaries[vavilon.useDict].strings[el.dataset.vavilon];
            } else {
                console.warn(`${el.dataset.vavilon} not in dictionary`);
            }
        }
    }
}

/* =============================== CORE ===================================== */

/**
 * Core vavilon object instance
 *
 * This object stores the data about the page, where vavilon is executed.
 *
 * @type {Vavilon}
 */
const vavilon = {
    userLocale: getUserLocale(),
    pageLocale: getPageLocale(),
    dictionaries: {}
};

let pageLoaded = false;
let useDictLoaded = false;

vavilon.dictionaries = getDictionaries();

window.onload = function () {
    findAllElements();
    pageLoaded = true;

    if (useDictLoaded) {
        replaceAllElements();
    }
};
