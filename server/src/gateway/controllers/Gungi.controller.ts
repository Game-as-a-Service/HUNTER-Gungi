import { Body, Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import FurigomaUsecase from '../../usecases/service-class/FurigomaUsecase';
import SurrenderUsecase, {
  SurrenderRequest,
} from '../../usecases/service-class/SurrenderUsecase';
import SurrenderPresenter from '../presenter/SurrenderPresenter';
import LEVEL from '../../domain/constant/LEVEL';
import CreateGungiUsecase, {
  CreateGungiRequest,
} from '../../usecases/service-class/CreateGungiUsecase';
import CreateGungiPresenter from '../presenter/CreateGungiPresenter';

@Controller()
export default class GungiController {
  constructor(
    private _furigomaUsecase: FurigomaUsecase,
    private _surrenderUsecase: SurrenderUsecase,
    private _createGungiUsecase: CreateGungiUsecase,
  ) {}

  @Post('/gungi/:id/furigoma')
  async furigoma(@Param('id') id: string, @Body() body: any) {
    // set temp
    const request = {
      gungiId: id,
      body,
    };

    const response = await this._furigomaUsecase.execute();
    return response;
  }

  @Post('/gungi/:id/surrender')
  async surrender(
    @Param('id') id: string,
    @Body() body: { playerId: string },
    @Res() res,
  ) {
    const request: SurrenderRequest = {
      gungiId: id,
      playerId: body.playerId,
    };

    const presenter = new SurrenderPresenter();
    const response = await this._surrenderUsecase.execute(request, presenter);

    return res.status(HttpStatus.OK).send(response);
  }

  @Post('/gungi')
  async createGungi(
    @Body()
    body: {
      level: LEVEL;
      playerA: { id: string; name: string };
      playerB: { id: string; name: string };
    },
    @Res() res,
  ) {
    const request: CreateGungiRequest = body;

    const presenter = new CreateGungiPresenter();
    const response = await this._createGungiUsecase.execute(request, presenter);

    return res.status(200).send(response);
  }
}
