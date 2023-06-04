import Player from '../Player';
import Gungi from '../Gungi';

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

interface CreateGungiEvent extends Event {
  name: 'CreateGungi';
  data: {
    gungi: Gungi;
  };
}

function findEventByName(events: Event[], eventName: string): Event {
  return events.find((event) => event.name === eventName);
}

export { SurrenderEvent, CreateGungiEvent, Event, findEventByName };
