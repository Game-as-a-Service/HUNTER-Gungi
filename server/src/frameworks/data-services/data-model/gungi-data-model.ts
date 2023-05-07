import Gungi from '../../../domain/Gungi';
import {
  DeadAreaData,
  GomaData,
  GomaOkiData,
  GungiData,
  PlayerData,
} from 'src/frameworks/data-services/gungi-data';
import Player from '../../../domain/Player';
import GungiHan from '../../../domain/GungiHan';
import GomaOki from '../../../domain/GomaOki';
import LEVEL from '../../../domain/constant/LEVEL';
import Goma from '../../../domain/goma/Goma';
import SIDE from '../../../domain/constant/SIDE';
import Coordinate from '../../../domain/Coordinate';
import DeadArea from '../../../domain/DeadArea';
import DataModel from './data-model';
import GomaFactory from '../../../domain/goma/GomaFactory';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class GungiDataModel implements DataModel<Gungi, GungiData> {
  toData(domain: Gungi): GungiData {
    return domain.toData();
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

    const gomas = rawGungi.gungiHan.han.map((goma) => {
      return this.createGoma(level, goma);
    });
    return new GungiHan(gomas);
  }

  private createGoma(level: LEVEL, gomaData: GomaData): Goma {
    const { name, coordinate, side } = gomaData;

    return GomaFactory.create(
      level,
      side,
      name,
      new Coordinate(coordinate.x, coordinate.y, coordinate.z),
    );
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
}
