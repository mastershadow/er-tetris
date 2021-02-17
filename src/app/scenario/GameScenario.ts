import { BehaviorSubject, Subject } from "rxjs";
import { AppStatus } from "../AppStatus";
import { AppInputEvent, AppInputEventType } from "../core/AppInputEvent";
import { Group } from "../core/Group";
import { Resources } from "../core/Resources";
import { SpriteItem } from "../core/SpriteItem";
import { GameScene } from "../GameScene";
import { BaseScenario } from "./BaseScenario";
import { Piece } from "./game/Piece";
import { Orientation } from "./game/Orientation";
import { PieceI } from "./game/PieceI";
import { PieceJ } from "./game/PieceJ";
import { PieceL } from "./game/PieceL";
import { PieceO } from "./game/PieceO";
import { PieceS } from "./game/PieceS";
import { PieceT } from "./game/PieceT";
import { PieceZ } from "./game/PieceZ";

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
class Board {
  private grid: number[][] = [];

  constructor(private rows: number, private cols: number) {
    for (let r = 0; r < rows; r++) {
      this.grid.push(Array.from({ length: cols }, () => 0));
    }
  }

  public merge(p: Piece, o: Orientation, col: number, row: number): void {}

  public clearableRows(): number[] {
    return [];
  }

  public canRotate(p: Piece, o: Orientation): boolean {
    return false;
  }

  public collides(p: Piece, o: Orientation, col: number, row: number): boolean {
    return false;
  }
}

export class GameState {
  level: number = 0;
  speed: number = 1000;
  speedup: number = 1.5;
  score: number = 0;
  clearanceScore: number = 100;
  nextLevelStep: number = 1000;
  nextLevelMultiplier: number = 2.5;
}

export class DiceRoller {
  protected map: Map<number, Piece>;

  public constructor() {
    this.map = new Map<number, Piece>([
      [0, new PieceI()],
      [1, new PieceJ()],
      [2, new PieceL()],
      [3, new PieceO()],
      [4, new PieceS()],
      [5, new PieceT()],
      [6, new PieceZ()],
    ]);
  }

  public draw(): Piece {
    return this.map.get(Math.floor(Math.random() * this.map.size))!;
  }
}

export class GameScenario extends BaseScenario {
  private static readonly rows = 26;
  private static readonly cols = 10;
  private title: SpriteItem;
  private border: Border;
  private board: Board;
  private gameState: GameState;
  private diceRoller: DiceRoller;
  private stepTimeoutHandler?: number;

  constructor(
    protected status: BehaviorSubject<AppStatus>,
    protected events: Subject<AppInputEvent | undefined>
  ) {
    super(status, events);

    this.gameState = new GameState();
    this.diceRoller = new DiceRoller();

    const titleImage = Resources.get("TITLE")! as HTMLImageElement;
    this.title = new SpriteItem(titleImage);
    this.title.matrix.scale(0.5, 0.5);
    this.title.position.set(16, 16);
    this.scene.add(this.title);

    this.border = new Border(GameScenario.rows + 2, GameScenario.cols + 2);
    this.scene.add(this.border);

    this.board = new Board(GameScenario.rows, GameScenario.cols);

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

    // use delta timing for better time management
    this.setStepTimeout();
  }

  protected setStepTimeout() {
    if (this.stepTimeoutHandler) {
      window.clearTimeout(this.stepTimeoutHandler);
    }
    this.stepTimeoutHandler = window.setTimeout(() => {}, this.gameState.speed);
  }

  update(delta: number): void {}
}
