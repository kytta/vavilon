import { Dictionary } from "./dictionary";
import { writeLanguageTag } from "./store";
import { getPageLanguage, getUserLanguage } from "./language";

/**
 * @typedef {import("./language").Language} Language
 */

export class Vavilon {
  constructor() {
    /**
     * The user-preferred locale
     *
     * The locale comes from user-set cookie or browser language
     *
     * @private
     * @readonly
     * @type {Language}
     */
    this._userLocale = getUserLanguage();

    /**
     * The original page locale
     *
     * The locale comes from the `lang` attribute of the `<html>` tag
     *
     * @private
     * @readonly
     * @type {Language}
     */
    this._pageLocale = getPageLanguage();

    /**
     * The collection of all vavilon-enabled elements on the page
     *
     * @private
     * @type {NodeListOf<HTMLElement & {dataset: {vavilon: string}}> | null}
     */
    this._elements = null;

    /**
     * The map of available dictionaries
     *
     * The keys are the {@link Locale} codes, whereas the values are the actual {@link Dictionary}s
     *
     * @private
     * @readonly
     * @type {Record<string, Dictionary>}
     */
    this._dictionaries = {};

    /**
     * The dictionary that is used to translate the page
     *
     * If the {@link userLocale} matches the {@link pageLocale}, the value of this is `null`.
     * However, if the user switches to a new language, and then back to {@link pageLocale}, the
     * value will be {@link pageLocale}.
     *
     * @private
     * @type {Language | null}
     */
    this._pageDict = null;

    /**
     * Indicates whether the {@link pageDict} has been loaded
     *
     * @type {boolean}
     */
    this.pageDictLoaded = false;
  }

  /**
   * Get the translating function.
   * 
   * @param {Language} language - language to get the translations for
   * @returns {(key: string) => string}
   */
  _useTranslations(language) {
    if (!this._dictionaries[language]) {
      language = this._pageLocale;
    }

    return (key) => {
      return this._dictionaries[language][key] || this._dictionaries[this._pageLocale][key]
    }
  }

  /**
   * Finds all vavilon-enabled elements on the page and stores them inside {@link elements}.
   */
  find() {
    this._elements = document.querySelectorAll("[data-vavilon]");
  }

  /**
   * Replaces all elements' texts with strings provided in the dictionary
   */
  replace() {
    if (this._elements && this._pageDict) {
      this._elements.forEach((el) => {
        /** @type {string} */
        const strId = el.dataset.vavilon;

        if (this._dictionaries[this._pageLocale]) {
          if (!(this._dictionaries[this._pageLocale].hasString(strId))) {
            this._dictionaries[this._pageLocale].strings[strId] =
              el.innerText.trim();
          }

          if (this._dictionaries[this._pageDict].hasString(strId)) {
            el.innerText = this._dictionaries[this._pageDict].strings[strId];
          }
        }
      });
    }
  }

  /**
   * Finds the urls of dictionaries on the page and saves them to memory.
   *
   * Note that the dictionaries aren't being loaded, only the URLs are parsed
   */
  addDicts() {
    /** @type {NodeListOf<HTMLScriptElement & {dataset: {vavilonDict: string}}>} */
    const dictScriptElements = document.querySelectorAll("script[data-vavilon-dict]");

    dictScriptElements.forEach(el => {
      const dictLocale = el.dataset.vavilonDict;
      this._dictionaries[dictLocale.toLowerCase()] = new Dictionary(el.src, {});
    })
  }

  /**
   * Loads the dictionaries based on previously saved URLs
   *
   * If no dictionaries are saved, this method doesn't do anything, even if the dictionary `<script>`s are present. This is why it's important to call {@link addDicts} before this.
   *
   * @param {() => void} [primaryCb] - an optional callback to execute after the {@link pageDict} has been loaded
   */
  loadDicts(primaryCb) {
    Object.keys(this._dictionaries).forEach((loc) => {
      if (
        loc === this._userLocale ||
        (loc.slice(0, 2) === this._userLocale.slice(0, 2) && !this.pageDict)
      ) {
        this.pageDict = loc;
        // @ts-ignore
        this._dictionaries[loc].load(() => {
          this.pageDictLoaded = true;
          if (primaryCb) primaryCb();
        });
      } else {
        // @ts-ignore
        this._dictionaries[loc].load();
      }
    });
  }

  /**
   * Checks if the locale switch is possible and switches to it
   *
   * @param {Language} localeString - locale to switch to
   *
   * @returns {boolean} `true` if the switch was possible and successful, `false` if it was not possible
   */
  setLocale(localeString) {
    if (this._dictionaries[localeString]) {
      this.pageDict = localeString;
      writeLanguageTag(this.pageDict);
      return true;
    }
    if (this._dictionaries[localeString.slice(0, 2)]) {
      this.pageDict = localeString.slice(0, 2);
      writeLanguageTag(this.pageDict);
      return true;
    }

    return false;
  }
}
