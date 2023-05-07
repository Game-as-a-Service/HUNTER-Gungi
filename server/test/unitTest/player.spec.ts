import Player from '../../src/domain/Player';
import LEVEL from '../../src/domain/constant/LEVEL';
import Gungi from '../../src/domain/Gungi';
import GungiHan from '../../src/domain/GungiHan';
import GomaOki from '../../src/domain/GomaOki';
import SIDE from '../../src/domain/constant/SIDE';
import DeadArea from '../../src/domain/DeadArea';

describe('Player', () => {
  it('使用者投降', () => {
    const level = LEVEL.BEGINNER;
    const playerA = new Player(
      'A',
      'A',
      SIDE.WHITE,
      new GomaOki(level, SIDE.WHITE),
      new DeadArea(SIDE.WHITE),
    );
    const playerB = new Player(
      'B',
      'B',
      SIDE.BLACK,
      new GomaOki(level, SIDE.BLACK),
      new DeadArea(SIDE.BLACK),
    );

    const gungi = new Gungi(
      'test',
      LEVEL.BEGINNER,
      [playerA, playerB],
      new GungiHan(),
    );

    gungi.sente = playerA;
    gungi.gote = playerB;
    gungi.setCurrentTurn(SIDE.WHITE);

    playerA.surrender();
    expect(gungi.winner).toBe(playerB);
  });
});
