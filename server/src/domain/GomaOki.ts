import COLOR from "./constant/COLOR";
import Player from "./Player";

class GomaOki {
    private _player:Player;
    constructor(private _color: COLOR,) {
    }

    set player(value: Player) {
        this._player = value;
    }
}

export default GomaOki;