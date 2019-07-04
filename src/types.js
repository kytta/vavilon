/**
 * Vavilon
 *
 * A vavilon object is a set of parameters that configure the vavilon environment.
 * A vavilon object contains information about tha locale used in browser, the
 * locale found in cookie, available dictionaries, etc.
 *
 * @typedef Vavilon
 *
 * @property {Locale|null} userLocale
 *           locale from the cookie value; if a locale hasn't been stored in
 *           cookie, the browser locale is used instead.
 *
 * @property {Locale} pageLocale
 *           locale of the page; comes from html `lang` attribute.
 *
 * @property {Array<Element>} elements
 *           vavilon-enabled elements on the page.
 *
 * @property {Object<string, Dictionary>} dictionaries
 *           available dictionaries, stored in memory
 *
 */

/**
 * Locale
 *
 * A locale is a set of parameters, that defines the linguistic environment.
 * A locale consists of the language and the country as well as the normalized
 * value (in form `'languagecode-COUNTRYCODE'`, e.g. `'en-US'`)
 *
 * @typedef Locale
 *
 * @property {string} language
 *           ISO 639-1 language code (e.g. 'en')
 *
 * @property {string} [country]
 *           ISO 3166-1 alpha-2 country code (e.g. 'US')
 */

/**
 * Dictionary
 *
 * A dictionary contains the language, the original url and an object, the keys
 * of which are unique string IDs and the values are the strings, translated
 * into the language of the dictionary.
 *
 * @typedef Dictionary
 *
 * @property {Locale} locale
 *           the locale of the dictionary
 *
 * @property {string} url
 *           the URL for dictionary's original JSON file
 *
 * @property {Object<string, string>} strings
 *           the strings of the dictionary
 *
 */

/**
 * Element
 *
 * An element is a basic HTML element, that has to be replaced in the process
 * of translation.
 *
 * @typedef Element
 *
 * @type {HTMLElement}
 */
