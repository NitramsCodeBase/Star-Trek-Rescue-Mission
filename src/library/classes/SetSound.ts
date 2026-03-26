import { soundSettings } from '../configuration/Configuration';
import { Settings as Set } from './Settings';

class SetSound {
    private audio;
    private volume: number;

    constructor(path: string, volume?: number) {
        this.audio = new Audio(path);
        this.audio.preload = 'auto';
        this.audio.loop = false;
        this.audio.muted = false;
        this.audio.preload = 'auto';

        if (volume)
            this.setVolume(volume);

        this.volume = 0.10;
    }

    // public methods

    public play = (): void => {
        if (!soundSettings.enableSound || !Set.Audio)
            return;

        this.audio.volume = this.volume;
        this.audio.play();
    }

    public loop = (): SetSound => {
        this.audio.loop = true;
        return this;
    }

    public setVolume = (volume: number): SetSound => {
        this.volume = volume / 100;
        return this;
    }

    public muted = (): SetSound => {
        this.audio.muted = true;
        return this;
    }

    public stop = (stopSound?: boolean): void => {

        if (stopSound) {
            this.audio.src = '';
        }

        this.audio.currentTime = 0;
        this.audio.pause();
    }
}

export { SetSound };