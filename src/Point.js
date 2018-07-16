export default class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  changeX(diff) {
    return new Point(this.x + diff, this.y);
  }
  changeY(diff) {
    return new Point(this.x, this.y + diff);
  }
  equals(point) {
    return point.x === this.x && point.y === this.y;
  }
  add(point) {
    return new Point(this.x + point.x, this.y + point.y);
  }
}
