/**
 * VortexSMS - UI Banner Module
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

const chalk = require('chalk');
const { t } = require('../locales');
const packageJson = require('../../package.json');

const palette = {
    primary: '#00ff88',
    secondary: '#00d4ff',
    accent: '#ff00ff',
    success: '#00ff88',
    warning: '#ffaa00',
    error: '#ff4444',
    info: '#00d4ff',
    bgDark: '#0a0a0a',
    bgLight: '#1a1a1a'
};

function hexColor(hex) {
    return (text) => chalk.hex(hex)(text);
}

function gradientText(text, startColor, endColor) {
    const start = hexToRgb(startColor);
    const end = hexToRgb(endColor);
    let result = '';
    
    for (let i = 0; i < text.length; i++) {
        const ratio = i / text.length;
        const r = Math.round(start.r + (end.r - start.r) * ratio);
        const g = Math.round(start.g + (end.g - start.g) * ratio);
        const b = Math.round(start.b + (end.b - start.b) * ratio);
        result += chalk.rgb(r, g, b)(text[i]);
    }
    return result;
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 0, g: 255, b: 136 };
}

function getDisplayWidth(str) {
    const cleanStr = str.replace(/\u001b\[[0-9;]*m/g, '');
    let width = 0;
    
    for (const char of cleanStr) {
        const code = char.codePointAt(0);
        if (code === 0xFE0F || code === 0x200D) {
            continue;
        }
        if (code >= 0x1F300 ||
            (code >= 0x2600 && code <= 0x26FF) ||
            (code >= 0x2700 && code <= 0x27BF) ||
            (code >= 0x231A && code <= 0x231B) ||
            (code >= 0x23E9 && code <= 0x23F3)) {
            width += 2;
        } else {
            width += 1;
        }
    }
    return width;
}

function centerText(text, width = 77) {
    const textLength = getDisplayWidth(text);
    const padding = Math.max(0, Math.floor((width - textLength) / 2));
    return ' '.repeat(padding) + text;
}

function padLine(content, width = 75) {
    const visibleLength = content.replace(/\u001b\[[0-9;]*m/g, '').length;
    const padding = Math.max(0, width - visibleLength);
    return content + ' '.repeat(padding);
}

function printLanguageMenu() {
    const boxWidth = 50;
    const topBorder = chalk.hex(palette.secondary)('╔' + '═'.repeat(boxWidth - 2) + '╗');
    const bottomBorder = chalk.hex(palette.secondary)('╚' + '═'.repeat(boxWidth - 2) + '╝');
    const sideBorder = chalk.hex(palette.secondary)('║');
    const emptyLine = sideBorder + ' '.repeat(boxWidth - 2) + sideBorder;
    
    const title = '🌐 SELECT LANGUAGE / DİL SEÇİN 🌐';
    const titlePadded = padLine('  ' + gradientText(title, palette.accent, palette.secondary), boxWidth - 2);
    
    console.log(topBorder);
    console.log(emptyLine);
    console.log(sideBorder + titlePadded + sideBorder);
    console.log(emptyLine);
    console.log(bottomBorder);
}

function printBanner() {
    console.clear();
    
    const banner = `
${centerText(gradientText('██╗   ██╗ ██████╗ ██████╗ ████████╗███████╗██╗  ██╗', palette.primary, palette.accent), 77)}
${centerText(gradientText('██║   ██║██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝╚██╗██╔╝', palette.primary, palette.accent), 77)}
${centerText(gradientText('██║   ██║██║   ██║██████╔╝   ██║   █████╗   ╚███╔╝ ', palette.primary, palette.accent), 77)}
${centerText(gradientText('╚██╗ ██╔╝██║   ██║██╔══██╗   ██║   ██╔══╝   ██╔██╗ ', palette.primary, palette.accent), 77)}
${centerText(gradientText(' ╚████╔╝ ╚██████╔╝██║  ██║   ██║   ███████╗██╔╝ ██╗', palette.primary, palette.accent), 77)}
${centerText(gradientText('  ╚═══╝   ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝', palette.primary, palette.accent), 77)}

${centerText(gradientText('███████╗███╗   ███╗███████╗', palette.accent, palette.secondary), 77)}
${centerText(gradientText('██╔════╝████╗ ████║██╔════╝', palette.accent, palette.secondary), 77)}
${centerText(gradientText('███████╗██╔████╔██║███████╗', palette.accent, palette.secondary), 77)}
${centerText(gradientText('╚════██║██║╚██╔╝██║╚════██║', palette.accent, palette.secondary), 77)}
${centerText(gradientText('███████║██║ ╚═╝ ██║███████║', palette.accent, palette.secondary), 77)}
${centerText(gradientText('╚══════╝╚═╝     ╚═╝╚══════╝', palette.accent, palette.secondary), 77)}

${centerText(gradientText('██████╗  ██████╗ ███╗   ███╗██████╗ ███████╗██████╗ ', palette.primary, palette.accent), 77)}
${centerText(gradientText('██╔══██╗██╔═══██╗████╗ ████║██╔══██╗██╔════╝██╔══██╗', palette.primary, palette.accent), 77)}
${centerText(gradientText('██████╔╝██║   ██║██╔████╔██║██████╔╝█████╗  ██████╔╝', palette.primary, palette.accent), 77)}
${centerText(gradientText('██╔══██╗██║   ██║██║╚██╔╝██║██╔══██╗██╔══╝  ██╔══██╗', palette.primary, palette.accent), 77)}
${centerText(gradientText('██████╔╝╚██████╔╝██║ ╚═╝ ██║██████╔╝███████╗██║  ██║', palette.primary, palette.accent), 77)}
${centerText(gradientText('╚═════╝  ╚═════╝ ╚═╝     ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝', palette.primary, palette.accent), 77)}
    `;
    
    console.log(banner);
    
    const title = '━'.repeat(77);
    const version = packageJson.version;
    const author = packageJson.author;
    const homepage = packageJson.homepage;
    const versionText = `⚡ VORTEX SMS BOMBER V${version} ⚡`;
    const authorText = `⚔️  Developed by ${author} ⚔️`;
    const githubText = `🌐 ${homepage} 🌐`;
    
    console.log(centerText(gradientText(versionText, palette.accent, palette.secondary), 77));
    console.log(centerText(chalk.hex(palette.info)(authorText), 77));
    console.log(centerText(chalk.hex(palette.warning).dim(githubText), 77));
    console.log(chalk.hex(palette.primary).dim(title));
    console.log('');
    console.log(chalk.hex(palette.error).bold(`    ⚠️  ${t('banner.warning')} ⚠️`));
    console.log(chalk.hex(palette.warning).bold(`    🔥 ${t('banner.disclaimer')} 🔥`));
    console.log('');
}

function printSeparatorLine() {
    const chars = ['█', '▓', '▒', '░', '▄', '▀', '■', '□', '▪', '◢', '◣', '◤', '◥', '▬', '▭', '▮', '▯'];
    let line = '';
    const width = 75;
    
    for (let i = 0; i < width; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const rand = Math.random();
        
        if (rand > 0.85) {
            line += chalk.hex(palette.primary).bold(char);
        } else if (rand > 0.70) {
            line += chalk.hex(palette.secondary)(char);
        } else if (rand > 0.55) {
            line += chalk.hex(palette.accent)(char);
        } else if (rand > 0.40) {
            line += chalk.hex(palette.info)(char);
        } else if (rand > 0.25) {
            line += chalk.hex('#006644').dim(char);
        } else {
            line += chalk.hex('#003322').dim(char);
        }
    }
    
    console.log(line);
}

function printStats(phone, amount, delay = 0) {
    const top = chalk.hex(palette.secondary)('╔' + '═'.repeat(75) + '╗');
    const bottom = chalk.hex(palette.secondary)('╚' + '═'.repeat(75) + '╝');
    const side = chalk.hex(palette.secondary)('║');
    const divider = chalk.hex(palette.secondary)('╠' + '═'.repeat(75) + '╣');
    
    console.log('');
    console.log(top);
    console.log(side + padLine(gradientText('                      ' + t('banner.operationParams') + '                       ', palette.accent, palette.secondary)) + side);
    console.log(divider);
    
    const targetLabel = chalk.hex(palette.info)('  ' + t('banner.targetIdentifier') + ':');
    const targetValue = chalk.hex(palette.primary).bold(` +90${phone}`);
    console.log(side + padLine(targetLabel + targetValue) + side);
    
    const payloadLabel = chalk.hex(palette.info)('  ' + t('banner.payloadQuantity') + ':');
    const payloadValue = chalk.hex(palette.warning).bold(` ${amount} ${t('banner.smsBombs').toUpperCase()}`);
    console.log(side + padLine(payloadLabel + payloadValue) + side);
    
    const delayLabel = chalk.hex(palette.info)('  ' + t('banner.requestDelay') + ':');
    const delayValue = delay > 0 
        ? chalk.hex(palette.accent).bold(` ${delay} ${t('results.seconds').toUpperCase()}`)
        : chalk.hex(palette.success).bold(` ${t('banner.maxSpeed')}`);
    console.log(side + padLine(delayLabel + delayValue) + side);
    
    const protocolLabel = chalk.hex(palette.info)('  PROTOCOL:');
    const protocolValue = chalk.hex(palette.success).bold(' SMS BOMBARDMENT');
    console.log(side + padLine(protocolLabel + protocolValue) + side);
    
    const statusLabel = chalk.hex(palette.info)('  STATUS:');
    const statusValue = chalk.hex(palette.error).bold(' ⚡ PRIMED AND READY FOR DEPLOYMENT ⚡');
    console.log(side + padLine(statusLabel + statusValue) + side);
    
    console.log(bottom);
    console.log('');
    
    for (let i = 0; i < 2; i++) {
        printSeparatorLine();
    }
    console.log('');
}

module.exports = { printBanner, printLanguageMenu, printSeparatorLine, printStats, gradientText, palette };
