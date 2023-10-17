import { Inject, Injectable } from '@nestjs/common';
import EventBus from '../EventBus';
import IRepository from '../Repository';
import Gungi from '../../domain/Gungi';
import Presenter from '../Presenter';
import Usecase from '../Usecase';

export interface SurrenderRequest {
  gungiId: string;
  playerId: string;
}

@Injectable()
export default class SurrenderUsecase implements Usecase<SurrenderRequest> {
  constructor(
    @Inject('GungiRepository')
    private _gungiRepository: IRepository<Gungi>,
    @Inject('EventBus')
    private _eventBus: EventBus,
  ) {}

  async present<View>(request: SurrenderRequest, presenter: Presenter<View>) {
    const gungi = await this._gungiRepository.findById(request.gungiId);
    const player = gungi.getPlayer(request.playerId);
    const events = gungi.surrender(player);
    await this._gungiRepository.save(gungi);
    this._eventBus.broadcast(events);

    return presenter.present(events);
  }
}
