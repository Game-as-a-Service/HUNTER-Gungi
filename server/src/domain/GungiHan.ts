import Goma from './goma/Goma';
import Coordinate from './Coordinate';
import {
  HAN_X_MAX,
  HAN_Y_MAX,
  HAN_Z_MAX,
  EMPTY_GOMA,
} from './constant/constants';

export type GungiHanGoma = {
  goma: Goma;
  coordinate: Coordinate;
};

export default class GungiHan {
  private _han: Goma[][][];

  constructor(gomas: GungiHanGoma[] = []) {
    this.setHan(gomas);
  }

  findGoma(targetCoordinate: Coordinate): Goma {
    const { x, y, z } = targetCoordinate;
    return this._han[x - 1][y - 1][z - 1];
  }

  addGoma(goma: Goma, to: Coordinate) {
    const { x, y, z } = to;
    this._han[x - 1][y - 1][z - 1] = goma;
  }

  private setHan(gomas: GungiHanGoma[]) {
    this.createInitialHan();

    gomas.forEach((goma) => {
      const { x, y, z } = goma.coordinate;
      this._han[x - 1][y - 1][z - 1] = goma.goma;
    });
  }

  // create 9x9x3 array
  private createInitialHan() {
    this._han = [...new Array(HAN_X_MAX)].map(() =>
      [...new Array(HAN_Y_MAX)].map(() =>
        new Array(HAN_Z_MAX).fill(EMPTY_GOMA),
      ),
    );
  }
}
