import { palette, phonePattern, timeFormatter } from './constants.js';
import { locales } from './locales.js';
import { getDom } from './dom.js';
import { createTerminalScheduler } from './terminal.js';
import { colorSpan } from './text.js';
import { createBanner } from './banner.js';
import { createStats } from './stats.js';
import { initBackgroundMusic } from './music.js';
import { getSoundManager } from './sounds.js';

const dom = getDom();
const terminal = createTerminalScheduler(dom.terminal);
const soundManager = getSoundManager();
let backgroundMusic = null;

let currentLocale = locales.en;
let isRunning = false;
let aborted = false;
let acceptLogs = false;
let stats = { total: 0, success: 0, error: 0 };
let targetAmount = 0;

const statsUi = createStats({
    dom,
    getTargetAmount: () => targetAmount,
    getStats: () => stats
});

const banner = createBanner({
    palette,
    terminal,
    getLocale: () => currentLocale,
    getVersion: async () => {
        try {
            return await window.electronAPI.getVersion();
        } catch {
            return '1.1.0';
        }
    }
});

function setStatus(status) {
    dom.statusIndicator.className = 'status-indicator';

    if (status === 'ready') {
        dom.statusText.textContent = currentLocale.labels.ready;
        dom.statusIndicator.style.background = palette.primary;
        return;
    }

    if (status === 'attacking') {
        dom.statusText.textContent = currentLocale.labels.attacking;
        dom.statusIndicator.classList.add('active');
        dom.statusIndicator.style.background = palette.warning;
        return;
    }

    if (status === 'complete') {
        dom.statusText.textContent = currentLocale.labels.complete;
        dom.statusIndicator.style.background = palette.success;
        return;
    }

    if (status === 'error') {
        dom.statusText.textContent = currentLocale.labels.error;
        dom.statusIndicator.classList.add('error');
        dom.statusIndicator.style.background = palette.error;
    }
}

function updateUILanguage() {
    const t = currentLocale;

    dom.inputSectionTitle.textContent = t.banner.operationParams;
    dom.phoneLabel.textContent = t.ui.targetPhone;
    dom.phoneHint.textContent = t.ui.phoneHint;
    dom.amountLabel.textContent = t.banner.payloadQuantity;
    dom.amountHint.textContent = t.ui.amountHint;
    dom.delayLabel.textContent = t.banner.requestDelay;
    dom.delayHint.textContent = t.ui.delayHint;
    dom.launchText.textContent = t.ui.launchAttack;
    dom.stopText.textContent = t.ui.abortMission;

    dom.statsTitle.textContent = t.ui.missionStats;
    dom.statTotalLabel.textContent = t.ui.total;
    dom.statSuccessLabel.textContent = t.ui.success;
    dom.statFailedLabel.textContent = t.ui.failed;
    dom.statRateLabel.textContent = t.results.successRate;
}

async function showMissionComplete() {
    const t = currentLocale;
    const successRate = stats.total > 0 ? ((stats.success / stats.total) * 100).toFixed(2) : '0.00';

    await terminal.enqueue('');
    await terminal.enqueue(`<span style="color: ${palette.secondary}">${'━'.repeat(70)}</span>`);
    await terminal.enqueue(`${colorSpan('🏆 ' + t.results.missionComplete.toUpperCase() + ' 🏆', palette.success, { bold: true })}`);
    await terminal.enqueue(`<span style="color: ${palette.secondary}">${'━'.repeat(70)}</span>`);

    await terminal.enqueue(`${colorSpan('📊 ' + t.results.totalAttempts + ':', palette.info, { bold: true })} ${stats.total}`);
    await terminal.enqueue(`${colorSpan('✅ ' + t.results.successful + ':', palette.success, { bold: true })} ${stats.success}`);
    await terminal.enqueue(`${colorSpan('❌ ' + t.results.failed + ':', palette.error, { bold: true })} ${stats.error}`);

    let rateColor = palette.success;
    if (Number(successRate) < 30) rateColor = palette.error;
    else if (Number(successRate) < 60) rateColor = palette.warning;

    await terminal.enqueue(`${colorSpan('🎯 ' + t.results.successRate + ':', palette.warning, { bold: true })} ${colorSpan(successRate + '%', rateColor, { bold: true })}`);
    await terminal.enqueue(`<span style="color: ${palette.secondary}">${'━'.repeat(70)}</span>`);

    setStatus('complete');
}

