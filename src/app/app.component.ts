import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { BehaviorSubject, Observable, zip } from "rxjs";
import { AppStatus } from "./AppStatus";
import { Clock } from "./Clock";
import { Scenario } from "./Scenario";
import { Scene } from "./Scene";

import WebFont from "webfontloader";
import { PreloadingScenario } from "./scenario/PreloadingScenario";
import { LoadingScenario } from "./scenario/LoadingScenario";

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
  private currentScene?: Scene;
  public readonly status: BehaviorSubject<AppStatus> = new BehaviorSubject<AppStatus>(
    {}
  );

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      this.context = ctx;
      this.context.imageSmoothingEnabled = false;

      this.status.next({
        w: canvas.width,
        h: canvas.height,
        scene: Scene.PRELOADING,
      });
    }

    this.status.subscribe((v) => {
      if (this.currentScene === undefined || v.scene !== this.currentScene) {
        switch (v.scene) {
          case Scene.PRELOADING:
            this.scenario = new PreloadingScenario(this.status);
            break;
          case Scene.LOADING:
            this.scenario = new LoadingScenario(this.status);
            break;
        }
      }
    });

    this.render();

    WebFont.load({
      google: {
        families: ["VT323"],
      },
      classes: false,
      active: () => {
        const s = this.status.value;
        s.scene = Scene.LOADING;
        this.status.next(s);
      },
    });

    zip(
      this.preloadImage("assets/b-grey.png"), //
      this.preloadImage("assets/b-grey.png"), //
      this.preloadImage("assets/b-grey.png") //
    ).subscribe((is) => {
      console.log(is);
    });
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
