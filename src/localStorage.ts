import type { Locale } from "./types";

const LOCAL_STORAGE_ID = "Vavilon.preferredLanguageTag";

/**
 * Gets the value of user's preferred language on this site.
 *
 * @returns language tag if found in localStorage, "unknown" otherwise
 */
const readLanguageTag = (): Locale => {
  return window.localStorage.getItem(LOCAL_STORAGE_ID) ?? "unknown";
};

/**
 * Writes the user's preferred language on this site to localStorage.
 *
 * @param languageTag language tag to save
 */
const writeLanguageTag = (languageTag: Locale): void => {
  window.localStorage.setItem(LOCAL_STORAGE_ID, languageTag);
};

export { readLanguageTag, writeLanguageTag };
