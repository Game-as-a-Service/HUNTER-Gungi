import Presenter from '../../usecases/Presenter';
import { Event } from '../../domain/events/Event';
import { findEventByName } from '../../domain/events/Event';

type CreateGungiView = {
  gungiId: string;
};

export default class CreateGungiPresenter implements Presenter {
  present(events: Event[]) {
    const createGungiEvent = findEventByName(events, 'CreateGungi');

    const view: CreateGungiView = {
      gungiId: createGungiEvent.data.gungi.id,
    };

    return view;
  }
}
