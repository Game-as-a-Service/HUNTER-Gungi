import GungiRepository from "../repository/GungiRepository";
import {Injectable} from "@nestjs/common";

@Injectable()
export default class SurrenderUsecase {

    constructor(GungiRepository: GungiRepository) {

    }

    async execute() {
    }
}