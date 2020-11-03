class Display {
  constructor(height, width) {
    this.height = height;
    this.width = width;
    this.pixels = [];

    this.init = () => {
      for (let x = 0; x < this.width; x++) {
        for (let y = 0; y < this.height; y++) {
          let pixel = new Pixel(x, y, "black");
          this.pixels.push(pixel);
        }
      }
    };

    this.getPixel = (x, y) => {
      return this.pixels.find(function (p) {
        return p.x == x && p.y == y;
      });
    };

    this.init();
    //TODO tymczasowy
    // this.changeColor(4, 9, "green");
  }

  changeColor(x, y, color) {
    let pixel = this.getPixel(x, y);
    pixel.color = color;
  }

  render(element) {
    let container = document.createElement("div");
    container.className = "container";

    for (let x = 0; x < this.width; x++) {
      const column = document.createElement("div");
      column.className = "column";

      for (let y = 0; y < this.height; y++) {
        const row = document.createElement("div");
        row.className = "row";

        let pixel = this.getPixel(x, y);
        row.style.backgroundColor = pixel.color;

        column.appendChild(row);
      }

      container.appendChild(column);
    }
    element.innerHTML = container.outerHTML;
  }
}
