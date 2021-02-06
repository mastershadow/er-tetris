export enum AppInputEventType {
  MOUSE,
  KEY_UP,
  KEY_DOWN,
}

export interface AppInputEvent {
  type: AppInputEventType;
  x?: number;
  y?: number;
  button: number | string;
}
