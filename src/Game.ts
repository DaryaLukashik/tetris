import Statistic from "./Statistic";
import { makeFigure } from "./Figure";
import Ground from "./Ground";
import Controls from "./Controls";
import drawGrid from "./Grid";
import Screen from "./Screen";
import router from "./Router";
import Figure from "./Figure";
import { gameStatistic } from "./Router";

const gameOver = () => {
  gameStatistic.gameOver();
};
let ground = new Ground([], statistic, gameOver);
const controls = new Controls();

export default class Game {
  private figure: Figure;
  private pause: boolean;
  private active: boolean;
  private ground: Ground;

  constructor() {
    controls.leftSide.addActionDown(() => this.moveLeft());
    controls.rightSide.addActionDown(() => this.moveRight());
    this.figure = makeFigure();
    this.pause = false;
    this.active = true;
    this.ground = new Ground([], statistic, this.gameOver);
  }
  gameOver = async () => {
    this.active = false;
    gameStatistic.gameOver();
    await this.ground.fillAllField();
    router.toGameOver();
  };
  restart() {
    this.ground = new Ground([], statistic, this.gameOver);
    this.figure = makeFigure();
    this.active = true;
  }
  drawActiveGame(ctx, figure) {
    ctx.font = "bold 70px Arial";

    ctx.fillStyle = "rgba(1, 0, 0, 0.8)";
    drawGrid(
      Screen.width,
      Screen.height,
      Screen.cellWidth,
      Screen.cellHeight,
      Screen.screenWidth,
      Screen.screenHeight,
      ctx
    );
    this.ground.draw(ctx);
    if (this.active) {
    figure.draw(ctx);
      gameStatistic.showStatistic(ctx);
    }
  }
  drawPauseActiveGame(ctx, figure) {
    gameStatistic.showStatistic(ctx);
    ctx.font = "bold 70px Arial";
    ctx.fillStyle = "rgba(1, 0, 0, 0.8)";
    drawGrid(
      Screen.width,
      Screen.height,
      Screen.cellWidth,
      Screen.cellHeight,
      Screen.screenWidth,
      Screen.screenHeight,
      ctx
    );
    figure.draw(ctx);
    this.ground.draw(ctx);
    ctx.textAlign = "center";
    ctx.fillText(" Pause", Screen.canvasWidth / 2, Screen.canvasHeight / 2);
  }
  draw(ctx, time) {
    ctx.fillStyle = "rgba(1, 0, 0, 0.3)";
    ctx.strokeRect(0, 0, Screen.screenWidth, Screen.screenHeight);
    if (!this.pause) {
      this.drawActiveGame(ctx, this.figure);
    } else {
      this.drawPauseActiveGame(ctx, this.figure);
    }
  }
  physics(time) {
    if (this.pause || !this.active) {
      return;
    }
    this.figure.moveDown(time);
    if (this.figure.intersects(this.ground)) {
      this.figure.moveUp();
      this.ground.addPoints(this.figure.getPoints());
      if (this.active) {
        this.figure = makeFigure();
      }
    }
  }
  moveLeft() {
    if (!this.pause) {
      this.figure.moveLeft();
      if (this.figure.intersects(this.ground)) {
        this.figure.moveRight();
      }
    }
  }
  moveRight() {
    if (!this.pause) {
      this.figure.moveRight();
      if (this.figure.intersects(this.ground)) {
        this.figure.moveLeft();
      }
    }
  }
  rotateFigure() {
    if (!this.pause) {
      this.figure.rotate(this.ground);
    }
  }
  speedUp() {
    this.figure.speedUp();
  }
  speedNormal() {
    this.figure.speedNormal();
  }
  gamePause() {
    this.pause = !this.pause;
  }
}

function statistic() {
  gameStatistic.addStrike();
}
