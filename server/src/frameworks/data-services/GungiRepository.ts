import IRepository from 'src/usecases/Repository';
import Gungi from 'src/domain/Gungi';
import {
  GungiData,
  GungiHanData,
  PlayerData,
} from 'src/frameworks/data-services/GungiData';
import GungiDao from './dao/GungiDao';
import GungiDataModel from './data-model/GungiDataModel';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import SIDE from '../../domain/constant/SIDE';
import { CreateGungiRequest } from '../../usecases/service-class/CreateGungiUsecase';
import LEVEL from '../../domain/constant/LEVEL';

@Injectable()
export class GungiRepository implements IRepository<Gungi> {
  constructor(private _dao: GungiDao, private _dataModel: GungiDataModel) {}

  async findById(id: string): Promise<Gungi | null> {
    const data: GungiData = await this._dao.findById(id);
    if (data === null) {
      return null;
    }
    return this._dataModel.toDomain(data) as Gungi;
  }

  async save(gungi: Gungi): Promise<void> {
    const data: GungiData = this._dataModel.toData(gungi);
    await this._dao.save(data);
  }

  create(initialData: {
    level: LEVEL;
    playerA: { id: string; name: string };
    playerB: { id: string; name: string };
  }): Gungi {
    const gungiId = randomUUID();
    const { level, playerA, playerB } = initialData;

    if (!gungiId || !level || !playerA || !playerB) {
      throw new Error('wrong parameter');
    }

    const playerAData: PlayerData = {
      deadArea: { gomas: [] },
      gomaOki: { gomas: [] },
      id: playerA.id,
      name: playerA.name,
      side: SIDE.BLACK,
    };

    const playerBData: PlayerData = {
      deadArea: { gomas: [] },
      gomaOki: { gomas: [] },
      id: playerB.id,
      name: playerB.name,
      side: SIDE.WHITE,
    };

    const gungiHanData: GungiHanData = { han: [] };

    const newGungiData: GungiData = {
      _id: gungiId,
      level,
      currentTurn: SIDE.BLACK,
      players: [playerAData, playerBData],
      gungiHan: gungiHanData,
      history: [],
    };

    return this._dataModel.toDomain(newGungiData);
  }
}
