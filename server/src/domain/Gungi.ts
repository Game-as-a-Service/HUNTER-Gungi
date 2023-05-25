import LEVEL from './constant/LEVEL';
import Player from './Player';
import GungiHan from './GungiHan';
import GomaOki from './GomaOki';
import SIDE from './constant/SIDE';
import GOMA from './constant/GOMA';
import Coordinate from './Coordinate';
import { Event, SurrenderEvent } from './events/Event';
import DeadArea from './DeadArea';
import { GungiData } from '../frameworks/data-services/GungiData';
import Goma from './goma/Goma';
import GomaFactory from './goma/GomaFactory';

class Gungi {
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

  get id(): string {
    return this._id;
  }

  get level(): LEVEL {
    return this._level;
  }

  get gungiHan(): GungiHan {
    return this._gungiHan;
  }

  set gungiHan(value: GungiHan) {
    this._gungiHan = value;
  }

  private _currentTurn: Player;

  get currentTurn(): Player {
    return this._currentTurn;
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

  private _loser: Player;

  get loser(): Player {
    return this._loser;
  }

  set loser(value: Player) {
    this._loser = value;
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

  set sente(value: Player) {
    this._sente = value;
  }

  private _gote: Player;

  get gote(): Player {
    return this._gote;
  }

  set gote(value: Player) {
    this._gote = value;
  }

  setCurrentTurn(side: SIDE) {
    this._currentTurn = this._players.find((player) => player.side === side);
  }

  setConfiguration(): Event[] {
    throw new Error('Method not implemented.');

    // TODO: 棋盤
    const gomas: { goma: Goma, to: Coordinate }[] = [];

    const goma: Goma = GomaFactory.create(
      LEVEL.BEGINNER,
      SIDE.BLACK,
      GOMA.OSHO,
      new Coordinate(-1, -1, -1),
    );
    const to = new Coordinate(5, 1, 1);
    gomas.push({ goma, to });

    gomas.forEach(({ goma, to }) => {
      this.gungiHan.updateHan(goma, to);
      goma.coordinate = to;
    });

    // TODO: 備用區
    // this._senteGomaOki.gomas.push(xxx);
    // this._goteGomaOki.gomas.push(xxx);
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
    if (this._currentTurn !== player) {
      throw new Error('不是該回合的使用者');
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

  getPlayer(playerId: string): Player {
    return this._players.find((player) => player.id === playerId);
  }

  getOpponent(player: Player): Player {
    return this._players.find((p) => p !== player);
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
          throw new Error('沒有這個玩家');
        }
      }
    });
  }
}

export default Gungi;
