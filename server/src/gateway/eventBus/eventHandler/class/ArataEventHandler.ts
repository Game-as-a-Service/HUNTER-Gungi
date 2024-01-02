import EventHandler from '../EventHandler';
import ArataEvent from '../../../../domain/events/ArataEvent';
import { Event } from '../../../../domain/events/Event';
import EVENT_NAME from '../../../../domain/constant/EVENT_NAME';

export default class ArataEventHandler extends EventHandler {
  doHandle(event: ArataEvent): any {
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

  match(event: Event): boolean {
    return event.name === EVENT_NAME.ARATA;
  }
}
