import { Module } from '@nestjs/common';
import SurrenderUsecase from './surrender-usecase';
import { GungiRepositoryModule } from '../frameworks/data-services/gungiRepository.module';
import EventBus from './eventBus';
import FurigomaUsecase from './furigoma-usecase';
import ImplEventBus from '../frameworks/eventBus/ImplEventBus';

@Module({
  imports: [GungiRepositoryModule],
  providers: [
    SurrenderUsecase,
    FurigomaUsecase,
    {
      provide: 'EventBus',
      useClass: ImplEventBus,
    },
  ],
  exports: [SurrenderUsecase, FurigomaUsecase],
})
export default class GungiUsecaseModule {}
