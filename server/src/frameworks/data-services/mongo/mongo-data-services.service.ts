import { Injectable } from '@nestjs/common';
import { GungiMongoRepository } from './gungi-mongo-repository';
import Gungi from 'src/domain/Gungi';
import { IDataServices } from 'src/repositories/abstract/data-services.abstract';

@Injectable()
export class MongoDataServices implements IDataServices {
  gungi: GungiMongoRepository;

  async findGungiById(id: string): Promise<Gungi | null> {
    return this.gungi.get(id);
  }

  async saveGungi(gungi: Gungi): Promise<void> {
    return this.gungi.save(gungi);
  }
}
