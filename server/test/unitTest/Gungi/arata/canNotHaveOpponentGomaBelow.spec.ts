import given_levelBeginner_Gungi from './helper/givenBeginnerGungi';
import SIDE from '../../../../src/domain/constant/SIDE';
import GOMA from '../../../../src/domain/constant/GOMA';
import Coordinate from '../../../../src/domain/Coordinate';
import when_arata_at_han from './helper/whenArataTo';
import { ERROR_MESSAGE } from '../../../../src/domain/constant/ERROR_MESSAGE';

describe('下面的棋子不能有對方旗子', () => {
  it('我是白方，下面有黑棋，我不能新啦', () => {
    const { whitePlayer, gungi, targetGoma } = given_levelBeginner_Gungi({
      blackGomaOki: [],
      currentTurn: SIDE.WHITE,
      targetGoma: { name: GOMA.HEI, side: SIDE.WHITE },
      whiteGomaOki: [GOMA.HEI],
      hanGomas: [
        {
          name: GOMA.HEI,
          side: SIDE.BLACK,
          coordinate: new Coordinate(5, 6, 0),
        },
      ],
    });
    expect(() =>
      when_arata_at_han(
        gungi,
        whitePlayer,
        targetGoma,
        new Coordinate(5, 6, 1),
      ),
    ).toThrowError(ERROR_MESSAGE.CANNOT_SET_ON_OPPONENT_GOMA);
  });

  it('我是黑方，下面有白棋，我不能新啦', () => {
    const { blackPlayer, gungi, targetGoma } = given_levelBeginner_Gungi({
      blackGomaOki: [GOMA.HEI],
      currentTurn: SIDE.BLACK,
      targetGoma: { name: GOMA.HEI, side: SIDE.BLACK },
      whiteGomaOki: [],
      hanGomas: [
        {
          name: GOMA.HEI,
          side: SIDE.WHITE,
          coordinate: new Coordinate(5, 6, 0),
        },
      ],
    });
    expect(() =>
      when_arata_at_han(
        gungi,
        blackPlayer,
        targetGoma,
        new Coordinate(5, 6, 1),
      ),
    ).toThrowError(ERROR_MESSAGE.CANNOT_SET_ON_OPPONENT_GOMA);
  });
});
