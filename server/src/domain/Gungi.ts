import LEVEL from './constant/LEVEL';
import Player from './Player';
import GungiHan from './GungiHan';
import GomaOki from './GomaOki';
import SIDE from './constant/SIDE';
import GOMA from './constant/GOMA';
import Coordinate from './Coordinate';
import { Event, SurrenderEvent } from './events/event';
import DeadArea from './DeadArea';
import { GungiData } from '../frameworks/data-services/gungi-data';

class Gungi {
  private _senteGomaOki: GomaOki;
  private _goteGomaOki: GomaOki;
  private _senteDeadArea: DeadArea;
  private _goteDeadArea: DeadArea;
  private _id: string;

  constructor(
    private _level: LEVEL,
    private _players: Player[],
    private _gungiHan: GungiHan,
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

  toData(): GungiData {
    const senteData = this._sente.toData();
    const goteData = this._gote.toData();

    const gungiHanData = this._gungiHan.toData();
    const players = [senteData, goteData];
    const guniData: GungiData = {
      id: this._id,
      level: this._level,
      players: players,
      gungiHan: gungiHanData,
      currentTurn: this._currentTurn.side,
      winner: this._winner?.side,
      history: [],
    };
    return guniData;
  }

  setConfiguration() {}

  furiGoma() {}

  ugokiGoma(color: SIDE, gomaName: GOMA, from: Coordinate, to: Coordinate) {}

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
