import Coordinate from './Coordinate';
import Goma from './goma/Goma';
import { BOUNDARY, HEIGHT_LIMIT, SIZE } from './constant/GUNGI_HAN';
import LEVEL from './constant/LEVEL';
import { ERROR_MESSAGE } from './constant/ERROR_MESSAGE';
import SIDE from './constant/SIDE';
import GOMA, { EMPTY_GOMA } from './constant/GOMA';
import GomaFactory from './goma/GomaFactory';

export type GungiHanGoma = {
  goma: Goma;
  coordinate: Coordinate;
};
export default class GungiHan {
  private _han: Goma[][][];

  constructor(private _level: LEVEL, gomas: GungiHanGoma[] = []) {
    this.setHan(gomas);
  }

  findGoma(targetCoordinate: Coordinate): Goma {
    if (this.isOutOfBoundary(targetCoordinate)) {
      throw new Error(ERROR_MESSAGE.OUTSIDE_HAN);
    }
    const { x, y, z } = targetCoordinate;
    return this._han[x][y][z];
  }

  addGoma(goma: Goma, to: Coordinate) {
    if (this.isOutOfBoundary(to)) {
      throw new Error(ERROR_MESSAGE.OUTSIDE_HAN);
    }
    if (this.isOverHeight(to)) {
      throw new Error(ERROR_MESSAGE.OVER_HEIGHT);
    }

    const { x, y, z } = to;
    this._han[x][y][z] = goma;
  }

  getFarthestYCoordinate(side: SIDE) {
    let targetY = this.getLowestYCoordinate(side);
    this._han.forEach((row) => {
      row.forEach((col, y) => {
        const sameSideGomas = col.filter((goma) => goma?.side === side);
        if (sameSideGomas.length > 0) {
          targetY = this.decideCurrentFarthestCoordinate(side, y, targetY);
        }
      });
    });

    return targetY;
  }

  hasGomaBelow(to: Coordinate) {
    const { x, y, z } = to;
    const zColumn = this._han[x][y];
    return zColumn.slice(0, z).some((goma) => goma !== EMPTY_GOMA);
  }

  hasOSHOBelow(to: Coordinate) {
    const { x, y } = to;
    const gomasAtZCoordinate = this._han[x][y];
    const osho = gomasAtZCoordinate.findIndex(
      (goma) => goma?.name === GOMA.OSHO,
    );
    return osho !== -1;
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

  private decideCurrentFarthestCoordinate(
    side: SIDE,
    y: number,
    targetY: number,
  ) {
    switch (side) {
      case SIDE.WHITE:
        return Math.max(targetY, y);
      case SIDE.BLACK:
        return Math.min(targetY, y);
      default:
        throw new Error(ERROR_MESSAGE.INVALID_SIDE);
    }
  }

  private getLowestYCoordinate(side: SIDE) {
    switch (side) {
      case SIDE.WHITE:
        return BOUNDARY.BOTTOM;
      case SIDE.BLACK:
        return BOUNDARY.TOP;
      default:
        throw new Error(ERROR_MESSAGE.INVALID_SIDE);
    }
  }

  private isOutOfBoundary(coordinate: Coordinate) {
    const { x, y } = coordinate;

    return (
      x < BOUNDARY.LEFT ||
      x > BOUNDARY.RIGHT ||
      y < BOUNDARY.BOTTOM ||
      y > BOUNDARY.TOP
    );
  }

  private isOverHeight(coordinate: Coordinate) {
    const { z } = coordinate;
    const heightLimit = HEIGHT_LIMIT[this._level];
    return z > heightLimit;
  }

  private setHan(gomas: GungiHanGoma[]) {
    this.createInitialHan();
    gomas.forEach((gungiHanGoma) => {
      const { goma, coordinate } = gungiHanGoma;
      const { x, y, z } = coordinate;
      this._han[x][y][z] = goma;
    });
  }

  // create 9x9x3  not same memory array
  private createInitialHan() {
    this._han = Array.from({ length: SIZE.LENGTH }, () =>
      Array.from({ length: SIZE.WIDTH }, () =>
        Array.from({ length: SIZE.HEIGHT }).map(() => EMPTY_GOMA),
      ),
    );
  }
}
