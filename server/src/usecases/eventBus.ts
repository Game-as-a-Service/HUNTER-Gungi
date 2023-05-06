import { Event } from '../domain/events/event';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class EventBus {
  private eventMap: Map<string, Function[]> = new Map();

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
  broadcast(events: Event[]) {
    events.forEach((event) => {});
  }
}
