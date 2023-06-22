import SIDE from './constant/SIDE';
import Gungi from './Gungi';
import GomaOki from './GomaOki';
import DeadArea from './DeadArea';
import Goma from './goma/Goma';
import Coordinate from './Coordinate';
import { ERROR_MESSAGE } from './constant/ERROR_MESSAGE';
import GungiHan from './GungiHan';
import { BOUNDARY } from './constant/GUNGI_HAN';
import GOMA from './constant/GOMA';

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
    if (this.isOutOfBoundary(to)) {
      throw new Error(ERROR_MESSAGE.OUTSIDE_HAN);
    }

    if (this.gomaOki.isEmpty()) {
      throw new Error(ERROR_MESSAGE.EMPTY_GOMAOKI);
    }

    if (to.z > 0) {
      if (!han.hasGomaAtBelow(to)) {
        throw new Error(ERROR_MESSAGE.BELOW_NOT_EXIST_GOMA);
      }

      if (han.hasOSHOAtBelow(to)) {
        throw new Error(ERROR_MESSAGE.CANNOT_SET_ON_OSHO);
      }
    }

    if (this.isDestinationTooFar(han, to)) {
      throw new Error(ERROR_MESSAGE.TOO_FAR);
    }

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

  private isOutOfBoundary(to: Coordinate) {
    return (
      to.x < BOUNDARY.LEFT ||
      to.x > BOUNDARY.RIGHT ||
      to.y < BOUNDARY.BOTTOM ||
      to.y > BOUNDARY.TOP
    );
  }
}

export default Player;
