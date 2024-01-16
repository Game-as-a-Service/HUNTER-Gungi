import Usecase from '../Usecase';
import Presenter from '../Presenter';
import { Inject, Injectable } from '@nestjs/common';
import IRepository from '../Repository';
import Gungi from '../../domain/Gungi';
import EventBus from '../EventBus';
import GetGungiEvent from '../../domain/events/GetGungiEvent';
import EVENT_NAME from '../../domain/constant/EVENT_NAME';

export interface GetGungiRequest {
  gungiId: string;
}

@Injectable()
export default class GetGungiUsecase implements Usecase<GetGungiRequest> {
  constructor(
    @Inject('GungiRepository')
    private _gungiRepository: IRepository<Gungi>,
    @Inject('EventBus')
    private _eventBus: EventBus,
  ) {}

  async present<View>(
    request: GetGungiRequest,
    presenter: Presenter<View>,
  ): Promise<View> {
    const gungi = await this._gungiRepository.findById(request.gungiId);
    const event: GetGungiEvent = {
      name: EVENT_NAME.GET_GUNGI,
      data: {
        gungi,
      },
    };

    return presenter.present([event]);
  }
}
