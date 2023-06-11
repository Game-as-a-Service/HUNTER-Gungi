import { Event } from './Event';
import GungiHan from '../GungiHan';

export interface ConfigurationEvent extends Event {
  name: 'Configuration';
  data: {
    gungiHan: GungiHan;
  };
}
