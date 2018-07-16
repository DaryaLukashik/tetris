import { makeFigure } from "./Figure";
import Ground from "./Ground";
import drawGrid from "./Grid";
import Statistic from "./Statistic";

const screenWidth = 300;
const screenHeight = 600;
const canvasWidth = 400;
const canvasHeight = 700;
const width = 10;
const height = 20;
const cellWidth = screenWidth / width;
const cellHeight = screenHeight / height;
let delay = 50;
let time = 0;
let figure = makeFigure();
let gameStatistic = new Statistic();
let ground = new Ground([], statistic, gameOver);

let ctx = undefined;
window.init = function init() {
  const canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  gameLoop();
  setInterval(gameLoop, delay);
};

window.keyDown = function keyDown(event) {
  switch (event.key) {
    case "ArrowRight":
      figure.moveRight();
      if (figure.intersects(ground)) {
        figure.moveLeft();
      }
      break;
    case "ArrowLeft":
      figure.moveLeft();
      if (figure.intersects(ground)) {
        figure.moveRight();
      }
      break;
    case "ArrowDown":
      figure.speedUp();
      break;
    case " ":
      figure.rotate(ground);
      break;
  }
  draw();
};

window.keyUp = function keyUp(event) {
  if (event.key == "ArrowDown") {
    figure.speedNormal();
  }
  draw();
};

function statistic() {
  gameStatistic.addStrike();
}

function gameLoop() {
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
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.strokeRect(0, 0, screenWidth, screenHeight);
  ctx.strokeRect(0, 0, canvasWidth, canvasHeight);
  gameStatistic.showStatistic(ctx);
  if (gameStatistic.active) {
    drawGrid(
      width,
      height,
      cellWidth,
      cellHeight,
      screenWidth,
      screenHeight,
      ctx
    );
    figure.draw(ctx);
    ground.draw(ctx);
  } else {
    ctx.fillText("Game Over", screenWidth / 2, screenHeight / 2);
  }
}

function gameOver() {
  gameStatistic.gameOver();
}

function startGame() {}
