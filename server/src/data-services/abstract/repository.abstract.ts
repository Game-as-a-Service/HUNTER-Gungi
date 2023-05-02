import { Dao } from './dao/dao';
import { DataModel } from './data-model/data-model';

export default interface IRepository<T, D> {
  readonly _dao: Dao<D>;
  readonly _dataModel: DataModel<T, D>;

  get(id: string): Promise<T | null>;

  save(item: T): Promise<void>;
}
