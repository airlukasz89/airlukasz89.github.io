class SuperApple {
    constructor(x, y) {
        let _x = x
        let _y = y
        let _applesArray = [];
        let _direction = Directions.Random();
        let _countMove = 0;
        let _counterMax = Math.floor(Math.random() * 6);


        this.isColiding = (x, y) => {
            for (const apple of _applesArray) {
                if (apple.getX() === x && apple.getY() === y) {
                    return true;
                }
            }
            return false;
        };

        this.getApples = () => {

            return _applesArray;
        }


        _applesArray.push(new Apple(_x, _y));
        _applesArray.push(new Apple(_x + 1, _y + 1));
        _applesArray.push(new Apple(_x, _y + 1));
        _applesArray.push(new Apple(_x + 1, _y));

        let _getDiffVector = (direction) => {
            var diffVector = {
                x: 0,
                y: 0
            };
            if (direction === Directions.Right) {
                diffVector = {
                    x: 1,
                    y: 0
                };
            }
            if (direction === Directions.Left) {
                diffVector = {
                    x: -1,
                    y: 0
                };
            }
            if (direction === Directions.Up) {
                diffVector = {
                    x: 0,
                    y: -1
                };
            }
            if (direction === Directions.Down) {
                diffVector = {
                    x: 0,
                    y: 1
                };
            }
            return diffVector;
        }


        let _diffVector = _getDiffVector(_direction);

        this.move = () => {
            if (_countMove > _counterMax) {
                _countMove = 0;
                _diffVector.x *= -1;
                _diffVector.y *= -1;
            }

            let applesCoordinateArray = [];

            for (const apple of _applesArray) {
                applesCoordinateArray.push(new Apple(apple.getX() + _diffVector.x, apple.getY() + _diffVector.y));
            }
            _applesArray = applesCoordinateArray;

            _countMove += 1;

            // console.log(applesCoordinateArray);
        }

    }



}