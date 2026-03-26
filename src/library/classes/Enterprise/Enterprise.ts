import { SetImage } from '../SetImage';
import { Phaser } from './Phaser';
import { Torpedo } from './Torpedo';

import {
    graphicTable,
    keyTable,
    soundTable,
    eventTable,
    soundSettings,
    enterpriseSettings,
    gameSettings
} from '../../configuration/Configuration';

class Enterprise {
    private sprites: SetImage[] = [];
    private phaser: Phaser;
    private torpedo: Torpedo;
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private lives: number;
    private speed: number;
    private maximumWarp: number;
    private mouseButton: number;
    private keyCode: number;
    private screen: number;
    private stop: boolean;
    private keyPressed: boolean;
    private mouseButtonDown: boolean;
    private isWarpdriveEngaged: boolean;
    private isExploded: boolean;
    private isShotTorpedo: boolean;
    private isCooldown: boolean;
    private isWarpDriveIdle: boolean;
    private cooldownId: any;
    private intervalId: any;
    private stopWarpdriveId: any;
    public static isGameOver: boolean = false;
    public static noWarpdrive: boolean = false;

    constructor() {
        this.lives = enterpriseSettings.maxLives;
        this.width = enterpriseSettings.width;
        this.height = enterpriseSettings.height;
        this.x = 0;
        this.y = 0;
        this.mouseButton = 0;
        this.keyCode = 0;
        this.speed = enterpriseSettings.maximumWarpSpeed / 100;
        this.screen = 0;
        this.maximumWarp = enterpriseSettings.maximumWarpSpeed;

        this.stop = false;
        this.isCooldown = false;
        this.isWarpDriveIdle = false;
        this.keyPressed = false;
        this.mouseButtonDown = false;
        this.isWarpdriveEngaged = false;
        this.isExploded = false;
        this.isShotTorpedo = false;

        this.phaser = new Phaser(0, 0);
        this.torpedo = new Torpedo(0, 0);

        this.initialize();
    }

    // public methods

    public setWarpSpeed = (speed: number): void => {
        this.maximumWarp = speed;
    }

    public getWarpSpeed = (): number => {
        return this.maximumWarp;
    }

    public engagePhaserShot = (): void => {
        if (this.isWarpdriveEngaged)
            return;

        soundTable.phaser.setVolume(soundSettings.minVolume).play();
        this.phaser.setPosition(this.x + enterpriseSettings.width, this.y);
        this.phaser.draw();
    }

    public getEvents = (): eventTable => {
        return {
            starship: {
                position_x: this.x + this.width,
                position_y: this.y,
                width: this.width,
                height: this.height,
                lives: this.lives,
                warp: this.isWarpdriveEngaged,
                exploded: this.isExploded,
                shotTorpedo: this.isShotTorpedo,
                screen: this.screen,
                isWarpAvailable: this.isCooldown,
                currentSpeed: this.speed,
                currentWarpSpeed: this.maximumWarp
            },
            mouseEvents: {
                mouse_x: 0,
                mouse_y: 0,
                mouseButtonDown: this.mouseButtonDown,
                mouseButton: this.mouseButton
            },
            keyEvents: {
                keyPressed: this.keyPressed,
                keyCode: this.keyCode
            }
        }
    }

    public get = () => {
        return {
            'phaser': this.phaser,
            'torpedo': this.torpedo,
            'ship': this.sprites[this.lives - this.lives]
        }
    }

    public fullStop = (): void => {
        if (this.isWarpDriveIdle)
            return;

        this.stop = !this.stop;
    }

    public setPosition = (y: number): void => {
        this.y += y;
    }

    public draw = (): void => {
        this.sprites[this.lives - this.lives].draw();
        this.idle();
    }

    public shotPhotonTorpedo = (): void => {
        const distance: number = 20;

        this.torpedo = new Torpedo(this.x + this.width + distance + 10, this.y - distance);
        soundTable.torpedo.setVolume(soundSettings.minVolume).play();
        this.isShotTorpedo = true;
    }

