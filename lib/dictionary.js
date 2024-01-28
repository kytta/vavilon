/**
 * An object that defines a dictionary for one language.
 *
 * A dictionary contains the dictionary JSON file URL and an object, the keys of which are unique string IDs, and the values are the strings, translated into the language of the dictionary.
 */
export class Dictionary {
  /**
   * Initialize a dictionary.
   *
   * @param {string} url - URL of the dictionary file
   * @param {Record<string, string>} strings - strings from the dictionary file
   */
  constructor(url, strings) {
    /**
     * Dictionary JSON-file URL
     * @type {string}
     */
    this.url = url;

    /**
     * Dictionary strings with IDs
     *
     * The keys in this object are the unique string IDs, whereas the values are the translated strings
     * @type {Record<string, string>}
     */
    this.strings = strings;
  }

  /**
   * Returns true if a string with certain ID exists in the dictionary
   *
   * @param {string} id - the string ID
   * @returns {boolean}
   */
  hasString(id) {
    return Object.prototype.hasOwnProperty.call(this.strings, id);
  }

  /**
   * Loads the dictionary from it's URL and stores the {@link strings}
   *
   * @param {() => void} [cb] - an optional callback to be executed after loading is finished
   */
  load(cb) {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      if (xhr.status < 300 && xhr.status >= 200) {
        this.strings = JSON.parse(xhr.responseText);
        if (cb) cb();
      }
    };
    xhr.open("GET", this.url, true);
    xhr.send();
  }
}
