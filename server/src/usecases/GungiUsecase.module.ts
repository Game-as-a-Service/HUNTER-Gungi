import { Module } from '@nestjs/common';
import SurrenderUsecase from './service-class/SurrenderUsecase';
import { GungiRepositoryModule } from '../frameworks/data-services/GungiRepository.module';
import FurigomaUsecase from './service-class/FurigomaUsecase';
import ImplEventBus from '../gateway/eventBus/ImplEventBus';
import ArataUsecase from './service-class/ArataUsecase';
import ConfigurationUsecase from './service-class/ConfigurationUsecase';
import GetGungiUsecase from './service-class/GetGungiUsecase';

@Module({
  imports: [GungiRepositoryModule],
  providers: [
    SurrenderUsecase,
    FurigomaUsecase,
    ArataUsecase,
    ConfigurationUsecase,
    GetGungiUsecase,
    {
      provide: 'EventBus',
      useClass: ImplEventBus,
    },
  ],
  exports: [
    SurrenderUsecase,
    FurigomaUsecase,
    ConfigurationUsecase,
    ArataUsecase,
    GetGungiUsecase,
  ],
})
export default class GungiUsecaseModule {}
