import Screen from "./Screen";

export default class Statistic {
  protected leval;
  protected strike;
  public active;
  constructor() {
    this.leval = 0;
    this.strike = 0;
    this.active = true;
  }
  addStrike() {
    this.strike++;
  }
  showStatistic(ctx) {
    ctx.font = "bold 90px sans-serif";
    ctx.fillStyle = "rgba(1, 0, 0, 0.2)";
    ctx.textAlign = "center";
    ctx.fillText(
      this.strike,
      Screen.canvasWidth * (1 / 2),
      Screen.canvasHeight * (1 / 3)
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
