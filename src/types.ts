/**
 * # types.ts
 * 
 * Type declarations for vavilon
 */

/**
 * ## Locale
 *
 * A locale is a lowercase string that defines the linguistic environment.
 * A locale consists of the language and the country in form
 * `'languagecode-countrycode'`, e.g. `'en-us'`
 */
export type Locale = string;

/**
 * ## Dictionary
 *
 * A dictionary contains the language, the original url and an object, the keys
 * of which are unique string IDs and the values are the strings, translated
 * into the language of the dictionary.
 */
export class Dictionary {

    constructor(url: string, strings?: {[key: string]: string}) {
        this.url = url;

        if (strings) this.strings = strings;
        else this.strings = {};
    }

    url: string|null;
    strings: {[key: string]: string}
}
