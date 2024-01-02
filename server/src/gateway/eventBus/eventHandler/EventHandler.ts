import { Event } from '../../../domain/events/Event';

type ReturnEventHandler = {
  eventName: string;
  view: any;
};

export default abstract class EventHandler {
  constructor(private next: EventHandler | null) {}

  handle(event: Event) {
    if (this.match(event)) {
      return this.doHandle(event);
    } else if (this.next != null) {
      return this.next.handle(event);
    }
  }

  abstract match(event: Event): boolean;

  abstract doHandle(event: Event): ReturnEventHandler;
}
