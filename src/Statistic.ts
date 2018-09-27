import Screen from "./Screen";

export default class Statistic {
  protected leval: number;
  protected strike: number;
  public active: boolean;
  public maxResult: number;
  constructor() {
    this.leval = 0;
    this.strike = 0;
    this.active = true;
    this.maxResult = 0;
  }
  addStrike() {
    this.strike++;
  }
  changeMaxResult() {
    if (this.maxResult < this.strike) {
      this.maxResult = this.strike;
    }
  }
  showStatistic(ctx) {
    ctx.font = "bold 100px Arial";
    ctx.fillStyle = "rgba(1, 0, 0, 0.3)";
    ctx.textAlign = "center";
    ctx.fillText(
      this.strike,
      Screen.canvasWidth * (6 / 7),
      Screen.canvasHeight * (1 / 7)
    );
  }
  showMaxResult(ctx) {
    ctx.font = "20px Arial";
    ctx.fillStyle = "rgba(1, 0, 0, 1)";
    ctx.textAlign = "center";
    ctx.fillText(
      "Max Result",
      Screen.canvasWidth * 0.5,
      Screen.canvasHeight * 0.4
    );
    ctx.font = "25px Arial";
    ctx.fillStyle = "rgba(1, 0, 0, 1)";
    ctx.fillText(
      this.maxResult,
      Screen.canvasWidth * 0.5,
      Screen.canvasHeight * 0.45
    );
  }
  gameOver() {
    this.changeMaxResult();
    console.log(this.maxResult);
    this.strike = 0;
  }
}
