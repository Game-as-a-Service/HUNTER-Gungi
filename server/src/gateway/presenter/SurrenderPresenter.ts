import Presenter from '../../usecases/Presenter';
import { Event, findEventByName } from '../../domain/events/Event';

type SurrenderView = {
  winner: string;
};

export default class SurrenderPresenter implements Presenter<SurrenderView> {
  present(events: Event[]) {
    const target = findEventByName(events, 'Surrender');
    const winner = target.data.winner;
    return {
      winner: winner.id,
    };
  }
}
