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
import Goma from 'src/domain/goma/Goma';
import GOMA from 'src/domain/constant/GOMA';
import Coordinate from 'src/domain/Coordinate';
import GomaFactory from 'src/domain/goma/GomaFactory';

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

    request(app.getHttpServer())
      .post(`/gungi/${gungiId}/surrender`)
      .send(body)
      .expect(200)
      .expect({ winner: 'B' });
  });

  it('/(POST) gungi/:gungiId/configuration', async () => {
    // Init
    const gungiId = randomUUID();
    const player: Player[] = [];
    // TODO: CHECK GomaOki 需要 LEVEL 嗎？
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
    // await gungiRepository.save(gungi);

    // Given
    // None

    // When
    const body = {
      playerId: 'A',
    };

    //   gomas: {
    //     name: string, // 棋子的名稱
    //     side: string, // 黑 or 白
    //     coordinate: { x: int, y: int, z: int }
    //  }[]

    // TODO: 這裡的順序如果不一致，應該也要正確，還不知道怎麼改
    // request(app.getHttpServer())
    //   .post(`/gungi/${gungiId}/configuration`)
    //   .send(body)
    //   .expect(200)
    //   .expect({
    //     gomas: [
    //       {
    //         side: 'BLACK',
    //         name: 'OSHO',
    //         coordianate: { x: 5, y: 1, z: 1 },
    //       },
    //       {
    //         side: 'BLACK',
    //         name: 'DAI',
    //         coordianate: { x: 4, y: 1, z: 1 },
    //       },
    //     ],
    //   });
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
