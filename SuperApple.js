class SuperApple {
    constructor(x, y) {
        let _x = x
        let _y = y
        let _applesArray = [];

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



    }

}