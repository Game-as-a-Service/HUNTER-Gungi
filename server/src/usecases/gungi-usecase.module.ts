import { Module } from '@nestjs/common';
import FurigomaUsecase from './furigoma-usecase';
import SurrenderUsecase from './surrender-usecase';
import { DataServicesModule } from '../frameworks/data-services/data-service-module';

@Module({
  imports: [DataServicesModule],
  providers: [FurigomaUsecase, SurrenderUsecase],
  exports: [FurigomaUsecase, SurrenderUsecase],
})
export default class GungiUsecaseModule {}
