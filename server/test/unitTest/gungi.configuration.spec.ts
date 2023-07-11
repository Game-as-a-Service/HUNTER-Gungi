import Player from '../../src/domain/Player';
import LEVEL from '../../src/domain/constant/LEVEL';
import Gungi from '../../src/domain/Gungi';
import GungiHan from '../../src/domain/GungiHan';
import SIDE from '../../src/domain/constant/SIDE';
import GomaOki from '../../src/domain/GomaOki';
import DeadArea from '../../src/domain/DeadArea';
import Goma from '../../src/domain/goma/Goma';
import GomaFactory from '../../src/domain/goma/GomaFactory';
import GOMA, { EMPTY_GOMA } from '../../src/domain/constant/GOMA';
import Coordinate from '../../src/domain/Coordinate';
import {
  BLACK_HAN_CONFIG,
  OKI_CONFIG,
  WHITE_HAN_CONFIG,
} from '../../src/domain/constant/GUNGI_HAN';

describe('Gungi', () => {
  function given_gungi_and_furigoma_done() {
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
      new GungiHan(level, []),
    );

    gungi.sente = playerA;
    gungi.gote = playerB;
    gungi.setCurrentTurn(SIDE.WHITE);

    return { gungi };
  }

  /** 預期盤棋上的棋子 */
  function expectGomaInHan(side: SIDE, name: GOMA, gungi: Gungi) {
    getHanConfig(side)
      .filter((config) => config.name === name)
      .forEach((data) => {
        const coordinate = new Coordinate(data.x, data.y, data.z);
        const goma: Goma = GomaFactory.create(LEVEL.BEGINNER, side, data.name);

        expect(gungi.gungiHan.findGoma(coordinate)).toEqual(goma);
      });
  }

  /** 預期備用區棋子的數量 */
  function expectGomaCountInOki(name: GOMA, gungi: Gungi, side: SIDE) {
    const expectCount = OKI_CONFIG.filter(
      (config) => config.name === name,
    ).length;

    const gomaOki =
      gungi.sente.side === side ? gungi.sente.gomaOki : gungi.gote.gomaOki;

    const count = gomaOki.gomas.filter(
      (goma) => goma.side === side && goma.name === name,
    ).length;

    expect(count).toBe(expectCount);
  }

  function getHanConfig(side: SIDE) {
    return side === SIDE.BLACK ? BLACK_HAN_CONFIG : WHITE_HAN_CONFIG;
  }

  describe('配置盤面', () => {
    describe('基本測試', () => {
      it('棋子放到一個位置後，其它的位置還是空的', () => {
        // Define
        // 目標位置
        const targetCoordinate = new Coordinate(2, 1, 1);
        // 其它位置
        const otherCoordinate = new Coordinate(1, 1, 1);

        // Given
        const { gungi } = given_gungi_and_furigoma_done();

        // 目標位置本來是空的
        expect(gungi.gungiHan.findGoma(targetCoordinate)).toEqual(EMPTY_GOMA);

        // When
        const goma: Goma = GomaFactory.create(
          LEVEL.BEGINNER,
          SIDE.WHITE,
          GOMA.OSHO,
        );

        // 在目標位置加上棋子
        gungi.gungiHan.addGoma(goma, targetCoordinate);

        // Then
        // 目標位置有這個棋子
        expect(gungi.gungiHan.findGoma(targetCoordinate)).toEqual(goma);

        // 其它位置沒有棋子
        expect(gungi.gungiHan.findGoma(otherCoordinate)).toEqual(EMPTY_GOMA);
      });
    });

    describe('入門級別 棋子要在指定位置', () => {
      it('白色「帥」已配置！', () => {
        // Given
        const { gungi } = given_gungi_and_furigoma_done();

        const side = SIDE.WHITE;
        const name = GOMA.OSHO;

        // When
        gungi.setConfiguration();

        // Then
        expectGomaInHan(side, name, gungi);
        expectGomaCountInOki(name, gungi, side);
      });

      it('白色「兵」已配置！', () => {
        // Given
        const { gungi } = given_gungi_and_furigoma_done();

        const side = SIDE.WHITE;
        const name = GOMA.HEI;

        // When
        gungi.setConfiguration();

        // Then
        expectGomaInHan(side, name, gungi);
        expectGomaCountInOki(name, gungi, side);
      });

      it('白色「小」已配置！', () => {
        // Given
        const { gungi } = given_gungi_and_furigoma_done();

        const side = SIDE.WHITE;
        const name = GOMA.SHO;

        // When
        gungi.setConfiguration();

        // Then
        expectGomaInHan(side, name, gungi);
        expectGomaCountInOki(name, gungi, side);
      });

      it('白色「馬」已配置！', () => {
        // Given
        const { gungi } = given_gungi_and_furigoma_done();

        const side = SIDE.WHITE;
        const name = GOMA.UMA;

        // When
        gungi.setConfiguration();

        // Then
        expectGomaInHan(side, name, gungi);
        expectGomaCountInOki(name, gungi, side);
      });

      it('白色「忍」已配置！', () => {
        // Given
        const { gungi } = given_gungi_and_furigoma_done();

        const side = SIDE.WHITE;
        const name = GOMA.SHINOBI;

        // When
        gungi.setConfiguration();

        // Then
        expectGomaInHan(side, name, gungi);
        expectGomaCountInOki(name, gungi, side);
      });

      it('白色「槍」已配置！', () => {
        // Given
        const { gungi } = given_gungi_and_furigoma_done();

        const side = SIDE.WHITE;
        const name = GOMA.YARI;

        // When
        gungi.setConfiguration();

        // Then
        expectGomaInHan(side, name, gungi);
        expectGomaCountInOki(name, gungi, side);
      });

      it('白色「中」已配置！', () => {
        // Given
        const { gungi } = given_gungi_and_furigoma_done();

        const side = SIDE.WHITE;
        const name = GOMA.CHU;

        // When
        gungi.setConfiguration();

        // Then
        expectGomaInHan(side, name, gungi);
        expectGomaCountInOki(name, gungi, side);
      });

      it('白色「大」已配置！', () => {
        // Given
        const { gungi } = given_gungi_and_furigoma_done();

        const side = SIDE.WHITE;
        const name = GOMA.DAI;

        // When
        gungi.setConfiguration();

        // Then
        expectGomaInHan(side, name, gungi);
        expectGomaCountInOki(name, gungi, side);
      });

      it('白色「侍」已配置！', () => {
        // Given
        const { gungi } = given_gungi_and_furigoma_done();

        const side = SIDE.WHITE;
        const name = GOMA.SHI;

        // When
        gungi.setConfiguration();

        // Then
        expectGomaInHan(side, name, gungi);
        expectGomaCountInOki(name, gungi, side);
      });

      it('白色「砦」已配置！（ㄓㄞˋ）', () => {
        // Given
        const { gungi } = given_gungi_and_furigoma_done();

        const side = SIDE.WHITE;
        const name = GOMA.TORIDE;

        // When
        gungi.setConfiguration();

        // Then
        expectGomaInHan(side, name, gungi);
        expectGomaCountInOki(name, gungi, side);
      });

      it('黑色「帥」已配置！', () => {
        // Given
        const { gungi } = given_gungi_and_furigoma_done();

        const side = SIDE.BLACK;
        const name = GOMA.OSHO;

        // When
        gungi.setConfiguration();

        // Then
        expectGomaInHan(side, name, gungi);
        expectGomaCountInOki(name, gungi, side);
      });

      it('黑色「兵」已配置！', () => {
        // Given
        const { gungi } = given_gungi_and_furigoma_done();

        const side = SIDE.BLACK;
        const name = GOMA.HEI;

        // When
        gungi.setConfiguration();

        // Then
        expectGomaInHan(side, name, gungi);
        expectGomaCountInOki(name, gungi, side);
      });

      it('黑色「小」已配置！', () => {
        // Given
        const { gungi } = given_gungi_and_furigoma_done();

        const side = SIDE.BLACK;
        const name = GOMA.SHO;

        // When
        gungi.setConfiguration();

        // Then
        expectGomaInHan(side, name, gungi);
        expectGomaCountInOki(name, gungi, side);
      });

      it('黑色「馬」已配置！', () => {
        // Given
        const { gungi } = given_gungi_and_furigoma_done();

        const side = SIDE.BLACK;
        const name = GOMA.UMA;

        // When
        gungi.setConfiguration();

        // Then
        expectGomaInHan(side, name, gungi);
        expectGomaCountInOki(name, gungi, side);
      });

      it('黑色「忍」已配置！', () => {
        // Given
        const { gungi } = given_gungi_and_furigoma_done();

        const side = SIDE.BLACK;
        const name = GOMA.SHINOBI;

        // When
        gungi.setConfiguration();

        // Then
        expectGomaInHan(side, name, gungi);
        expectGomaCountInOki(name, gungi, side);
      });

      it('黑色「槍」已配置！', () => {
        // Given
        const { gungi } = given_gungi_and_furigoma_done();

        const side = SIDE.BLACK;
        const name = GOMA.YARI;

        // When
        gungi.setConfiguration();

        // Then
        expectGomaInHan(side, name, gungi);
        expectGomaCountInOki(name, gungi, side);
      });

      it('黑色「中」已配置！', () => {
        // Given
        const { gungi } = given_gungi_and_furigoma_done();

        const side = SIDE.BLACK;
        const name = GOMA.CHU;

        // When
        gungi.setConfiguration();

        // Then
        expectGomaInHan(side, name, gungi);
        expectGomaCountInOki(name, gungi, side);
      });

      it('黑色「大」已配置！', () => {
        // Given
        const { gungi } = given_gungi_and_furigoma_done();

        const side = SIDE.BLACK;
        const name = GOMA.DAI;

        // When
        gungi.setConfiguration();

        // Then
        expectGomaInHan(side, name, gungi);
        expectGomaCountInOki(name, gungi, side);
      });

      it('黑色「侍」已配置！', () => {
        // Given
        const { gungi } = given_gungi_and_furigoma_done();

        const side = SIDE.BLACK;
        const name = GOMA.SHI;

        // When
        gungi.setConfiguration();

        // Then
        expectGomaInHan(side, name, gungi);
        expectGomaCountInOki(name, gungi, side);
      });

      it('黑色「砦」已配置！（ㄓㄞˋ）', () => {
        // Given
        const { gungi } = given_gungi_and_furigoma_done();

        const side = SIDE.BLACK;
        const name = GOMA.TORIDE;

        // When
        gungi.setConfiguration();

        // Then
        expectGomaInHan(side, name, gungi);
        expectGomaCountInOki(name, gungi, side);
      });
    });
  });
});
