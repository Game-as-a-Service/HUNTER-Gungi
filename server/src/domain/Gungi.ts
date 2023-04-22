import LEVEL from "./constant/LEVEL";
import Player from "./Player";
import GungiHan from "./GungiHan";
import GomaOki from "./GomaOki";
import COLOR from "./constant/COLOR";
import GOMA from "./constant/GOMA";
import Coord from "./Coord";

class Gungi {
    private _senteGomaOki = new GomaOki(COLOR.BLACK,);
    private _goteGomaOki = new GomaOki(COLOR.WHITE,);

    constructor(private _level: LEVEL, private _players: Player[], private _gungiHan: GungiHan,) {

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

    surrender(player: Player) {
    }
}

export default Gungi;