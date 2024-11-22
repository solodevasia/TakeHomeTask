import database from '@bri/configuration/database';
import UserEntity from '@bri/entities/user/user.entity';
import UserModule from '@bri/modules/user.module';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import supertest from 'supertest';
import fs from 'fs';
import { join } from 'path';

describe('UserController', () => {
  let app: INestApplication;
  let repository: Repository<UserEntity>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(database), UserModule],
    }).compile();

    app = moduleRef.createNestApplication();
    repository = moduleRef.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
    await app.init();
  });

  it('should to be defined', () => expect(app).toBeDefined());

  it('render correctly', () => expect(app.getHttpServer()).toMatchSnapshot());

  it('should call api "/user"', async () =>
    await supertest(app.getHttpServer())
      .get('/user')
      .set('Content-Type', 'application/json')
      .expect(HttpStatus.OK)
      .then((res) =>
        expect(res.body).toEqual({
          result: res.body.result,
          page: 1,
          previousUrl: null,
          nextUrl: res.body.result.length ? '/user?page=2' : null,
          pageSize: res.body.pageSize,
          count: res.body.count,
          status: HttpStatus.OK,
        }),
      ));

  it('should call api "/user?page=2"', async () =>
    await supertest(app.getHttpServer())
      .get('/user')
      .set('Content-Type', 'application/json')
      .query({ page: 2 })
      .expect(HttpStatus.OK)
      .then((res) => {
        expect(res.body).toEqual({
          result: res.body.result,
          page: 2,
          previousUrl: '/user?page=1',
          nextUrl:
            res.body.pageSize > 2 ? `/user?page=${res.body.pageSize}` : null,
          pageSize: res.body.pageSize,
          count: res.body.count,
          status: HttpStatus.OK,
        });
        fs.writeFileSync(
          join(__dirname, '../../../folder/pageSize.txt'),
          `${res.body.pageSize}`,
        );
      }));

  if (
    fs.readFileSync(join(__dirname, '../../../folder/create.txt'), {
      encoding: 'utf-8',
    })
  ) {
    const user = JSON.parse(
      fs.readFileSync(join(__dirname, '../../../folder/create.txt'), {
        encoding: 'utf-8',
      }),
    );

    it('should call api "/user/:id"', async () =>
      await supertest(app.getHttpServer())
        .get(`/user/${user.id}`)
        .set('Content-Type', 'application/json')
        .expect(HttpStatus.OK)
        .then((res) =>
          expect(res.body).toEqual({
            result: res.body.result,
            status: HttpStatus.OK,
          }),
        ));

    it('should call api "/user/:id" not found', async () =>
      await supertest(app.getHttpServer())
        .get(`/user/dqwdwq`)
        .set('Content-Type', 'application/json')
        .expect(HttpStatus.BAD_REQUEST));
  }

  if (
    fs.readFileSync(join(__dirname, '../../../folder/pageSize.txt'), {
      encoding: 'utf-8',
    })
  ) {
    const pageSize = fs.readFileSync(
      join(__dirname, '../../../folder/pageSize.txt'),
      {
        encoding: 'utf-8',
      },
    );
    it('should call api "/user?page=lastPage"', async () =>
      await supertest(app.getHttpServer())
        .get(`/user?page=${pageSize}`)
        .set('Content-Type', 'application/json')
        .expect(HttpStatus.OK)
        .then((res) =>
          expect(res.body).toEqual({
            result: res.body.result,
            page: Number(pageSize),
            previousUrl: `/user?page=${res.body.pageSize - 1}`,
            nextUrl:
              Number(pageSize) > res.body.page ? `/user?page${pageSize}` : null,
            pageSize: res.body.pageSize,
            count: res.body.count,
            status: HttpStatus.OK,
          }),
        ));
  }
});
