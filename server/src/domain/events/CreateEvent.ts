import { Event } from './Event';

export default interface CreateEvent extends Event {
  name: 'CreateEvent';
  data: {
    gungiId: string;
  };
}
