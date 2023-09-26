import SIDE from './constant/SIDE';
import Gungi from './Gungi';
import GomaOki from './GomaOki';
import DeadArea from './DeadArea';
import Coordinate from './Coordinate';
import { ERROR_MESSAGE } from './constant/ERROR_MESSAGE';
import GungiHan from './GungiHan';
import GOMA from './constant/GOMA';
import { validateGungiHanBoundaries } from './util/util';

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

  arata(goma: GOMA, to: Coordinate, han: GungiHan) {
    validateGungiHanBoundaries(to, this._gungi.level);

    if (this.gomaOki.isEmpty()) {
      throw new Error(ERROR_MESSAGE.EMPTY_GOMAOKI);
    }

    if (to.z > 0) {
      if (!han.hasGomaBelow(to)) {
        throw new Error(ERROR_MESSAGE.BELOW_NOT_EXIST_GOMA);
      }

      if (han.hasOSHOBelow(to)) {
        throw new Error(ERROR_MESSAGE.CANNOT_SET_ON_OSHO);
      }
    }

    if (this.isDestinationTooFar(han, to)) {
      throw new Error(ERROR_MESSAGE.TOO_FAR);
    }

    // TODO: check to position has goma or not
    const targetGoma = this.gomaOki.draw(goma);

    han.addGoma(targetGoma, to);

    return {
      targetGoma,
      targetCoordinate: to,
    };
  }

  private isDestinationTooFar(han: GungiHan, to: Coordinate) {
    const farthestGomaYCoordinate = han.getFarthestYCoordinate(this.side);
    return (
      (this.side === SIDE.WHITE && farthestGomaYCoordinate < to.y) ||
      (this.side === SIDE.BLACK && farthestGomaYCoordinate > to.y)
    );
  }
}

export default Player;
