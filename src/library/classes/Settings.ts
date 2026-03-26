import { gameSettings } from "../configuration/Configuration";

export enum PredefinedQualitySettings {
    High = 0,
    Medium = 1,
    Low = 2
};

export enum GameDifficultySettings {
    Easy = 0,
    Medium = 1,
    Hard = 2
};

class Settings {
    private predefinedQualitySettings: PredefinedQualitySettings;
    public static HUD: boolean;
    public static Audio: boolean;
    public static Enemies: boolean;
    public static Difficulty: GameDifficultySettings;
    public static HighScores: number = 0;
    private static saveFile: string = './game.cfg';

    static {
        Settings.Audio = true;
        Settings.HUD = true;
        Settings.Difficulty = GameDifficultySettings.Medium;
        Settings.HighScores = 1_000_000;
    }

    constructor() {
        this.predefinedQualitySettings = PredefinedQualitySettings.High;
    }

    // public settingsAudio = (): void => {

    // }

    // public settingsGraphics = (): void => {

    // }

    // public settingsGame = (): void => {

    // }

    // public settingsControls = (): void => {

    // }

    // public settingsEnemies = (): void => {

    // }

    public setPredefinedSettings = (predefined: PredefinedQualitySettings): void => {
        this.predefinedQualitySettings = predefined;

        switch (this.predefinedQualitySettings) {
            case PredefinedQualitySettings.High: {
                gameSettings.maxFPS = 120;
                break;
            }
            case PredefinedQualitySettings.Medium: {
                gameSettings.maxFPS = 60;
                break;
            }
            case PredefinedQualitySettings.Low: {
                gameSettings.maxFPS = 30;
                break;
            }
        }
    }

    public getPredefinedSettings = (): PredefinedQualitySettings => {
        return this.predefinedQualitySettings.valueOf();
    }

    // private setHighSettings = (): void => {

    // }

    // private setLowSettings = (): void => {

    // }

    // private setMediumSettings = (): void => {

    // }

    public static setGameSettings = (data: {}): void => {
        const key = localStorage.getItem(Settings.saveFile);

        localStorage.setItem(Settings.saveFile, JSON.stringify(data));
    }

    public static getGameSettings = () => localStorage.getItem(Settings.saveFile);

    public static getSetting = (key: string): any => {
        if ( key.length === 0 ) 
            return '';

        const temp: any = localStorage.getItem(Settings.saveFile)
            ?.replaceAll('{', '')
            ?.replaceAll('}', '')
            ?.replaceAll('"', '')
            ?.split(',')
        
        let result : any;

        for (let i = 0; i < temp.length; i++) {
            const currentKey: any = temp[i].split(':');

            if (currentKey[0] === key)
                result = currentKey[1];
            else
                result = 'Key not found';
        }


        return result;
    }
}

export { Settings };