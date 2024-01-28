import { readLanguageTag } from "./store";

/**
 * A lowercase string that defines the linguistic environment.
 *
 * A language usually consists of the language code and the country code in form `'{languagecode}-{countrycode}'`, e.g. `'en-us'`
 *
 * @typedef {string} Language
 */

/**
 * Get the user-preferred langugage.
 *
 * The language is based on the value saved in localStorage. If the key is not present, the browser (navigator) language is used instead.
 *
 * @returns {Language} the user-preferred locale
 */
export function getUserLanguage() {
  return (readLanguageTag() || window.navigator.language).toLowerCase();
}

/**
 * Returns the locale of the page
 *
 * @returns {Language} the locale of the page
 */
export function getPageLanguage() {
  return document.documentElement.lang.toLowerCase();
}
