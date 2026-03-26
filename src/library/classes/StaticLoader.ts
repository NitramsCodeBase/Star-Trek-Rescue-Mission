import { SetImage } from "./SetImage";
import { graphicTable } from "../configuration/Configuration";

class StaticLoader {
    private images: SetImage[] = [];
    private speed: number;

    // write code to preload every used image in the game.
    // unfortunately is it not comfortable at this moment.

    constructor() {
        // titlescreen data
        this.images[0] = new SetImage(graphicTable.space1);
        this.images[1] = new SetImage(graphicTable.enterprise, { x: 0, y: 0, width: 200, height: 50 });
        this.images[2] = new SetImage(graphicTable.logo, { x: 0, y: 0, width: 350, height: 100 });
        this.images[3] = new SetImage(graphicTable.rescuemission, { x: 0, y: 0, width: 800, height: 200 });
        this.images[4] = new SetImage(graphicTable.remastered, { x: 0, y: 0, width: 250, height: 80 });

        // planets
        this.images[5] = new SetImage(graphicTable.planet1, { x: 0, y: 0, width: 200, height: 200 });
        this.images[6] = new SetImage(graphicTable.planet1, { x: 1000, y: 350, width: 100, height: 100 });
        this.images[7] = new SetImage(graphicTable.planet1, { x: 1300, y: 450, width: 150, height: 150 });

        // klingons
        this.images[8] = new SetImage(graphicTable.birdofprey, { x: 1200, y: 100, width: 100, height: 50 });
        this.images[9] = new SetImage(graphicTable.birdofprey, { x: 1300, y: 150, width: 100, height: 50 });
        this.images[10] = new SetImage(graphicTable.birdofprey, { x: 1200, y: 200, width: 100, height: 50 });

        // settings screen images

        this.speed = 0;

        this.images[11] = new SetImage(graphicTable.space4);
        this.images[12] = new SetImage(graphicTable.planet1, { x: 1200, y: 200, width: 250, height: 250 });
        this.images[13] = new SetImage(graphicTable.planet1, { x: 0, y: 500, width: 150, height: 150 });

        this.images[14] = new SetImage(graphicTable.enterprise, { x: this.speed, y: 165, width: 200, height: 50 });
        this.images[15] = new SetImage(graphicTable.birdofprey, { x: 1325 - this.speed, y: 620, width: 100, height: 50 });
        this.images[16] = new SetImage(graphicTable.birdofprey, { x: 1325 - this.speed, y: 720, width: 100, height: 50 });
        this.images[17] = new SetImage(graphicTable.birdofprey, { x: 1425 - this.speed, y: 670, width: 100, height: 50 });
    }

    public drawTitleScreen = (): void => {
        for (var i = 0; i < 11; i++) {
            const image = this.images[i];

            if (i === 0) {
                image.draw();
            }
            else if (i === 1) {
                image.drawCentered();
            }
            else if (i === 2) {
                image.drawCentered(20, -250);
            }
            else if (i === 3) {
                image.drawCentered(0, -160);
            }
            else if (i === 4) {
                image.drawCentered(0, -75);
            }
            else {
                image.draw();
            }
        }
    }

    // public drawSettingsScreen = (): void => {
    //     while (this.speed <= 230) {
    //         for ( var i = 11; i < this.images.length; i++ ) {
    //             const image = this.images[i];

    //             image.draw();

    //             if ( i > 14 ) {
    //                 // image.setPosition(image.getX() - this.speed,image.getY());

    //                 // alert(`${i} = X = ${image.getX()} Y = ${image.getY()}`);
    //             }

    //             this.speed += 0.25;
    //         }
    //     }
    // }

    public dispose = (): void => {
        this.images.forEach(image => image.clear());
        this.images = [];
    }
}

export { StaticLoader };