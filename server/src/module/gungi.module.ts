import {Module} from "@nestjs/common";
import GungiController from "../controller/GungiController";
import FurigomaUsecase from "../usecase/FurigomaUsecase";
import GungiDao from "../repository/DAO/GungiDao";
import GungiDataModel from "../repository/dataModel/GungiDataModel";
import GungiRepository from "../repository/GungiRepository";

@Module({
    imports: [],
    controllers: [GungiController],
    providers: [
        FurigomaUsecase, GungiDao, GungiDataModel, GungiRepository
    ]
})

export default class GungiModule{}