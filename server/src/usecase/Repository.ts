export default interface Repository<T> {
  findById(id: string): T | null;

  save(item: T): void;
}