    public setSpeed = (speed: number): void => {
        if (this.isWarpDriveIdle || this.isWarpdriveEngaged)
            return;

        if (this.stop)
            this.stop = false;

        this.speed = speed;
    }

    public increaseImpulse = (): void => {
        if (this.speed < enterpriseSettings.maximumImpulseSpeed) {
            this.speed += 0.25;
        }
    }

    public decreaseImpulse = (): void => {
        if (this.speed > enterpriseSettings.minimumImpulseSpeed) {
            this.speed -= 0.25;
        }
    }

    public engageWarpDrive = (): void => {
        if (this.speed === 0 || this.stop || this.isCooldown || Enterprise.noWarpdrive)
            return;

        this.width = enterpriseSettings.width * 2;
        this.height = enterpriseSettings.height / 2;

        soundTable.warpout.stop();
        soundTable.warpin.setVolume(soundSettings.maxVolume).play();
        soundTable.warpflash.setVolume(soundSettings.maxVolume).play();

        this.sprites[this.lives - this.lives] = new SetImage(graphicTable.enterprise,
            { x: this.x, y: this.y, width: this.width, height: this.height });

        this.speed = this.maximumWarp;

        this.isCooldown = true;
        this.isWarpdriveEngaged = true;
        this.isWarpDriveIdle = true;
    }

    public stopWarpDrive = (speed?: number): void => {
        if (this.speed === 0)
            return;

        this.width = enterpriseSettings.width;
        this.height = enterpriseSettings.height;

        soundTable.warpin.stop();
        soundTable.warpout.setVolume(soundSettings.maxVolume).play();

        this.sprites[this.lives - this.lives] = new SetImage(graphicTable.enterprise,
            { x: this.x, y: this.y, width: this.width, height: this.height });

        this.intervalId = setInterval(() => {

            this.speed -= enterpriseSettings.decreaseWarpTimePerSec;

            this.sprites[this.lives - this.lives] = new SetImage(graphicTable.enterprise,
                { x: this.x, y: this.y, width: this.width, height: this.height });

        }, enterpriseSettings.maxWarpdriveTime);

        this.isCooldown = true;
        this.isWarpdriveEngaged = false;

        clearInterval(this.stopWarpdriveId);
    }

    public showExplosiion = (): void => {
        this.animateExplosion();
    }

    // private methods

    private initialize = (): void => {
        const centerVertical: number = (gameSettings.maxWindowHeight - this.height) / 2;
        this.y = centerVertical;

        for (var i = 0; i < this.lives; i++) {
            this.sprites[i] =
                new SetImage(graphicTable.enterprise,
                    { x: this.x, y: centerVertical, width: this.width, height: this.height });
        }
    }

    private destroyed = (): void => {
        if (this.lives > 0) {
            this.lives--;
            this.x = 0;
            this.screen++;
        }
        else
            this.animateExplosion();
    }

    private animateExplosion = (): void => {
        const explodes: SetImage[] = [];

        explodes[1] = new SetImage(graphicTable.explode,
            { x: this.x - 50, y: this.y - 50, width: this.width + 100, height: this.height + 100 });

        explodes[0] = new SetImage(graphicTable.explode,
            { x: this.x, y: this.y, width: this.width, height: this.height });

        explodes[2] = new SetImage(graphicTable.explode,
            { x: this.x - 25, y: this.y - 25, width: this.width + 50, height: this.height + 50 });

        explodes[3] = new SetImage(graphicTable.explode,
            { x: this.x + 25, y: this.y, width: this.width - 25, height: 5 });

        explodes.forEach(_ => _.draw());

        this.sprites[this.lives - this.lives].clear();

        this.width = enterpriseSettings.width;
        this.height = enterpriseSettings.height;

        this.stop = true;
        this.isExploded = true;
        Enterprise.isGameOver = true;

        soundTable.disableSound();
    }

    private eventHandler = (): void => {
        this.handlePhaserEvents();
        this.handleTorpedoEvents();
        this.handleMouseEvents();
        this.handleKeyboardEvents();
    }

