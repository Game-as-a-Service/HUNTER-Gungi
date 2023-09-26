import Goma from '../goma/Goma';
import Coordinate from '../Coordinate';
import { Event } from './Event';

export default interface ArataEvent extends Event {
  name: 'Arata';
  data: {
    goma: Goma;
    to: Coordinate;
  };
}
