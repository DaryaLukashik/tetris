import Game from "./Game";

export default function bindKeyboard(game: Game) {
  window.onkeydown = function keyDown(event) {
    switch (event.key) {
      case "ArrowRight":
        game.moveRight();
        break;
      case "ArrowLeft":
        game.moveLeft();
        break;
      case "ArrowDown":
        game.speedUp();
        break;
      case " ":
        game.rotateFigure();
        break;
      case "q":
        game.gamePause();
        break;
    }
  };
  window.onkeyup = function keyUp(event) {
    if (event.key == "ArrowDown") {
      game.speedNormal();
    }
  };
}
