import Screen, { screenW, screenH } from "../Screen";
import touchable from "../Touchable";
import router from "../Router";
import Button from "./Button";
import { gameStatistic } from '../Router';


export default class StartPage {
  private items;
  constructor() {
    const button = new Button(20, 20, 60, 10, "Restart Game", () =>
      router.goToGame()
    );
    this.items = [button];
    touchable(this.items[0]);
  }
  draw(ctx) {
    gameStatistic.showMaxResult(ctx)
    this.items.forEach(item => {
      item.draw(ctx);
    });
  }
}
