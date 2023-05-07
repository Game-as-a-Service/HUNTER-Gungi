import Presenter from '../../usecases/Presenter';
import { Event } from '../../domain/events/event';
import gungiViewModel from '../view-model/GungiViewModel';

export default class SurrenderPresenter implements Presenter {
  present(events: Event[]) {
    const targetEvents = this.getTargetEvents(events);
    return gungiViewModel.surrender(targetEvents);
  }

  private getTargetEvents(events: Event[]): Event[] {
    const targetEvents: Event[] = [];

    events.forEach((event) => {
      if (event.name === 'Surrender') {
        targetEvents.push(event);
      }
    });

    return targetEvents;
  }
}
