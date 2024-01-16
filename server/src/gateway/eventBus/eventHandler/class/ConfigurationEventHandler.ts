import { ConfigurationEvent } from '../../../../domain/events/ConfigurationEvent';
import { Event } from '../../../../domain/events/Event';
import EventHandler from '../EventHandler';
import EVENT_NAME from '../../../../domain/constant/EVENT_NAME';

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

export default class ConfigurationEventHandler extends EventHandler {
  doHandle(event: ConfigurationEvent): any {
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

  match(event: Event): boolean {
    return event.name === EVENT_NAME.CONFIGURATION;
  }
}
