import { Module } from '@nestjs/common';
import { GungiRepositoryModule } from './gungiRepository.module';

@Module({
  imports: [GungiRepositoryModule],
  exports: [GungiRepositoryModule], // 將 'MongoDataServices' 加入 exports
})
export class DataServicesModule {}
