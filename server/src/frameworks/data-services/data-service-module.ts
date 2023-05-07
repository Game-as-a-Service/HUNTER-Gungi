import { Module } from '@nestjs/common';
import { GungiRepositoryModule } from './gungiRepository.module';

@Module({
  imports: [GungiRepositoryModule],
  exports: [GungiRepositoryModule],
})
export class DataServicesModule {}
