import Presenter from '../../usecases/Presenter';
import { Event } from '../../domain/events/Event';

interface ArataView {
}

export default class ArataPresenter implements Presenter<ArataView> {
  present(events: Event[]): ArataView {}
}
