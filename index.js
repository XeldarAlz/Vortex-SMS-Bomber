const rl = require('readline-sync');
const chalk = require('chalk');
const title = require('./src/ui/title.js');
const vortexSMS = require('./src/core/bomber.js');
const { printBanner, printSeparatorLine, printStats, printLanguageMenu, palette } = require('./src/ui/banner.js');
const { loadingAnimation, typeWriter } = require('./src/ui/animations.js');
const { setLanguage, t, format, getAvailableLanguages } = require('./src/locales');

const { faker } = require('@faker-js/faker');
global.faker = faker;

async function selectLanguage() {
    console.clear();
    printLanguageMenu();
    
    const langs = getAvailableLanguages();
    console.log('\n');
    langs.forEach((lang, idx) => {
        console.log(chalk.cyan(`  [${idx + 1}] ${lang.name}`));
    });
    console.log('');
    
    const choice = rl.question(chalk.yellow('  -> '));
    const langIndex = parseInt(choice, 10) - 1;
    
    if (langIndex >= 0 && langIndex < langs.length) {
        setLanguage(langs[langIndex].code);
        return true;
    }
    
    setLanguage('en');
    return true;
}

async function main() {
    await selectLanguage();
    
    printBanner();
    
    await loadingAnimation(t('status.missionStarted').split(' ').slice(0, 3).join(' '), 2000);
    await loadingAnimation(t('banner.operationParams'), 1500);
    await loadingAnimation(t('labels.system'), 2000);
    
    console.log(chalk.hex(palette.success).bold(`\n[${t('labels.system')}] ${t('status.missionStarted').split('-')[0].trim()}\n`));
    
    const separator = chalk.hex(palette.secondary)('─'.repeat(70));
    console.log(separator);
    const phone = rl.question(chalk.hex(palette.error).bold('[TARGET] ') + chalk.hex(palette.info)(t('prompts.enterPhone') + ': '));
    
    const phonePattern = /^5\d{9}$/;
    if (phone.length !== 10 || !phonePattern.test(phone)) {
        console.log(chalk.hex(palette.error).bold(`[${t('labels.error')}] ${t('prompts.invalidPhone')}`));
        process.exit(1);
    }
    
    title('Target Acquired: ' + phone);
    
    console.log(separator);
    const amount = rl.question(chalk.hex(palette.warning).bold(`[${t('labels.payload')}] `) + chalk.hex(palette.info)(t('prompts.enterAmount') + ': '));
    
    if (isNaN(amount)) {
        console.log(chalk.hex(palette.error).bold(`[${t('labels.error')}] ${t('prompts.invalidNumber')}`));
        process.exit(1);
    }
    
    if (amount.length === 0) {
        console.log(chalk.hex(palette.error).bold(`[${t('labels.error')}] ${t('prompts.payloadRequired')}`));
        process.exit(1);
    }
    
    console.log(separator);
    const delayInput = rl.question(chalk.hex(palette.accent).bold(`[${t('labels.delay')}] `) + chalk.hex(palette.info)(t('prompts.enterDelay') + ': '));
    
    let delay = 0;
    if (delayInput.length > 0) {
        if (isNaN(delayInput)) {
            console.log(chalk.hex(palette.error).bold(`[${t('labels.error')}] ${t('prompts.invalidNumber')}`));
            process.exit(1);
        }
        delay = parseFloat(delayInput);
    }
    
    title(`Target: ${phone} - Payload: ${amount} - Delay: ${delay}s`);
    
    printStats(phone, amount, delay);
    
    console.log(chalk.hex(palette.accent).bold(t('status.missionStarted').split('-')[0].trim() + '...'));
    for (let i = 5; i > 0; i--) {
        const countdownColor = i <= 2 ? palette.error : palette.warning;
        console.log(chalk.hex(countdownColor).bold(`[${i}] ${i}...`));
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log(chalk.hex(palette.success).bold(t('status.missionStarted') + '\n'));
    
    await vortexSMS(phone, amount, delay);
}

main().catch(console.error);
