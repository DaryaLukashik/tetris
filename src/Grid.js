import Point from "./Point";
export default function drawGrid(
  width,
  height,
  cellWidth,
  cellHeight,
  screenWidth,
  screenHeight,
  ctx
) {
  function drawLine(p1, p2) {
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }

  for (let y = 0; y <= height; y++) {
    drawLine(
      new Point(0, y * cellHeight),
      new Point(screenWidth, y * cellHeight)
    );
  }
  for (let x = 0; x <= width; x++) {
    drawLine(
      new Point(x * cellWidth, 0),
      new Point(x * cellWidth, screenHeight)
    );
  }
}
