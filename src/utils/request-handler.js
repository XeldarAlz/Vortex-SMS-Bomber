const axios = require('axios');
const { logSuccess, logFailure } = require('./logger');

const DEFAULT_TIMEOUT_MS = 6000;
const DEFAULT_SUCCESS_CODES = [200, 201, 202, 204, 205];

let fakerInstance = null;
function getFaker() {
    if (!fakerInstance) {
        fakerInstance = global.faker || require('@faker-js/faker').faker;
    }
    return fakerInstance;
}

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
        if (stats.finished || stats.success >= stats.amount) {
            return;
        }

        stats.total++;

        const processedUrl = processUrl(config.url, phone);
        const headers = config.headers ? { ...config.headers } : {};

        const axiosConfig = {
            method: config.method || 'POST',
            url: processedUrl,
            timeout: config.timeout || DEFAULT_TIMEOUT_MS,
            headers,
            validateStatus: (status) => {
                const successCodes = config.successCodes || DEFAULT_SUCCESS_CODES;
                return successCodes.includes(status);
            }
        };

        if (config.verify !== undefined) {
            axiosConfig.httpsAgent = { rejectUnauthorized: config.verify };
        }

        if (config.json !== undefined) {
            if (typeof config.json === 'function') {
                axiosConfig.data = config.json(phone, getFaker());
            } else {
                axiosConfig.data = config.json;
            }
            if (!axiosConfig.headers['Content-Type']) {
                axiosConfig.headers['Content-Type'] = 'application/json';
            }
        }

        if (config.form !== undefined) {
            const formData = typeof config.form === 'function' 
                ? config.form(phone, getFaker()) 
                : config.form;
            
            const params = new URLSearchParams();
            for (const key in formData) {
                params.append(key, formData[key]);
            }
            axiosConfig.data = params.toString();
            axiosConfig.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }

        if (config.data !== undefined) {
            if (typeof config.data === 'function') {
                axiosConfig.data = config.data(phone, getFaker());
            } else {
                axiosConfig.data = config.data;
            }
            if (typeof axiosConfig.data === 'string' && !axiosConfig.headers['Content-Type']) {
                axiosConfig.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            }
        }

        axios(axiosConfig)
            .then(() => {
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
            .catch(() => {
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
