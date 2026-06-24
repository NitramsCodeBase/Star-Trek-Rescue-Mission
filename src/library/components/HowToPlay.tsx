import { Canvas } from './Canvas';
import { SetImage } from '../classes/SetImage';
import { Tools } from '../classes/Tools';
import "../css/HowToPlay.css";

import {
    gameSettings,
    graphicTable,
    soundTable,
    soundSettings,
    buttonSettings
} from '../configuration/Configuration';

const HowToPlay = () => {
    let playOnced: boolean = false;

    Tools.disableContextMenu();

    const intervalId = setInterval(() => {
        requestAnimationFrame(updateFrame);
    }, gameSettings.updateTime / gameSettings.maxFPS);

    const updateFrame = (): void => {
        if (!playOnced) {
            soundTable.theme.stop();
            soundTable.tribble.setVolume(soundSettings.tribbleSoundVolume).play();
            playOnced = true;
        }

        new SetImage(graphicTable.space4)
            .draw();

        new SetImage(graphicTable.enterprise,
            { x: 100, y: 100, width: 200, height: 50 })
            .draw();

        new SetImage(graphicTable.birdofprey,
            { x: 1300, y: 500, width: 100, height: 50 })
            .draw();

        new SetImage(graphicTable.birdofprey,
            { x: 1300, y: 600, width: 100, height: 50 })
            .draw();

        new SetImage(graphicTable.birdofprey,
            { x: 1400, y: 550, width: 100, height: 50 })
            .draw();

        new SetImage(graphicTable.planet1,
            { x: 1200, y: 200, width: 250, height: 250 })
            .draw();

        new SetImage(graphicTable.planet1,
            { x: 0, y: 500, width: 150, height: 150 })
            .draw();
    }

    const onHandleMouseMove = (): void => {
        soundTable.computer.setVolume(soundSettings.buttonVolume).play();
    }

    const onHandleMouseClick = (): void => {
        soundTable.door.setVolume(soundSettings.buttonVolume).play();
        Tools.sleep(buttonSettings.delay);
        Tools.clearComponent(intervalId);
        
        window.location.reload();
    }

    const showMouseControls = () => {
        if(!gameSettings.mouseEnabled) 
            return;

        return <>
            <p className='p-underline'> MOUSE CONTROLS: </p>
            <p> MOUSE UP/DOWN : MOVES UP OR DOWNWARDS THE ENTERPRISE </p>
            <p> LEFT BUTTON   : SHOTS THE PHASER </p>
            <p> MIDDLE BUTTON : ACTIVATES THE WARP DRIVE </p>
            <p> RIGHT BUTTON  : SHOT A PHOTON TORPEDO TO ITS TARGET </p>
            <p> MOUSEWHEEL    : TO INCREASE/DECREASE IMPULSE SPEED </p>
        </>
    }

    return (
        <div className='About'>
            <Canvas />
            <div className='headline'>
                <h1> HOW TO PLAY STAR TREK RESCUE MISSION </h1>
            </div>
            <div className='article-container'>
                {showMouseControls()}
                <p className='p-underline'> KEYBOARD CONTROLS: </p>
                <p> W/S           : MOVES UP OR DOWNWARDS THE ENTERPRISE</p>
                <p> A/D           : TO INCREASE/DECREASE IMPULSE SPEED</p>
                <p> E             : ACTIVATES THE WARP DRIVE </p>
                <p> SPACEBAR      : SHOTS THE PHASER </p>
                <p> X             : SHOT A PHOTON TORPEDO TO ITS TARGET </p>
                <p> 1, 2, 3, 4    : TO INCREASE/DECREASE IMPULSE SPEED </p>
                <p> 5 TO BACKSPACE: TO SET TRAVEL DISTANCE</p>
                <p> ^             : TO IMMEDIATELY STOP THE ENTERPRISE </p>
            </div>
            <div className='button-container'>
                <button
                    onMouseMove={onHandleMouseMove}
                    onClick={onHandleMouseClick}> BACK TO BRIEFING </button>
            </div>
        </div>
    );
}

export { HowToPlay };