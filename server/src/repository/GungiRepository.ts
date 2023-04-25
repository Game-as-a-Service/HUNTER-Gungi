import Repository from '../usecase/Repository';
import GungiDataModel from './dataModel/GungiDataModel';
import GungiDao from './DAO/GungiDao';
import { Inject, Injectable } from '@nestjs/common';
import Gungi from '../domain/Gungi';

@Injectable()
export default class GungiRepository implements Repository<Gungi> {
  constructor(
    @Inject(GungiDao) private _dao: GungiDao,
    @Inject(GungiDataModel) private _gungiDataModel: GungiDataModel,
  ) {}

  async findById(id: string): Promise<Gungi | null> {
    const gungiData = await this._dao.findById(id);
    if (gungiData === null) {
      return null;
    }
    return this._gungiDataModel.toDomain(gungiData);
  }

  async save(gungi: Gungi) {
    const gungiData = this._gungiDataModel.toData(gungi);
    await this._dao.save(gungiData);
  }
}
