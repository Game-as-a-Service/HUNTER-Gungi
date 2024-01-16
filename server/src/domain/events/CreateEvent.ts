import { Event } from './Event';
import EVENT_NAME from '../constant/EVENT_NAME';

export default interface CreateEvent extends Event {
  name: EVENT_NAME.CREATE_GUNGI;
  data: {
    gungiId: string;
  };
}
