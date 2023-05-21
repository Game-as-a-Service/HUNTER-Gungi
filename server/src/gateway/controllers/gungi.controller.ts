import { Body, Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import FurigomaUsecase from '../../usecases/service-class/furigoma-usecase';
import SurrenderUsecase, {
  SurrenderRequest,
} from '../../usecases/service-class/surrender-usecase';
import SurrenderPresenter from '../presenter/SurrenderPresenter';

@Controller()
export default class GungiController {
  constructor(
    private _furigomaUsecase: FurigomaUsecase,
    private _surrenderUsecase: SurrenderUsecase,
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
}
