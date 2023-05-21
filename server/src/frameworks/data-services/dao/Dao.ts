export interface Dao<T> {
  findById(id: string): Promise<T>;

  save(data: T): Promise<void>;
}
