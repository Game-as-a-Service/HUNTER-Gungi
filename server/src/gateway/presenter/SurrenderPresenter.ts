import Presenter from '../../usecases/Presenter';
import { Event, findByEventName } from '../../domain/events/Event';
import EVENT_NAME from '../../domain/constant/EVENT_NAME';

interface SurrenderView {
  winner: string;
}

export default class SurrenderPresenter implements Presenter<SurrenderView> {
  present(events: Event[]): SurrenderView {
    const event = findByEventName(events, EVENT_NAME.SURRENDER);
    const winner = event.data.winner;
    return {
      winner: winner.id,
    };
  }
}
