import Screen from "./Screen";

export default class Ground {
  private strike;
  private matrix;
  constructor(private points = [], protected lineDelete, protected gameOver) {
    this.strike = 0;
    this.matrix = [];
    for (let x = 0; x < Screen.width; x++) {
      const column = [];
      for (let y = 0; y < Screen.height; y++) {
        column.push(false);
      }
      this.matrix.push(column);
    }
    points.forEach(p => {
      this.matrix[p.x][p.y] = true;
    });
  }
  contains(point) {
    if (
      point.x < 0 ||
      point.x >= Screen.width ||
      point.y < 0 ||
      point.y >= Screen.height
    ) {
      return true;
    }
    return this.matrix[point.x][point.y];
  }
  add(point) {
    this.matrix[point.x][point.y] = true;
  }
  addPoints(points) {
    points.forEach(p => {
      this.add(p);
    });
    this.removeFull();
    this.gameEnd();
  }
  isRowFull(y) {
    for (let x = 0; x < Screen.width; x++) {
      if (!this.matrix[x][y]) {
        return false;
      }
    }
    return true;
  }
  removeFull() {
    let y = Screen.height - 1;
    while (y >= 0) {
      if (this.isRowFull(y)) {
        this.lineDelete();
        for (let ym = y - 1; ym >= 0; ym--) {
          for (let x = 0; x < Screen.width; x++) {
            this.matrix[x][ym + 1] = this.matrix[x][ym];
          }
        }
        for (let x = 0; x < Screen.width; x++) {
          this.matrix[0][x] = false;
        }
      } else {
        y--;
      }
    }
    return this.strike;
  }
  draw(ctx) {
    for (let x = 0; x < Screen.width; x++) {
      for (let y = 0; y < Screen.height; y++) {
        if (this.matrix[x][y]) {
          const screenX = x * Screen.cellWidth + 2;
          const screenY = y * Screen.cellHeight + 2;
          ctx.fillStyle = "rgba(1, 0, 0, 0.5)";
          ctx.fillRect(
            screenX,
            screenY,
            Screen.cellWidth - 4,
            Screen.cellHeight - 4
          );
        }
      }
    }
  }
  gameEnd() {
    for (let x = 0; x < Screen.width; x++) {
      if (this.matrix[x][0]) {
        return this.gameOver();
      }
    }
  }
}
