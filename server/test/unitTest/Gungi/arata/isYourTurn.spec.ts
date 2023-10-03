import given_levelBeginner_Gungi from './helper/givenBeginnerGungi';
import GOMA from '../../../../src/domain/constant/GOMA';
import SIDE from '../../../../src/domain/constant/SIDE';
import Coordinate from '../../../../src/domain/Coordinate';
import { ERROR_MESSAGE } from '../../../../src/domain/constant/ERROR_MESSAGE';

describe('是你的回合嗎?', () => {
  it('不是你的回合,硬下', () => {
    const { whitePlayer, targetGoma, gungi } = given_levelBeginner_Gungi({
      blackGomaOki: [],
      whiteGomaOki: [GOMA.HEI],
      hanGomas: [],
      targetGoma: {
        name: GOMA.HEI,
        side: SIDE.WHITE,
      },
    });

    gungi.setCurrentTurn(SIDE.BLACK);

    expect(() => {
      gungi.arata(whitePlayer, targetGoma, new Coordinate(1, 1, 1));
    }).toThrow(ERROR_MESSAGE.NOT_YOUR_TURN);
  });
});
