import drawGrid from "./Grid";
import Screen from "./Screen";
import router from "./Router";
import Point from "./Point";

let delay = 50;
let time = 0;
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
  canvas.addEventListener("mousedown", e => {
    const p = new Point(e.x, e.y);
    window.onCanvasMouseDown(p);
  });
  canvas.addEventListener("mouseup", e => {
    const p = new Point(e.x, e.y);
    window.onCanvasMouseUp(p);
  });
  gameLoop();
  setInterval(gameLoop, delay);
};

function gameLoop() {
  time += delay;
  ctx.clearRect(0, 0, Screen.canvasWidth, Screen.canvasHeight);
  ctx.strokeRect(0, 0, Screen.canvasWidth, Screen.canvasHeight);
  router.page.draw(ctx, time);
}
