import Point from "./Point";
import { screenToPercent } from "./Screen";

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
window.onCanvasMouseDown = point => {
  const p = new Point(point.x - 8, point.y - 8);
  touchables.forEach(t => {
    if (t.contains && t.contains(screenToPercent(p))) {
      t.mouseDown();
    }
  });
};

window.onCanvasMouseUp = point => {
  const p = new Point(point.x - 8, point.y - 8);
  touchables.forEach(t => {
    if (t.contains && t.contains(screenToPercent(p))) {
      t.mouseUp();
    }
  });
};

export default touchable => {
  touchables.push(touchable);
};
