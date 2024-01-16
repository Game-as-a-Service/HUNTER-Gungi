import Goma from '../goma/Goma';
import Coordinate from '../Coordinate';
import { Event } from './Event';
import EVENT_NAME from '../constant/EVENT_NAME';

export default interface ArataEvent extends Event {
  name: EVENT_NAME.ARATA;
  data: {
    goma: Goma;
    to: Coordinate;
  };
}
