import { Inject, Injectable } from '@nestjs/common';
import EventBus from '../EventBus';
import IRepository from '../Repository';
import Gungi from '../../domain/Gungi';

@Injectable()
export default class FurigomaUsecase {
  constructor(
    @Inject('GungiRepository')
    private gungiRepository: IRepository<Gungi>,
    @Inject('EventBus')
    private _eventBus: EventBus,
  ) {}

  async execute() {
    return;
  }
}
