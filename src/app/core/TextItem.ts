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
    ctx.fillStyle = this.color;
    ctx.font = this.font;
    ctx.textAlign = this.align;
    ctx.textBaseline = this.baseline;
    ctx.fillText(this.text, this.position.x, this.position.y);
    ctx.restore();
  }
}
