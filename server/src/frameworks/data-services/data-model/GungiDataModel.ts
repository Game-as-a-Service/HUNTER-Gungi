import Gungi from '../../../domain/Gungi';
import {
  DeadAreaData,
  GomaData,
  GomaOkiData,
  GungiData,
  PlayerData,
} from 'src/frameworks/data-services/GungiData';
import Player from '../../../domain/Player';
import GungiHan from '../../../domain/GungiHan';
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
    const senteId = gungi.sente ? gungi.sente.id : null;
    const goteId = gungi.gote ? gungi.gote.id : null;
    const playerOne = this.playerToData(gungi.players[0]);
    const playerTwo = this.playerToData(gungi.players[1]);
    const playerOneDeadArea = this.deadAreaToData(gungi.players[0].deadArea);
    const playerTwoDeadArea = this.deadAreaToData(gungi.players[1].deadArea);
    const playerOneGomaOkiData = this.gomaOkiToData(gungi.players[0].gomaOki);
    const playerTwoGomaOkiData = this.gomaOkiToData(gungi.players[1].gomaOki);
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
      turn: {
        sente: senteId,
        gote: goteId,
      },
      players: [
        {
          ...playerOne,
          deadArea: playerOneDeadArea,
          gomaOki: playerOneGomaOkiData,
        },
        {
          ...playerTwo,
          deadArea: playerTwoDeadArea,
          gomaOki: playerTwoGomaOkiData,
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

  private gungiHanToData(gungiHan: GungiHan) {
    const gomasData: GomaData[] = [];

    gungiHan.han.forEach((yMap, x) => {
      yMap.forEach((gomas, y) => {
        gomas.forEach((goma) => {
          gomasData.push(this.gomaToData(goma));
        });
      });
    });

    return {
      han: gomasData,
    };
  }

  private gomaToData(goma: Goma) {
    return {
      side: goma.side,
      name: goma.name,
      coordinate: goma.coordinate.toData(),
    };
  }

  private playerToData(player: Player) {
    return {
      id: player.id,
      side: player.side,
      name: player.name,
    };
  }

  private deadAreaToData(deadArea: DeadArea) {
    return {
      gomas: deadArea.gomas.map((goma) => this.gomaToData(goma)),
    };
  }

  private gomaOkiToData(gomaOki: GomaOki) {
    return {
      gomas: gomaOki.gomas.map((goma) => this.gomaToData(goma)),
    };
  }
}
