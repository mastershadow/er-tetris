import { M3 } from "./M3";

export class V2 {
  x: number = 0;
  y: number = 0;

  set(x: number, y: number): V2 {
    this.x = x;
    this.y = y;
    return this;
  }

  clone(): V2 {
    const c = new V2();
    c.x = this.x;
    c.y = this.y;
    return c;
  }

  copy(v: V2): V2 {
    this.x = v.x;
    this.y = v.y;
    return this;
  }

  add(v: V2): V2 {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  addScalar(v: number): V2 {
    this.x += v;
    this.y += v;
    return this;
  }

  sub(v: V2): V2 {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  subScalar(v: number): V2 {
    this.x -= v;
    this.y -= v;
    return this;
  }

  mul(v: V2): V2 {
    this.x *= v.x;
    this.y *= v.y;
    return this;
  }

  mulScalar(v: number): V2 {
    this.x *= v;
    this.y *= v;
    return this;
  }

  div(v: V2): V2 {
    this.x /= v.x;
    this.y /= v.y;
    return this;
  }

  divScalar(v: number): V2 {
    this.x /= v;
    this.y /= v;
    return this;
  }

  applyMatrix(m: M3): V2 {
    const x = this.x;
    const y = this.y;
    const e = m.elements;

    this.x = e[0] * x + e[3] * y + e[6];
    this.y = e[1] * x + e[4] * y + e[7];

    return this;
  }

  dot(v: V2): number {
    return this.x * v.x + this.y * v.y;
  }

  cross(v: V2): number {
    return this.x * v.y - this.y * v.x;
  }

  lengthSq(): number {
    return this.x * this.x + this.y * this.y;
  }

  length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize(): V2 {
    return this.divScalar(this.length() || 1);
  }

  angle(): number {
    const angle = Math.atan2(-this.y, -this.x) + Math.PI;
    return angle;
  }

  distanceTo(v: V2): number {
    return Math.sqrt(this.distanceToSquared(v));
  }

  distanceToSquared(v: V2): number {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return dx * dx + dy * dy;
  }

  lerp(v: V2, alpha: number): V2 {
    this.x += (v.x - this.x) * alpha;
    this.y += (v.y - this.y) * alpha;

    return this;
  }

  rotateAround(center: V2, angle: number): V2 {
    const c = Math.cos(angle);
    const s = Math.sin(angle);

    const x = this.x - center.x;
    const y = this.y - center.y;

    this.x = x * c - y * s + center.x;
    this.y = x * s + y * c + center.y;

    return this;
  }
}
