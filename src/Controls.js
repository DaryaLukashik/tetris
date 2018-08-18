import Screen, { screenW, screenH } from "./Screen";
import Point from "./Point";
import addTouches from "./Touchable";

class Rect {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.touched = false;
    this.actionDown = undefined;
    this.actionUp = undefined;
  }
  onTouchStart(point) {
    if (this.contains(point)) {
      this.touched = true;
      this.actionDown();
    }
  }
  onTouchEnd() {
    this.touched = false;
    this.actionUp();
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
    ctx.strokeRect(
      screenW(this.x),
      screenH(this.y),
      screenW(this.width),
      screenH(this.height)
    );
    if (this.touched) {
      ctx.fillRect(
        screenW(this.x),
        screenH(this.y),
        screenW(this.width),
        screenH(this.height)
      );
    }
  }
  addActionDown(action) {
    this.actionDown = action;
  }
  addActionUp(action) {
    this.actionUp = action;
  }
  mouseDown() {
    this.touched = true;
    console.log(this);
    this.actionDown();
  }
  mouseUp() {
    if (this.actionUp) {
      this.touched = false;
      this.actionUp();
    }
  }
}

class Controls {
  constructor() {
    this.left = new Rect(3, 86, 28, 9);
    this.right = new Rect(70, 86, 28, 9);
    this.mid = new Rect(35, 82, 31, 8);
    this.down = new Rect(35, 90, 31, 8);
    window.left = this.left;
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
