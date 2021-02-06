import { BehaviorSubject, Observable, zip } from "rxjs";
import { AppStatus } from "../AppStatus";
import { Resources } from "../core/Resources";
import { TextItem } from "../core/TextItem";
import { GameScene } from "../GameScene";
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

    zip(
      this.preloadImage("assets/b-grey.png"), //
      this.preloadImage("assets/b-grey.png"), //
      this.preloadImage("assets/b-grey.png") //
    ).subscribe((is) => {
      for (const v of is) {
        Resources.set(v.src, v);
      }
      this.status.value.scene = GameScene.MAINSCREEN;
      this.status.next(this.status.value);
    });
  }

  update(delta: number): void {}

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
}
