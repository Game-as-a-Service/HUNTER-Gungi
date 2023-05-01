import { Injectable } from '@nestjs/common';
import { GungiRepository } from './gungi-repository';
import Gungi from 'src/domain/Gungi';
import { IDataServices } from 'src/data-services/abstract/data-services.abstract';

@Injectable()
export class MongoDataServices implements IDataServices {
  constructor(readonly gungi: GungiRepository) {}

  async findGungiById(id: string): Promise<Gungi | null> {
    return this.gungi.get(id);
  }

  async saveGungi(gungi: Gungi): Promise<void> {
    return this.gungi.save(gungi);
  }
}
