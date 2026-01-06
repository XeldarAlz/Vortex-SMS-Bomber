/**
 * VortexSMS - Request Handler
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

const axios = require('axios');
const FormData = require('form-data');
const { logSuccess, logFailure } = require('./logger');
const { addWatermarkHeaders, getWatermarkedUserAgent } = require('./protection');

function processUrl(url, phone) {
    if (typeof url === 'function') {
        return url(phone);
    }
    if (typeof url === 'string') {
        return url.replace(/{phone}/g, phone);
    }
    return url;
}

function createServiceHandler(config, onLog) {
    return function(phone, stats, systemFinished) {
        if (stats.success >= stats.amount) {
            return systemFinished();
        }

        stats.total++;

        const processedUrl = processUrl(config.url, phone);

        let headers = config.headers || {};
        
        if (headers['User-Agent']) {
            headers['User-Agent'] = getWatermarkedUserAgent(headers['User-Agent']);
        }
        
        headers = addWatermarkHeaders(headers);
        
        const axiosConfig = {
            method: config.method || 'POST',
            url: processedUrl,
            timeout: config.timeout || 6000,
            validateStatus: function(status) {
                const successCodes = config.successCodes || [200, 201, 202, 204, 205];
                return successCodes.includes(status);
            },
            headers: headers,
            ...(config.verify !== undefined && { httpsAgent: { rejectUnauthorized: config.verify } })
        };

        if (config.json !== undefined) {
            if (typeof config.json === 'function') {
                const faker = global.faker || require('@faker-js/faker').faker;
                axiosConfig.data = config.json(phone, faker);
            } else {
                axiosConfig.data = config.json;
            }
            if (!axiosConfig.headers) {
                axiosConfig.headers = {};
            }
            if (!axiosConfig.headers['Content-Type']) {
                axiosConfig.headers['Content-Type'] = 'application/json';
            }
        }

        if (config.form !== undefined) {
            if (typeof config.form === 'function') {
                const faker = global.faker || require('@faker-js/faker').faker;
                const formData = config.form(phone, faker);
                const params = new URLSearchParams();
                for (const key in formData) {
                    params.append(key, formData[key]);
                }
                axiosConfig.data = params.toString();
                if (!axiosConfig.headers) {
                    axiosConfig.headers = {};
                }
                axiosConfig.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            } else {
                const params = new URLSearchParams();
                for (const key in config.form) {
                    params.append(key, config.form[key]);
                }
                axiosConfig.data = params.toString();
                if (!axiosConfig.headers) {
                    axiosConfig.headers = {};
                }
                axiosConfig.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            }
        }

        if (config.data !== undefined) {
            if (typeof config.data === 'function') {
                const faker = global.faker || require('@faker-js/faker').faker;
                axiosConfig.data = config.data(phone, faker);
            } else {
                axiosConfig.data = config.data;
            }
            if (!axiosConfig.headers) {
                axiosConfig.headers = {};
            }
            if (typeof axiosConfig.data === 'string' && !axiosConfig.headers['Content-Type']) {
                axiosConfig.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            }
        }

        axios(axiosConfig)
            .then(response => {
                if (stats.finished) return;
                stats.success++;
                
                if (onLog) {
                    onLog({
                        type: 'success',
                        service: config.serviceName,
                        phone: phone
                    });
                } else {
                    logSuccess(config.serviceName, phone);
                }
                
                if (stats.success >= stats.amount) {
                    systemFinished();
                }
            })
            .catch(error => {
                if (stats.finished) return;
                stats.error++;
                
                if (onLog) {
                    onLog({
                        type: 'failure',
                        service: config.serviceName,
                        phone: phone
                    });
                } else {
                    logFailure(config.serviceName, phone);
                }
            });
    };
}

module.exports = {
    createServiceHandler,
    processUrl
};
