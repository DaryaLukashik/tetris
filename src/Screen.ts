import Point from "./Point";

let Screen = {
  screenHeight: 400,
  screenWidth: 300,
  canvasHeight: 600,
  canvasWidth: 300,
  width: 10,
  height: 20,
  cellWidth: 10,
  cellHeight: 20
};

export function screenW(percent) {
  return (Screen.canvasWidth / 100) * percent;
}
export function screenH(percent) {
  return (Screen.canvasHeight / 100) * percent;
}
export function screenToPercent(point) {
  return new Point(
    (point.x / Screen.canvasWidth) * 100,
    (point.y / Screen.canvasHeight) * 100
  );
}

export default Screen;
