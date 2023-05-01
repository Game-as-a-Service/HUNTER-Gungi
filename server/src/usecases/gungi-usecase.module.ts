import { Module } from '@nestjs/common';
import FurigomaUsecase from './furigoma-usecase';
import SurrenderUsecase from './surrender-usecase';
import { DataServicesModule } from 'src/data-services/data-services.module';

@Module({
  imports: [DataServicesModule],
  providers: [FurigomaUsecase, SurrenderUsecase],
  exports: [FurigomaUsecase, SurrenderUsecase],
})
export default class GungiUsecaseModule {}
