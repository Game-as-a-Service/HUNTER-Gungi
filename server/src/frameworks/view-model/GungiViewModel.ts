import { Event, SurrenderEvent } from '../../domain/events/event';

function surrender(events: Event[]) {
  const target = events[0] as SurrenderEvent;
  const winner = target.data.winner;
  return {
    winner: winner.id,
  };
}

const gungiViewModel = {
  surrender,
};

export default gungiViewModel;
