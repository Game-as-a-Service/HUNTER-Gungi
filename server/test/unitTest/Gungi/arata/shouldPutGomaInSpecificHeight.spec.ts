import given_levelBeginner_Gungi from './helper/givenBeginnerGungi';
import GOMA from '../../../../src/domain/constant/GOMA';
import SIDE from '../../../../src/domain/constant/SIDE';
import Coordinate from '../../../../src/domain/Coordinate';
import { ERROR_MESSAGE } from '../../../../src/domain/constant/ERROR_MESSAGE';
import when_arata_at_han from './helper/whenArataTo';

describe('不能放超過高度', () => {
  it('疊太高了', () => {
    const { whitePlayer, gungi, targetGoma } = given_overlap_two_goma_at_han(
      5,
      6,
    );

    expect(() =>
      when_arata_at_han(
        gungi,
        whitePlayer,
        targetGoma,
        new Coordinate(5, 6, 2),
      ),
    ).toThrowError(ERROR_MESSAGE.OVER_HEIGHT);
  });

  function given_overlap_two_goma_at_han(x: number, y: number) {
    const { whitePlayer, gungi, targetGoma } = given_levelBeginner_Gungi({
      blackGomaOki: [],
      whiteGomaOki: [GOMA.UMA],
      hanGomas: [
        {
          name: GOMA.HEI,
          side: SIDE.WHITE,
          coordinate: new Coordinate(x, y, 0),
        },
        {
          name: GOMA.HEI,
          side: SIDE.WHITE,
          coordinate: new Coordinate(x, y, 1),
        },
      ],
      targetGoma: {
        name: GOMA.UMA,
        side: SIDE.WHITE,
      },
    });
    return { whitePlayer, gungi, targetGoma };
  }
});
