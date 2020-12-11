class Snake {
    constructor(headX, headY) {
        let _head = new SnakeSegment(headX, headY, null);
        this.getHead = () => {
            return _head;

        };
        this.move = (direction) => {
            _head = new SnakeSegment(_head.getX() + 1, _head.getY(), null);

        }
    }

}