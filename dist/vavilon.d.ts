// Type definitions for vavilon.js 1.1.0
// Definitions by: Nikita Karamov <nick@karamoff.ru>

/**
 * A lowercase string that defines the linguistic environment
 *
 * A locale consists of the language code and the country code in form
 * `'{languagecode}-{countrycode}'`, e.g. `'en-us'`
 */
declare type Locale = string;

/**
 * Changes the page language
 *
 * The execution of this method will change the page locale
 * of the vavilon instance, save the selected locale to cookie and replace
 * the text of all the vavilon-enabled elements on the page.
 *
 * @param localeString - the locale to switch to
 */
declare function setLang(localeString: Locale): void;
