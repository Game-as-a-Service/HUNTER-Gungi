import given_levelBeginner_Gungi from './helper/givenBeginnerGungi';
import GOMA from '../../../../src/domain/constant/GOMA';
import SIDE from '../../../../src/domain/constant/SIDE';
import { ERROR_MESSAGE } from '../../../../src/domain/constant/ERROR_MESSAGE';
import Coordinate from '../../../../src/domain/Coordinate';
import when_arata_at_han from './helper/whenArataTo';

describe('叫錯援軍', () => {
  it('我叫到黑色的兵囉', () => {
    const { whitePlayer, gungi, targetGoma } = given_levelBeginner_Gungi({
      blackGomaOki: [GOMA.HEI],
      whiteGomaOki: [],
      hanGomas: [],
      targetGoma: {
        name: GOMA.HEI,
        side: SIDE.BLACK,
      },
    });

    expect(() =>
      when_arata_at_han(
        gungi,
        whitePlayer,
        targetGoma,
        new Coordinate(0, 0, 0),
      ),
    ).toThrowError(ERROR_MESSAGE.NOT_YOUR_GOMA);
  });
});
describe('呼叫援軍', () => {
  it('呼叫援軍 兵', () => {
    const { gungi, whitePlayer, whiteGomaOki, targetGoma, gungiHan } =
      given_levelBeginner_Gungi({
        blackGomaOki: [],
        whiteGomaOki: [GOMA.HEI],
        hanGomas: [
          {
            name: GOMA.HEI,
            side: SIDE.WHITE,
            coordinate: new Coordinate(5, 6, 0),
          },
        ],
        targetGoma: {
          name: GOMA.HEI,
          side: SIDE.WHITE,
        },
      });

    const to = new Coordinate(5, 2, 0);
    when_arata_at_han(gungi, whitePlayer, targetGoma, to);

    const expectedGoma = gungiHan.findGoma(to);
    expect(expectedGoma.name).toBe(targetGoma.name);
    expect(expectedGoma.side).toBe(targetGoma.side);
    expect(whiteGomaOki.isEmpty()).toBeTruthy();
    expect(gungi.currentTurn).toBe(SIDE.BLACK);
  });
  it('呼叫援軍 小', () => {
    const { whitePlayer, gungi, whiteGomaOki, gungiHan, targetGoma } =
      given_levelBeginner_Gungi({
        blackGomaOki: [],
        whiteGomaOki: [GOMA.SHO],
        hanGomas: [
          {
            name: GOMA.UMA,
            side: SIDE.WHITE,
            coordinate: new Coordinate(5, 6, 0),
          },
        ],
        targetGoma: {
          name: GOMA.SHO,
          side: SIDE.WHITE,
        },
      });

    const to = new Coordinate(6, 2, 0);
    when_arata_at_han(gungi, whitePlayer, targetGoma, to);

    const expectedGoma = gungiHan.findGoma(to);
    expect(expectedGoma.name).toBe(targetGoma.name);
    expect(expectedGoma.side).toBe(targetGoma.side);
    expect(whiteGomaOki.isEmpty()).toBeTruthy();
    expect(gungi.currentTurn).toBe(SIDE.BLACK);
  });
});

describe('叫不到援軍', () => {
  it('叫不到援軍 兵', () => {
    const { whitePlayer, gungi, targetGoma } = given_levelBeginner_Gungi({
      blackGomaOki: [],
      whiteGomaOki: [GOMA.UMA],
      hanGomas: [
        {
          name: GOMA.HEI,
          side: SIDE.WHITE,
          coordinate: new Coordinate(5, 6, 0),
        },
      ],
      targetGoma: {
        name: GOMA.HEI,
        side: SIDE.WHITE,
      },
    });

    expect(() =>
      when_arata_at_han(
        gungi,
        whitePlayer,
        targetGoma,
        new Coordinate(5, 2, 0),
      ),
    ).toThrowError(ERROR_MESSAGE.NOT_EXIST_GOMA);
  });
});