function handleBombingLog(log) {
    const t = currentLocale;
    const timestamp = timeFormatter.format(new Date());

    if (log?.type === 'success') {
        stats.success++;
        stats.total++;
        const line =
            `${colorSpan('[' + timestamp + ']', palette.muted)} ` +
            `${colorSpan('🚀 [' + t.status.hit + ']', palette.success, { bold: true })} ` +
            `${colorSpan('[' + (log.service ?? 'SERVICE') + ']', palette.info)} ` +
            `${colorSpan(t.status.target + ': +90' + (log.phone ?? ''), '#ffffff')} ` +
            `${colorSpan('✅ ' + t.status.deployed, palette.success, { bold: true })}`;
        terminal.enqueue(line);
        statsUi.update();
        return;
    }

    if (log?.type === 'failure') {
        stats.error++;
        stats.total++;
        const line =
            `${colorSpan('[' + timestamp + ']', palette.muted)} ` +
            `${colorSpan('💥 [' + t.status.miss + ']', palette.error, { bold: true })} ` +
            `${colorSpan('[' + (log.service ?? 'SERVICE') + ']', palette.info)} ` +
            `${colorSpan(t.status.target + ': +90' + (log.phone ?? ''), '#ffffff')} ` +
            `${colorSpan('❌ ' + t.status.failed, palette.error, { bold: true })}`;
        terminal.enqueue(line);
        statsUi.update();
    }
}

async function startAttack() {
    const phone = dom.phoneInput.value.trim();
    const amount = Number.parseInt(dom.amountInput.value, 10) || 10;
    const delaySeconds = Number.parseFloat(dom.delayInput.value) || 0;

    if (phone.length !== 10 || !phonePattern.test(phone)) {
        dom.phoneInput.parentElement.classList.add('shake');
        setTimeout(() => dom.phoneInput.parentElement.classList.remove('shake'), 500);
        await terminal.enqueue(`${colorSpan('❌ [' + currentLocale.labels.error + ']', palette.error, { bold: true })} ${currentLocale.prompts.invalidPhone}`);
        return;
    }

    window.electronAPI.removeBombingLogListener();

    isRunning = true;
    aborted = false;
    acceptLogs = true;
    targetAmount = amount;
    stats = { total: 0, success: 0, error: 0 };

    dom.launchBtn.classList.add('hidden');
    dom.stopBtn.classList.remove('hidden');
    dom.statsSection.classList.remove('hidden');
    setStatus('attacking');
    statsUi.updateNow();

    banner.stopFakeActivity();
    await banner.showOperationParams({ phone, amount, delaySeconds });

    await terminal.enqueue(`${colorSpan('🚀 ' + currentLocale.status.missionStarted.split('-')[0].trim() + '...', palette.accent, { bold: true })}`);

    for (let i = 5; i > 0; i--) {
        const countdownColor = i <= 2 ? palette.error : palette.warning;
        await terminal.enqueue(`${colorSpan('⏱️  [' + i + '] ' + i + '...', countdownColor, { bold: true })}`, 1000);
        if (!isRunning) break;
    }

    if (!isRunning) {
        cleanupAttack();
        return;
    }

    await terminal.enqueue(`${colorSpan('🔥 ' + currentLocale.status.missionStarted + ' 🔥', palette.success, { bold: true })}`);
    await terminal.enqueue('');

    window.electronAPI.onBombingLog(log => {
        if (!acceptLogs) return;
        handleBombingLog(log);
    });

    try {
        await window.electronAPI.startBombing(phone, amount, delaySeconds);
        if (!aborted) await showMissionComplete();
    } catch (error) {
        await terminal.enqueue(`${colorSpan('💀 [' + currentLocale.labels.error + ']', palette.error, { bold: true })} ${error?.message ?? String(error)}`);
        setStatus('error');
    } finally {
        cleanupAttack();
    }
}

