import { Locale } from './types';

/**
 * Gets the value of `vavilon-locale` cookie
 *
 * @returns the value of the cookie, if it is present; `null` otherwise
 */
export function getLocaleCookie(): string {
  const parts = (`; ${document.cookie}`).split('; vavilon-locale=');
  if (parts.length === 2) {
    return parts[1].split(';')[0];
  }
  return null;
}

const ONE_YEAR_IN_MS = 315_360_000_000;

/**
 * Sets the value for `vavilon-locale` cookie
 *
 * @param locale - the locale string to be saved in cookies
 */
export function setLocaleCookie(locale: Locale): void {
  const date = new Date();
  date.setTime(date.getTime() + (ONE_YEAR_IN_MS)); // one year in ms
  const expires = `; expires=${date.toUTCString()}`;
  document.cookie = `vavilon-locale=${locale || ''}${expires}; path=/`;
}
