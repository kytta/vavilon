import {Locale} from "./locale";
import {Vavilon} from "./vavilon";

declare global {
    interface Window {
        // IE navigator language settings (non-standard)
        userLanguage: string;
        browserLanguage: string;

        setLang(localeString: Locale): void;
    }
}


/**
 * Core vavilon object instance
 *
 * This object stores the data about the page, where vavilon is executed
 */
const vavilon = Vavilon.getVavilonInstance();

let pageLoaded = false;

vavilon.registerDictionaries();
vavilon.loadDictionaries(() => {
    if (pageLoaded) {
        vavilon.replaceAllElements();
    }
});

window.onload = function () {
    vavilon.findAllElements();
    pageLoaded = true;

    if (vavilon.pageDictLoaded) {
        vavilon.replaceAllElements();
    }
};

window.setLang = vavilon.changeLocale;
