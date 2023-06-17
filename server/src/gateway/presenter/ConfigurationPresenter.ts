import Presenter from '../../usecases/Presenter';
import { Event } from '../../domain/events/Event';
import { ConfigurationEvent } from '../../domain/events/ConfigurationEvent';
import {
  EMPTY_GOMA,
  HAN_X_MAX,
  HAN_Y_MAX,
  HAN_Z_MAX,
} from '../../domain/constant/constants';
import Coordinate from '../../domain/Coordinate';

export interface Goma {
  name: string; // 棋子的名稱
  side: string; // 黑 or 白
}

export interface GungiHanGoma {
  goma: Goma;
  coordinate: { x: number; y: number; z: number };
}

export interface ConfigurationView {
  han: GungiHanGoma[];
  blackOki: Goma[];
  whileOki: Goma[];
}

export default class ConfigurationPresenter
  implements Presenter<ConfigurationView>
{
  present(events: Event[]): ConfigurationView {
    const event = events.filter(
      (e) => e.name === 'Configuration',
    )[0] as ConfigurationEvent;

    const view: ConfigurationView = {
      han: [],
      blackOki: [],
      whileOki: [],
    };

    for (let x = 0; x < HAN_X_MAX; x++) {
      for (let y = 0; y < HAN_Y_MAX; y++) {
        for (let z = 0; z < HAN_Z_MAX; z++) {
          const coordinate = new Coordinate(x, y, z);
          const goma = event.data.gungiHan.findGoma(coordinate);
          if (goma !== EMPTY_GOMA) {
            view.han.push({
              goma: {
                side: goma.side,
                name: goma.name,
              },
              coordinate: {
                x,
                y,
                z,
              },
            });
          }
        }
      }
    }

    view.blackOki = event.data.senteGomaOki.gomas.map((goma) => {
      return {
        side: goma.side,
        name: goma.name,
      };
    });

    view.whileOki = event.data.goteGomaOki.gomas.map((goma) => {
      return {
        side: goma.side,
        name: goma.name,
      };
    });

    return view;
  }
}
