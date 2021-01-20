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
            for (let i = 0; i < 50; i++) {
                const x = Math.floor(Math.random() * _width) + 1;
                const y = Math.floor(Math.random() * _height) + 1;
                _applesArray.push(new Apple(x, y));
            }
        }
        _initApples();

        let _getAppleToEat = (head) => {
            for (const apple of _applesArray) {
                if (apple.getX() === head.getX() &&
                    apple.getY() === head.getY()) {
                    return apple;
                }
            }
            return null;
        }

        let _getPointToTeleport = (head, direction) => {

            var pointToTeleport = null;

            if (head.getX() > _width - 1) {
                pointToTeleport = {
                    x: 0,
                    y: head.getY()
                };
            }
            if (head.getX() < 0) {
                pointToTeleport = {
                    x: _width - 1,
                    y: head.getY()
                };
            }
            if (head.getY() > _height - 1) {
                pointToTeleport = {
                    x: head.getX(),
                    y: 0
                };
            }
            if (head.getY() < 0) {
                pointToTeleport = {
                    x: head.getX(),
                    y: _height - 1
                };
            }


            return pointToTeleport;
        }



        this.updateLogic = () => {
            let snakeDirection = _inputManager.getLastClickedButton();

            let head = _snake.getHead();
            let snakeTmp = new Snake(head.getX(), head.getY());
            snakeTmp.move(snakeDirection);
            head = snakeTmp.getHead();

            let appleToEat = _getAppleToEat(head);
            let pointToTeleport = _getPointToTeleport(head, snakeDirection)

            if (appleToEat) {
                _snake.eatApple(appleToEat);
                _applesArray.splice(_applesArray.indexOf(appleToEat), 1);
            } else if (pointToTeleport) {
                _snake.teleport(pointToTeleport.x, pointToTeleport.y);
            } else {
                _snake.move(snakeDirection);
            }

            console.log("Snake length: " + +_snake.getLength());
        }

        this.render = () => {
            _display.clear();

            let head = _snake.getHead();
            while (head) {
                _display.changeColor(head.getX(), head.getY(), 'green');
                head = head.getNext();
            }

            for (const apple of _applesArray) {
                _display.changeColor(apple.getX(), apple.getY(), "red");

            }
            _display.render(_htmlElement);
        }

        this.start = () => {
            setInterval(() => {
                this.updateLogic();
                this.render();
            }, 100);
        }
    }
}