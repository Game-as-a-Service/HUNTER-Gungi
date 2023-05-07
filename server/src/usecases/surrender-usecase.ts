import { Inject, Injectable } from '@nestjs/common';
import EventBus from './eventBus';
import IRepository from './repository.abstract';
import Gungi from '../domain/Gungi';
import Presenter from './Presenter';

export interface SurrenderRequest {
  gungiId: string;
  playerId: string;
}

@Injectable()
export default class SurrenderUsecase {
  constructor(
    @Inject('GungiRepository')
    private _gungiRepository: IRepository<Gungi>,
    @Inject('EventBus')
    private _eventBus: EventBus,
  ) {}

  async execute(request: SurrenderRequest, presenter: Presenter) {
    const gungi = await this._gungiRepository.findById(request.gungiId);
    const player = gungi.getPlayer(request.playerId);
    const events = gungi.surrender(player);
    await this._gungiRepository.save(gungi);
    this._eventBus.broadcast(events);

    return presenter.present(events);
  }
}
