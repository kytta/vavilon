import { Dictionary } from "./dictionary";
import { getPageLocale, getUserLocale } from "./locale";
import { writeLanguageTag } from "./localStorage";
import type { Locale } from "./types";

/**
 * An object representing a Vavilon config
 *
 * A vavilon object is a set of parameters that configure the vavilon environment.
 * A vavilon object contains information about the locale used in browser, the
 * locale found in cookie, dictionaries and elements
 */
export class Vavilon {
  /**
   * The user-preferred locale
   *
   * The locale comes from user-set cookie or browser language
   */
  private readonly userLocale: Locale;

  /**
   * The original page locale
   *
   * The locale comes from the `lang` attribute of the `<html>` tag
   */
  private readonly pageLocale: Locale;

  /**
   * The collection of all vavilon-enabled elements on the page
   */
  private elements: NodeListOf<HTMLElement> | null;

  /**
   * The map of available dictionaries
   *
   * The keys are the {@link Locale} codes, whereas the values are the actual {@link Dictionary}s
   */
  private readonly dictionaries: { [key: string]: Dictionary };

  /**
   * The dictionary that is used to translate the page
   *
   * If the {@link userLocale} matches the {@link pageLocale}, the value of this is `null`.
   * However, if the user switches to a new language, and then back to {@link pageLocale}, the
   * value will be {@link pageLocale}.
   */
  private pageDict: Locale | null;

  /**
   * Indicates whether the {@link pageDict} has been loaded
   */
  public pageDictLoaded: boolean;

  public constructor() {
    this.userLocale = getUserLocale();
    this.pageLocale = getPageLocale();

    this.elements = null;
    this.dictionaries = {};

    this.pageDict = null;
    this.pageDictLoaded = false;
  }

  /**
   * Finds all vavilon-enabled elements on the page and stores them inside {@link elements}.
   */
  public find(): void {
    this.elements = document.querySelectorAll<HTMLElement>("[data-vavilon]");
  }

  /**
   * Replaces all elements' texts with strings provided in the dictionary
   */
  public replace(): void {
    if (this.elements && this.pageDict) {
      for (let i = 0; i < this.elements.length; i += 1) {
        const el = this.elements[i];
        const strId = el.getAttribute("data-vavilon");

        if (strId == null) {
          continue;
        }

        if (!this.dictionaries[this.pageLocale]) {
          continue;
        }

        if (!this.dictionaries[this.pageLocale].hasString(strId)) {
          this.dictionaries[this.pageLocale].strings[strId] =
            el.innerText.trim();
        }

        if (this.dictionaries[this.pageDict].hasString(strId)) {
          el.innerText = this.dictionaries[this.pageDict].strings[strId];
        }
      }
    }
  }

  /**
   * Finds the urls of dictionaries on the page and saves them to memory.
   *
   * Note that the dictionaries aren't being loaded, only the URLs are parsed
   */
  public addDicts(): void {
    const dictScriptElements = document.querySelectorAll<HTMLScriptElement>(
      "script[data-vavilon-dict]"
    );
    for (let i = 0; i < dictScriptElements.length; i += 1) {
      const el = dictScriptElements[i];
      const dictLocale = el.getAttribute("data-vavilon-dict");
      if (dictLocale == null) {
        continue;
      }
      this.dictionaries[dictLocale.toLowerCase()] = new Dictionary(el.src);
    }
  }

  /**
   * Loads the dictionaries based on previously saved URLs
   *
   * If no dictionaries are saved, this method doesn't do anything, even if the dictionary
   * `<script>`s are present. This is why it's important to call {@link addDicts} before this.
   *
   * @param primaryCb - an optional callback to execute after the {@link pageDict} has been loaded
   */
  public loadDicts(primaryCb?: () => void): void {
    Object.keys(this.dictionaries).forEach((loc) => {
      if (
        loc === this.userLocale ||
        (loc.slice(0, 2) === this.userLocale.slice(0, 2) && !this.pageDict)
      ) {
        this.pageDict = loc;
        this.dictionaries[loc].load((): void => {
          this.pageDictLoaded = true;
          if (primaryCb) primaryCb();
        });
      } else {
        this.dictionaries[loc].load();
      }
    });
  }

  /**
   * Checks if the locale switch is possible and switches to it
   *
   * @param localeString - locale to switch to
   *
   * @returns `true` if the switch was possible and successful, `false` if it was not possible
   */
  public setLocale(localeString: Locale): boolean {
    if (this.dictionaries[localeString]) {
      this.pageDict = localeString;
      writeLanguageTag(this.pageDict);
      return true;
    }
    if (this.dictionaries[localeString.slice(0, 2)]) {
      this.pageDict = localeString.slice(0, 2);
      writeLanguageTag(this.pageDict);
      return true;
    }

    return false;
  }
}
