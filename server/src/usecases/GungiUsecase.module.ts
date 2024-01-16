import { Module } from '@nestjs/common';
import SurrenderUsecase from './service-class/SurrenderUsecase';
import { GungiRepositoryModule } from '../frameworks/data-services/GungiRepository.module';
import FurigomaUsecase from './service-class/FurigomaUsecase';
import { ImplEventBus } from '../gateway/eventBus/ImplEventBus';
import ArataUsecase from './service-class/ArataUsecase';
import ConfigurationUsecase from './service-class/ConfigurationUsecase';
import CreateUsecase from './service-class/CreateUsecase';
import GetGungiUsecase from './service-class/GetGungiUsecase';
import ArataEventHandler from '../gateway/eventBus/eventHandler/class/ArataEventHandler';
import ConfigurationEventHandler from '../gateway/eventBus/eventHandler/class/ConfigurationEventHandler';
import FurigomaEventHandler from '../gateway/eventBus/eventHandler/class/FurigomaEventHandler';
import SurrenderEventHandler from '../gateway/eventBus/eventHandler/class/SurrenderEventHandler';
import { Server } from 'socket.io';

@Module({
  imports: [GungiRepositoryModule],
  providers: [
    CreateUsecase,
    SurrenderUsecase,
    FurigomaUsecase,
    ArataUsecase,
    ConfigurationUsecase,
    GetGungiUsecase,
    {
      provide: 'EventBus',
      useFactory: () => {
        const eventHandler = new SurrenderEventHandler(
          new ConfigurationEventHandler(
            new FurigomaEventHandler(new ArataEventHandler(null)),
          ),
        );
        const server = new Server();

        return new ImplEventBus(server, eventHandler);
      },
    },
  ],
  exports: [
    CreateUsecase,
    SurrenderUsecase,
    FurigomaUsecase,
    ConfigurationUsecase,
    ArataUsecase,
    GetGungiUsecase,
  ],
})
export default class GungiUsecaseModule {}
