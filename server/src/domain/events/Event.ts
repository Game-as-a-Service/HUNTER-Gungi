import Player from '../Player';
import Coordinate from '../Coordinate';
import Goma from '../goma/Goma';
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

interface ArataEvent extends Event {
  name: 'Arata';
  data: {
    goma: Goma;
    to: Coordinate;
  };
}

const findByEventName = (events: Event[], name: string) => {
  return events.find((event) => event.name === name);
};

export { SurrenderEvent, FurigomaEvent, ArataEvent, findByEventName, Event };
