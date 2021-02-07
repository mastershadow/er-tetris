import { BehaviorSubject, Subject } from "rxjs";
import { AppStatus } from "../AppStatus";
import { AppInputEvent, AppInputEventType } from "../core/AppInputEvent";
import { Group } from "../core/Group";
import { Resources } from "../core/Resources";
import { SpriteItem } from "../core/SpriteItem";
import { TextItem } from "../core/TextItem";
import { GameScene } from "../GameScene";
import { BaseScenario } from "./BaseScenario";

class MainMenu extends Group {
  public static readonly NEW_GAME: string = "NEW GAME";
  public static readonly HIGHSCORE: string = "HIGHSCORE";
  public static readonly CREDITS: string = "CREDITS";
  public static readonly UNSELECTED_COLOR: string = "#00FFFF";
  public static readonly SELECTED_COLOR: string = "#FFFF00";
  public static readonly ALIGNMENT: CanvasTextAlign = "center";
  public static readonly BASELINE: CanvasTextBaseline = "middle";
  public static readonly FONT: string = "32px VT323, monospace";

  items: Map<string, TextItem>;
  private _current!: string;

  constructor() {
    super();
    this.items = new Map();

    const newGameItem = new TextItem();
    newGameItem.text = MainMenu.NEW_GAME;
    newGameItem.color = MainMenu.UNSELECTED_COLOR;
    newGameItem.align = MainMenu.ALIGNMENT;
    newGameItem.baseline = MainMenu.BASELINE;
    newGameItem.font = MainMenu.FONT;
    this.items.set(MainMenu.NEW_GAME, newGameItem);
    this.add(newGameItem);

    const hsItem = new TextItem();
    hsItem.text = MainMenu.HIGHSCORE;
    hsItem.color = MainMenu.UNSELECTED_COLOR;
    hsItem.align = MainMenu.ALIGNMENT;
    hsItem.baseline = MainMenu.BASELINE;
    hsItem.font = MainMenu.FONT;
    hsItem.position.y = 48;
    this.items.set(MainMenu.HIGHSCORE, hsItem);
    this.add(hsItem);

    const creditsItem = new TextItem();
    creditsItem.text = MainMenu.CREDITS;
    creditsItem.color = MainMenu.UNSELECTED_COLOR;
    creditsItem.align = MainMenu.ALIGNMENT;
    creditsItem.baseline = MainMenu.BASELINE;
    creditsItem.font = MainMenu.FONT;
    creditsItem.position.y = 96;
    this.items.set(MainMenu.CREDITS, creditsItem);
    this.add(creditsItem);

    this.current = MainMenu.NEW_GAME;
  }

  public get current(): string {
    return this._current;
  }

  public set current(value: string) {
    for (const [k, v] of this.items) {
      v.color = MainMenu.UNSELECTED_COLOR;
    }
    this._current = value;
    this.items.get(value)!.color = MainMenu.SELECTED_COLOR;
  }

  public next(): void {
    const ks = [...this.items.keys()];
    const curIdx = ks.indexOf(this.current);
    if (curIdx !== undefined) {
      const n = (curIdx + 1) % ks.length;
      this.current = ks[n];
    }
  }

  public previous(): void {
    const ks = [...this.items.keys()];
    const curIdx = ks.indexOf(this.current);
    if (curIdx !== undefined) {
      const n = curIdx === 0 ? ks.length - 1 : curIdx - 1;
      this.current = ks[n];
    }
  }
}

export class MainScreenScenario extends BaseScenario {
  private title: SpriteItem;
  private bg: SpriteItem;
  private mainMenu: MainMenu;

  constructor(
    protected status: BehaviorSubject<AppStatus>,
    protected events: Subject<AppInputEvent | undefined>
  ) {
    super(status, events);
    const img = Resources.get("TITLE")! as HTMLImageElement;
    this.title = new SpriteItem(img);
    this.title.matrix.translate(-img.width / 2, 0);
    this.scene.add(this.title);

    const imgBg = Resources.get("TITLE-BG")! as HTMLImageElement;
    this.bg = new SpriteItem(imgBg);
    this.bg.matrix.translate(0, status.value.h! - imgBg.height);
    this.bg.zDepth = -10;
    this.scene.add(this.bg);

    this.mainMenu = new MainMenu();
    this.scene.add(this.mainMenu);

    this.subscriptions.push(
      this.status.subscribe((s) => {
        this.title.position.set(s.w! / 2, 48);
        this.mainMenu.position.set(s.w! / 2, 164);
        this.mainMenu.updateChildrenMatrix();

        const audio = Resources.get("MUSIC")! as HTMLAudioElement;
        audio.loop = true;
        // FIXME audio.play();
      })
    );

    this.subscriptions.push(
      this.events.subscribe((e: AppInputEvent | undefined) => {
        if (e && e.type === AppInputEventType.KEY_UP) {
          if (e.button === "ArrowUp") {
            this.mainMenu.previous();
          } else if (e.button === "ArrowDown") {
            this.mainMenu.next();
          } else if (e.button === "Enter") {
            let newGameScene = GameScene.GAME;
            if (this.mainMenu.current === MainMenu.HIGHSCORE) {
              newGameScene = GameScene.HIGHSCORE;
            } else if (this.mainMenu.current === MainMenu.CREDITS) {
              newGameScene = GameScene.CREDITS;
            }
            this.status.value.scene = newGameScene;
            this.status.next(this.status.value);
          }
        }
      })
    );
  }

  update(delta: number): void {}
}
