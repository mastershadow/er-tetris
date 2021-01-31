import { Scenario } from "../scenario/Scenario";

export class Renderer {
  autoClear: boolean = true;
  constructor(ctx: CanvasRenderingContext2D) {}

  render(scenario: Scenario): void {
    if (this.autoClear) {
      this.clear();
    }
  }

  clear(): void {}
}
