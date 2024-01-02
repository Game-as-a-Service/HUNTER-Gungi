import TURN from '../constant/TURN';
import { Event } from './Event';
import EVENT_NAME from '../constant/EVENT_NAME';

export default interface FurigomaEvent extends Event {
  name: EVENT_NAME.FURIGOMA;
  data: {
    turn: TURN;
    result: number[];
  };
}
