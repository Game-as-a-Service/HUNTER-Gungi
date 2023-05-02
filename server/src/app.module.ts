import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import GungiController from './controllers/gungi.controller';
import { DataServicesModule } from './data-services/data-services.module';
import GungiUsecaseModule from './usecases/gungi-usecase.module';

@Module({
  // EventBusModule
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
