import { BehaviorSubject, Subject, Subscription } from "rxjs";
import { AppStatus } from "../AppStatus";
import { AppInputEvent } from "../core/AppInputEvent";
import { Scene } from "../core/Scene";
import { Scenario } from "./Scenario";

export abstract class BaseScenario implements Scenario {
  subscriptions: Subscription[] = [];
  scene: Scene = new Scene();
  constructor(
    protected status: BehaviorSubject<AppStatus>,
    protected events: Subject<AppInputEvent | undefined>
  ) {}
  abstract update(delta: number): void;

  public destroy(): void {
    for (const s of this.subscriptions) {
      s.unsubscribe();
    }
  }
}
