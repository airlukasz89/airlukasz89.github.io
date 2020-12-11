class Game {
    constructor(height, width, htmlElement, buttonUp, buttonRight, buttonDown, buttonLeft) {
        let _display = new Display(height, width);
        let _htmlElement = htmlElement;
        let _snake = new Snake(width / 2, height / 2);
        let _inputManager = new InputManager(buttonUp, buttonRight, buttonDown, buttonLeft);
        this.updateLogic = () => {
            let snakeDirection = _inputManager.getLastClickedButton();
            _snake.move(snakeDirection);

        }
        this.render = () => {
            let head = _snake.getHead();
            _display.clear();
            _display.changeColor(head.getX(), head.getY(), 'green');
            _display.render(_htmlElement);


        }



        this.start = () => {
            setInterval(() => {
                this.updateLogic();
                this.render();


            }, 1000);

        }
        //kierunki
        //snake
        //logika
        //display

    }
}