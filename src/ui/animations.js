/**
 * VortexSMS - Animations Module
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

const colors = {
    primary: '#00ff88',
    secondary: '#00d4ff',
    accent: '#ff00ff',
    success: '#00ff88',
    warning: '#ffaa00',
    error: '#ff4444',
    info: '#00d4ff'
};

function gradient(text, colors) {
    const gradientColors = colors || ['#00ff88', '#00d4ff', '#ff00ff'];
    const steps = gradientColors.length;
    let result = '';
    
    for (let i = 0; i < text.length; i++) {
        const colorIndex = Math.floor((i / text.length) * (steps - 1));
        const color1 = hexToRgb(gradientColors[colorIndex]);
        const color2 = hexToRgb(gradientColors[Math.min(colorIndex + 1, steps - 1)]);
        const ratio = (i / text.length) % (1 / (steps - 1)) * (steps - 1);
        const r = Math.round(color1.r + (color2.r - color1.r) * ratio);
        const g = Math.round(color1.g + (color2.g - color1.g) * ratio);
        const b = Math.round(color1.b + (color2.b - color1.b) * ratio);
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

function loadingAnimation(text, duration = 3000) {
    return new Promise((resolve) => {
        const frames = [
            '⠋', '⠙', '⠹', '⠸', '⠼', '⠴', 
            '⠦', '⠧', '⠇', '⠏', '⠛', '⠟'
        ];
        
        const modernFrames = ['◐', '◓', '◑', '◒'];
        
        let i = 0;
        const startTime = Date.now();
        
        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const frameIndex = Math.floor(i / 3) % modernFrames.length;
            const frame = modernFrames[frameIndex];
            
            const intensity = Math.sin(elapsed / 200) * 0.3 + 0.7;
            const r = Math.round(0 * intensity);
            const g = Math.round(255 * intensity);
            const b = Math.round(136 * intensity);
            
            const barWidth = 30;
            const filled = Math.floor(progress * barWidth);
            const bar = '█'.repeat(filled) + '░'.repeat(barWidth - filled);
            const percentage = Math.floor(progress * 100);
            
            process.stdout.write(
                `\r${chalk.rgb(r, g, b).bold(frame)} ` +
                `${chalk.hex(colors.info)(text)} ` +
                `${chalk.hex(colors.accent)('[')}` +
                `${chalk.hex(colors.primary)(bar)}` +
                `${chalk.hex(colors.accent)('] ')}` +
                `${chalk.hex(colors.accent).bold(percentage + '%')}`
            );
            
            i++;
            
            if (elapsed >= duration) {
                clearInterval(interval);
                process.stdout.write(
                    `\r${chalk.hex(colors.success).bold('✓')} ` +
                    `${chalk.hex(colors.info)(text)} ` +
                    `${chalk.hex(colors.accent)('[')}` +
                    `${chalk.hex(colors.primary)('█'.repeat(barWidth))}` +
                    `${chalk.hex(colors.accent)('] ')}` +
                    `${chalk.hex(colors.success).bold('100% COMPLETE')}\n`
                );
                resolve();
            }
        }, 50);
    });
}

function typeWriter(text, delay = 30) {
    return new Promise((resolve) => {
        let i = 0;
        const interval = setInterval(() => {
            const char = text[i];
            const progress = i / text.length;
            
            const r = Math.round(0 + (255 * progress * 0.3));
            const g = Math.round(255 - (100 * progress));
            const b = Math.round(136 + (119 * progress));
            
            process.stdout.write(chalk.rgb(r, g, b)(char));
            i++;
            
            if (i >= text.length) {
                clearInterval(interval);
                console.log('');
                resolve();
            }
        }, delay);
    });
}

function matrixRain(lines = 1) {
    const matrix = "01█▓▒░";
    const modernChars = "█▓▒░▄▀■□▪▀▄";
    
    for (let line = 0; line < lines; line++) {
        let output = "";
        const width = 80;
        
        for (let i = 0; i < width; i++) {
            const char = modernChars[Math.floor(Math.random() * modernChars.length)];
            const rand = Math.random();
            
            if (rand > 0.85) {
                output += chalk.rgb(0, 255, 136).bold(char);
            } else if (rand > 0.70) {
                output += chalk.rgb(0, 212, 255)(char);
            } else if (rand > 0.55) {
                output += chalk.rgb(0, 200, 120)(char);
            } else if (rand > 0.40) {
                output += chalk.rgb(0, 150, 200)(char);
            } else {
                output += chalk.rgb(0, 100, 50).dim(char);
            }
        }
        
        console.log(output);
    }
}

function pulseText(text, colors = ['#00ff88', '#00d4ff']) {
    const interval = setInterval(() => {
        const time = Date.now() / 1000;
        const intensity = Math.sin(time * 2) * 0.5 + 0.5;
        
        const color1 = hexToRgb(colors[0]);
        const color2 = hexToRgb(colors[1]);
        
        const r = Math.round(color1.r + (color2.r - color1.r) * intensity);
        const g = Math.round(color1.g + (color2.g - color1.g) * intensity);
        const b = Math.round(color1.b + (color2.b - color1.b) * intensity);
        
        process.stdout.write(`\r${chalk.rgb(r, g, b).bold(text)}`);
    }, 50);
    
    return interval;
}

function progressBar(current, total, label = 'Progress', width = 40) {
    const percentage = Math.min((current / total) * 100, 100);
    const filled = Math.floor((current / total) * width);
    const empty = width - filled;
    
    const bar = 
        chalk.hex(colors.primary)('█'.repeat(filled)) +
        chalk.hex('#333333')('░'.repeat(empty));
    
    const percentText = percentage.toFixed(1) + '%';
    
    return `${chalk.hex(colors.info)(label)}: ${bar} ${chalk.hex(colors.accent).bold(percentText)}`;
}

function animateBorder(text, color = colors.primary, speed = 100) {
    const frames = ['┌', '┐', '└', '┘', '│', '─', '╔', '╗', '╚', '╝', '║', '═'];
    
    return new Promise((resolve) => {
        let i = 0;
        const interval = setInterval(() => {
            const frame = frames[i % frames.length];
            const border = frame.repeat(Math.floor(80 / frame.length));
            
            console.clear();
            console.log(chalk.hex(color)(border));
            console.log(text);
            console.log(chalk.hex(color)(border));
            
            i++;
            
            if (i >= 20) {
                clearInterval(interval);
                resolve();
            }
        }, speed);
    });
}

module.exports = { 
    loadingAnimation, 
    typeWriter, 
    matrixRain,
    gradient,
    pulseText,
    progressBar,
    animateBorder,
    colors
};
