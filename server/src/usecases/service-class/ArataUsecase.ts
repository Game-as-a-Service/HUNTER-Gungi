import IRepository from '../Repository';
import Gungi from '../../domain/Gungi';
import { Inject, Injectable } from '@nestjs/common';
import EventBus from '../EventBus';
import Presenter from '../Presenter';
import SIDE from '../../domain/constant/SIDE';
import GOMA from '../../domain/constant/GOMA';

export interface ArataRequest {
  gungiId: string;
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
    private repository: IRepository<Gungi>,
    @Inject('EventBus')
    private eventBus: EventBus,
  ) {}

  async execute(request: ArataRequest, presenter: Presenter) {
    return;
  }
}
