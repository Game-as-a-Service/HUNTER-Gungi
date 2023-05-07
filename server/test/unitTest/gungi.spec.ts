import Player from '../../src/domain/Player';
import LEVEL from '../../src/domain/constant/LEVEL';
import Gungi from '../../src/domain/Gungi';
import GungiHan from '../../src/domain/GungiHan';
import SIDE from '../../src/domain/constant/SIDE';
import GomaOki from '../../src/domain/GomaOki';
import DeadArea from '../../src/domain/DeadArea';

describe('Gungi', () => {
  it('使用者該回合使用者可以投降', () => {
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

    gungi.surrender(playerA);
    expect(gungi.winner).toBe(playerB);
  });
  it('使用者不是該回合使用者不可以投降', () => {
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
    gungi.setCurrentTurn(SIDE.BLACK);

    expect(() => gungi.surrender(playerA)).toThrow('不是該回合的使用者');
  });
});
