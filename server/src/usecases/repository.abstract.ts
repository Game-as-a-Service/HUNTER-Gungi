export default abstract class IRepository<T> {
  abstract get(id: string): Promise<T | null>;

  abstract save(item: T): Promise<void>;
}
