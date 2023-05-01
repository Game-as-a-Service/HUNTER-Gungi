import { Dao } from './dao';
import { DataModel } from './data-model';

export default interface IRepository<T, D> {
  readonly _dao: Dao<D>;
  readonly _dataModel: DataModel<T, D>;

  get(id: string): Promise<T | null>;

  save(item: T): Promise<void>;
}
