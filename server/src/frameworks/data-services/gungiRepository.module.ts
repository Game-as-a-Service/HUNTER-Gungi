import { Module } from '@nestjs/common';

import GungiDao from './dao/gungi.dao';
import GungiDataModel from './data-model/gungi-data-model';

import { GungiRepository } from './gungi-repository';
import { MongoConnectionModule } from './mongodb.module';
import Gungi from '../../domain/Gungi';

@Module({
  imports: [MongoConnectionModule],
  providers: [GungiDao, GungiDataModel, GungiRepository],
  /* exports: [IRepository], */
  exports: [GungiRepository],
})
export class GungiRepositoryModule {}