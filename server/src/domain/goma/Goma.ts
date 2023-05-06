import Coordinate from '../Coordinate';
import SIDE from '../constant/SIDE';
import { GomaData } from '../../frameworks/data-services/gungi-data';
import GOMA from '../constant/GOMA';
import LEVEL from '../constant/LEVEL';
import Hei from './Hei';

export default abstract class Goma {
  constructor(
    private _level: LEVEL,
    private _side: SIDE,
    private _name: GOMA,
    private _coordinate: Coordinate,
  ) {}

  static create(level: LEVEL, side: SIDE, name: GOMA, coordinate: Coordinate) {
    switch (name) {
      case GOMA.HEI: {
        return new Hei(level, side, name, coordinate);
      }
      default: {
        throw new Error('Goma name is not exist');
      }
    }
  }

  toData(): GomaData {
    return {
      side: this._side,
      name: this._name,
      coordinate: this._coordinate.toData(),
    };
  }

  getCoordinateX(): number {
    return this._coordinate.x;
  }

  getCoordinateY(): number {
    return this._coordinate.y;
  }

  getCoordinateZ(): number {
    return this._coordinate.z;
  }
}
