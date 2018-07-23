import Screen from "./Screen";

export default class Statistic {
  constructor() {
    this.leval = 0;
    this.strike = 0;
    this.active = true;
  }
  addStrike() {
    this.strike++;
  }
  showStatistic(ctx) {
    ctx.font = "20px Comic Sans MS";
    ctx.textAlign = "center";
    ctx.fillText(
      "strike:",
      parseInt(Screen.canvasWidth * (9 / 10)),
      parseInt(Screen.canvasHeight * (2 / 20))
    );
    ctx.fillText(
      this.strike,
      parseInt(Screen.canvasWidth * (9 / 10)),
      parseInt(Screen.canvasHeight * (3 / 20))
    );
  }
  gameOver() {
    this.active = false;
    this.strike = 0;
  }
  restart() {
    if (this.active) {
      return;
    }
    this.active = true;
  }
}
