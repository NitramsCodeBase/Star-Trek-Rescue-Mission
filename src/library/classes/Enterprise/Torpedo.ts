import { SetImage } from '../SetImage';

import {
    graphicTable,
    enterpriseSettings,
    gameSettings
} from '../../configuration/Configuration';

class Torpedo {
    private image: SetImage;
    private missiles: number;
    private x: number;
    private y: number;
    private speed: number;

    constructor(x: number, y: number) {
        this.x = x - 65;
        this.y = y;

        this.speed = enterpriseSettings.torpedo.speed;

        this.image = new SetImage(graphicTable.photon, {
            x: this.x,
            y: this.y,
            width: enterpriseSettings.torpedo.radius,
            height: enterpriseSettings.torpedo.radius
        });

        this.missiles = enterpriseSettings.torpedo.missiles;
    }

    // public methods

    public setSpeed = (value: number): void => {
        this.speed = value;
    }

    public getMissiles = (): number => {
        return this.missiles;
    }

    public setPosition = (x: number, y: number): void => {
        this.image.setPosition(x, y);
    }

    public getPosition = (): any => {
        return {
            x: this.x,
            y: this.y
        };
    }

    public draw = (): void => {
        this.image.draw();
    }

    public getX = (): number => {
        return this.x;
    }

    public getY = (): number => {
        return this.y;
    }

    public move = (x: number): void => {
        if (this.missiles > 0 &&
            this.x <= gameSettings.maxWindowWidth) {
            this.x += this.speed;
            this.setPosition(this.x, this.y + 32);
            this.draw();
        }
    }

    public clear = (): void => {
        this.missiles--;
        this.image.clear();
        this.x = gameSettings.maxWindowWidth + 1;
    }
}

export { Torpedo };