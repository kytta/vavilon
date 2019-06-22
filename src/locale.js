export function decodeLocale (localeString) {
    const split = localeString.split('-');
    const lang = split[0].toLowerCase();
    let country = null;
    if (split.length > 1) {
        country = split[1].toUpperCase();
    }

    return {
        lang,
        country,
        normalized: encodeLocale({ lang, country })
    };
}

export function encodeLocale (locale) {
    return locale.lang + (locale.country ? `-${locale.country}` : '');
}
