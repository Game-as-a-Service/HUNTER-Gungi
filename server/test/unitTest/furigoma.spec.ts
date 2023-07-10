import DeadArea from '../../src/domain/DeadArea';
import GomaOki from '../../src/domain/GomaOki';
import Player from '../../src/domain/Player';
import LEVEL from '../../src/domain/constant/LEVEL';
import SIDE from '../../src/domain/constant/SIDE';
import Gungi from '../../src/domain/Gungi';
import GungiHan from '../../src/domain/GungiHan';

function given_playerA_playerB_and_gungi() {
  const playerA = new Player(
    'A',
    'A',
    SIDE.WHITE,
    new GomaOki(LEVEL.BEGINNER, SIDE.WHITE),
    new DeadArea(SIDE.WHITE),
  );
  const playerB = new Player(
    'B',
    'B',
    SIDE.BLACK,
    new GomaOki(LEVEL.BEGINNER, SIDE.BLACK),
    new DeadArea(SIDE.BLACK),
  );
  const gungi = new Gungi(
    'test',
    LEVEL.BEGINNER,
    [playerA, playerB],
    new GungiHan(),
  );
  return { gungi, playerA, playerB };
}

async function when_furigoma_heads_is_more_than_tails(
  gungi: Gungi,
  playerA: Player,
  playerB: Player,
) {
  jest.spyOn(gungi as any, 'genTossResult').mockReturnValue([1, 1, 1, 0, 0]);
  await gungi.furigoma(playerA, playerB);
}

async function when_furigoma_tails_is_more_than_heads(
  gungi: Gungi,
  playerA: Player,
  playerB: Player,
) {
  jest.spyOn(gungi as any, 'genTossResult').mockReturnValue([1, 1, 0, 0, 0]);
  await gungi.furigoma(playerA, playerB);
}

function when_toss_result_tails_is_more_than_heads() {
  // When
  const spyRandom = jest.spyOn(Math, 'random');
  spyRandom
    .mockReturnValueOnce(0.1)
    .mockReturnValueOnce(0.2)
    .mockReturnValueOnce(0.3)
    .mockReturnValueOnce(0.5)
    .mockReturnValueOnce(0.6);
  return spyRandom;
}

describe('Furigoma - 躑駒', () => {
  describe('多數正面 - 房主先手', () => {
    it('房主為玩家 A，躑駒正面 >= 3，房主為先手玩家', async () => {
      // Given
      // A 為房主
      const { gungi, playerA, playerB } = given_playerA_playerB_and_gungi();

      // When
      await when_furigoma_heads_is_more_than_tails(gungi, playerA, playerB);
      const currPlayer = gungi.currentTurn;

      // Then
      expect(currPlayer.name).toBe(playerA.name);
      expect(gungi.sente).toBe(playerA);
    });
  });

  describe('少數正面 - 房主後手', () => {
    it('房主為玩家 A，躑駒正面 < 3，房主為後手玩家', async () => {
      // Given
      // A 為房主
      const { gungi, playerA, playerB } = given_playerA_playerB_and_gungi();

      // When
      await when_furigoma_tails_is_more_than_heads(gungi, playerA, playerB);
      const currPlayer = gungi.currentTurn;

      // Then
      expect(currPlayer.name).toBe(playerB.name);
      expect(gungi.gote).toBe(playerA);
    });
  });

  describe('genTossResult', () => {
    it('產生五個 0 - 1 的隨機數字，< 0,5 回傳 0，>= 0.5 回傳 1', async () => {
      // Given
      const gungi = new Gungi('test', LEVEL.BEGINNER, [], new GungiHan());

      // When
      const spyRandom = when_toss_result_tails_is_more_than_heads();
      const result: (0 | 1)[] = gungi['genTossResult']();

      // Then
      expect(spyRandom).toBeCalledTimes(5);
      expect(result).toEqual([0, 0, 0, 1, 1]);
    });
  });
});
