import SIDE from './constant/SIDE';
import Gungi from './Gungi';
import { PlayerData } from '../frameworks/data-services/gungi-data';
import GomaOki from './GomaOki';
import DeadArea from './DeadArea';

class Player {
  constructor(
    private _id: string,
    private _name: string,
    private _gomaOki: GomaOki,
    private _deadArea: DeadArea,
  ) {}

  private _gungi: Gungi;

  set gungi(gungi: Gungi) {
    this._gungi = gungi;
  }

  get name(): string {
    return this._name;
  }

  private _side: SIDE;

  set side(value: SIDE) {
    this._side = value;
  }

  toData(): PlayerData {
    return {
      id: this._id,
      side: this._side,
      name: this.name,
      deadArea: this._deadArea.toData(),
      gomaOki: this._gomaOki.toData(),
    };
  }

  surrender() {
    const player = this;
    this._gungi.loser = player;
  }
}

export default Player;
