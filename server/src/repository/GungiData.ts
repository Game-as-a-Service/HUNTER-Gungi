import SIDE from '../domain/constant/SIDE';
import LEVEL from '../domain/constant/LEVEL';

type CoordinateData = {
  x: number;
  y: number;
  z: number;
};

type GomaData = {
  name: string;
  coordinate: CoordinateData;
};

type GomaOkiData = {
  gomas: GomaData[];
};

type PlayerData = {
  id: string;
  name: string;
};
type GungiHanData = {
  han: GomaData[][][];
};

type DeadAreaData = {
  gomas: GomaData[];
};

enum Action {
  ARATA,
  UGOGIGOMA,
  REMOVE, //要確認一下domain是用啥名子
  SURRENDER,
}

type RecordData = {
  player: PlayerData;
  side: SIDE;
  action: Action;
  from?: CoordinateData;
  to?: CoordinateData;
};

interface GungiData {
  id: string;
  level: LEVEL;
  loser?: SIDE;
  winner?: SIDE;
  currentTurn: SIDE;
  sides: {
    side: SIDE;
    player: PlayerData;
    gomaOki: GomaOkiData;
    deadArea: DeadAreaData;
  }[];
  gomaHan: GungiHanData;
  history: RecordData[];
}

export {
  GungiData,
  GomaData,
  GomaOkiData,
  PlayerData,
  GungiHanData,
  DeadAreaData,
};
