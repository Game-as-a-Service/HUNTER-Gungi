import { Module } from '@nestjs/common';

import GungiDao from './dao/GungiDao';
import GungiDataModel from './data-model/GungiDataModel';

import { GungiRepository } from './GungiRepository';
import { MongoConnectionModule } from './Mongodb.module';

@Module({
  imports: [MongoConnectionModule],
  providers: [
    GungiDao,
    GungiDataModel,
    {
      provide: 'GungiRepository',
      useClass: GungiRepository,
    },
  ],
  exports: ['GungiRepository'],
})
export class GungiRepositoryModule {}
