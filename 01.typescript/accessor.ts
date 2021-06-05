class Geometry {
  protected area: number;
  protected perimeter: number;

  constructor() {
    this.area = 0;
    this.perimeter = 0;
  }
}

class Square extends Geometry {
  private side: number;

  constructor(side: number) {
    super();

    this.side = side;
    this.area = this.side * this.side;
    this.perimeter = this.side * 4;
  }

  set Side(side: number) {
    console.log('set Side');

    this.side = side;
    this.area = this.side * this.side;
  }

  get Side() {
    console.log('get Side');

    return this.side;
  }

  get Area() {
    console.log('get Area');

    return this.area;
  }
}

const square = new Square(2);

console.log(`Side: ${square.Side} - Area: ${square.Area}`);

square.Side = 10;

console.log(`Side: ${square.Side} - Area: ${square.Area}`);
