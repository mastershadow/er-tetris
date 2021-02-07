import { BehaviorSubject, Subject } from "rxjs";
import { AppStatus } from "../AppStatus";
import { AppInputEvent, AppInputEventType } from "../core/AppInputEvent";
import { GameScene } from "../GameScene";
import { BaseScenario } from "./BaseScenario";

export class CreditsScenario extends BaseScenario {
  constructor(
    protected status: BehaviorSubject<AppStatus>,
    protected events: Subject<AppInputEvent | undefined>
  ) {
    super(status, events);

    this.subscriptions.push(this.status.subscribe((s) => {}));

    this.subscriptions.push(
      this.events.subscribe((e: AppInputEvent | undefined) => {
        if (
          e &&
          (e.type === AppInputEventType.MOUSE ||
            e.type === AppInputEventType.KEY_UP)
        ) {
          this.status.value.scene = GameScene.MAINSCREEN;
          this.status.next(this.status.value);
        }
      })
    );
  }

  update(delta: number): void {}
}
