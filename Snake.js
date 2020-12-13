class Snake {
    constructor(headX, headY) {
        let _head = new SnakeSegment(headX, headY, null);
        this.getHead = () => {
            return _head;

        };
        this.move = (direction) => {
            //_head = new SnakeSegment(_head.getX() + 1, _head.getY(), null);
            if (direction === Directions.Right) {
                _head = new SnakeSegment(_head.getX() + 1, _head.getY(), null);
            }
            if (direction === Directions.Left) {
                _head = new SnakeSegment(_head.getX() - 1, _head.getY(), null);
            }
            if (direction === Directions.Up) {
                _head = new SnakeSegment(_head.getX(), _head.getY() - 1, null);
            }
            if (direction === Directions.Down) {
                _head = new SnakeSegment(_head.getX(), _head.getY() + 1, null);
            }
        }

        this.eatApple = (apple) => {

        }
    }

}