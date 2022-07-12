export default class Dimension {
  readonly width: number;
  readonly height: number;
  readonly length: number;

  constructor(width: number, height: number, length: number) {
    if (width < 0 || height < 0 || length < 0) throw new Error('Invalid dimension');
    this.width = width;
    this.height = height;
    this.length = length;
  }

  getVolume() {
    return (this.width / 100) * (this.height / 100) * (this.length / 100);
  }
}
