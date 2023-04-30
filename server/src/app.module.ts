import { Module } from '@nestjs/common';
import GungiController from './controllers/gungi.controller';
import { DataServicesModule } from './repositories/data-services.module';
import GungiUsecaseModule from './usecases/gungi-usecase.module';

@Module({
  // EventBusModule
  imports: [DataServicesModule, GungiUsecaseModule],
  controllers: [GungiController],
  providers: [],
})
export class AppModule {}
