import { SetImage } from '../classes/SetImage';
import { Enterprise } from './Enterprise/Enterprise';
import { Planet } from './Planet';
import { BirdOfPrey } from './BirdOfPrey/BirdOfPrey';
import { Tools } from './Tools';
import { HUD, HUDPosition } from './HUD';
import {Settings as Set} from './Settings';

import {
    soundTable,
    graphicTable,
    keyTable,
    gameSettings,
    soundSettings,
    enterpriseSettings
} from '../configuration/Configuration';

class Game {
    private setImage: SetImage[] = [];
    private birdOfPrey: BirdOfPrey[] = [];
    private starship: Enterprise;
    private hud: HUD;
    private planets: Planet[] = [];
    private isDestroyed: boolean[];
    private newScreen: boolean;
    private randomBackground: number;
    private updateScreen: number;
    private intervalId: any;
    private settings:any;

    constructor(settings?:any) {
        const coordinates = {
            x: 0,
            y: 0,
            width: window.screen.availWidth,
            height: window.screen.availHeight
        };

        this.randomBackground = 0;
        this.updateScreen = 0;

        this.starship = new Enterprise();

        this.intervalId = setInterval(() => requestAnimationFrame(this.updateFrame)
            , gameSettings.updateTime / gameSettings.maxFPS);

        this.newScreen = false;
        this.isDestroyed = [];

        this.hud = new HUD(this.starship);

        this.initializeGalaxies(coordinates);

        if(settings)
            this.settings = settings;
    }

    // public methods

    public start = (): void => {
        soundTable.theme.stop(true);
        soundTable.idle.loop().setVolume(soundSettings.backgroundVolume).play();
        Tools.hideCursor();
        Tools.switchToFullscreen();
        this.removeButtonElements();
    }

    public showHighScores = (): void => {
        
    }

    public destroyed = (): void => {

    }

    // private methods

    private updateFrame = (): void => {
        if (!this.newScreen) {
            this.isDestroyed = [];
            this.newPlanets();
            this.newBirdOfPrey();
        }

        this.setImage[this.randomBackground].draw();
        this.planets.forEach(planet => planet.draw());

        // events
        this.starshipEvents();
        this.planetsEvents();
        this.enemyEvents();
    }

    private newBirdOfPrey = (): void => {
        if (gameSettings.noEnemies)
            return;

        if (Math.random() > gameSettings.randomEnemyApproaches) {
            this.birdOfPrey = [];
            return;
        }

        const initialScreen: number = this.starship.getEvents().starship.screen;

        if (initialScreen === 0)
            return;

        for (var i = 0; i < Tools.getRandomNumber(3, 0); i++) {
            var x = Tools.getRandomNumber(window.screen.availWidth);
            var y = Tools.getRandomNumber(window.screen.availHeight);

            if (y === window.screen.availHeight - 50)
                y -= 100;

            this.birdOfPrey[i] = new BirdOfPrey(x, y, this.starship);
        }
    }

    private checkTorpedoHit = (currentBirdOfPrey: any): void => {
        const { ship } = currentBirdOfPrey.getEvents();
        const { shotTorpedo, position_y } = this.starship.getEvents().starship;
        const { x } = this.starship.get().torpedo.getPosition();

        if (shotTorpedo &&
            x >= ship.x && x <= (ship.x + ship.width) &&
            position_y <= ship.y && position_y >= (ship.y - ship.height)) {
            this.starship.get().torpedo.clear();

            currentBirdOfPrey.showExplosiion();

            currentBirdOfPrey.setIsDestroyed(true);
        }
    }

