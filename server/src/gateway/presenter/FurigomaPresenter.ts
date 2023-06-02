import { Event } from 'src/domain/events/Event';
import Presenter from 'src/usecases/Presenter';

export default class FurigomaPresenter implements Presenter {
  present(events: Event[]) {
    const targetEvents = this.getTargetEvents(events);
    return targetEvents;
  }

  private getTargetEvents(events: Event[]): Event[] {
    const targetEvents: Event[] = [];

    events.forEach((event) => {
      if (event.name === 'Furigoma') {
        targetEvents.push(event);
      }
    });
    return targetEvents;
  }
}
