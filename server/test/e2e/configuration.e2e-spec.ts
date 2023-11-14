import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import LEVEL from '../../src/domain/constant/LEVEL';
import { AppModule } from '../../src/app.module';
import { DataServicesModule } from '../../src/frameworks/data-services/DataService.module';
import { GungiRepository } from '../../src/frameworks/data-services/GungiRepository';
import GungiDataModel from '../../src/frameworks/data-services/data-model/GungiDataModel';
import { randomUUID } from 'crypto';
import SIDE from '../../src/domain/constant/SIDE';
import { Db, MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
import Gungi from '../../src/domain/Gungi';
import Player from '../../src/domain/Player';
import GungiHan from '../../src/domain/GungiHan';
import GomaOki from '../../src/domain/GomaOki';
import DeadArea from '../../src/domain/DeadArea';
import { ConfigurationView } from '../../src/gateway/presenter/ConfigurationPresenter';
import {
  BLACK_HAN_CONFIG,
  OKI_CONFIG,
  WHITE_HAN_CONFIG,
} from '../../src/domain/constant/GUNGI_HAN';
import { APP_FILTER } from '@nestjs/core';
import { ZodFilter } from '../../src/frameworks/filter/ZodFilter';

dotenv.config();

describe('board configuration (e2e)', () => {
  let app: INestApplication;
  let gungiRepository: GungiRepository;
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

  async function given_gungi_and_furigoma_done(): Promise<string> {
    const level = LEVEL.BEGINNER;
    const gungiId = randomUUID();
    const player: Player[] = [];

    player.push(
      new Player(
        'A',
        'A',
        SIDE.BLACK,
        new GomaOki(LEVEL.BEGINNER, SIDE.BLACK, []),
        new DeadArea(SIDE.BLACK, []),
      ),
    );
    player.push(
      new Player(
        'B',
        'B',
        SIDE.WHITE,
        new GomaOki(LEVEL.BEGINNER, SIDE.WHITE, []),
        new DeadArea(SIDE.WHITE, []),
      ),
    );

    const gungiHan: GungiHan = new GungiHan(level, []);
    const gungi = new Gungi(gungiId, LEVEL.BEGINNER, player, gungiHan);
    gungi.furigoma(player[0], player[1]);

    await gungiRepository.save(gungi);
    return gungi.id;
  }

  async function configuration(gungiId): Promise<request.Response> {
    const body = {
      playerId: 'A',
    };

    const response = await request(app.getHttpServer())
      .post(`/gungi/${gungiId}/configuration`)
      .send(body);

    return response;
  }

  /** 預期盤棋上的棋子 */
  function expectGomaInHan(view: ConfigurationView) {
    WHITE_HAN_CONFIG.forEach((config) => {
      const count = view.han.filter(
        (item) =>
          item.goma.side === SIDE.WHITE &&
          item.goma.name === config.name &&
          item.coordinate.x === config.x &&
          item.coordinate.y === config.y &&
          item.coordinate.z === config.z,
      ).length;
      expect(count).toEqual(1);
    });

    BLACK_HAN_CONFIG.forEach((config) => {
      const count = view.han.filter(
        (item) =>
          item.goma.side === SIDE.BLACK &&
          item.goma.name === config.name &&
          item.coordinate.x === config.x &&
          item.coordinate.y === config.y &&
          item.coordinate.z === config.z,
      ).length;
      expect(count).toEqual(1);
    });
  }

  /** 預期備用區棋子的數量 */
  function expectGomaCountInOki(view: ConfigurationView) {
    const set = new Set(OKI_CONFIG);

    set.forEach((item) => {
      const expectCount = OKI_CONFIG.filter(
        (config) => config.name === item.name,
      ).length;

      const okiCount = view.senteGomOki.filter(
        (goma) => goma.side === SIDE.BLACK && goma.name === item.name,
      ).length;

      expect(okiCount).toEqual(expectCount);
    });

    set.forEach((item) => {
      const expectCount = OKI_CONFIG.filter(
        (config) => config.name === item.name,
      ).length;

      const okiCount = view.goteGomaOki.filter(
        (goma) => goma.side === SIDE.WHITE && goma.name === item.name,
      ).length;

      expect(okiCount).toEqual(expectCount);
    });
  }

  describe('/(POST) gungi/:gungiId/configuration', () => {
    it('基本流程 Happy Path', async () => {
      // Given
      const gungiId = await given_gungi_and_furigoma_done();

      // When
      const response = await configuration(gungiId);
      expect(response.status).toEqual(200);
      const view: ConfigurationView = response.body;

      // Then
      expectGomaInHan(view);
      expectGomaCountInOki(view);
    });

    it('should return 400 when request body is empty', async () => {
      const body = {};
      await request(app.getHttpServer())
        .post('/gungi/someGungiId/configuration')
        .send(body)
        .expect(400);
    });

    it('should return 400 when "playerId" field is missing', async () => {
      const body = { someOtherField: 'value' };
      await request(app.getHttpServer())
        .post('/gungi/someGungiId/configuration')
        .send(body)
        .expect(400);
    });

    it('should return 400 when "playerId" field is an empty string', async () => {
      const body = { playerId: '' };
      await request(app.getHttpServer())
        .post('/gungi/someGungiId/configuration')
        .send(body)
        .expect(400);
    });
    it('重覆執行 (在不對的 GameState 呼叫)', async () => {
      // Given
      const gungiId = await given_gungi_and_furigoma_done();

      // When
      await configuration(gungiId);
      const response = await configuration(gungiId);

      // Then
      expect(response.status).toEqual(500);
    });
  });
});
