import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('users (e2e) test', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  it('should create anew user', () => {
    return request(app.getHttpServer())
      .post('/api/users/create')
      .send({
        username: 'rihanmohammed',
        password: '1234567890',
        email: 'rihan@gmail.com',
      })
      .expect(201);
  });
});
