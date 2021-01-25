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
        let _wallsArray = [];

        let _generateRandom = (maxX, maxY, execptArray) => {
            let x = Math.floor(Math.random() * maxX) + 1;
            let y = Math.floor(Math.random() * maxY) + 1;
            const coliding = execptArray.filter(p => p.x == x && p.y == y);

            if (coliding.length > 0) {
                return _generateRandom(maxX, maxY, execptArray);
            }

            return {
                x: x,
                y: y
            };
        }

        let _getUsedPlaces = () => {
            let apples = _applesArray.concat(Enumerable.from(_superApplesArray)
                .selectMany(
                    app => app.getApples()
                )
                .toArray());

            let wallsPoints = Enumerable.from(_wallsArray)
                .selectMany(
                    wall => wall.getPoints()
                )
                .toArray();

            let applesPoints = apples.map(app => ({
                x: app.getX(),
                y: app.getY()
            }));

            return wallsPoints.concat(applesPoints)
        }

        let _initApples = () => {
            _applesArray = [];

            let execpt = _getUsedPlaces();

            for (let i = 0; i < 2; i++) {
                const point = _generateRandom(_width - 1, _height - 1, execpt);
                _applesArray.push(new Apple(point.x, point.y));

                execpt.push(point);
            }
        }

        let _initSuperApples = () => {
            _superApplesArray = [];

            let execpt = _getUsedPlaces();

            for (let i = 0; i < 15; i++) {
                const point = _generateRandom(_width - 1, _height - 1, execpt);
                let superApple = new SuperApple(point.x, point.y);
                _superApplesArray.push(superApple);
                for (const apple of superApple.getApples()) {
                    execpt.push(point);
                }

            }
        }

        let _initWalls = () => {
            _wallsArray = [];
            let execpt = _getUsedPlaces();

            for (let i = 0; i < 5; i++) {
                const point = _generateRandom(_width - 1, _height - 1, execpt);
                let wall = new Wall(point.x, point.y);
                _wallsArray.push(wall);
                for (const p of wall.getPoints()) {
                    execpt.push(point);
                }

            }

            console.log(Enumerable.from(_wallsArray).selectMany(wall => wall.getPoints()).toArray())
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


            for (const wall of _wallsArray) {
                for (const point of wall.getPoints()) {
                    _display.changeColor(point.x, point.y, "orange")
                }
            }


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
        _initWalls();
        this.start();
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