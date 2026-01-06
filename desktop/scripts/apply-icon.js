const { rcedit } = require('rcedit');
const path = require('path');

async function applyIcon(context) {
    const exePath = path.join(context.appOutDir, `${context.packager.appInfo.productFilename}.exe`);
    const iconPath = path.join(__dirname, '..', 'assets', 'icon.ico');
    
    console.log(`Applying icon to: ${exePath}`);
    
    await rcedit(exePath, {
        icon: iconPath
    });
    
    console.log('Icon applied successfully');
}

module.exports = applyIcon;

