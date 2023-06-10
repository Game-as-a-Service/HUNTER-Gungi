import Goma from './goma/Goma';
import Coordinate from './Coordinate';

type GungiHanGoma = {
  goma: Goma;
  coordinate: Coordinate;
};

class GungiHan {
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

  private setHan(gomas: GungiHanGoma[]) {
    this.createInitialHan();

    gomas.forEach((goma) => {
      const { x, y, z } = goma.coordinate;
      this._han[x][y][z] = goma.goma;
    });
  }

  // create 9x9x3 array
  private createInitialHan() {
    this._han = new Array(9).fill(new Array(9).fill(new Array(3)));
  }
}

export default GungiHan;
