import SIDE from '../constant/SIDE';
import Coordinate from '../Coordinate';
import LEVEL from '../constant/LEVEL';
import GOMA from '../constant/GOMA';
import Hei from './Hei';

export default class GomaFactory {
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
}