function cleanupAttack() {
    acceptLogs = false;
    isRunning = false;
    window.electronAPI.removeBombingLogListener();
    dom.launchBtn.classList.remove('hidden');
    dom.stopBtn.classList.add('hidden');
}

function initWindowControls() {
    [dom.minimizeBtn, dom.maximizeBtn, dom.closeBtn].forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            soundManager.play('buttonHover');
        });
    });

    dom.minimizeBtn.addEventListener('click', () => {
        soundManager.play('buttonClick');
        window.electronAPI.minimizeWindow();
    });
    dom.maximizeBtn.addEventListener('click', () => {
        soundManager.play('buttonClick');
        window.electronAPI.maximizeWindow();
    });
    dom.closeBtn.addEventListener('click', () => {
        soundManager.play('buttonClick');
        window.electronAPI.closeWindow();
    });
}

function initVolumeControl() {
    const updateVolumeDisplay = (value) => {
        dom.volumeValue.textContent = `${Math.round(value)}%`;
        if (value === 0) {
            dom.volumeIcon.textContent = '🔇';
        } else if (value < 50) {
            dom.volumeIcon.textContent = '🔉';
        } else {
            dom.volumeIcon.textContent = '🔊';
        }
    };

    const initialVolume = 100;
    dom.volumeSlider.value = initialVolume;
    updateVolumeDisplay(initialVolume);
    
    soundManager.setVolume(0.7);
    if (backgroundMusic && backgroundMusic.setVolume) {
        backgroundMusic.setVolume(1.0);
    }

    dom.volumeSlider.addEventListener('input', (e) => {
        const value = parseInt(e.target.value, 10);
        const volume = value / 100;
        soundManager.setVolume(volume * 0.7);
        
        if (backgroundMusic && backgroundMusic.setVolume) {
            backgroundMusic.setVolume(volume);
        }
        
        updateVolumeDisplay(value);
    });
}

function initInputs() {
    let previousPhoneValue = '';
    let hasStoppedFakeActivity = false;

    const stopFakeActivityIfNeeded = () => {
        if (!hasStoppedFakeActivity) {
            banner.stopFakeActivity();
            hasStoppedFakeActivity = true;
        }
    };

    dom.phoneInput.addEventListener('input', e => {
        stopFakeActivityIfNeeded();
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
        if (e.target.value.length > previousPhoneValue.length) {
            soundManager.play('typing');
        }
        previousPhoneValue = e.target.value;
    });

    [dom.amountInput, dom.delayInput].forEach(input => {
        input.addEventListener('input', () => {
            stopFakeActivityIfNeeded();
            soundManager.play('typing');
        });
    });

    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('keypress', e => {
            if (e.key === 'Enter' && !isRunning) startAttack();
        });
        input.addEventListener('focus', () => {
            stopFakeActivityIfNeeded();
        });
    });
}

function initLanguageButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            soundManager.play('buttonHover');
        });

        btn.addEventListener('click', async () => {
            soundManager.play('buttonClick');
            const lang = btn.dataset.lang;
            currentLocale = locales[lang] ?? locales.en;

            dom.languageSection.classList.add('hidden');
            dom.inputSection.classList.remove('hidden');

            updateUILanguage();
            await banner.showBanner();
        });
    });
}

function initActions() {
    dom.launchBtn.addEventListener('mouseenter', () => {
        soundManager.play('buttonHover');
    });
    dom.launchBtn.addEventListener('click', () => {
        soundManager.play('buttonClick');
        startAttack();
    });

    dom.stopBtn.addEventListener('mouseenter', () => {
        soundManager.play('buttonHover');
    });
    dom.stopBtn.addEventListener('click', () => {
        soundManager.play('buttonClick');
        aborted = true;
        cleanupAttack();
        setStatus('ready');
    });
}

