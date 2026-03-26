class Thread {
    private timer: number = 1_000;

    constructor(timer: number) {
        this.timer = timer;
    }

    public run = async () : Promise<void> => {
        await this.sleep();
    }

    private sleep = () : Promise<void> => new Promise((resolve: any) => setTimeout(resolve, this.timer));
}

export { Thread };