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
}
