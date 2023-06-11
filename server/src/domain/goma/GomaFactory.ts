import SIDE from '../constant/SIDE';
import LEVEL from '../constant/LEVEL';
import GOMA from '../constant/GOMA';
import Hei from './Hei';
import Osho from './Osho';

export default class GomaFactory {
  static create(level: LEVEL, side: SIDE, name: GOMA) {
    switch (name) {
      case GOMA.OSHO: {
        return new Osho(level, side, name);
      }
      case GOMA.HEI: {
        return new Hei(level, side, name);
      }
      default: {
        throw new Error('Goma name is not exist');
      }
    }
  }
}
