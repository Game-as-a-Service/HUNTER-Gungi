import { CoordinateData } from '../frameworks/data-services/gungi-data';

class Coordinate {
  constructor(private _x: number, private _y: number, private _z: number) {}

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  get z(): number {
    return this._z;
  }

  toData(): CoordinateData {
    return {
      x: this._x,
      y: this._y,
      z: this._z,
    };
  }
}

export default Coordinate;
