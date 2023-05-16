import { Module } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';

import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  providers: [
    {
      provide: 'MongoConnection',
      useFactory: async (): Promise<MongoClient> => {
        try {
          const client = await MongoClient.connect(process.env.DB_CONN_STRING);
          return client;
        } catch (err) {
          throw err;
        }
      },
    },
  ],
  exports: ['MongoConnection'], // 將 'MongoDataServices' 加入 exports
})
export class MongoConnectionModule {}
