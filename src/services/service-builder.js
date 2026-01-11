/**
 * VortexSMS - Service Builder
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

const { faker, randomPassword, randomFullName, randomFirstName, randomLastName, randomGender, randomGenderTR, randomBirthDate, randomDeviceId, randomCarPlate, randomDeviceInfo } = require('./helpers');

class ServiceBuilder {
    constructor(serviceName) {
        this.config = {
            serviceName: serviceName,
            method: 'POST',
            successCodes: [200],
            timeout: 6000
        };
    }

    url(url) {
        this.config.url = url;
        return this;
    }

    method(method) {
        this.config.method = method;
        return this;
    }

    timeout(timeout) {
        this.config.timeout = timeout;
        return this;
    }

    successCodes(codes) {
        this.config.successCodes = Array.isArray(codes) ? codes : [codes];
        return this;
    }

    headers(headers) {
        this.config.headers = headers;
        return this;
    }

    addHeaders(headers) {
        this.config.headers = { ...(this.config.headers || {}), ...headers };
        return this;
    }

    json(payload) {
        this.config.json = payload;
        return this;
    }

    form(payload) {
        this.config.form = payload;
        return this;
    }

    data(payload) {
        this.config.data = payload;
        return this;
    }

    build() {
        return this.config;
    }

    static webHeaders(origin, referer) {
        return {
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:135.0) Gecko/20100101 Firefox/135.0',
            Accept: 'application/json, text/plain, */*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9',
            'Content-Type': 'application/json',
            Origin: origin,
            Referer: referer || origin,
            Dnt: '1',
            'Sec-Gpc': '1',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': origin ? 'same-origin' : 'cross-site',
            Priority: 'u=0',
            Te: 'trailers',
            Connection: 'keep-alive'
        };
    }

    static iosHeaders(appName, version, cfNetwork = '1335.0.3.4', darwin = '21.6.0') {
        const deviceInfo = randomDeviceInfo();
        return {
            'User-Agent': `${appName}/${version} CFNetwork/${cfNetwork} Darwin/${darwin}`,
            'Content-Type': 'application/json',
            Accept: '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9',
            'X-Device-Platform': 'IOS',
            'X-Device-Model': deviceInfo['X-Device-Model'],
            'X-Device-Platform-Version': deviceInfo['X-Device-Platform-Version'],
            'Os-Version': deviceInfo['Os-Version'],
            Os: 'ios',
            'OsSystem': deviceInfo.OsSystem
        };
    }

    static jsonHeaders() {
        return {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        };
    }

    static formHeaders() {
        return {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            Accept: 'application/json'
        };
    }

    static phonePayload(phoneKey = 'phone', format = 'default') {
        return (phone) => {
            let formattedPhone = phone;
            if (format === 'withZero') formattedPhone = '0' + phone;
            if (format === 'withPlus90') formattedPhone = '+90' + phone;
            if (format === 'with90') formattedPhone = '90' + phone;
            
            return { [phoneKey]: formattedPhone };
        };
    }

    static phoneWithCountryCode(phoneKey = 'phoneNumber', countryCodeKey = 'countryCode', countryCode = '90') {
        return (phone) => ({
            [phoneKey]: phone,
            [countryCodeKey]: countryCode
        });
    }

    static registrationPayload(options = {}) {
        const {
            phoneKey = 'phone',
            phoneFormat = 'default',
            includeEmail = false,
            includePassword = false,
            includeName = false,
            includeBirthDate = false,
            includeGender = false
        } = options;

        return (phone) => {
            const payload = {};
            
            let formattedPhone = phone;
            if (phoneFormat === 'withZero') formattedPhone = '0' + phone;
            if (phoneFormat === 'withPlus90') formattedPhone = '+90' + phone;
            if (phoneFormat === 'with90') formattedPhone = '90' + phone;
            payload[phoneKey] = formattedPhone;

            if (includeEmail) payload.email = faker.internet.email();
            if (includePassword) payload.password = randomPassword();
            if (includeName) {
                payload.firstName = randomFirstName();
                payload.lastName = randomLastName();
            }
            if (includeBirthDate) payload.dateOfBirth = randomBirthDate('iso');
            if (includeGender) payload.gender = randomGender();

            return payload;
        };
    }

    static graphqlPayload(operationName, query, variablesBuilder) {
        return (phone) => ({
            operationName: operationName,
            query: query,
            variables: variablesBuilder(phone)
        });
    }

    static simple(serviceName, url, phoneKey = 'phone', phoneFormat = 'default') {
        return new ServiceBuilder(serviceName)
            .url(url)
            .json(ServiceBuilder.phonePayload(phoneKey, phoneFormat))
            .build();
    }

    static web(serviceName, url, origin, payloadBuilder, options = {}) {
        const builder = new ServiceBuilder(serviceName)
            .url(url)
            .headers(ServiceBuilder.webHeaders(origin, options.referer))
            .json(payloadBuilder);

        if (options.timeout) builder.timeout(options.timeout);
        if (options.successCodes) builder.successCodes(options.successCodes);

        return builder.build();
    }

    static ios(serviceName, url, appName, version, payloadBuilder, options = {}) {
        const builder = new ServiceBuilder(serviceName)
            .url(url)
            .headers(ServiceBuilder.iosHeaders(appName, version, options.cfNetwork, options.darwin))
            .json(payloadBuilder);

        if (options.timeout) builder.timeout(options.timeout);
        if (options.successCodes) builder.successCodes(options.successCodes);
        if (options.additionalHeaders) builder.addHeaders(options.additionalHeaders);

        return builder.build();
    }

    static jsonApi(serviceName, url, payloadBuilder, options = {}) {
        const builder = new ServiceBuilder(serviceName)
            .url(url)
            .headers(ServiceBuilder.jsonHeaders())
            .json(payloadBuilder);

        if (options.timeout) builder.timeout(options.timeout);
        if (options.successCodes) builder.successCodes(options.successCodes);
        if (options.headers) builder.addHeaders(options.headers);

        return builder.build();
    }

    static form(serviceName, url, payloadBuilder, options = {}) {
        const builder = new ServiceBuilder(serviceName)
            .url(url)
            .headers(ServiceBuilder.formHeaders())
            .form(payloadBuilder);

        if (options.timeout) builder.timeout(options.timeout);
        if (options.successCodes) builder.successCodes(options.successCodes);
        if (options.headers) builder.addHeaders(options.headers);

        return builder.build();
    }
}

module.exports = ServiceBuilder;