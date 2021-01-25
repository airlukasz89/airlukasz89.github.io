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
        let _delay = 400;
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

        let _getUsedPlaces = () => {
            let apples = _applesArray.concat(Enumerable.from(_superApplesArray)
                .selectMany(
                    app => Enumerable.from(app.getApples())
                    .toArray()
                )
                .toArray());

            return apples.map(app => ({
                x: app.getX(),
                y: app.getY()
            }));
        }

        let _initApples = () => {
            _applesArray = [];

            let execptXes = _getUsedPlaces().map(p => p.x);
            let execptYes = _getUsedPlaces().map(p => p.y);

            for (let i = 0; i < 2; i++) {
                const x = _generateRandom(_width - 1, execptXes);
                const y = _generateRandom(_height - 1, execptYes);
                _applesArray.push(new Apple(x, y));

                execptXes.push(x);
                execptYes.push(y);

            }


        }

        let _initSuperApples = () => {
            _superApplesArray = [];

            let execptXes = _getUsedPlaces().map(p => p.x);
            let execptYes = _getUsedPlaces().map(p => p.y);

            for (let i = 0; i < 15; i++) {
                const x = _generateRandom(_width - 2, []);
                const y = _generateRandom(_height - 2, []);
                let superApple = new SuperApple(x, y);
                _superApplesArray.push(superApple);
                for (const apple of superApple.getApples()) {
                    execptXes.push(apple.getX());
                    execptYes.push(apple.getY());
                }

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

        let _rerunIntervalWithDelay = (newDelay) => {
            this.stop();
            _delay = newDelay;
            this.start();
        }

        let _accelerateSnakeMove = () => {
            _rerunIntervalWithDelay(_delay - 30);
            _nextSpeedUpPoints += 5;
            console.log(_delay);

        }


        let _restartGameplay = () => {
            _snake = new Snake(width / 2, height / 2);
            _initApples();
            _initSuperApples();
            _snakeDirection = null;
            _inputManager.reset();
            _clearPoints()
            _rerunIntervalWithDelay(400);
        }

        let _addPoint = (value) => {
            _pointsSpan.textContent = _points = _points + value;
        }

        let _clearPoints = () => {
            _pointsSpan.textContent = _points = 0;
        }

        let _goToNextLevel = () => {
            _initApples();
            _initSuperApples();
            _rerunIntervalWithDelay(400);
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
                _goToNextLevel();
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
            }, _delay);
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