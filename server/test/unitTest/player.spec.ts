import Player from '../../src/domain/Player';
import LEVEL from '../../src/domain/constant/LEVEL';
import Gungi from '../../src/domain/Gungi';
import GungiHan from '../../src/domain/GungiHan';

describe('Player', () => {
  it('使用者投降', () => {
    const playerA = new Player('A');
    const playerB = new Player('B');
    const gungi = new Gungi(LEVEL.BEGINNER, [playerA, playerB], new GungiHan());
    gungi.sente = playerA;
    gungi.gote = playerB;
    gungi.currentTurn = playerB;
    playerA.surrender();
    expect(gungi.loser).toBe(playerA);
  });
});
