import { BehaviorSubject, Subject } from "rxjs";
import { AppStatus } from "../AppStatus";
import { AppInputEvent } from "../core/AppInputEvent";
import { BaseScenario } from "./BaseScenario";

export class PreloadingScenario extends BaseScenario {
  constructor(
    protected status: BehaviorSubject<AppStatus>,
    protected events: Subject<AppInputEvent | undefined>
  ) {
    super(status, events);
  }

  update(delta: number): void {}
}
