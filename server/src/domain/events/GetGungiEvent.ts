import Gungi from '../Gungi';
import { Event } from './Event';
import EVENT_NAME from '../constant/EVENT_NAME';

export default interface GetGungiEvent extends Event {
  name: EVENT_NAME.GET_GUNGI;
  data: {
    gungi: Gungi;
  };
}
