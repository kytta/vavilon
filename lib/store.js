const LOCAL_STORAGE_KEY = "vavilon-language";

/**
 * @typedef {import("./language").Language} Language
 */

/**
 * Get the value of user-preferred language for this site.
 *
 * @returns {Language} language tag if found in localStorage, "unknown" otherwise
 */
export function readLanguageTag() {
  return window.localStorage.getItem(LOCAL_STORAGE_KEY) || "unknown";
}

/**
 * Write the user-preferred language for this site to localStorage.
 *
 * @param {Language} languageTag - language tag to save
 */
export function writeLanguageTag(languageTag) {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, languageTag);
}
