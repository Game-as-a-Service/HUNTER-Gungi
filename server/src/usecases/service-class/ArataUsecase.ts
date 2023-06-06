import IRepository from '../Repository';
import Gungi from '../../domain/Gungi';
import EventBus from '../EventBus';
import Presenter from '../Presenter';
import GOMA from '../../domain/constant/GOMA';
import SIDE from '../../domain/constant/SIDE';
import { Inject, Injectable } from '@nestjs/common';
import Coordinate from '../../domain/Coordinate';

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
export default class ArataUsecase {
  constructor(
    @Inject('GungiRepository')
    private _gungiRepository: IRepository<Gungi>,
    @Inject('EventBus')
    private _eventBus: EventBus,
  ) {}

  async execute<R>(request: ArataRequest, presenter: Presenter<R>) {
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
