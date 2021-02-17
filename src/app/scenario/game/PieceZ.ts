import { Piece } from "./Piece";
import { Orientation } from "./Orientation";

export class PieceZ extends Piece {
  data: Map<Orientation, number[][]> = new Map<Orientation, number[][]>([
    [
      Orientation.Up,
      [
        [0, 0, 0, 0],
        [0, 0, 1, 1],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
      ],
    ],
    [
      Orientation.Right,
      [
        [0, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 1, 0],
      ],
    ],
    [
      Orientation.Down,
      [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0],
      ],
    ],
    [
      Orientation.Left,
      [
        [0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 0],
      ],
    ],
  ]);
}
