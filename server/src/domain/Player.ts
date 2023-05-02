import SIDE from './constant/SIDE';
import Gungi from './Gungi';

class Player {
  constructor(name: string) {
    this._name = name;
  }

  private _gungi: Gungi;

  set gungi(gungi: Gungi) {
    this._gungi = gungi;
  }

  private _name: string;

  get name(): string {
    return this._name;
  }

  private _side: SIDE;

  set side(value: SIDE) {
    this._side = value;
  }

  surrender() {
    const player = this;
    this._gungi.loser = player;
  }
}

export default Player;
