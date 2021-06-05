class Geometry {
  protected area: number;
  protected perimeter: number;

  constructor() {
    this.area = 0;
    this.perimeter = 0;
  }
}

class Square extends Geometry {
  side: number;

  constructor(side: number) {
    super();

    this.side = side;
    this.area = this.side * this.side;
    this.perimeter = this.side * 4;
  }

  getArea(): number {
    return this.area;
  }
}

const square = new Square(2);

console.log(square.getArea());
