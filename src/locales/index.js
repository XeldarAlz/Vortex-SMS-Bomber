/**
 * VortexSMS - Locales Module
 * 
 * Copyright (c) 2025-present XeldarAlz
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * Original Repository: https://github.com/XeldarAlz/Vortex-SMS-Spammer
 * 
 * NOTICE: Removing this notice or claiming this work as your own
 * is a violation of the license and may result in legal action.
 */

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
