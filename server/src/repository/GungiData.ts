import COLOR from '../domain/constant/COLOR';

type GomaData = {
  name: string;
};
type GomaOkiData = {
  gomas: GomaData[];
};
type PlayerData = {
  name: string;
  side: COLOR;
};
type GungiHanData = {
  map: GomaData[][][];
};

type DeadAreaData = {
  gomas: GomaData[];
};

interface GungiData {
  _id: string;
  level: string;
  loser: string;
  winner: string;
  black: {
    player: PlayerData;
    gomaOki: GomaOkiData;
    deadArea: DeadAreaData;
  };
  white: {
    player: PlayerData;
    gomaOki: GomaOkiData;
    deadArea: DeadAreaData;
  };
  gomaHan: GungiHanData;
  history: {
    color: string;
    piece: string; // name of piece
    type: string; //NEW OR MOVE
    from:
      | {
          x: string;
          y: string;
          z: string;
        }
      | undefined;
    to: {
      x: string;
      y: string;
      z: string;
    };
  }[];
}

interface GungiDataTable {
  _id: string;
  level: string;
}

interface History {
  _id: string;
  gungiGameId: string; // GungiDataTable._id
  moveNumber: number;
  color: string;
  piece: string;
  from: {
    x;
    y;
    z;
  };
  to: {
    x;
    y;
    z;
  };
}

// select * from GungiDataTable gdt where _id = 'gameID' inner join History h on h.gungiGameId = _id;
//  gdt._id, gdt.level, h._id, h.gungiGameId....

export {
  GungiData,
  GomaData,
  GomaOkiData,
  PlayerData,
  GungiHanData,
  DeadAreaData,
};
