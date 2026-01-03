const { faker } = require('@faker-js/faker');

function generateTCKimlik() {
    const digits = [];
    digits.push(Math.floor(Math.random() * 9) + 1);
    for (let i = 1; i < 9; i++) {
        digits.push(Math.floor(Math.random() * 10));
    }
    const digit10 = ((digits[0] + digits[2] + digits[4] + digits[6] + digits[8]) * 7 - 
                     (digits[1] + digits[3] + digits[5] + digits[7])) % 10;
    digits.push(digit10 < 0 ? digit10 + 10 : digit10);
    const digit11 = digits.reduce((sum, d) => sum + d, 0) % 10;
    digits.push(digit11);
    return digits.join('');
}

function randomEmail() {
    return faker.internet.email();
}

function randomFirstName() {
    return faker.person.firstName();
}

function randomLastName() {
    return faker.person.lastName();
}

function randomFullName() {
    return `${faker.person.firstName()} ${faker.person.lastName()}`;
}

function randomPassword() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    const special = '!@#$%&*';
    let password = '';
    for (let i = 0; i < 8; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    password += special.charAt(Math.floor(Math.random() * special.length));
    password += Math.floor(Math.random() * 100);
    return password;
}

function randomBirthDate(format = 'iso') {
    const year = 1970 + Math.floor(Math.random() * 35);
    const month = 1 + Math.floor(Math.random() * 12);
    const day = 1 + Math.floor(Math.random() * 28);
    
    const mm = String(month).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    
    if (format === 'iso') return `${year}-${mm}-${dd}`;
    if (format === 'tr') return `${dd}.${mm}.${year}`;
    if (format === 'us') return `${mm}/${dd}/${year}`;
    if (format === 'slash') return `${dd}/${mm}/${year}`;
    return { year, month, day };
}

function randomGender() {
    return Math.random() > 0.5 ? 'male' : 'female';
}

function randomGenderTR() {
    return Math.random() > 0.5 ? 'Erkek' : 'Kadın';
}

function randomDeviceId() {
    const hex = '0123456789ABCDEF';
    let id = '';
    const pattern = [8, 4, 4, 4, 12];
    pattern.forEach((len, idx) => {
        for (let i = 0; i < len; i++) {
            id += hex.charAt(Math.floor(Math.random() * 16));
        }
        if (idx < pattern.length - 1) id += '-';
    });
    return id;
}

function randomCarPlate() {
    const cities = ['01', '06', '07', '16', '26', '34', '35', '41', '42', '55'];
    const letters = 'ABCDEFGHJKLMNPRSTUVYZ';
    const city = cities[Math.floor(Math.random() * cities.length)];
    let plate = city + ' ';
    const letterCount = Math.random() > 0.5 ? 2 : 3;
    for (let i = 0; i < letterCount; i++) {
        plate += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    plate += ' ' + (100 + Math.floor(Math.random() * 900));
    return plate;
}

function randomIOSDeviceModel() {
    const models = [
        'iPhone 14',
        'iPhone 14 Plus',
        'iPhone 14 Pro',
        'iPhone 14 Pro Max',
        'iPhone 15',
        'iPhone 15 Plus',
        'iPhone 15 Pro',
        'iPhone 15 Pro Max',
        'iPhone 16',
        'iPhone 16 Plus',
        'iPhone 16 Pro',
        'iPhone 16 Pro Max'
    ];
    return models[Math.floor(Math.random() * models.length)];
}

function randomIOSVersion() {
    const major = Math.random() > 0.3 ? 17 : 18;
    const minor = Math.floor(Math.random() * 10);
    const patch = Math.floor(Math.random() * 10);
    return `${major}.${minor}.${patch}`;
}

function randomIOSDeviceInfo() {
    const model = randomIOSDeviceModel();
    const version = randomIOSVersion();
    const buildNumber = Math.floor(Math.random() * 100) + 1;
    
    return {
        model: model,
        version: version,
        majorVersion: version.split('.')[0],
        minorVersion: version.split('.')[1],
        patchVersion: version.split('.')[2],
        buildNumber: buildNumber,
        userAgent: `Mozilla/5.0 (iPhone; CPU iPhone OS ${version.replace(/\./g, '_')} like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148`,
        cfNetworkVersion: '1335.0.3',
        darwinVersion: '21.6.0'
    };
}

function randomDeviceInfo() {
    const deviceInfo = randomIOSDeviceInfo();
    return {
        model: deviceInfo.model,
        'X-Device-Model': deviceInfo.model,
        DeviceModel: deviceInfo.model,
        device_model: deviceInfo.model.replace(/\s/g, ','),
        version: deviceInfo.version,
        'X-Device-Platform-Version': deviceInfo.version,
        'Os-Version': deviceInfo.version,
        SystemVersion: deviceInfo.version,
        'X-Device-Platform': 'IOS',
        'X-App-Device': 'ios',
        Os: 'ios',
        OsSystem: 'IOS',
        Ostype: 'iOS',
        'X-Platform': 'ios',
        buildNumber: deviceInfo.buildNumber,
        userAgent: deviceInfo.userAgent,
        cfNetworkVersion: deviceInfo.cfNetworkVersion,
        darwinVersion: deviceInfo.darwinVersion
    };
}

module.exports = {
    faker,
    generateTCKimlik,
    randomEmail,
    randomFirstName,
    randomLastName,
    randomFullName,
    randomPassword,
    randomBirthDate,
    randomGender,
    randomGenderTR,
    randomDeviceId,
    randomCarPlate,
    randomIOSDeviceModel,
    randomIOSVersion,
    randomIOSDeviceInfo,
    randomDeviceInfo
};
