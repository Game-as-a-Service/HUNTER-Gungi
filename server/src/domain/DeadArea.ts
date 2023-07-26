import Goma from './goma/Goma';
import SIDE from './constant/SIDE';

class DeadArea {
  constructor(private _side: SIDE, private _gomas: Goma[] = []) {}

  get gomas(): Goma[] {
    return this._gomas;
  }
}

export default DeadArea;
