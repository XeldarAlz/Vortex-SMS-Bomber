export function initBackgroundMusic({ srcUrl, volume = 1.0 } = {}) {
    const audio = new Audio(srcUrl);
    audio.loop = true;
    audio.volume = 0;
    audio.preload = 'auto';

    let started = false;
    let fadeInInterval = null;
    const baseVolume = Math.max(0, Math.min(1, Number(volume) || 0));
    let volumeMultiplier = 1.0;

    function startFadeIn() {
        if (fadeInInterval) return;
        
        const targetVolume = baseVolume * volumeMultiplier;
        const fadeDuration = 1000;
        const steps = 30;
        const stepDuration = fadeDuration / steps;
        const volumeStep = targetVolume / steps;
        let currentStep = 0;

        fadeInInterval = setInterval(() => {
            currentStep++;
            audio.volume = Math.min(targetVolume, currentStep * volumeStep);
            
            if (currentStep >= steps) {
                clearInterval(fadeInInterval);
                fadeInInterval = null;
                audio.volume = targetVolume;
            }
        }, stepDuration);
    }

    async function tryPlay() {
        if (started) return;
        try {
            await audio.play();
            started = true;
            startFadeIn();
        } catch {
        }
    }

    tryPlay();

    const resume = async () => {
        await tryPlay();
        if (started) {
            window.removeEventListener('pointerdown', resume);
            window.removeEventListener('keydown', resume);
        }
    };

    window.addEventListener('pointerdown', resume, { passive: true });
    window.addEventListener('keydown', resume);

    return {
        audio,
        play: tryPlay,
        setVolume(multiplier) {
            volumeMultiplier = Math.max(0, Math.min(1, multiplier));
            audio.volume = baseVolume * volumeMultiplier;
        },
        getBaseVolume() {
            return baseVolume;
        },
        stop() {
            if (fadeInInterval) {
                clearInterval(fadeInInterval);
                fadeInInterval = null;
            }
            audio.pause();
            audio.currentTime = 0;
            audio.volume = 0;
            started = false;
        }
    };
}
