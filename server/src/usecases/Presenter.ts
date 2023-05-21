import { Event } from '../domain/events/Event';

export default interface Presenter {
  present(events: Event[]): any;
}
