import Player from '../../src/domain/Player';
import LEVEL from '../../src/domain/constant/LEVEL';
import Gungi from '../../src/domain/Gungi';
import GungiHan from '../../src/domain/GungiHan';
import GomaOki from '../../src/domain/GomaOki';
import SIDE from '../../src/domain/constant/SIDE';
import DeadArea from '../../src/domain/DeadArea';
import Hei from '../../src/domain/goma/Hei';
import Coordinate from '../../src/domain/Coordinate';
import GOMA from '../../src/domain/constant/GOMA';
import Uma from '../../src/domain/goma/Uma';
import { ARATA_ERROR_MESSAGE } from '../../src/domain/constant/ERROR_MESSAGE';
import Goma from '../../src/domain/goma/Goma';
import Sho from '../../src/domain/goma/Sho';

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
  const level = LEVEL.BEGINNER;
  describe('備用區要有棋子', () => {
    const gungiHan = new GungiHan();
    function given() {
      const player = new Player(
        'A',
        'A',
        SIDE.BLACK,
        new GomaOki(level, SIDE.BLACK, []),
        new DeadArea(SIDE.BLACK),
      );

      const to = new Coordinate(1, 1, 1);
      return { player, to };
    }

    it('備用區沒棋不能 新 兵', () => {
      const { player, to } = given();
      expect(() =>
        player.arata(new Hei(level, SIDE.BLACK, GOMA.HEI), to, gungiHan),
      ).toThrowError(ARATA_ERROR_MESSAGE.EMPTY_GOMAOKI);
    });

    it('備用區沒棋不能 新 馬', () => {
      const { player, to } = given();
      expect(() =>
        player.arata(new Uma(level, SIDE.BLACK, GOMA.UMA), to, gungiHan),
      ).toThrowError(ARATA_ERROR_MESSAGE.EMPTY_GOMAOKI);
    });
  });

  describe('不能放在棋盤外', () => {
    const gungiHan = new GungiHan();
    function given({
      toX,
      toY,
      toZ,
    }: {
      toX?: number;
      toY?: number;
      toZ?: number;
    }) {
      const heiGoma = new Hei(level, SIDE.BLACK, GOMA.HEI);
      const player = new Player(
        'A',
        'A',
        SIDE.BLACK,
        new GomaOki(level, SIDE.BLACK, [heiGoma]),
        new DeadArea(SIDE.BLACK),
      );

      const to = new Coordinate(toX, toY, toZ);
      return { player, to, heiGoma };
    }

    it('不能放到太左邊', () => {
      const { player, to } = given({ toX: 0 });

      expect(() =>
        player.arata(new Hei(level, SIDE.BLACK, GOMA.HEI), to, gungiHan),
      ).toThrowError(ARATA_ERROR_MESSAGE.OUTSIDE_HAN);
    });

    it('不能放到太右邊', () => {
      const { player, to } = given({ toX: 10 });

      expect(() =>
        player.arata(new Hei(level, SIDE.BLACK, GOMA.HEI), to, gungiHan),
      ).toThrowError(ARATA_ERROR_MESSAGE.OUTSIDE_HAN);
    });

    it('不能放到太下面', () => {
      const { player, to } = given({ toY: 0 });

      expect(() =>
        player.arata(new Hei(level, SIDE.BLACK, GOMA.HEI), to, gungiHan),
      ).toThrowError(ARATA_ERROR_MESSAGE.OUTSIDE_HAN);
    });

    it('不能放到太上面', () => {
      const { player, to } = given({ toY: 10 });
      expect(() =>
        player.arata(new Hei(level, SIDE.BLACK, GOMA.HEI), to, gungiHan),
      ).toThrowError(ARATA_ERROR_MESSAGE.OUTSIDE_HAN);
    });
  });

  describe('呼叫援軍', () => {
    function given({
      gomas,
      toX,
      toY,
      toZ,
    }: {
      gomas: Goma[];
      toX?: number;
      toY?: number;
      toZ?: number;
    }) {
      const player = new Player(
        'A',
        'A',
        SIDE.BLACK,
        new GomaOki(level, SIDE.BLACK, gomas),
        new DeadArea(SIDE.BLACK),
      );

      const to = new Coordinate(toX, toY, toZ);
      const targetGoma = gomas[0];
      return { player, to, targetGoma };
    }

    it('呼叫援軍 兵', () => {
      const gungiHan = new GungiHan([
        {
          goma: new Uma(level, SIDE.BLACK, GOMA.HEI),
          coordinate: new Coordinate(6, 7, 1),
        },
      ]);

      const gomas = [new Hei(level, SIDE.BLACK, GOMA.HEI)];
      const { player, to, targetGoma } = given({
        gomas,
        toX: 6,
        toY: 3,
        toZ: 1,
      });
      player.arata(targetGoma, to, gungiHan);
      const expectedGoma = gungiHan.findGoma(to);

      expect(expectedGoma.name).toBe(GOMA.HEI);
      expect(expectedGoma.side).toBe(SIDE.BLACK);
    });

    it('呼叫援軍 小', () => {
      const gungiHan = new GungiHan([
        {
          goma: new Uma(level, SIDE.BLACK, GOMA.HEI),
          coordinate: new Coordinate(6, 7, 1),
        },
      ]);

      const gomas = [new Sho(level, SIDE.BLACK, GOMA.SHO)];
      const { player, to, targetGoma } = given({
        gomas,
        toX: 6,
        toY: 3,
        toZ: 1,
      });

      player.arata(targetGoma, to, gungiHan);

      const expectedGoma = gungiHan.findGoma(to);

      expect(expectedGoma.name).toBe(GOMA.SHO);
      expect(expectedGoma.side).toBe(SIDE.BLACK);
    });
  });
});
