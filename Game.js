class Game {
    constructor(height, width, htmlElement, buttonUp, buttonRight, buttonDown, buttonLeft, pointsSpan, scoreLabel) {
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
        let _delay = 200;
        let _nextSpeedUpPoints = 10;
        let _gameInterval;
        let _wallsArray = [];
        let _scoreLabel = scoreLabel;
        let _wallsInGame = 0;





        async function _fetch(url = '', data = {}, method) {
            let fetchData = {
                method: method, // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json',
                    "x-apikey": '601461426adfba69db8b6b55'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                // body: JSON.stringify(data) // body data type must match "Content-Type" header
            }

            if (method === "POST") {
                fetchData["body"] = JSON.stringify(data);
            }

            // Default options are marked with *
            const response = await fetch(url, fetchData);
            return response.json(); // parses JSON response into native JavaScript objects
        }

        let _updateScores = () => {
            _fetch('https://snejkdatabase-0b0e.restdb.io/rest/records', {}, "GET")
                .then(recordsArray => {
                    _scoreLabel.innerHTML = "";
                    recordsArray = recordsArray.sort((record1, record2) => record2.points - record1.points);
                    recordsArray = recordsArray.slice(0, 10);
                    for (let i = 0; i < recordsArray.length; i++) {
                        let record = recordsArray[i];

                        _scoreLabel.innerHTML += `${i+1}. ${record.name} - ${record.points} (${record.platform}) <br/>`.toUpperCase();
                    }

                    console.log(recordsArray); // JSON data parsed by `data.json()` call
                });
        }

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

            let head = _snake.getHead();
            let deadZoneSize = 8;
            let snakeDeadZone = [];
            for (let x = head.getX() - deadZoneSize; x < head.getX() + deadZoneSize; x++) {
                for (let y = head.getY() - deadZoneSize; y < head.getY() + deadZoneSize; y++) {
                    snakeDeadZone.push({
                        x: x,
                        y: y
                    })
                }
            }


            let currentSegment = head;
            let snakePoints = [];
            while (currentSegment) {
                snakePoints.push({
                    x: currentSegment.getX(),
                    y: currentSegment.getY()
                })

                currentSegment = currentSegment.getNext();
            }

            let points = wallsPoints.concat(applesPoints).concat(snakeDeadZone).concat(snakePoints);

            return Enumerable
                .from(points)
                .selectMany(p => [{
                        x: p.x - 1,
                        y: p.y - 1
                    },
                    {
                        x: p.x,
                        y: p.y - 1
                    },
                    {
                        x: p.x + 1,
                        y: p.y - 1
                    },

                    {
                        x: p.x - 1,
                        y: p.y
                    },
                    {
                        x: p.x,
                        y: p.y
                    },
                    {
                        x: p.x + 1,
                        y: p.y
                    },

                    {
                        x: p.x - 1,
                        y: p.y + 1
                    },
                    {
                        x: p.x,
                        y: p.y + 1
                    },
                    {
                        x: p.x + 1,
                        y: p.y + 1
                    },
                ])
                .toArray();
        }

        let _initApples = () => {
            _applesArray = [];

            for (let i = 0; i < 2; i++) {
                let execpt = _getUsedPlaces();
                const point = _generateRandom(_width - 1, _height - 1, execpt);
                _applesArray.push(new Apple(point.x, point.y));
            }
        }

        let _initSuperApples = () => {
            _superApplesArray = [];

            for (let i = 0; i < 3; i++) {
                let execpt = _getUsedPlaces();
                const point = _generateRandom(_width - 1, _height - 1, execpt);
                let superApple = new SuperApple(point.x, point.y);
                _superApplesArray.push(superApple);
            }
        }

        let _initWalls = () => {
            _wallsArray = [];

            for (let i = 0; i < _wallsInGame; i++) {
                let execpt = _getUsedPlaces();
                const point = _generateRandom(_width - 1, _height - 1, execpt);
                let wall = new Wall(point.x, point.y);
                _wallsArray.push(wall);
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

        function _getOS() {
            var userAgent = window.navigator.userAgent,
                platform = window.navigator.platform,
                macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
                windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
                iosPlatforms = ['iPhone', 'iPad', 'iPod'],
                os = null;

            if (macosPlatforms.indexOf(platform) !== -1) {
                os = 'Mac OS';
            } else if (iosPlatforms.indexOf(platform) !== -1) {
                os = 'iOS';
            } else if (windowsPlatforms.indexOf(platform) !== -1) {
                os = 'Windows';
            } else if (/Android/.test(userAgent)) {
                os = 'Android';
            } else if (!os && /Linux/.test(platform)) {
                os = 'Linux';
            }

            return os;
        }

        let _addScore = () => {
            let name = "";
            do {
                name = prompt("Please enter your name");
            } while (name == null || name == "");




            function truncate(str, n) {
                return (str.length > n) ? str.substr(0, n - 1) : str;
            };
            name = truncate(name, 10)

            _fetch('https://snejkdatabase-0b0e.restdb.io/rest/records', {
                    name: name,
                    points: _points,
                    platform: navigator.platform //_getOS()
                }, "POST")
                .then(data => {
                    _updateScores()
                });
        }

        let _restartGameplay = () => {
            _addScore();
            _wallsInGame = 0;
            _snake = new Snake(width / 2, height / 2);
            _initApples();
            _initSuperApples();
            _wallsArray = [];
            _snakeDirection = null;
            _inputManager.reset();
            _clearPoints()
            _rerunIntervalWithDelay(200);
        }

        let _addPoint = (value) => {
            _pointsSpan.textContent = _points = _points + value;
        }

        let _clearPoints = () => {
            _pointsSpan.textContent = _points = 0;
            _nextSpeedUpPoints = 10;
        }

        let _goToNextLevel = () => {
            _wallsInGame += 5;
            _initWalls();
            _initSuperApples();
            _initApples();
            _rerunIntervalWithDelay(200);
        }

        let _isWallSnakeColiding = () => {
            let pointsWall = Enumerable.from(_wallsArray).selectMany(wall => wall.getPoints()).toArray();
            let head = _snake.getHead();

            const coliding = pointsWall.filter(point => point.x == head.getX() && point.y == head.getY());
            if (coliding.length > 0) {
                console.log('kolizja ze ścianą')
                return true;
            }




            return false;
            // let pointsWall = Enumerable.from(_wallsArray).selectMany(wall => wall.getPoints()).toArray();
            // let currentSegment = _snake.getHead();
            // while (currentSegment) {
            //     const coliding = pointsWall.filter(point => point.x == currentSegment.getX() && point.y == currentSegment.getY());
            //     if (coliding.length > 0) {
            //         console.log('kolizja ze ścianą')
            //         return true;
            //     }

            //     currentSegment = currentSegment.getNext();
            // }

            // return false;
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


            if (_snake.isSelfColiding() || _isWallSnakeColiding()) {
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
        _updateScores();

        setInterval(() => {
            _updateScores();
        }, 5000);

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