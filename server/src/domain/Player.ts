import SIDE from './constant/SIDE';
import Gungi from './Gungi';
import GomaOki from './GomaOki';
import DeadArea from './DeadArea';

class Player {
  constructor(
    private _id: string,
    private _name: string,
    private _side: SIDE,
    private _gomaOki: GomaOki,
    private _deadArea: DeadArea,
  ) {}

  get id(): string {
    return this._id;
  }

  get gomaOki(): GomaOki {
    return this._gomaOki;
  }

  get deadArea(): DeadArea {
    return this._deadArea;
  }

  private _gungi: Gungi;

  set gungi(gungi: Gungi) {
    this._gungi = gungi;
  }

  get name(): string {
    return this._name;
  }

  get side(): SIDE {
    return this._side;
  }

  set side(value: SIDE) {
    this._side = value;
  }

  surrender() {
    this._gungi.winner = this._gungi.getOpponent(this);
  }
}

export default Player;
