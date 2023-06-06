import { Body, Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import FurigomaUsecase from '../../usecases/service-class/FurigomaUsecase';
import SurrenderUsecase, {
  SurrenderRequest,
} from '../../usecases/service-class/SurrenderUsecase';
import SurrenderPresenter from '../presenter/SurrenderPresenter';
import SIDE from '../../domain/constant/SIDE';
import GOMA from '../../domain/constant/GOMA';
import ArataPresenter from '../presenter/ArataPresenter';
import ArataUsecase, { ArataRequest } from '../../usecases/service-class/ArataUsecase';

@Controller()
export default class GungiController {
  constructor(
    private _furigomaUsecase: FurigomaUsecase,
    private _surrenderUsecase: SurrenderUsecase,
    private _arataUsecase: ArataUsecase,
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

  @Post('/gungi/:id/arata')
  async arata(
    @Param('id') id: string,
    @Body()
    body: {
      playerId: string;
      goma: {
        name: GOMA;
        side: SIDE;
      };
      to: {
        x: number;
        y: number;
        z: number;
      };
    },
    @Res() res,
  ) {
    // Transform the body to request here
    const request: ArataRequest = {
      gungiId: id,
      playerId: body.playerId,
      goma: body.goma,
      to: body.to,
    };

    const presenter = new ArataPresenter();

    const response = await this._arataUsecase.execute(request, presenter);

    return res.status(HttpStatus.OK).send(response);
  }
}
