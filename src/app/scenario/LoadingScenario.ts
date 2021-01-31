import { BehaviorSubject } from "rxjs";
import { AppStatus } from "../AppStatus";
import { TextItem } from "../core/TextItem";
import { BaseScenario } from "./BaseScenario";

export class LoadingScenario extends BaseScenario {
  title: TextItem;
  loading: TextItem;

  constructor(protected status: BehaviorSubject<AppStatus>) {
    super(status);

    this.title = new TextItem();
    this.title.text = "ER-TETRIS";
    this.title.color = "#FF00FF";
    this.title.font = "32px VT323, monospace";
    this.title.position.set(32, 32);
    this.scene.add(this.title);

    this.loading = new TextItem();
    this.loading.text = "LOADING";
    this.loading.color = "#00FFFF";
    this.loading.align = "center";
    this.loading.baseline = "middle";
    this.loading.font = "28px VT323, monospace";
    this.scene.add(this.loading);

    this.status.subscribe((s) => {
      this.loading.position.set(s.w! / 2, s.h! / 2);
    });
  }

  update(delta: number): void {}

  /*
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
  */
}
