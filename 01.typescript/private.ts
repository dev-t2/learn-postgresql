class Square {
  side: number;
  private area: number;
  #perimeter: number;

  constructor(side: number) {
    this.side = side;
    this.area = this.side * this.side;
    this.#perimeter = this.side * 4;
  }
}

const square = new Square(2);

console.log(square.side);
