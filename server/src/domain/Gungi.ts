import LEVEL from './constant/LEVEL';
import Player from './Player';
import GungiHan from './GungiHan';
import GomaOki from './GomaOki';
import SIDE from './constant/SIDE';
import GOMA from './constant/GOMA';
import Coord from './Coord';
import { Event, SurrenderEvent } from './events/event';
import DeadArea from './DeadArea';

class Gungi {
  private _senteGomaOki: GomaOki;
  private _goteGomaOki: GomaOki;
  private _senteDeadArea: DeadArea;
  private _goteDeadArea: DeadArea;

  constructor(
    private _level: LEVEL,
    private _players: Player[],
    private _gungiHan: GungiHan,
    private _senteGomaOki: GomaOki,
    private _goteGomaOki: GomaOki,
    private _senteDeadArea: DeadArea,
    private _goteDeadArea: DeadArea,
  ) {}

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

  private _currentTurn: Player;

  set currentTurn(value: Player) {
    this._currentTurn = value;
  }

  private _sente: Player;

  set sente(value: Player) {
    this._sente = value;
  }

  private _gote: Player;

  set gote(value: Player) {
    this._gote = value;
  }

  set gungiHan(value: GungiHan) {
    this._gungiHan = value;
  }

  setConfiguration() {}

  furiGoma() {}

  ugokiGoma(color: SIDE, gomaName: GOMA, from: Coord, to: Coord) {}

  surrender(player: Player): Event[] {
    // TODO:　比對物件是否為同一個物件
    if (this._currentTurn !== player) {
      throw new Error('不是該回合的使用者');
    }

    player.surrender();

    const event: SurrenderEvent = {
      name: 'surrender',
      data: {
        loser: undefined,
        surrenderedPlayer: undefined,
        winner: undefined,
      },
    };
    return [event];
  }

  getPlayer(playerName: string): Player {
    return this._players.find((player) => player.name === playerName);
  }
}

export default Gungi;
