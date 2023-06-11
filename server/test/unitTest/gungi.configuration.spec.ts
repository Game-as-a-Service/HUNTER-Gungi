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

/** 預期盤棋上的棋子 */
function expectGomaInHan(
  gungi: Gungi,
  side: SIDE,
  name: GOMA,
  x: number,
  y: number,
  z: number,
) {
  const coordinate = new Coordinate(x, y, z);
  const goma: Goma = GomaFactory.create(LEVEL.BEGINNER, side, name);

  expect(gungi.gungiHan.findGoma(coordinate)).toEqual(goma);
}

/** 預期備用區棋子的數量 */
function expectGomaCountInOki(
  gungi: Gungi,
  side: SIDE,
  name: GOMA,
  count: number,
) {
  const gomaOki =
    gungi.sente.side === side ? gungi.sente.gomaOki : gungi.gote.gomaOki;

  expect(
    gomaOki.gomas.filter((goma) => goma.side === side && goma.name === name)
      .length,
  ).toBe(count);
}

describe('Gungi', () => {
  describe('配置盤面', () => {
    describe('基本測試', () => {
      it('棋子放到一個位置後，其它的位置還是空的', () => {
        // Define
        // 目標位置
        const targetCoordinate = new Coordinate(2, 1, 1);
        // 其它位置
        const otherCoordinate = new Coordinate(1, 1, 1);

        // Given
        const { gungi } = given();

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
      type DataSet = {
        jestName: string;
        setData: {
          han: {
            side: SIDE;
            name: GOMA;
            x: number;
            y: number;
            z: number;
          }[];
          oki: {
            side: SIDE;
            name: GOMA;
            count: number;
          };
        };
      };

      const dataSet: DataSet[] = [];

      const createSet = (jestName: string, side: SIDE, name: GOMA): DataSet => {
        return {
          jestName: jestName,
          setData: {
            han: [],
            oki: {
              side,
              name,
              count: -1,
            },
          },
        };
      };

      const addGomaToHan = (
        side: SIDE,
        name: GOMA,
        x: number,
        y: number,
        z: number,
      ) => {
        set.setData.han.push({ side, name, x, y, z });
      };

      let jestName = '白色「帥」已配置！';
      let side = SIDE.WHITE;
      let name = GOMA.OSHO;
      let set: DataSet = createSet(jestName, side, name);
      addGomaToHan(side, name, 5, 1, 1);
      set.setData.oki.count = 0;
      dataSet.push(set);

      jestName = '白色「兵」已配置！';
      name = GOMA.HEI;
      set = createSet(jestName, side, name);
      addGomaToHan(side, name, 1, 3, 1);
      addGomaToHan(side, name, 5, 3, 1);
      addGomaToHan(side, name, 9, 3, 1);
      set.setData.oki.count = 1;
      dataSet.push(set);

      jestName = '白色「小」已配置！';
      name = GOMA.SHO;
      set = createSet(jestName, side, name);
      set.setData.oki.count = 2;
      dataSet.push(set);

      jestName = '白色「馬」已配置！';
      name = GOMA.UMA;
      set = createSet(jestName, side, name);
      set.setData.oki.count = 2;
      dataSet.push(set);

      jestName = '白色「忍」已配置！';
      name = GOMA.SHINOBI;
      set = createSet(jestName, side, name);
      addGomaToHan(side, name, 2, 2, 1);
      addGomaToHan(side, name, 8, 2, 1);
      set.setData.oki.count = 0;
      dataSet.push(set);

      jestName = '白色「槍」已配置！';
      name = GOMA.YARI;
      set = createSet(jestName, side, name);
      addGomaToHan(side, name, 5, 2, 1);
      set.setData.oki.count = 2;
      dataSet.push(set);

      jestName = '白色「中」已配置！';
      name = GOMA.CHU;
      set = createSet(jestName, side, name);
      addGomaToHan(side, name, 6, 1, 1);
      set.setData.oki.count = 0;
      dataSet.push(set);

      jestName = '白色「大」已配置！';
      name = GOMA.DAI;
      set = createSet(jestName, side, name);
      addGomaToHan(side, name, 4, 1, 1);
      set.setData.oki.count = 0;
      dataSet.push(set);

      jestName = '白色「侍」已配置！';
      name = GOMA.SHI;
      set = createSet(jestName, side, name);
      addGomaToHan(side, name, 4, 3, 1);
      addGomaToHan(side, name, 6, 3, 1);
      set.setData.oki.count = 0;
      dataSet.push(set);

      jestName = '白色「砦」已配置！（ㄓㄞˋ）';
      name = GOMA.TORIDE;
      set = createSet(jestName, side, name);
      addGomaToHan(side, name, 3, 3, 1);
      addGomaToHan(side, name, 7, 3, 1);
      set.setData.oki.count = 0;
      dataSet.push(set);

      jestName = '黑色「帥」已配置！';
      side = SIDE.BLACK;
      name = GOMA.OSHO;
      set = createSet(jestName, side, name);
      addGomaToHan(side, name, 5, 9, 1);
      set.setData.oki.count = 0;
      dataSet.push(set);

      jestName = '黑色「兵」已配置！';
      name = GOMA.HEI;
      set = createSet(jestName, side, name);
      addGomaToHan(side, name, 1, 7, 1);
      addGomaToHan(side, name, 5, 7, 1);
      addGomaToHan(side, name, 9, 7, 1);
      set.setData.oki.count = 1;
      dataSet.push(set);

      jestName = '黑色「小」已配置！';
      name = GOMA.SHO;
      set = createSet(jestName, side, name);
      set.setData.oki.count = 2;
      dataSet.push(set);

      jestName = '黑色「馬」已配置！';
      name = GOMA.UMA;
      set = createSet(jestName, side, name);
      set.setData.oki.count = 2;
      dataSet.push(set);

      jestName = '黑色「忍」已配置！';
      name = GOMA.SHINOBI;
      set = createSet(jestName, side, name);
      addGomaToHan(side, name, 2, 8, 1);
      addGomaToHan(side, name, 8, 8, 1);
      set.setData.oki.count = 0;
      dataSet.push(set);

      jestName = '黑色「槍」已配置！';
      name = GOMA.YARI;
      set = createSet(jestName, side, name);
      addGomaToHan(side, name, 5, 8, 1);
      set.setData.oki.count = 2;
      dataSet.push(set);

      jestName = '黑色「中」已配置！';
      name = GOMA.CHU;
      set = createSet(jestName, side, name);
      addGomaToHan(side, name, 4, 9, 1);
      set.setData.oki.count = 0;
      dataSet.push(set);

      jestName = '黑色「大」已配置！';
      name = GOMA.DAI;
      set = createSet(jestName, side, name);
      addGomaToHan(side, name, 6, 9, 1);
      set.setData.oki.count = 0;
      dataSet.push(set);

      jestName = '黑色「侍」已配置！';
      name = GOMA.SHI;
      set = createSet(jestName, side, name);
      addGomaToHan(side, name, 4, 7, 1);
      addGomaToHan(side, name, 6, 7, 1);
      set.setData.oki.count = 0;
      dataSet.push(set);

      jestName = '黑色「砦」已配置！（ㄓㄞˋ）';
      name = GOMA.TORIDE;
      set = createSet(jestName, side, name);
      addGomaToHan(side, name, 3, 7, 1);
      addGomaToHan(side, name, 7, 7, 1);
      set.setData.oki.count = 0;
      dataSet.push(set);

      it.each(dataSet)('$jestName', ({ setData }) => {
        // Given
        const { gungi } = given();

        // When
        gungi.setConfiguration();

        // Then
        // 棋盤上有 1 個
        setData.han.forEach((data) => {
          expectGomaInHan(gungi, data.side, data.name, data.x, data.y, data.z);
        });

        // 備用區有 0 個
        expectGomaCountInOki(
          gungi,
          setData.oki.side,
          setData.oki.name,
          setData.oki.count,
        );
      });

      it.skip('白色「帥」已配置！', () => {
        // Define
        const side = SIDE.WHITE;
        const name = GOMA.OSHO;

        // 預期備用區數量
        const count = 0;

        // Given
        const { gungi } = given();

        // When
        gungi.setConfiguration();

        // Then
        // 棋盤上有 1 個
        expectGomaInHan(gungi, side, name, 5, 1, 1);

        // 備用區有 0 個
        expectGomaCountInOki(gungi, side, name, count);
      });

      it.skip('白色「兵」已配置！', () => {
        // Define
        const side = SIDE.WHITE;
        const name = GOMA.HEI;

        // 預期備用區數量
        const count = 1;

        // Given
        const { gungi } = given();

        // When
        gungi.setConfiguration();

        // Then
        // 棋盤上有 3 個
        expectGomaInHan(gungi, side, name, 1, 3, 1);
        expectGomaInHan(gungi, side, name, 5, 3, 1);
        expectGomaInHan(gungi, side, name, 9, 3, 1);

        // 備用區有 1 個
        expectGomaCountInOki(gungi, side, name, count);
      });
    });
  });
});
