import { Item, ItemType } from "./Item";

export class TextItem extends Item {
  type: ItemType = ItemType.TEXT;

  text: string = "";
  align: string = "left";
  baseline: string = "top";
  font: string = "sans-serif";
  color: string = "#FFFFFF";
}
