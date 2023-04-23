import LEVEL from "./constant/LEVEL";
import Player from "./Player";
import GungiHan from "./GungiHan";
import GomaOki from "./GomaOki";
import COLOR from "./constant/COLOR";
import GOMA from "./constant/GOMA";
import Coord from "./Coord";
import {Event, SurrenderEvent,} from "../events/event";

class Gungi {
    private _senteGomaOki = new GomaOki(COLOR.BLACK,);
    private _goteGomaOki = new GomaOki(COLOR.WHITE,);

    constructor(private _level: LEVEL, private _players: Player[], private _gungiHan: GungiHan,) {
        _players.forEach(player => player.gungi = this);
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

    setConfiguration() {
    }

    furiGoma() {
    }

    ugokiGoma(color: COLOR, gomaName: GOMA, from: Coord, to: Coord) {
    }

    surrender(player: Player): Event[] {
        if (this._currentTurn !== player) {
            throw new Error('不是該回合的使用者');
        }

        player.surrender();

        const event: SurrenderEvent = {
            name: "surrender",
            data: {
                loser: undefined, surrenderedPlayer: undefined, winner: undefined
            },
        };
        return [event];
    }

    getPlayer(playerName: string): Player {
        return this._players.find(player => player.name === playerName);

    }
}

export default Gungi;