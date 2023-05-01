import { Module } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';
import { IDataServices } from 'src/data-services/abstract/data-services.abstract';
import MongoGungiDao from './dao/gungi.dao';
import MongoGungiDataModel from './data-model/gungi-data.model';
import { MongoDataServices } from './mongo-data-services.service';
import { MongoGungiRepository } from './gungi-mongo-repository';

@Module({
  providers: [
    MongoGungiDao,
    MongoGungiDataModel,
    MongoGungiRepository,
    {
      provide: IDataServices,
      useClass: MongoDataServices,
    },
    //  TODO: ここでMongoClientを生成するのは微妙な気がする
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async (): Promise<Db> => {
        try {
          const client = await MongoClient.connect(process.env.DB_CONN_STRING);
          return client.db(process.env.DB_NAME);
        } catch (err) {
          throw err;
        }
      },
    },
  ],
  exports: [IDataServices],
})
export class MongoDataServicesModule {}
