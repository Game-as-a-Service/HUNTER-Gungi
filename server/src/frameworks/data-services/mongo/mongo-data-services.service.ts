import { Injectable } from '@nestjs/common';
import { MongoGungiRepository } from './gungi-mongo-repository';
import Gungi from 'src/domain/Gungi';
import { IDataServices } from 'src/data-services/abstract/data-services.abstract';

@Injectable()
export class MongoDataServices implements IDataServices {
  constructor(readonly gungi: MongoGungiRepository) {}

  async findGungiById(id: string): Promise<Gungi | null> {
    return this.gungi.get(id);
  }

  async saveGungi(gungi: Gungi): Promise<void> {
    return this.gungi.save(gungi);
  }
}
