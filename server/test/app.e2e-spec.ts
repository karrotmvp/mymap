import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Mymap e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    
  });

  describe('/api/post/', () => {
    it('POST 201', () => {
      return request(app.getHttpServer())
        .post('/api/post/')
        .set('Cookie', 'w_auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlRlYW0xdGVzdDIiLCJzdWIiOjEsImlhdCI6MTYzNDI2MDY2NiwiZXhwIjoxNjM0MjgyMjY2fQ.jFumIuKdX6Ca7Sqwj0NakKc7kKNEI66RobFyGIEpolg; Path=/;')
        .send({
          "title": "새 컬렉션",
          "contents": "설명",
          "regionId": "6530459d189b",
          "share": true,
          "pins": [{
            "review": "장소 한줄평",
            "placeId": "1767544"
        }]
      })
    });
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/api/post/1').expect(200);
    });
    it.todo('PUT');
    it.todo('DELETE');
  })

  describe('/api/post/myPost', () => {
    it.todo('GET');
  })

  describe('/api/post/savedPost/', () => {
    it.todo('GET');
    it.todo('POST');
  })


});
