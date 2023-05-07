import { Collection, Db } from 'mongodb';
import { Inject, Injectable } from '@nestjs/common';
import { Dao } from 'src/frameworks/data-services/dao/dao';
import { GungiData } from 'src/frameworks/data-services/gungi-data';

@Injectable()
export default class GungiDao implements Dao<GungiData> {
  private _dbCollection: Collection<GungiData>;

  constructor(@Inject('MongoConnection') private readonly database: Db) {}

  async findById(id: string): Promise<GungiData> {
    if (!this._dbCollection) {
      this.lazyLoading();
    }
    const gungi = await this._dbCollection.findOne({ _id: id });
    return gungi;
  }

  async save(gungi: GungiData) {
    if (!this._dbCollection) {
      this.lazyLoading();
    }
    await this._dbCollection.updateOne(
      { _id: gungi._id },
      { $set: gungi },
      { upsert: true },
    );
  }

  private lazyLoading() {
    this._dbCollection = this.database.collection<GungiData>('Gungi');
  }
}
