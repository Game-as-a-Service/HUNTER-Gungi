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
import { ZodFilter } from '../../src/frameworks/filter/ZodFilter';
import { APP_FILTER } from '@nestjs/core';

dotenv.config();

describe('get gungi (e2e)', () => {
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

  it('/(GET) gungi/:gungiId', async () => {
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

    const response = await request(app.getHttpServer())
      .get(`/gungi/${gungiId}`)
      .expect(200);

    const data = response.body;

    // Validate top-level properties
    expect(typeof data.state).toBe('number');
    expect(typeof data.currentTurn).toBe('string');
    expect(Array.isArray(data.players)).toBe(true);
    expect(data.players).toHaveLength(2);
    expect(Array.isArray(data.gungiHan)).toBe(true);

    // Validate properties inside players array
    data.players.forEach((player) => {
      expect(typeof player.id).toBe('string');
      expect(typeof player.name).toBe('string');
      expect(typeof player.side).toBe('string');
      expect(player).toHaveProperty('deadArea');
      expect(Array.isArray(player.deadArea.gomas)).toBe(true);
      expect(player).toHaveProperty('gomaOki');
      expect(Array.isArray(player.gomaOki.gomas)).toBe(true);
    });

    // Validate properties inside gungiHan array
    data.gungiHan.forEach((item) => {
      expect(item).toHaveProperty('goma');
      expect(typeof item.goma.side).toBe('string');
      expect(typeof item.goma.name).toBe('string');
      expect(item).toHaveProperty('coordinate');
      expect(typeof item.coordinate.x).toBe('number');
      expect(typeof item.coordinate.y).toBe('number');
      expect(typeof item.coordinate.z).toBe('number');
    });
  });
});
