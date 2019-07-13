import {Dictionary} from './dictionary';
import {getUserLocale, getPageLocale, Locale} from './locale';
import {setLocaleCookie} from "./cookie";

/**
 * An object representing a Vavilon config
 *
 * A vavilon object is a set of parameters that configure the vavilon environment.
 * A vavilon object contains information about the locale used in browser, the
 * locale found in cookie, dictionaries and elements
 */
export class Vavilon {

    /**
     * A singleton Vavilon instance to be shared over the website
     */
    private static instance: Vavilon;

    /**
     * The user-preferred locale
     *
     * The locale comes from user-set cookie or browser language
     */
    userLocale: Locale;

    /**
     * The original page locale
     *
     * The locale comes from the `lang` attribute of the `<html>` tag
     */
    pageLocale: Locale;

    /**
     * The collection of all vavilon-enabled elements on the page
     */
    elements: HTMLCollectionOf<HTMLElement>;

    /**
     * The map of available dictionaries
     *
     * The keys are the {@link Locale} codes, whereas the values are the actual {@link Dictionary}s
     */
    dictionaries: { [key: string]: Dictionary };

    /**
     * The dictionary that is used to translate the page
     *
     * If the {@link userLocale} matches the {@link pageLocale}, the value of this is `null`.
     * However, if the user switches to a new language, and then back to {@link pageLocale}, the value will be {@link pageLocale}.
     */
    pageDict: Locale;

    /**
     * Indicates whether the {@link pageDict} has been loaded
     */
    pageDictLoaded: boolean;

    private constructor() {
        Vavilon.instance.userLocale = getUserLocale();
        Vavilon.instance.pageLocale = getPageLocale();

        Vavilon.instance.elements = null;
        Vavilon.instance.dictionaries = {};

        Vavilon.instance.pageDict = null;
    }

    /**
     * Returns a static singleton instance of Vavilon object
     */
    static getVavilonInstance(): Vavilon {
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
    replaceAllElements(): void {
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

    /**
     * Finds the urls of dictionaries on the page and saves them to memory.
     *
     * Note that the dictionaries aren't being loaded, only the URLs are parsed
     */
    registerDictionaries():void {
        Array.from(document.scripts)
            .filter(e => e.dataset.hasOwnProperty('vavilonDict'))
            .forEach(ds => {
                const dictLocale = ds.dataset.vavilonDict.toLowerCase();
                this.dictionaries[dictLocale] = new Dictionary(ds.src);
            });
    }

    /**
     * Loads the dictionaries based on previously saved URLs
     *
     * If no dictionaries are saved, this method doesn't do anything, even if the dictionary `<script>`s are present.
     * This is why it's important to call {@link registerDictionaries} before this.
     *
     * @param primaryCb - an optional callback to execute after the {@link pageDict} has been loaded
     */
    loadDictionaries(primaryCb?: Function): void {
        Object.keys(this.dictionaries)
            .forEach(loc => {
                if (loc === this.userLocale || loc.slice(0, 2) === this.userLocale.slice(0, 2) && !this.pageDict) {
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

    /**
     * Changes the locale of the page
     *
     * @param localeString - the {@link Locale} to change to
     */
    changeLocale(localeString: Locale): void {
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
