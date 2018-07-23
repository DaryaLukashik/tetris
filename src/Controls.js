import Screen from "./Screen";
import Point from "./Point";
import addTouches from "./Touchable";

class Rect {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.touched = 0;
    this.actions = [];
  }
  onTouchStart(point) {
    if (this.contains(point)) {
      this.touched = true;
      this.actions.forEach(action => action());
    }
  }
  onTouchEnd() {
    this.touched = false;
  }
  contains(point) {
    return (
      point.x >= this.x &&
      point.x <= this.x + this.width &&
      point.y >= this.y &&
      point.y <= this.y + this.height
    );
  }
  show(ctx) {
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    if (this.touched) {
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  addAction(action) {
    this.actions.push(action);
  }
}

class Controls {
  constructor() {
    this.left = new Rect(
      0,
      Screen.canvasHeight * (86 / 100),
      Screen.canvasWidth * (1 / 3) * (95 / 100),
      Screen.canvasHeight * (9 / 100) - 2
    );
    this.right = new Rect(
      Screen.canvasWidth * (2 / 3),
      Screen.canvasHeight * (86 / 100),
      Screen.canvasWidth * (1 / 3) * (95 / 100),
      Screen.canvasHeight * (9 / 100) - 2
    );
    this.mid = new Rect(
      Screen.canvasWidth / 3,
      Screen.canvasHeight * (81 / 100),
      Screen.canvasWidth * (1 / 3) * (95 / 100),
      Screen.canvasHeight * (9 / 100) - 2
    );
    this.down = new Rect(
      Screen.canvasWidth / 3,
      Screen.canvasHeight * (91 / 100),
      Screen.canvasWidth * (1 / 3) * (95 / 100),
      Screen.canvasHeight * (9 / 100) - 2
    );
    addTouches(this.left);
    addTouches(this.right);
    addTouches(this.mid);
    addTouches(this.down);
  }
  show(ctx) {
    this.left.show(ctx);
    this.right.show(ctx);
    this.mid.show(ctx);
    this.down.show(ctx);
  }
}
export default Controls;
