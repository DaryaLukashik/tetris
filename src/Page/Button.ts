import Screen, { screenW, screenH } from "../Screen";

export default class Button {
  constructor(
    private x,
    private y,
    private width,
    private height,
    private text,
    private action
  ) {}
  draw(ctx, time) {
    ctx.font = "20px Comic Sans MS";
    ctx.strokeRect(
      screenW(this.x),
      screenH(this.y),
      screenW(this.width),
      screenH(this.height)
    );
    ctx.textAlign = "center";
    ctx.fillText(
      this.text,
      screenW(this.x + this.width / 2),
      screenH(this.y + this.height / 2)
    );
  }
  contains(point) {
    return (
      point.x >= this.x &&
      point.y >= this.y &&
      point.x <= this.x + this.width &&
      point.y <= this.y + this.height
    );
  }
  mouseDown() {
    this.action();
  }
  mouseUp() {}
}
