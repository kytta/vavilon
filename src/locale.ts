import { getLocaleCookie } from './cookie';
import { Locale } from './types';

/**
 * Returns the user preferred locale
 *
 * The locale is based on the value of `vavilon-locale` cookie. If the cookie
 * is not present, the browser (navigator) language is used instead
 *
 * @returns the user-preferred locale
 */
export function getUserLocale(): Locale {
  return (getLocaleCookie()
      || window.navigator.language
      || window.browserLanguage
      || window.userLanguage)
    .toLowerCase();
}

/**
 * Returns the locale of the page
 *
 * @returns the locale of the page
 */
export function getPageLocale(): Locale {
  return document.documentElement.lang.toLowerCase();
}
