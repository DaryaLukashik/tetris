import Point from "./Point";

const touchables = [];

window.onTouchStart = e => {
  touchables.map(touchable => {
    for (let i = 0; i < e.touches.length; i++) {
      const touch = e.touches.item(i);
      touchable.onTouchStart(new Point(touch.screenX, touch.screenY));
    }
  });
};
window.onTouchEnd = e => {
  touchables.map(touchable => {
    touchable.onTouchEnd();
  });
};

export default touchable => {
  touchables.push(touchable);
};
