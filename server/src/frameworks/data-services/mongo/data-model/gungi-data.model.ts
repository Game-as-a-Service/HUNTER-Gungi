//負責把data 和 domain　物件轉換
import Gungi from '../../../../domain/Gungi';
import {
  MongoGungiData,
  DeadAreaData,
  GomaData,
  GungiHanData,
  PlayerData,
} from '../data/gungi.data';
import Player from '../../../../domain/Player';
import COLOR from '../../../../domain/constant/COLOR';
import GungiHan from '../../../../domain/GungiHan';
import GomaOki from '../../../../domain/GomaOki';
import { DataModel } from 'src/repositories/abstract/data-model';

export default class GungiDataModel
  implements DataModel<Gungi, MongoGungiData>
{
  toData(domain: Gungi): MongoGungiData {
    return gungiData as MongoGungiData;
  }

  toDomain(rawGungi: MongoGungiData): Gungi {
    const blackPlayer = this.createPlayer(rawGungi.black.player, COLOR.BLACK);
    const whitePlayer = this.createPlayer(rawGungi.white.player, COLOR.WHITE);
    const gungiHan = this.createGungiHan(rawGungi.gungiHan);
    const blackGomaOki = this.createGomaOki(
      rawGungi.black.gomaOki,
      COLOR.BLACK,
    );
    const whiteGomaOki = this.createGomaOki(
      rawGungi.white.gomaOki,
      COLOR.WHITE,
    );
    const blackDeadArea = this.createDeadArea(
      rawGungi.black.deadArea,
      COLOR.BLACK,
    );
    const whiteDeadArea = this.createDeadArea(
      rawGungi.white.deadArea,
      COLOR.WHITE,
    );
    const level = rawGungi.level;
    const gungi = new Gungi(
      level,
      [blackPlayer, whitePlayer],
      gungiHan,
      blackGomaOki,
      whiteGomaOki,
      blackDeadArea,
      whiteDeadArea,
    );
    return gungi;
  }

  private createPlayer(rawPlayer: PlayerData, side: COLOR) {
    const player = new Player(rawPlayer.name);
    player.side = side;
    return player;
  }

  private createGungiHan(rawGungiHan: GungiHanData) {
    return new GungiHan(rawGungiHan.map);
  }

  private createGomaOki(rawGomaOki, BLACK: COLOR) {
    const gomas = rawGomaOki.gomas.map<Goma>((rawGoma) =>
      this.createGoma(rawGoma, BLACK),
    );
    return new GomaOki(BLACK, gomas);
  }

  private createDeadArea(deadArea: DeadAreaData, BLACK: COLOR) {
    const gomas = deadArea.gomas.map<Goma>((rawGoma) =>
      this.createGoma(rawGoma, BLACK),
    );
    return new GomaOki(BLACK, gomas);
  }

  private createGoma(rawGoma: GomaData, BLACK: COLOR) {
    return undefined;
  }
}
