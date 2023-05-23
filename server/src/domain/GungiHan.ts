import Goma from './goma/Goma';
import { GomaData, GungiHanData } from '../frameworks/data-services/GungiData';

class GungiHan {
  constructor(gomas: Goma[] = []) {
    this.setHan(gomas);
  }

  private _han: Map<number, Map<number, Goma[]>>;

  get han(): Map<number, Map<number, Goma[]>> {
    return this._han;
  }

  private setHan(gomas: Goma[]) {
    const map = new Map<number, Map<number, Goma[]>>();

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
}

export default GungiHan;
