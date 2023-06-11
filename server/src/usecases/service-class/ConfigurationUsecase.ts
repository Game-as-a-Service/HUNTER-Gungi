import { Inject, Injectable } from '@nestjs/common';
import EventBus from '../EventBus';
import IRepository from '../Repository';
import Gungi from '../../domain/Gungi';
import Presenter from '../Presenter';

export interface ConfigurationRequest {
  gungiId: string;
  playerId: string;
}

@Injectable()
export default class ConfigurationUsecase {
  constructor(
    @Inject('GungiRepository')
    private _gungiRepository: IRepository<Gungi>,
    @Inject('EventBus')
    private _eventBus: EventBus,
  ) {}

  async execute<R>(request: ConfigurationRequest, presenter: Presenter<R>) {
    const gungi = await this._gungiRepository.findById(request.gungiId);
    // const player = gungi.getPlayer(request.playerId);
    const events = gungi.setConfiguration();
    await this._gungiRepository.save(gungi);
    this._eventBus.broadcast(events);

    return presenter.present(events);
  }
}
