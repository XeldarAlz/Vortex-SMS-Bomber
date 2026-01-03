const packageJson = require('../../package.json');

function console_title(x) {
    const version = packageJson.version;
    const author = packageJson.author;
    const homepage = packageJson.homepage;
    const title = `VortexSMS v${version} - Made by ${author} | ${homepage}`;
    
    if (process.platform == 'win32') {
        process.title = title;
    } else {
        process.stdout.write('\x1b]2;' + title + '\x1b\x5c');
    }
}

module.exports = console_title;