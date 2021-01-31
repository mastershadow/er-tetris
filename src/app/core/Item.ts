import { Size } from "./Size";
import { V2 } from "./math/V2";
export abstract class Item {
  position: V2 = new V2();
  rotation: V2 = new V2();
  scale: V2 = new V2();
  size: Size = { w: 0, h: 0 };
  visible: boolean = true;
  renderable: boolean = true;
  children: Item[] = [];
  zDepth: number = 0;
  id?: string;
  abstract type: ItemType;

  add(i: Item): void {
    this.children.push(i);
  }
}

export enum ItemType {
  TEXT,
  SPRITE,
  LINE,
  RECT,
  GROUP,
  SCENE,
}
