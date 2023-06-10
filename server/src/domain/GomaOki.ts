import SIDE from './constant/SIDE';
import Player from './Player';
import Goma from './goma/Goma';
import { GomaOkiData } from '../frameworks/data-services/GungiData';
import LEVEL from './constant/LEVEL';

class GomaOki {
  constructor(
    private _level: LEVEL,
    _side: SIDE,
    private _gomas: Goma[] = [],
  ) {}

  get gomas(): Goma[] {
    return this._gomas;
  }

  set gomas(value: Goma[]) {
    this._gomas = value;
  }

  private _player: Player;

  set player(value: Player) {
    this._player = value;
  }

  isEmpty() {
    return this._gomas.length === 0;
  }
}

export default GomaOki;
