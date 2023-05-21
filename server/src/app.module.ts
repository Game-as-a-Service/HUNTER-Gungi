import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import GungiController from './gateway/controllers/gungi.controller';
import GungiUsecaseModule from './usecases/gungi-usecase.module';
import { DataServicesModule } from './frameworks/data-services/data-service-module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './server/.env',
    }),
    DataServicesModule,
    GungiUsecaseModule,
  ],
  controllers: [GungiController],
  providers: [],
})
export class AppModule {}
