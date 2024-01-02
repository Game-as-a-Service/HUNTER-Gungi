import EventHandler from '../EventHandler';
import SurrenderEvent from '../../../../domain/events/SurrenderEvent';
import { Event } from '../../../../domain/events/Event';
import EVENT_NAME from '../../../../domain/constant/EVENT_NAME';

export default class SurrenderEventHandler extends EventHandler {
  doHandle(event: SurrenderEvent): any {
    const winner = event.data.winner;
    return {
      winner: winner.id,
    };
  }

  match(event: Event): boolean {
    return event.name === EVENT_NAME.SURRENDER;
  }
}
