import SIDE from '../constant/SIDE';
import LEVEL from '../constant/LEVEL';
import GOMA from '../constant/GOMA';
import Hei from './Hei';
import Osho from './Osho';
import Sho from './Sho';
import Uma from './Uma';
import Shinobi from './Shinobi';
import Yari from './Yari';
import Chu from './Chu';
import Dai from './Dai';
import Shi from './Shi';
import Toride from './Toride';

export default class GomaFactory {
  static create(level: LEVEL, side: SIDE, name: GOMA) {
    switch (name) {
      case GOMA.OSHO: {
        return new Osho(level, side);
      }
      case GOMA.HEI: {
        return new Hei(level, side);
      }
      case GOMA.SHO: {
        return new Sho(level, side);
      }
      case GOMA.UMA: {
        return new Uma(level, side);
      }
      case GOMA.SHINOBI: {
        return new Shinobi(level, side);
      }
      case GOMA.YARI: {
        return new Yari(level, side);
      }
      case GOMA.CHU: {
        return new Chu(level, side);
      }
      case GOMA.DAI: {
        return new Dai(level, side);
      }
      case GOMA.SHI: {
        return new Shi(level, side);
      }
      case GOMA.TORIDE: {
        return new Toride(level, side);
      }
      default: {
        throw new Error('Goma name is not exist');
      }
    }
  }
}
