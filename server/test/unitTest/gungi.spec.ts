import Player from "../../src/domain/Player";
import LEVEL from "../../src/domain/constant/LEVEL";
import Gungi from "../../src/domain/Gungi";
import GungiHan from "../../src/domain/GungiHan";

describe('Gungi', () => {
    it('使用者該回合使用者可以投降', () => {
        const playerA = new Player('A',);
        const playerB = new Player('B',);
        const gungi = new Gungi(LEVEL.BEGINNER, [playerA, playerB], new GungiHan(),);
        gungi.sente = playerA;
        gungi.gote = playerB;
        gungi.currentTurn = playerA;
        gungi.surrender(playerA);
        expect(gungi.loser).toBe(playerA);
    });
    it('使用者不是該回合使用者不可以投降', () => {
        const playerA = new Player('A',);
        const playerB = new Player('B',);
        const gungi = new Gungi(LEVEL.BEGINNER, [playerA, playerB], new GungiHan(),);
        gungi.sente = playerA;
        gungi.gote = playerB;
        gungi.currentTurn = playerB;
        expect(()=>gungi.surrender(playerA)).toThrow('不是該回合的使用者');
    });
});