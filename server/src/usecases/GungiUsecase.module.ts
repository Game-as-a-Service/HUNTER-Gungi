import { Module } from '@nestjs/common';
import SurrenderUsecase from './service-class/SurrenderUsecase';
import { GungiRepositoryModule } from '../frameworks/data-services/GungiRepository.module';
import FurigomaUsecase from './service-class/FurigomaUsecase';
import ImplEventBus from '../gateway/eventBus/ImplEventBus';
import ArataUsecase from './service-class/ArataUsecase';
import ConfigurationUsecase from './service-class/ConfigurationUsecase';
import CreateUsecase from './service-class/CreateUsecase';

@Module({
  imports: [GungiRepositoryModule],
  providers: [
    CreateUsecase,
    SurrenderUsecase,
    FurigomaUsecase,
    ArataUsecase,
    ConfigurationUsecase,
    {
      provide: 'EventBus',
      useClass: ImplEventBus,
    },
  ],
  exports: [
    CreateUsecase,
    SurrenderUsecase,
    FurigomaUsecase,
    ConfigurationUsecase,
    ArataUsecase,
  ],
})
export default class GungiUsecaseModule {}
