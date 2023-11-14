import Presenter from '../../usecases/Presenter';
import { Event, findByEventName } from '../../domain/events/Event';

interface CreateGungiView {
  url: string;
}

export default class CreatePresenter implements Presenter<CreateGungiView> {
  present(events: Event[]): CreateGungiView {
    const event = findByEventName(events, 'CreateEvent');
    const data = event.data;
    const gungiId = data.gungiId;
    return {
      url: `/gungi/${gungiId}`,
    };
  }
}
