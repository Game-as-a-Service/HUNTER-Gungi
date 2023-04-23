import COLOR from "./constant/COLOR";
import Gungi from "./Gungi";

class Player {
    constructor(name: string) {
        this._name = name;

    }

    private _gungi: Gungi;

    set gungi(gungi: Gungi) {
        this._gungi = gungi;
    }

    private _name: string;

    get name(): string {
        return this._name;
    }

    private _side: COLOR;

    set side(value: COLOR) {
        this._side = value;
    }

    surrender() {
        const player = this;
        this._gungi.loser = player;
    }
}

export default Player;