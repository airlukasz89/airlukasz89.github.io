class Wall {
    constructor(x, y) {
        let _x = x
        let _y = y
        let _pointsArray = [];



        this.getPoints = () => {
            return _pointsArray;
        }



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

        let directionCreation = Directions.Random();

        let diffVector = _getDiffVector(directionCreation)

        for (let i = 0; i < 4; i++) {
            _pointsArray.push({
                x: _x + (diffVector.x * i),
                y: _y + (diffVector.y * i)
            })
        }


    }

}