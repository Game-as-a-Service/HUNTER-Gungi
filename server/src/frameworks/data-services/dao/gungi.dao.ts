import { Collection, Db, ObjectId } from 'mongodb';
import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Dao } from 'src/frameworks/data-services/dao/dao';
import { GungiData } from 'src/frameworks/data-services/gungi-data';

@Injectable()
export default class GungiDao implements Dao<GungiData> {
  private _dbCollection: Collection<GungiData>;

  constructor(@Inject('DATABASE_CONNECTION') private readonly database: Db) {}

  async findById(id: string): Promise<GungiData> {
    if (!this._dbCollection) {
      this.lazyLoading();
    }
    const gungiObjectId = new ObjectId(id);
    const gungi = await this._dbCollection.findOne({ id: gungiObjectId });
    return gungi;
  }

  async save(gungi: GungiData) {
    if (!this._dbCollection) {
      this.lazyLoading();
    }
    const gungiObjectId = new ObjectId(gungi._id);
    await this._dbCollection.updateOne(
      { id: gungiObjectId },
      { $set: gungi },
      { upsert: true },
    );
  }

  private lazyLoading() {
    this._dbCollection = this.database.collection<GungiData>('Gungi');
  }
}
