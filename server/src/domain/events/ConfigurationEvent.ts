import { Event } from './Event';
import GungiHan from '../GungiHan';
import GomaOki from '../GomaOki';

export interface ConfigurationEvent extends Event {
  name: 'Configuration';
  data: {
    gungiHan: GungiHan;
    blackOki: GomaOki;
    whiteOki: GomaOki;
  };
}
