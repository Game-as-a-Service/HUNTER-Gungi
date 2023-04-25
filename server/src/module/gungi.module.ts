import { Module } from '@nestjs/common';
import GungiController from '../controller/GungiController';
import FurigomaUsecase from '../usecase/FurigomaUsecase';
import GungiDao from '../repository/DAO/GungiDao';
import GungiDataModel from '../repository/dataModel/GungiDataModel';
import GungiRepository from '../repository/GungiRepository';
import SurrenderUsecase from '../usecase/SurrenderUsecase';
import EventBus from '../eventBus/eventBus';
import { MongoClient } from 'mongodb';

@Module({
  imports: [],
  controllers: [GungiController],
  providers: [
    FurigomaUsecase,
    SurrenderUsecase,
    GungiDao,
    GungiDataModel,
    GungiRepository,
    EventBus,
    //  TODO: ここでMongoClientを生成するのは微妙な気がする
    {
      provide: 'database',
      useFactory: () => {
        const client = new MongoClient('mongodb://localhost/gungi');
        return client.db();
      },
    },
  ],
})
export default class GungiModule {}
