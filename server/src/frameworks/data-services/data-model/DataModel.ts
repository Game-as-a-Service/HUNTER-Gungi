export default interface DataModel<T, D> {
  toData(domain: T): D;

  toDomain(data: D): T;
}
