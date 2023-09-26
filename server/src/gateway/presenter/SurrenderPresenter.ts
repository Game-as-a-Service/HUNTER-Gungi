import Presenter from '../../usecases/Presenter';
import { Event, findByEventName } from '../../domain/events/Event';

interface SurrenderView {
  winner: string;
}

export default class SurrenderPresenter implements Presenter<SurrenderView> {
  present(events: Event[]): SurrenderView {
    const event = findByEventName(events, 'Surrender');
    const winner = event.data.winner;
    return {
      winner: winner.id,
    };
  }
}
