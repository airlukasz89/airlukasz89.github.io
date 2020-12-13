class Snake {
    constructor(headX, headY) {
        let _head = new SnakeSegment(headX, headY, null);

        this.getHead = () => {
            return _head;

        };

        this.move = (direction) => {
            if (direction === Directions.Right) {
                //TODO
                _head = new SnakeSegment(_head.getX() + 1, _head.getY(), _head.getNext());
            }
            if (direction === Directions.Left) {
                _head = new SnakeSegment(_head.getX() - 1, _head.getY(), _head.getNext());
            }
            if (direction === Directions.Up) {
                _head = new SnakeSegment(_head.getX(), _head.getY() - 1, _head.getNext());
            }
            if (direction === Directions.Down) {
                _head = new SnakeSegment(_head.getX(), _head.getY() + 1, _head.getNext());
            }
        }

        this.eatApple = (apple) => {
            let newHead = new SnakeSegment(apple.getX(), apple.getY(), _head);
            _head = newHead;
        }
    }

}