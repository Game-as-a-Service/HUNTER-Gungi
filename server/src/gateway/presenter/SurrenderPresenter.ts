import Presenter from '../../usecases/Presenter';
import { Event, SurrenderEvent } from '../../domain/events/Event';

interface SurrenderView {
  winner: string;
}

export default class SurrenderPresenter implements Presenter<SurrenderView> {
  present(events: Event[]): SurrenderView {
    const target = events[0] as SurrenderEvent;
    const winner = target.data.winner;
    return {
      winner: winner.id,
    };
  }
}
