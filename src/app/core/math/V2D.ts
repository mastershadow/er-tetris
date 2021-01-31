export class V2D {
  x: number = 0;
  y: number = 0;

  set(x: number, y: number): V2D {
    this.x = x;
    this.y = y;
    return this;
  }
}
