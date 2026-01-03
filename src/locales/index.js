const en = require('./en');
const tr = require('./tr');

const languages = {
    en,
    tr
};

let currentLanguage = en;

function setLanguage(code) {
    if (languages[code]) {
        currentLanguage = languages[code];
        return true;
    }
    return false;
}

function getLanguage() {
    return currentLanguage;
}

function t(key) {
    const keys = key.split('.');
    let value = currentLanguage;
    
    for (const k of keys) {
        if (value && value[k] !== undefined) {
            value = value[k];
        } else {
            return key;
        }
    }
    
    return value;
}

function format(key, params = {}) {
    let text = t(key);
    
    for (const [param, value] of Object.entries(params)) {
        text = text.replace(`{${param}}`, value);
    }
    
    return text;
}

function getAvailableLanguages() {
    return Object.values(languages).map(lang => ({
        code: lang.code,
        name: lang.name
    }));
}

module.exports = {
    languages,
    setLanguage,
    getLanguage,
    t,
    format,
    getAvailableLanguages
};

