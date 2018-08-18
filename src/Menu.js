import Screen, { screenW, screenH } from "./Screen";
import touchable from "./Touchable";
import router from "./Router";

class Item {
  constructor(x, y, width, height, text) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
  }
  draw(ctx, time) {
    ctx.font = "18px Comic Sans MS";
    ctx.strokeRect(
      screenW(this.x),
      screenH(this.y),
      screenW(this.width),
      screenH(this.height)
    );
    ctx.fillText(
      this.text,
      screenW(this.x + this.width / 4),
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
    router.goToGame();
  }
  mouseUp() {}
}

export default class Menu {
  constructor() {
    const item = new Item(20, 20, 60, 10, "Start Game");
    this.items = [item];
    touchable(item);
  }
  draw(ctx) {
    this.items.forEach(item => {
      item.draw(ctx);
    });
  }
}
