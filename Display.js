class Display {
  constructor(height, width) {
    let _height = height;
    let _width = width;
    let _pixels = [];

    let _init = () => {
      for (let x = 0; x < _width; x++) {
        for (let y = 0; y < _height; y++) {
          let pixel = new Pixel(x, y, "black");
          _pixels.push(pixel);
        }
      }
    };

    let _getPixel = (x, y) => {
      return _pixels.find(function (p) {
        return p.x == x && p.y == y;
      });
    };

    _init();
    //TODO tymczasowy
    // this.changeColor(4, 9, "green");
    this.changeColor = (x, y, color) => {
      let pixel = _getPixel(x, y);
      pixel.color = color;
    }

    this.render = (element) => {
      let container = document.createElement("div");
      container.className = "container";

      for (let x = 0; x < _width; x++) {
        const column = document.createElement("div");
        column.className = "column";

        for (let y = 0; y < _height; y++) {
          const row = document.createElement("div");
          row.className = "row";

          let pixel = _getPixel(x, y);
          row.style.backgroundColor = pixel.color;

          column.appendChild(row);
        }

        container.appendChild(column);
      }
      element.innerHTML = container.outerHTML;
    }
  }



}