    private enemyEvents = (): void => {
        if (this.birdOfPrey.length === 0)
            return;

        this.birdOfPrey.forEach((birdOfPrey, index) => {
            if (birdOfPrey.getIsDestroyed())
                return;

            birdOfPrey.draw();
            birdOfPrey.move();

            const { destroyed, ship } = birdOfPrey.getEvents();

            if (!birdOfPrey.getStopApproaching() &&
                ship.x > this.starship.getEvents().starship.position_x) {
                soundTable.redalert.setVolume(10).play();
            }

            this.checkTorpedoHit(birdOfPrey);

            if (destroyed && !this.isDestroyed[index]) {
                this.isDestroyed[index] = true;
            }
        });

        for (var i = 0; i < this.isDestroyed.length; i++) {
            if (this.isDestroyed[i]) {
                const { ship } = this.birdOfPrey[i].getEvents();
                soundTable.explosion.setVolume(100).play();
                this.starship.showExplosiion();
                this.birdOfPrey[i].showExplosiion();
            }
        }
    }

    private planetsEvents = (): void => {
        const { starship } = this.starship.getEvents();

        this.planets.forEach(planet => {
            const { x1, y1, x2, y2 } = planet.getPosition();

            if (starship.position_x >= x1 &&
                starship.position_x - enterpriseSettings.width <= x2 &&
                starship.position_y >= y1 &&
                starship.position_y + enterpriseSettings.height <= y2) {

                Enterprise.noWarpdrive = true;
            }
            else {
                Enterprise.noWarpdrive = false;
            }
        });
    }

    private newPlanets = (): void => {
        for (var i = 0; i < Tools.getRandomNumber(2); i++) {
            this.planets[i] =
                new Planet(
                    Tools.getRandomNumber(window.screen.availWidth),
                    Tools.getRandomNumber(window.screen.availHeight),
                    Tools.getRandomNumber(400, 50)
                );
        }

        this.randomBackground = Tools.getRandomNumber(this.setImage.length - 1, 0, true);

        this.starship.get().torpedo.clear();

        this.newScreen = true;
    }

