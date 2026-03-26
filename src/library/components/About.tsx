import { Canvas } from './Canvas';
import { SetImage } from '../classes/SetImage';
import { Tools } from '../classes/Tools';

import {
    gameSettings,
    graphicTable,
    soundTable,
    soundSettings,
    buttonSettings
} from '../configuration/Configuration';

import '../css/About.css';

const About = () => {
    let playOnced: boolean = false;

    Tools.disableContextMenu();

    const intervalId = setInterval(() => {
        requestAnimationFrame(updateFrame);
    }, gameSettings.updateTime / gameSettings.maxFPS);

    const updateFrame = (): void => {
        if (!playOnced) {
            soundTable.theme.stop();
            soundTable.redalert.play();
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

    return (
        <div className='About'>
            <Canvas />
            <div className='headline'>
                <h1> ABOUT STAR TREK RESCUE MISSION REMASTERED </h1>
            </div>
            <div className='article-container'>
                <p> STAR TREK RESCUE MISSION REMASTERED IS BASED ON THE JAVASCRIPT VERSION.</p>
                <p> THIS GAME HAS BEEN DEVELOPED IN NODEJS USING TYPESCRIPT PROGRAMMING LANGUAGE.</p>
                <p> CURRENTLEY RELEASED AS A PRE-ALPHA VERSION.</p>
                <br />
                <br />
                <p> THIS GAME IS AN ADVANCED VERSION OF THE LESS FEATURED JAVASCRIPT ONE. </p>
                <p> DEVELOPED BY MARTIN STEINKASSERER </p>
                <br />
                <p> STAR TREK AND ITS REGISTERED TRADEMARKS BELONGS TO PARAMOUNT STUDIOS </p>
            </div>
            <div className='about-button-container'>
                <button
                    onMouseMove={onHandleMouseMove}
                    onClick={onHandleMouseClick}> BACK TO BRIEFING </button>
            </div>
        </div>
    );
}

export { About };