import { Event } from '../domain/events/Event';

export default interface Presenter<R> {
  present(events: Event[]): R;
}
