import { graphicTable } from '../configuration/Configuration';
import { SetImage } from './SetImage';

class Planet {
    private x: number;
    private y: number;
    private radius: number;

    private image: SetImage;

    constructor(x: number, y: number, radius: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;

        const randomPlanet:number = Math.random();

        let planet:string = '';

        if (randomPlanet > 0.50) planet = graphicTable.planet1;
        if (randomPlanet < 0.50) planet = graphicTable.planet2;

        // in future 

        this.image = new SetImage(planet,
            { x: x, y: y, width: radius, height: radius });
    }

    // public methods

    public getPosition = ()  => {
        return {
            x1: this.x,
            y1: this.y,
            x2: this.x + this.radius,
            y2: this.y + this.radius
        };
    }

    public draw = (): void => {
        this.image.draw();
    }

    public rotatePlanetary = (speed:number) : void => {
        this.image.rotateImage();
    }
}

export { Planet };