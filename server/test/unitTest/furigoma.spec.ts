import DeadArea from '../../src/domain/DeadArea';
import GomaOki from '../../src/domain/GomaOki';
import Player from '../../src/domain/Player';
import LEVEL from '../../src/domain/constant/LEVEL';
import SIDE from '../../src/domain/constant/SIDE';
import Gungi from '../../src/domain/Gungi';
import GungiHan from '../../src/domain/GungiHan';
import TURN from '../../src/domain/constant/TURN';

describe('Furigoma - 躑駒', () => {
  describe('多數正面 - 房主先手', () => {
    it('房主為玩家 A，躑駒正面 >= 3，房主為先手玩家', async () => {
      // Given
      // A 為房主
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
      jest
        .spyOn(gungi as any, 'genRandomsNum')
        .mockResolvedValueOnce([1, 1, 1, 0, 0]);
      // When
      await gungi.furigoma(playerA, playerB);
      const currPlayer = gungi.currentTurn;
      // Then
      expect(currPlayer.name).toBe(playerA.name);
    });
  });

  describe('少數正面 - 房主後手', () => {
    it('房主為玩家 A，躑駒正面 < 3，房主為後手玩家', async () => {
      // Given
      // A 為房主
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
      jest
        .spyOn(gungi as any, 'genRandomsNum')
        .mockResolvedValueOnce([1, 1, 0, 0, 0]);

      // When
      await gungi.furigoma(playerA, playerB);

      // Then
      expect(gungi.currentTurn.name).toBe(playerB.name);
    });
  });

  describe('genRandomsNum', () => {
    it('產生五個 0 - 1 的隨機數字，< 0,5 回傳 0，>= 0.5 回傳 1', async () => {
      // Given
      const gungi = new Gungi('test', LEVEL.BEGINNER, [], new GungiHan());

      // When
      const spyRandom = jest.spyOn(Math, 'random');
      spyRandom
        .mockReturnValueOnce(0.1)
        .mockReturnValueOnce(0.2)
        .mockReturnValueOnce(0.3)
        .mockReturnValueOnce(0.5)
        .mockReturnValueOnce(0.6);
      const result: (0 | 1)[] = await gungi['genRandomsNum']();

      // Then
      expect(spyRandom).toBeCalledTimes(5);
      expect(result).toEqual([0, 0, 0, 1, 1]);
    });
  });

  describe('determineTurn', () => {
    it('躑駒正面 >= 3，房主為先手玩家，回傳 TURN.SENTE', async () => {
      // Given
      const gungi = new Gungi('test', LEVEL.BEGINNER, [], new GungiHan());

      // When 正面 >= 3
      const result = await gungi['determineTurn'](3);

      // Then
      expect(result).toBe(TURN.SENTE);
    });

    it('躑駒正面 < 3，房主為後手玩家，回傳 TURN.SECOND', async () => {
      // Given
      const gungi = new Gungi('test', LEVEL.BEGINNER, [], new GungiHan());

      // When 正面 < 3
      const result = await gungi['determineTurn'](2);

      // Then
      expect(result).toBe(TURN.GOTE);
    });
  });
});
