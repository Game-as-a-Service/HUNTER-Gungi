import LEVEL from './constant/LEVEL';
import Player from './Player';
import GungiHan from './GungiHan';
import GomaOki from './GomaOki';
import SIDE from './constant/SIDE';
import GOMA from './constant/GOMA';
import Coordinate from './Coordinate';
import { Event, SurrenderEvent, FurigomaEvent } from './events/Event';
import DeadArea from './DeadArea';
import Goma from './goma/Goma';
import GomaFactory from './goma/GomaFactory';
import { ConfigurationEvent } from './events/ConfigurationEvent';
import {
  WHITE_HAN_CONFIG,
  OKI_CONFIG,
  BLACK_HAN_CONFIG,
} from './constant/constants';
import { GameState } from './constant/GameState';
import TURN from './constant/TURN';
import FURIGOMA from './constant/FURIGOMA';

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
  }

  get id(): string {
    return this._id;
  }

  get level(): LEVEL {
    return this._level;
  }

  get players(): Player[] {
    return this._players;
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

  private _sente: Player = null;

  get sente(): Player {
    return this._sente;
  }

  set sente(value: Player) {
    this._sente = value;
  }

  private _gote: Player = null;

  get gote(): Player {
    return this._gote;
  }

  set gote(value: Player) {
    this._gote = value;
  }

  getState(): GameState {
    if (this.sente === null && this.gote === null) {
      return GameState.GAME_INIT;
    }

    if (this.gungiHan.getAllGoma().length === 0) {
      return GameState.FURIGOMA_DONE;
    }

    if (this.winner === null) {
      return GameState.GAME_START;
    }

    return GameState.GAME_END;
  }

  setCurrentTurn(side: SIDE) {
    this._currentTurn = this._players.find((player) => player.side === side);
  }

  setConfiguration(): Event[] {
    this.addGomaToHan(SIDE.WHITE, WHITE_HAN_CONFIG);
    this.addGomaToOki(SIDE.WHITE, OKI_CONFIG);
    this.addGomaToHan(SIDE.BLACK, BLACK_HAN_CONFIG);
    this.addGomaToOki(SIDE.BLACK, OKI_CONFIG);

    const event: ConfigurationEvent = {
      name: 'Configuration',
      data: {
        gungiHan: this.gungiHan,
        senteGomaOki: this.sente.gomaOki,
        goteGomaOki: this.gote.gomaOki,
      },
    };

    return [event];
  }

  private genTossResult(): FURIGOMA[] {
    return Array.from({ length: 5 }, () => Math.random()).map((num) => {
      // 50 percent tails, 50 percent heads
      const percentage = 0.5;
      if (num < percentage) {
        return FURIGOMA.TAILS;
      }
      return FURIGOMA.HEADS;
    });
  }

  private determineTurn(tossResult: FURIGOMA[]): TURN {
    const sum = tossResult.reduce((acc, num) => (acc += num), 0);
    // 3 or more heads, sente
    if (sum >= 3) {
      // first
      return TURN.SENTE;
    } else {
      return TURN.GOTE;
    }
  }

  async furigoma(player: Player, opponent: Player): Promise<Event[]> {
    try {
      // toss gomas to determine turn
      const tossResult: FURIGOMA[] = this.genTossResult();
      const turn: TURN = this.determineTurn(tossResult);
      player.side = turn === TURN.SENTE ? SIDE.BLACK : SIDE.WHITE;
      opponent.side = turn === TURN.SENTE ? SIDE.WHITE : SIDE.BLACK;
      this.setCurrentTurn(SIDE.BLACK);
      this.setSenteGote();
      const event: FurigomaEvent = {
        name: 'Furigoma',
        data: {
          turn,
          result: tossResult,
        },
      };
      return [event];
    } catch (err) {
      console.log(`furiGoma error: ${err.message}`);
      throw err;
    }
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

  private addGomaToHan(
    side: SIDE,
    gomaConfig: { name: GOMA; x: number; y: number; z: number }[],
  ): void {
    gomaConfig.forEach(({ name, x, y, z }) => {
      const coordinate = new Coordinate(x, y, z);
      const goma: Goma = GomaFactory.create(LEVEL.BEGINNER, side, name);

      this.gungiHan.addGoma(goma, coordinate);
    });
  }

  private addGomaToOki(side: SIDE, gomaConfig: { name: GOMA }[]): void {
    gomaConfig.forEach(({ name }) => {
      const goma: Goma = GomaFactory.create(LEVEL.BEGINNER, side, name);
      const gomaOki =
        this.sente.side === side ? this.sente.gomaOki : this.gote.gomaOki;
      gomaOki.gomas.push(goma);
    });
  }

  setSenteGote() {
    const sente = this.players.find((player) => player.side === SIDE.BLACK);
    const gote = this.players.find((player) => player.side === SIDE.WHITE);

    if (!sente || !gote) {
      return new Error('Insufficient players');
    }

    this._sente = sente;
    this._senteDeadArea = sente.deadArea;
    this._senteGomaOki = sente.gomaOki;

    this._gote = gote;
    this._goteDeadArea = gote.deadArea;
    this._goteGomaOki = gote.gomaOki;
  }
}

export default Gungi;
