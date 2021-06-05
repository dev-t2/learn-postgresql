abstract class Geometry {
  protected area: number;
  protected perimeter: number;

  constructor() {
    this.area = 0;
    this.perimeter = 0;
  }
}

class Square extends Geometry {
  private side: number;

  private calculateAreaAndPerimeter() {
    this.perimeter = this.side * 4;
    this.area = this.side * this.side;
  }

  constructor(side: number) {
    super();

    this.side = side;
    this.calculateAreaAndPerimeter();
  }

  set Side(value: number) {
    this.side = value;
    this.calculateAreaAndPerimeter();
  }

  get Side() {
    return this.side;
  }

  get Area() {
    return this.area;
  }
}

const square = new Square(2);

console.log(square.Side);
console.log(square.Area);
