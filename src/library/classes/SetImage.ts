import { Tools } from "./Tools";

type Coordinates = {
    x: number;
    y: number;
    width: number;
    height: number;
};

enum Direction {
    Up = 0,
    Down = 1,
    Right = 2,
    Left = 3
}

class SetImage {
    private img;
    private context;
    private coordinates;
    private canvas;
    private center: boolean = false;

    constructor(path: string, coordinates?: Coordinates) {
        this.coordinates = coordinates;
        this.img = new Image() as HTMLImageElement;
        this.img.src = path;

        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.context = this.canvas.getContext('2d');
    }

    // public methods

    public getX = (): number => {
        if (this.coordinates)
            return this.coordinates.x;

        return 0;
    }

    public getY = (): number => {
        if (this.coordinates)
            return this.coordinates.y;

        return 0;
    }

    public getWidth = (): number => {
        if (this.coordinates)
            return this.coordinates.width;

        return 0;
    }

    public getHeight = (): number => {
        if (this.coordinates)
            return this.coordinates.height;

        return 0;
    }

    public setCenter = (): SetImage => {
        this.center = true;
        return this;
    }

    public setPosition = (x: number, y: number): void => {
        if (this.coordinates) {
            this.coordinates.x = x;
            this.coordinates.y = y;

            this.draw();
        }
    }

    public getCenterCoordinates = () => {
        let dx: number = 0;
        let dy: number = 0;
        let x: number = 0;
        let y: number = 0;

        if (this.coordinates) {
            dx = (this.canvas.width + this.coordinates.width - this.coordinates.x) / 2;
            dy = (this.canvas.height + this.coordinates.height - this.coordinates.y) / 2;
            x = Math.abs(this.coordinates.x - dx);
            y = Math.abs(this.coordinates.y - dy);
        }

        return {
            x: x,
            y: y,
            width: dx,
            height: dy
        }
    }

    public drawCentered = (xOffset?: number, yOffset?: number): void => {
        if (this.coordinates) {

            this.coordinates.x = (window.screen.availWidth - this.coordinates.width) / 2;
            this.coordinates.y = (window.screen.availHeight - this.coordinates.height) / 2;

            this.coordinates.y += yOffset === undefined ? 0 : yOffset;
            this.coordinates.x += xOffset === undefined ? 0 : xOffset;

            this.draw();
        }
    }

    public rotate = (direction: Direction, rotationTime: number): void => {
        switch (direction.valueOf()) {
            case Direction.Up: {
                break;
            }
            case Direction.Down: {
                break;
            }
            case Direction.Left: {
                break;
            }
            case Direction.Right: {
                break;
            }
        }
    }

    public rotateImage = (): void => {
        if (this.context)
            this.context.setTransform(1, 0.2, 0.8, 1, 0, 0);
    }

    public draw = (): void => {
        if (this.coordinates) {
            if (this.center) {
                this.coordinates = this.getCenterCoordinates();
            }

            this.context?.beginPath();

            this.context?.drawImage(this.img,
                this.coordinates.x,
                this.coordinates.y,
                this.coordinates.width,
                this.coordinates.height
            );
        }
        else {
            this.context?.beginPath();

            this.context?.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.height);
        }
    }

    public clear = (): void => {
        this.img.src = '';

        if (this.coordinates) {
            const { x, y, width, height } = this.coordinates;
            this.context?.drawImage(this.img, x, y, width, height);
        } else {
            this.context?.drawImage(this.img, 0, 0);
        }
    }

    public update = (coordinates: Coordinates): void => {
        const { x, y, width, height } = coordinates;
        if (this.context)
            this.context.drawImage(this.img, x, y, width, height);
    }
}

export { SetImage };