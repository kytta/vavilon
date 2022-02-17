import type { Locale } from "./types";

// This is needed to be able to work with older IE and to be able to assign a new property to Window
// eslint-disable-next-line @typescript-eslint/no-redeclare
declare global {
  interface Window {
    /**
     * Changes the page language
     *
     * The execution of this method will change the {@link Vavilon.pageLocale}
     * of the vavilon instance, save the selected locale to cookie and replace
     * the text of all the vavilon-enabled elements on the page.
     *
     * @param localeString - the locale to switch to
     */
    setLang(localeString: Locale): void;
  }
}
