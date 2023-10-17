import Usecase from '../Usecase';
import Presenter from '../Presenter';
import CreateEvent from '../../domain/events/CreateEvent';
import { Inject, Injectable } from '@nestjs/common';
import IRepository from '../Repository';
import Gungi from '../../domain/Gungi';
import EventBus from '../EventBus';
import LEVEL from '../../domain/constant/LEVEL';

export type CreateGungiRequest = {
  players: { id: string; nickname: string }[];
};

@Injectable()
export default class CreateUsecase implements Usecase<CreateGungiRequest> {
  constructor(
    @Inject('GungiRepository')
    private _gungiRepository: IRepository<Gungi>,
    @Inject('EventBus')
    private _eventBus: EventBus,
  ) {}

  async present<View>(
    request: CreateGungiRequest,
    presenter: Presenter<View>,
  ): Promise<View> {
    const initRequest = {
      level: LEVEL.BEGINNER,
      players: request.players.map((player) => ({
        id: player.id,
        name: player.nickname,
      })),
    };

    const gungi = this._gungiRepository.create(initRequest);
    await this._gungiRepository.save(gungi);

    const event: CreateEvent = {
      name: 'CreateEvent',
      data: {
        gungiId: gungi.id,
      },
    };
    return presenter.present([event]);
  }
}
