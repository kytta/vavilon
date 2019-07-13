import { Dictionary } from './types';
import {getUserLocale, getPageLocale, Locale} from './locale';

/**
 * ## Vavilon
 *
 * A vavilon object is a set of parameters that configure the vavilon environment.
 * A vavilon object contains information about tha locale used in browser, the
 * locale found in cookie, available dictionaries, etc.
 */
export class Vavilon {
    private static instance: Vavilon;

    private userLocale: Locale;
    private pageLocale: Locale;
    
    private elements: HTMLCollectionOf<Element>;
    private dictionaries: {[key: string]: Dictionary};
    private useDict: Locale;

    private constructor() {
        Vavilon.instance.userLocale = getUserLocale();
        Vavilon.instance.pageLocale = getPageLocale();

        Vavilon.instance.elements = null;
        Vavilon.instance.dictionaries = {};

        Vavilon.instance.useDict = null;
    }

    static getVavilonInstance() {
        if (!Vavilon.instance) {
            Vavilon.instance = new Vavilon();
        }

        return Vavilon.instance;
    }
}
