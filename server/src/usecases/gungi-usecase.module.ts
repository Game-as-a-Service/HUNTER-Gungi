import { Module } from '@nestjs/common';
import SurrenderUsecase from './surrender-usecase';
import { GungiRepositoryModule } from '../frameworks/data-services/gungiRepository.module';
import EventBus from './eventBus';
import FurigomaUsecase from './furigoma-usecase';

@Module({
  imports: [GungiRepositoryModule],
  providers: [SurrenderUsecase, FurigomaUsecase, EventBus],
  exports: [SurrenderUsecase, FurigomaUsecase],
})
export default class GungiUsecaseModule {}
