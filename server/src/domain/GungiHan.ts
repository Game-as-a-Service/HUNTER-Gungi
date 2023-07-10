import Coordinate from './Coordinate';
import Goma from './goma/Goma';
import {
  HAN_X_MAX,
  HAN_Y_MAX,
  HAN_Z_MAX,
  EMPTY_GOMA,
} from './constant/constants';
import LEVEL from './constant/LEVEL';
import GomaFactory from './goma/GomaFactory';

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
    return this._han[x][y][z];
  }

  addGoma(goma: Goma, to: Coordinate) {
    const { x, y, z } = to;
    this._han[x][y][z] = goma;
  }

  getAllGoma(): GungiHanGoma[] {
    const han: GungiHanGoma[] = [];

    this._han.forEach((xArray, x) => {
      xArray.forEach((yArray, y) => {
        yArray.forEach((zArray, z) => {
          const coordinate = new Coordinate(x, y, z);
          const goma = this._han[x][y][z];
          if (goma !== EMPTY_GOMA) {
            han.push({
              goma: GomaFactory.create(LEVEL.BEGINNER, goma.side, goma.name),
              coordinate: coordinate,
            });
          }
        });
      });
    });

    return han;
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
    this._han = [...new Array(HAN_X_MAX)].map(() =>
      [...new Array(HAN_Y_MAX)].map(() =>
        new Array(HAN_Z_MAX).fill(EMPTY_GOMA),
      ),
    );
  }
}
