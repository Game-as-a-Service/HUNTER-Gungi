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
import GOMA from '../../src/domain/constant/GOMA';
import { ConfigurationView } from '../../src/gateway/presenter/ConfigurationPresenter';

dotenv.config();

describe.only('棋盤配置 (e2e)', () => {
  let app: INestApplication;
  let gungiRepository: GungiRepository;
  let db: Db;
  let client: MongoClient;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DataServicesModule],
      providers: [GungiDataModel],
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

  it('/(POST) gungi/:gungiId/configuration', async () => {
    // Init
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

    const gungiHan: GungiHan = new GungiHan([]);
    const gungi = new Gungi(gungiId, LEVEL.BEGINNER, player, gungiHan);
    gungi.sente = player[0];
    gungi.gote = player[1];
    gungi.setCurrentTurn(SIDE.WHITE);

    await gungiRepository.save(gungi);

    // Given
    // None

    // When
    const body = {
      playerId: 'A',
    };

    const response = await request(app.getHttpServer())
      .post(`/gungi/${gungiId}/configuration`)
      .send(body);

    expect(response.status).toEqual(200);

    const view: ConfigurationView = response.body;

    /** 預期盤棋上的棋子 */
    function expectGomaInHan(
      view: ConfigurationView,
      side: SIDE,
      name: GOMA,
      x: number,
      y: number,
      z: number,
    ) {
      const count = view.han.filter(
        (item) =>
          item.goma.side === side &&
          item.goma.name === name &&
          item.coordinate.x === x &&
          item.coordinate.y === y &&
          item.coordinate.z === z,
      ).length;

      expect(count).toEqual(1);
    }

    /** 預期備用區棋子的數量 */
    function expectGomaCountInOki(
      view: ConfigurationView,
      side: SIDE,
      name: GOMA,
      count: number,
    ) {
      const oki = side === SIDE.WHITE ? view.whileOki : view.blackOki;

      expect(
        oki.filter((goma) => goma.side === side && goma.name === name).length,
      ).toEqual(count);
    }

    let side = SIDE.WHITE;
    expectGomaInHan(view, side, GOMA.OSHO, 4, 0, 0);
    expectGomaCountInOki(view, side, GOMA.OSHO, 0);
    expectGomaInHan(view, side, GOMA.HEI, 0, 2, 0);
    expectGomaInHan(view, side, GOMA.HEI, 4, 2, 0);
    expectGomaInHan(view, side, GOMA.HEI, 8, 2, 0);
    expectGomaCountInOki(view, side, GOMA.HEI, 1);
    expectGomaCountInOki(view, side, GOMA.SHO, 2);
    expectGomaCountInOki(view, side, GOMA.UMA, 2);
    expectGomaInHan(view, side, GOMA.SHINOBI, 1, 1, 0);
    expectGomaInHan(view, side, GOMA.SHINOBI, 7, 1, 0);
    expectGomaCountInOki(view, side, GOMA.SHINOBI, 0);
    expectGomaInHan(view, side, GOMA.YARI, 4, 1, 0);
    expectGomaCountInOki(view, side, GOMA.YARI, 2);
    expectGomaInHan(view, side, GOMA.CHU, 5, 0, 0);
    expectGomaCountInOki(view, side, GOMA.CHU, 0);
    expectGomaInHan(view, side, GOMA.DAI, 3, 0, 0);
    expectGomaCountInOki(view, side, GOMA.DAI, 0);
    expectGomaInHan(view, side, GOMA.SHI, 3, 2, 0);
    expectGomaInHan(view, side, GOMA.SHI, 5, 2, 0);
    expectGomaCountInOki(view, side, GOMA.SHI, 0);
    expectGomaInHan(view, side, GOMA.TORIDE, 2, 2, 0);
    expectGomaInHan(view, side, GOMA.TORIDE, 6, 2, 0);
    expectGomaCountInOki(view, side, GOMA.TORIDE, 0);

    side = SIDE.BLACK;
    expectGomaInHan(view, side, GOMA.OSHO, 4, 8, 0);
    expectGomaCountInOki(view, side, GOMA.OSHO, 0);
    expectGomaInHan(view, side, GOMA.HEI, 0, 6, 0);
    expectGomaInHan(view, side, GOMA.HEI, 4, 6, 0);
    expectGomaInHan(view, side, GOMA.HEI, 8, 6, 0);
    expectGomaCountInOki(view, side, GOMA.HEI, 1);
    expectGomaCountInOki(view, side, GOMA.SHO, 2);
    expectGomaCountInOki(view, side, GOMA.UMA, 2);
    expectGomaInHan(view, side, GOMA.SHINOBI, 1, 7, 0);
    expectGomaInHan(view, side, GOMA.SHINOBI, 7, 7, 0);
    expectGomaCountInOki(view, side, GOMA.SHINOBI, 0);
    expectGomaInHan(view, side, GOMA.YARI, 4, 7, 0);
    expectGomaCountInOki(view, side, GOMA.YARI, 2);
    expectGomaInHan(view, side, GOMA.CHU, 3, 8, 0);
    expectGomaCountInOki(view, side, GOMA.CHU, 0);
    expectGomaInHan(view, side, GOMA.DAI, 5, 8, 0);
    expectGomaCountInOki(view, side, GOMA.DAI, 0);
    expectGomaInHan(view, side, GOMA.SHI, 3, 6, 0);
    expectGomaInHan(view, side, GOMA.SHI, 5, 6, 0);
    expectGomaCountInOki(view, side, GOMA.SHI, 0);
    expectGomaInHan(view, side, GOMA.TORIDE, 2, 6, 0);
    expectGomaInHan(view, side, GOMA.TORIDE, 6, 6, 0);
    expectGomaCountInOki(view, side, GOMA.TORIDE, 0);
  });
});
