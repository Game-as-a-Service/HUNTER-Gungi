import TURN from '../constant/TURN';
import { Event } from './Event';

export default interface FurigomaEvent extends Event {
  name: 'Furigoma';
  data: {
    turn: TURN;
    result: number[];
  };
}
