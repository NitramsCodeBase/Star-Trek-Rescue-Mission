import { SetImage } from '../SetImage';

import {
    graphicTable,
    enterpriseSettings
} from '../../configuration/Configuration';

class Phaser {
    private image: SetImage;

    constructor(x: number, y: number) {
        this.image = new SetImage(graphicTable.phaser, {
            x: 0,
            y: 0,
            width: enterpriseSettings.phaser.width,
            height: enterpriseSettings.phaser.height
        });
    }

    // public methods

    public setPosition = (x: number, y: number): void => {
        this.image.setPosition(x - 15, y + 12);
    }

    public draw = (): void => {
        this.image.draw();
    }

    public clear = (): void => {
        this.image.clear();
    }
}

export { Phaser };