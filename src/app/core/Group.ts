import { Item, ItemType } from "./Item";

export class Group extends Item {
  type: ItemType = ItemType.GROUP;
  renderable: boolean = false;
}
