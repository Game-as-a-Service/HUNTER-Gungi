import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import FurigomaUsecase, {
  FurigomaRequest,
} from '../../usecases/service-class/FurigomaUsecase';
import SurrenderUsecase, {
  SurrenderRequest,
} from '../../usecases/service-class/SurrenderUsecase';
import FurigomaPresenter, {
  FurigomaView,
} from '../presenter/FurigomaPresenter';
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
import GetGungiUsecase, {
  GetGungiRequest,
} from '../../usecases/service-class/GetGungiUsecase';
import GetGungiPresenter from '../presenter/GetGungiPresenter';
import { ZodPipe } from '../../frameworks/pipe/ZodPipe';
import FurigomaBodyValidator from '../validation/furigoma-body-validation';
import SurrenderBodyValidator from '../validation/surrender-body-validation';
import ArataBodyValidator from '../validation/arata-body-validation';
import ConfigurationBodyValidator from '../validation/configuration-body-validation';
import CreateUsecase, {
  CreateGungiRequest,
} from '../../usecases/service-class/CreateUsecase';
import CreateGungiValidator from '../validation/create-body-validation';
import CreatePresenter from '../presenter/CreatePresenter';

@Controller()
export default class GungiController {
  constructor(
    private _createUsecase: CreateUsecase,
    private _furigomaUsecase: FurigomaUsecase,
    private _surrenderUsecase: SurrenderUsecase,
    private _arataUsecase: ArataUsecase,
    private _configurationUsecase: ConfigurationUsecase,
    private _getGungiUsecase: GetGungiUsecase,
  ) {}

  @Post('/gungi/:gungiId/furigoma')
  async furigoma(
    @Param('gungiId') gungiId: string,
    @Body(new ZodPipe(FurigomaBodyValidator))
    body: { gungiId: string; playerId: string },
    @Res() res,
  ) {
    const presenter = new FurigomaPresenter();
    const input: FurigomaRequest = { gungiId, playerId: body.playerId };
    const response: FurigomaView = await this._furigomaUsecase.present(
      input,
      presenter,
    );
    return res.status(HttpStatus.OK).send(response);
  }

  @Post('/gungi/:id/surrender')
  async surrender(
    @Param('id') id: string,
    @Body(new ZodPipe(SurrenderBodyValidator)) body: { playerId: string },
    @Res() res,
  ) {
    const request: SurrenderRequest = {
      gungiId: id,
      playerId: body.playerId,
    };

    const presenter = new SurrenderPresenter();
    const response = await this._surrenderUsecase.present(request, presenter);

    return res.status(HttpStatus.OK).send(response);
  }

  @Post('/gungi/:id/arata')
  async arata(
    @Param('id') id: string,
    @Body(new ZodPipe(ArataBodyValidator))
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

    const response = await this._arataUsecase.present(request, presenter);
    return res.status(HttpStatus.OK).send(response);
  }

  @Post('/gungi/:id/configuration')
  async configuration(
    @Param('id') id: string,
    @Body(new ZodPipe(ConfigurationBodyValidator)) body: { playerId: string },
    @Res() res,
  ) {
    const request: ConfigurationRequest = {
      gungiId: id,
      playerId: body.playerId,
    };

    const presenter = new ConfigurationPresenter();
    const response = await this._configurationUsecase.present(
      request,
      presenter,
    );

    return res.status(HttpStatus.OK).send(response);
  }

  @Get('/gungi/:gungiId')
  async getGungi(@Param('gungiId') gungiId: string, @Res() res) {
    const request: GetGungiRequest = { gungiId };
    const presenter = new GetGungiPresenter();
    const response = await this._getGungiUsecase.present(request, presenter);
    return res.status(HttpStatus.OK).send(response);
  }

  @Post('/gungi/create')
  async create(
    @Body(new ZodPipe(CreateGungiValidator))
    body: { players: { id: string; nickname: string }[] },
    @Res() res,
  ) {
    const input: CreateGungiRequest = {
      ...body,
    };
    const presenter = new CreatePresenter();

    const response = await this._createUsecase.present(input, presenter);
    return res.status(HttpStatus.OK).send(response);
  }
}
