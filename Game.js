class Game {
    constructor(height, width, htmlElement, buttonUp, buttonRight, buttonDown, buttonLeft, pointsSpan) {
        let _display = new Display(height, width, htmlElement);
        let _width = width;
        let _height = height;
        let _snake = new Snake(width / 2, height / 2);
        let _inputManager = new InputManager(buttonUp, buttonRight, buttonDown, buttonLeft);
        let _snakeDirection = null;
        let _pointsSpan = pointsSpan;
        let _points = 0;
        let _applesArray = [];
        let _superApplesArray = [];
        let _deley = 400;
        let _nextSpeedUpPoints = 10;
        let _gameInterval;

        let _generateRandom = (max, execptArray) => {
            let number = Math.floor(Math.random() * max) + 1;
            const coliding = execptArray.filter(element => element == number);

            if (coliding.length > 0) {
                return _generateRandom(max, execptArray);
            }

            return number;
        }

        let _initApples = () => {
            _applesArray = [];
            for (let i = 0; i < 2; i++) {
                const x = _generateRandom(_width - 1, []);
                const y = _generateRandom(_height - 1, []);
                _applesArray.push(new Apple(x, y));
            }
        }

        let _initSuperApples = () => {
            _superApplesArray = [];
            for (let i = 0; i < 15; i++) {
                const x = _generateRandom(_width - 2, []);
                const y = _generateRandom(_height - 2, []);
                _superApplesArray.push(new SuperApple(x, y));
            }
        }



        let _getAppleToEat = (head) => {
            for (const apple of _applesArray) {
                if (apple.getX() === head.getX() &&
                    apple.getY() === head.getY()) {
                    return apple;
                }
            }
            return null;
        }

        let _getSuperAppleToEat = (head) => {
            for (const superApple of _superApplesArray) {
                if (superApple.isColiding(head.getX(), head.getY())) {
                    return superApple;
                }
            }
            return null;
        }

        let _getPointToTeleport = (head) => {

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

        let _getDirection = () => {
            let newSnakeDirection = _inputManager.getLastClickedButton();

            if (newSnakeDirection == null) return _snakeDirection;

            if (
                (newSnakeDirection === Directions.Up && _snakeDirection === Directions.Down) ||
                (newSnakeDirection === Directions.Down && _snakeDirection === Directions.Up) ||
                (newSnakeDirection === Directions.Left && _snakeDirection === Directions.Right) ||
                (newSnakeDirection === Directions.Right && _snakeDirection === Directions.Left)
            ) {
                return _snakeDirection;
            }

            return newSnakeDirection;
        }

        let _restartGameplay = () => {
            _snake = new Snake(width / 2, height / 2);
            _initApples();
            _initSuperApples();
            _snakeDirection = null;
            _inputManager.reset();
            _clearPoints()
        }

        let _addPoint = (value) => {
            _pointsSpan.textContent = _points = _points + value;
        }

        let _clearPoints = () => {
            _pointsSpan.textContent = _points = 0;
        }

        this.updateLogic = () => {
            _snakeDirection = _getDirection();

            let head = _snake.getHead();
            let snakeTmp = new Snake(head.getX(), head.getY());
            snakeTmp.move(_snakeDirection);
            head = snakeTmp.getHead();

            let appleToEat = _getAppleToEat(head);
            let superAppleToEat = _getSuperAppleToEat(head);
            let pointToTeleport = _getPointToTeleport(head);

            let _accelerateSnakeMove = () => {
                this.stop();
                _deley -= 30;
                this.start();
                _nextSpeedUpPoints += 5;
                console.log(_deley);

            }

            if (appleToEat) {
                _applesArray.splice(_applesArray.indexOf(appleToEat), 1);

                _snake.eatApple(appleToEat.getX(), appleToEat.getY());

                var audio = new Audio('ping.mp3');
                audio.play();
                _addPoint(1);
                _snake.move(_snakeDirection);
            } else if (superAppleToEat) {
                _superApplesArray.splice(_superApplesArray.indexOf(superAppleToEat), 1);

                _snake.eatApple(head.getX(), head.getY());
                snakeTmp.move(_snakeDirection);
                head = snakeTmp.getHead();
                _snake.eatApple(head.getX(), head.getY());

                var audio = new Audio('pong.wav');
                audio.play();
                _addPoint(4);
                _snake.move(_snakeDirection);
            } else if (pointToTeleport) {
                _snake.teleport(pointToTeleport.x, pointToTeleport.y);
            } else {
                _snake.move(_snakeDirection);
            }

            if (_points > _nextSpeedUpPoints) {

                _accelerateSnakeMove();
            }


            if (_snake.isSelfColiding()) {
                _restartGameplay()
            }

            if (_applesArray.length <= 0 && _superApplesArray.length <= 0) {
                _initApples();
                _initSuperApples();
                this.stop();
            }

        }

        let _changeApplesColor = (applesArray) => {
            for (const apple of applesArray) {
                _display.changeColor(apple.getX(), apple.getY(), "red");
            }
        }

        this.render = () => {
            _display.clear();

            let head = _snake.getHead();
            while (head) {
                _display.changeColor(head.getX(), head.getY(), 'green');
                head = head.getNext();
            }

            _changeApplesColor(_applesArray);

            for (const superApple of _superApplesArray) {
                _changeApplesColor(superApple.getApples())
            }

            _display.render();
        }



        this.start = () => {
            _gameInterval = setInterval(() => {
                this.updateLogic();
                this.render();
            }, _deley);
        }

        this.stop = () => {
            clearInterval(_gameInterval);
            _gameInterval = null;
        }

        _initApples();
        _initSuperApples();

        // let _x = () => {
        //     setTimeout(() => {
        //         var audio = new Audio('ping.mp3');
        //         audio.play();
        //         _x();
        //     }, 100)
        // }
        // _x();
    }
}