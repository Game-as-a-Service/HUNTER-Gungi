import Presenter from '../../usecases/Presenter';
import { Event, findByEventName } from '../../domain/events/Event';
import EVENT_NAME from '../../domain/constant/EVENT_NAME';

interface ArataView {
  goma: {
    name: string;
    side: string;
  };
  to: {
    x: number;
    y: number;
    z: number;
  };
}

export default class ArataPresenter implements Presenter<ArataView> {
  present(events: Event[]): ArataView {
    const event = findByEventName(events, EVENT_NAME.ARATA);
    const { goma, to } = event.data;

    return {
      goma: {
        name: goma.name,
        side: goma.side,
      },
      to: {
        x: to.x,
        y: to.y,
        z: to.z,
      },
    };
  }
}
