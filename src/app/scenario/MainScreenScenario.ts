import { AppStatus } from "../AppStatus";
import { BaseScenario } from "./BaseScenario";
import { BehaviorSubject, Observable, zip } from "rxjs";
import { Resources } from "../core/Resources";

export class MainScreenScenario extends BaseScenario {
  constructor(protected status: BehaviorSubject<AppStatus>) {
    super(status);

    this.status.subscribe((s) => {
      const audio = Resources.get("MUSIC")! as HTMLAudioElement;
      audio.loop = true;
      audio.play();
    });
  }

  update(delta: number): void {}
}
