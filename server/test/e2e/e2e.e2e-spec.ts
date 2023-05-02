import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import GungiHan from '../../src/domain/GungiHan';
import SIDE from '../../src/domain/constant/SIDE';
import LEVEL from '../../src/domain/constant/LEVEL';
import player from '../../src/domain/Player';
import GOMA from '../../src/domain/constant/GOMA';
import GungiRepository from '../../src/data-services/GungiRepository';
import Coord from '../../src/domain/Coord';
import Gungi from '../../src/domain/Gungi';
import { AppModule } from '../../src/app.module';
import GungiDataModel from '../../src/frameworks/data-services/mongo/data-model/gungi-data-model';
import GungiDao from '../../src/frameworks/data-services/mongo/dao/gungi.dao';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/(POST) gungi/:gungiId/surrender', async () => {
    const gungiDao = new GungiDao();
    const gungiDataModel = new GungiDataModel();
    const gungiRepository = new GungiRepository(gungiDao, gungiDataModel);
    const gungiId = 1;
    const players = [new player('A'), new player('B')];
    const level = LEVEL.BEGINNER;
    const gungiHan = new GungiHan();
    const gungi = new Gungi(level, players, gungiHan);
    gungi.sente = players[0];
    gungi.gote = players[1];
    await gungiRepository.save(gungi);
    //要想一下這部分 因為不知道要動哪一個棋
    gungi.ugokiGoma(
      SIDE.BLACK,
      GOMA.HEI,
      new Coord(0, 1, 0),
      new Coord(0, 0, 0),
    );

    // post a  json
    const body = {
      player: 'A',
    };
    return request(app.getHttpServer())
      .post(`/gungi/${gungiId}/surrender`)
      .send(body)
      .expect(200);
  });
});
