import {Locale} from './types';
import { getLocaleCookie } from './cookie';

/**
 * Returns the user preferred locale
 *
 * The locale is based on the value of `vavilon-locale` cookie. If the cookie
 * is not present, the browser language is used instead.
 *
 * @returns {Locale} the user-preferred locale
 */
export function getUserLocale(): Locale {
    return (getLocaleCookie() || navigator.language).toLowerCase();
}

/**
 * Returns the locale of the page
 *
 * @returns {Locale} the locale of the page
 */
export function getPageLocale(): Locale {
    return document.documentElement.lang.toLowerCase();
}
