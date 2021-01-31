import { Item, ItemType } from "./Item";

export class Scene extends Item {
  type: ItemType = ItemType.SCENE;
  renderable: boolean = false;
}
