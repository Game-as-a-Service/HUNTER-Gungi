import IRepository from 'src/data-services/abstract/repository.abstract';
import Gungi from 'src/domain/Gungi';
import { MongoGungiData } from './data/gungi.data';
import MongoGungiDao from './dao/gungi.dao';
import MongoGungiDataModel from './data-model/gungi-data.model';

export class MongoGungiRepository
  implements IRepository<Gungi, MongoGungiData>
{
  constructor(
    readonly _dao: MongoGungiDao,
    readonly _dataModel: MongoGungiDataModel,
  ) {}

  async get(id: string): Promise<Gungi | null> {
    const data: MongoGungiData = await this._dao.findById(id);
    if (data === null) {
      return null;
    }
    return this._dataModel.toDomain(data) as Gungi;
  }

  async save(gungi: Gungi): Promise<void> {
    const data: MongoGungiData = this._dataModel.toData(gungi);
    await this._dao.save(data);
  }
}
