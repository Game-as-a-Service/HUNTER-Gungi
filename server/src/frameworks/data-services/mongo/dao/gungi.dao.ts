import { Collection, Db } from 'mongodb';
import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Dao } from 'src/repositories/abstract/dao';
import { MongoGungiData } from '../data/gungi.data';

@Injectable()
export default class MongoGungiDao implements Dao<MongoGungiData> {
  private _dbCollection: Collection;

  constructor(@Inject('database') private readonly database: Db) {}

  async findById(id: string): Promise<MongoGungiData> {
    if (!this._dbCollection) {
      this.lazyLoading();
    }
    const gungiObjectId = new Object(id);
    const gungi = await this._dbCollection.findOne({ _id: gungiObjectId });
    return gungi;
  }

  async save(gungi: MongoGungiData) {
    if (!this._dbCollection) {
      this.lazyLoading();
    }
    const gungiObjectId = new Object(gungi._id);
    await this._dbCollection.updateOne(
      { _id: gungiObjectId },
      { $set: gungi },
      { upsert: true },
    );
  }

  private lazyLoading() {
    this._dbCollection = this.database.collection('Gungi');
  }
}
