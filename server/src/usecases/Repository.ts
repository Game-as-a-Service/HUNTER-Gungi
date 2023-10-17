export default interface IRepository<T> {
  findById(id: string): Promise<T | null>;

  save(item: T): Promise<void>;
}
