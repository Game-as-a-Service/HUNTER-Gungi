import Player from '../Player';
import Coordinate from '../Coordinate';
import Goma from '../goma/Goma';

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

export { SurrenderEvent, Event, ArataEvent, findByEventName };
