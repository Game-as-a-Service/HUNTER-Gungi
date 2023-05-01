export abstract class DataModel<T, D> {
  abstract toData(domain: T): D;
  abstract toDomain(data: D): T;
}
