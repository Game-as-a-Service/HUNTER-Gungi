import SIDE from '../../domain/constant/SIDE';
import LEVEL from '../../domain/constant/LEVEL';
import GOMA from '../../domain/constant/GOMA';

type CoordinateData = {
  x: number;
  y: number;
  z: number;
};

// 棋
type GomaData = {
  side: SIDE;
  name: GOMA;
};

// 備用區
type GomaOkiData = {
  gomas: GomaData[];
};

// 玩家
type PlayerData = {
  id: string;
  name: string;
  deadArea: DeadAreaData;
  gomaOki: GomaOkiData;
  side: SIDE;
};

// 棋盤
type GungiHanData = {
  han: {
    goma: GomaData;
    coordinate: CoordinateData;
  }[];
};

// 死區
type DeadAreaData = {
  gomas: GomaData[];
};

enum Action {
  // 新
  ARATA,
  // 移駒
  UGOGIGOMA,
  // 投降
  SURRENDER,
}

type RecordData = {
  player: PlayerData;
  side: SIDE;
  action: Action;
  from?: CoordinateData;
  to?: CoordinateData;
  deadGoma?: GomaData[];
};

interface GungiData {
  _id: string;
  level: LEVEL;
  winner?: SIDE;
  currentTurn: SIDE;
  turn: {
    sente: string | null;
    gote: string | null;
  };
  players: PlayerData[];
  gungiHan: GungiHanData;
  history: RecordData[];
}

export {
  GungiData,
  GomaData,
  GomaOkiData,
  PlayerData,
  GungiHanData,
  DeadAreaData,
  CoordinateData,
};
