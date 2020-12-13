class Game {
    constructor(height, width, htmlElement, buttonUp, buttonRight, buttonDown, buttonLeft) {
        let _display = new Display(height, width);
        let _htmlElement = htmlElement;
        let _width = width;
        let _height = height;
        let _snake = new Snake(width / 2, height / 2);
        let _inputManager = new InputManager(buttonUp, buttonRight, buttonDown, buttonLeft);

        let _applesArray = [];
        let _initApples = () => {
            for (let i = 0; i < 5; i++) {
                const x = Math.floor(Math.random() * _width) + 1;
                const y = Math.floor(Math.random() * _height) + 1;
                _applesArray.push(new Apple(x, y));
            }
        }
        _initApples();

        this.updateLogic = () => {
            let snakeDirection = _inputManager.getLastClickedButton();
            let head = _snake.getHead();

            _snake.move(snakeDirection);

            let appleToEat = null;
            for (const apple of _applesArray) {
                if (apple.getX() === head.getX()) {
                    if (apple.getY() === head.getY()) {
                        appleToEat = apple;
                        brake;
                    }
                }

            }
            _snake.eatApple(appleToEat)

        }

        this.render = () => {
            let head = _snake.getHead();
            _display.clear();
            _display.changeColor(head.getX(), head.getY(), 'green');
            for (const apple of _applesArray) {
                _display.changeColor(apple.getX(), apple.getY(), "pink");
                console.log(apple);
            }
            _display.render(_htmlElement);


        }

        this.start = () => {
            setInterval(() => {
                this.updateLogic();
                this.render();


            }, 400);
        }
    }
}