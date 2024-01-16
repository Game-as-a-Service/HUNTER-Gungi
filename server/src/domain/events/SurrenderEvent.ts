import Player from '../Player';
import { Event } from './Event';
import EVENT_NAME from '../constant/EVENT_NAME';

export default interface SurrenderEvent extends Event {
  name: EVENT_NAME.SURRENDER;
  data: {
    winner: Player;
  };
}
