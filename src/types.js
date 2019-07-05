/**
 * Vavilon
 *
 * A vavilon object is a set of parameters that configure the vavilon environment.
 * A vavilon object contains information about tha locale used in browser, the
 * locale found in cookie, available dictionaries, etc.
 *
 * @typedef {Object} Vavilon
 *
 * @property {Locale} userLocale
 *           locale from the cookie value; if a locale hasn't been stored in
 *           cookie, the browser locale is used instead.
 *
 * @property {Locale} pageLocale
 *           locale of the page; comes from html `lang` attribute.
 *
 * @property {Locale} [useDict]
 *           locale of the dictionary that will be used to translate the page
 *
 * @property {HTMLCollectionOf} [elements]
 *           vavilon-enabled elements on the page.
 *
 * @property {Object<string, Dictionary>} dictionaries
 *           available dictionaries, stored in memory
 *
 */

/**
 * Locale
 *
 * A locale is a lowercase string that defines the linguistic environment.
 * A locale consists of the language and the country in form
 * `'languagecode-countrycode'`, e.g. `'en-us'`
 *
 * @typedef Locale
 *
 * @type {string}
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
 * @property {string|null} url
 *           the URL for dictionary's original JSON file.
 *           Can be nullable only if the dictionary is the default dictionary.
 *
 * @property {Object<string, string>} strings
 *           the strings of the dictionary
 *
 */
