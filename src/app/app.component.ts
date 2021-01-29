import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { BehaviorSubject, Observable, zip } from "rxjs";
import { AppStatus } from "./AppStatus";
import { Clock } from "./Clock";
import { Scenario } from "./Scenario";
import { Scene } from "./Scene";

export abstract class BaseScenario implements Scenario {
  constructor(protected status: BehaviorSubject<AppStatus>) {}
  abstract update(delta: number): void;
  abstract render(ctx: CanvasRenderingContext2D): void;
}

export class PreloadingScenario extends BaseScenario {
  update(delta: number): void {}

  render(ctx: CanvasRenderingContext2D): void {
    const w = this.status.value.w;
    const h = this.status.value.h;

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

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements AfterViewInit {
  @ViewChild("mainCanvas") private canvasRef!: ElementRef;
  private context!: CanvasRenderingContext2D;
  private scenario?: Scenario;
  private clock: Clock = new Clock();
  public readonly status: BehaviorSubject<AppStatus> = new BehaviorSubject<AppStatus>(
    { scene: Scene.PRELOADING, w: 0, h: 0 }
  );

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      this.context = ctx;
      this.context.imageSmoothingEnabled = false;

      this.status.value.w = canvas.width;
      this.status.value.h = canvas.height;
    }

    this.status.subscribe((v) => {
      switch (v.scene) {
        case Scene.PRELOADING:
          this.scenario = new PreloadingScenario(this.status);
          break;
      }
    });

    zip(
      this.preloadImage("assets/b-grey.png"), //
      this.preloadImage("assets/b-grey.png"), //
      this.preloadImage("assets/b-grey.png") //
    ).subscribe((is) => {
      console.log(is);
    });

    this.render();
  }

  preloadImage(src: string): Observable<HTMLImageElement> {
    return new Observable<HTMLImageElement>((sub) => {
      const i = new Image();
      i.onload = (ev) => {
        sub.next(i);
        sub.complete();
      };
      i.src = src;
    });
  }

  render(): void {
    this.scenario?.update(this.clock.getDelta());
    this.scenario?.render(this.context);

    requestAnimationFrame(() => this.render());
  }
}