    private starshipEvents = (): void => {

        if (gameSettings.showHUD && Set.HUD) {
            this.hud.setHUDPosition(gameSettings.hud.showHUDOnTop ? HUDPosition.Top : HUDPosition.Down).showHUD(this.birdOfPrey);
        }

        // fix bug in later releases
        
        // this.hud.setHUDPosition(gameSettings.hud.showHUDOnTop ? HUDPosition.Top : HUDPosition.Down).showHUD(this.birdOfPrey);

        const { mouseEvents, starship, keyEvents } = this.starship.getEvents();

        if (starship.exploded) {
            const birdOfPrey = this.birdOfPrey.find(birdOfPrey => birdOfPrey.destroyed);

            // write code to vanish the destroyed Bird of Prey.
            setTimeout(() => {
                Enterprise.isGameOver = true;
                window.location.href = './index.html';
            }, 2_500);
        }

        if (starship.shotTorpedo) {
            const torpedo = this.starship.get().torpedo;
            torpedo.move(starship.position_x);
        }

        if (!starship.isWarpAvailable &&
            gameSettings.showHUD) {
            const positionY: number = HUD.hudPosition === HUDPosition.Down ? gameSettings.maxWindowHeight - 15 : 35;
            Tools.printMessage(1255, positionY, 'WARP DRIVE IS AVAILABLE!', gameSettings.hud.fontsize, gameSettings.hud.fontcolor);
        }

        if (this.updateScreen < starship.screen) {
            this.newScreen = false;
            this.updateScreen = starship.screen;
        }

        // handle mouse events

        if (gameSettings.mouseEnabled) {
            if (mouseEvents.mouseButtonDown) {
                switch (mouseEvents.mouseButton) {
                    case 0: { // left
                        if (!starship.warp)
                            this.starship.engagePhaserShot();
                        break;
                    }
                    case 1: { // middle 
                        if (!starship.warp)
                            this.starship.engageWarpDrive();
                        break;
                    }
                    case 2: { // right
                        if (!starship.shotTorpedo && !starship.warp)
                            this.starship.shotPhotonTorpedo();
                        break;
                    }
                }
            }
            else {
                switch (mouseEvents.mouseButton) {
                    case 1: {
                        if (starship.warp)
                            this.starship.stopWarpDrive();
                        break;
                    }
                }
            }
        }

        // handle keyboard events
        
        if (keyEvents.keyPressed) {
            switch (keyEvents.keyCode) {
                case keyTable.RKey:
                case keyTable.QKey: {
                    window.location.href = './index.html';
                    break;
                }
                case keyTable.SquareKey: {
                    this.starship.fullStop();
                    break;
                }
                case keyTable.WKey: {
                    this.starship.setPosition(-enterpriseSettings.maxVerticalSpeed);
                    break;
                }
                case keyTable.SKey: {
                    this.starship.setPosition(enterpriseSettings.maxVerticalSpeed);
                    break;
                }
                case keyTable.RightKey: {
                    this.starship.engageWarpDrive();
                    break;
                }
                case keyTable.KeyD1: {
                    this.starship.setSpeed(0.25);
                    break;
                }
                case keyTable.KeyD2: {
                    this.starship.setSpeed(0.50);
                    break;
                }
                case keyTable.KeyD3: {
                    this.starship.setSpeed(0.75);
                    break;
                }
                case keyTable.KeyD4: {
                    this.starship.setSpeed(1.00);
                    break;
                }
                case keyTable.KeyD5: {
                    this.starship.setWarpSpeed(enterpriseSettings.warp1);
                    break;
                }
                case keyTable.KeyD6: {
                    this.starship.setWarpSpeed(enterpriseSettings.warp2);
                    break;
                }
                case keyTable.KeyD7: {
                    this.starship.setWarpSpeed(enterpriseSettings.warp3);
                    break;
                }
                case keyTable.KeyD8: {
                    this.starship.setWarpSpeed(enterpriseSettings.warp4);
                    break;
                }
                case keyTable.KeyD9: {
                    this.starship.setWarpSpeed(enterpriseSettings.warp5);
                    break;
                }
                case keyTable.KeyD0: {
                    this.starship.setWarpSpeed(enterpriseSettings.warp6);
                    break;
                }
                case keyTable.KeyQuestionMark: {
                    this.starship.setWarpSpeed(enterpriseSettings.warp7);
                    break;
                }
                case keyTable.KeyApostrophe: {
                    this.starship.setWarpSpeed(enterpriseSettings.warp8);
                    break;
                }
                case keyTable.KeyBackspace: {
                    this.starship.setWarpSpeed(enterpriseSettings.warp9);
                    break;
                }
                case keyTable.EKey: {
                    if (!starship.warp)
                        this.starship.engageWarpDrive();
                    break;
                }
                case keyTable.Spacebar: {
                    this.starship.engagePhaserShot();
                    break;
                }
                case keyTable.XKey: {
                    if (!starship.shotTorpedo && !starship.warp)
                        this.starship.shotPhotonTorpedo();
                    break;
                }
            }
        }

        this.starship.draw();
    }

    private gameOver = (): void => {
        clearInterval(this.intervalId);
        alert('You lost the game!');
        window.location.href = './index.html';
    }

    private removeButtonElements = (): void => {
        const buttons = document.getElementsByTagName('button');

        for (var i = 0; i < buttons.length; i++) {
            buttons[i].style.setProperty('z-index', '0');
            buttons[i].hidden = true;
            // buttons[i].setAttribute('disabled', 'disabled');
        }

        document.getElementById('version')?.style.setProperty('z-index', '-1');
    }

    private initializeGalaxies = (coordinates: any): void => {
        for (var i = 0; i < gameSettings.maxGalaxies; i++) {
            let image = i > 0 ? graphicTable.space1.valueOf().replace('space.dat', `space${i + 1}.dat`) :
                graphicTable.space1.valueOf();

            this.setImage[i] = new SetImage(image, coordinates);
        }
    }
}

export { Game };