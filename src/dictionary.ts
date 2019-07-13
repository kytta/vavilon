/**
 * ## Dictionary
 *
 * A dictionary contains the language, the original url and an object, the keys
 * of which are unique string IDs and the values are the strings, translated
 * into the language of the dictionary.
 */
import {get} from "./http";

export class Dictionary {

    constructor(url: string, strings?: { [key: string]: string }) {
        this.url = url;

        if (strings) this.strings = strings;
        else this.strings = {};
    }

    url: string;
    strings: { [key: string]: string };

    hasString(id: string): boolean {
        return this.strings.hasOwnProperty(id);
    }

    load(cb?: Function): void {
        get(this.url, r=> {
            this.strings = JSON.parse(r);
            if (cb) cb();
        })
    }
}
