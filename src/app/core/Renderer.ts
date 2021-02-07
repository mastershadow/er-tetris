import { Scenario } from "../scenario/Scenario";
import { Item } from "./Item";
import { Scene } from "./Scene";

export class Renderer {
  w: number = 0;
  h: number = 0;
  autoClear: boolean = true;

  constructor(protected ctx: CanvasRenderingContext2D) {}

  render(scenario: Scenario): void {
    // visit and sort scene items, excluding invisibiles
    const itemsToRender = this.visitAndSort(scenario.scene);

    if (this.autoClear) {
      this.clear();
    }
    for (const item of itemsToRender) {
      item.render(this.ctx);
    }
  }

  visitAndSort(scene: Scene): Item[] {
    const items: Item[] = [];
    const stack: Item[] = [scene];
    while (stack.length > 0) {
      const i = stack.pop();
      if (i && i.visible) {
        if (i.children.length > 0) {
          stack.push(...i.children);
        } else {
          if (i.renderable) {
            items.push(i);
          }
        }
      }
    }

    return items.sort((a, b) => a.zDepth - b.zDepth);
  }

  clear(): void {
    this.ctx.clearRect(0, 0, this.w, this.h);
  }
}
