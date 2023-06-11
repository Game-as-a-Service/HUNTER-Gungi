import Coordinate from './Coordinate';
import Goma from './goma/Goma';
import { GomaData, GungiHanData } from '../frameworks/data-services/GungiData';

/** 軍儀棋盤 */
class GungiHan {
  constructor(gomas: Goma[] = []) {
    this.setHan(gomas);
  }

  private _han: Map<number, Map<number, Goma[]>>;

  get han(): Map<number, Map<number, Goma[]>> {
    return this._han;
  }

  // [
  //   {1, 2, 2},
  //   {1, 2, 1},
  // ]

  private setHan(gomas: Goma[]) {
    const map = new Map<number, Map<number, Goma[]>>();

    // TODO: 這裡沒有處理 z
    gomas.forEach((goma) => {
      const x = goma.getCoordinateX();
      const y = goma.getCoordinateY();

      const yMap = map.get(x) || new Map<number, Goma[]>();
      const gomaArray = yMap.get(y) || [];
      gomaArray.push(goma);
      yMap.set(y, gomaArray);

      map.set(x, yMap);
    });
    this._han = map;
  }

  updateHan(goma: Goma, to: Coordinate) {
    const old = this._han
      .get(goma.getCoordinateX())
      .get(goma.getCoordinateY())
      .pop();
    this._han.get(to.x).get(to.y).push(goma);
  }
}

export default GungiHan;
