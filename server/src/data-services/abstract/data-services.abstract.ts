import Gungi from 'src/domain/Gungi';
import IRepository from './repository.abstract';
import { GungiData } from './data';

export abstract class IDataServices {
  abstract gungi: IRepository<Gungi, GungiData>;
}
