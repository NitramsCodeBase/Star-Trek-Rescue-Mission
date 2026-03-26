import React from 'react'
import { gameSettings } from '../configuration/Configuration';

const Canvas = () => {
    return <>
        <canvas
            id='canvas'
            className='canvas'
            width={gameSettings.maxWindowWidth}
            height={gameSettings.maxWindowHeight}
        />
    </>
}

export { Canvas };