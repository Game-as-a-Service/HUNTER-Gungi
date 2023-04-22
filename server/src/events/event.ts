import Player from "../domain/Player";

interface Event {
    name: string;
    data: any;
}

interface SurrenderEvent extends Event {
    name: 'surrender';
    data: {
        winner: Player;
        loser: Player;
        surrenderedPlayer: Player;
    };
}

export {SurrenderEvent,Event};