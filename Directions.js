class Directions {
  static Up = "up";
  static Down = "down";
  static Left = "left";
  static Right = "right";

  static GetDirectionFromButton = (value) => {
    if (value == Directions.Up) return Directions.Up;
    if (value == Directions.Down) return Directions.Down;
    if (value == Directions.Left) return Directions.Left;
    if (value == Directions.Right) return Directions.Right;

    throw new Error("No such direction " + value);
  }

  static GetDirectionFromKey = (value) => {
    if (value == "ArrowUp") return Directions.Up;
    if (value == "ArrowDown") return Directions.Down;
    if (value == "ArrowLeft") return Directions.Left;
    if (value == "ArrowRight") return Directions.Right;

    return null;
  }

  static Random = () => {
    function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    }

    return shuffleArray([Directions.Up, Directions.Down, Directions.Left, Directions.Right])[0]
  }
}