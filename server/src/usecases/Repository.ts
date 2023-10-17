export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export default interface IRepository<T> {
  findById(id: string): Promise<T | null>;

  save(item: T): Promise<void>;

  create(request: T | DeepPartial<T>): T;
}
