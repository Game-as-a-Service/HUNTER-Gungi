import Repository from "../usecase/Repository";
import GungiDataModel from "./dataModel/GungiDataModel";
import GungiDao from "./DAO/GungiDao";
import {Injectable} from "@nestjs/common";
import Gungi from "../domain/Gungi";

@Injectable()
export default class GungiRepository implements Repository<Gungi> {
    constructor(private _dao: GungiDao, private _gungiDataModel: GungiDataModel) {
    }

    findById(id: string): Gungi | null {
        return undefined;
    }


    async save(gungi: Gungi) {
    }
}
