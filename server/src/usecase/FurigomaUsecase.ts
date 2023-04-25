import GungiRepository from '../repository/GungiRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class FurigomaUsecase {
  constructor(private gunGiRepository: GungiRepository) {}

  async execute() {}
}
