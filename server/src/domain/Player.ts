import SIDE from './constant/SIDE';
import Gungi from './Gungi';
import { PlayerData } from '../frameworks/data-services/GungiData';
import GomaOki from './GomaOki';
import DeadArea from './DeadArea';
import Goma from './goma/Goma';
import Coordinate from './Coordinate';
import { ARATA_ERROR_MESSAGE } from './constant/ERROR_MESSAGE';
import GungiHan from './GungiHan';

class Player {
  constructor(
    private _id: string,
    private _name: string,
    private _side: SIDE,
    private _gomaOki: GomaOki,
    private _deadArea: DeadArea,
  ) {}

  private _gungi: Gungi;

  set gungi(gungi: Gungi) {
    this._gungi = gungi;
  }

  get id(): string {
    return this._id;
  }

  get gomaOki(): GomaOki {
    return this._gomaOki;
  }

  get deadArea(): DeadArea {
    return this._deadArea;
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

  arata(goma: Goma, to: Coordinate, han: GungiHan) {
    const limit = {
      left: 1,
      right: 9,
      bottom: 1,
      top: 9,
    };

    if (
      to.x < limit.left ||
      to.x > limit.right ||
      to.y < limit.bottom ||
      to.y > limit.top
    ) {
      throw new Error(ARATA_ERROR_MESSAGE.OUTSIDE_HAN);
    }

    if (this.gomaOki.isEmpty()) {
      throw new Error(ARATA_ERROR_MESSAGE.EMPTY_GOMAOKI);
    }

    han.addGoma(goma, to);
  }
}

export default Player;
