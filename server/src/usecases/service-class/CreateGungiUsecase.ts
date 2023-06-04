import { Inject, Injectable } from '@nestjs/common';
import Presenter from '../Presenter';
import IRepository from '../Repository';
import Gungi from '../../domain/Gungi';
import EventBus from '../EventBus';
import { randomUUID } from 'crypto';
import { CreateGungiEvent, findEventByName } from '../../domain/events/Event';
import LEVEL from '../../domain/constant/LEVEL';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CreateGungiRequest {
  level: LEVEL;
  playerA: {
    id: string;
    name: string;
  };
  playerB: {
    id: string;
    name: string;
  };
}

@Injectable()
export default class CreateGungiUsecase {
  constructor(
    @Inject('GungiRepository')
    private _gungiRepository: IRepository<Gungi>,
    @Inject('EventBus')
    private _eventBus: EventBus,
  ) {}

  async execute(request: CreateGungiRequest, presenter: Presenter) {
    const initialData = {
      level: request.level,
      playerA: request.playerA,
      playerB: request.playerB,
    };

    const gungi = this._gungiRepository.create(initialData);
    await this._gungiRepository.save(gungi);

    const event: CreateGungiEvent = {
      name: 'CreateGungi',
      data: {
        gungi,
      },
    };

    return presenter.present([event]);
  }
}
