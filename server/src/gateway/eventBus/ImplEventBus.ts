import { Event } from '../../domain/events/Event';
import EventHandler from './eventHandler/EventHandler';
import EventBus from '../../usecases/EventBus';
import { Server } from 'socket.io';

export class ImplEventBus extends EventBus {
  private eventHandler: EventHandler;
  private server: Server;

  constructor(server: Server, eventHandler: EventHandler) {
    super();
    this.eventHandler = eventHandler;
    this.server = server;
  }

  broadcast(roomId: string, events: Event[]) {
    events.forEach((event: Event) => {
      const eventName = event.name;
      const view = this.eventHandler.handle(event);
      if (view) {
        this.server.to(roomId).emit(eventName, view);
      }
    });
  }
}
