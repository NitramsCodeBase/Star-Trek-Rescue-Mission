import { gameSettings } from '../configuration/Configuration';
import { Tools } from './Tools';

export enum HUDPosition {
    Top = 0,
    Down = 1
};

class HUD {
    private context: any;
    private enterprise: any;
    private hudPosition: HUDPosition;
    public static hudPosition: HUDPosition;

    constructor(enterprise: any) {
        this.context = (document.getElementById('canvas') as HTMLCanvasElement)
            .getContext('2d');

        this.hudPosition = HUDPosition.Down;
        this.enterprise = enterprise;
    }

    public setHUDPosition = (hudPosition: HUDPosition): HUD => {
        this.hudPosition = hudPosition;
        HUD.hudPosition = hudPosition;
        return this;
    }

    public showHUD = (enemies: any): void => {
        if (this.context) {

            this.setHUDPositionOf();

            const { starship } = this.enterprise.getEvents();
            const missiles = this.enterprise.get().torpedo;

            const positionY = this.setNotificationPositionOf();

            const { fontsize, fontcolor } = gameSettings.hud;

            Tools.printMessage(10, positionY,
                `CURRENT IMPULSE SPEED ${this.impulseSpeedToString(starship.currentSpeed)}`, fontsize, fontcolor);

            Tools.printMessage(350, positionY,
                `VISITED GALAXIES ${starship.screen}`, fontsize, fontcolor);

            Tools.printWarpSpeedOnCanvas(starship.currentWarpSpeed, positionY);

            let counted = enemies.length;

            enemies.forEach((enemy: any) => {
                if (enemy.getIsDestroyed())
                    counted--;
            });

            if (counted !== 0) {
                Tools.printMessage(950, positionY,
                    `LEFT ENEMIES ${counted}`, fontsize, fontcolor);
            }
            else {
                Tools.printMessage(950, positionY,
                    `NO ENEMIES DETECTED!`, fontsize, fontcolor);
            }

            if (gameSettings.hud.showLeftMissiles) {
                Tools.printMessage(1050, positionY,
                    `MISSILES ${missiles.getMissiles()}`, fontsize, fontcolor);
            }
        }
    }

    public clearHUD = (): void => {
        if (this.context) {
            this.context.fillStyle = 'transparent';
            this.context.fillRect(0, gameSettings.maxWindowHeight - 50,
                gameSettings.maxWindowWidth,
                gameSettings.maxWindowHeight);
        }
    }

    private setHUDPositionOf = (): void => {
        const position = {
            y1: this.hudPosition === HUDPosition.Down ? gameSettings.maxWindowHeight - 50 : 0,
            y2: this.hudPosition === HUDPosition.Down ? gameSettings.maxWindowHeight : 50
        }

        if (this.context) {
            this.context.fillStyle = gameSettings.hud.fillcolor;
            this.context.fillRect(0, position.y1,
                gameSettings.hud.maxHUDWidth,
                position.y2);
        }
    }

    private setNotificationPositionOf = (): number => {
        if (this.hudPosition === HUDPosition.Down) {
            return gameSettings.maxWindowHeight - 15
        } else {
            return 35;
        }
    }

    private impulseSpeedToString = (speed: number): string => {
        let impulseSpeed: string = '';

        switch (speed) {
            case 0.25: {
                impulseSpeed = '1 / 4';
                break;
            }
            case 0.50: {
                impulseSpeed = '2 / 4';
                break;
            }
            case 0.75: {
                impulseSpeed = '3 / 4';
                break;
            }
            case 1.00: {
                impulseSpeed = 'FULL';
                break;
            }
            default: {
                if (speed === 0) {
                    impulseSpeed = 'STOP';
                }
                else {
                    impulseSpeed = 'WARP';
                }
                break;
            }
        }

        return impulseSpeed;
    }
}

export { HUD };