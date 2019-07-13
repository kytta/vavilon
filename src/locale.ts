import {getLocaleCookie} from './cookie';

/**
 * A lowercase string that defines the linguistic environment
 *
 * A locale consists of the language code and the country code in form
 * `'{languagecode}-{countrycode}'`, e.g. `'en-us'`
 */
export type Locale = string;

/**
 * Returns the user preferred locale
 *
 * The locale is based on the value of `vavilon-locale` cookie. If the cookie
 * is not present, the browser (navigator) language is used instead
 *
 * @returns the user-preferred locale
 */
export function getUserLocale(): Locale {
    return (getLocaleCookie() || window.navigator.language || window.browserLanguage || window.userLanguage).toLowerCase();
}

/**
 * Returns the locale of the page
 *
 * @returns the locale of the page
 */
export function getPageLocale(): Locale {
    return document.documentElement.lang.toLowerCase();
}
