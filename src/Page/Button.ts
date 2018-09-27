import Screen, { screenW, screenH } from "../Screen";
import { DrawableImage } from "../image";

export default class Button {
  constructor(
    private x,
    private y,
    private width,
    private height,
    private text,
    private action,
    private image: DrawableImage
  ) {}
  draw(ctx: CanvasRenderingContext2D) {
    this.image.draw(
      ctx,
      screenW(this.x),
      screenH(this.y),
      screenW(this.width),
      screenH(this.height)
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
