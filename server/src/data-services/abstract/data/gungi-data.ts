import SIDE from '../../../domain/constant/SIDE';
import LEVEL from '../../../domain/constant/LEVEL';
import GOMA from '../../../domain/constant/GOMA';

type CoordinateData = {
  x: number;
  y: number;
  z: number;
};
// 棋
type GomaData = {
  name: GOMA;
  coordinate: CoordinateData;
};
// 備用區
type GomaOkiData = {
  gomas: GomaData[];
};
// 玩家
type PlayerData = {
  id: string;
  name: string;
};
// 棋盤
type GungiHanData = {
  han: GomaData[];
};
// 死區
type DeadAreaData = {
  gomas: GomaData[];
};

enum Action {
  // 新
  ARATA,
  // 移
  UGOGIGOMA,
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
  //extend WithId<Document> {
  _id: string;
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
  players: {
    id: string; // uuid
    name: string;
    side: SIDE;
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
