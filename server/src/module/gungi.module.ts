import {Module} from "@nestjs/common";
import GungiController from "../controller/GungiController";
import FurigomaUsecase from "../usecase/FurigomaUsecase";
import GungiDao from "../repository/DAO/GungiDao";
import GungiDataModel from "../repository/dataModel/GungiDataModel";
import GungiRepository from "../repository/GungiRepository";
import SurrenderUsecase from "../usecase/SurrenderUsecase";

@Module({
    imports: [],
    controllers: [GungiController],
    providers: [
        FurigomaUsecase,SurrenderUsecase, GungiDao, GungiDataModel, GungiRepository
    ]
})

export default class GungiModule{}