import { Collection, Db, MongoClient } from 'mongodb';
import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import {GungiData} from "../GungiData";

@Injectable()
export default class GungiDao {
  private _dbCollection: Collection;

  constructor(@Inject('database') private readonly database: Db) {}

  async findById(id: string) {
    if (!this._dbCollection) {
      this.lazyLoading();
    }
    const gungiObjectId = new Object(id);
    const gungi = await this._dbCollection.findOne({ _id: gungiObjectId });
    return gungi;
  }

  async save(gungi: GungiData) {
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
