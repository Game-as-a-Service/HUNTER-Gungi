import Gungi from '../Gungi';
import { Event } from './Event';

export default interface GetGungiEvent extends Event {
  name: 'GetGungi';
  data: {
    gungi: Gungi;
  };
}
