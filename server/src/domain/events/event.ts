import Player from '../Player';

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

export { SurrenderEvent, Event };
