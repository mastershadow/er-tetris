import { BehaviorSubject, Subject } from "rxjs";
import { AppStatus } from "../AppStatus";
import { AppInputEvent, AppInputEventType } from "../core/AppInputEvent";
import { Group } from "../core/Group";
import { Resources } from "../core/Resources";
import { SpriteItem } from "../core/SpriteItem";
import { GameScene } from "../GameScene";
import { BaseScenario } from "./BaseScenario";

class Border extends Group {
  constructor(rows: number, cols: number) {
    super();
    const grey = Resources.get("BLOCK-GREY")! as HTMLImageElement;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (j === 0 || j === rows - 1 || i === 0 || i === cols - 1) {
          const block = new SpriteItem(grey);
          block.position.x = grey.width * i;
          block.position.y = grey.height * j;
          this.add(block);
        }
      }
    }
  }
}

export class GameScenario extends BaseScenario {
  private static readonly rows = 26;
  private static readonly cols = 10;
  private title: SpriteItem;
  private border: Border;

  constructor(
    protected status: BehaviorSubject<AppStatus>,
    protected events: Subject<AppInputEvent | undefined>
  ) {
    super(status, events);

    const titleImage = Resources.get("TITLE")! as HTMLImageElement;
    this.title = new SpriteItem(titleImage);
    this.title.matrix.scale(0.5, 0.5);
    this.title.position.set(16, 16);
    this.scene.add(this.title);

    this.border = new Border(GameScenario.rows + 2, GameScenario.cols + 2);
    this.scene.add(this.border);

    this.subscriptions.push(
      this.status.subscribe((s) => {
        this.border.position.set(s.w! / 2 - 6 * 16, 16);
        this.border.updateChildrenMatrix();
      })
    );

    this.subscriptions.push(
      this.events.subscribe((e: AppInputEvent | undefined) => {
        if (e && e.type === AppInputEventType.KEY_UP) {
          if (e.button === "Escape") {
            this.status.value.scene = GameScene.MAINSCREEN;
            this.status.next(this.status.value);
          } else if (e.button === "ArrowUp") {
            console.log(e.button);
          } else if (e.button === "ArrowLeft") {
            console.log(e.button);
          } else if (e.button === "ArrowRight") {
            console.log(e.button);
          } else if (e.button === "ArrowDown") {
            console.log(e.button);
          }
        }
      })
    );
  }

  update(delta: number): void {}
}
