import Player from '../Player';
import TURN from '../constant/TURN';

interface Event {
  name: string;
  data: any;
}

interface SurrenderEvent extends Event {
  name: 'Surrender';
  data: {
    winner: Player;
  };
}
interface FurigomaEvent extends Event {
  name: 'Furigoma';
  data: {
    turn: TURN;
    result: number[];
  };
}

export { SurrenderEvent, FurigomaEvent, Event };
