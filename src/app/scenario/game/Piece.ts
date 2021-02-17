import { Orientation } from "./Orientation";

// I, O, S, Z, T, L, J
export abstract class Piece {
  abstract data: Map<Orientation, number[][]>;

  dataFor(dir: Orientation): number[][] {
    return this.data.get(dir)!;
  }
}
