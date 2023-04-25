import { Module } from '@nestjs/common';
import GungiModule from './module/gungi.module';

@Module({
  imports: [GungiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
