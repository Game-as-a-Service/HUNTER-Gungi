import { Body, Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import FurigomaUsecase from '../../usecases/service-class/FurigomaUsecase';
import SurrenderUsecase, {
  SurrenderRequest,
} from '../../usecases/service-class/SurrenderUsecase';
import FurigomaPresenter, {
  FurigomaView,
} from '../presenter/FurigomaPresenter';
import { FurigomaRequest } from '../../usecases/service-class/FurigomaUsecase';
import SurrenderPresenter from '../presenter/SurrenderPresenter';
import SIDE from '../../domain/constant/SIDE';
import GOMA from '../../domain/constant/GOMA';
import ArataPresenter from '../presenter/ArataPresenter';
import ArataUsecase, {
  ArataRequest,
} from '../../usecases/service-class/ArataUsecase';
import ConfigurationUsecase, {
  ConfigurationRequest,
} from '../../usecases/service-class/ConfigurationUsecase';
import ConfigurationPresenter from '../presenter/ConfigurationPresenter';

@Controller()
export default class GungiController {
  constructor(
    private _furigomaUsecase: FurigomaUsecase,
    private _surrenderUsecase: SurrenderUsecase,
    private _arataUsecase: ArataUsecase,
    private _configurationUsecase: ConfigurationUsecase,
  ) {}

  @Post('/gungi/:gungiId/furigoma')
  async furigoma(
    @Param('gungiId') gungiId: string,
    @Body() body: { gungiId: string; playerId: string },
    @Res() res,
  ) {
    const presenter = new FurigomaPresenter();
    const input: FurigomaRequest = { gungiId, playerId: body.playerId };
    const response: FurigomaView = await this._furigomaUsecase.execute(
      input,
      presenter,
    );
    return res.status(HttpStatus.OK).send(response);
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

  @Post('/gungi/:id/configuration')
  async configuration(
    @Param('id') id: string,
    @Body() body: { playerId: string },
    @Res() res,
  ) {
    const request: ConfigurationRequest = {
      gungiId: id,
      playerId: body.playerId,
    };

    const presenter = new ConfigurationPresenter();
    const response = await this._configurationUsecase.execute(
      request,
      presenter,
    );

    return res.status(HttpStatus.OK).send(response);
  }
}
