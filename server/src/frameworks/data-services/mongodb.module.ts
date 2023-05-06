import { Module } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';

@Module({
  providers: [
    {
      provide: 'MongoConnection',
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
  exports: ['MongoConnection'], // 將 'MongoDataServices' 加入 exports
})
export class MongoConnectionModule {}
