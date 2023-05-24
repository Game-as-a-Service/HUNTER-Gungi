import { Module } from '@nestjs/common';
import { GungiRepositoryModule } from './GungiRepository.module';

@Module({
  imports: [GungiRepositoryModule],
  exports: [GungiRepositoryModule],
})
export class DataServicesModule {}
