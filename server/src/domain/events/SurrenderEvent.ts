import Player from '../Player';
import { Event } from './Event';

export default interface SurrenderEvent extends Event {
  name: 'Surrender';
  data: {
    winner: Player;
  };
}
