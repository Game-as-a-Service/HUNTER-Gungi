import Goma from './Goma';
import Coordinate from '../Coordinate';
import SIDE from '../constant/SIDE';
import LEVEL from '../constant/LEVEL';
import GOMA from '../constant/GOMA';

export default class Yari extends Goma {
  protected _name: GOMA = GOMA.YARI;

  constructor(level: LEVEL, side: SIDE) {
    super(level, side);
  }

  arata(to: Coordinate): void {
    throw new Error('Method not implemented.');
  }

  ugokiGoma(to: Coordinate): void {
    throw new Error('Method not implemented.');
  }
}
