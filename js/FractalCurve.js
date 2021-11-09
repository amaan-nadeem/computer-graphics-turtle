class FractalCurve extends Turtle {
  static pointC;
  static factor;
  static minLenSq;
  static scene;

  constructor(point, initAngle, factor, minLenSq, scene) {
    super(point, initAngle);
    this.pointC = new THREE.Vector2(0, 0);
    this.factor = factor;
    this.minLenSq = minLenSq;
    this.scene = scene;
  }

  generateFractalCurve(pointA, pointB, stdDev) {
    const diffX = pointA.x - pointB.x;
    const diffY = pointA.y - pointB.y;
    const lenSq = Math.pow(diffX, 2) + Math.pow(diffY, 2);
    if (lenSq < this.minLenSq) {
      this.path.lineTo(pointB.x, pointB.y);
    } else {
      stdDev = stdDev * this.factor;
      let t = 0;
      for (let i = 0; i < 12; i++) {
        t += Math.random() / 32768;
      }
      t = (t - 6) * stdDev;
      this.pointC.x = 0.5 * (pointA.x + pointB.x) + t * (pointB.y - pointA.y);
      this.pointC.y = 0.5 * (pointA.y + pointB.y) + t * (pointB.x - pointA.x);
      this.generateFractalCurve(pointA, this.pointC, stdDev);
      this.generateFractalCurve(this.pointC, pointB, stdDev);
    }
  }
}
