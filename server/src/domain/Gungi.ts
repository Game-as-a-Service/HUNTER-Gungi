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
import { ConfigurationEvent } from './events/ConfigurationEvent';

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

  /** 軍儀棋盤 */
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
    const addGomaToHan = (
      side: SIDE,
      gomaConfig: { name: GOMA; x: number; y: number; z: number }[],
    ): void => {
      gomaConfig.forEach(({ name, x, y, z }) => {
        const coordinate = new Coordinate(x, y, z);
        const goma: Goma = GomaFactory.create(LEVEL.BEGINNER, side, name);

        this.gungiHan.addGoma(goma, coordinate);
      });
    };

    const addGomaToOki = (side: SIDE, gomaConfig: { name: GOMA }[]): void => {
      gomaConfig.forEach(({ name }) => {
        const goma: Goma = GomaFactory.create(LEVEL.BEGINNER, side, name);
        const gomaOki =
          this.sente.side === side ? this.sente.gomaOki : this.gote.gomaOki;
        gomaOki.gomas.push(goma);
      });
    };

    const WHITE_HAN_CONFIG = [
      { name: GOMA.OSHO, x: 4, y: 0, z: 0 },
      { name: GOMA.HEI, x: 0, y: 2, z: 0 },
      { name: GOMA.HEI, x: 4, y: 2, z: 0 },
      { name: GOMA.HEI, x: 8, y: 2, z: 0 },
      { name: GOMA.SHINOBI, x: 1, y: 1, z: 0 },
      { name: GOMA.SHINOBI, x: 7, y: 1, z: 0 },
      { name: GOMA.YARI, x: 4, y: 1, z: 0 },
      { name: GOMA.CHU, x: 5, y: 0, z: 0 },
      { name: GOMA.DAI, x: 3, y: 0, z: 0 },
      { name: GOMA.SHI, x: 3, y: 2, z: 0 },
      { name: GOMA.SHI, x: 5, y: 2, z: 0 },
      { name: GOMA.TORIDE, x: 2, y: 2, z: 0 },
      { name: GOMA.TORIDE, x: 6, y: 2, z: 0 },
    ];

    const BLACK_HAN_CONFIG = [
      { name: GOMA.OSHO, x: 4, y: 8, z: 0 },
      { name: GOMA.HEI, x: 0, y: 6, z: 0 },
      { name: GOMA.HEI, x: 4, y: 6, z: 0 },
      { name: GOMA.HEI, x: 8, y: 6, z: 0 },
      { name: GOMA.SHINOBI, x: 1, y: 7, z: 0 },
      { name: GOMA.SHINOBI, x: 7, y: 7, z: 0 },
      { name: GOMA.YARI, x: 4, y: 7, z: 0 },
      { name: GOMA.CHU, x: 3, y: 8, z: 0 },
      { name: GOMA.DAI, x: 5, y: 8, z: 0 },
      { name: GOMA.SHI, x: 3, y: 6, z: 0 },
      { name: GOMA.SHI, x: 5, y: 6, z: 0 },
      { name: GOMA.TORIDE, x: 2, y: 6, z: 0 },
      { name: GOMA.TORIDE, x: 6, y: 6, z: 0 },
    ];

    const OKI_CONFIG = [
      { name: GOMA.HEI },
      { name: GOMA.SHO },
      { name: GOMA.SHO },
      { name: GOMA.UMA },
      { name: GOMA.UMA },
      { name: GOMA.YARI },
      { name: GOMA.YARI },
    ];

    addGomaToHan(SIDE.WHITE, WHITE_HAN_CONFIG);
    addGomaToOki(SIDE.WHITE, OKI_CONFIG);
    addGomaToHan(SIDE.BLACK, BLACK_HAN_CONFIG);
    addGomaToOki(SIDE.BLACK, OKI_CONFIG);

    const event: ConfigurationEvent = {
      name: 'Configuration',
      data: {
        gungiHan: this.gungiHan,
        blackOki: this.sente.gomaOki,
        whiteOki: this.gote.gomaOki,
      },
    };

    return [event];
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
