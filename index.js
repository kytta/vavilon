"use strict";
var Vavilon = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // lib/index.js
  var lib_exports = {};
  __export(lib_exports, {
    instance: () => instance,
    setLang: () => setLang
  });

  // lib/dictionary.js
  var Dictionary = class {
    /**
     * Initialize a dictionary.
     *
     * @param {string} url - URL of the dictionary file
     * @param {Record<string, string>} strings - strings from the dictionary file
     */
    constructor(url, strings) {
      this.url = url;
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
          if (cb)
            cb();
        }
      };
      xhr.open("GET", this.url, true);
      xhr.send();
    }
  };

  // lib/store.js
  var LOCAL_STORAGE_KEY = "vavilon-language";
  function readLanguageTag() {
    return window.localStorage.getItem(LOCAL_STORAGE_KEY) || "unknown";
  }
  function writeLanguageTag(languageTag) {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, languageTag);
  }

  // lib/language.js
  function getUserLanguage() {
    return (readLanguageTag() || window.navigator.language).toLowerCase();
  }
  function getPageLanguage() {
    return document.documentElement.lang.toLowerCase();
  }

  // lib/vavilon.js
  var Vavilon = class {
    constructor() {
      this._userLocale = getUserLanguage();
      this._pageLocale = getPageLanguage();
      this._elements = null;
      this._dictionaries = {};
      this._pageDict = null;
      this.pageDictLoaded = false;
    }
    /**
     * Finds all vavilon-enabled elements on the page and stores them inside {@link elements}.
     */
    find() {
      this._elements = document.querySelectorAll("[data-vavilon]");
    }
    /**
     * Replaces all elements' texts with strings provided in the dictionary
     */
    replace() {
      if (this._elements && this._pageDict) {
        this._elements.forEach((el) => {
          const strId = el.dataset.vavilon;
          if (this._dictionaries[this._pageLocale]) {
            if (!this._dictionaries[this._pageLocale].hasString(strId)) {
              this._dictionaries[this._pageLocale].strings[strId] = el.innerText.trim();
            }
            if (this._dictionaries[this._pageDict].hasString(strId)) {
              el.innerText = this._dictionaries[this._pageDict].strings[strId];
            }
          }
        });
      }
    }
    /**
     * Finds the urls of dictionaries on the page and saves them to memory.
     *
     * Note that the dictionaries aren't being loaded, only the URLs are parsed
     */
    addDicts() {
      const dictScriptElements = document.querySelectorAll("script[data-vavilon-dict]");
      dictScriptElements.forEach((el) => {
        const dictLocale = el.dataset.vavilonDict;
        this._dictionaries[dictLocale.toLowerCase()] = new Dictionary(el.src, {});
      });
    }
    /**
     * Loads the dictionaries based on previously saved URLs
     *
     * If no dictionaries are saved, this method doesn't do anything, even if the dictionary `<script>`s are present. This is why it's important to call {@link addDicts} before this.
     *
     * @param {() => void} [primaryCb] - an optional callback to execute after the {@link pageDict} has been loaded
     */
    loadDicts(primaryCb) {
      Object.keys(this._dictionaries).forEach((loc) => {
        if (loc === this._userLocale || loc.slice(0, 2) === this._userLocale.slice(0, 2) && !this.pageDict) {
          this.pageDict = loc;
          this._dictionaries[loc].load(() => {
            this.pageDictLoaded = true;
            if (primaryCb)
              primaryCb();
          });
        } else {
          this._dictionaries[loc].load();
        }
      });
    }
    /**
     * Checks if the locale switch is possible and switches to it
     *
     * @param {Language} localeString - locale to switch to
     *
     * @returns {boolean} `true` if the switch was possible and successful, `false` if it was not possible
     */
    setLocale(localeString) {
      if (this._dictionaries[localeString]) {
        this.pageDict = localeString;
        writeLanguageTag(this.pageDict);
        return true;
      }
      if (this._dictionaries[localeString.slice(0, 2)]) {
        this.pageDict = localeString.slice(0, 2);
        writeLanguageTag(this.pageDict);
        return true;
      }
      return false;
    }
  };

  // lib/index.js
  var vavilon = new Vavilon();
  var pageLoaded = false;
  vavilon.addDicts();
  vavilon.loadDicts(() => {
    if (pageLoaded) {
      vavilon.replace();
    }
  });
  window.onload = function() {
    vavilon.find();
    pageLoaded = true;
    if (vavilon.pageDictLoaded) {
      vavilon.replace();
    }
  };
  var instance = vavilon;
  function setLang(localeString) {
    const changeSuccessful = vavilon.setLocale(localeString.toLowerCase());
    console.log(changeSuccessful);
    if (changeSuccessful) {
      vavilon.replace();
    }
  }
  return __toCommonJS(lib_exports);
})();
