import Goma from './goma/Goma';
import { DeadAreaData } from '../frameworks/data-services/gungi-data';

class DeadArea {
  constructor(private gomas: Goma[]) {}

  toData(): DeadAreaData {
    return {
      gomas: this.gomas.map((goma) => goma.toData()),
    };
  }
}

export default DeadArea;
