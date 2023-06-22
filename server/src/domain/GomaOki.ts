import SIDE from './constant/SIDE';
import Player from './Player';
import Goma from './goma/Goma';
import LEVEL from './constant/LEVEL';
import GOMA from './constant/GOMA';
import { ERROR_MESSAGE } from './constant/ERROR_MESSAGE';
import Coordinate from './Coordinate';

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

  draw(name: GOMA) {
    const targetIndex = this._gomas.findIndex((goma) => goma.name === name);

    if (targetIndex === -1) {
      throw new Error(ERROR_MESSAGE.NOT_EXIST_GOMA);
    }

    return this._gomas.splice(targetIndex, 1)[0];
  }
}

export default GomaOki;
