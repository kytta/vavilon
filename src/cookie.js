export function getLangCookie () {
    console.debug('Getting language from cookie...');
    const parts = ('; ' + document.cookie).split('; vavilon-lang=');
    if (parts.length === 2) {
        console.debug('Cookie found.');
        return parts[1].split(';')[0];
    } else {
        console.debug('Cookie not found.');
        return null;
    }
}

export function setLangCookie (lang) {
    const date = new Date();
    date.setTime(date.getTime() + (315360000000));
    const expires = `; expires=${date.toUTCString()}`;
    document.cookie = `vavilon-lang=${lang || ''}${expires}; path=/`;
}
