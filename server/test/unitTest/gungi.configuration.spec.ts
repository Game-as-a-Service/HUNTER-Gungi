import Player from '../../src/domain/Player';
import LEVEL from '../../src/domain/constant/LEVEL';
import Gungi from '../../src/domain/Gungi';
import GungiHan, { EMPTY_GOMA } from '../../src/domain/GungiHan';
import SIDE from '../../src/domain/constant/SIDE';
import GomaOki from '../../src/domain/GomaOki';
import DeadArea from '../../src/domain/DeadArea';
import Goma from '../../src/domain/goma/Goma';
import GomaFactory from '../../src/domain/goma/GomaFactory';
import GOMA from '../../src/domain/constant/GOMA';
import Coordinate from '../../src/domain/Coordinate';

function given() {
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

  return { gungi };
}

describe('Gungi', () => {
  describe('配置盤面', () => {
    describe('入門級別 棋子要在指定位置', () => {
      it.only('白色「帥」已配置！', () => {
        // Given
        const { gungi } = given();
        expect(gungi.gungiHan.findGoma(new Coordinate(5, 1, 1))).toEqual(
          EMPTY_GOMA,
        );

        // When
        gungi.setConfiguration();

        // Then
        const coordinate = new Coordinate(5, 1, 1);
        const goma: Goma = GomaFactory.create(
          LEVEL.BEGINNER,
          SIDE.WHITE,
          GOMA.OSHO,
        );

        expect(gungi.gungiHan.findGoma(coordinate)).toEqual(goma);
        expect(gungi.gungiHan.findGoma(new Coordinate(1, 1, 1))).toEqual(
          EMPTY_GOMA,
        );
      });

      it.skip('「兵」已配置！', () => {
        const { gungi } = given();
        const coordinate = new Coordinate(1, 3, 1);
        // const coordinate = new Coordinate(5, 3, 1);
        // const coordinate = new Coordinate(9, 3, 1);
        const goma: Goma = GomaFactory.create(
          LEVEL.BEGINNER,
          SIDE.WHITE,
          GOMA.HEI,
        );

        gungi.setConfiguration();

        expect(gungi.gungiHan.findGoma(coordinate)).toEqual(goma);
      });

      // 「小」已配置！
      // 「馬」已配置！
      // 「忍」已配置！
      // 「槍」已配置！
      // 「中」已配置！
      // 「大」已配置！
      // 「侍」已配置！
      // 「砦」已配置！（ㄓㄞˋ）
    });
  });
});
