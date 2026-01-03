class SoundManager {
    constructor() {
        this.volume = 0.7;
        this.sounds = {};
        this.isEnabled = true;
        this.init();
    }

    init() {
        const soundFiles = {
            buttonHover: 'button-hover.mp3',
            buttonClick: 'button-click.mp3',
            typing: 'typing.mp3'
        };

        Object.entries(soundFiles).forEach(([key, filename]) => {
            try {
                const url = new URL(`../assets/audio/${filename}`, import.meta.url);
                const audio = new Audio(url.href);
                audio.preload = 'auto';
                audio.volume = this.volume;
                this.sounds[key] = audio;
            } catch (error) {
                console.warn(`Failed to load sound: ${filename}`, error);
                this.sounds[key] = null;
            }
        });
    }

    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        
        Object.values(this.sounds).forEach(audio => {
            if (audio) {
                audio.volume = this.volume;
            }
        });

        try {
            localStorage.setItem('soundVolume', this.volume.toString());
        } catch (e) {
        }
    }

    getVolume() {
        return this.volume;
    }

    loadVolume() {
        try {
            const savedVolume = localStorage.getItem('soundVolume');
            if (savedVolume !== null) {
                const volume = parseFloat(savedVolume);
                if (!isNaN(volume) && volume >= 0 && volume <= 1) {
                    this.setVolume(volume);
                }
            }
        } catch (e) {
        }
    }

    async play(soundName, options = {}) {
        if (!this.isEnabled || !this.sounds[soundName]) {
            return;
        }

        const audio = this.sounds[soundName];
        
        try {
            if (options.resetTime !== false) {
                audio.currentTime = 0;
            }

            if (options.volume !== undefined) {
                audio.volume = Math.max(0, Math.min(1, options.volume));
            } else {
                audio.volume = this.volume;
            }

            await audio.play().catch(error => {
                console.debug(`Could not play sound ${soundName}:`, error);
            });
        } catch (error) {
            console.debug(`Error playing sound ${soundName}:`, error);
        }
    }

    stop(soundName) {
        if (this.sounds[soundName]) {
            this.sounds[soundName].pause();
            this.sounds[soundName].currentTime = 0;
        }
    }

    stopAll() {
        Object.values(this.sounds).forEach(audio => {
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
        });
    }

    setEnabled(enabled) {
        this.isEnabled = enabled;
        if (!enabled) {
            this.stopAll();
        }
    }

    isEnabled() {
        return this.isEnabled;
    }
}

let soundManagerInstance = null;

export function getSoundManager() {
    if (!soundManagerInstance) {
        soundManagerInstance = new SoundManager();
        soundManagerInstance.loadVolume();
    }
    return soundManagerInstance;
}
