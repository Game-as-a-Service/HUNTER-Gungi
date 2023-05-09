import { Module } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  providers: [
    {
      provide: 'MongoConnection',
      useFactory: async (): Promise<Db> => {
        try {
          const MONGODB_URL = process.env.DB_CONN_STRING || 'localhost';
          const MONGODB_PORT = process.env.DB_CONN_PORT || 27017;
          const client = await MongoClient.connect(
            `mongodb://${MONGODB_URL}:${MONGODB_PORT}`,
          );
          return client.db();
        } catch (err) {
          throw err;
        }
      },
    },
  ],
  exports: ['MongoConnection'], // 將 'MongoDataServices' 加入 exports
})
export class MongoConnectionModule {}
