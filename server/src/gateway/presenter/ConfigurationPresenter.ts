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
  senteGomOki: Goma[];
  goteGomaOki: Goma[];
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
      senteGomOki: [],
      goteGomaOki: [],
    };

    const allGoma = event.data.gungiHan.getAllGoma();
    allGoma.forEach((item) => {
      view.han.push({
        goma: {
          side: item.goma.side,
          name: item.goma.name,
        },
        coordinate: item.coordinate.toData(),
      });
    });

    view.senteGomOki = event.data.senteGomaOki.gomas.map((goma) => {
      return {
        side: goma.side,
        name: goma.name,
      };
    });

    view.goteGomaOki = event.data.goteGomaOki.gomas.map((goma) => {
      return {
        side: goma.side,
        name: goma.name,
      };
    });

    return view;
  }
}
