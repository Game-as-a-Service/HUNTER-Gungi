import GungiRepository from '../repository/GungiRepository';
import { Injectable } from '@nestjs/common';
import EventBus from '../eventBus/eventBus';
import { response } from 'express';

interface SurrenderRequest {
  gungiId: string;
  player: string;
}

@Injectable()
export default class SurrenderUsecase {
  constructor(
    private _gungiRepository: GungiRepository,
    private _eventBus: EventBus,
  ) {}

  async execute(request: SurrenderRequest) {
    const gungi = await this._gungiRepository.findById(request.gungiId);
    const player = gungi.getPlayer(request.player);
    const events = gungi.surrender(player);
    await this._gungiRepository.save(gungi);
    this._eventBus.broadcast(events);
    return response;
  }
}
