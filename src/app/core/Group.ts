import { Item, ItemType } from "./Item";
import { M3 } from "./math/M3";

export class Group extends Item {
  type: ItemType = ItemType.GROUP;
  renderable: boolean = false;

  public updateChildrenMatrix(): void {
    const m = new M3().copy(this.matrix);
    m.translate(this.position.x, this.position.y);
    for (const c of this.children) {
      c.matrix.multiply(m);
    }
  }
}
