import Statistic from "./Statistic";
import { makeFigure } from "./Figure";
import Ground from "./Ground";
import Controls from "./Controls";
import drawGrid from "./Grid";
import Screen from "./Screen";

let figure = makeFigure();
let gameStatistic = new Statistic();
const gameOver = () => {
  gameStatistic.gameOver();
};
let ground = new Ground([], statistic, gameOver);
const controls = new Controls();

export default class Game {
  constructor() {
    controls.left.addActionDown(moveLeft);
    controls.right.addActionDown(moveRight);
    controls.mid.addActionDown(rotateFigure);
    controls.down.addActionDown(speedUp);
    controls.down.addActionUp(speedNormal);
  }
  draw(ctx, time) {
    ctx.strokeRect(0, 0, Screen.screenWidth, Screen.screenHeight);
    ctx.strokeRect(
      parseInt(Screen.canvasWidth * (88 / 100)),
      parseInt(Screen.canvasHeight * (4 / 20)),
      20,
      20
    );
    physics(time);
    controls.show(ctx);
    gameStatistic.showStatistic(ctx);
    if (gameStatistic.active) {
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
      ctx.fillText(
        "Game Over",
        Screen.screenWidth / 2,
        Screen.screenHeight / 2
      );
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

window.keyDown = function keyDown(event) {
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

window.keyUp = function keyUp(event) {
  if (event.key == "ArrowDown") {
    speedNormal();
  }
};

function statistic() {
  gameStatistic.addStrike();
}
