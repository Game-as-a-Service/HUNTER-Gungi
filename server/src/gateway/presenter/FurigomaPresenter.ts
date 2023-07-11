import TURN from 'src/domain/constant/TURN';
import { Event } from 'src/domain/events/Event';
import Presenter from 'src/usecases/Presenter';

export interface FurigomaView {
  name: string;
  data: {
    turn: TURN;
    result: number[];
  };
}
export default class FurigomaPresenter implements Presenter<FurigomaView> {
  present(events: Event[]): FurigomaView {
    const event = events[0];
    const view: FurigomaView = {
      name: event.name,
      data: {
        turn: event.data.turn,
        result: event.data.result,
      },
    };
    return view;
  }
}
