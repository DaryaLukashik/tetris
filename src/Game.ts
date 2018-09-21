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
  constructor() {
    controls.leftSide.addActionDown(() => this.moveLeft());
    controls.rightSide.addActionDown(() => this.moveRight());
    this.figure = makeFigure();
    this.pause = false;
  }
  restart() {
    ground = new Ground([], statistic, gameOver);
    let figure = makeFigure();
    gameStatistic.restart();
  }
  drawActiveGame(ctx, figure) {
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
    ground.draw(ctx);
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
    ground.draw(ctx);
    ctx.textAlign = "center";
    ctx.fillText(" Pause", Screen.canvasWidth / 2, Screen.canvasHeight / 2);
  }
  drawNotActiveGame(ctx) {
    drawGrid(
      Screen.width,
      Screen.height,
      Screen.cellWidth,
      Screen.cellHeight,
      Screen.screenWidth,
      Screen.screenHeight,
      ctx
    );
    ground.draw(ctx);
    setTimeout(() => {
      router.toGameOver();
    }, 1000);
  }
  draw(ctx, time) {
    ctx.fillStyle = "rgba(1, 0, 0, 0.3)";
    ctx.strokeRect(0, 0, Screen.screenWidth, Screen.screenHeight);
    if (gameStatistic.active && !this.pause) {
      this.physics(time);
      this.drawActiveGame(ctx, this.figure);
    } else if (gameStatistic.active && this.pause) {
      this.drawPauseActiveGame(ctx, this.figure);
    } else {
      this.drawNotActiveGame(ctx);
    }
  }
  physics(time) {
    this.figure.moveDown(time);
    if (this.figure.intersects(ground)) {
      this.figure.moveUp();
      ground.addPoints(this.figure.getPoints());
      if (gameStatistic.active) {
        this.figure = makeFigure();
      }
    }
  }
  moveLeft() {
    if (!this.pause) {
      this.figure.moveLeft();
      if (this.figure.intersects(ground)) {
        this.figure.moveRight();
      }
    }
  }
  moveRight() {
    if (!this.pause) {
      this.figure.moveRight();
      if (this.figure.intersects(ground)) {
        this.figure.moveLeft();
      }
    }
  }
  rotateFigure() {
    if (!this.pause) {
      this.figure.rotate(ground);
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
