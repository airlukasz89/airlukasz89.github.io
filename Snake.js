class Snake {
    constructor(headX, headY) {
        let _head = new SnakeSegment(headX, headY, null);

        let _getMoveDiffVector = (direction) => {
            var diffVector = { x: 0, y : 0 };
            if (direction === Directions.Right) {
                diffVector = { x: 1, y: 0 };
            }
            if (direction === Directions.Left) {
                diffVector = { x: -1, y: 0 };
            }
            if (direction === Directions.Up) {
                diffVector = { x: 0, y: -1 };
            }
            if (direction === Directions.Down) {
                diffVector = { x: 0, y: 1 };
            }
            return diffVector;
        }

        this.getHead = () => {
            return _head;
        };

        this.move = (direction) => {
            let diffVector = _getMoveDiffVector(direction);

            console.log(this.getLength())
            let newHead = new SnakeSegment(_head.getX() + diffVector.x, _head.getY() + diffVector.y, _head);
            let head = newHead;
            while(head)
            {
                if(!!head.getNext() && !head.getNext().getNext())
                {
                    head.setNext(null);
                    break;
                }
                head = head.getNext();
            }
            _head = newHead;
            console.log(this.getLength())
        }

        this.eatApple = (apple) => {
            let newHead = new SnakeSegment(apple.getX(), apple.getY(), _head);
            _head = newHead;
        }
        
        this.getLength = () => {
            let length = 0;
            let head = _head;
            while(head)
            {
                length++;
                head = head.getNext();
            }
            return length;
        }
    }
}