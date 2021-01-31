import { BehaviorSubject } from "rxjs";
import { AppStatus } from "../AppStatus";
import { BaseScenario } from "./BaseScenario";

export class PreloadingScenario extends BaseScenario {
  constructor(protected status: BehaviorSubject<AppStatus>) {
    super(status);
  }

  update(delta: number): void {}
}
