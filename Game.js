class Game {
    constructor(height, width, htmlElement) {
        let _display = new Display(height, width);
        let _htmlElement = htmlElement;
        this.update = () => {
            console.log(Date.now());
        }
        this.render = () => {
            _display.render(_htmlElement);
        }

        this.start = () => {
            setInterval(() => {
                this.update();
                this.render();

            }, 500);

        }
        //kierunki
        //snake
        //logika
        //display

    }
}