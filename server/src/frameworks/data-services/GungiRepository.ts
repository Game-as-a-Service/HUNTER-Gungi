import IRepository, { DeepPartial } from 'src/usecases/Repository';
import Gungi from 'src/domain/Gungi';
import { GungiData, PlayerData } from 'src/frameworks/data-services/GungiData';
import GungiDao from './dao/GungiDao';
import GungiDataModel from './data-model/GungiDataModel';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import SIDE from '../../domain/constant/SIDE';

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

  create(request: Gungi | DeepPartial<Gungi>): Gungi {
    const players = request.players.map<PlayerData>((player, index) => {
      return {
        id: player.id,
        name: player.name,
        deadArea: {
          gomas: [],
        },
        gomaOki: {
          gomas: [],
        },
        side: index === 0 ? SIDE.WHITE : SIDE.BLACK,
      };
    });

    const initData: GungiData = {
      _id: randomUUID(),
      level: request.level,
      currentTurn: SIDE.WHITE,
      turn: {
        sente: null,
        gote: null,
      },
      players,
      gungiHan: {
        han: [],
      },
      history: [],
    };

    return this._dataModel.toDomain(initData);
  }
}
