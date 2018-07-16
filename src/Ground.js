const screenWith = 300;
const screenHeight = 600;
const width = 10;
const height = 20;
const cellWidth = screenWith / width;
const cellHeight = screenHeight / height;

export default class Ground {
  constructor(points = [], lineDelete, gameOver) {
    this.strike = 0;
    this.matrix = [];
    this.lineDelete = lineDelete;
    this.gameOver = gameOver;
    for (let x = 0; x < width; x++) {
      const column = [];
      for (let y = 0; y < height; y++) {
        column.push(false);
      }
      this.matrix.push(column);
    }
    points.forEach(p => {
      this.matrix[p.x][p.y] = true;
    });
  }
  contains(point) {
    if (point.x < 0 || point.x >= width || point.y < 0 || point.y >= height) {
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
    for (let x = 0; x < width; x++) {
      if (!this.matrix[x][y]) {
        return false;
      }
    }
    return true;
  }
  removeFull() {
    let y = height - 1;
    while (y >= 0) {
      if (this.isRowFull(y)) {
        this.lineDelete();
        for (let ym = y - 1; ym >= 0; ym--) {
          for (let x = 0; x < width; x++) {
            this.matrix[x][ym + 1] = this.matrix[x][ym];
          }
        }
        for (let x = 0; x < width; x++) {
          this.matrix[0][x] = false;
        }
      } else {
        y--;
      }
    }
    return this.strike;
  }
  draw(ctx) {
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        if (this.matrix[x][y]) {
          const screenX = x * cellWidth + 2;
          const screenY = y * cellHeight + 2;
          ctx.fillRect(screenX, screenY, cellWidth - 4, cellHeight - 4);
        }
      }
    }
  }
  gameEnd() {
    for (let x = 0; x < width; x++) {
      if (this.matrix[x][0]) {
        this.gameOver();
      }
    }
  }
}
