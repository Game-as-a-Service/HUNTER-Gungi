import { Injectable } from '@nestjs/common';
import { IDataServices } from 'src/repositories/abstract/data-services.abstract';

@Injectable()
export default class FurigomaUsecase {
  constructor(private dataServices: IDataServices) {}

  async execute() {
    return;
  }
}
