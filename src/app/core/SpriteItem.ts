import { Item, ItemType } from "./Item";

export class SpriteItem extends Item {
  type: ItemType = ItemType.SPRITE;

  constructor(public bitmap: HTMLImageElement) {
    super();
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.setTransform(
      this.matrix.elements[0],
      this.matrix.elements[1],
      this.matrix.elements[3],
      this.matrix.elements[4],
      this.matrix.elements[6] + this.position.x,
      this.matrix.elements[7] + this.position.y
    );
    ctx.drawImage(this.bitmap, 0, 0);
    ctx.restore();
  }
}
