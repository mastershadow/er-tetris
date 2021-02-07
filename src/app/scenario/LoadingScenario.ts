import { BehaviorSubject, zip } from "rxjs";
import { AppStatus } from "../AppStatus";
import { AppInputEvent, AppInputEventType } from "../core/AppInputEvent";
import { Resources } from "../core/Resources";
import { TextItem } from "../core/TextItem";
import { GameScene } from "../GameScene";
import { BaseScenario } from "./BaseScenario";

export class LoadingScenario extends BaseScenario {
  title: TextItem;
  loading: TextItem;
  continueButton: TextItem;
  hasLoaded: boolean = false;

  constructor(
    protected status: BehaviorSubject<AppStatus>,
    protected events: BehaviorSubject<AppInputEvent | undefined>
  ) {
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

    this.continueButton = new TextItem();
    this.continueButton.visible = false;
    this.continueButton.text = "CLICK TO CONTINUE";
    this.continueButton.color = "#00FFFF";
    this.continueButton.align = "center";
    this.continueButton.baseline = "middle";
    this.continueButton.font = "28px VT323, monospace";
    this.scene.add(this.continueButton);

    this.status.subscribe((s) => {
      this.loading.position.set(s.w! / 2, s.h! / 2);
      this.continueButton.position.set(s.w! / 2, s.h! / 2);
    });

    this.events.subscribe((e: AppInputEvent | undefined) => {
      if (e && e.type === AppInputEventType.MOUSE && this.hasLoaded) {
        this.status.value.scene = GameScene.MAINSCREEN;
        this.status.next(this.status.value);
      }
    });

    zip(
      Resources.preloadImage("BLOCK-GREY", "assets/b-grey.png"), //
      Resources.preloadImage("TITLE", "assets/title.png"), //
      Resources.preloadAudio("MUSIC", "assets/audio.ogg")
    ).subscribe((is) => {
      for (const v of is) {
        Resources.set(v.key, v.obj);
      }
      this.loading.visible = false;
      this.continueButton.visible = true;
      this.hasLoaded = true;
    });
  }

  update(delta: number): void {}
}
