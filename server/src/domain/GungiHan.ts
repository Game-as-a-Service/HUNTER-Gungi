import Goma from './goma/Goma';
import { GomaData, GungiHanData } from '../frameworks/data-services/gungi-data';

class GungiHan {
  private _han: Map<number, Map<number, Goma[]>>;

  constructor(gomas: Goma[]) {
    this.setHan(gomas);
  }

  toData(): GungiHanData {
    const gomasData: GomaData[] = [];

    this._han.forEach((yMap, x) => {
      yMap.forEach((gomas, y) => {
        gomas.forEach((goma) => {
          gomasData.push(goma.toData());
        });
      });
    });

    return {
      han: gomasData,
    };
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
