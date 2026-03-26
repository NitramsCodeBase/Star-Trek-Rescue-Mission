import React, { useState, useEffect } from 'react';
import { Canvas } from '../components/Canvas';
import { Tools } from '../classes/Tools';
import { SetImage } from '../classes/SetImage';
import { Settings as GameSettings, PredefinedQualitySettings } from '../classes/Settings';

import {
    graphicTable,
    soundTable,
    soundSettings,
    gameSettings,
    buttonSettings
} from '../configuration/Configuration';

import '../css/Settings.css';

const saveFile: string = './star_trek.sav';

const Settings = () => {
    const renderAnimation:boolean = false;

    const [saveData, setSaveData] = useState({
        audio: true,
        hud: true
    });

    // load data 
    useEffect(() => {
        const saveSettings = localStorage.getItem(saveFile);
        if (saveSettings) setSaveData(JSON.parse(saveSettings));
    }, []);

    // save data
    useEffect(() => {
        localStorage.setItem(saveFile, JSON.stringify(saveData));
    }, [saveData]);

    const settings: GameSettings = new GameSettings();

    let speed: number = 0;

    Tools.disableContextMenu();

    const intervalId = setInterval(() => {
        requestAnimationFrame(updateFrame);
    }, gameSettings.updateTime / gameSettings.maxFPS);

    soundTable.idle.loop().setVolume(soundSettings.backgroundVolume).play();

    const updateFrame = (): void => {
        new SetImage(graphicTable.space4)
            .draw();

        new SetImage(graphicTable.planet1,
            { x: 1200, y: 200, width: 250, height: 250 })
            .draw();

        new SetImage(graphicTable.planet1,
            { x: 0, y: 500, width: 150, height: 150 })
            .draw();

        new SetImage(graphicTable.enterprise,
            { x: speed, y: 165, width: 200, height: 50 })
            .draw();

        new SetImage(graphicTable.birdofprey,
            { x: 1325 - speed, y: 620, width: 100, height: 50 })
            .draw();

        new SetImage(graphicTable.birdofprey,
            { x: 1325 - speed, y: 720, width: 100, height: 50 })
            .draw();

        new SetImage(graphicTable.birdofprey,
            { x: 1425 - speed, y: 670, width: 100, height: 50 })
            .draw();

        if (renderAnimation) 
        speed = speed == 230 ? 230 : speed = speed + 0.25;
    }

    const onHandleMouseClick = (e: any): void => {
        soundTable.door.setVolume(soundSettings.buttonVolume).play();

        Tools.sleep(buttonSettings.delay);

        switch (e.target.name) {
            case 'predefined': {
                const btn = document.getElementsByName('predefined')[0];

                if (btn.innerHTML === ' HIGH QUALITY ') {
                    btn.innerHTML = ' MEDIUM QUALITY ';
                    settings.setPredefinedSettings(PredefinedQualitySettings.Medium);
                } else if (btn.innerHTML === ' MEDIUM QUALITY ') {
                    btn.innerHTML = ' LOW QUALITY ';
                    settings.setPredefinedSettings(PredefinedQualitySettings.Low);
                } else if (btn.innerHTML === ' LOW QUALITY ') {
                    btn.innerHTML = ' HIGH QUALITY ';
                    settings.setPredefinedSettings(PredefinedQualitySettings.High);
                }
                break;
            }
            case 'audio': {
                const name = document.getElementsByName('audio')[0];

                setSaveData({...saveData,audio: !saveData.audio});

                break;
            }
            case 'back': {
                Tools.clearComponent(intervalId);
                // Tools.renderComponent(<App settings={gameSettings.showHUD} />);
                
                window.location.reload();

                break;
            }
            case 'default': {
                const btn = document.getElementById('high-button') as HTMLButtonElement;
                btn.innerHTML = ' HIGH QUALITY ';
                break;
            }
            case 'hud': {
                const name = document.getElementsByName('hud')[0];
                setSaveData({...saveData,hud: !saveData.hud});
                gameSettings.showHUD = saveData.hud;
                break;
            }
        }
    }

    const onHandleMouseMove = (): void => {
        soundTable.computer.setVolume(soundSettings.buttonVolume).play();
    }

    return (
        <div className='Settings'>
            <Canvas />

            <div className='headline'>
                <label> STAR TREK RESCUE MISSION </label>
                <label> SETTINGS </label>
            </div>

            <div className='options-container'>
                <button
                    name='hud'
                    onMouseMove={onHandleMouseMove}
                    onClick={(e) => onHandleMouseClick(e)}
                > HUD {saveData.hud ? 'ON':'OFF'} </button>
                <button
                    name='audio'
                    onMouseMove={onHandleMouseMove}
                    onClick={(e) => onHandleMouseClick(e)}
                > AUDIO {saveData.audio ? 'ON' : 'OFF'} </button>
                <button
                    name='graphics'
                    onMouseMove={onHandleMouseMove}
                    onClick={(e) => onHandleMouseClick(e)}
                > GRAPHICS </button>
                <button
                    name='controls'
                    onMouseMove={onHandleMouseMove}
                    onClick={(e) => onHandleMouseClick(e)}
                > CONTROLS </button>
                <button
                    name='game'
                    onMouseMove={onHandleMouseMove}
                    onClick={(e) => onHandleMouseClick(e)}
                > GAME </button>
                <button
                    name='enemies'
                    onMouseMove={onHandleMouseMove}
                    onClick={(e) => onHandleMouseClick(e)}
                > ENEMIES </button>
                <button
                    name='beta'
                    onMouseMove={onHandleMouseMove}
                    onClick={(e) => onHandleMouseClick(e)}
                > BETA </button>
            </div>

            <div className='buttonsettings-container'>
                <button
                    name='back'
                    onClick={(e) => onHandleMouseClick(e)}
                    onMouseMove={onHandleMouseMove}
                > BACK TO BRIEFING </button>
                <button
                    name='predefined'
                    onClick={(e) => onHandleMouseClick(e)}
                    onMouseMove={onHandleMouseMove}
                > HIGH QUALITY </button>
                <button
                    name='default'
                    onClick={(e) => onHandleMouseClick(e)}
                    onMouseMove={onHandleMouseMove}
                > DEFAULT </button>
            </div>
        </div>
    );
}

export { Settings };