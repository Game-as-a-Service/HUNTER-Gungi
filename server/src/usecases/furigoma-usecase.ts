import { Inject, Injectable } from '@nestjs/common';
import EventBus from './eventBus';
import IRepository from './repository.abstract';
import Gungi from '../domain/Gungi';

@Injectable()
export default class FurigomaUsecase {
  constructor(
    @Inject('GungiRepository')
    private gungiRepository: IRepository<Gungi>,
    @Inject(EventBus)
    private _eventBus: EventBus,
  ) {}

  async execute() {
    return;
  }
}
