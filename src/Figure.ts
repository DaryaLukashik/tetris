import Point from "./Point";
import Screen from "./Screen";

export default class Figure {
  private position = new Point(Math.round(Screen.width / 2), 0);
  private lastMoveDown = 0;
  private speed = 500;
  private rotateClockwise = true;
  constructor(private points, private center) {}
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
  setY(y) {
    this.position = this.position.changeY(y);
  }
  moveDown(time) {
    if (time - this.lastMoveDown < this.speed) {
      return;
    }
    this.position = this.position.changeY(1);
    this.lastMoveDown = time;
  }
  rotate(ground) {
    this.rotateClockwise = !this.rotateClockwise;
    const rot = this.rotateClockwise ? this.rot : this.rotBack;
    const rotBack = this.rotateClockwise ? this.rotBack : this.rot;
    rot();
    if (this.intersects(ground)) {
      this.rotateClockwise = !this.rotateClockwise;
      rotBack();
    }
  }
  rot = () => {
    this.points = this.points.map(p => {
      const x = p.y - this.center.y + this.center.x;
      const y = -(p.x - this.center.x) + this.center.y;
      return new Point(x, y);
    });
  };
  rotBack = () => {
    this.points = this.points.map(p => {
      const x = -(p.y - this.center.y) + this.center.x;
      const y = p.x - this.center.x + this.center.y;
      return new Point(x, y);
    });
  };
  speedUp() {
    this.speed = 50;
  }
  speedNormal() {
    this.speed = 300;
  }
  draw(ctx) {
    ctx.fillStyle = "rgba(1, 0, 0, 0.5)";
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
    [new Point(1, 1), new Point(2, 1), new Point(1, 2), new Point(0, 1)],
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
