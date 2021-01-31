import { Scenario } from "../scenario/Scenario";

export class Renderer {
  w: number = 0;
  h: number = 0;
  autoClear: boolean = true;

  constructor(protected ctx: CanvasRenderingContext2D) {}

  render(scenario: Scenario): void {
    // visit and sort scene items, excluding invisibiles

    if (this.autoClear) {
      this.clear();
    }
    this.ctx.save();
    this.ctx.restore();
  }

  clear(): void {
    this.ctx.clearRect(0, 0, this.w, this.h);
  }
}
