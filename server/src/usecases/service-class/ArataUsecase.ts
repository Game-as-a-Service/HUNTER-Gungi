import IRepository from '../Repository';
import Gungi from '../../domain/Gungi';
import EventBus from '../EventBus';
import Presenter from '../Presenter';
import GOMA from '../../domain/constant/GOMA';
import SIDE from '../../domain/constant/SIDE';
import { Inject, Injectable } from '@nestjs/common';
import Coordinate from '../../domain/Coordinate';
import Usecase from '../Usecase';
import { InitRequest } from '../../frameworks/data-services/GungiRepository';

export interface ArataRequest {
  gungiId: string;
  playerId: string;
  goma: {
    name: GOMA;
    side: SIDE;
  };
  to: {
    x: number;
    y: number;
    z: number;
  };
}

@Injectable()
export default class ArataUsecase implements Usecase<ArataRequest> {
  constructor(
    @Inject('GungiRepository')
    private _gungiRepository: IRepository<Gungi, InitRequest>,
    @Inject('EventBus')
    private _eventBus: EventBus,
  ) {}

  async present<View>(request: ArataRequest, presenter: Presenter<View>) {
    const gungi = await this._gungiRepository.findById(request.gungiId);
    const player = gungi.getPlayer(request.playerId);

    const to = new Coordinate(request.to.x, request.to.y, request.to.z);
    const targetGoma = request.goma;

    const events = gungi.arata(player, targetGoma, to);
    await this._gungiRepository.save(gungi);
    this._eventBus.broadcast(events);

    return presenter.present(events);
  }
}
