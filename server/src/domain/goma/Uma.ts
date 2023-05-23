import Goma from './Goma';
import SIDE from '../constant/SIDE';
import Coordinate from '../Coordinate';
import LEVEL from '../constant/LEVEL';
import GOMA from '../constant/GOMA';

export default class Uma extends Goma {
  constructor(
    _level: LEVEL,
    _side: SIDE,
    _name: GOMA,
    _coordinate: Coordinate,
  ) {
    super(_level, _side, _name, _coordinate);
  }

  arata(to: Coordinate): void {}

  ugokiGoma(to: Coordinate): void {}
}
