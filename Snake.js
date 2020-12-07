class Snake {
    constructor(headX, headY) {
        let _head = new SnakeSegment(headX, headY, null);
        this.getHead = () => {
            return _head;

        };

    }

}