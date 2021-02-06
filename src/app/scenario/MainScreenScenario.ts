import { AppStatus } from "../AppStatus";
import { BaseScenario } from "./BaseScenario";
import { BehaviorSubject, Observable, zip } from "rxjs";

export class MainScreenScenario extends BaseScenario {
  constructor(protected status: BehaviorSubject<AppStatus>) {
    super(status);

    this.status.subscribe((s) => {
      console.log("MAIN");
    });
  }

  update(delta: number): void {}
}
