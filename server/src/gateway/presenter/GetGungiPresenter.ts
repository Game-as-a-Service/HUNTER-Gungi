import Presenter from '../../usecases/Presenter';
import { Event, findByEventName } from '../../domain/events/Event';
import { GameState } from '../../domain/constant/GameState';
import GungiDataModel from '../../frameworks/data-services/data-model/GungiDataModel';
import SIDE from '../../domain/constant/SIDE';
import GOMA from '../../domain/constant/GOMA';
import Gungi from '../../domain/Gungi';
import GetGungiEvent from '../../domain/events/GetGungiEvent';
import { ERROR_MESSAGE } from '../../domain/constant/ERROR_MESSAGE';

type GomaData = {
  side: SIDE;
  name: GOMA;
};

type CoordinateDate = {
  x: number;
  y: number;
  z: number;
};

interface GetGungiView {
  state: GameState;
  currentTurn: SIDE;
  players: {
    id: string;
    name: string;
    side: SIDE;
    deadArea: {
      gomas: GomaData[];
    };
    gomaOki: {
      gomas: GomaData[];
    };
  }[];
  gungiHan: {
    goma: GomaData;
    coordinate: CoordinateDate;
  }[];
}

export default class GetGungiPresenter implements Presenter<GetGungiView> {
  present(events: Event[]): GetGungiView {
    const event = findByEventName(events, 'GetGungi') as GetGungiEvent;
    const { gungi } = event.data;
    const gungiDataModel = new GungiDataModel();
    const gungiData = gungiDataModel.toData(gungi);
    const players = gungiData.players;
    const state = this.getGameState(gungi);

    return {
      state,
      currentTurn: gungiData.currentTurn,
      players,
      gungiHan: gungiData.gungiHan.han,
    };
  }

  private getGameState(gungi: Gungi) {
    if (!gungi.sente && !gungi.gote) {
      return GameState.GAME_INIT;
    }
    if (gungi.sente && gungi.gote) {
      if (gungi.winner) {
        return GameState.GAME_END;
      }
      if (gungi.gungiHan.getAllGoma().length === 0) {
        return GameState.FURIGOMA_DONE;
      }
      return GameState.GAME_START;
    }
    throw new Error(ERROR_MESSAGE.UNKNOWN_GAME_STATE);
  }
}
