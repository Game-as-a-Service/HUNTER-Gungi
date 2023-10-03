import given_levelBeginner_Gungi from './helper/givenBeginnerGungi';
import GOMA from '../../../../src/domain/constant/GOMA';
import SIDE from '../../../../src/domain/constant/SIDE';
import { ERROR_MESSAGE } from '../../../../src/domain/constant/ERROR_MESSAGE';
import Coordinate from '../../../../src/domain/Coordinate';
import Gungi from '../../../../src/domain/Gungi';
import Player from '../../../../src/domain/Player';
import when_arata_at_han from './helper/whenArataTo';

describe('下面沒棋別亂疊', () => {
  it('下面沒棋別亂疊', () => {
    const { whitePlayer, gungi, targetGoma } = given_no_goma_at_han_5_6_0();

    expect(() =>
      when_arata_at_han(
        gungi,
        whitePlayer,
        targetGoma,
        new Coordinate(5, 6, 1),
      ),
    ).toThrowError(ERROR_MESSAGE.BELOW_NOT_EXIST_GOMA);
  });

  function given_no_goma_at_han_5_6_0() {
    const { whitePlayer, gungi, targetGoma } = given_levelBeginner_Gungi({
      blackGomaOki: [],
      whiteGomaOki: [GOMA.UMA],
      hanGomas: [],
      targetGoma: {
        name: GOMA.UMA,
        side: SIDE.WHITE,
      },
    });
    return { whitePlayer, gungi, targetGoma };
  }
});
