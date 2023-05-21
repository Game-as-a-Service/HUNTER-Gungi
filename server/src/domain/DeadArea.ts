import Goma from './goma/Goma';
import { DeadAreaData } from '../frameworks/data-services/GungiData';
import SIDE from './constant/SIDE';

class DeadArea {
  constructor(private _side: SIDE, private _gomas: Goma[] = []) {}

  toData(): DeadAreaData {
    return {
      gomas: this._gomas.map((goma) => goma.toData()),
    };
  }
}

export default DeadArea;
