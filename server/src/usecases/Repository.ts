export default interface IRepository<T, InitRequest> {
  findById(id: string): Promise<T | null>;

  save(item: T): Promise<void>;

  create(request: InitRequest): T;
}
