import when_arata_at_han from './helper/whenArataTo';
import given_levelBeginner_Gungi from './helper/givenBeginnerGungi';
import SIDE from '../../../../src/domain/constant/SIDE';
import GOMA from '../../../../src/domain/constant/GOMA';
import Coordinate from '../../../../src/domain/Coordinate';
import { ERROR_MESSAGE } from '../../../../src/domain/constant/ERROR_MESSAGE';

describe('母湯下棋下在有棋子的位子R', () => {
  // coordinate   0,2,0 => black HEI , 1,2,1 =>black SHINOBI
  // to overlap  shinobi  / hei
  it('現在是白色先， 不能把棋下在0,2,0 因為有別的棋子啦', () => {
    const { whitePlayer, gungi, targetGoma } = given_levelBeginner_Gungi({
      blackGomaOki: [],
      currentTurn: SIDE.WHITE,
      hanGomas: [
        {
          name: GOMA.HEI,
          side: SIDE.BLACK,
          coordinate: { x: 0, y: 2, z: 0 },
        },
      ],
      targetGoma: { name: GOMA.HEI, side: SIDE.WHITE },
      whiteGomaOki: [GOMA.HEI],
    });

    expect(() =>
      when_arata_at_han(
        gungi,
        whitePlayer,
        targetGoma,
        new Coordinate(0, 2, 0),
      ),
    ).toThrowError(ERROR_MESSAGE.POSITION_OCCUPIED);
  });

  it('現在是白色先，不能把棋下在1,2,1 因為有別的棋子啦', () => {
    const { whitePlayer, gungi, targetGoma } = given_levelBeginner_Gungi({
      blackGomaOki: [],
      currentTurn: SIDE.WHITE,
      hanGomas: [
        {
          name: GOMA.SHINOBI,
          side: SIDE.BLACK,
          coordinate: { x: 1, y: 2, z: 1 },
        },
      ],
      targetGoma: { name: GOMA.HEI, side: SIDE.WHITE },
      whiteGomaOki: [GOMA.HEI],
    });

    expect(() =>
      when_arata_at_han(
        gungi,
        whitePlayer,
        targetGoma,
        new Coordinate(1, 2, 1),
      ),
    ).toThrowError(ERROR_MESSAGE.POSITION_OCCUPIED);
  });

  it('現在是黑色先，不能把棋下在1,2,1 因為有別的棋子啦', () => {
    const { blackPlayer, gungi, targetGoma } = given_levelBeginner_Gungi({
      blackGomaOki: [GOMA.HEI],
      currentTurn: SIDE.BLACK,
      hanGomas: [
        {
          name: GOMA.SHINOBI,
          side: SIDE.WHITE,
          coordinate: { x: 1, y: 2, z: 1 },
        },
      ],
      targetGoma: { name: GOMA.HEI, side: SIDE.BLACK },
      whiteGomaOki: [],
    });

    expect(() =>
      when_arata_at_han(
        gungi,
        blackPlayer,
        targetGoma,
        new Coordinate(1, 2, 1),
      ),
    ).toThrowError(ERROR_MESSAGE.POSITION_OCCUPIED);
  });
});
