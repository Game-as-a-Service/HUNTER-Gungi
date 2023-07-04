import { Module } from '@nestjs/common';
import SurrenderUsecase from './service-class/SurrenderUsecase';
import { GungiRepositoryModule } from '../frameworks/data-services/GungiRepository.module';
import EventBus from './EventBus';
import FurigomaUsecase from './service-class/FurigomaUsecase';
import ImplEventBus from '../gateway/eventBus/ImplEventBus';
import ConfigurationUsecase from './service-class/ConfigurationUsecase';

@Module({
  imports: [GungiRepositoryModule],
  providers: [
    SurrenderUsecase,
    FurigomaUsecase,
    ConfigurationUsecase,
    {
      provide: 'EventBus',
      useClass: ImplEventBus,
    },
  ],
  exports: [SurrenderUsecase, FurigomaUsecase, ConfigurationUsecase],
})
export default class GungiUsecaseModule {}
