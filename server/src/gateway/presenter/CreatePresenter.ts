import Presenter from '../../usecases/Presenter';
import { Event, findByEventName } from '../../domain/events/Event';
import EVENT_NAME from '../../domain/constant/EVENT_NAME';

interface CreateGungiView {
  url: string;
}

export default class CreatePresenter implements Presenter<CreateGungiView> {
  present(events: Event[]): CreateGungiView {
    const event = findByEventName(events, EVENT_NAME.CREATE_GUNGI);
    const data = event.data;
    const gungiId = data.gungiId;
    return {
      url: `/gungi/${gungiId}`,
    };
  }
}
