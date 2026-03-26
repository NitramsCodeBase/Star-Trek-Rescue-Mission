import { SetImage } from '../SetImage';
import { Enterprise } from '../Enterprise/Enterprise';
import { Thread } from '../Thread'; 

import {
    graphicTable,
    soundTable,
    birdOfPreySettings,
    soundSettings,
    gameSettings
} from '../../configuration/Configuration';

class BirdOfPrey {
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private hp: number;
    private sprite: SetImage;
    private explodeSprite: SetImage;
    private enemy;
    private isDestroyed: boolean;
    private stopApproaching: boolean;

    constructor(x: number, y: number, enemy: Enterprise) {
        this.x = x;
        this.y = y;
        this.width = birdOfPreySettings.width;
        this.height = birdOfPreySettings.height;
        this.hp = birdOfPreySettings.hitpoints;
        this.enemy = enemy;

        this.isDestroyed = false;
        this.stopApproaching = false;

        this.sprite = new SetImage(graphicTable.birdofprey,
            { x: this.x, y: this.y, width: this.width, height: this.height });

        this.explodeSprite = new SetImage(graphicTable.explode,
            { x: this.x, y: this.y, width: this.width, height: this.height });
    }

    // public methods

    public showExplosiion = async (): Promise<void> => {
        new Thread(10_000).run();

        this.sprite.clear();

        soundTable.explosion.setVolume(soundSettings.maxVolume).play();
        new Thread(10_000).run();
        this.explodeSprite.setPosition(this.x, this.y);
        this.explodeSprite.draw();

    }

    public getStopApproaching = (): boolean => {
        return this.stopApproaching;
    }

    public getIsDestroyed = (): boolean => {
        if (this.x <= 0)
            return true;

        return this.isDestroyed;
    }

    public setIsDestroyed = (value: boolean): void => {
        this.isDestroyed = value;
    }

    public setEnemy = (enemy: Enterprise): void => {
        this.enemy = enemy;
    }

    public getEnemy = (): Enterprise | undefined => {
        return this.enemy;
    }

    public draw = (): void => {
        this.sprite.draw();
    }

    public move = (): void => {
        if (this.isDestroyed)
            return;

        if (this.enemy) {
            const { starship } = this.enemy.getEvents();

            if (this.x < starship.position_x - starship.width) {
                this.sprite.setPosition(this.x, this.y);
                this.stopApproaching = true;
            }

            if (!this.stopApproaching && this.y > starship.position_y) {
                this.y -= 0.5;
                this.sprite.setPosition(this.x, this.y);
            }
            else if (!this.stopApproaching && this.y < starship.position_y) {
                this.y += 0.5;
                this.sprite.setPosition(this.x, this.y);
            }

            if (gameSettings.noDamageOnWarp) {
                if (!starship.isWarpAvailable && this.y > (starship.position_y - starship.height) &&
                    this.y < starship.position_y &&
                    this.x > (starship.position_x - starship.width) &&
                    this.x < starship.position_x) {
                    this.destroyed();
                }
            }
            else {
                if (this.y > (starship.position_y - starship.height) &&
                    this.y < starship.position_y &&
                    this.x > (starship.position_x - starship.width) &&
                    this.x < starship.position_x) {
                    this.destroyed();
                }
            }

            this.x -= this.randomSpeed();
        }

        this.attack();
    }

    public getEvents = () => {
        return {
            'ship': {
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height,
            },
            sprite: this.sprite,
            enemy: this.enemy,
            destroyed: this.isDestroyed
        };
    }

    public destroyed = (): void => {
        this.isDestroyed = true;
    }

    // private methods

    private attack = (): void => {

        if (this.enemy) {
            const { starship } = this.enemy.getEvents();

            if (this.x - 100 >= starship.position_x &&
                this.y >= starship.position_y) {
                // write attack logic here.
            }
        }
    }

    private randomSpeed = (): number => {
        const speed = birdOfPreySettings.speed;

        return Math.random() > 0.33 ? speed:
            Math.random() > 0.66 ? speed * 2: speed * 4;
    }
}

export { BirdOfPrey };