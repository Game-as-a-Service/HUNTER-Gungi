import Coordinate from '../Coordinate';
import SIDE from '../constant/SIDE';
import GOMA from '../constant/GOMA';
import LEVEL from '../constant/LEVEL';

export default abstract class Goma {
  protected constructor(private _level: LEVEL, private _side: SIDE) {}

  protected abstract _name: GOMA;

  get name(): GOMA {
    return this._name;
  }

  get side(): SIDE {
    return this._side;
  }

  abstract arata(to: Coordinate): void;

  abstract ugokiGoma(to: Coordinate): void;
}
