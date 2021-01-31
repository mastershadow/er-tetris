import { Size } from "./Size";
import { V2D } from "./math/V2D";
export abstract class Item {
  position: V2D = new V2D();
  rotation: V2D = new V2D();
  scale: V2D = new V2D();
  size: Size = { w: 0, h: 0 };
  visible: boolean = true;
  children: Item[] = [];
  id?: string;
  abstract type: ItemType;
}

export enum ItemType {
  TEXT,
  SPRITE,
  LINE,
  RECT,
  GROUP,
  SCENE,
}
