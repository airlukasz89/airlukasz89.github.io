class Game {
    constructor(height, width, htmlElement) {
        let _display = new Display(height, width);
        let _htmlElement = htmlElement;
        let _snake = new Snake(width / 2, height / 2);
        this.update = () => {
            console.log(Date.now());
        }
        this.render = () => {
            let head = _snake.getHead();
            _display.changeColor(head.getX(), head.getY(), 'green');
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