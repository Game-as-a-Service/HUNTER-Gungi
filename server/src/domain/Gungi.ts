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
  private _currentTurn: Player;

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

  setCurrentTurn(side: SIDE) {
    this._currentTurn = this._players.find((player) => player.side === side);
  }

  toData(): GungiData {
    const senteData = this._sente.toData();
    const goteData = this._gote.toData();

    const gungiHanData = this._gungiHan.toData();
    const players = [senteData, goteData];
    const guniData: GungiData = {
      _id: this._id,
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
