import Usecase from '../Usecase';
import Presenter from '../Presenter';
import CreateEvent from '../../domain/events/CreateEvent';
import { Inject, Injectable } from '@nestjs/common';
import IRepository from '../Repository';
import Gungi from '../../domain/Gungi';
import EventBus from '../EventBus';
import { randomUUID } from 'crypto';
import LEVEL from '../../domain/constant/LEVEL';
import Player from '../../domain/Player';
import GungiHan from '../../domain/GungiHan';
import SIDE from '../../domain/constant/SIDE';
import DeadArea from '../../domain/DeadArea';
import GomaOki from '../../domain/GomaOki';
import EVENT_NAME from '../../domain/constant/EVENT_NAME';

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
    const level = LEVEL.BEGINNER;
    const gungi = new Gungi(
      randomUUID(),
      level,
      request.players.map<Player>((player, index) => {
        const side = index === 0 ? SIDE.WHITE : SIDE.BLACK;
        const deadArea = new DeadArea(side, []);
        const gomaOki = new GomaOki(level, side, []);
        return new Player(player.id, player.nickname, side, gomaOki, deadArea);
      }),
      new GungiHan(level),
    );
    gungi.setCurrentTurn(SIDE.WHITE);

    await this._gungiRepository.save(gungi);

    const event: CreateEvent = {
      name: EVENT_NAME.CREATE_GUNGI,
      data: {
        gungiId: gungi.id,
      },
    };
    return presenter.present([event]);
  }
}
