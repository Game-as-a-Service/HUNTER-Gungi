import { Injectable } from '@nestjs/common';
import EventBus from '../eventBus/eventBus';
import { response } from 'express';
import { IDataServices } from 'src/data-services/abstract/data-services.abstract';

interface SurrenderRequest {
  gungiId: string;
  player: string;
}

@Injectable()
export default class SurrenderUsecase {
  constructor(
    private dataServices: IDataServices,
    private _eventBus: EventBus,
  ) {}

  async execute(request: SurrenderRequest) {
    const gungi = await this.dataServices.gungi.get(request.gungiId);
    const player = gungi.getPlayer(request.player);
    const events = gungi.surrender(player);
    await this.dataServices.gungi.save(gungi);
    this._eventBus.broadcast(events);
    return response;
  }
}
