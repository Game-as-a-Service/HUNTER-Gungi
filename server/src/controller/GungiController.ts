import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import FurigomaUsecase from "../usecase/FurigomaUsecase";

@Controller()
export default class GungiController {

    constructor(private _furigomaUsecase:FurigomaUsecase) {
    }
    @Post('/gungi/:id/furigoma')
    async furigoma(@Param('id') id: string, @Body() body: any) {
        const response = await this._furigomaUsecase.execute();
        return response;
    }
}