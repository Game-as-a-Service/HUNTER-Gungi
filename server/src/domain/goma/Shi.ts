import Goma from './Goma';
import SIDE from '../constant/SIDE';
import Coordinate from '../Coordinate';
import LEVEL from '../constant/LEVEL';
import GOMA from '../constant/GOMA';

export default class Shi extends Goma {
  protected _name: GOMA = GOMA.SHI;

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
