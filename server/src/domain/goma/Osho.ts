import Goma from './Goma';
import Coordinate from '../Coordinate';
import SIDE from '../constant/SIDE';
import LEVEL from '../constant/LEVEL';
import GOMA from '../constant/GOMA';

export default class Osho extends Goma {
  constructor(level: LEVEL, side: SIDE, name: GOMA) {
    super(level, side, name);
  }

  arata(to: Coordinate): void {
    throw new Error('Method not implemented.');
  }

  ugokiGoma(to: Coordinate): void {
    throw new Error('Method not implemented.');
  }
}
