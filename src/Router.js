import Menu from "./Menu";
import Game from "./Game";

const menu = new Menu();
const game = new Game();

class Router {
  constructor() {
    this.page = menu;
  }
  goToGame() {
    this.page = game;
  }
}
const router = new Router();
export default router;
