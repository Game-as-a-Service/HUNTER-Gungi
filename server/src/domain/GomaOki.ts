import COLOR from './constant/COLOR';
import Player from './Player';

class GomaOki {
  constructor(private _color: COLOR, private _gomas?: Goma[]) {}

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
}

export default GomaOki;
