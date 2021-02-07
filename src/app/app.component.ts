import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import WebFont from "webfontloader";
import { AppStatus } from "./AppStatus";
import { AppInputEvent, AppInputEventType } from "./core/AppInputEvent";
import { Clock } from "./core/Clock";
import { Renderer } from "./core/Renderer";
import { GameScene } from "./GameScene";
import { CreditsScenario } from "./scenario/CreditsScenario";
import { GameScenario } from "./scenario/GameScenario";
import { HighscoreScenario } from "./scenario/HighscoreScenario";
import { LoadingScenario } from "./scenario/LoadingScenario";
import { MainScreenScenario } from "./scenario/MainScreenScenario";
import { PreloadingScenario } from "./scenario/PreloadingScenario";
import { Scenario } from "./scenario/Scenario";

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
  public readonly events: Subject<AppInputEvent | undefined> = new Subject<
    AppInputEvent | undefined
  >();

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

    canvas.addEventListener(
      "click",
      (ev: MouseEvent) => {
        this.events.next({
          x: ev.clientX,
          y: ev.clientY,
          type: AppInputEventType.MOUSE,
          button: ev.button,
        });
      },
      { capture: true, passive: true }
    );

    window.addEventListener(
      "keydown",
      (ev: KeyboardEvent) => {
        this.events.next({
          type: AppInputEventType.KEY_DOWN,
          button: ev.key,
        });
      },
      { capture: true, passive: true }
    );

    window.addEventListener(
      "keyup",
      (ev: KeyboardEvent) => {
        this.events.next({
          type: AppInputEventType.KEY_UP,
          button: ev.key,
        });
      },
      { capture: true, passive: true }
    );

    this.status.subscribe((v) => {
      if (this.currentScene === undefined || v.scene !== this.currentScene) {
        this.currentScene = v.scene!;

        if (this.scenario) {
          this.scenario.destroy();
          this.scenario = undefined;
        }

        switch (v.scene) {
          case GameScene.PRELOADING:
            this.scenario = new PreloadingScenario(this.status, this.events);
            break;
          case GameScene.LOADING:
            this.scenario = new LoadingScenario(this.status, this.events);
            break;
          case GameScene.MAINSCREEN:
            this.scenario = new MainScreenScenario(this.status, this.events);
            break;
          case GameScene.CREDITS:
            this.scenario = new CreditsScenario(this.status, this.events);
            break;
          case GameScene.HIGHSCORE:
            this.scenario = new HighscoreScenario(this.status, this.events);
            break;
          case GameScene.GAME:
            this.scenario = new GameScenario(this.status, this.events);
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
