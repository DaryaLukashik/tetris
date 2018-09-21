import StartPage from "./Page/Start";
import GameOver from "./Page/GameOver";
import Game from "./Game";
import bindKeyboard from "./bindKeyboard";
import Statistic from "./Statistic";

const start = new StartPage();
const gameOver = new GameOver();
const game = new Game();
export const gameStatistic = new Statistic();
bindKeyboard(game);

class Router {
  protected page;
  constructor() {
    this.page = start;
  }
  goToGame() {
    game.restart();
    this.page = game;
  }
  toStartPage() {
    this.page = start;
  }
  toGameOver() {
    this.page = gameOver;
  }
}
const router = new Router();
export default router;
