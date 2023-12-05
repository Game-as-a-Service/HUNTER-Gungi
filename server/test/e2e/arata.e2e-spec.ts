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
import { ZodFilter } from '../../src/frameworks/filter/ZodFilter';
import { APP_FILTER } from '@nestjs/core';

dotenv.config();

describe('arata (e2e)', () => {
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

  it('should return 400 when request body is empty', async () => {
    const body = {};
    await request(app.getHttpServer())
      .post('/gungi/someGungiId/arata')
      .send(body)
      .expect(400);
  });

  it('should return 400 when "playerId" field is missing', async () => {
    const body = {
      goma: { name: 'HEI', side: 'BLACK' },
      to: { x: 1, y: 2, z: 3 },
    };
    await request(app.getHttpServer())
      .post('/gungi/someGungiId/arata')
      .send(body)
      .expect(400);
  });

  it('should return 400 when "goma" field is missing', async () => {
    const body = {
      playerId: 'somePlayerId',
      to: { x: 1, y: 2, z: 3 },
    };
    await request(app.getHttpServer())
      .post('/gungi/someGungiId/arata')
      .send(body)
      .expect(400);
  });

  it('should return 400 when "goma.name" is not a valid GOMA value', async () => {
    const body = {
      playerId: 'somePlayerId',
      goma: { name: 'INVALID_GOMA', side: 'BLACK' },
      to: { x: 1, y: 2, z: 3 },
    };
    await request(app.getHttpServer())
      .post('/gungi/someGungiId/arata')
      .send(body)
      .expect(400);
  });

  it('should return 400 when "goma.side" is not a valid SIDE value', async () => {
    const body = {
      playerId: 'somePlayerId',
      goma: { name: 'HEI', side: 'INVALID_SIDE' },
      to: { x: 1, y: 2, z: 3 },
    };
    await request(app.getHttpServer())
      .post('/gungi/someGungiId/arata')
      .send(body)
      .expect(400);
  });

  it('should return 400 when "to" field is missing', async () => {
    const body = {
      playerId: 'somePlayerId',
      goma: { name: 'HEI', side: 'BLACK' },
    };
    await request(app.getHttpServer())
      .post('/gungi/someGungiId/arata')
      .send(body)
      .expect(400);
  });

  it('should return 400 when "to" field is missing "x" property', async () => {
    const body = {
      playerId: 'somePlayerId',
      goma: { name: 'HEI', side: 'BLACK' },
      to: { y: 2, z: 3 },
    };
    await request(app.getHttpServer())
      .post('/gungi/someGungiId/arata')
      .send(body)
      .expect(400);
  });

  it('should return 400 when "to" field is missing "y" property', async () => {
    const body = {
      playerId: 'somePlayerId',
      goma: { name: 'HEI', side: 'BLACK' },
      to: { x: 1, z: 3 },
    };
    await request(app.getHttpServer())
      .post('/gungi/someGungiId/arata')
      .send(body)
      .expect(400);
  });

  it('should return 400 when "to" field is missing "z" property', async () => {
    const body = {
      playerId: 'somePlayerId',
      goma: { name: 'HEI', side: 'BLACK' },
      to: { x: 1, y: 2 },
    };
    await request(app.getHttpServer())
      .post('/gungi/someGungiId/arata')
      .send(body)
      .expect(400);
  });
});
