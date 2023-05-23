import Goma from './Goma';
import Coordinate from '../Coordinate';
import SIDE from '../constant/SIDE';
import LEVEL from '../constant/LEVEL';
import GOMA from '../constant/GOMA';

export default class Osho extends Goma {
  constructor(level: LEVEL, side: SIDE, name: GOMA, coordinate: Coordinate) {
    super(level, side, name, coordinate);
  }

  arata(to: Coordinate): void {}

  ugokiGoma(to: Coordinate): void {}
}
