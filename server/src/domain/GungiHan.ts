import Goma from './goma/Goma';
import Coordinate from './Coordinate';
import { BOUNDARY, HEIGHT_LIMIT } from './constant/GUNGI_HAN';
import LEVEL from './constant/LEVEL';
import { ERROR_MESSAGE } from './constant/ERROR_MESSAGE';
import SIDE from './constant/SIDE';
import GOMA from './constant/GOMA';

export type GungiHanGoma = {
  goma: Goma;
  coordinate: Coordinate;
};

class GungiHan {
  private _han: Goma[][][];

  constructor(private _level: LEVEL, gomas: GungiHanGoma[] = []) {
    this.setHan(gomas);
  }

  findGoma(targetCoordinate: Coordinate): Goma {
    if (this.isOutOfBoundary(targetCoordinate)) {
      throw new Error(ERROR_MESSAGE.OUTSIDE_HAN);
    }
    const { x, y, z } = targetCoordinate;
    const goma = this._han[x][y][z];

    if (!goma) {
      return null;
    }

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

  hasGomaAtBelow(to: Coordinate) {
    const { x, y, z } = to;
    for (let zIndex = z - 1; zIndex >= 0; zIndex--) {
      if (this._han[x][y][zIndex]) {
        return true;
      }
    }
    return false;
  }

  hasOSHOAtBelow(to: Coordinate) {
    const { x, y } = to;
    const gomasAtZCoordinate = this._han[x][y];
    const osho = gomasAtZCoordinate.findIndex(
      (goma) => goma?.name === GOMA.OSHO,
    );
    return osho !== -1;
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
      this._han[coordinate.x][coordinate.y][coordinate.z] = goma;
    });
  }

  // create 9x9x3  not same memory array
  private createInitialHan() {
    this._han = Array.from({ length: 9 }, () =>
      Array.from({ length: 9 }, () => Array.from({ length: 3 })),
    );
  }
}

export default GungiHan;
