export default abstract class IRepository<T> {
  abstract findById(id: string): Promise<T | null>;

  abstract save(item: T): Promise<void>;
}