async function initTerminalIntro() {
    setStatus('ready');
    try {
        const version = await window.electronAPI.getVersion();
        if (dom.titleText) {
            const titleParts = dom.titleText.textContent.split(' v');
            dom.titleText.textContent = (titleParts[0] || 'VORTEXSMS') + ' v' + version;
        }
    } catch {
    }
    await terminal.enqueue(`${colorSpan('⚡ VORTEX SMS DESKTOP TERMINAL', palette.primary, { bold: true })}`);
    await terminal.enqueue(`${colorSpan('━'.repeat(40), palette.secondary)}`);
    await terminal.enqueue(`${colorSpan('Select your language to begin...', palette.info)}`);
    await terminal.enqueue(`<span class="cursor"></span>`);
}

function initAudio() {
    const url = new URL('../assets/audio/background.mp3', import.meta.url);
    backgroundMusic = initBackgroundMusic({ srcUrl: url.href, volume: 1.0 });
}

function initUpdater() {
    const updateButton = dom.updateButton;
    const updateButtonText = dom.updateButtonText;
    const updateNotification = dom.updateNotification;
    const updateText = dom.updateText;
    const updateBtn = dom.updateBtn;
    const updateBtnText = dom.updateBtnText;

    if (!updateButton || !updateButtonText) {
        return;
    }

    let isDownloading = false;
    let hasUpdate = false;

    window.electronAPI.onUpdateStatus((data) => {
        const t = currentLocale;
        if (data.status === 'available') {
            hasUpdate = true;
            updateButton.classList.add('has-update');
            updateButtonText.textContent = t.ui.update + ' v' + data.version;
            if (updateNotification && updateText && updateBtn && updateBtnText) {
                updateText.textContent = t.updates.available.replace('{version}', data.version);
                updateBtnText.textContent = t.ui.downloading;
                updateBtn.disabled = false;
                updateNotification.classList.remove('hidden');
            }
            soundManager.play('buttonHover');
        } else if (data.status === 'downloaded') {
            updateButton.classList.remove('downloading');
            updateButton.classList.add('has-update');
            updateButtonText.textContent = t.ui.install;
            if (updateNotification && updateText && updateBtn && updateBtnText) {
                updateText.textContent = t.updates.downloaded;
                updateBtnText.textContent = t.ui.restartInstall;
                updateBtn.disabled = false;
                updateNotification.classList.remove('hidden');
            }
            isDownloading = false;
        } else if (data.status === 'error') {
            updateButton.classList.remove('has-update', 'downloading');
            updateButton.disabled = false;
            updateButtonText.textContent = t.ui.update;
            
            let errorMessage = t.updates.errorGeneric;
            if (data.errorType === 'network') {
                errorMessage = t.updates.errorNetwork;
            } else if (data.errorType === 'rate-limit') {
                errorMessage = t.updates.errorRateLimit;
            }
            
            if (updateNotification && updateText && updateBtn && updateBtnText) {
                updateText.textContent = errorMessage;
                updateBtnText.textContent = t.ui.retry;
                updateBtn.disabled = false;
                updateNotification.classList.remove('hidden');
                setTimeout(() => {
                    if (updateNotification) {
                        updateNotification.classList.add('hidden');
                    }
                }, 5000);
            }
            isDownloading = false;
            hasUpdate = false;
        } else if (data.status === 'no-releases') {
            updateButton.classList.remove('has-update', 'downloading');
            updateButton.disabled = false;
            updateButtonText.textContent = t.ui.update;
            if (updateNotification && updateText && updateBtn && updateBtnText) {
                updateText.textContent = t.updates.noReleases;
                updateBtnText.textContent = t.ui.ok;
                updateBtn.disabled = false;
                updateNotification.classList.remove('hidden');
                setTimeout(() => {
                    if (updateNotification) {
                        updateNotification.classList.add('hidden');
                    }
                }, 4000);
            }
            hasUpdate = false;
        } else if (data.status === 'not-available') {
            updateButton.classList.remove('has-update', 'downloading');
            updateButton.disabled = false;
            updateButtonText.textContent = t.ui.update;
            if (updateNotification && updateText && updateBtn && updateBtnText) {
                updateText.textContent = t.updates.notAvailable;
                updateBtnText.textContent = t.ui.ok;
                updateBtn.disabled = false;
                updateNotification.classList.remove('hidden');
                setTimeout(() => {
                    if (updateNotification) {
                        updateNotification.classList.add('hidden');
                    }
                }, 3000);
            }
            hasUpdate = false;
        } else if (data.status === 'checking') {
            updateButtonText.textContent = t.ui.checking;
            updateButton.disabled = true;
            if (updateNotification && updateText && updateBtn && updateBtnText) {
                updateText.textContent = t.updates.checking;
                updateBtnText.textContent = '...';
                updateBtn.disabled = true;
                updateNotification.classList.remove('hidden');
            }
        }
    });

    window.electronAPI.onUpdateProgress((progress) => {
        const t = currentLocale;
        if (progress.percent > 0) {
            isDownloading = true;
            updateButton.classList.add('downloading');
            updateButton.classList.remove('has-update');
            updateButtonText.textContent = `${Math.round(progress.percent)}%`;
            updateButton.disabled = true;
            if (updateNotification && updateText && updateBtn && updateBtnText) {
                const percent = Math.round(progress.percent);
                const mbTransferred = (progress.transferred / 1024 / 1024).toFixed(1);
                const mbTotal = (progress.total / 1024 / 1024).toFixed(1);
                updateText.textContent = t.updates.downloadingProgress
                    .replace('{percent}', percent)
                    .replace('{transferred}', mbTransferred)
                    .replace('{total}', mbTotal);
                updateBtnText.textContent = `${percent}%`;
                updateBtn.disabled = true;
                updateNotification.classList.remove('hidden');
            }
        }
    });

    updateButton.addEventListener('mouseenter', () => {
        if (!updateButton.disabled) {
            soundManager.play('buttonHover');
        }
    });

    updateButton.addEventListener('click', async () => {
        if (updateButton.disabled || isDownloading) {
            return;
        }

        soundManager.play('buttonClick');
        const t = currentLocale;

        if (updateButtonText.textContent === t.ui.install) {
            window.electronAPI.quitAndInstall();
        } else if (hasUpdate && updateButtonText.textContent.startsWith(t.ui.update)) {
            updateButtonText.textContent = t.ui.downloadingProgress;
            updateButton.disabled = true;
            updateButton.classList.add('downloading');
            isDownloading = true;
            try {
                await window.electronAPI.downloadUpdate();
            } catch (error) {
                updateButtonText.textContent = t.ui.update;
                updateButton.disabled = false;
                updateButton.classList.remove('downloading');
                isDownloading = false;
                hasUpdate = false;
            }
        } else {
            updateButtonText.textContent = t.ui.checking;
            updateButton.disabled = true;
            try {
                await window.electronAPI.checkForUpdates();
            } catch (error) {
                updateButtonText.textContent = t.ui.update;
                updateButton.disabled = false;
            }
        }
    });

    if (updateBtn) {
        updateBtn.addEventListener('click', async () => {
            if (updateBtn.disabled) {
                return;
            }

            soundManager.play('buttonClick');
            const t = currentLocale;
            const btnText = updateBtnText.textContent;

            if (btnText === t.ui.restartInstall) {
                window.electronAPI.quitAndInstall();
            } else if (btnText === t.ui.downloading && hasUpdate) {
                updateBtn.disabled = true;
                updateBtnText.textContent = t.ui.downloadingProgress;
                try {
                    await window.electronAPI.downloadUpdate();
                } catch (error) {
                    updateBtn.disabled = false;
                    updateBtnText.textContent = t.ui.retry;
                }
            } else if (btnText === t.ui.retry) {
                updateBtn.disabled = true;
                updateBtnText.textContent = '...';
                updateText.textContent = t.updates.checking;
                try {
                    await window.electronAPI.checkForUpdates();
                } catch (error) {
                    updateBtn.disabled = false;
                    updateBtnText.textContent = t.ui.retry;
                }
            } else if (btnText === t.ui.ok) {
                if (updateNotification) {
                    updateNotification.classList.add('hidden');
                }
            }
        });
    }
}

initWindowControls();
initInputs();
initLanguageButtons();
initActions();
initAudio();
initVolumeControl();
initUpdater();
initTerminalIntro();
