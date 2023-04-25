class Coord {
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
}
export default Coord;
