import { Inject, Injectable } from '@nestjs/common';
import EventBus from './eventBus';
import { response } from 'express';
import IRepository from './repository.abstract';
import Gungi from '../domain/Gungi';

interface SurrenderRequest {
  gungiId: string;
  player: string;
}

@Injectable()
export default class SurrenderUsecase {
  constructor(
    @Inject('GungiRepository')
    private gungiRepository: IRepository<Gungi>,
    private _eventBus: EventBus,
  ) {}

  async execute(request: SurrenderRequest) {
    const gungi = await this.gungiRepository.get(request.gungiId);
    const player = gungi.getPlayer(request.player);
    const events = gungi.surrender(player);
    await this.gungiRepository.save(gungi);
    this._eventBus.broadcast(events);
    return response;
  }
}
