import GOMA from '../../../../../src/domain/constant/GOMA';
import SIDE from '../../../../../src/domain/constant/SIDE';
import { randomUUID } from 'crypto';
import LEVEL from '../../../../../src/domain/constant/LEVEL';
import GomaOki from '../../../../../src/domain/GomaOki';
import GomaFactory from '../../../../../src/domain/goma/GomaFactory';
import Player from '../../../../../src/domain/Player';
import DeadArea from '../../../../../src/domain/DeadArea';
import GungiHan, { GungiHanGoma } from '../../../../../src/domain/GungiHan';
import Coordinate from '../../../../../src/domain/Coordinate';
import Gungi from '../../../../../src/domain/Gungi';

function given_levelBeginner_Gungi(parameters: {
  blackGomaOki: GOMA[];
  whiteGomaOki: GOMA[];
  hanGomas: {
    name: GOMA;
    side: SIDE;
    coordinate: {
      x: number;
      y: number;
      z: number;
    };
  }[];
  targetGoma: {
    name: GOMA;
    side: SIDE;
  };
  currentTurn?: SIDE;
}) {
  const gungiId = randomUUID();

  const level = LEVEL.BEGINNER;
  const sideBlack = SIDE.BLACK;
  const sideWhite = SIDE.WHITE;

  const { blackGomaOki, whiteGomaOki, hanGomas, targetGoma } = parameters;
  const blackGomaOkiInstance = new GomaOki(
    level,
    sideBlack,
    blackGomaOki.map((name) => GomaFactory.create(level, sideBlack, name)),
  );

  const playerA = new Player(
    'A',
    'A',
    sideBlack,
    blackGomaOkiInstance,
    new DeadArea(sideBlack),
  );

  const whiteGomaOkiInstance = new GomaOki(
    level,
    sideWhite,
    whiteGomaOki.map((name) => GomaFactory.create(level, sideWhite, name)),
  );

  const playerB = new Player(
    'B',
    'B',
    sideWhite,
    whiteGomaOkiInstance,
    new DeadArea(sideWhite),
  );

  const gungiHan = new GungiHan(
    level,
    hanGomas.map<GungiHanGoma>(({ name, side, coordinate }) => {
      return {
        goma: GomaFactory.create(level, side, name),
        coordinate: new Coordinate(coordinate.x, coordinate.y, coordinate.z),
      };
    }),
  );

  const gungi = new Gungi(gungiId, level, [playerA, playerB], gungiHan);

  gungi.setCurrentTurn(SIDE.WHITE);
  if (parameters.currentTurn) {
    gungi.setCurrentTurn(parameters.currentTurn);
  }

  return {
    blackPlayer: playerA,
    blackGomaOki: blackGomaOkiInstance,
    whitePlayer: playerB,
    whiteGomaOki: whiteGomaOkiInstance,
    gungiHan,
    targetGoma: {
      name: targetGoma.name,
      side: targetGoma.side,
    },
    gungi,
  };
}

export default given_levelBeginner_Gungi;
