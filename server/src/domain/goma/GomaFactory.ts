import SIDE from '../constant/SIDE';
import LEVEL from '../constant/LEVEL';
import GOMA from '../constant/GOMA';
import Hei from './Hei';
import Uma from './Uma';
import Yumi from './Yumi';
import Sho from './Sho';
import Osho from './Osho';

export default class GomaFactory {
  static create(level: LEVEL, side: SIDE, name: GOMA) {
    switch (name) {
      case GOMA.OSHO: {
        return new Osho(level, side);
      }
      case GOMA.HEI: {
        return new Hei(level, side);
      }
      case GOMA.UMA: {
        return new Uma(level, side);
      }
      case GOMA.YUMI: {
        return new Yumi(level, side);
      }
      case GOMA.SHO: {
        return new Sho(level, side);
      }
      default: {
        throw new Error('Goma name is not exist');
      }
    }
  }
}
