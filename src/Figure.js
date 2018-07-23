import Point from "./Point";
import Screen from "./Screen";

export default class Figure {
  constructor(points, center) {
    this.points = points;
    this.position = new Point(Math.round(Screen.width / 2), 0);
    this.center = center;
    this.lastMoveDown = 0;
    this.speed = 500;
  }
  intersects(ground) {
    const fPoints = this.getPoints();
    for (let i = 0; i < fPoints.length; i++) {
      if (ground.contains(fPoints[i])) {
        return true;
      }
    }
    return false;
  }
  getPoints() {
    return this.points.map(p => {
      return p.add(this.position);
    });
  }
  moveLeft() {
    this.position = this.position.changeX(-1);
  }
  moveRight() {
    this.position = this.position.changeX(1);
  }
  moveUp() {
    this.position = this.position.changeY(-1);
  }
  moveDown(time) {
    if (time - this.lastMoveDown < this.speed) {
      return;
    }
    this.position = this.position.changeY(1);
    this.lastMoveDown = time;
  }
  rotate(ground) {
    this.rot();
    if (this.intersects(ground)) {
      this.rotBack();
    }
  }
  rot() {
    this.points = this.points.map(p => {
      const x = p.y - this.center.y + this.center.x;
      const y = -(p.x - this.center.x) + this.center.y;
      return new Point(x, y);
    });
  }
  rotBack() {
    this.points = this.points.map(p => {
      const x = -(p.y - this.center.y) + this.center.x;
      const y = p.x - this.center.x + this.center.y;
      return new Point(x, y);
    });
  }
  speedUp() {
    this.speed = 50;
  }
  speedNormal() {
    this.speed = 300;
  }
  draw(ctx) {
    this.getPoints().forEach(p => {
      const x = p.x * Screen.cellWidth + 2;
      const y = p.y * Screen.cellHeight + 2;
      ctx.fillRect(x, y, Screen.cellWidth - 4, Screen.cellHeight - 4);
    });
  }
}

function makeSquare() {
  return new Figure(
    [new Point(0, 0), new Point(0, 1), new Point(1, 0), new Point(1, 1)],
    new Point(0.5, 0.5)
  );
}
function makeStick() {
  return new Figure(
    [new Point(0, 0), new Point(1, 0), new Point(2, 0), new Point(3, 0)],
    new Point(1, 0)
  );
}
function makeZig() {
  return new Figure(
    [new Point(0, 0), new Point(1, 0), new Point(1, 1), new Point(2, 1)],
    new Point(1, 1)
  );
}
function makeZig2() {
  return new Figure(
    [new Point(0, 0), new Point(1, 0), new Point(0, 1), new Point(-1, 0)],
    new Point(1, 1)
  );
}
function makeHorse() {
  return new Figure(
    [new Point(0, 0), new Point(1, 0), new Point(2, 0), new Point(2, 1)],
    new Point(1, 0)
  );
}

function makeHorse2() {
  return new Figure(
    [new Point(0, 0), new Point(1, 0), new Point(1, 1), new Point(1, 2)],
    new Point(1, 0)
  );
}

export function makeFigure() {
  switch (rand(1, 6)) {
    case 1:
      return makeSquare();
    case 2:
      return makeStick();
    case 3:
      return makeZig();
    case 4:
      return makeHorse();
    case 5:
      return makeHorse2();
    case 6:
      return makeZig2();
  }
}

function rand(min, max) {
  const r = Math.random();
  return min + Math.round(r * (max - min));
}
