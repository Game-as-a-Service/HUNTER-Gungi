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
import Player from '../../src/domain/Player';
import GungiHan from '../../src/domain/GungiHan';
import GomaOki from '../../src/domain/GomaOki';
import DeadArea from '../../src/domain/DeadArea';
import GOMA from '../../src/domain/constant/GOMA';
import { ConfigurationView } from '../../src/gateway/presenter/ConfigurationPresenter';

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

  afterAll(async () => {
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

    request(app.getHttpServer())
      .post(`/gungi/${gungiId}/surrender`)
      .send(body)
      .expect(200)
      .expect({ winner: 'B' });
  });

  // TODO DELETE 範例，參考用
  it.skip('/(POST) gungi/:gungiId/surrender', async () => {
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

    const response = await request(app.getHttpServer())
      .post(`/gungi/${gungiId}/surrender`)
      .send(body);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({ winner: 'B' });
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
    expectGomaInHan(view, side, GOMA.OSHO, 5, 1, 1);
    expectGomaCountInOki(view, side, GOMA.OSHO, 0);
    expectGomaInHan(view, side, GOMA.HEI, 1, 3, 1);
    expectGomaInHan(view, side, GOMA.HEI, 5, 3, 1);
    expectGomaInHan(view, side, GOMA.HEI, 9, 3, 1);
    expectGomaCountInOki(view, side, GOMA.HEI, 1);
    expectGomaCountInOki(view, side, GOMA.SHO, 2);
    expectGomaCountInOki(view, side, GOMA.UMA, 2);
    expectGomaInHan(view, side, GOMA.SHINOBI, 2, 2, 1);
    expectGomaInHan(view, side, GOMA.SHINOBI, 8, 2, 1);
    expectGomaInHan(view, side, GOMA.YARI, 5, 2, 1);
    expectGomaCountInOki(view, side, GOMA.YARI, 2);
    expectGomaInHan(view, side, GOMA.CHU, 6, 1, 1);
    expectGomaInHan(view, side, GOMA.DAI, 4, 1, 1);
    expectGomaInHan(view, side, GOMA.SHI, 4, 3, 1);
    expectGomaInHan(view, side, GOMA.SHI, 6, 3, 1);
    expectGomaInHan(view, side, GOMA.TORIDE, 3, 3, 1);
    expectGomaInHan(view, side, GOMA.TORIDE, 7, 3, 1);

    side = SIDE.BLACK;
    expectGomaInHan(view, side, GOMA.OSHO, 5, 9, 1);
    expectGomaCountInOki(view, side, GOMA.OSHO, 0);
    expectGomaInHan(view, side, GOMA.HEI, 1, 7, 1);
    expectGomaInHan(view, side, GOMA.HEI, 5, 7, 1);
    expectGomaInHan(view, side, GOMA.HEI, 9, 7, 1);
    expectGomaCountInOki(view, side, GOMA.HEI, 1);
    expectGomaCountInOki(view, side, GOMA.SHO, 2);
    expectGomaCountInOki(view, side, GOMA.UMA, 2);
    expectGomaInHan(view, side, GOMA.SHINOBI, 2, 8, 1);
    expectGomaInHan(view, side, GOMA.SHINOBI, 8, 8, 1);
    expectGomaInHan(view, side, GOMA.YARI, 5, 8, 1);
    expectGomaCountInOki(view, side, GOMA.YARI, 2);
    expectGomaInHan(view, side, GOMA.CHU, 4, 9, 1);
    expectGomaInHan(view, side, GOMA.DAI, 6, 9, 1);
    expectGomaInHan(view, side, GOMA.SHI, 4, 7, 1);
    expectGomaInHan(view, side, GOMA.SHI, 6, 7, 1);
    expectGomaInHan(view, side, GOMA.TORIDE, 3, 7, 1);
    expectGomaInHan(view, side, GOMA.TORIDE, 7, 7, 1);
  });
});
