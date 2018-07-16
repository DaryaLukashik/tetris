const canvasWidth = 400;
const canvasHeight = 700;

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
    ctx.fillText("strike:", 340, 50);
    ctx.fillText(this.strike, 320, 100);
  }
  gameOver() {
    this.active = false;
    this.strike = 0;
  }
}
