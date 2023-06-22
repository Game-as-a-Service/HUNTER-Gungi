import given_levelBeginner_Gungi from './helper/givenBeginnerGungi';
import GOMA from '../../../../src/domain/constant/GOMA';
import SIDE from '../../../../src/domain/constant/SIDE';
import Coordinate from '../../../../src/domain/Coordinate';
import { ERROR_MESSAGE } from '../../../../src/domain/constant/ERROR_MESSAGE';
import Gungi from '../../../../src/domain/Gungi';
import Player from '../../../../src/domain/Player';
import when_arata_at_han from './helper/whenArataTo';

describe('不能疊在這', () => {
  function given_osho_at_han_5_6_0() {
    const { whitePlayer, gungi, targetGoma } = given_levelBeginner_Gungi({
      blackGomaOki: [],
      whiteGomaOki: [GOMA.HEI],
      hanGomas: [
        {
          name: GOMA.OSHO,
          side: SIDE.WHITE,
          coordinate: new Coordinate(5, 6, 0),
        },
      ],
      targetGoma: {
        name: GOMA.HEI,
        side: SIDE.WHITE,
      },
    });
    return { whitePlayer, gungi, targetGoma };
  }

  it('不能疊在自己的帥', () => {
    const { whitePlayer, gungi, targetGoma } = given_osho_at_han_5_6_0();

    expect(() =>
      when_arata_at_han(
        gungi,
        whitePlayer,
        targetGoma,
        new Coordinate(5, 6, 1),
      ),
    ).toThrowError(ERROR_MESSAGE.CANNOT_SET_ON_OSHO);
  });
});
