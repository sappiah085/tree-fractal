import p5 from "p5";

export class Line {
  _x1: number;
  _y1: number;
  _length: number;
  _angle: number;
  _x2: number;
  _y2: number;
  _generation: number;

  constructor(
    x: number,
    y: number,
    length: number,
    angle: number,
    generation: number
  ) {
    this._x1 = x;
    this._y1 = y;
    this._generation = generation;
    this._length = length;

    // Normalize the angle to 0 to 2*PI
    this._angle = (angle + 2 * Math.PI) % (2 * Math.PI);

    // Calculate endpoint
    this._x2 = this._x1 + this._length * Math.cos(this._angle);
    this._y2 = this._y1 - this._length * Math.sin(this._angle); // Adjusted for p5.js inverted y-axis
  }

  show(p: p5, color:number) {
    p.stroke(color);
    p.strokeWeight(2);
    p.line(this._x1, this._y1, this._x2, this._y2);
  }

  getNode() {
    return { x: this._x2, y: this._y2, angle: this._angle };
  }
}
