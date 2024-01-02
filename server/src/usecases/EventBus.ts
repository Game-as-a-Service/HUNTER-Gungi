import { Event } from '../domain/events/Event';

export default abstract class EventBus {
  abstract broadcast(roomId: string, events: Event[]): void;
}
