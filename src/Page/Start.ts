import Screen, { screenW, screenH } from "../Screen";
import touchable from "../Touchable";
import router from "../Router";
import Button from "./Button";
import image from "../image";

export default class StartPage {
  private items;
  constructor() {
    const button = new Button(
      20,
      20,
      60,
      10,
      "Start Game",
      () => router.goToGame(),
      image("start")
    );
    this.items = [button];
    touchable(this.items[0]);
  }
  draw(ctx: CanvasRenderingContext2D) {
    this.items.forEach(item => {
      item.draw(ctx);
    });
  }
}
