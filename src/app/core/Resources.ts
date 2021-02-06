import { Observable } from "rxjs";

export interface Resource {
  key: string;
  obj: HTMLAudioElement | HTMLImageElement;
}
export class Resources {
  public static readonly registry = new Map<
    string,
    HTMLImageElement | HTMLAudioElement
  >();

  public static get(
    k: string
  ): HTMLImageElement | HTMLAudioElement | undefined {
    return Resources.registry.get(k);
  }

  public static set(
    k: string,
    v: HTMLImageElement | HTMLAudioElement | undefined
  ): void {
    if (v === undefined) {
      Resources.registry.delete(k);
    } else {
      Resources.registry.set(k, v);
    }
  }

  public static preloadImage(key: string, src: string): Observable<Resource> {
    return new Observable<Resource>((sub) => {
      const i = new Image();
      i.onload = (ev) => {
        sub.next({
          key,
          obj: i,
        });
        sub.complete();
      };
      i.src = src;
    });
  }

  public static preloadAudio(key: string, src: string): Observable<Resource> {
    return new Observable<Resource>((sub) => {
      const i = new Audio(src);
      i.addEventListener("loadeddata", (ev) => {
        sub.next({
          key,
          obj: i,
        });
        sub.complete();
      });
    });
  }
}
