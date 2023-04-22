import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import FurigomaUsecase from "../usecase/FurigomaUsecase";
import SurrenderUsecase from "../usecase/SurrenderUsecase";

@Controller()
export default class GungiController {

    constructor(private _furigomaUsecase: FurigomaUsecase, private _surrenderUsecase: SurrenderUsecase) {

    }

    @Post('/gungi/:id/furigoma')
    async furigoma(@Param('id') id: string, @Body() body: any) {
        const response = await this._furigomaUsecase.execute();
        return response;
    }

    @Post('/gungi/:id/surrender')
    async surrender(@Param('id') id: string, @Body() body: { player: string }) {
        const request = {
            gungiId: id,
            player: body.player
        };
        const response = await this._surrenderUsecase.execute(request);
        return response;
    }
}