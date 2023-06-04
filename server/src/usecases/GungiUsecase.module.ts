import { Module } from '@nestjs/common';
import SurrenderUsecase from './service-class/SurrenderUsecase';
import { GungiRepositoryModule } from '../frameworks/data-services/GungiRepository.module';
import EventBus from './EventBus';
import FurigomaUsecase from './service-class/FurigomaUsecase';
import ImplEventBus from '../gateway/eventBus/ImplEventBus';
import ArataUsecase from './service-class/ArataUsecase';

@Module({
  imports: [GungiRepositoryModule],
  providers: [
    SurrenderUsecase,
    FurigomaUsecase,
    ArataUsecase,
    {
      provide: 'EventBus',
      useClass: ImplEventBus,
    },
  ],
  exports: [SurrenderUsecase, FurigomaUsecase, ArataUsecase],
})
export default class GungiUsecaseModule {}
