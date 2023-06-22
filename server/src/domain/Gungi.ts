import LEVEL from './constant/LEVEL';
import Player from './Player';
import GungiHan from './GungiHan';
import GomaOki from './GomaOki';
import SIDE from './constant/SIDE';
import GOMA from './constant/GOMA';
import Coordinate from './Coordinate';
import { ArataEvent, Event, SurrenderEvent } from './events/Event';
import DeadArea from './DeadArea';
import { ERROR_MESSAGE } from './constant/ERROR_MESSAGE';

export default class Gungi {
  constructor(
    private _id: string,
    private _level: LEVEL,
    private _players: Player[],
    private _gungiHan: GungiHan,
  ) {
    this._players.forEach((player) => {
      player.gungi = this;
    });
    this.setSenteGote(_players);
  }

  private _currentTurn: Player;

  get currentTurn(): SIDE {
    return this._currentTurn.side;
  }

  private _senteGomaOki: GomaOki;

  get senteGomaOki(): GomaOki {
    return this._senteGomaOki;
  }

  private _goteGomaOki: GomaOki;

  get goteGomaOki(): GomaOki {
    return this._goteGomaOki;
  }

  private _senteDeadArea: DeadArea;

  get senteDeadArea(): DeadArea {
    return this._senteDeadArea;
  }

  private _goteDeadArea: DeadArea;

  get goteDeadArea(): DeadArea {
    return this._goteDeadArea;
  }

  private _winner: Player;

  get winner(): Player {
    return this._winner;
  }

  set winner(value: Player) {
    this._winner = value;
  }

  private _sente: Player;

  get sente(): Player {
    return this._sente;
  }

  set sente(player: Player) {
    this._sente = player;
    this._senteDeadArea = player.deadArea;
    this._senteGomaOki = player.gomaOki;
  }

  private _gote: Player;

  get gote(): Player {
    return this._gote;
  }

  set gote(player: Player) {
    this._gote = player;
    this._goteDeadArea = player.deadArea;
    this._goteGomaOki = player.gomaOki;
  }

  get id(): string {
    return this._id;
  }

  get level(): LEVEL {
    return this._level;
  }

  get gungiHan(): GungiHan {
    return this._gungiHan;
  }

  setCurrentTurn(side: SIDE) {
    this._currentTurn = this._players.find((player) => player.side === side);
  }

  setConfiguration() {
    // TODO
    throw new Error('Method not implemented.');
  }

  furiGoma() {
    // TODO
    throw new Error('Method not implemented.');
  }

  ugokiGoma(color: SIDE, gomaName: GOMA, from: Coordinate, to: Coordinate) {
    // TODO
    throw new Error('Method not implemented.');
  }

  surrender(player: Player): Event[] {
    if (!this.isYourTurn(player)) {
      throw new Error(ERROR_MESSAGE.NOT_YOUR_TURN);
    }

    player.surrender();

    const event: SurrenderEvent = {
      name: 'Surrender',
      data: {
        winner: this.getOpponent(player),
      },
    };
    return [event];
  }

  arata(player: Player, goma: { name: GOMA; side: SIDE }, to: Coordinate) {
    if (!this.isYourTurn(player)) {
      throw new Error(ERROR_MESSAGE.NOT_YOUR_TURN);
    }

    if (player.side !== goma.side) {
      throw new Error(ERROR_MESSAGE.NOT_YOUR_GOMA);
    }

    const { targetGoma, targetCoordinate } = player.arata(
      goma.name,
      to,
      this._gungiHan,
    );

    this._currentTurn = this.getOpponent(player);

    const event: ArataEvent = {
      name: 'Arata',
      data: {
        goma: targetGoma,
        to: targetCoordinate,
      },
    };
    return [event];
  }

  getPlayer(playerId: string): Player {
    return this._players.find((player) => player.id === playerId);
  }

  getOpponent(player: Player): Player {
    return this._players.find((p) => p !== player);
  }

  private isYourTurn(player: Player) {
    return this._currentTurn.side == player.side;
  }

  private setSenteGote(players: Player[]) {
    players.forEach((player) => {
      switch (player.side) {
        case SIDE.BLACK: {
          this._sente = player;
          this._senteDeadArea = player.deadArea;
          this._senteGomaOki = player.gomaOki;
          break;
        }
        case SIDE.WHITE: {
          this._gote = player;
          this._goteDeadArea = player.deadArea;
          this._goteGomaOki = player.gomaOki;
          break;
        }
        default: {
          throw new Error(ERROR_MESSAGE.INVALID_SIDE);
        }
      }
    });
  }
}
