import { Vavilon } from "./vavilon";

/**
 * @typedef {import("./language").Language} Language
 */

/**
 * Core vavilon object instance
 *
 * This object stores the data about the page, where vavilon is executed
 */
const vavilon = new Vavilon();

/**
 * Indicates whether the whole page has been loaded
 */
let pageLoaded = false;

vavilon.addDicts();
vavilon.loadDicts(() => {
  if (pageLoaded) {
    vavilon.replace();
  }
});

window.onload = function () {
  vavilon.find();
  pageLoaded = true;

  if (vavilon.pageDictLoaded) {
    vavilon.replace();
  }
};

export const instance = vavilon;

/**
 * Change the page language
 *
 * The execution of this method will change the {@link Vavilon.pageLocale}
 * of the vavilon instance, save the selected locale to cookie and replace
 * the text of all the vavilon-enabled elements on the page.
 *
 * @param {Language} localeString - the locale to switch to
 */
export function setLang(localeString) {
  const changeSuccessful = vavilon.setLocale(localeString.toLowerCase());
  console.log(changeSuccessful);
  if (changeSuccessful) {
    vavilon.replace();
  }
}

