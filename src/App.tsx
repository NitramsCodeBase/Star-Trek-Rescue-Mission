import React, { useState, useEffect } from 'react';
import { TitleScreenButtons } from './library/components/TitleScreenButtons';
import { Canvas } from './library/components/Canvas';
import { Settings } from './library/components/Settings';
import { Settings as GameSettings } from './library/classes/Settings';
import { About } from './library/components/About';
import { HowToPlay } from './library/components/HowToPlay';
import { Game } from './library/classes/Game';
import { Tools } from './library/classes/Tools';
import { StaticLoader } from './library/classes/StaticLoader';
import { gameSettings as gameSet } from './library/configuration/Configuration';

import {
    soundTable,
    gameSettings,
    soundSettings,
    buttonSettings
} from './library/configuration/Configuration';

import './library/css/App.css';

interface Props {
    settings?: any;
};

type MockSettings = {
    hud: boolean;
    audio: boolean;
};

const App = ({ settings }: Props) => {

    // const saveData:MockSettings = {
    //     audio:true,
    //     hud:true
    // };

    //   // load gamedata into memory
    //   useEffect(() => {
    //     const saveSettings = localStorage.getItem(gameSet.savefile);
    //     if (saveSettings) setSaveData(JSON.parse(saveSettings));
    // }, []);

    const debugging: boolean = false;

    GameSettings.setGameSettings({
        audio: GameSettings.Audio,
        hud: GameSettings.HUD,
        highscores: GameSettings.HighScores,
        difficulty: GameSettings.Difficulty
    });

    if (debugging) {
        const get = () => {
            alert(GameSettings.getSetting('hud'));
            return <>
            </>
        }

        return <>
            <div>
                <h1> Test </h1>
                {get()}
            </div>
        </>
    }

    const currentBuild: string = `${gameSettings.version} (${gameSettings.build})`;

    const intervalId = setInterval(() => {
        requestAnimationFrame(() => new StaticLoader().drawTitleScreen());
    }, gameSettings.updateTime / gameSettings.maxFPS);

    window.onload = (): void => {
        Tools.disableContextMenu();
        playTheme();
    }

    const onHandleClickEvent = (e: any): void => {
        soundTable.door.setVolume(soundSettings.buttonVolume).play();

        Tools.sleep(buttonSettings.delay);

        clearContext();

        switch (e.target.name) {
            case 'start': {
                new Game().start();
                break;
            }

            case 'about': {
                Tools.renderComponent(<About />);
                break;
            }

            case 'howtoplay': {
                Tools.renderComponent(<HowToPlay />);
                break;
            }

            case 'settings': {
                Tools.renderComponent(<Settings />);
                break;
            }
        }
    }

    const onHandleMouseMoveEvnet = (): void => soundTable.computer.setVolume(soundSettings.buttonVolume).play()

    const playTheme = (): void => soundTable.theme.loop().setVolume(soundSettings.maxVolume).play();

    const dispose = (): void => clearInterval(intervalId);

    const clearContext = (): void => {
        soundTable.theme.stop();
        dispose();
    }

    if (debugging && settings)
        alert(JSON.stringify(settings));

    return <>
        <div className='Game hideTOSCursor'>
            <Canvas />
            <TitleScreenButtons
                onMouseMoveEvent={onHandleMouseMoveEvnet}
                onClickEvent={(e) => onHandleClickEvent(e)}
                />
            <label
                id='version'
                className='version-label'>
                Version {currentBuild}
            </label>
        </div>
    </>
}

export { App };