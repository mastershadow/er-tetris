import { AppStatus } from "../AppStatus";
import { BaseScenario } from "./BaseScenario";
import { BehaviorSubject } from "rxjs";
import { Resources } from "../core/Resources";
import { SpriteItem } from "../core/SpriteItem";
import { AppInputEvent, AppInputEventType } from "../core/AppInputEvent";

export class MainScreenScenario extends BaseScenario {
  private title: SpriteItem;

  constructor(
    protected status: BehaviorSubject<AppStatus>,
    protected events: BehaviorSubject<AppInputEvent | undefined>
  ) {
    super(status);
    const img = Resources.get("TITLE")! as HTMLImageElement;
    this.title = new SpriteItem(img);
    this.title.matrix.translate(-img.width / 2, 0);
    this.scene.add(this.title);

    this.status.subscribe((s) => {
      this.title.position.set(s.w! / 2, 48);

      const audio = Resources.get("MUSIC")! as HTMLAudioElement;
      audio.loop = true;
      audio.play();
    });

    this.events.subscribe((e: AppInputEvent | undefined) => {
      if (e && e.type === AppInputEventType.KEY_UP) {
        if (e.button === "ArrowUp") {
          console.log("UP");
        } else if (e.button === "ArrowDown") {
          console.log("DOWN");
        }
      }
    });
  }

  update(delta: number): void {}
}
