export abstract class Dao<T> {
  abstract findById(id: string): Promise<T>;
  abstract save(data: T): Promise<void>;
}
