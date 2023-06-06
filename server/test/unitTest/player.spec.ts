import Player from '../../src/domain/Player';
import LEVEL from '../../src/domain/constant/LEVEL';
import Gungi from '../../src/domain/Gungi';
import GungiHan from '../../src/domain/GungiHan';
import GomaOki from '../../src/domain/GomaOki';
import SIDE from '../../src/domain/constant/SIDE';
import DeadArea from '../../src/domain/DeadArea';
import Hei from '../../src/domain/goma/Hei';
import Coordinate from '../../src/domain/Coordinate';

describe('Player surrender', () => {
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

describe('Player arata', () => {
  // 備用區沒棋不能新R
  it('備用區沒棋不能新R', () => {
    const level = LEVEL.BEGINNER;
    const player = new Player(
      'A',
      'A',
      SIDE.BLACK,
      new GomaOki(level, SIDE.BLACK, [new Hei()]),
      new DeadArea(SIDE.BLACK),
    );
    const to = new Coordinate(1, 1, 1);

    expect(() => player.arata(new Hei(), to)).toThrowError('備用區沒棋不能新R');
  });

  // 不能放裡
  // 疊太高了
  // 呼叫援軍
  // 踐踏我軍
});
