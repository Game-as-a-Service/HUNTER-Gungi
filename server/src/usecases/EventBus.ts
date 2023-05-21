import { Event } from '../domain/events/Event';

export default abstract class EventBus {
  protected eventMap: Map<string, Event[]> = new Map();
  // public on(eventName: string, callback: Function) {
  //   //   const callbacks = this.eventMap.get(eventName) || [];
  //   //   callbacks.push(callback);
  //   //   this.eventMap.set(eventName, callbacks);
  //   // }
  //   //
  //   // public emit(eventName: string, data: any) {
  //   //   const callbacks = this.eventMap.get(eventName);
  //   //   if (callbacks) {
  //   //     callbacks.forEach((callback) => callback(data));
  //   //   }
  //   // }
  abstract broadcast(events: Event[]);
}
