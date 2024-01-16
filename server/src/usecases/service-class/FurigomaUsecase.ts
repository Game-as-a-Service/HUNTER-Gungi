import { Inject, Injectable } from '@nestjs/common';
import EventBus from '../EventBus';
import IRepository from '../Repository';
import Gungi from '../../domain/Gungi';
import { Event } from '../../domain/events/Event';
import Presenter from '../Presenter';
import Usecase from '../Usecase';

export type FurigomaRequest = {
  gungiId: string;
  playerId: string;
};

@Injectable()
export default class FurigomaUsecase implements Usecase<FurigomaRequest> {
  constructor(
    @Inject('GungiRepository')
    private _gungiRepository: IRepository<Gungi>,
    @Inject('EventBus')
    private _eventBus: EventBus,
  ) {}

  async present<R>(
    request: FurigomaRequest,
    presenter: Presenter<R>,
  ): Promise<R> {
    const gungi = await this._gungiRepository.findById(request.gungiId);
    const player = gungi.getPlayer(request.playerId);
    const opponent = gungi.getOpponent(player);
    // furigoma - roll five hei to determine who goes first
    const event: Event[] = await gungi.furigoma(player, opponent);
    await this._gungiRepository.save(gungi);
    this._eventBus.broadcast(request.gungiId, event);
    return presenter.present(event);
  }
}
