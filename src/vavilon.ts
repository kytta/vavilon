import { Dictionary } from './dictionary';
import {getUserLocale, getPageLocale, Locale} from './locale';
import {setLocaleCookie} from "./cookie";

/**
 * ## Vavilon
 *
 * A vavilon object is a set of parameters that configure the vavilon environment.
 * A vavilon object contains information about the locale used in browser, the
 * locale found in cookie, available dictionaries, etc.
 */
export class Vavilon {
    private static instance: Vavilon;

    userLocale: Locale;
    pageLocale: Locale;

    elements: HTMLCollectionOf<HTMLElement>;
    dictionaries: {[key: string]: Dictionary};
    pageDict: Locale;
    pageDictLoaded: boolean;

    private constructor() {
        Vavilon.instance.userLocale = getUserLocale();
        Vavilon.instance.pageLocale = getPageLocale();

        Vavilon.instance.elements = null;
        Vavilon.instance.dictionaries = {};

        Vavilon.instance.pageDict = null;
    }

    /**
     * ### getVavilonInstance
     *
     * Returns a static singleton instance of Vavilon object
     */
    static getVavilonInstance() {
        if (!Vavilon.instance) {
            Vavilon.instance = new Vavilon();
        }

        return Vavilon.instance;
    }

    /**
     * Finds all vavilon-enabled elements on the page and stores them inside {@link elements}.
     */
    findAllElements() {
        this.elements = document.getElementsByClassName('vavilon') as HTMLCollectionOf<HTMLElement>;
    }

    /**
     * Replaces all elements' texts with strings provided in the dictionary
     */
    replaceAllElements () {
        if (this.elements && this.pageDict) {
            if (!this.dictionaries[this.pageLocale]) {
                this.dictionaries[this.pageLocale] = new Dictionary(null);
            }

            Array.from(this.elements).forEach(el => {
                const strId = el.dataset.vavilon;
                if (this.dictionaries[this.pageDict].hasString(strId)) {
                    if (!this.dictionaries[this.pageLocale].hasString(strId)) {
                        this.dictionaries[this.pageLocale].strings[strId] = el.innerText;
                    }
                    el.innerText = this.dictionaries[this.pageDict].strings[strId];
                }
            });
        }
    }

    registerDictionaries() {
        Array.from(document.scripts)
            .filter(e => e.dataset.hasOwnProperty('vavilonDict'))
            .forEach(ds => {
                const dictLocale = ds.dataset.vavilonDict.toLowerCase();
                this.dictionaries[dictLocale] = new Dictionary(ds.src);
            });
    }

    loadDictionaries(primaryCb?: Function){
        Object.keys(this.dictionaries)
            .forEach(loc => {
                if (loc === this.userLocale || loc.slice(0,2) === this.userLocale.slice(0,2) && !this.pageDict) {
                    this.pageDict = loc;
                    this.dictionaries[loc].load(() => {
                        this.pageDictLoaded = true;
                        primaryCb();
                    })
                } else {
                    this.dictionaries[loc].load()
                }
            });
    }

    changeLocale(localeString: string): void {
        localeString = localeString.toLowerCase();

        if (this.dictionaries[localeString]) {
            this.pageDict = localeString;
        } else if (this.dictionaries[localeString.slice(0, 2)]) {
            this.pageDict = localeString.slice(0, 2)
        } else {
            return;
        }

        this.replaceAllElements();
        setLocaleCookie(this.pageDict);
    }
}
