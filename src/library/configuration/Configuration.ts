import { SetSound } from '../classes/SetSound';

const runOnXBOX : boolean = !true;

const graphicTable = {
    'enterprise': './images/enterprise.dat',
    'enterprise_d': './images/enterprise_d.dat',
    'birdofprey': './images/birdofprey.dat',
    'explode': './images/explode.dat',
    'warpflash': './images/warpflash.dat',
    'logo': './images/logo.dat',
    'phaser': './images/phaser.dat',
    'photon': './images/photon.dat',
    'planet1': './images/planet.dat',
    'planet2': './images/planet2.dat',
    'planet3': './images/planet3.dat',
    'planet4': './images/planet4.dat',
    'planet5': './images/planet5.dat',
    'rescuemission': './images/rescuemission.dat',
    'space1': './images/space.dat',
    'space2': './images/space2.dat',
    'space3': './images/space3.dat',
    'space4': './images/space4.dat',
    'space5': './images/space5.dat',
    'remastered': './images/remastered.dat',
    'borgcube': './images/borgcube.dat'
};

const soundTable = {
    'door': new SetSound('./sounds/door.snd'),
    'computer': new SetSound('./sounds/computer.snd'),
    'theme': new SetSound('./sounds/theme.snd'),
    'phaser': new SetSound('./sounds/phaser.snd'),
    'torpedo': new SetSound('./sounds/photon.snd'),
    'redalert': new SetSound('./sounds/redalert.snd'),
    'beam': new SetSound('./sounds/beam.snd'),
    'warpin': new SetSound('./sounds/warpin.snd'),
    'warpout': new SetSound('./sounds/warpout.snd'),
    'warpflash': new SetSound('./sounds/warpflash.snd'),
    'idle': new SetSound('./sounds/idle.snd'),
    'intercom': new SetSound('./sounds/intercom.snd'),
    'cloaking': new SetSound('./sounds/cloaking.snd'),
    'decloaking': new SetSound('./sounds/decloak.snd'),
    'explosion': new SetSound('./sounds/explosion.snd'),
    'tribble': new SetSound('./sounds/tribble.snd'),
    'disableSound': () => {
        soundTable.idle.stop();
        soundTable.warpin.stop();
        soundTable.warpout.stop();
        soundTable.warpflash.stop();
        soundTable.intercom.stop();
        soundTable.redalert.stop();
    },
    'muted': new SetSound('').muted()
};

const keyTable = {
    'Spacebar': 32,
    'Enter': 13,
    'Escape': 27,
    'WKey': 87,
    'SKey': 83,
    'AKey': 65,
    'DKey': 68,
    'EKey': 69,
    'RKey': 82,
    'UpKey': 38,
    'DownKey': 40,
    'LeftKey': 37,
    'RightKey': 39,
    'KeyD1': 49,
    'KeyD2': 50,
    'KeyD3': 51,
    'KeyD4': 52,
    'KeyD5': 53,
    'KeyD6': 54,
    'KeyD7': 55,
    'KeyD8': 56,
    'KeyD9': 57,
    'KeyD0': 48,
    'KeyQuestionMark': 219,
    'KeyApostrophe': 221,
    'KeyBackspace': 8,
    'SquareKey': 220,
    'XKey': 88,
    'QKey': 81
};

const gameSettings = {
    'maxFPS': 120,
    'noDamageOnWarp': true,
    'updateTime': 1_000,
    'soundVolume': 50,
    'randomEnemyApproaches': 0.75,
    'version': '0.0.2',
    'build': '62426',
    'showHUD': true,
    'mouseEnabled': true,
    'noEnemies': false,
    'maxWidth': window.screen.width,
    'maxHeight': window.screen.height,
    'maxWindowWidth': window.screen.availWidth,
    'maxWindowHeight': window.screen.availHeight,
    'maxGalaxies': 5,
    'savefile': './star_trek.sav',
    'hud': {
        'showHUDOnTop': true,
        'useAdaptiveHUD': false, // maybe will be implemented in the next few builds.
        'maxHUDWidth': window.screen.availWidth,
        'maxHUDHeight': window.screen.availHeight,
        'fontcolor': 'black',
        'fillcolor': 'gold',
        'fontsize': runOnXBOX ? '20px' : '28px',
        'showLeftMissiles': false
    }
};

const soundSettings = {
    'maxVolume': 10,
    'minVolume': 10,
    'tribbleSoundVolume': 25,
    'backgroundVolume': 20,
    'buttonVolume': 15,
    'intercomVolume': 50,
    'enableSound': true
};

const birdOfPreySettings = {
    'width': 100,
    'height': 50,
    'hitpoints': 300,
    'speed': 0.50,
    'torpedo': {

    },
    'phaser': {

    }
};

const borgCubeSettings = {
    'width': 100,
    'height': 50,
    'hitpoints': 2000,
    'speed': 0.5,
    'torpedo': {

    },
    'phaser': {

    }
};

const enterpriseSettings = {
    'maxVerticalSpeed': 1.0,
    'maxMissiles': 3,
    'maxLives': 1_000,
    'phaserLength': 300,
    'maximumWarpSpeed': 25.00,
    'minimumImpulseSpeed': 0.00,
    'maximumImpulseSpeed': 1.00,
    'warp1': 2.5,
    'warp2': 5.0,
    'warp3': 7.5,
    'warp4': 10.00,
    'warp5': 12.50,
    'warp6': 15.00,
    'warp7': 17.50,
    'warp8': 20.00,
    'warp9': 25,
    'cooldownWarpTime': 1_000,
    'maxWarpdriveTime': 1_500,
    'decreaseWarpTimePerSec': 8.00,
    'width': 200,
    'height': 50,
    'hitpoints': 1000,
    'torpedo': {
        'speed': 1.25,
        'radius': 15,
        'missiles': 3
    },
    'phaser': {
        'width': 300,
        'height': 5
    }
};

const buttonSettings = {
    'delay': 1_250,
    'width': 0,
    'height': 0
};

// events for the starship Enterprise

type eventTable = {
    'starship': {
        position_x: number;
        position_y: number;
        width: number;
        height: number;
        lives: number;
        warp: boolean;
        exploded: boolean;
        shotTorpedo: boolean;
        screen: number;
        isWarpAvailable: boolean;
        currentSpeed: number;
        currentWarpSpeed: number;
    },
    'mouseEvents': {
        mouseButtonDown: boolean;
        mouseButton: number;
        mouse_x: number;
        mouse_y: number;
    },
    'keyEvents': {
        keyPressed: boolean;
        keyCode: number;
    }
}

type Coordinates = {
    x: number;
    y: number;
    width?: number;
    height?: number;
}

export {
    soundTable,
    graphicTable,
    keyTable,
    gameSettings,
    soundSettings,
    enterpriseSettings,
    birdOfPreySettings,
    buttonSettings,
    borgCubeSettings
};

export type {
    eventTable,
    Coordinates
};