    private handlePhaserEvents = (): void => {
        // damage over time write code here.
    }

    private handleTorpedoEvents = (): void => {
        if (this.torpedo.getX() >= gameSettings.maxWindowWidth) {
            this.isShotTorpedo = false;
            this.torpedo.clear();
        }
    }

    private handleKeyboardEvents = (): void => {
        document.onkeydown = (e: any): void => {
            this.keyPressed = true;

            this.keyCode = e.keyCode;

            // alert(this.keyCode);

            if (this.keyCode === keyTable.QKey ||
                this.keyCode === keyTable.RKey)
                return;

            if (this.isWarpDriveIdle)
                this.keyCode = 0;

            // new code added 
            
            // xbox game controller settings

            if(this.keyCode === keyTable.UpKey || this.keyCode === keyTable.DKey) {
                this.increaseImpulse();
            }

            if(this.keyCode === keyTable.DownKey || this.keyCode === keyTable.AKey) {
                this.decreaseImpulse();
            }
        }

        document.onkeyup = (e: any): void => {
            this.keyPressed = false;
            this.keyCode = e.keyCode;

            if (this.keyCode === keyTable.QKey ||
                this.keyCode === keyTable.RKey)
                return;

            if (this.isWarpDriveIdle)
                this.keyCode = 0;
        }
    }

    private handleMouseEvents = (): void => {
        if (gameSettings.mouseEnabled) {
            document.onmousedown = (e: any) => {
                if (this.isExploded || this.isWarpDriveIdle)
                    return;

                this.mouseButtonDown = true;
                this.mouseButton = e.button;
            }

            document.onmouseup = (e: any) => {
                if (this.isExploded)
                    return;

                this.mouseButtonDown = false;
                this.mouseButton = e.button;
            }

            document.onmousemove = (e: any) => {
                if (this.isExploded || this.isWarpDriveIdle)
                    return;

                if (e.y <= window.screen.availHeight - this.height) {
                    if (e.y > 10) {
                        this.y = e.y;
                    }
                }
            }

            document.onwheel = (e: any) => {
                if (this.isWarpdriveEngaged || this.isExploded || this.isWarpDriveIdle)
                    return;

                if (this.stop)
                    this.stop = false;

                if (e.deltaY < 0) {
                    if (this.speed < enterpriseSettings.maximumImpulseSpeed)
                        this.increaseImpulse();
                }
                else if (e.deltaY > 0) {
                    if (this.speed > enterpriseSettings.minimumImpulseSpeed)
                        this.decreaseImpulse();
                }
            }
        }
    }

    private showMessageWarpdriveIsAvailable = (): void => {
        soundTable.intercom.setVolume(soundSettings.intercomVolume).play();
    }

    private idle = (): void => {
        if (this.isWarpdriveEngaged) {
            this.isWarpdriveEngaged = false;
            this.stopWarpdriveId = setInterval(() => {
                this.stopWarpDrive();
            }, enterpriseSettings.maxWarpdriveTime);
        }

        this.eventHandler();

        if (this.speed < 0) {
            clearInterval(this.intervalId);
            this.isCooldown = true;
            this.stop = false;
            this.speed = 0.25;

            // cool down warp drive
            this.cooldownWarpDrive();

            this.isWarpDriveIdle = false;
        }

        if (!this.stop) {
            this.x += this.speed < enterpriseSettings.minimumImpulseSpeed ? enterpriseSettings.minimumImpulseSpeed : this.speed;
        }

        this.sprites[this.lives - this.lives].setPosition(this.x, this.y);

        if (this.x >= window.screen.availWidth - this.width)
            this.destroyed();
    }

    private cooldownWarpDrive = (): void => {
        setTimeout(() => {
            this.isCooldown = false
            this.showMessageWarpdriveIsAvailable();
        }, enterpriseSettings.cooldownWarpTime);
    }

    private specifiedWarpSpeed = (): void => {
        // write code here for customized warp speed factor.
    }
}

export { Enterprise };