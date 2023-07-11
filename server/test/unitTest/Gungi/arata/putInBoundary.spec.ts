import given_levelBeginner_Gungi from './helper/givenBeginnerGungi';
import GOMA from '../../../../src/domain/constant/GOMA';
import SIDE from '../../../../src/domain/constant/SIDE';
import { ERROR_MESSAGE } from '../../../../src/domain/constant/ERROR_MESSAGE';
import Coordinate from '../../../../src/domain/Coordinate';
import when_arata_at_han from './helper/whenArataTo';
import { BOUNDARY } from '../../../../src/domain/constant/GUNGI_HAN';

describe('不能放在棋盤外', () => {
  it('不能放到太左邊', () => {
    const { whitePlayer, gungi, targetGoma } = given_levelBeginner_Gungi({
      blackGomaOki: [],
      whiteGomaOki: [GOMA.HEI],
      hanGomas: [],
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
        new Coordinate(BOUNDARY.LEFT - 1, 0, 0),
      ),
    ).toThrowError(ERROR_MESSAGE.OUTSIDE_HAN);
  });

  it('不能放到太右邊', () => {
    const { whitePlayer, gungi, targetGoma } = given_levelBeginner_Gungi({
      blackGomaOki: [],
      whiteGomaOki: [GOMA.HEI],
      hanGomas: [],
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
        new Coordinate(BOUNDARY.RIGHT + 1, 0, 0),
      ),
    ).toThrowError(ERROR_MESSAGE.OUTSIDE_HAN);
  });

  it('不能放到太下面', () => {
    const { whitePlayer, gungi, targetGoma } = given_levelBeginner_Gungi({
      blackGomaOki: [],
      whiteGomaOki: [GOMA.HEI],
      hanGomas: [],
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
        new Coordinate(0, BOUNDARY.BOTTOM - 1, 0),
      ),
    ).toThrowError(ERROR_MESSAGE.OUTSIDE_HAN);
  });
  it('不能放到太上面', () => {
    const { whitePlayer, gungi, targetGoma } = given_levelBeginner_Gungi({
      blackGomaOki: [],
      whiteGomaOki: [GOMA.HEI],
      hanGomas: [],
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
        new Coordinate(0, BOUNDARY.TOP + 1, 0),
      ),
    ).toThrowError(ERROR_MESSAGE.OUTSIDE_HAN);
  });
});
describe('不能超過 我方最遠的棋子 ', () => {
  function given_farthest_goma_at(
    side: SIDE,
    farthestGomaCoordinate: Coordinate,
    currentTurn?: SIDE,
  ) {
    let blackGomaOki: GOMA[] = [];
    let whiteGomaOki: GOMA[] = [];

    switch (side) {
      case SIDE.BLACK:
        blackGomaOki = [GOMA.HEI];
        break;
      case SIDE.WHITE:
        whiteGomaOki = [GOMA.HEI];
        break;
    }

    const { whitePlayer, blackPlayer, gungi, targetGoma } =
      given_levelBeginner_Gungi({
        blackGomaOki,
        whiteGomaOki,
        hanGomas: [
          {
            name: GOMA.HEI,
            side,
            coordinate: farthestGomaCoordinate,
          },
        ],
        targetGoma: {
          name: GOMA.UMA,
          side,
        },
        currentTurn,
      });

    const player = side === SIDE.BLACK ? blackPlayer : whitePlayer;

    return { player, gungi, targetGoma };
  }

  it('不能放太上面 白色', () => {
    const { player, gungi, targetGoma } = given_farthest_goma_at(
      SIDE.WHITE,
      new Coordinate(5, 6, 0),
    );

    expect(() =>
      when_arata_at_han(gungi, player, targetGoma, new Coordinate(5, 8, 0)),
    ).toThrowError(ERROR_MESSAGE.TOO_FAR);
  });

  it('不能放太上面 黑色', () => {
    const { player, gungi, targetGoma } = given_farthest_goma_at(
      SIDE.BLACK,
      new Coordinate(5, 2, 0),
      SIDE.BLACK,
    );

    expect(() =>
      when_arata_at_han(gungi, player, targetGoma, new Coordinate(5, 0, 0)),
    ).toThrowError(ERROR_MESSAGE.TOO_FAR);
  });
});
describe('成功疊棋', () => {
  it('踐踏我軍', () => {
    const { whitePlayer, whiteGomaOki, gungiHan, gungi, targetGoma } =
      given_levelBeginner_Gungi({
        blackGomaOki: [],
        whiteGomaOki: [GOMA.DAI],
        hanGomas: [
          {
            name: GOMA.HEI,
            side: SIDE.WHITE,
            coordinate: new Coordinate(5, 6, 0),
          },
        ],
        targetGoma: {
          name: GOMA.DAI,
          side: SIDE.WHITE,
        },
      });

    const to = new Coordinate(5, 6, 1);
    when_arata_at_han(gungi, whitePlayer, targetGoma, to);

    const expectedGoma = gungiHan.findGoma(to);
    expect(expectedGoma.name).toBe(GOMA.DAI);
    expect(expectedGoma.side).toBe(SIDE.WHITE);
    expect(whiteGomaOki.isEmpty()).toBeTruthy();
  });
});
