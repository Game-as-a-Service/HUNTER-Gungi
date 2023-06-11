import Gungi from '../../../domain/Gungi';
import {
  DeadAreaData,
  GomaData,
  GomaOkiData,
  GungiData,
  PlayerData,
} from 'src/frameworks/data-services/GungiData';
import Player from '../../../domain/Player';
import GungiHan, {
  EMPTY_GOMA,
  GungiHanGoma,
  HAN_X_MAX,
  HAN_Y_MAX,
  HAN_Z_MAX,
} from '../../../domain/GungiHan';
import GomaOki from '../../../domain/GomaOki';
import LEVEL from '../../../domain/constant/LEVEL';
import Goma from '../../../domain/goma/Goma';
import SIDE from '../../../domain/constant/SIDE';
import Coordinate from '../../../domain/Coordinate';
import DeadArea from '../../../domain/DeadArea';
import DataModel from './DataModel';
import GomaFactory from '../../../domain/goma/GomaFactory';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class GungiDataModel implements DataModel<Gungi, GungiData> {
  toData(gungi: Gungi): GungiData {
    const gungiData = this.gungiHanToData(gungi.gungiHan);
    const senteData = this.playerToData(gungi.sente);
    const goteData = this.playerToData(gungi.gote);
    const senteDeadArea = this.deadAreaToData(gungi.senteDeadArea);
    const goteDeadArea = this.deadAreaToData(gungi.goteDeadArea);
    const senteGomaOkiData = this.gomaOkiToData(gungi.senteGomaOki);
    const goteGomaOkiData = this.gomaOkiToData(gungi.goteGomaOki);
    const level = gungi.level;
    const currentTurn = gungi.currentTurn.side;
    const winner = gungi.winner?.side;

    return {
      _id: gungi.id,
      currentTurn,
      gungiHan: gungiData,
      history: [],
      level,
      winner,
      players: [
        {
          ...senteData,
          deadArea: senteDeadArea,
          gomaOki: senteGomaOkiData,
        },
        {
          ...goteData,
          deadArea: goteDeadArea,
          gomaOki: goteGomaOkiData,
        },
      ],
    };
  }

  toDomain(rawGungi: GungiData): Gungi {
    const id = rawGungi._id;
    const level = rawGungi.level;
    const players = rawGungi.players.map((player) =>
      this.createPlayer(level, player),
    );
    const gungiHan = this.createGungiHan(rawGungi);

    const gungi = new Gungi(id, level, players, gungiHan);
    gungi.setCurrentTurn(rawGungi.currentTurn);
    return gungi;
  }

  private createGungiHan(rawGungi: GungiData): GungiHan {
    const level = rawGungi.level;

    const gomas: GungiHanGoma[] = rawGungi.gungiHan.han.map((goma) => ({
      goma: this.createGoma(level, goma),
      coordinate: new Coordinate(
        goma.coordinate.x,
        goma.coordinate.y,
        goma.coordinate.z,
      ),
    }));

    return new GungiHan(gomas);
  }

  private createGoma(level: LEVEL, gomaData: GomaData): Goma {
    const { name, side } = gomaData;

    return GomaFactory.create(level, side, name);
  }

  private createPlayer(level: LEVEL, player: PlayerData) {
    const { id, side, gomaOki, deadArea, name } = player;
    const gomaOkiData = this.createGomaOki(level, side, gomaOki);
    const deadAreaData = this.createDeadArea(level, side, deadArea);
    return new Player(id, name, side, gomaOkiData, deadAreaData);
  }

  private createGomaOki(
    level: LEVEL,
    side: SIDE,
    gomaOki: GomaOkiData,
  ): GomaOki {
    const gomas = gomaOki.gomas.map((goma) => this.createGoma(level, goma));

    return new GomaOki(level, side, gomas);
  }

  private createDeadArea(level: LEVEL, side: SIDE, deadArea: DeadAreaData) {
    const gomas = deadArea.gomas.map((goma) => this.createGoma(level, goma));
    return new DeadArea(side, gomas);
  }

  private gungiHanToData(gungiHan: GungiHan) {
    const gomasData: GomaData[] = [];

    for (let x = 1; x <= HAN_X_MAX; x++) {
      for (let y = 1; y <= HAN_Y_MAX; y++) {
        for (let z = 1; z <= HAN_Z_MAX; z++) {
          const coordinate = new Coordinate(x, y, z);
          const goma = gungiHan.findGoma(coordinate);
          if (goma !== EMPTY_GOMA) {
            gomasData.push(this.gomaToData(goma, coordinate));
          }
        }
      }
    }

    return {
      han: gomasData,
    };
  }

  private gomaToData(goma: Goma, coordinate: Coordinate) {
    return {
      side: goma.side,
      name: goma.name,
      coordinate: coordinate.toData(),
    };
  }

  private playerToData(player: Player) {
    const { id, side, name } = player;
    return {
      id,
      side,
      name,
    };
  }

  private deadAreaToData(deadArea: DeadArea) {
    return {
      gomas: deadArea.gomas.map((goma) =>
        this.gomaToData(goma, new Coordinate(-1, -1, -1)),
      ),
    };
  }

  private gomaOkiToData(gomaOki: GomaOki) {
    return {
      gomas: gomaOki.gomas.map((goma) =>
        this.gomaToData(goma, new Coordinate(-1, -1, -1)),
      ),
    };
  }
}
