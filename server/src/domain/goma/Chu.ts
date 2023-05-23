import Coordinate from '../Coordinate';
import Goma from './Goma';
import LEVEL from '../constant/LEVEL';
import SIDE from '../constant/SIDE';
import GOMA from '../constant/GOMA';

export default class Chu extends Goma {
  constructor(level: LEVEL, side: SIDE, name: GOMA, coordinate: Coordinate) {
    super(level, side, name, coordinate);
  }

  arata(to: Coordinate): void {
    throw new Error('Method not implemented.');
  }

  ugokiGoma(to: Coordinate): void {
    throw new Error('Method not implemented.');
  }
}
