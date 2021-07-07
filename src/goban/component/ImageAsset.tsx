export class ImageAsset {
  public element: HTMLImageElement;
  public loaded: boolean;

  constructor(path: string, onLoad: () => void) {
    this.loaded = false;
    this.element = new Image();
    this.element.onload = () => {
      this.loaded = true;
      onLoad();
    };
    this.element.src = path;
  }
}
