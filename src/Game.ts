import Statistic from "./Statistic";
import { makeFigure } from "./Figure";
import Ground from "./Ground";
import Controls from "./Controls";
import drawGrid from "./Grid";
import Screen from "./Screen";
import router from "./Router";

let figure = makeFigure();
let gameStatistic = new Statistic();
const gameOver = () => {
  gameStatistic.gameOver();
};
let ground = new Ground([], statistic, gameOver);
const controls = new Controls();

export default class Game {
  constructor() {
    controls.leftSide.addActionDown(moveLeft);
    controls.rightSide.addActionDown(moveRight);
  }
  restart() {
    ground = new Ground([], statistic, gameOver);
    figure = makeFigure();
    gameStatistic = new Statistic();
  }
  draw(ctx, time) {
    ctx.fillStyle = "rgba(1, 0, 0, 0.3)";
    ctx.strokeRect(0, 0, Screen.screenWidth, Screen.screenHeight);
    physics(time);
    if (gameStatistic.active) {
      gameStatistic.showStatistic(ctx);
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
    } else {
      router.toGameOver();
      // ctx.font = "bold 40px sans-serif";
      // ctx.textAlign = "center";
      // ctx.fillText(
      //   "Game Over",
      //   Screen.screenWidth / 2,
      //   Screen.screenHeight / 6
      // );
      // router.goToMenu();
    }
  }
}

function physics(time) {
  figure.moveDown(time);
  if (figure.intersects(ground)) {
    figure.moveUp();
    ground.addPoints(figure.getPoints());
    figure = makeFigure();
  }
}

function moveLeft() {
  figure.moveLeft();
  if (figure.intersects(ground)) {
    figure.moveRight();
  }
}

function moveRight() {
  figure.moveRight();
  if (figure.intersects(ground)) {
    figure.moveLeft();
  }
}

function rotateFigure() {
  figure.rotate(ground);
}

function speedUp() {
  figure.speedUp();
}

function speedNormal() {
  figure.speedNormal();
}

window.onkeydown = function keyDown(event) {
  switch (event.key) {
    case "ArrowRight":
      moveRight();
      break;
    case "ArrowLeft":
      moveLeft();
      break;
    case "ArrowDown":
      speedUp();
      break;
    case " ":
      rotateFigure();
      break;
  }
};

window.onkeyup = function keyUp(event) {
  if (event.key == "ArrowDown") {
    speedNormal();
  }
};

function statistic() {
  gameStatistic.addStrike();
}
