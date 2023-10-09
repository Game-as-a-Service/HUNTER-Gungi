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

import GOMA from '../../src/domain/constant/GOMA';

import Gungi from '../../src/domain/Gungi';

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

  it('/GET /gungi/:gungiId', async () => {
    const gungiId = randomUUID();
    const gungiData: GungiData = {
      currentTurn: SIDE.WHITE,
      gungiHan: { han: [] },
      history: [],
      _id: gungiId,
      level: LEVEL.BEGINNER,
      turn: {
        sente: 'A',
        gote: 'B',
      },
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

    await request(app.getHttpServer())
      .get(`/gungi/${gungiId}`)
      .expect(200)
      .expect((res) => {
        const state = res.body.state;
        expect(state).toBe(1);
      });
  });

  it('/(POST) gungi/:gungiId/surrender', async () => {
    const gungiId = randomUUID();
    const gungiData: GungiData = {
      currentTurn: SIDE.WHITE,
      gungiHan: { han: [] },
      history: [],
      _id: gungiId,
      level: LEVEL.BEGINNER,
      turn: {
        sente: 'A',
        gote: 'B',
      },
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

  it('/POST/gungi/:gungiId/arata', async () => {
    const gungiId = randomUUID();
    const gungiData: GungiData = {
      turn: {
        gote: 'B',
        sente: 'A',
      },
      currentTurn: SIDE.WHITE,
      gungiHan: {
        han: [
          {
            goma: { side: SIDE.WHITE, name: GOMA.HEI },
            coordinate: { x: 0, y: 5, z: 0 },
          },
        ],
      },
      history: [],
      _id: gungiId,
      level: LEVEL.BEGINNER,
      players: [
        {
          id: 'A',
          name: 'A',
          side: SIDE.WHITE,
          gomaOki: { gomas: [{ side: SIDE.WHITE, name: GOMA.HEI }] },
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

    // post
    const body = {
      playerId: 'A',
      goma: {
        name: GOMA.HEI,
        side: SIDE.WHITE,
      },
      to: {
        x: 1,
        y: 1,
        z: 0,
      },
    };

    // request
    const response = await request(app.getHttpServer())
      .post(`/gungi/${gungiId}/arata`)
      .send(body)
      .expect(200);

    expect(response.body).toEqual({
      goma: {
        name: 'HEI',
        side: 'WHITE',
      },
      to: {
        x: 1,
        y: 1,
        z: 0,
      },
    });
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
});
