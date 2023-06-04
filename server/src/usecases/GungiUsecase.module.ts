import { Module } from '@nestjs/common';
import SurrenderUsecase from './service-class/SurrenderUsecase';
import { GungiRepositoryModule } from '../frameworks/data-services/GungiRepository.module';
import EventBus from './EventBus';
import FurigomaUsecase from './service-class/FurigomaUsecase';
import ImplEventBus from '../gateway/eventBus/ImplEventBus';
import CreateGungiUsecase from './service-class/CreateGungiUsecase';

@Module({
  imports: [GungiRepositoryModule],
  providers: [
    SurrenderUsecase,
    FurigomaUsecase,
    CreateGungiUsecase,
    {
      provide: 'EventBus',
      useClass: ImplEventBus,
    },
  ],
  exports: [SurrenderUsecase, FurigomaUsecase, CreateGungiUsecase],
})
export default class GungiUsecaseModule {}
