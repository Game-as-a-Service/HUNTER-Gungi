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

import Gungi from '../../src/domain/Gungi';
import { ZodFilter } from '../../src/frameworks/filter/ZodFilter';
import { APP_FILTER } from '@nestjs/core';

dotenv.config();

describe('furigoma (e2e)', () => {
  let app: INestApplication;
  let gungiRepository: GungiRepository;
  let gungiDataModel: GungiDataModel;
  let db: Db;
  let client: MongoClient;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DataServicesModule],
      providers: [
        GungiDataModel,
        {
          provide: APP_FILTER,
          useClass: ZodFilter,
        },
      ],
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

  it('/(POST) gungi/:gungiId/furigoma', async () => {
    // Given
    const gungiId = randomUUID();
    const gungiData: GungiData = {
      currentTurn: SIDE.WHITE,
      gungiHan: { han: [] },
      history: [],
      _id: gungiId,
      turn: {
        sente: null,
        gote: null,
      },
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

    const gungi: Gungi = gungiDataModel.toDomain(gungiData);
    await gungiRepository.save(gungi);
    const body = {
      playerId: 'A',
    };

    const response = await request(app.getHttpServer())
      .post(`/gungi/${gungiId}/furigoma`)
      .send(body);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('turn');
    expect(response.body.data).toHaveProperty('result');
    expect(response.body.data.result.length).toBe(5);
  });

  it('should return 400 when request body is empty', async () => {
    const body = {};
    await request(app.getHttpServer())
      .post('/gungi/someGungiId/furigoma')
      .send(body)
      .expect(400);
  });

  it('should return 400 when "playerId" field is missing', async () => {
    const body = { someOtherField: 'value' };
    await request(app.getHttpServer())
      .post('/gungi/someGungiId/furigoma')
      .send(body)
      .expect(400);
  });

  it('should return 400 when "playerId" field is an empty string', async () => {
    const body = { playerId: '' };
    await request(app.getHttpServer())
      .post('/gungi/someGungiId/furigoma')
      .send(body)
      .expect(400);
  });
});
