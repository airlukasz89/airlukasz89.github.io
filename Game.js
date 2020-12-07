class Game {
    constructor(height, width, htmlElement, buttonUp, buttonRight, buttonDown, buttonLeft) {
        let _display = new Display(height, width);
        let _htmlElement = htmlElement;
        let _snake = new Snake(width / 2, height / 2);
        let _inputManager = new InputManager(buttonUp, buttonRight, buttonDown, buttonLeft);
        this.update = () => {

            console.log(_inputManager.getLastClickedButton());
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