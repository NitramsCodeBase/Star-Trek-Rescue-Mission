import { createRoot } from 'react-dom/client';
import { gameSettings } from '../configuration/Configuration';

class Tools {
    public static sleep = (millis: number) => {
        let date: any = new Date();
        let curDate: any = null;

        do { curDate = new Date(); }
        while (curDate - date < millis);
    }

    public static switchToFullscreen = (): void => {
        const htmlElement: any = document.getElementById('root');

        if (htmlElement) {
            if (htmlElement.requestFullscreen) {
                htmlElement.requestFullscreen();
            } else if (htmlElement.webkitRequestFullscreen) {
                htmlElement.webkitRequestFullscreen();
            } else if (htmlElement.msRequestFullscreen) {
                htmlElement.msRequestFullscreen();
            }
        }
    }

    public static showCursor = (): void => {
        document.body.style.cursor = 'pointer';
    }

    public static hideCursor = (): void => {
        document.body.style.cursor = 'none';
    }

    public static getRandomNumber = (maximum: number, minimum?: number, round?: boolean): number => {
        if (!minimum)
            minimum = 1;

        return !round ?
            Number(Math.random() * (maximum - minimum) + minimum) :
            Math.floor(Math.random() * (maximum - minimum) + minimum);
    }

    public static disableContextMenu = (): void => {
        (document.getElementById('root') as HTMLElement)
            .addEventListener('contextmenu', (e: any) => e.preventDefault());
    }

    public static clearComponent = (id: any): void => {
        clearInterval(id);
    }

    public static renderComponent = (component: any): void => {
        createRoot(document.getElementById('root') as HTMLElement)
            .render(component);
    }

    public static printWarpSpeedOnCanvas = (speed: number, positionY: number) => {
        const context = (document.getElementById('canvas') as HTMLCanvasElement)
            .getContext('2d');

        if (speed === 2.50)
            speed = 1;
        else if (speed === 5.0)
            speed = 2;
        else if (speed === 7.50)
            speed = 3;
        else if (speed === 10.00)
            speed = 4;
        else if (speed === 12.50)
            speed = 5;
        else if (speed === 15.00)
            speed = 6;
        else if (speed === 17.50)
            speed = 7;
        else if (speed === 20.00)
            speed = 8;
        else
            speed = 9;

        if (context) {
            context.fillStyle = gameSettings.hud.fontcolor;
            context.font = `italic ${gameSettings.hud.fontsize} Trek`;
            context.fillText(`WARP SPEED SET TO ${speed}`, 570, positionY);
        }
    }

    public static printMessage = (x: number, y: number, message: string, fontsize: string, fontcolor: string): void => {
        const context = (document.getElementById('canvas') as HTMLCanvasElement)
            .getContext('2d');

        if (context) {
            context.fillStyle = fontcolor;
            context.font = 'italic ' + fontsize + ' Trek';
            context.fillText(message, x, y);
        }
    }
}

export { Tools };