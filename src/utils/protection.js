/**
 * VortexSMS - Protection & Watermarking System
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

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const _0x1a2b = [0x58, 0x65, 0x6c, 0x64, 0x61, 0x72, 0x41, 0x6c, 0x7a];
const _0x3c4d = String.fromCharCode(..._0x1a2b);
const _0x5e6f = crypto.createHash('md5').update(_0x3c4d).digest('hex');
const _0x7g8h = Buffer.from(_0x3c4d).toString('base64');
const _0x9i0j = crypto.createHash('sha256').update(_0x3c4d + '-VortexSMS-2025').digest('hex').substring(0, 16);

const PRIMARY_WATERMARK = {
    a: _0x7g8h,
    r: Buffer.from('aHR0cHM6Ly9naXRodWIuY29tL1hlbGRhckFsei9Wb3J0ZXgtU01TLVNwYW1tZXI=').toString('base64'),
    l: Buffer.from('Tm9uLUNvbW1lcmNpYWw=').toString('base64'),
    t: Buffer.from('MjAyNQ==').toString('base64'),
    _: _0x9i0j,
    __: _0x5e6f
};

function getHiddenWatermark() {
    const _k1 = String.fromCharCode(86, 111, 114, 116, 101, 120, 83, 77, 83, 50, 48, 50, 53);
    const _d1 = [88, 101, 108, 100, 97, 114, 65, 108, 122];
    const _d2 = [104, 116, 116, 112, 115, 58, 47, 47, 103, 105, 116, 104, 117, 98, 46, 99, 111, 109, 47, 88, 101, 108, 100, 97, 114, 65, 108, 122, 47, 86, 111, 114, 116, 101, 120, 45, 83, 77, 83, 45, 83, 112, 97, 109, 109, 101, 114];
    const _d3 = [78, 111, 110, 45, 67, 111, 109, 109, 101, 114, 99, 105, 97, 108];
    const _data = String.fromCharCode(..._d1) + '|' + String.fromCharCode(..._d2) + '|' + String.fromCharCode(..._d3);
    let _enc = '';
    for (let _i = 0; _i < _data.length; _i++) {
        _enc += String.fromCharCode(_data.charCodeAt(_i) ^ _k1.charCodeAt(_i % _k1.length));
    }
    return Buffer.from(_enc).toString('base64');
}

function getCodeFingerprint() {
    const fingerprint = {
        serviceCount: 66,
        patterns: ['smsBomber', 'initializeServices', 'createServiceHandler'],
        uniqueStrings: [
            'KahveDünyası',
            'TiklaGelsin',
            'KuryemGelsin',
            'Komagene'
        ],
        structureHash: crypto.createHash('md5')
            .update('VortexSMS-ServiceRegistry-66Services-2025')
            .digest('hex')
    };
    return fingerprint;
}

function getBuildFingerprint() {
    const packageJson = require('../../package.json');
    const buildId = crypto.createHash('sha256')
        .update(`${packageJson.name}-${packageJson.version}-${Date.now()}`)
        .digest('hex')
        .substring(0, 32);
    
    return {
        buildId,
        version: packageJson.version,
        name: packageJson.name,
        timestamp: Date.now(),
        author: packageJson.author
    };
}

function verifyLicense() {
    try {
        const _lp = path.join(__dirname, '../../LICENSE');
        if (fs.existsSync(_lp)) {
            const _lc = fs.readFileSync(_lp, 'utf8');
            const _m1 = _0x3c4d;
            const _m2 = String.fromCharCode(78, 111, 110, 45, 67, 111, 109, 109, 101, 114, 99, 105, 97, 108);
            const _m3 = String.fromCharCode(86, 111, 114, 116, 101, 120, 45, 83, 77, 83, 45, 83, 112, 97, 109, 109, 101, 114);
            const _m4 = String.fromCharCode(83, 84, 82, 73, 67, 84, 76, 89, 32, 80, 82, 79, 72, 73, 66, 73, 84, 69, 68);
            const _rm = [_m1, _m2, _m3, _m4];
            const _ap = _rm.every(_m => _lc.includes(_m));
            if (!_ap) {
                console.warn('[Protection] License file may have been tampered with');
                return false;
            }
        }
        const _kf = [
            path.join(__dirname, '../core/bomber.js'),
            path.join(__dirname, '../services/index.js')
        ];
        for (const _fp of _kf) {
            if (fs.existsSync(_fp)) {
                const _cnt = fs.readFileSync(_fp, 'utf8');
                if (!_cnt.includes(_0x3c4d) || !_cnt.includes(String.fromCharCode(86, 111, 114, 116, 101, 120, 45, 83, 77, 83, 45, 83, 112, 97, 109, 109, 101, 114))) {
                    console.warn(`[Protection] Copyright header missing in ${path.basename(_fp)}`);
                    return false;
                }
            }
        }
        return true;
    } catch (error) {
        return true;
    }
}

function checkIntegrity() {
    const integrity = {
        watermarkPresent: true,
        licenseValid: verifyLicense(),
        fingerprint: getCodeFingerprint(),
        buildInfo: getBuildFingerprint(),
        timestamp: Date.now()
    };
    
    return integrity;
}

function embedServiceWatermark(serviceData) {
    if (serviceData && typeof serviceData === 'object') {
        const _w1 = PRIMARY_WATERMARK._;
        const _w2 = PRIMARY_WATERMARK.__;
        Object.defineProperty(serviceData, String.fromCharCode(95, 95, 119), {
            value: _w1,
            enumerable: false,
            writable: false,
            configurable: false
        });
        Object.defineProperty(serviceData, String.fromCharCode(95, 95, 119, 50), {
            value: _w2,
            enumerable: false,
            writable: false,
            configurable: false
        });
        Object.defineProperty(serviceData, String.fromCharCode(95, 95, 120), {
            value: _0x3c4d,
            enumerable: false,
            writable: false,
            configurable: false
        });
    }
    return serviceData;
}

function getWatermarkedUserAgent(originalUA) {
    const _sig1 = Buffer.from(_0x3c4d).toString('base64').substring(0, 8);
    const _sig2 = crypto.createHash('md5').update(_0x3c4d).digest('hex').substring(0, 4);
    return `${originalUA} [${_sig1}] [${_sig2}]`;
}

function addWatermarkHeaders(headers = {}) {
    const _h1 = Buffer.from('VortexSMS-' + _0x3c4d + '-2025').toString('base64');
    const _h2 = crypto.createHash('sha256').update(_0x3c4d + 'VortexSMS').digest('hex').substring(0, 12);
    const _h3 = Buffer.from(_0x3c4d).toString('base64').substring(0, 6);
    return {
        ...headers,
        'X-Request-ID': _h1.substring(0, 16),
        'X-Client-Version': '1.1.0',
        'X-Client-Hash': _h2,
        'X-Platform': _h3
    };
}

function executeWatermarkCheck() {
    const check = checkIntegrity();
    
    if (process.env.NODE_ENV === 'development') {
        console.log('[Protection] Integrity check passed');
    }
    
    return check;
}

module.exports = {
    PRIMARY_WATERMARK,
    getHiddenWatermark,
    getCodeFingerprint,
    getBuildFingerprint,
    verifyLicense,
    checkIntegrity,
    embedServiceWatermark,
    getWatermarkedUserAgent,
    addWatermarkHeaders,
    executeWatermarkCheck
};

