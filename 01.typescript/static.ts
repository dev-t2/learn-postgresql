type Point = {
  x: number;
  y: number;
};

class Grid {
  static origin: Point = { x: 0, y: 0 };

  scale: number;

  constructor(scale: number) {
    this.scale = scale;
  }

  calculateDistanceFromOrigin(point: Point) {
    const xDistance = point.x - Grid.origin.x;
    const yDistance = point.y - Grid.origin.y;

    return (
      Math.sqrt(xDistance * xDistance + yDistance * yDistance) / this.scale
    );
  }
}

const grid1 = new Grid(1.0);
const grid2 = new Grid(5.0);

console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }));
console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));
