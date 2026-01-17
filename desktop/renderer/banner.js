import { colorSpan, gradientText } from './text.js';

export function createBanner({ palette, getLocale, terminal, getVersion }) {
    let fakeActivityInterval = null;
    let isShowingFakeActivity = false;

    async function showBanner() {
        terminal.clear();

        await showTitleBar();
        await terminal.enqueue('', 200);
        await showMainContent();
    }

    async function showTitleBar() {
        const vortexArt = `
           ${gradientText('██╗   ██╗ ██████╗ ██████╗ ████████╗███████╗██╗  ██╗', palette.primary, palette.accent)}
           ${gradientText('██║   ██║██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝╚██╗██╔╝', palette.primary, palette.accent)}
           ${gradientText('██║   ██║██║   ██║██████╔╝   ██║   █████╗   ╚███╔╝ ', palette.primary, palette.accent)}
           ${gradientText('╚██╗ ██╔╝██║   ██║██╔══██╗   ██║   ██╔══╝   ██╔██╗ ', palette.primary, palette.accent)}
           ${gradientText(' ╚████╔╝ ╚██████╔╝██║  ██║   ██║   ███████╗██╔╝ ██╗', palette.primary, palette.accent)}
           ${gradientText('  ╚═══╝   ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝', palette.primary, palette.accent)}

                        ${gradientText('███████╗███╗   ███╗███████╗', palette.accent, palette.secondary)}
                        ${gradientText('██╔════╝████╗ ████║██╔════╝', palette.accent, palette.secondary)}
                        ${gradientText('███████╗██╔████╔██║███████╗', palette.accent, palette.secondary)}
                        ${gradientText('╚════██║██║╚██╔╝██║╚════██║', palette.accent, palette.secondary)}
                        ${gradientText('███████║██║ ╚═╝ ██║███████║', palette.accent, palette.secondary)}
                        ${gradientText('╚══════╝╚═╝     ╚═╝╚══════╝', palette.accent, palette.secondary)}

      ${gradientText('██████╗  ██████╗ ███╗   ███╗██████╗ ███████╗██████╗ ', palette.primary, palette.accent)}
      ${gradientText('██╔══██╗██╔═══██╗████╗ ████║██╔══██╗██╔════╝██╔══██╗', palette.primary, palette.accent)}
      ${gradientText('██████╔╝██║   ██║██╔████╔██║██████╔╝█████╗  ██████╔╝', palette.primary, palette.accent)}
      ${gradientText('██╔══██╗██║   ██║██║╚██╔╝██║██╔══██╗██╔══╝  ██╔══██╗', palette.primary, palette.accent)}
      ${gradientText('██████╔╝╚██████╔╝██║ ╚═╝ ██║██████╔╝███████╗██║  ██║', palette.primary, palette.accent)}
      ${gradientText('╚═════╝  ╚═════╝ ╚═╝     ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝', palette.primary, palette.accent)}`;

        const artLines = vortexArt.split('\n').filter(line => line.trim());
        for (const line of artLines) {
            await terminal.enqueue(`<pre class="ascii-art" style="text-align: center; color: ${palette.secondary}">${line}</pre>`, 20);
        }
    }

    async function showMainContent() {
        const t = getLocale();
        const version = getVersion ? await getVersion() : '1.1.0';
        await terminal.enqueue(`<div style="text-align: center">${gradientText('⚡ VORTEX SMS BOMBER V' + version + ' ⚡', palette.accent, palette.secondary)}</div>`, 100);
        await terminal.enqueue(`<div style="text-align: center; color: ${palette.info}">⚔️  Developed by XeldarAlz ⚔️</div>`, 50);
        await terminal.enqueue(`<div style="text-align: center; color: ${palette.warning}; opacity: 0.7">🌐 github.com/XeldarAlz 🌐</div>`, 50);
        await terminal.enqueue(`<div style="color: ${palette.primary}; opacity: 0.5">${'━'.repeat(75)}</div>`, 100);

        await terminal.enqueue('', 200);
        await terminal.enqueue(`<span class="term-error term-bold">    ⚠️  ${t.banner.warning} ⚠️</span>`, 50);
        await terminal.enqueue(`<span class="term-warning term-bold">    🔥 ${t.banner.disclaimer} 🔥</span>`, 50);
        await terminal.enqueue('', 1000);

        startFakeActivity();
    }

    function getRandomHexCode() {
        const colors = ['00ff88', '00d4ff', 'ff00ff', '00d4ff'];
        return '0x' + colors[Math.floor(Math.random() * colors.length)].toUpperCase();
    }

    function startFakeActivity() {
        if (isShowingFakeActivity) return;
        isShowingFakeActivity = true;

        const t = getLocale();
        const randomMessages = [
            { text: t.banner.randomMessages[0], color: palette.primary },
            { text: t.banner.randomMessages[1], color: palette.secondary },
            { text: t.banner.randomMessages[2], color: palette.accent },
            { text: t.banner.randomMessages[3], color: palette.primary },
            { text: t.banner.randomMessages[4], color: palette.info },
            { text: t.banner.randomMessages[5], color: palette.secondary },
            { text: t.banner.randomMessages[6], color: palette.accent },
            { text: t.banner.randomMessages[7], color: palette.primary },
            { text: t.banner.randomMessages[8], color: palette.info },
            { text: t.banner.randomMessages[9], color: palette.secondary },
            { text: t.banner.randomMessages[10], color: palette.accent },
            { text: t.banner.randomMessages[11], color: palette.primary },
            { text: t.banner.randomMessages[12], color: palette.info },
            { text: t.banner.randomMessages[13], color: palette.secondary },
            { text: t.banner.randomMessages[14], color: palette.accent }
        ];

        const loadingMessages = [
            { text: t.banner.loadingMessages[0], color: palette.primary },
            { text: t.banner.loadingMessages[1], color: palette.secondary },
            { text: t.banner.loadingMessages[2], color: palette.accent },
            { text: t.banner.loadingMessages[3], color: palette.info },
            { text: t.banner.loadingMessages[4], color: palette.primary },
            { text: t.banner.loadingMessages[5], color: palette.secondary },
            { text: t.banner.loadingMessages[6], color: palette.accent },
            { text: t.banner.loadingMessages[7], color: palette.info },
            { text: t.banner.loadingMessages[8], color: palette.primary },
            { text: t.banner.loadingMessages[9], color: palette.secondary }
        ];

        let usedRandomIndices = [];
        let usedLoadingIndices = [];

        const showRandomMessage = () => {
            if (!isShowingFakeActivity) return;
            
            const availableIndices = randomMessages
                .map((_, idx) => idx)
                .filter(idx => !usedRandomIndices.includes(idx));
            
            if (availableIndices.length === 0) {
                showNextItem();
                return;
            }
            
            const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
            usedRandomIndices.push(randomIndex);
            const message = randomMessages[randomIndex];
            const hexCode = getRandomHexCode();
            const line = `    ${colorSpan('[', message.color, { bold: true })}${colorSpan(hexCode, palette.accent, { bold: true })}${colorSpan(']', message.color, { bold: true })} ${colorSpan(message.text, message.color)}`;
            terminal.enqueue(line);
            
            const delay = 1000 + Math.random() * 3000;
            if (isShowingFakeActivity) {
                fakeActivityInterval = setTimeout(showNextItem, delay);
            }
        };

        const showAnimatedLoadingBar = async (message) => {
            const hexCode = getRandomHexCode();
            const label = `[${getLocale().labels.system}]`;
            const barWidth = 40;
            const startProgress = Math.floor(Math.random() * 30) + 40;
            const endProgress = 100;
            const steps = 10;
            const progressStep = (endProgress - startProgress) / steps;
            const delayStep = 100;

            for (let step = 0; step <= steps; step++) {
                if (!isShowingFakeActivity) return;
                const currentProgress = Math.min(endProgress, Math.floor(startProgress + (progressStep * step)));
                const filledWidth = Math.floor((currentProgress / 100) * barWidth);
                const bar = colorSpan('█'.repeat(filledWidth), message.color) + colorSpan('░'.repeat(barWidth - filledWidth), palette.muted);
                
                const line = `    ${colorSpan(label, palette.info, { bold: true })} ` +
                    `${colorSpan(message.text + ': ', message.color)}` +
                    `${colorSpan('[', palette.accent)}${bar}${colorSpan('] ', palette.accent)}` +
                    `${colorSpan(currentProgress + '%', palette.success, { bold: true })}`;
                
                if (step === 0) {
                    await terminal.enqueue(line, delayStep);
                } else {
                    await new Promise(resolve => setTimeout(resolve, delayStep));
                    terminal.updateLastLine(line);
                }
            }
        };

        const showNextLoading = async () => {
            if (!isShowingFakeActivity) return;
            
            const availableIndices = loadingMessages
                .map((_, idx) => idx)
                .filter(idx => !usedLoadingIndices.includes(idx));
            
            if (availableIndices.length === 0) {
                showNextItem();
                return;
            }
            
            const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
            usedLoadingIndices.push(randomIndex);
            const message = loadingMessages[randomIndex];
            await showAnimatedLoadingBar(message);
            
            const delay = 1000 + Math.random() * 4000;
            if (isShowingFakeActivity) {
                fakeActivityInterval = setTimeout(showNextItem, delay);
            }
        };

        const showNextItem = () => {
            if (!isShowingFakeActivity) return;
            
            const hasUnusedRandom = usedRandomIndices.length < randomMessages.length;
            const hasUnusedLoading = usedLoadingIndices.length < loadingMessages.length;
            
            if (!hasUnusedRandom && !hasUnusedLoading) {
                stopFakeActivity();
                return;
            }
            
            if (!hasUnusedRandom) {
                showNextLoading();
                return;
            }
            
            if (!hasUnusedLoading) {
                showRandomMessage();
                return;
            }
            
            const useLoadingBar = Math.random() > 0.5;
            if (useLoadingBar) {
                showNextLoading();
            } else {
                showRandomMessage();
            }
        };

        fakeActivityInterval = setTimeout(showNextItem, 1000);
    }

    function stopFakeActivity() {
        isShowingFakeActivity = false;
        if (fakeActivityInterval) {
            clearTimeout(fakeActivityInterval);
            fakeActivityInterval = null;
        }
    }

    async function generateMatrixLine() {
        const chars = '█▓▒░▄▀■□▪◢◣◤◥▬▭▮▯';
        let line = '';
        const width = 75;

        for (let i = 0; i < width; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            const rand = Math.random();
            let color;

            if (rand > 0.85) color = palette.primary;
            else if (rand > 0.7) color = palette.secondary;
            else if (rand > 0.55) color = palette.accent;
            else if (rand > 0.4) color = palette.info;
            else if (rand > 0.25) color = '#006644';
            else color = '#003322';

            line += `<span style="color: ${color}">${char}</span>`;
        }

        return line;
    }

    async function showOperationParams({ phone, amount, delaySeconds }) {
        stopFakeActivity();

        const t = getLocale();

        await terminal.enqueue('');
        await terminal.enqueue(`<span style="color: ${palette.secondary}">╔${'═'.repeat(73)}╗</span>`);
        await terminal.enqueue(`<span style="color: ${palette.secondary}">║</span>${gradientText('                      ' + t.banner.operationParams + '                       ', palette.accent, palette.secondary)}<span style="color: ${palette.secondary}">║</span>`);
        await terminal.enqueue(`<span style="color: ${palette.secondary}">╠${'═'.repeat(73)}╣</span>`);

        await terminal.enqueue(`<span style="color: ${palette.secondary}">║</span>  ${colorSpan(t.banner.targetIdentifier + ':', palette.info)} ${colorSpan('+90' + phone, palette.primary, { bold: true })}${''.padEnd(50 - phone.length)}<span style="color: ${palette.secondary}">║</span>`, 50);
        await terminal.enqueue(`<span style="color: ${palette.secondary}">║</span>  ${colorSpan(t.banner.payloadQuantity + ':', palette.info)} ${colorSpan(amount + ' ' + t.banner.smsBombs, palette.warning, { bold: true })}${''.padEnd(50 - amount.toString().length)}<span style="color: ${palette.secondary}">║</span>`, 50);

        const delayText = delaySeconds > 0 ? `${delaySeconds} SECONDS` : t.banner.maxSpeed;
        await terminal.enqueue(`<span style="color: ${palette.secondary}">║</span>  ${colorSpan(t.banner.requestDelay + ':', palette.info)} ${colorSpan(delayText, delaySeconds > 0 ? palette.accent : palette.success, { bold: true })}${''.padEnd(50 - delayText.length)}<span style="color: ${palette.secondary}">║</span>`, 50);

        await terminal.enqueue(`<span style="color: ${palette.secondary}">║</span>  ${colorSpan(t.banner.protocol + ':', palette.info)} ${colorSpan(t.banner.protocolType, palette.success, { bold: true })}${''.padEnd(40)}<span style="color: ${palette.secondary}">║</span>`, 50);
        await terminal.enqueue(`<span style="color: ${palette.secondary}">║</span>  ${colorSpan(t.banner.status + ':', palette.info)} ${colorSpan('⚡ ' + t.banner.readyStatus + ' ⚡', palette.error, { bold: true })}${''.padEnd(16)}<span style="color: ${palette.secondary}">║</span>`, 50);

        await terminal.enqueue(`<span style="color: ${palette.secondary}">╚${'═'.repeat(73)}╝</span>`);
        await terminal.enqueue('');

        await terminal.enqueue(await generateMatrixLine());
        await terminal.enqueue(await generateMatrixLine());
        await terminal.enqueue('');
    }

    return { showBanner, showOperationParams, stopFakeActivity };
}
