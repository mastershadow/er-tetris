export interface Scenario {
  update(delta: number): void;
  render(ctx: CanvasRenderingContext2D): void;
}
