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
      name: GOMA,
      x: number,
      y: number,
      z: number,
    ): void => {
      const coordinate = new Coordinate(x, y, z);
      const goma: Goma = GomaFactory.create(LEVEL.BEGINNER, side, name);

      this.gungiHan.addGoma(goma, coordinate);
    };

    const addGomaToOki = (side: SIDE, name: GOMA): void => {
      const goma: Goma = GomaFactory.create(LEVEL.BEGINNER, side, name);
      const gomaOki =
        this.sente.side === side ? this.sente.gomaOki : this.gote.gomaOki;
      gomaOki.gomas.push(goma);
    };

    let side = SIDE.WHITE;
    addGomaToHan(side, GOMA.OSHO, 5, 1, 1);
    addGomaToHan(side, GOMA.HEI, 1, 3, 1);
    addGomaToHan(side, GOMA.HEI, 5, 3, 1);
    addGomaToHan(side, GOMA.HEI, 9, 3, 1);
    addGomaToOki(side, GOMA.HEI);
    addGomaToOki(side, GOMA.SHO);
    addGomaToOki(side, GOMA.SHO);
    addGomaToOki(side, GOMA.UMA);
    addGomaToOki(side, GOMA.UMA);
    addGomaToHan(side, GOMA.SHINOBI, 2, 2, 1);
    addGomaToHan(side, GOMA.SHINOBI, 8, 2, 1);
    addGomaToHan(side, GOMA.YARI, 5, 2, 1);
    addGomaToOki(side, GOMA.YARI);
    addGomaToOki(side, GOMA.YARI);
    addGomaToHan(side, GOMA.CHU, 6, 1, 1);
    addGomaToHan(side, GOMA.DAI, 4, 1, 1);
    addGomaToHan(side, GOMA.SHI, 4, 3, 1);
    addGomaToHan(side, GOMA.SHI, 6, 3, 1);
    addGomaToHan(side, GOMA.TORIDE, 3, 3, 1);
    addGomaToHan(side, GOMA.TORIDE, 7, 3, 1);

    side = SIDE.BLACK;
    addGomaToHan(side, GOMA.OSHO, 5, 9, 1);
    addGomaToHan(side, GOMA.HEI, 1, 7, 1);
    addGomaToHan(side, GOMA.HEI, 5, 7, 1);
    addGomaToHan(side, GOMA.HEI, 9, 7, 1);
    addGomaToOki(side, GOMA.HEI);
    addGomaToOki(side, GOMA.SHO);
    addGomaToOki(side, GOMA.SHO);
    addGomaToOki(side, GOMA.UMA);
    addGomaToOki(side, GOMA.UMA);
    addGomaToHan(side, GOMA.SHINOBI, 2, 8, 1);
    addGomaToHan(side, GOMA.SHINOBI, 8, 8, 1);
    addGomaToHan(side, GOMA.YARI, 5, 8, 1);
    addGomaToOki(side, GOMA.YARI);
    addGomaToOki(side, GOMA.YARI);
    addGomaToHan(side, GOMA.CHU, 4, 9, 1);
    addGomaToHan(side, GOMA.DAI, 6, 9, 1);
    addGomaToHan(side, GOMA.SHI, 4, 7, 1);
    addGomaToHan(side, GOMA.SHI, 6, 7, 1);
    addGomaToHan(side, GOMA.TORIDE, 3, 7, 1);
    addGomaToHan(side, GOMA.TORIDE, 7, 7, 1);

    const event: ConfigurationEvent = {
      name: 'Configuration',
      data: {
        gungiHan: this.gungiHan,
        blackOki: this.sente.gomaOki,
        whiteOki: this.gote.gomaOki,
      },
    };

    return [event];

    // throw new Error('Method not implemented.');

    // TODO: 棋盤
    // const gomas: { goma: Goma; to: Coordinate }[] = [];

    // const goma: Goma = GomaFactory.create(
    //   LEVEL.BEGINNER,
    //   SIDE.BLACK,
    //   GOMA.OSHO,
    //   new Coordinate(-1, -1, -1),
    // );
    // const to = new Coordinate(5, 1, 1);
    // gomas.push({ goma, to });

    // gomas.forEach(({ goma, to }) => {
    //   this.gungiHan.updateHan(goma, to);
    //   goma.coordinate = to;
    // });

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
