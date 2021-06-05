class Geometry {
  private area: number;
  #perimeter: number;

  constructor() {
    this.area = 0;
    this.#perimeter = 0;
  }
}

class Square extends Geometry {
  side: number;

  constructor(side: number) {
    super();

    this.side = side;
  }
}

const square = new Square(2);

console.log(square.side);
