import { makeFigure } from "./Figure";
import Ground from "./Ground";
import drawGrid from "./Grid";
import Statistic from "./Statistic";
import Screen from "./Screen";
import Controls from "./Controls";

let delay = 50;
let time = 0;
let figure = makeFigure();
let gameStatistic = new Statistic();
let ground = new Ground([], statistic, gameOver);
let controls = new Controls();
let frames = 0;
const date = new Date();
const start = date.getTime();

let ctx = undefined;
window.init = function init(sWidth, sHeight) {
  window.screen = Screen;
  Screen.canvasWidth = sWidth;
  Screen.canvasHeight = sHeight;
  Screen.screenWidth = parseInt(sWidth * 0.8);
  Screen.screenHeight = parseInt(sHeight * 0.8);
  Screen.cellWidth = Screen.screenWidth / Screen.width;
  Screen.cellHeight = Screen.screenHeight / Screen.height;
  const canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  controls = new Controls();
  controls.left.addAction(moveLeft);
  controls.right.addAction(moveRight);
  controls.mid.addAction(rotateFigure);
  controls.down.addAction(speedUp);
  gameLoop();
  setInterval(gameLoop, delay);
};

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

function slowDown() {
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
  draw();
};

window.keyUp = function keyUp(event) {
  if (event.key == "ArrowDown") {
    slowDown();
  }
  draw();
};

function statistic() {
  gameStatistic.addStrike();
}

function gameLoop() {
  frames += 1;
  console.log(frames);
  time += delay;
  draw();
  physics();
}

function physics() {
  figure.moveDown(time);
  if (figure.intersects(ground)) {
    figure.moveUp();
    ground.addPoints(figure.getPoints());
    figure = makeFigure();
  }
}

function draw() {
  ctx.clearRect(0, 0, Screen.canvasWidth, Screen.canvasHeight);
  ctx.strokeRect(0, 0, Screen.screenWidth, Screen.screenHeight);
  ctx.strokeRect(0, 0, Screen.canvasWidth, Screen.canvasHeight);
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
    ctx.fillText("Game Over", Screen.screenWidth / 2, Screen.screenHeight / 2);
  }
  const date = new Date();
  ctx.fillText(
    (frames / (date.getTime() - start)) * 1000,
    Screen.screenWidth / 2,
    Screen.screenHeight / 3
  );
}

function gameOver() {
  gameStatistic.gameOver();
}

function startGame() {}
