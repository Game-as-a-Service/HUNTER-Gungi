import COLOR from "./constant/COLOR";

class Player {
    private _name: string;

    constructor(name: string) {
        this._name = name;

    }

    private _side: COLOR;

    set side(value: COLOR) {
        this._side = value;
    }

}

export default Player;