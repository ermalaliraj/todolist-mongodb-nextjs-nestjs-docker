import { response } from 'express';
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest';
import { AppModule } from '../src/app.module'
import logger from '../src/utils/logger';

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()
    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('/ (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/')
    expect('TodoList API is up and running! (Built in NestJS)')
  })
})
