import IRepository from 'src/data-services/abstract/repository.abstract';
import Gungi from 'src/domain/Gungi';
import { GungiData } from 'src/data-services/abstract/data/gungi-data';
import GungiDao from './dao/gungi.dao';
import GungiDataModel from './data-model/gungi-data-model';

export class GungiRepository implements IRepository<Gungi, GungiData> {
  constructor(readonly _dao: GungiDao, readonly _dataModel: GungiDataModel) {}

  async get(id: string): Promise<Gungi | null> {
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
