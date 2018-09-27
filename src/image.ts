export class DrawableImage {
  constructor(private image: Promise<HTMLImageElement>) {}
  draw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number
  ) {
    this.image.then(image => ctx.drawImage(image, x, y, w, h));
  }
}

const map: Map<string, DrawableImage> = new Map();

const loadImage = async (name: string): Promise<HTMLImageElement> => {
  const file = await import(`./images/${name}.svg`);
  const image = new Image();
  image.src = file;
  return image;
};

export default function image(name: string): DrawableImage {
  if (!(name in map)) {
    map.set(name, new DrawableImage(loadImage(name)));
  }
  return map.get(name);
}
