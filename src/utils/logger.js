const chalk = require('chalk');
const dayjs = require('dayjs');
const { t } = require('../locales');

const colors = {
    primary: '#00ff88',
    secondary: '#00d4ff',
    accent: '#ff00ff',
    success: '#00ff88',
    warning: '#ffaa00',
    error: '#ff4444',
    info: '#00d4ff',
    muted: '#888888'
};

function logSuccess(serviceName, phone) {
    const timestamp = chalk.hex(colors.muted).dim(`[${dayjs().format('HH:mm:ss')}]`);
    const hitBadge = chalk.hex(colors.success).bold(`🚀 [${t('status.hit')}]`);
    const serviceBadge = chalk.hex(colors.info)(`[${serviceName}]`);
    const target = chalk.hex('#ffffff')(`${t('status.target')}: +90${phone}`);
    const status = chalk.hex(colors.success).bold(`✅ ${t('status.deployed')}`);
    
    console.log(`${timestamp} ${hitBadge} ${serviceBadge} ${target} ${status}`);
}

function logFailure(serviceName, phone) {
    const timestamp = chalk.hex(colors.muted).dim(`[${dayjs().format('HH:mm:ss')}]`);
    const missBadge = chalk.hex(colors.error).bold(`💥 [${t('status.miss')}]`);
    const serviceBadge = chalk.hex(colors.info)(`[${serviceName}]`);
    const target = chalk.hex('#ffffff')(`${t('status.target')}: +90${phone}`);
    const status = chalk.hex(colors.error).bold(`❌ ${t('status.failed')}`);
    
    console.log(`${timestamp} ${missBadge} ${serviceBadge} ${target} ${status}`);
}

function logMissionStart(phone, amount, delay = 0) {
    const timestamp = chalk.hex(colors.muted).dim(`[${dayjs().format('HH:mm:ss')}]`);
    const bomberBadge = chalk.hex(colors.accent).bold(`🎯 [${t('labels.bomber')}]`);
    const delayInfo = delay > 0 ? ` (${delay}s ${t('labels.delay').toLowerCase()})` : ` (${t('status.noDelay')})`;
    const message = chalk.hex(colors.warning)(`${t('status.deploying').replace('{amount}', amount).replace('{phone}', phone)}${delayInfo}`);
    
    console.log(`${timestamp} ${bomberBadge} ${message}`);
}

function logMissionComplete(stats) {
    const separator = chalk.hex(colors.secondary)('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    const successRate = stats.total > 0 ? ((stats.success / stats.total) * 100).toFixed(2) : '0.00';
    
    console.log('\n' + separator);
    console.log(chalk.hex(colors.success).bold(`🏆 ${t('results.missionComplete').toUpperCase()} 🏆`));
    console.log(separator);
    
    const totalDeployed = chalk.hex(colors.info).bold(`📊 ${t('results.totalAttempts')}:`) + chalk.hex('#ffffff')(` ${stats.total}`);
    const successful = chalk.hex(colors.success).bold(`✅ ${t('results.successful')}:`) + chalk.hex('#ffffff')(` ${stats.success}`);
    const failed = chalk.hex(colors.error).bold(`❌ ${t('results.failed')}:`) + chalk.hex('#ffffff')(` ${stats.error}`);
    
    let rateColor = colors.success;
    if (successRate < 30) rateColor = colors.error;
    else if (successRate < 60) rateColor = colors.warning;
    
    const rate = chalk.hex(colors.warning).bold(`🎯 ${t('results.successRate')}:`) + chalk.hex(rateColor).bold(` ${successRate}%`);
    
    console.log(totalDeployed);
    console.log(successful);
    console.log(failed);
    console.log(rate);
    console.log(separator + '\n');
}

function logError(error) {
    console.error(chalk.hex(colors.error).bold(`💀 [${t('labels.error')}]`), error);
}

module.exports = {
    logSuccess,
    logFailure,
    logMissionStart,
    logMissionComplete,
    logError
};
