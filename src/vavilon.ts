import { Dictionary } from './dictionary';
import {getUserLocale, getPageLocale, Locale} from './locale';

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
    useDict: Locale;

    private constructor() {
        Vavilon.instance.userLocale = getUserLocale();
        Vavilon.instance.pageLocale = getPageLocale();

        Vavilon.instance.elements = null;
        Vavilon.instance.dictionaries = {};

        Vavilon.instance.useDict = null;
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
        if (this.elements && this.useDict) {
            if (!this.dictionaries[this.pageLocale]) {
                this.dictionaries[this.pageLocale] = new Dictionary(null);
            }

            Array.from(this.elements).forEach(el => {
                const strId = el.dataset.vavilon;
                if (this.dictionaries[this.useDict].hasString(strId)) {
                    if (!this.dictionaries[this.pageLocale].hasString(strId)) {
                        this.dictionaries[this.pageLocale].strings[strId] = el.innerText;
                    }
                    el.innerText = this.dictionaries[this.useDict].strings[strId];
                } else {
                    console.warn(`${strId} not in dictionary`);
                }
            });
        }
    }
}
