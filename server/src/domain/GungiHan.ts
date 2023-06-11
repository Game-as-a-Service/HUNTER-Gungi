import Goma from './goma/Goma';
import Coordinate from './Coordinate';

export type GungiHanGoma = {
  goma: Goma;
  coordinate: Coordinate;
};

export const EMPTY_GOMA = null;
export const HAN_X_MAX = 9;
export const HAN_Y_MAX = 9;
export const HAN_Z_MAX = 3;

export default class GungiHan {
  private _han: Goma[][][];

  constructor(gomas: GungiHanGoma[] = []) {
    this.setHan(gomas);
  }

  findGoma(targetCoordinate: Coordinate): Goma {
    // console.log(JSON.stringify(this._han));

    const { x, y, z } = targetCoordinate;
    return this._han[x][y][z];
  }

  addGoma(goma: Goma, to: Coordinate) {
    const { x, y, z } = to;
    this._han[x][y][z] = goma;
  }

  private setHan(gomas: GungiHanGoma[]) {
    this.createInitialHan();

    gomas.forEach((goma) => {
      const { x, y, z } = goma.coordinate;
      this._han[x][y][z] = goma.goma;
    });
  }

  // create 9x9x3 array
  private createInitialHan() {
    this._han = [...new Array(HAN_X_MAX + 1)].map(() =>
      [...new Array(HAN_Y_MAX + 1)].map(() =>
        new Array(HAN_Z_MAX + 1).fill(EMPTY_GOMA),
      ),
    );
  }
}
