import IRepository from 'src/usecases/repository.abstract';
import Gungi from 'src/domain/Gungi';
import { GungiData } from 'src/frameworks/data-services/gungi-data';
import GungiDao from './dao/gungi.dao';
import GungiDataModel from './data-model/gungi-data-model';
import { Injectable } from '@nestjs/common';

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
}
