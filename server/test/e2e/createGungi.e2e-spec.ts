import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { DataServicesModule } from '../../src/frameworks/data-services/DataService.module';
import { GungiRepository } from '../../src/frameworks/data-services/GungiRepository';
import GungiDataModel from '../../src/frameworks/data-services/data-model/GungiDataModel';
import { Db, MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
import { ZodFilter } from '../../src/frameworks/filter/ZodFilter';
import { APP_FILTER } from '@nestjs/core';

dotenv.config();

describe('createGungi (e2e)', () => {
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

  it('/(POST) gungi/create', async () => {
    const body = {
      players: [
        {
          id: '6497f6f226b40d440b9a90cc',
          nickname: '金城武',
        },
        {
          id: '6498112b26b40d440b9a90ce',
          nickname: '重智',
        },
      ],
    };

    const response = await request(app.getHttpServer())
      .post(`/gungi/create`)
      .send(body)
      .expect(200);

    const responseData = response.body;
    const url = responseData.url;
    const regex = /\/gungi\/(?<gungiId>[^/]+)/;
    const {
      groups: { gungiId },
    } = url.match(regex) || {};

    expect(gungiId).toBeDefined();
  });

  it('/(POST) gungi/create no body', async () => {
    const body = {};
    await request(app.getHttpServer())
      .post(`/gungi/create`)
      .send(body)
      .expect(400);
  });

  it('/(POST) gungi/create should return 400 when "players" field is missing', async () => {
    const body = { someOtherField: 'value' };
    await request(app.getHttpServer())
      .post('/gungi/create')
      .send(body)
      .expect(400);
  });

  it('/(POST) gungi/create should return 400 when "players" field is an empty array', async () => {
    const body = { players: [] };
    await request(app.getHttpServer())
      .post('/gungi/create')
      .send(body)
      .expect(400);
  });

  it('/(POST) gungi/create should return 400 when "id" field in "players" is missing', async () => {
    const body = { players: [{ nickname: 'Player1' }] };
    await request(app.getHttpServer())
      .post('/gungi/create')
      .send(body)
      .expect(400);
  });

  it('/(POST) gungi/create should return 400 when "nickname" field in "players" is missing', async () => {
    const body = { players: [{ id: '1' }] };
    await request(app.getHttpServer())
      .post('/gungi/create')
      .send(body)
      .expect(400);
  });
});
