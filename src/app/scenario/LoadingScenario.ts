import { BehaviorSubject } from "rxjs";
import { AppStatus } from "../AppStatus";
import { BaseScenario } from "./BaseScenario";

export class LoadingScenario extends BaseScenario {
  constructor(protected status: BehaviorSubject<AppStatus>) {
    super(status);
  }

  update(delta: number): void {}

  render(ctx: CanvasRenderingContext2D): void {
    const w = this.status.value.w!;
    const h = this.status.value.h!;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#FF00FF";
    ctx.font = "32px VT323, monospace";

    ctx.save();
    ctx.translate(0.5, 0.5);
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("ER-TETRIS", 32, 32);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#00FFFF";
    ctx.fillText("LOADING", w / 2, h / 2);
    ctx.restore();
  }
}
