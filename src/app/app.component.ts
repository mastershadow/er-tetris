import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild("mainCanvas") private canvasRef!: ElementRef;
  private context!: CanvasRenderingContext2D;
  private w: number = 0;
  private h: number = 0;


  ngOnInit(): void {
    window.addEventListener("load", () => {
      const canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
      this.context = canvas.getContext("2d")!;
      this.context.imageSmoothingEnabled = false;

      this.w = canvas.width;
      this.h = canvas.height;
      this.render(true);
    })
  }

  render(first: boolean = false): void {
    this.update();
    this.context.clearRect(0, 0, this.w, this.h);
    this.context.fillStyle = "#FF00FF";
    this.context.font = "32px VT323, monospace";
    this.context.save();
    this.context.translate(0.5, 0.5);
    this.context.textAlign = "left";
    this.context.textBaseline = "top";
    this.context.fillText("ER-TETRIS", 32, 32);
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.fillStyle = "#00FFFF";
    this.context.fillText("LOADING", this.w/2, this.h/2);
    this.context.restore();

    requestAnimationFrame(() => this.render());
  }

  update():void {
  }
}
