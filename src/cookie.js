/**
 * Gets the value of `vavilon-locale` cookie
 *
 * @returns {string|null}
 *          the value of the cookie, if it's present; `null` otherwise
 */
export function getLocaleCookie () {
    const parts = ('; ' + document.cookie).split('; vavilon-locale=');
    if (parts.length === 2) {
        return parts[1].split(';')[0];
    } else {
        return null;
    }
}

/**
 * Sets the value for `vavilon-locale` cookie
 *
 * @param {string} locale
 *        the locale string to be saved in cookies
 */
export function setLocaleCookie (locale) {
    const date = new Date();
    date.setTime(date.getTime() + (315360000000)); // one year in ms
    const expires = `; expires=${date.toUTCString()}`;
    document.cookie = `vavilon-locale=${locale || ''}${expires}; path=/`;
}
