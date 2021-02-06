import { Item, ItemType } from "./Item";

export class TextItem extends Item {
  type: ItemType = ItemType.TEXT;

  text: string = "";
  align: CanvasTextAlign = "left";
  baseline: CanvasTextBaseline = "top";
  font: string = "sans-serif";
  color: string = "#FFFFFF";

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
    ctx.fillStyle = this.color;
    ctx.font = this.font;
    ctx.textAlign = this.align;
    ctx.textBaseline = this.baseline;
    ctx.fillText(this.text, 0, 0);
    ctx.restore();
  }
}
