export function decodeLocale (localeString) {
    const split = localeString.split('-');
    const lang = split[0].toLowerCase();
    let country = null;
    if (split.length > 1) {
        country = split[1].toUpperCase();
    }

    return {
        l: lang,
        c: country,
        n: encodeLocale({ lang: l, country: c })
    };
}

export function encodeLocale (locale) {
    return locale.l + (locale.c ? `-${locale.c}` : '');
}
