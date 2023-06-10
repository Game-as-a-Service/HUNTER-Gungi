import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import LEVEL from '../../src/domain/constant/LEVEL';
import { AppModule } from '../../src/app.module';
import { DataServicesModule } from '../../src/frameworks/data-services/DataService.module';
import { GungiRepository } from '../../src/frameworks/data-services/GungiRepository';
import GungiDataModel from '../../src/frameworks/data-services/data-model/GungiDataModel';
import { GungiData } from '../../src/frameworks/data-services/GungiData';
import { randomUUID } from 'crypto';
import SIDE from '../../src/domain/constant/SIDE';
import { Db, MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let gungiRepository: GungiRepository;
  let gungiDataModel: GungiDataModel;
  let db: Db;
  let client: MongoClient;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DataServicesModule],
      providers: [GungiDataModel],
    }).compile();

    app = moduleFixture.createNestApplication();
    gungiDataModel = moduleFixture.get<GungiDataModel>(GungiDataModel);
    gungiRepository = moduleFixture.get('GungiRepository');
    client = moduleFixture.get('MongoConnection');
    db = client.db();

    await app.init();
  });

  afterEach(async () => {
    await db.collection('Gungi').deleteMany({});
    await client.close(true);
    await app.close();
  });

  it('/(POST) gungi/:gungiId/surrender', async () => {
    const gungiId = randomUUID();
    const gungiData: GungiData = {
      currentTurn: SIDE.WHITE,
      gungiHan: { han: [] },
      history: [],
      _id: gungiId,
      level: LEVEL.BEGINNER,
      players: [
        {
          id: 'A',
          name: 'A',
          side: SIDE.WHITE,
          gomaOki: { gomas: [] },
          deadArea: { gomas: [] },
        },
        {
          id: 'B',
          name: 'B',
          side: SIDE.BLACK,
          gomaOki: { gomas: [] },
          deadArea: { gomas: [] },
        },
      ],
    };

    const gungi = gungiDataModel.toDomain(gungiData);

    await gungiRepository.save(gungi);

    // post a  json
    const body = {
      playerId: 'A',
    };

    await request(app.getHttpServer())
      .post(`/gungi/${gungiId}/surrender`)
      .send(body)
      .expect(200)
      .expect({ winner: 'B' });
  });
  it('/(POST) gungi', async () => {
    const response = await request(app.getHttpServer())
      .post('/gungi')
      .send({
        level: LEVEL.BEGINNER,
        playerA: {
          id: 'A',
          name: 'A',
        },
        playerB: {
          id: 'B',
          name: 'B',
        },
      })
      .expect(200);

    const body = response.body;
    expect(typeof body.gungiId).toBe('string');
  });
});
