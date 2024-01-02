import FurigomaEvent from '../../../../domain/events/FurigomaEvent';
import { Event } from '../../../../domain/events/Event';
import EventHandler from '../EventHandler';
import EVENT_NAME from '../../../../domain/constant/EVENT_NAME';

export default class FurigomaEventHandler extends EventHandler {
  doHandle(event: FurigomaEvent): any {
    return {
      name: event.name,
      data: {
        turn: event.data.turn,
        result: event.data.result,
      },
    };
  }

  match(event: Event): boolean {
    return event.name === EVENT_NAME.FURIGOMA;
  }
}
