export function decodeLang (langString) {
    const split = langString.split('-');
    const lang = split[0].toLowerCase();
    let country = null;
    if (split.length > 1) {
        country = split[1].toUpperCase();
    }

    return {
        lang,
        country,
        normalized: encodeLang({ lang, country })
    };
}

export function encodeLang (langObject) {
    return (langObject.lang || '') + (langObject.country ? ('-' + langObject.country) : '');
}

export function normalizeLang (langString) {
    return encodeLang(decodeLang(langString)); // TODO: possibly refactor
}
