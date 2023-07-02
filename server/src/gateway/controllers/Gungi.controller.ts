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
@Controller()
export default class GungiController {
  constructor(
    private _furigomaUsecase: FurigomaUsecase,
    private _surrenderUsecase: SurrenderUsecase,
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
}
