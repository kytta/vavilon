/**
 * Decodes locale from a string into a Locale object
 *
 * @param localeString {string} string, containing locale info
 * @returns {Locale} locale object
 */
export function decodeLocale (localeString) {
    /**
     * @type {Locale}
     */
    const result = {};
    result.language = localeString.slice(0, 2).toLowerCase();
    if (localeString.length === 5) {
        result.country = localeString.slice(3, 5).toUpperCase();
    }

    return result;
}

/**
 * Encodes a locale object into a valid locale string
 * @param locale {Locale} locale object
 * @returns {string} normalized locale string
 */
export function encodeLocale (locale) {
    return locale.language + (locale.country ? `-${locale.country}` : '');
}
