import given_levelBeginner_Gungi from './helper/givenBeginnerGungi';
import GOMA from '../../../../src/domain/constant/GOMA';
import SIDE from '../../../../src/domain/constant/SIDE';
import { ERROR_MESSAGE } from '../../../../src/domain/constant/ERROR_MESSAGE';
import Coordinate from '../../../../src/domain/Coordinate';
import Gungi from '../../../../src/domain/Gungi';
import Player from '../../../../src/domain/Player';
import when_arata_at_han from './helper/whenArataTo';

describe('備用區要有棋子', () => {
  it('備用區沒棋不能 新 兵', () => {
    const { whitePlayer, gungi, targetGoma } = given_empty_gomaOki_targetGoma(
      GOMA.HEI,
    );

    expect(() =>
      when_arata_at_han(
        gungi,
        whitePlayer,
        targetGoma,
        new Coordinate(0, 0, 0),
      ),
    ).toThrowError(ERROR_MESSAGE.EMPTY_GOMAOKI);
  });

  it('備用區沒棋不能 新 馬', () => {
    const { whitePlayer, gungi, targetGoma } = given_empty_gomaOki_targetGoma(
      GOMA.UMA,
    );

    expect(() =>
      when_arata_at_han(
        gungi,
        whitePlayer,
        targetGoma,
        new Coordinate(0, 0, 0),
      ),
    ).toThrowError(ERROR_MESSAGE.EMPTY_GOMAOKI);
  });

  function given_empty_gomaOki_targetGoma(goma: GOMA) {
    const { whitePlayer, gungi,  targetGoma } = given_levelBeginner_Gungi({
      blackGomaOki: [],
      whiteGomaOki: [],
      hanGomas: [],
      targetGoma: {
        name: goma,
        side: SIDE.WHITE,
      },
    });
    return { whitePlayer, gungi,  targetGoma };
  }
});
