import Coordinate from '../Coordinate';
import SIDE from '../constant/SIDE';
import { GomaData } from '../../frameworks/data-services/GungiData';
import GOMA from '../constant/GOMA';
import LEVEL from '../constant/LEVEL';

export default abstract class Goma {
  constructor(
    private _level: LEVEL,
    private _side: SIDE,
    private _name: GOMA,
    private _coordinate: Coordinate,
  ) {}

  get name(): GOMA {
    return this._name;
  }

  get side(): SIDE {
    return this._side;
  }

  get coordinate(): Coordinate {
    return this._coordinate;
  }

  set coordinate(to: Coordinate) {
    this._coordinate = to;
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

  abstract arata(to: Coordinate): void;

  abstract ugokiGoma(to: Coordinate): void;
}
