import Repository from "../usecase/Repository";
import GungiDataModel from "./dataModel/GungiDataModel";
import GungiDao from "./DAO/GungiDao";
import {Injectable} from "@nestjs/common";

@Injectable()
export default class GungiRepository implements Repository {
    constructor(private _dao: GungiDao, private _gungiDataModel: GungiDataModel) {
    }

    findById() {
    }

    save() {
    }

    saveAndBroadcast() {
    }

}