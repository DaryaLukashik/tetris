import Screen, { screenW, screenH } from "./Screen";
import Point from "./Point";
import addTouches from "./Touchable";

class Rect {
  private actionDown = undefined;
  private actionUp = undefined;
  constructor(private x, private y, private width, private height) {}
  onTouchStart(point) {
    if (this.contains(point)) {
      this.actionDown();
    }
  }
  onTouchEnd() {
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
  }
  addActionDown(action) {
    this.actionDown = action;
  }
  addActionUp(action) {
    this.actionUp = action;
  }
  mouseDown() {
    this.actionDown();
  }
  mouseUp() {
    if (this.actionUp) {
      this.actionUp();
    }
  }
}

class Controls {
  public rightSide;
  public leftSide;
  constructor() {
    this.leftSide = new Rect(0.3, 0.3, 49.3, 100);
    this.rightSide = new Rect(49.9, 0.3, 50, 100);
    addTouches(this.leftSide);
    addTouches(this.rightSide);
  }
  show(ctx) {}
}
export default Controls;
