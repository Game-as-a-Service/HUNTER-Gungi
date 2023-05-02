//負責把data 和 domain　物件轉換
import Gungi from '../../domain/Gungi';
import GungiData, {
  DeadAreaData,
  GomaData,
  GungiHanData,
  PlayerData,
} from '../GungiData';
import Player from '../../domain/Player';
import SIDE from '../../domain/constant/SIDE';
import GungiHan from '../../domain/GungiHan';
import GomaOki from '../../domain/GomaOki';

export default class GungiDataModel {
  toData(gungi: Gungi) {}

  toDomain(rawGungi: GungiData): Gungi {
    const blackPlayer = this.createPlayer(rawGungi.black.player, SIDE.BLACK);
    const whitePlayer = this.createPlayer(rawGungi.white.player, SIDE.WHITE);
    const gungiHan = this.createGungiHan(rawGungi.gungiHan);
    const blackGomaOki = this.createGomaOki(
      rawGungi.black.gomaOki,
      SIDE.BLACK,
    );
    const whiteGomaOki = this.createGomaOki(
      rawGungi.white.gomaOki,
      SIDE.WHITE,
    );
    const blackDeadArea = this.createDeadArea(
      rawGungi.black.deadArea,
      SIDE.BLACK,
    );
    const whiteDeadArea = this.createDeadArea(
      rawGungi.white.deadArea,
      SIDE.WHITE,
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

  private createPlayer(rawPlayer: PlayerData, side: SIDE) {
    const player = new Player(rawPlayer.name);
    player.side = side;
    return player;
  }

  private createGungiHan(rawGungiHan: GungiHanData) {
    return new GungiHan(rawGungiHan.map);
  }

  private createGomaOki(rawGomaOki, BLACK: SIDE) {
    const gomas = rawGomaOki.gomas.map<Goma>((rawGoma) =>
      this.createGoma(rawGoma, BLACK),
    );
    return new GomaOki(BLACK, gomas);
  }

  private createDeadArea(deadArea: DeadAreaData, BLACK: SIDE) {
    const gomas = deadArea.gomas.map<Goma>((rawGoma) =>
      this.createGoma(rawGoma, BLACK),
    );
    return new GomaOki(BLACK, gomas);
  }

  private createGoma(rawGoma: GomaData, BLACK: SIDE) {
    return undefined;
  }
}
