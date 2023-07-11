import { Inject, Injectable } from '@nestjs/common';
import EventBus from '../EventBus';
import IRepository from '../Repository';
import Gungi from '../../domain/Gungi';
import Presenter from '../Presenter';
import { GameState } from '../../domain/constant/GameState';

export interface ConfigurationRequest {
  gungiId: string;
  playerId: string;
}

@Injectable()
export default class ConfigurationUsecase {
  constructor(
    @Inject('GungiRepository')
    private _gungiRepository: IRepository<Gungi>,
    @Inject('EventBus')
    private _eventBus: EventBus,
  ) {}

  async execute<R>(request: ConfigurationRequest, presenter: Presenter<R>) {
    const gungi = await this._gungiRepository.findById(request.gungiId);

    if (gungi.getState() !== GameState.FURIGOMA_DONE) {
      throw Error('在錯誤的遊戲狀態呼叫');
    }

    const events = gungi.setConfiguration();
    await this._gungiRepository.save(gungi);
    this._eventBus.broadcast(events);

    return presenter.present(events);
  }
}
