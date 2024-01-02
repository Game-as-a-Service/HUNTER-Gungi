import { Event } from './Event';
import GungiHan from '../GungiHan';
import GomaOki from '../GomaOki';
import EVENT_NAME from "../constant/EVENT_NAME";

export interface ConfigurationEvent extends Event {
  name: EVENT_NAME.CONFIGURATION;
  data: {
    gungiHan: GungiHan;
    senteGomaOki: GomaOki;
    goteGomaOki: GomaOki;
  };
}
