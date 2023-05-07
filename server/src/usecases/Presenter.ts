import { Event } from '../domain/events/event';

export default interface Presenter {
  present(events: Event[]): any;
}
