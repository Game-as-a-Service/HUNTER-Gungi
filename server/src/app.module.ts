import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import GungiController from './gateway/controllers/Gungi.controller';
import GungiUsecaseModule from './usecases/GungiUsecase.module';
import { DataServicesModule } from './frameworks/data-services/DataService.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DataServicesModule,
    GungiUsecaseModule,
  ],
  controllers: [GungiController],
  providers: [],
})
export class AppModule {}
