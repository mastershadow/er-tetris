import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AppStatus } from "./AppStatus";
import { Clock } from "./core/Clock";
import { Scenario } from "./scenario/Scenario";
import { GameScene } from "./GameScene";

import WebFont from "webfontloader";
import { PreloadingScenario } from "./scenario/PreloadingScenario";
import { LoadingScenario } from "./scenario/LoadingScenario";
import { Renderer } from "./core/Renderer";
import { MainScreenScenario } from "./scenario/MainScreenScenario";
import { AppInputEvent, AppInputEventType } from "./core/AppInputEvent";

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
  private currentScene?: GameScene;
  private renderer?: Renderer;
  public readonly status: BehaviorSubject<AppStatus> = new BehaviorSubject<AppStatus>(
    {}
  );
  public readonly events: BehaviorSubject<
    AppInputEvent | undefined
  > = new BehaviorSubject<AppInputEvent | undefined>(undefined);

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      this.context = ctx;
      this.context.imageSmoothingEnabled = false;

      this.renderer = new Renderer(this.context);

      this.status.next({
        w: canvas.width,
        h: canvas.height,
        scene: GameScene.PRELOADING,
      });
    }

    canvas.addEventListener("click", (ev: MouseEvent) => {
      this.events.next({
        x: ev.clientX,
        y: ev.clientY,
        type: AppInputEventType.MOUSE,
        button: ev.button,
      });
    });

    window.addEventListener("keydown", (ev: KeyboardEvent) => {
      this.events.next({
        type: AppInputEventType.KEY_DOWN,
        button: ev.key,
      });
    });

    window.addEventListener("keyup", (ev: KeyboardEvent) => {
      this.events.next({
        type: AppInputEventType.KEY_UP,
        button: ev.key,
      });
    });

    this.status.subscribe((v) => {
      if (this.currentScene === undefined || v.scene !== this.currentScene) {
        switch (v.scene) {
          case GameScene.PRELOADING:
            this.scenario = new PreloadingScenario(this.status);
            break;
          case GameScene.LOADING:
            this.scenario = new LoadingScenario(this.status, this.events);
            break;
          case GameScene.MAINSCREEN:
            this.scenario = new MainScreenScenario(this.status);
            break;
        }
      }
      this.renderer!.w = v.w || 0;
      this.renderer!.h = v.h || 0;
    });

    this.render();

    WebFont.load({
      google: {
        families: ["VT323"],
      },
      classes: false,
      active: () => {
        const s = this.status.value;
        s.scene = GameScene.LOADING;
        this.status.next(s);
      },
    });
  }

  render(): void {
    if (this.scenario) {
      this.scenario?.update(this.clock.getDelta());
      this.renderer?.render(this.scenario);
    }

    requestAnimationFrame(() => this.render());
  }
}
