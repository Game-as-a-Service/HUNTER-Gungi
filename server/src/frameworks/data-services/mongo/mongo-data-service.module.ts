import { Module } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { IDataServices } from 'src/repositories/abstract/data-services.abstract';
import { MongoDataServices } from './mongo-data-services.service';

@Module({
  providers: [
    {
      provide: IDataServices,
      useClass: MongoDataServices,
    },
    //  TODO: ここでMongoClientを生成するのは微妙な気がする
    {
      provide: 'database',
      useFactory: () => {
        const client = new MongoClient('mongodb://localhost/gungi');
        return client.db();
      },
    },
  ],
  exports: [IDataServices],
})
export class MongoDataServicesModule {}
